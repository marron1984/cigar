/* ============================================================
   葉巻大辞典 — 記録ノート（localStorage）
   吸った葉巻を記録・検索・評価・エクスポート/インポート
   ============================================================ */

const NOTE = (() => {
  const KEY = "cigar_journal_v1";
  const AUTHOR_KEY = "cigar_author";
  const MIGRATED_KEY = "cigar_cloud_migrated";   // この端末の既存記録をクラウドへ引き上げ済みか
  const q = (s, el = document) => el.querySelector(s);
  const escN = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

  let entries = [];
  let searchTerm = "";
  let sortMode = "new";
  let currentPhotos = [];       // モーダル編集中の写真（dataURL配列）
  const MAX_PHOTOS = 10;
  const cloudOn = typeof CLOUD !== "undefined" && CLOUD.enabled;
  const visionOn = typeof VISION !== "undefined" && VISION.enabled;   // 写真AI自動入力
  let visionBusy = false;       // 認識中の二重起動を防ぐ
  let usingIDB = false;         // IndexedDBが使えるか（localStorageの約5MB制限を回避）
  let timerStart = null;        // 喫煙タイマーの開始時刻
  let timerTick = null;         // タイマー表示の更新インターバル
  const FX_KEY = "cigar_fx_rates";   // 通貨ごとの記憶レート

  function authorName() { try { return localStorage.getItem(AUTHOR_KEY) || ""; } catch (e) { return ""; } }
  function setAuthorName(v) { try { localStorage.setItem(AUTHOR_KEY, v); } catch (e) {} }

  /* ---------- 画像リサイズ（保存容量節約のため縮小・圧縮） ---------- */
  function resizeImage(file, maxDim = 1400, quality = 0.8) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          let { width, height } = img;
          if (width >= height && width > maxDim) { height = Math.round(height * maxDim / width); width = maxDim; }
          else if (height > width && height > maxDim) { width = Math.round(width * maxDim / height); height = maxDim; }
          else if (width > maxDim) { width = maxDim; height = maxDim; }
          const canvas = document.createElement("canvas");
          canvas.width = width; canvas.height = height;
          canvas.getContext("2d").drawImage(img, 0, 0, width, height);
          try { resolve(canvas.toDataURL("image/jpeg", quality)); }
          catch (err) { reject(err); }
        };
        img.onerror = () => reject(new Error("画像を読み込めませんでした"));
        img.src = reader.result;
      };
      reader.onerror = () => reject(new Error("ファイルを読み込めませんでした"));
      reader.readAsDataURL(file);
    });
  }

  /* ---------- 永続化 ----------
     写真を含む記録は localStorage の約5MB制限をすぐ超えるため、
     大容量の IndexedDB（端末により数百MB〜GB級）を主保存先にする。
     旧 localStorage の記録は初回に自動移行。IDBが使えない環境では従来どおり。 */
  const DB_NAME = "cigar_journal_db";
  const DB_STORE = "entries";
  let idb = null;
  function idbOpen() {
    return new Promise((resolve) => {
      if (!("indexedDB" in window)) return resolve(null);
      let req;
      try { req = indexedDB.open(DB_NAME, 1); } catch (e) { return resolve(null); }
      req.onupgradeneeded = () => req.result.createObjectStore(DB_STORE, { keyPath: "id" });
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
      req.onblocked = () => resolve(null);
    });
  }
  function idbReq(mode, fn) {
    return new Promise((resolve, reject) => {
      const tx = idb.transaction(DB_STORE, mode);
      const r = fn(tx.objectStore(DB_STORE));
      tx.oncomplete = () => resolve(r && r.result);
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error || new Error("保存が中断されました"));
    });
  }
  const idbAll = () => idbReq("readonly", s => s.getAll());
  const idbPut = (e) => idbReq("readwrite", s => s.put(e));
  const idbDelete = (id) => idbReq("readwrite", s => s.delete(id));
  const idbReplaceAll = (list) => idbReq("readwrite", s => { s.clear(); list.forEach(e => s.put(e)); });

  function load() {
    try { entries = JSON.parse(localStorage.getItem(KEY)) || []; }
    catch (e) { entries = []; }
  }

  /* IndexedDBを開き、旧localStorageの記録を移行して読み込む */
  async function loadStore() {
    idb = await idbOpen();
    if (idb) {
      try {
        let list = await idbAll();
        let legacy = [];
        try { legacy = JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) {}
        if (legacy.length) {
          // localStorage 側にしか無い記録は IndexedDB へ復元的にマージ
          // （IDBが空になっていた場合でも、この経路で記録が戻る）
          const have = new Set(list.map(e => e.id));
          const add = legacy.filter(e => e && e.id && !have.has(e.id));
          if (add.length) { await idbReplaceAll([...list, ...add]); list = await idbAll(); }
        }
        // localStorage は削除せず、写真を除いた軽量バックアップとして常に残す。
        // これにより IndexedDB が消えても記録の本文（写真以外）を復元できる。
        writeBackup(list);
        entries = list.sort((a, b) => (b.created || 0) - (a.created || 0));
        usingIDB = true;
        // ブラウザに永続保存を要請（容量逼迫時の自動削除を防ぐ。失敗しても害なし）
        try { navigator.storage && navigator.storage.persist && navigator.storage.persist(); } catch (e) {}
        return;
      } catch (e) { console.warn("IndexedDBを利用できないためlocalStorageを使用します:", e); }
    }
    load();
  }

  /* 1件保存／1件削除／全置換。IDB優先、使えなければlocalStorage */
  async function persistPut(entry) {
    if (usingIDB) {
      try { await idbPut(entry); writeBackup(entries); return true; }
      catch (e) {
        alert("保存できませんでした。端末の空き容量が不足している可能性があります。不要な写真や記録を削除してからお試しください。");
        return false;
      }
    }
    return save();
  }
  async function persistDelete(id) {
    if (usingIDB) { try { await idbDelete(id); writeBackup(entries); return true; } catch (e) { return save(); } }
    return save();
  }
  async function persistReplaceAll(list) {
    if (usingIDB) {
      try { await idbReplaceAll(list); writeBackup(list); return true; }
      catch (e) { alert("保存できませんでした。端末の空き容量が不足している可能性があります。"); return false; }
    }
    return save();
  }
  // この端末に保存されている記録（写真込み）をすべて取得
  async function localDeviceEntries() {
    if (usingIDB && idb) { try { return (await idbAll()) || []; } catch (e) {} }
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; }
  }
  // 1件ずつ順番にクラウドへ保存（写真込みで容量が大きいため分割）。成功した記録を返す
  async function cloudUploadSeq(list) {
    const done = [];
    for (const e of list) {
      try { await CLOUD.upsert(e); done.push(e); }
      catch (err) { console.warn("1件のクラウド保存に失敗:", err); }
    }
    return done;
  }

  // クラウド有効時：共有DBから「自分（記録者名）の記録」を読み込む。
  // 初回だけ、この端末にしか無い既存記録をクラウドへ引き上げて保全する（消失防止）。
  async function loadCloud() {
    if (!cloudOn) return false;
    const owner = authorName();
    if (!owner) { return true; }   // 名前未入力：手元の記録をそのまま表示（消さない）
    try {
      const remote = await CLOUD.list(owner);
      const remoteIds = new Set(remote.map(e => e.id));
      let migrated = "";
      try { migrated = localStorage.getItem(MIGRATED_KEY) || ""; } catch (e) {}
      if (!migrated) {
        // この端末の既存記録のうち、まだクラウドに無いものを引き上げる（1回だけ）
        const localList = await localDeviceEntries();
        const localOnly = localList
          .filter(e => e && e.id && e.name && !remoteIds.has(e.id))
          .map(e => ({ ...e, owner, author: e.author || owner }));
        // 先に手元の記録も含めて表示（アップロード完了を待たずに見える＝消えたように見えない）
        entries = [...remote, ...localOnly].sort((a, b) => (b.created || 0) - (a.created || 0));
        render();
        if (localOnly.length) {
          const done = await cloudUploadSeq(localOnly);   // バックグラウンドで1件ずつ保存
          // 全件成功したときだけ「引き上げ済み」にする（一部失敗なら次回また試す）
          if (done.length === localOnly.length) { try { localStorage.setItem(MIGRATED_KEY, "1"); } catch (e) {} }
        } else {
          try { localStorage.setItem(MIGRATED_KEY, "1"); } catch (e) {}
        }
        return true;
      }
      entries = remote.sort((a, b) => (b.created || 0) - (a.created || 0));
      return true;
    } catch (err) {
      // クラウドに繋がらない・テーブル未作成などのときは、手元の記録を表示して
      // 「消えたように見える」状態を防ぐ（記録は端末内に残っている）。
      console.warn("クラウド読み込み失敗、ローカルを使用します:", err);
      try {
        const localList = await localDeviceEntries();
        if (localList.length) entries = localList.sort((a, b) => (b.created || 0) - (a.created || 0));
      } catch (e) {}
      return true;
    }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(entries)); return true; }
    catch (e) {
      alert("保存できませんでした。写真の枚数が多いと端末の保存容量を超えることがあります。写真を減らすか、不要な記録を削除してからお試しください。");
      return false;
    }
  }
  // 写真を除いた軽量スナップショットを localStorage に保存（必ず容量内に収まる）。
  // IndexedDB が失われても記録の本文を復元するための最後の砦。
  function writeBackup(list) {
    try {
      const meta = (list || []).map(e => { const { photos, ...rest } = e; return rest; });
      localStorage.setItem(KEY, JSON.stringify(meta));
    } catch (e) { /* 容量超過などは無視（IDBが主保存先のため） */ }
  }
  function uid() {
    return "e" + Date.now().toString(36) + Math.floor(Math.random() * 1e6).toString(36);
  }

  /* ---------- 星評価 ---------- */
  // 半個刻み（0〜5、0.5単位＝実質10段階）に対応。幅クリップで任意の割合を表示
  function stars(n) {
    n = Math.max(0, Math.min(5, Number(n) || 0));
    const pct = (n / 5 * 100).toFixed(2);
    return `<span class="stars"><span class="s-bg">★★★★★</span><span class="s-fg" style="width:${pct}%">★★★★★</span></span>`;
  }

  /* ---------- 国名の表記ゆれを統一（「ニカラグア/米」「ドミニカ(本社スイス)」等） ---------- */
  function normalizeCountry(raw) {
    if (!raw) return "";
    // 括弧書きの補足（本社所在地など）と、複数国併記の2か国目以降を落として主産地だけ残す
    let s = raw.replace(/[（(].*?[）)]/g, "").split("/")[0].trim();
    const alias = { "米": "アメリカ", "ドミニカ": "ドミニカ共和国" };
    return alias[s] || s;
  }

  // 主要生産国はこの並び順で表示し、それ以外は登録順で末尾に続ける
  const COUNTRY_ORDER = [
    "キューバ", "ドミニカ共和国", "ニカラグア", "ホンジュラス",
    "メキシコ", "エクアドル", "アメリカ", "ブラジル", "カメルーン"
  ];

  /* ---------- ブランド一覧を国別にグルーピングして集約 ---------- */
  function brandGroups() {
    const groups = new Map();      // 国名 -> Set<ブランド名>
    const assigned = new Set();    // 既にどこかの国に割り当て済みのブランド名（重複掲載を防ぐ）
    const push = (country, n) => {
      const name = (n || "").trim();
      if (!name || assigned.has(name)) return;
      const c = normalizeCountry(country) || "その他";
      if (!groups.has(c)) groups.set(c, new Set());
      groups.get(c).add(name);
      assigned.add(name);
    };
    // 博士編DBの全マルカ（キューバ＋ニューワールド）を優先
    try { (PHD_DATA.db.cubanMarcas || []).forEach(m => push("キューバ", m.ja)); } catch (e) {}
    try { (PHD_DATA.db.newWorld || []).forEach(m => push(m.country, m.ja)); } catch (e) {}
    // 上級編ブランドと産地別の代表銘柄でも補完
    try { (ADVANCED_DATA.brands || []).forEach(b => push(b.country, b.ja)); } catch (e) {}
    try {
      (CIGAR_DATA.countries || []).forEach(c =>
        (c.brands || []).forEach(b => { if (!/ラッパー|使用/.test(b.ja)) push(c.name_ja, b.ja); }));
    } catch (e) {}
    // ブランド大全（BRANDS_DATA）の全銘柄も選択肢に統合（フィリピン・タバカレラ、
    // ニカラグアのアロマデニカ等を含む。産地キーを日本語グループ名に対応づけ）
    try {
      const CK = { cuba: "キューバ", dominican: "ドミニカ共和国", nicaragua: "ニカラグア", honduras: "ホンジュラス", mexico: "メキシコ", ecuador: "エクアドル", usa: "アメリカ", brazil: "ブラジル", cameroon: "カメルーン", peru: "ペルー", colombia: "コロンビア", philippines: "フィリピン", indonesia: "インドネシア", argentina: "アルゼンチン" };
      if (typeof BRANDS_DATA !== "undefined") {
        Object.keys(BRANDS_DATA).forEach(k =>
          (BRANDS_DATA[k] || []).forEach(b => { if (b && b.ja) push(CK[k] || "その他", b.ja); }));
      }
    } catch (e) {}

    const orderedNames = [
      ...COUNTRY_ORDER.filter(n => groups.has(n)),
      ...[...groups.keys()].filter(n => n !== "その他" && !COUNTRY_ORDER.includes(n)),
      ...(groups.has("その他") ? ["その他"] : []),
    ];
    return orderedNames.map(country => ({
      country,
      brands: [...groups.get(country)].sort((a, b) => a.localeCompare(b, "ja")),
    }));
  }

  /* 国別グループを崩したフラットな一覧（検索・照合用） */
  function brandList() {
    return brandGroups().flatMap(g => g.brands);
  }

  /* ブランド名 → 産地。ブランド選択時に産地欄を自動入力するための逆引き */
  let brandCountryMap = null;
  function countryOfBrand(name) {
    if (!brandCountryMap) {
      brandCountryMap = new Map();
      brandGroups().forEach(g => g.brands.forEach(b => brandCountryMap.set(b, g.country)));
    }
    return brandCountryMap.get(name) || "";
  }

  /* ---------- フォームのセレクト初期化 ---------- */
  function fillSelects() {
    const cSel = q("#fCountry");
    const vSel = q("#fVitola");
    const bSel = q("#fBrand");
    if (bSel && !bSel.dataset.filled) {
      bSel.innerHTML = `<option value="">—</option>` +
        brandGroups().map(g =>
          `<optgroup label="${escN(g.country)}">` +
          g.brands.map(n => `<option>${escN(n)}</option>`).join("") +
          `</optgroup>`
        ).join("") +
        `<option value="__other">その他（自由入力）</option>`;
      bSel.dataset.filled = "1";
    }
    if (cSel && !cSel.dataset.filled) {
      // 産地はブランドと同じ国ぞろえ（フィリピン等も含む）＋自由入力
      const countries = brandGroups().map(g => g.country).filter(c => c && c !== "その他");
      cSel.innerHTML = `<option value="">—</option>` +
        countries.map(c => `<option>${escN(c)}</option>`).join("") +
        `<option value="__other">その他（自由入力）</option>`;
      cSel.dataset.filled = "1";
    }
    if (vSel && !vSel.dataset.filled) {
      vSel.innerHTML = `<option value="">—</option>` +
        CIGAR_DATA.vitolas.map(v => `<option>${escN(v.ja)}</option>`).join("") +
        `<option>その他</option>`;
      vSel.dataset.filled = "1";
    }
  }

  /* ---------- 記録フォーム（ページ内インライン） ---------- */
  function openModal(entry) {
    fillSelects();
    const isEdit = !!entry;
    q("#modalTitle").textContent = isEdit ? "記録を編集する" : "葉巻を記録する";
    q("#entryId").value = isEdit ? entry.id : "";
    q("#fName").value = isEdit ? entry.name : "";
    setBrand(isEdit ? (entry.brand || "") : "");
    setCountry(isEdit ? (entry.country || "") : "");
    q("#fVitola").value = isEdit ? (entry.vitola || "") : "";
    setStrength(isEdit ? (entry.strength || "") : "");
    q("#fDate").value = isEdit ? (entry.date || "") : todayStr();
    q("#fPrice").value = isEdit ? (entry.price ?? "") : "";
    q("#fLocation").value = isEdit ? (entry.location || "") : "";
    syncLocChips();
    q("#fNote").value = isEdit ? (entry.note || "") : "";
    currentPhotos = isEdit && Array.isArray(entry.photos) ? entry.photos.slice() : [];
    renderPhotoPreviews();
    setVisionStatus("", "");   // 前回の認識メッセージをクリア
    timerReset(isEdit ? (entry.duration || "") : "");
    updateRepeatHint();
    setRating(isEdit ? (entry.rating || 0) : 0);
    const panel = q("#entryPanel");
    panel.hidden = false;
    // 記録ボタンは開いている間は隠して重複を防ぐ
    const hero = q("#btnNewEntry"); if (hero) hero.style.display = "none";
    // フォームの先頭（写真）が見えるようスクロール。
    // 自動フォーカスはしない：キーボードが出ると写真が隠れてしまうため
    setTimeout(() => {
      panel.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 30);
  }
  function closeModal() {
    const panel = q("#entryPanel");
    if (panel) panel.hidden = true;
    const hero = q("#btnNewEntry"); if (hero) hero.style.display = "";
  }

  /* ライトボックス */
  function openLightbox(src) {
    q("#lightboxImg").src = src;
    q("#lightbox").classList.add("open");
  }
  function closeLightbox() {
    q("#lightbox").classList.remove("open");
    q("#lightboxImg").src = "";
  }

  /* モーダル内の写真プレビューを描画 */
  function renderPhotoPreviews() {
    const box = q("#photoPreviews");
    box.innerHTML = currentPhotos.map((src, i) =>
      `<div class="photo-thumb"><img src="${src}" alt="写真${i + 1}"><button type="button" class="rm" data-rmphoto="${i}" title="削除">×</button></div>`
    ).join("");
  }

  /* ファイル選択→リサイズ→プレビューへ追加 */
  async function addPhotos(files) {
    const remaining = MAX_PHOTOS - currentPhotos.length;
    if (remaining <= 0) { alert(`写真は最大${MAX_PHOTOS}枚までです。`); return; }
    const list = [...files].slice(0, remaining);
    if (files.length > remaining) alert(`写真は最大${MAX_PHOTOS}枚まで。${remaining}枚のみ追加しました。`);
    const before = currentPhotos.length;
    for (const f of list) {
      if (!f.type.startsWith("image/")) continue;
      try { currentPhotos.push(await resizeImage(f)); }
      catch (err) { alert("画像の処理に失敗しました：" + err.message); }
    }
    renderPhotoPreviews();
    // 1枚目の写真を追加したら、AIで銘柄などを自動読み取り（未入力の欄だけ埋める）
    if (visionOn && before === 0 && currentPhotos.length && !q("#fName").value.trim()) {
      runVision(currentPhotos[0]);
    }
  }

  /* ---------- 写真からのAI自動入力 ---------- */
  // AIが返した文字列を、セレクトの選択肢に寄せて一致させる（完全一致→部分一致）
  function matchOption(sel, val) {
    if (!sel || !val) return "";
    const v = String(val).trim();
    const opts = [...sel.options].map(o => o.value).filter(o => o && o !== "その他" && o !== "__other");
    let hit = opts.find(o => o === v);
    if (!hit) hit = opts.find(o => o.replace(/\s/g, "") === v.replace(/\s/g, ""));
    if (!hit) hit = opts.find(o => v.includes(o) || o.includes(v));
    return hit || "";
  }
  // 既知ブランドに寄せる。一致すればセレクト、無ければ自由入力欄へそのまま
  function applyBrand(val) {
    const sel = q("#fBrand");
    const m = matchOption(sel, val);
    setBrand(m || val);
  }
  function setVisionStatus(kind, msg) {
    const el = q("#visionStatus");
    if (!el) return;
    el.hidden = !msg;
    el.textContent = msg || "";
    el.className = "ai-status" + (kind ? " " + kind : "");
  }
  function setAiBusy(busy) {
    const btn = q("#btnAiFill");
    if (btn) { btn.disabled = busy; btn.classList.toggle("busy", busy); }
  }
  // 認識結果をフォームへ反映（ユーザー入力済みの欄は上書きしない）
  function applyVision(r) {
    const filled = [];
    if (r.name && !q("#fName").value.trim()) { q("#fName").value = r.name; filled.push("銘柄名"); }
    if (r.brand && !getBrand()) { applyBrand(r.brand); filled.push("ブランド"); }
    const cSel = q("#fCountry");
    if (r.country && !getCountry()) { setCountry(matchOption(cSel, r.country) || r.country); filled.push("産地"); }
    const vSel = q("#fVitola");
    if (r.vitola && vSel && !vSel.value) { const m = matchOption(vSel, r.vitola); if (m) { vSel.value = m; filled.push("サイズ"); } }
    if (r.strength && !q("#fStrength").value) {
      const s = normalizeStrength(r.strength);
      if (["ライト", "ミディアムライト", "ミディアム", "ミディアムフル", "フル"].includes(s)) { setStrength(s); filled.push("強さ"); }
    }
    // 結果メッセージ
    const low = r.confidence === "low";
    if (!filled.length) {
      setVisionStatus("warn", "写真からは判別できませんでした。お手数ですが手入力でお願いします。");
    } else {
      const lead = low ? "自信は高くありませんが、" : "";
      setVisionStatus(low ? "warn" : "ok",
        `✓ ${lead}${filled.join("・")}を入力しました。念のためご確認ください。`);
    }
  }
  async function runVision(src) {
    if (!visionOn || visionBusy) return;
    if (!src) src = currentPhotos[0];
    if (!src) { setVisionStatus("warn", "先に写真を追加してください。"); return; }
    visionBusy = true; setAiBusy(true);
    setVisionStatus("loading", "AIが写真を読み取っています…（数秒かかります）");
    try {
      const hints = {
        countries: (CIGAR_DATA.countries || []).map(c => c.name_ja),
        vitolas: (CIGAR_DATA.vitolas || []).map(v => v.ja),
        brands: brandList(),
      };
      const r = await VISION.identify(src, hints);
      applyVision(r);
    } catch (err) {
      setVisionStatus("error", "読み取れませんでした：" + (err.message || "エラー"));
    } finally {
      visionBusy = false; setAiBusy(false);
    }
  }

  /* ブランド値をセレクト/自由入力へ振り分け */
  function setBrand(val) {
    const sel = q("#fBrand");
    const other = q("#fBrandOther");
    const listed = [...sel.options].some(o => o.value === val && o.value !== "" && o.value !== "__other");
    if (val && !listed) {
      sel.value = "__other";
      other.style.display = "";
      other.value = val;
    } else {
      sel.value = val;
      other.style.display = "none";
      other.value = "";
    }
  }
  /* 現在のブランド入力値を取得 */
  function getBrand() {
    const sel = q("#fBrand");
    return sel.value === "__other" ? q("#fBrandOther").value.trim() : sel.value;
  }
  /* 産地：ブランドと同じ仕組み（選択肢に無ければ自由入力欄へ） */
  function setCountry(val) {
    const sel = q("#fCountry");
    const other = q("#fCountryOther");
    if (!sel) return;
    const listed = [...sel.options].some(o => o.value === val && o.value !== "" && o.value !== "__other");
    if (val && !listed) {
      sel.value = "__other";
      if (other) { other.style.display = ""; other.value = val; }
    } else {
      sel.value = val || "";
      if (other) { other.style.display = "none"; other.value = ""; }
    }
  }
  function getCountry() {
    const sel = q("#fCountry");
    return sel.value === "__other" ? (q("#fCountryOther").value || "").trim() : sel.value;
  }

  function todayStr() {
    const d = new Date();
    const p = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
  }

  /* ---------- 星入力 ---------- */
  const RATING_WORDS = { 0: "タップで評価", 1: "イマイチ", 2: "まずまず", 3: "良い", 4: "とても良い", 5: "最高の一本" };
  function ratingLabelText(n) {
    if (!n) return "タップで評価（半個刻み）";
    return `${n.toFixed(1)}／5　${RATING_WORDS[Math.round(n)] || ""}`;
  }
  function setRating(n) {
    n = Math.max(0, Math.min(5, Number(n) || 0));
    q("#fRating").value = n;
    q("#ratingInput").querySelectorAll(".star").forEach(s => {
      const v = Number(s.dataset.v);
      s.classList.toggle("on", n >= v);
      s.classList.toggle("half", n >= v - 0.5 && n < v);
    });
    const lbl = q("#ratingLabel");
    if (lbl) { lbl.textContent = ratingLabelText(n); lbl.classList.toggle("set", n > 0); }
  }

  /* ---------- テイスト入力（ワンタップの五択。再タップで解除） ---------- */
  // 旧3段階時代の「マイルド」を新5段階の「ライト」へ読み替える
  function normalizeStrength(v) {
    return v === "マイルド" ? "ライト" : (v || "");
  }
  function setStrength(v) {
    v = normalizeStrength(v);
    q("#fStrength").value = v;
    const seg = q("#strengthSeg");
    if (seg) seg.querySelectorAll("[data-strength]").forEach(b =>
      b.classList.toggle("on", b.dataset.strength === v));
  }

  /* ---------- 喫煙場所チップ：入力値と一致する候補をハイライト ---------- */
  function syncLocChips() {
    const chips = q("#locationChips");
    if (!chips) return;
    const v = q("#fLocation").value.trim();
    chips.querySelectorAll("[data-loc]").forEach(b =>
      b.classList.toggle("on", b.dataset.loc === v));
  }

  /* ---------- 保存処理 ---------- */
  async function submit(e) {
    e.preventDefault();
    const id = q("#entryId").value;
    const data = {
      name: q("#fName").value.trim(),
      brand: getBrand(),
      country: getCountry(),
      vitola: q("#fVitola").value,
      strength: q("#fStrength").value,
      date: q("#fDate").value,
      price: q("#fPrice").value ? Number(q("#fPrice").value) : null,
      location: q("#fLocation").value.trim(),
      rating: Number(q("#fRating").value) || 0,
      note: q("#fNote").value.trim(),
      photos: currentPhotos.slice()
    };
    // タイマーが動いたままなら自動で止めて記録
    if (timerStart) {
      const mins = Math.max(1, Math.round((Date.now() - timerStart) / 60000));
      timerReset(mins);
    }
    data.duration = Number(q("#fDuration").value) || null;
    if (!data.name) return;
    if (cloudOn && !authorName()) {
      alert("共有モードでは、先に「記録者」にお名前を入力してください（その名前があなたの記録の目印になります）。");
      closeModal(); const ai = q("#authorName"); if (ai) ai.focus();
      return;
    }
    const backup = entries.slice();   // 保存失敗時のロールバック用
    let saved;
    if (id) {
      const i = entries.findIndex(x => x.id === id);
      if (i > -1) { entries[i] = { ...entries[i], ...data }; saved = entries[i]; }
    } else {
      data.id = uid();
      data.created = Date.now();
      data.author = authorName();   // 記録者
      data.owner = authorName();    // 共有DBでの所有者（この人だけが閲覧）
      entries.unshift(data);
      saved = data;
    }
    if (!saved || !(await persistPut(saved))) { entries = backup; return; }   // 失敗時は元に戻しモーダルを開いたまま
    closeModal();
    render();
    // 共有DBへ書き込み（失敗しても手元の記録は残る）
    if (cloudOn && saved) {
      CLOUD.upsert(saved).catch(err => {
        console.warn(err); alert("共有データベースへの保存に失敗しました。手元には保存されています。時間をおいて再度お試しください。");
      });
    }
  }

  function removeEntry(id) {
    const en = entries.find(x => x.id === id);
    if (!confirm(`「${en ? en.name : "この記録"}」を削除しますか？`)) return;
    entries = entries.filter(x => x.id !== id);
    persistDelete(id);
    render();
    if (cloudOn) {
      CLOUD.remove(id).catch(err => { console.warn(err); alert("共有データベースからの削除に失敗しました。時間をおいて再度お試しください。"); });
      // 共有リンクを発行していた場合は、そのコピーも削除（リンクを無効化）
      if (en && en.shareId) CLOUD.shareRemove(en.shareId).catch(() => {});
    }
  }

  /* ---------- 統計 ---------- */
  // 記録の「時点」：喫煙日を優先、無ければ登録日時
  function entryTime(e) {
    return e.date ? new Date(e.date + "T12:00").getTime() : (e.created || 0);
  }
  function entryMonth(e) {
    if (e.date) return e.date.slice(0, 7);
    if (e.created) { const d = new Date(e.created); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`; }
    return "";
  }
  function hbar(label, count, max, extra) {
    const w = max ? Math.max(3, Math.round(count / max * 100)) : 0;
    return `<div class="ch-row"><div class="ch-lbl">${escN(label)}</div>
      <div class="ch-track"><div class="ch-fill" style="width:${w}%"></div></div>
      <div class="ch-val">${count}${extra || ""}</div></div>`;
  }
  function renderStats() {
    const box = q("#noteStats");
    const ins = q("#noteInsights");
    if (!entries.length) { box.innerHTML = ""; if (ins) ins.innerHTML = ""; return; }
    const rated = entries.filter(e => e.rating > 0);
    const avg = rated.length
      ? (rated.reduce((s, e) => s + e.rating, 0) / rated.length).toFixed(1) : "—";
    const spent = entries.reduce((s, e) => s + (Number(e.price) || 0), 0);
    const countries = new Set(entries.map(e => e.country).filter(Boolean)).size;
    const places = new Set(entries.map(e => e.location).filter(Boolean)).size;
    box.innerHTML = `
      <div class="stat-box"><div class="sv">${entries.length}</div><div class="sl">記録した本数</div></div>
      <div class="stat-box"><div class="sv">${avg}</div><div class="sl">平均評価（★）</div></div>
      <div class="stat-box"><div class="sv">${countries}</div><div class="sl">産地の数</div></div>
      <div class="stat-box"><div class="sv">${places}</div><div class="sl">喫煙場所の数</div></div>
      <div class="stat-box"><div class="sv">¥${spent.toLocaleString()}</div><div class="sl">総額の記録</div></div>`;
    if (ins) renderInsights(ins);
  }

  /* くわしい統計（月別・産地・評価・喫煙時間） */
  function renderInsights(ins) {
    const now = new Date();
    const thisYear = String(now.getFullYear());
    const yearCount = entries.filter(e => (e.date || "").startsWith(thisYear)).length;

    // 直近12か月の本数と支出
    const months = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
    }
    const mCount = {}, mSpend = {};
    entries.forEach(e => {
      const m = entryMonth(e);
      if (!m) return;
      mCount[m] = (mCount[m] || 0) + 1;
      mSpend[m] = (mSpend[m] || 0) + (Number(e.price) || 0);
    });
    const maxM = Math.max(1, ...months.map(m => mCount[m] || 0));
    const monthChart = `<div class="ch-h">月別の本数（直近12か月）</div><div class="mchart">` +
      months.map(m => {
        const c = mCount[m] || 0;
        const h = Math.round(c / maxM * 72);
        const lbl = Number(m.slice(5)) + "月";
        const tip = mSpend[m] ? `¥${mSpend[m].toLocaleString()}` : "";
        return `<div class="mcol" title="${escN(m)}：${c}本 ${tip}">
          <div class="mval">${c || ""}</div><div class="mbar" style="height:${Math.max(c ? 6 : 2, h)}px"></div><div class="mlbl">${lbl}</div></div>`;
      }).join("") + `</div>`;

    // 産地トップ6
    const byC = {};
    entries.forEach(e => { if (e.country) byC[e.country] = (byC[e.country] || 0) + 1; });
    const topC = Object.entries(byC).sort((a, b) => b[1] - a[1]).slice(0, 6);
    const maxC = Math.max(1, ...topC.map(x => x[1]));
    const countryChart = topC.length
      ? `<div class="ch-h">よく吸う産地</div>` + topC.map(([k, v]) => hbar(k, v, maxC, "本")).join("") : "";

    // 評価の分布
    const byR = [0, 0, 0, 0, 0];
    entries.forEach(e => { const r = Math.round(Number(e.rating) || 0); if (r >= 1 && r <= 5) byR[r - 1]++; });
    const maxR = Math.max(1, ...byR);
    const ratingChart = byR.some(v => v)
      ? `<div class="ch-h">評価の分布</div>` + [5, 4, 3, 2, 1].map(r => hbar("★" + r, byR[r - 1], maxR, "本")).join("") : "";

    // 喫煙時間（タイマー記録があるものだけ）
    const withDur = entries.filter(e => Number(e.duration) > 0);
    let durBlock = "";
    if (withDur.length) {
      const byV = {};
      withDur.forEach(e => {
        const k = e.vitola || "その他";
        (byV[k] = byV[k] || []).push(Number(e.duration));
      });
      const rows = Object.entries(byV).map(([k, arr]) =>
        `<div class="dur-row">${escN(k)}：平均 <b>${Math.round(arr.reduce((s, x) => s + x, 0) / arr.length)}分</b>（${arr.length}回）</div>`).join("");
      durBlock = `<div class="ch-h">喫煙時間（タイマー記録）</div>${rows}`;
    }

    ins.innerHTML = `
      <details class="insights">
        <summary>📊 くわしい統計 <span class="ins-year">今年 ${yearCount}本目</span></summary>
        <div class="ins-body">
          ${monthChart}
          <div class="ins-grid">
            <div>${countryChart}</div>
            <div>${ratingChart}</div>
          </div>
          ${durBlock}
          <div class="ins-actions"><button type="button" class="btn btn-sm btn-ghost" id="btnWrapped">🎁 年間まとめを見る</button></div>
        </div>
      </details>`;
    const bw = q("#btnWrapped");
    if (bw) bw.addEventListener("click", openWrapped);
  }

  /* ---------- リピート（同じ銘柄を何回吸ったか） ---------- */
  function repeatMap() {
    const m = new Map();
    entries.forEach(e => {
      const k = (e.name || "").trim();
      if (!k) return;
      if (!m.has(k)) m.set(k, []);
      m.get(k).push(e);
    });
    m.forEach(list => list.sort((a, b) => entryTime(a) - entryTime(b)));
    return m;
  }
  // フォームの銘柄名の下に、過去の記録のヒントを表示
  function updateRepeatHint() {
    const el = q("#repeatHint");
    if (!el) return;
    const name = q("#fName").value.trim();
    const curId = q("#entryId").value;
    const past = name ? entries.filter(x => (x.name || "").trim() === name && x.id !== curId) : [];
    if (!past.length) { el.hidden = true; el.textContent = ""; return; }
    const last = past.slice().sort((a, b) => entryTime(b) - entryTime(a))[0];
    const snip = (last.note || "").slice(0, 40);
    el.hidden = false;
    el.innerHTML = `🔁 この銘柄は過去 <b>${past.length}回</b> 記録しています（前回 ${last.rating ? "★" + last.rating : "評価なし"}・${escN(fmtDate(last.date))}${snip ? "「" + escN(snip) + (last.note.length > 40 ? "…" : "") + "」" : ""}）`;
  }

  /* ---------- 喫煙タイマー ---------- */
  function fmtElapsed(ms) {
    const m = Math.floor(ms / 60000), s = Math.floor(ms / 1000) % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  }
  function timerReset(dur) {
    timerStart = null; clearInterval(timerTick);
    const f = q("#fDuration"); if (f) f.value = dur || "";
    const b = q("#btnTimer"); if (b) { b.textContent = "▶ 喫煙タイマー開始"; b.classList.remove("on"); }
    const d = q("#timerDisp"); if (d) d.textContent = dur ? `記録済み：${dur}分` : "";
  }
  function timerToggle() {
    const b = q("#btnTimer"), d = q("#timerDisp");
    if (!timerStart) {
      timerStart = Date.now();
      b.textContent = "⏸ 終了して記録"; b.classList.add("on");
      d.textContent = "0:00";
      timerTick = setInterval(() => { d.textContent = fmtElapsed(Date.now() - timerStart); }, 1000);
    } else {
      const mins = Math.max(1, Math.round((Date.now() - timerStart) / 60000));
      timerReset(mins);
    }
  }

  /* ---------- AI講評（保存済みの記録に、AIの一言解説を付ける） ---------- */
  async function aiCommentFor(id, btn) {
    const en = entries.find(x => x.id === id);
    if (!en) return;
    const old = btn.textContent; btn.disabled = true; btn.textContent = "生成中…";
    try {
      const c = await VISION.comment({
        name: en.name, brand: en.brand, country: en.country, vitola: en.vitola,
        strength: en.strength, rating: en.rating, note: en.note, price: en.price
      });
      en.aiComment = c;
      await persistPut(en);
      if (cloudOn) CLOUD.upsert(en).catch(() => {});
      render();
    } catch (err) {
      btn.disabled = false; btn.textContent = old;
      alert("AI講評を生成できませんでした：" + (err.message || "エラー"));
    }
  }

  /* ---------- シェアカード（1件の記録を画像にして共有・保存） ---------- */
  function loadImg(src) {
    return new Promise((res) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = src; });
  }
  function wrapText(x, text, tx, ty, maxW, lh, maxLines) {
    const chars = [...String(text || "")];
    let line = "", lines = [];
    for (const ch of chars) {
      if (x.measureText(line + ch).width > maxW && line) {
        lines.push(line); line = ch;
        if (lines.length >= maxLines) { lines[maxLines - 1] += "…"; line = ""; break; }
      } else line += ch;
    }
    if (line) lines.push(line);
    lines = lines.slice(0, maxLines);
    lines.forEach((l, i) => x.fillText(l, tx, ty + i * lh));
    return ty + lines.length * lh;
  }
  async function drawShareCard(en) {
    const W = 1080, H = 1350;
    const c = document.createElement("canvas"); c.width = W; c.height = H;
    const x = c.getContext("2d");
    x.fillStyle = "#241812"; x.fillRect(0, 0, W, H);
    let py = 170;
    const img = en.photos && en.photos[0] ? await loadImg(en.photos[0]) : null;
    if (img) {
      const ph = 720;
      const s = Math.max(W / img.width, ph / img.height);
      const iw = img.width * s, ih = img.height * s;
      x.save(); x.beginPath(); x.rect(0, 0, W, ph); x.clip();
      x.drawImage(img, (W - iw) / 2, (ph - ih) / 2, iw, ih); x.restore();
      const g = x.createLinearGradient(0, ph - 200, 0, ph);
      g.addColorStop(0, "rgba(36,24,18,0)"); g.addColorStop(1, "rgba(36,24,18,1)");
      x.fillStyle = g; x.fillRect(0, ph - 200, W, 200);
      py = ph + 50;
    }
    x.strokeStyle = "#b5763a"; x.lineWidth = 2; x.strokeRect(34, 34, W - 68, H - 68);
    const serif = "'Hiragino Mincho ProN','Yu Mincho',serif";
    x.fillStyle = "#f3e9d8"; x.font = `600 60px ${serif}`;
    py = wrapText(x, en.name, 80, py + 30, W - 160, 74, 2);
    if (en.brand) { x.fillStyle = "#cf9a5e"; x.font = `40px ${serif}`; x.fillText(en.brand, 80, py + 24); py += 54; }
    if (en.rating) {
      const r = Math.max(0, Math.min(5, Number(en.rating) || 0));
      x.font = "52px serif";
      const fiveStars = "★★★★★";
      const wFull = x.measureText(fiveStars).width;
      // 背景（薄い5つ星）＋ 評価分だけ幅クリップして金色（半個も表現）
      x.fillStyle = "rgba(216,163,90,.3)"; x.fillText(fiveStars, 80, py + 44);
      x.save(); x.beginPath(); x.rect(80, py, wFull * (r / 5), 80); x.clip();
      x.fillStyle = "#d8a35a"; x.fillText(fiveStars, 80, py + 44); x.restore();
      py += 66;
    }
    const meta = [en.country, en.vitola, normalizeStrength(en.strength), en.duration ? `${en.duration}分` : "", en.price ? `¥${Number(en.price).toLocaleString()}` : "", en.location]
      .filter(Boolean).join("　·　");
    if (meta) { x.fillStyle = "#bba98f"; x.font = "33px sans-serif"; py = wrapText(x, meta, 80, py + 26, W - 160, 44, 2); }
    if (en.note) {
      x.fillStyle = "#d9cbb4"; x.font = `36px ${serif}`;
      py = wrapText(x, en.note, 80, py + 46, W - 160, 54, 4);
    }
    x.fillStyle = "#8d7a63"; x.font = "30px sans-serif";
    if (en.date) x.fillText(fmtDate(en.date), 80, H - 92);
    x.textAlign = "right";
    x.fillStyle = "#cf9a5e"; x.font = `34px ${serif}`;
    x.fillText("Cigar Cafe — 葉巻をたのしむ", W - 80, H - 92);
    x.textAlign = "left";
    return c;
  }
  async function shareEntry(id, btn) {
    const en = entries.find(x => x.id === id);
    if (!en) return;
    const old = btn.textContent; btn.disabled = true; btn.textContent = "作成中…";
    try {
      const canvas = await drawShareCard(en);
      const blob = await new Promise(r => canvas.toBlob(r, "image/png"));
      const file = new File([blob], "cigar-note.png", { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: en.name || "葉巻の記録" });
      } else {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob); a.download = file.name; a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 5000);
      }
    } catch (err) {
      if (!err || err.name !== "AbortError") alert("画像を作成できませんでした：" + (err && err.message || "エラー"));
    }
    btn.disabled = false; btn.textContent = old;
  }

  /* ---------- シェアメニュー（画像・リンク・テキスト） ---------- */
  function shareUrlFor(token) {
    return location.origin + location.pathname + "#share=" + token;
  }
  function randomToken() {
    const a = new Uint8Array(16);
    (crypto.getRandomValues ? crypto : { getRandomValues: (x) => { for (let i = 0; i < x.length; i++) x[i] = Math.floor(Math.random() * 256); return x; } }).getRandomValues(a);
    return [...a].map(b => b.toString(36)).join("").slice(0, 22);
  }
  async function copyText(t) {
    try { await navigator.clipboard.writeText(t); return true; }
    catch (e) {
      try {
        const ta = document.createElement("textarea");
        ta.value = t; document.body.appendChild(ta); ta.select();
        const ok = document.execCommand("copy"); ta.remove(); return ok;
      } catch (e2) { return false; }
    }
  }
  function entryText(en) {
    const rt = Math.max(0, Math.min(5, Number(en.rating) || 0));
    const full = Math.floor(rt);
    const star = rt ? "★".repeat(full) + "☆".repeat(5 - full) + `（${rt}/5）` : "";
    return [
      `🚬 ${en.name}`,
      [en.brand, en.country, en.vitola].filter(Boolean).join(" / "),
      star,
      [en.date ? fmtDate(en.date) : "", en.location ? "@" + en.location : ""].filter(Boolean).join(" "),
      en.note ? `「${en.note}」` : "",
      "— Cigar Cafe 記録ノート",
    ].filter(Boolean).join("\n");
  }
  // テキストでシェア（LINE等に貼れる）
  // テキスト共有。AI設定時は英語訳を自動で付けて日英併記にする（翻訳失敗時は日本語のみ）
  async function shareText(en, btn) {
    const jp = entryText(en);
    let out = jp, enText = "", failed = false;
    if (visionOn) {
      const old = btn ? btn.textContent : "";
      if (btn) { btn.disabled = true; btn.textContent = "英語を生成中…"; }
      try { enText = await VISION.translate(jp); }
      catch (e) { failed = true; }
      if (btn) { btn.disabled = false; btn.textContent = old; }
    }
    if (enText) out = jp + "\n\n———（English）———\n\n" + enText;
    if (navigator.share) {
      try { await navigator.share({ text: out }); return; }
      catch (err) { if (err && err.name === "AbortError") return; }
    }
    const ok = await copyText(out);
    const suffix = failed ? "（英語の付加に失敗したため日本語のみ。サーバー関数の更新が必要かもしれません）" : (enText ? "（日本語＋英語）" : "");
    alert(ok ? `テキスト${suffix}をコピーしました。LINEやメールに貼り付けてください。` : out);
  }
  // リンクでシェア（クラウドに公開コピーを置き、URLを渡す）
  async function shareLink(en, btn) {
    if (!cloudOn) { alert("リンクでのシェアには共有データベース（クラウド設定）が必要です。"); return; }
    const old = btn.textContent; btn.disabled = true; btn.textContent = "リンク作成中…";
    try {
      if (!en.shareId) { en.shareId = randomToken(); }
      // 公開コピーには内部管理用の情報を含めない
      const pub = {
        name: en.name, brand: en.brand, country: en.country, vitola: en.vitola,
        strength: en.strength, date: en.date, price: en.price, location: en.location,
        rating: en.rating, note: en.note, photos: en.photos || [],
        author: en.author || "", aiComment: en.aiComment || ""
      };
      await CLOUD.shareUpsert(en.shareId, pub);
      await persistPut(en);
      if (cloudOn) CLOUD.upsert(en).catch(() => {});
      const url = shareUrlFor(en.shareId);
      if (navigator.share) {
        try { await navigator.share({ url, title: en.name || "葉巻の記録" }); btn.disabled = false; btn.textContent = old; return; }
        catch (err) { if (err && err.name === "AbortError") { btn.disabled = false; btn.textContent = old; return; } }
      }
      alert((await copyText(url)) ? "共有リンクをコピーしました：\n" + url : "リンクを作成しました：\n" + url);
    } catch (err) {
      const msg = String(err && err.message || err);
      if (/does not exist|42P01/i.test(msg)) {
        alert("共有リンク用のテーブルが未作成です。DATABASE_SETUP.md の「共有リンク」のSQLをSupabaseで実行してください。");
      } else {
        alert("共有リンクを作成できませんでした：" + msg);
      }
    }
    btn.disabled = false; btn.textContent = old;
  }
  function openShareMenu(id) {
    const en = entries.find(x => x.id === id);
    if (!en) return;
    let ov = q("#shareMenuOv");
    if (!ov) {
      ov = document.createElement("div");
      ov.id = "shareMenuOv"; ov.className = "wrapped-ov";
      document.body.appendChild(ov);
      ov.addEventListener("click", (ev) => { if (ev.target === ov) ov.classList.remove("open"); });
    }
    ov.innerHTML = `<div class="share-menu">
      <div class="sm-title">「${escN(en.name)}」をシェア</div>
      <button type="button" class="sm-item" data-sm="img">🖼 画像で共有<span class="sm-sub">写真つきのカード画像を作成して共有・保存</span></button>
      <button type="button" class="sm-item" data-sm="link">🔗 リンクで共有<span class="sm-sub">URLを送るだけで、相手のブラウザで記録が見られる</span></button>
      <button type="button" class="sm-item" data-sm="text">📝 テキストで共有<span class="sm-sub">${visionOn ? "日本語＋英語（AI自動翻訳）をコピー・共有" : "LINEやメールに貼れる文章をコピー"}</span></button>
      <button type="button" class="btn btn-ghost btn-sm sm-cancel">キャンセル</button>
    </div>`;
    ov.classList.add("open");
    ov.querySelector(".sm-cancel").addEventListener("click", () => ov.classList.remove("open"));
    ov.querySelectorAll("[data-sm]").forEach(b => b.addEventListener("click", async () => {
      if (b.dataset.sm === "img") { ov.classList.remove("open"); shareEntry(id, b); }
      else if (b.dataset.sm === "text") { await shareText(en, b); ov.classList.remove("open"); }
      else if (b.dataset.sm === "link") { await shareLink(en, b); ov.classList.remove("open"); }
    }));
  }

  /* ---------- 共有リンクの閲覧（#share=トークン で誰でも見られる） ---------- */
  async function maybeShowShared() {
    const m = /#share=([a-z0-9]+)/i.exec(location.hash || "");
    if (!m) return;
    if (typeof CLOUD === "undefined" || !CLOUD.enabled) return;
    let ov = document.createElement("div");
    ov.className = "wrapped-ov open";
    ov.innerHTML = `<div class="share-view"><p style="padding:30px;text-align:center">記録を読み込んでいます…</p></div>`;
    document.body.appendChild(ov);
    ov.addEventListener("click", (ev) => { if (ev.target === ov) ov.remove(); });
    let en = null;
    try { en = await CLOUD.shareGet(m[1]); } catch (err) { console.warn(err); }
    if (!en) {
      ov.querySelector(".share-view").innerHTML = `<button type="button" class="modal-x" data-svx>×</button><p style="padding:26px;text-align:center">共有された記録が見つかりませんでした。<br>リンクが削除されたか、期限切れの可能性があります。</p>`;
      ov.querySelector("[data-svx]").addEventListener("click", () => ov.remove());
      return;
    }
    ov.querySelector(".share-view").innerHTML = `
      <button type="button" class="modal-x" data-svx aria-label="閉じる">×</button>
      <div class="wr-kicker">SHARED FROM CIGAR CAFE</div>
      <h3>${escN(en.name)}</h3>
      ${en.brand ? `<div class="sv-brand">${escN(en.brand)}</div>` : ""}
      ${en.rating ? `<div>${stars(en.rating)}</div>` : ""}
      <div class="e-meta" style="margin-top:10px">
        ${en.country ? `<span class="chip">${escN(en.country)}</span>` : ""}
        ${en.vitola ? `<span class="chip">${escN(en.vitola)}</span>` : ""}
        ${en.strength ? `<span class="chip">${escN(normalizeStrength(en.strength))}</span>` : ""}
        ${en.price ? `<span class="chip">¥${Number(en.price).toLocaleString()}</span>` : ""}
        ${en.location ? `<span class="chip">${escN(en.location)}</span>` : ""}
        ${en.date ? `<span class="chip">${escN(fmtDate(en.date))}</span>` : ""}
      </div>
      ${en.note ? `<div class="e-note" style="margin-top:12px">${escN(en.note)}</div>` : ""}
      ${en.aiComment ? `<div class="e-ai">✨ ${escN(en.aiComment)}</div>` : ""}
      ${Array.isArray(en.photos) && en.photos.length
        ? `<div class="entry-photos" style="margin-top:12px">${en.photos.map(src => `<img class="entry-photo sv-photo" src="${src}" alt="共有写真">`).join("")}</div>` : ""}
      ${en.author ? `<div class="sv-author">記録：${escN(en.author)}</div>` : ""}
      <div class="sv-foot">Cigar Cafe — 葉巻をたのしむ</div>`;
    ov.querySelector("[data-svx]").addEventListener("click", () => ov.remove());
    ov.querySelectorAll(".sv-photo").forEach(img => img.addEventListener("click", () => openLightbox(img.src)));
  }

  /* ---------- 年間まとめ（Year in Smoke） ---------- */
  function openWrapped() {
    const years = [...new Set(entries.map(e => (e.date || "").slice(0, 4)).filter(v => /^\d{4}$/.test(v)))].sort().reverse();
    const y0 = years[0] || String(new Date().getFullYear());
    let ov = q("#wrappedOv");
    if (!ov) {
      ov = document.createElement("div");
      ov.id = "wrappedOv"; ov.className = "wrapped-ov";
      document.body.appendChild(ov);
      ov.addEventListener("click", (ev) => { if (ev.target === ov) ov.classList.remove("open"); });
    }
    const renderY = (year) => {
      const list = entries.filter(e => (e.date || "").startsWith(year));
      const spent = list.reduce((s, e) => s + (Number(e.price) || 0), 0);
      const rated = list.filter(e => e.rating > 0);
      const best = rated.slice().sort((a, b) => b.rating - a.rating || entryTime(b) - entryTime(a))[0];
      const byB = {}; list.forEach(e => { if (e.brand) byB[e.brand] = (byB[e.brand] || 0) + 1; });
      const topB = Object.entries(byB).sort((a, b) => b[1] - a[1])[0];
      const byL = {}; list.forEach(e => { if (e.location) byL[e.location] = (byL[e.location] || 0) + 1; });
      const topL = Object.entries(byL).sort((a, b) => b[1] - a[1])[0];
      const cs = new Set(list.map(e => e.country).filter(Boolean)).size;
      ov.innerHTML = `<div class="wrapped-card">
        <button type="button" class="modal-x" id="wrClose" aria-label="閉じる">×</button>
        <div class="wr-kicker">CIGAR CAFE · YEAR IN SMOKE</div>
        <h3>${escN(year)}年のまとめ</h3>
        ${years.length > 1 ? `<div class="wr-years">${years.map(v => `<button type="button" class="chip${v === year ? " on" : ""}" data-wy="${v}">${v}</button>`).join("")}</div>` : ""}
        ${list.length ? `
        <div class="wr-grid">
          <div class="wr-stat"><div class="sv">${list.length}</div><div class="sl">吸った本数</div></div>
          <div class="wr-stat"><div class="sv">¥${spent.toLocaleString()}</div><div class="sl">総額</div></div>
          <div class="wr-stat"><div class="sv">${cs}</div><div class="sl">産地の数</div></div>
          <div class="wr-stat"><div class="sv">${rated.length ? (rated.reduce((s, e) => s + e.rating, 0) / rated.length).toFixed(1) : "—"}</div><div class="sl">平均評価（★）</div></div>
        </div>
        ${topB ? `<div class="wr-line">いちばん吸ったブランド：<b>${escN(topB[0])}</b>（${topB[1]}本）</div>` : ""}
        ${best ? `<div class="wr-line">ベストの一本：<b>${escN(best.name)}</b> ${stars(best.rating)}</div>` : ""}
        ${topL ? `<div class="wr-line">よく楽しんだ場所：<b>${escN(topL[0])}</b>（${topL[1]}回）</div>` : ""}
        ` : `<p class="wr-line">${escN(year)}年の記録はまだありません。</p>`}
      </div>`;
      ov.querySelector("#wrClose").addEventListener("click", () => ov.classList.remove("open"));
      ov.querySelectorAll("[data-wy]").forEach(b => b.addEventListener("click", () => renderY(b.dataset.wy)));
    };
    renderY(y0);
    ov.classList.add("open");
  }

  /* ---------- 一覧描画 ---------- */
  // 「2026-07-15」→「2026.7.15」の読みやすい表示に
  function fmtDate(d) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(d || "");
    return m ? `${m[1]}.${Number(m[2])}.${Number(m[3])}` : (d || "");
  }
  function sortEntries(list) {
    const arr = list.slice();
    const t = (e) => e.date ? new Date(e.date + "T12:00").getTime() : (e.created || 0);
    if (sortMode === "old") arr.sort((a, b) => t(a) - t(b));
    else if (sortMode === "rating") arr.sort((a, b) => (b.rating || 0) - (a.rating || 0) || t(b) - t(a));
    else if (sortMode === "price") arr.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0) || t(b) - t(a));
    else arr.sort((a, b) => t(b) - t(a));
    return arr;
  }

  function render() {
    load.done || (load(), load.done = true);
    renderStats();
    q("#entryCount").textContent = `${entries.length} 本`;

    const term = searchTerm.trim().toLowerCase();
    const list = sortEntries(term
      ? entries.filter(e =>
          [e.name, e.brand, e.country, e.vitola, e.location, e.author, e.note]
            .some(v => (v || "").toLowerCase().includes(term)))
      : entries);

    const area = q("#entriesArea");
    const needName = cloudOn && !authorName();   // クラウド有効だが記録者名が未入力
    if (!entries.length) {
      area.innerHTML = needName
        ? `<div class="empty-state">
             <p style="margin-top:10px">「記録者」にお名前を入力すると、クラウドに保存した自分の記録が表示されます。<br>この端末にはまだ記録がありません。</p>
           </div>`
        : `<div class="empty-state">
             <p style="margin-top:10px">まだ記録がありません。<br>「＋ 一本を記録する」から、最初の一本を書き留めましょう。</p>
           </div>`;
      return;
    }
    if (!list.length) {
      area.innerHTML = `<div class="empty-state"><p style="margin-top:10px">「${escN(searchTerm)}」に一致する記録は見つかりませんでした。</p></div>`;
      return;
    }

    // 名前未入力でも手元の記録は隠さず、クラウド保存を促す案内だけ上に添える
    const cloudBanner = needName
      ? `<div class="cloud-hint">☁ この端末に保存された記録を表示中です。上の「記録者」にお名前を入れると、クラウドに保存されて別の端末でも使え、消えなくなります。</div>`
      : "";
    const rm = repeatMap();
    area.innerHTML = cloudBanner + `<div class="entry-grid">${list.map(e => {
      const same = rm.get((e.name || "").trim()) || [];
      const nth = same.length > 1 ? same.indexOf(e) + 1 : 0;
      return `
      <div class="entry">
        <div class="e-top">
          <div class="e-title">
            <h4>${escN(e.name)}</h4>
            ${e.brand ? `<div class="e-brand">${escN(e.brand)}</div>` : ""}
            ${e.author ? `<div class="e-author">${escN(e.author)}</div>` : ""}
          </div>
          <div class="e-side">
            <div class="e-date">${escN(fmtDate(e.date))}</div>
            ${e.rating ? stars(e.rating) : ""}
          </div>
        </div>
        <div class="e-meta">
          ${nth ? `<span class="chip repeat">🔁 ${nth}回目</span>` : ""}
          ${e.country ? `<span class="chip">${escN(e.country)}</span>` : ""}
          ${e.vitola ? `<span class="chip">${escN(e.vitola)}</span>` : ""}
          ${e.strength ? `<span class="chip">${escN(normalizeStrength(e.strength))}</span>` : ""}
          ${Number(e.duration) > 0 ? `<span class="chip">⏱ ${Number(e.duration)}分</span>` : ""}
          ${e.price ? `<span class="chip">¥${Number(e.price).toLocaleString()}</span>` : ""}
          ${e.location ? `<span class="chip">${escN(e.location)}</span>` : ""}
        </div>
        ${e.note ? (e.note.length > 120
          ? `<div class="e-note clamp">${escN(e.note)}</div><button type="button" class="e-note-more" data-more>続きを読む</button>`
          : `<div class="e-note">${escN(e.note)}</div>`) : ""}
        ${e.aiComment ? `<div class="e-ai">✨ ${escN(e.aiComment)}</div>` : ""}
        ${Array.isArray(e.photos) && e.photos.length
          ? `<div class="entry-photos">${e.photos.map((src, i) =>
              `<img class="entry-photo" src="${src}" alt="${escN(e.name)}の写真${i + 1}">`).join("")}</div>`
          : ""}
        <div class="e-actions">
          <button class="btn btn-sm btn-ghost" data-edit="${e.id}">編集</button>
          <button class="btn btn-sm btn-ghost" data-share="${e.id}">シェア</button>
          ${visionOn && !e.aiComment ? `<button class="btn btn-sm btn-ghost" data-aic="${e.id}">AI講評</button>` : ""}
          <button class="btn btn-sm btn-danger" data-del="${e.id}">削除</button>
        </div>
      </div>`; }).join("")}</div>`;
  }

  /* ---------- エクスポート / インポート ---------- */
  function exportJSON() {
    if (!entries.length) { alert("記録がまだありません。"); return; }
    const blob = new Blob([JSON.stringify(entries, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cigar-journal.json";
    a.click();
    URL.revokeObjectURL(url);
  }
  function importJSON(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!Array.isArray(data)) throw new Error("形式が不正です");
        if (cloudOn && !authorName()) {
          alert("先に上の「記録者」にお名前を入力してから読み込んでください（その名前であなたの記録として保存されます）。");
          const ai = q("#authorName"); if (ai) ai.focus();
          return;
        }
        const merge = confirm("既存の記録に追加しますか？\n［OK＝追加 / キャンセル＝すべて置き換え］");
        // 共有モードでは取り込む記録に記録者名を付与（自分の記録として同期・表示されるように）
        const who = cloudOn ? authorName() : "";
        const cleaned = data.filter(d => d && d.name).map(d => ({
          id: d.id || (uid()), created: d.created || Date.now(),
          name: d.name, brand: d.brand || "", country: d.country || "",
          vitola: d.vitola || "", strength: d.strength || "",
          date: d.date || "", price: d.price ?? null,
          location: d.location || "",
          rating: Number(d.rating) || 0, note: d.note || "",
          photos: Array.isArray(d.photos) ? d.photos.filter(p => typeof p === "string") : [],
          author: d.author || who, owner: who || d.owner || ""
        }));
        entries = merge ? [...cleaned, ...entries] : cleaned;
        // 重複ID回避
        const seen = new Set();
        entries = entries.filter(e => (seen.has(e.id) ? (e.id = uid(), true) : (seen.add(e.id), true)));
        persistReplaceAll(entries);
        render();
        if (cloudOn) CLOUD.replaceAll(entries).catch(err => { console.warn(err); alert("共有DBへの反映に一部失敗しました。"); });
        alert(`${cleaned.length} 件の記録を読み込みました。`);
      } catch (err) {
        alert("読み込みに失敗しました：" + err.message);
      }
    };
    reader.readAsText(file);
  }

  /* ---------- モード表示・記録者 ---------- */
  function renderMode() {
    const el = q("#noteMode");
    if (!el) return;
    if (cloudOn) { el.textContent = "共有DB（自分の記録だけ表示）"; el.classList.add("cloud"); }
    else { el.textContent = usingIDB ? "この端末に保存（大容量）" : "この端末に保存"; el.classList.remove("cloud"); }
  }

  /* ---------- 初期化 ---------- */
  function init() {
    // 共有リンク（#share=…）で開かれた場合は、その記録を表示
    maybeShowShared();

    // 旧localStorage → IndexedDB の移行と読み込み（完了後に再描画）。
    // 手元の記録を読み込んでから、クラウド同期（有効時）を行うことで既存記録を確実に引き上げる。
    loadStore().then(() => {
      load.done = true;
      renderMode();
      render();
      if (cloudOn) loadCloud().then(ok => { if (ok) render(); });
    });
    renderMode();

    // 記録者名
    const authorInput = q("#authorName");
    if (authorInput) {
      authorInput.value = authorName();
      // 入力中はヒント/表示だけ更新
      authorInput.addEventListener("input", (e) => {
        setAuthorName(e.target.value.trim());
        render();
      });
      // 共有モードでは「入力が確定したとき（フォーカスを外す/Enter）」に読み込み直す。
      // 途中の文字で誤って記録が別名に引き上げられるのを防ぐため input ではなく change を使う。
      if (cloudOn) {
        authorInput.addEventListener("change", () => {
          setAuthorName(authorInput.value.trim());
          loadCloud().then(() => render());
        });
      }
    }

    q("#btnNewEntry").addEventListener("click", () => openModal(null));
    q("#noteFab").addEventListener("click", () => openModal(null));
    q("#btnCancel").addEventListener("click", closeModal);
    q("#btnCancelX").addEventListener("click", closeModal);
    q("#entryForm").addEventListener("submit", submit);
    // Ctrl/⌘+Enter で保存
    q("#entryForm").addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); submit(e); }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (q("#lightbox").classList.contains("open")) closeLightbox();
        else if (!q("#entryPanel").hidden) closeModal();
      }
    });

    // 写真の追加
    q("#fPhotoInput").addEventListener("change", (e) => {
      if (e.target.files && e.target.files.length) addPhotos(e.target.files);
      e.target.value = "";
    });
    // 写真AI自動入力：設定済みのときだけボタンを表示
    const aiFill = q("#aiFill");
    if (aiFill) aiFill.hidden = !visionOn;
    const btnAi = q("#btnAiFill");
    if (btnAi) btnAi.addEventListener("click", () => runVision(currentPhotos[0]));

    // 喫煙タイマー
    const btnT = q("#btnTimer");
    if (btnT) btnT.addEventListener("click", timerToggle);

    // 銘柄名：過去の記録ヒント（リピート表示）
    let rhTimer = null;
    q("#fName").addEventListener("input", () => {
      clearTimeout(rhTimer);
      rhTimer = setTimeout(updateRepeatHint, 300);
    });

    // 為替換算（レートは通貨ごとに記憶）
    const fxCur = q("#fxCur"), fxRate = q("#fxRate"), fxAmount = q("#fxAmount");
    if (fxCur && fxRate && fxAmount) {
      const rates = (() => { try { return JSON.parse(localStorage.getItem(FX_KEY)) || {}; } catch (e) { return {}; } })();
      const loadRate = () => { if (rates[fxCur.value]) fxRate.value = rates[fxCur.value]; };
      loadRate();
      fxCur.addEventListener("change", loadRate);
      q("#fxApply").addEventListener("click", () => {
        const a = Number(fxAmount.value), r = Number(fxRate.value);
        if (!(a > 0) || !(r > 0)) { q("#fxHint").textContent = "金額とレート（1通貨＝何円か）を入れてください。"; return; }
        rates[fxCur.value] = r;
        try { localStorage.setItem(FX_KEY, JSON.stringify(rates)); } catch (e) {}
        const yen = Math.round(a * r);
        q("#fPrice").value = yen;
        q("#fxHint").textContent = `${a} ${fxCur.value} × ${r}円 ＝ 約 ¥${yen.toLocaleString()} を価格欄に入れました。`;
      });
    }
    // 写真プレビュー：×で削除、写真タップで拡大表示
    q("#photoPreviews").addEventListener("click", (e) => {
      const rm = e.target.closest("[data-rmphoto]");
      if (rm) { currentPhotos.splice(Number(rm.dataset.rmphoto), 1); renderPhotoPreviews(); return; }
      const img = e.target.closest(".photo-thumb img");
      if (img) openLightbox(img.src);
    });
    // ライトボックス（記録カードの写真を拡大）
    q("#entriesArea").addEventListener("click", (e) => {
      const img = e.target.closest(".entry-photo");
      if (img) openLightbox(img.src);
    });
    const lb = q("#lightbox");
    lb.addEventListener("click", closeLightbox);
    q("#lbClose").addEventListener("click", closeLightbox);

    // ブランド「その他」で自由入力欄を表示。既知ブランドなら産地を自動入力
    q("#fBrand").addEventListener("change", (e) => {
      const other = q("#fBrandOther");
      if (e.target.value === "__other") {
        other.style.display = "";
        other.focus();
      } else {
        other.style.display = "none";
        other.value = "";
        const c = countryOfBrand(e.target.value);
        if (c && !getCountry()) setCountry(c);
      }
    });

    // 産地：「その他」で自由入力欄を表示
    q("#fCountry").addEventListener("change", (e) => {
      const other = q("#fCountryOther");
      if (e.target.value === "__other") { other.style.display = ""; other.focus(); }
      else { other.style.display = "none"; other.value = ""; }
    });

    // 強さ：ワンタップ選択（同じボタン再タップで解除）
    const seg = q("#strengthSeg");
    if (seg) seg.addEventListener("click", (e) => {
      const b = e.target.closest("[data-strength]");
      if (b) setStrength(q("#fStrength").value === b.dataset.strength ? "" : b.dataset.strength);
    });

    // 喫煙場所チップ：タップで入力（同じ場所を再タップで解除、自由記載も可）
    const locChips = q("#locationChips");
    if (locChips) locChips.addEventListener("click", (e) => {
      const b = e.target.closest("[data-loc]");
      if (!b) return;
      const inp = q("#fLocation");
      inp.value = inp.value === b.dataset.loc ? "" : b.dataset.loc;
      syncLocChips();
    });
    q("#fLocation").addEventListener("input", syncLocChips);

    // テイスティング用語チップ：タップでメモに追加（読点区切り）
    const chips = q("#memoChips");
    if (chips) chips.addEventListener("click", (e) => {
      const b = e.target.closest("[data-word]");
      if (!b) return;
      const ta = q("#fNote");
      const cur = ta.value;
      if (!cur.trim()) ta.value = b.dataset.word;
      else if (/[。\n]\s*$/.test(cur)) ta.value = cur + b.dataset.word;
      else ta.value = cur.replace(/[、,\s]*$/, "") + "、" + b.dataset.word;
      ta.focus();
    });

    // 星入力：星の左半分タップで0.5、右半分で1.0（半個刻み＝10段階）。同じ値を再タップで0.5下げる
    q("#ratingInput").addEventListener("click", (e) => {
      const s = e.target.closest(".star");
      if (!s) return;
      const v = Number(s.dataset.v);
      const rect = s.getBoundingClientRect();
      const leftHalf = (e.clientX - rect.left) < rect.width / 2;
      const val = leftHalf ? v - 0.5 : v;
      setRating(Number(q("#fRating").value) === val ? val - 0.5 : val);
    });

    // 検索
    q("#noteSearch").addEventListener("input", (e) => {
      searchTerm = e.target.value; render();
    });

    // 並び替え
    const sortSel = q("#noteSort");
    if (sortSel) sortSel.addEventListener("change", (e) => { sortMode = e.target.value; render(); });

    // 編集・削除・共有・AI講評・「続きを読む」（イベント委譲）
    q("#entriesArea").addEventListener("click", (e) => {
      const ed = e.target.closest("[data-edit]");
      const dl = e.target.closest("[data-del]");
      const sh = e.target.closest("[data-share]");
      const aic = e.target.closest("[data-aic]");
      const more = e.target.closest("[data-more]");
      if (ed) openModal(entries.find(x => x.id === ed.dataset.edit));
      if (dl) removeEntry(dl.dataset.del);
      if (sh) openShareMenu(sh.dataset.share);
      if (aic) aiCommentFor(aic.dataset.aic, aic);
      if (more) {
        const note = more.previousElementSibling;
        const open = note.classList.toggle("clamp") === false;
        more.textContent = open ? "閉じる" : "続きを読む";
      }
    });

    // エクスポート/インポート
    q("#btnExport").addEventListener("click", exportJSON);
    q("#btnImport").addEventListener("click", () => q("#importFile").click());
    q("#importFile").addEventListener("change", (e) => {
      if (e.target.files[0]) importJSON(e.target.files[0]);
      e.target.value = "";
    });
  }

  /* 他モジュール（吸いたいリスト・在庫）から、値を入れた状態で記録フォームを開く */
  function prefillNew(v) {
    if (typeof showView === "function") showView("note");
    openModal(null);
    if (v) {
      fillSelects();
      if (v.name) q("#fName").value = v.name;
      if (v.brand) setBrand(v.brand);
      if (v.country) setCountry(v.country);
      updateRepeatHint();
    }
  }

  return { init, render, prefillNew };
})();
