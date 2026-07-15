/* ============================================================
   葉巻大辞典 — 記録ノート（localStorage）
   吸った葉巻を記録・検索・評価・エクスポート/インポート
   ============================================================ */

const NOTE = (() => {
  const KEY = "cigar_journal_v1";
  const AUTHOR_KEY = "cigar_author";
  const q = (s, el = document) => el.querySelector(s);
  const escN = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

  let entries = [];
  let searchTerm = "";
  let sortMode = "new";
  let currentPhotos = [];       // モーダル編集中の写真（dataURL配列）
  const MAX_PHOTOS = 6;
  const cloudOn = typeof CLOUD !== "undefined" && CLOUD.enabled;

  function authorName() { try { return localStorage.getItem(AUTHOR_KEY) || ""; } catch (e) { return ""; } }
  function setAuthorName(v) { try { localStorage.setItem(AUTHOR_KEY, v); } catch (e) {} }

  /* ---------- 画像リサイズ（localStorage節約のため縮小・圧縮） ---------- */
  function resizeImage(file, maxDim = 1000, quality = 0.72) {
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

  /* ---------- 永続化 ---------- */
  function load() {
    try { entries = JSON.parse(localStorage.getItem(KEY)) || []; }
    catch (e) { entries = []; }
  }
  // クラウド有効時：共有DBから「自分（記録者名）の記録だけ」を読み込む
  async function loadCloud() {
    if (!cloudOn) return false;
    const owner = authorName();
    if (!owner) { entries = []; return true; }   // 名前未入力なら空（下でヒント表示）
    try {
      const remote = await CLOUD.list(owner);
      entries = remote;
      return true;
    } catch (err) {
      console.warn("クラウド読み込み失敗、ローカルを使用します:", err);
      return false;
    }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(entries)); return true; }
    catch (e) {
      alert("保存できませんでした。写真の枚数が多いと端末の保存容量を超えることがあります。写真を減らすか、不要な記録を削除してからお試しください。");
      return false;
    }
  }
  function uid() {
    return "e" + Date.now().toString(36) + Math.floor(Math.random() * 1e6).toString(36);
  }

  /* ---------- 星評価 ---------- */
  function stars(n) {
    n = Number(n) || 0;
    let out = "";
    for (let i = 1; i <= 5; i++)
      out += `<span class="${i <= n ? "" : "off"}">★</span>`;
    return `<span class="stars">${out}</span>`;
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
      cSel.innerHTML = `<option value="">—</option>` +
        CIGAR_DATA.countries.map(c => `<option>${escN(c.name_ja)}</option>`).join("") +
        `<option>その他</option>`;
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
    q("#fCountry").value = isEdit ? (entry.country || "") : "";
    q("#fVitola").value = isEdit ? (entry.vitola || "") : "";
    setStrength(isEdit ? (entry.strength || "") : "");
    q("#fDate").value = isEdit ? (entry.date || "") : todayStr();
    q("#fPrice").value = isEdit ? (entry.price ?? "") : "";
    q("#fLocation").value = isEdit ? (entry.location || "") : "";
    q("#fNote").value = isEdit ? (entry.note || "") : "";
    currentPhotos = isEdit && Array.isArray(entry.photos) ? entry.photos.slice() : [];
    renderPhotoPreviews();
    setRating(isEdit ? (entry.rating || 0) : 0);
    const panel = q("#entryPanel");
    panel.hidden = false;
    // 記録ボタンは開いている間は隠して重複を防ぐ
    const hero = q("#btnNewEntry"); if (hero) hero.style.display = "none";
    // フォームの先頭が見えるようスクロール
    setTimeout(() => {
      panel.scrollIntoView({ behavior: "smooth", block: "start" });
      q("#fName").focus({ preventScroll: true });
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
    for (const f of list) {
      if (!f.type.startsWith("image/")) continue;
      try { currentPhotos.push(await resizeImage(f)); }
      catch (err) { alert("画像の処理に失敗しました：" + err.message); }
    }
    renderPhotoPreviews();
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

  function todayStr() {
    const d = new Date();
    const p = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
  }

  /* ---------- 星入力 ---------- */
  const RATING_WORDS = { 0: "タップで評価", 1: "イマイチ", 2: "まずまず", 3: "良い", 4: "とても良い", 5: "最高の一本" };
  function setRating(n) {
    q("#fRating").value = n;
    q("#ratingInput").querySelectorAll(".star").forEach(s =>
      s.classList.toggle("on", Number(s.dataset.v) <= n));
    const lbl = q("#ratingLabel");
    if (lbl) { lbl.textContent = RATING_WORDS[n] || ""; lbl.classList.toggle("set", n > 0); }
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

  /* ---------- 保存処理 ---------- */
  function submit(e) {
    e.preventDefault();
    const id = q("#entryId").value;
    const data = {
      name: q("#fName").value.trim(),
      brand: getBrand(),
      country: q("#fCountry").value,
      vitola: q("#fVitola").value,
      strength: q("#fStrength").value,
      date: q("#fDate").value,
      price: q("#fPrice").value ? Number(q("#fPrice").value) : null,
      location: q("#fLocation").value.trim(),
      rating: Number(q("#fRating").value) || 0,
      note: q("#fNote").value.trim(),
      photos: currentPhotos.slice()
    };
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
    if (!save()) { entries = backup; return; }   // 失敗時は元に戻しモーダルを開いたまま
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
    save();
    render();
    if (cloudOn) CLOUD.remove(id).catch(err => { console.warn(err); alert("共有データベースからの削除に失敗しました。時間をおいて再度お試しください。"); });
  }

  /* ---------- 統計 ---------- */
  function renderStats() {
    const box = q("#noteStats");
    if (!entries.length) { box.innerHTML = ""; return; }
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
    if (cloudOn && !authorName()) {
      area.innerHTML = `
        <div class="empty-state">
          
          <p style="margin-top:10px">共有モードです。上の「記録者」にお名前を入力すると、<br><b>あなたの記録だけ</b>が表示されます。</p>
        </div>`;
      return;
    }
    if (!entries.length) {
      area.innerHTML = `
        <div class="empty-state">
          
          <p style="margin-top:10px">まだ記録がありません。<br>「＋ 一本を記録する」から、最初の一本を書き留めましょう。</p>
        </div>`;
      return;
    }
    if (!list.length) {
      area.innerHTML = `<div class="empty-state"><p style="margin-top:10px">「${escN(searchTerm)}」に一致する記録は見つかりませんでした。</p></div>`;
      return;
    }

    area.innerHTML = `<div class="entry-grid">${list.map(e => `
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
          ${e.country ? `<span class="chip">${escN(e.country)}</span>` : ""}
          ${e.vitola ? `<span class="chip">${escN(e.vitola)}</span>` : ""}
          ${e.strength ? `<span class="chip">${escN(normalizeStrength(e.strength))}</span>` : ""}
          ${e.price ? `<span class="chip">¥${Number(e.price).toLocaleString()}</span>` : ""}
          ${e.location ? `<span class="chip">${escN(e.location)}</span>` : ""}
        </div>
        ${e.note ? (e.note.length > 120
          ? `<div class="e-note clamp">${escN(e.note)}</div><button type="button" class="e-note-more" data-more>続きを読む</button>`
          : `<div class="e-note">${escN(e.note)}</div>`) : ""}
        ${Array.isArray(e.photos) && e.photos.length
          ? `<div class="entry-photos">${e.photos.map((src, i) =>
              `<img class="entry-photo" src="${src}" alt="${escN(e.name)}の写真${i + 1}">`).join("")}</div>`
          : ""}
        <div class="e-actions">
          <button class="btn btn-sm btn-ghost" data-edit="${e.id}">編集</button>
          <button class="btn btn-sm btn-danger" data-del="${e.id}">削除</button>
        </div>
      </div>`).join("")}</div>`;
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
        const merge = confirm("既存の記録に追加しますか？\n［OK＝追加 / キャンセル＝すべて置き換え］");
        const cleaned = data.filter(d => d && d.name).map(d => ({
          id: d.id || (uid()), created: d.created || Date.now(),
          name: d.name, brand: d.brand || "", country: d.country || "",
          vitola: d.vitola || "", strength: d.strength || "",
          date: d.date || "", price: d.price ?? null,
          location: d.location || "",
          rating: Number(d.rating) || 0, note: d.note || "",
          photos: Array.isArray(d.photos) ? d.photos.filter(p => typeof p === "string") : []
        }));
        entries = merge ? [...cleaned, ...entries] : cleaned;
        // 重複ID回避
        const seen = new Set();
        entries = entries.filter(e => (seen.has(e.id) ? (e.id = uid(), true) : (seen.add(e.id), true)));
        save();
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
    else { el.textContent = "この端末に保存"; el.classList.remove("cloud"); }
  }

  /* ---------- 初期化 ---------- */
  function init() {
    load(); load.done = true;
    renderMode();

    // 記録者名
    const authorInput = q("#authorName");
    let authorTimer = null;
    if (authorInput) {
      authorInput.value = authorName();
      authorInput.addEventListener("input", (e) => {
        setAuthorName(e.target.value.trim());
        render();  // 即座にヒント/表示を更新
        // 共有モードでは名前確定後に自分の記録を読み込み直す（入力途中の連打を抑制）
        if (cloudOn) {
          clearTimeout(authorTimer);
          authorTimer = setTimeout(() => { loadCloud().then(() => render()); }, 600);
        }
      });
    }
    // クラウド有効時は共有DBから最新を取得して再描画
    if (cloudOn) loadCloud().then(ok => { if (ok) render(); });

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
    // 写真プレビューの削除
    q("#photoPreviews").addEventListener("click", (e) => {
      const rm = e.target.closest("[data-rmphoto]");
      if (rm) { currentPhotos.splice(Number(rm.dataset.rmphoto), 1); renderPhotoPreviews(); }
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
        const cSel = q("#fCountry");
        if (c && cSel && !cSel.value && [...cSel.options].some(o => o.value === c)) cSel.value = c;
      }
    });

    // 強さ：ワンタップ選択（同じボタン再タップで解除）
    const seg = q("#strengthSeg");
    if (seg) seg.addEventListener("click", (e) => {
      const b = e.target.closest("[data-strength]");
      if (b) setStrength(q("#fStrength").value === b.dataset.strength ? "" : b.dataset.strength);
    });

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

    // 星入力
    q("#ratingInput").addEventListener("click", (e) => {
      const s = e.target.closest(".star");
      if (s) {
        const v = Number(s.dataset.v);
        // 同じ星を再クリックで解除
        setRating(Number(q("#fRating").value) === v ? v - 1 : v);
      }
    });

    // 検索
    q("#noteSearch").addEventListener("input", (e) => {
      searchTerm = e.target.value; render();
    });

    // 並び替え
    const sortSel = q("#noteSort");
    if (sortSel) sortSel.addEventListener("change", (e) => { sortMode = e.target.value; render(); });

    // 編集・削除・「続きを読む」（イベント委譲）
    q("#entriesArea").addEventListener("click", (e) => {
      const ed = e.target.closest("[data-edit]");
      const dl = e.target.closest("[data-del]");
      const more = e.target.closest("[data-more]");
      if (ed) openModal(entries.find(x => x.id === ed.dataset.edit));
      if (dl) removeEntry(dl.dataset.del);
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

  return { init, render };
})();
