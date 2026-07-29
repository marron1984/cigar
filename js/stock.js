/* ============================================================
   葉巻大辞典 — ヒュミドール在庫管理（記録ノート内）
   持っている葉巻の在庫を、購入日・熟成期間つきで管理する。
   この端末（localStorage）に保存。
   ============================================================ */
const STOCK = (() => {
  const KEY = "cigar_stock_v1";
  const q = (s) => document.querySelector(s);
  const qa = (s) => [...document.querySelectorAll(s)];
  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  let items = [];
  const visionOn = typeof VISION !== "undefined" && VISION.enabled;   // 写真からのAI自動入力
  let aiBusy = false;
  /* AIが読み取った産地・サイズ。在庫フォームには欄が無いが、
     在庫に持たせておくと「🔥 吸う」で記録フォームへそのまま引き継げる。 */
  let aiMeta = { country: "", vitola: "" };

  function load() {
    try { items = JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { items = []; }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) { alert(T("在庫を保存できませんでした。")); }
  }
  function uid() { return "s" + Date.now().toString(36) + Math.floor(Math.random() * 1e5).toString(36); }
  function todayStr() {
    const d = new Date(), p = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
  }
  // 購入日からの熟成期間の表示（◯ヶ月 / ◯年◯ヶ月）
  function agingLabel(dateStr) {
    if (!dateStr) return "";
    const from = new Date(dateStr + "T12:00");
    if (isNaN(from)) return "";
    const now = new Date();
    let months = (now.getFullYear() - from.getFullYear()) * 12 + (now.getMonth() - from.getMonth());
    if (now.getDate() < from.getDate()) months--;
    if (months < 0) months = 0;
    if (months < 1) return T("熟成 1ヶ月未満");
    if (months < 12) return T("熟成 {n}ヶ月", { n: months });
    const y = Math.floor(months / 12), m = months % 12;
    return m ? T("熟成 {y}年{m}ヶ月", { y, m }) : T("熟成 {y}年", { y });
  }

  /* 熟成の月数（表示用のラベルではなく数値がほしいとき） */
  function agingMonths(dateStr) {
    if (!dateStr) return 0;
    const from = new Date(dateStr + "T12:00");
    if (isNaN(from)) return 0;
    const now = new Date();
    let m = (now.getFullYear() - from.getFullYear()) * 12 + (now.getMonth() - from.getMonth());
    if (now.getDate() < from.getDate()) m--;
    return Math.max(0, m);
  }

  /* 産地ごとの色。ラッパーの色合いを思わせる並びにしている */
  const COUNTRY_TONE = {
    "キューバ": "#8d4f2a", "ドミニカ": "#a9713c", "ドミニカ共和国": "#a9713c",
    "ニカラグア": "#6f3f22", "ホンジュラス": "#b5763a", "メキシコ": "#4a2c18",
    "ブラジル": "#5c3a1e", "エクアドル": "#c08a4e", "アメリカ": "#8a6a45",
    "ペルー": "#7a5230", "コロンビア": "#9c6238", "フィリピン": "#a8814a",
    "インドネシア": "#6b4526", "カメルーン": "#94643a", "アルゼンチン": "#7f5a35",
    "コスタリカ": "#9a7b52", "パナマ": "#87582f", "ジャマイカ": "#b0885a",
    "イタリア": "#6d5233", "産地未設定": "#c9bda8"
  };
  const toneOf = (c) => COUNTRY_TONE[c] || "#8a6a45";

  /* 在庫に付けられる産地。並びは主要生産国から */
  const STOCK_COUNTRIES = [
    "キューバ", "ドミニカ共和国", "ニカラグア", "ホンジュラス", "メキシコ",
    "ブラジル", "エクアドル", "アメリカ", "フィリピン", "インドネシア",
    "カメルーン", "ペルー", "コロンビア", "コスタリカ", "パナマ",
    "ジャマイカ", "イタリア", "その他"
  ];
  /* 既に入っている産地が一覧に無い場合（AIの読み取り結果など）も選択肢として残す */
  function countryOptions(cur) {
    const list = STOCK_COUNTRIES.slice();
    if (cur && !list.includes(cur)) list.unshift(cur);
    return `<option value="">${esc(T("産地未設定"))}</option>` +
      list.map(c => `<option value="${esc(c)}"${c === cur ? " selected" : ""}>${esc(I18N.country(c))}</option>`).join("");
  }

  /* 在庫の中身を見える形にする（本数・棚・産地の内訳・熟成の分布） */
  function vizHtml(totalQty) {
    if (!totalQty) return "";
    const kinds = items.filter(it => (Number(it.qty) || 0) > 0).length;
    const value = items.reduce((s, it) => s + (Number(it.price) || 0) * (Number(it.qty) || 0), 0);
    const oldest = items.reduce((m, it) => Math.max(m, agingMonths(it.date)), 0);

    /* 産地の内訳 */
    const byCountry = {};
    items.forEach(it => {
      const k = it.country || "産地未設定";
      byCountry[k] = (byCountry[k] || 0) + (Number(it.qty) || 0);
    });
    const cList = Object.entries(byCountry).filter(([, n]) => n > 0).sort((a, b) => b[1] - a[1]);
    const unset = byCountry["産地未設定"] || 0;
    /* 凡例はそのまま産地の絞り込みボタンにする */
    const legend = cList.map(([k, n]) =>
      `<button type="button" class="stk-lg${sCountry === k ? " on" : ""}" data-fc="${esc(k)}" title="${esc(T("{c}だけを表示", { c: I18N.country(k) }))}"><i style="background:${toneOf(k)}"></i>${esc(I18N.country(k))} <b>${n}</b>${T("（{p}%）", { p: Math.round(n / totalQty * 100) })}</button>`).join("");

    /* 花：在庫を中心から放射状に並べる。同じ産地を隣り合わせに置くので、
       1枚＝等しい角度のまま、産地別の円グラフとしても読める。
       72本までは1枚＝1本。それを超えるときは枚数を割合で配分し、
       （先頭だけ描いて後ろの産地が欠けることがないように）比率を保つ。 */
    const MAX_PETALS = 72;
    const scaled = totalQty > MAX_PETALS;
    const target = Math.min(totalQty, MAX_PETALS);
    const petalList = [];
    if (!scaled) {
      cList.forEach(([c]) => items.forEach(it => {
        if ((it.country || "産地未設定") !== c) return;
        for (let i = 0, n = Number(it.qty) || 0; i < n; i++)
          petalList.push({ tone: toneOf(c), title: `${it.name}（${I18N.country(c)}）` });
      }));
    } else {
      /* 最大剰余法で配分。1本でもある産地は必ず1枚は残す */
      const raw = cList.map(([c, n]) => ({ c, n, v: n / totalQty * target }));
      raw.forEach(r => { r.k = Math.max(1, Math.floor(r.v)); });
      let sum = raw.reduce((s, r) => s + r.k, 0);
      const byRem = raw.slice().sort((a, b) => (b.v - b.k) - (a.v - a.k));
      for (let i = 0; sum < target; i++) { byRem[i % byRem.length].k++; sum++; }
      const byK = raw.slice().sort((a, b) => b.k - a.k);
      for (let i = 0; sum > target && i < 5000; i++) {
        const r = byK[i % byK.length];
        if (r.k > 1) { r.k--; sum--; }
      }
      raw.forEach(r => {
        for (let i = 0; i < r.k; i++) petalList.push({ tone: toneOf(r.c), title: `${I18N.country(r.c)} ${T("{n}本", { n: r.n })}` });
      });
    }
    const step = 360 / (petalList.length || 1);
    /* 本数が少ないほど1枚を太くして、輪がすかすかに見えないようにする */
    const pn = petalList.length;
    const petalW = pn <= 6 ? 18 : pn <= 10 ? 14 : pn <= 16 ? 11 : pn <= 24 ? 9 : pn <= 40 ? 7 : pn <= 56 ? 6 : 5;
    const petals = petalList.map((p, i) =>
      `<span class="stk-petal" style="--a:${(i * step).toFixed(3)}deg;--tone:${p.tone};--i:${i}"
         title="${esc(p.title)}"></span>`).join("");

    /* 熟成の分布 */
    const buckets = [
      { l: T("6ヶ月未満"), n: 0 }, { l: T("6ヶ月〜1年"), n: 0 },
      { l: T("1〜2年"), n: 0 }, { l: T("2年以上"), n: 0 }
    ];
    items.forEach(it => {
      const m = agingMonths(it.date), n = Number(it.qty) || 0;
      if (!n) return;
      if (m < 6) buckets[0].n += n; else if (m < 12) buckets[1].n += n;
      else if (m < 24) buckets[2].n += n; else buckets[3].n += n;
    });
    const maxB = Math.max(...buckets.map(b => b.n), 1);
    const aging = buckets.map(b => `
      <div class="stk-age">
        <span class="sa-l">${b.l}</span>
        <span class="sa-t"><span class="sa-f" style="width:${(b.n / maxB * 100).toFixed(1)}%"></span></span>
        <span class="sa-n">${b.n}</span>
      </div>`).join("");

    return `
      <div class="stk-viz">
        <div class="stk-flower" style="--pw:${petalW}px">
          ${petals}
          <div class="stk-core">
            <span class="sc-n">${totalQty}</span><span class="sc-u">${esc(T("本"))}</span>
            ${scaled ? `<span class="sc-note">${esc(T("図は割合で表示"))}</span>` : ""}
          </div>
        </div>
        ${cList.length ? `<div class="stk-legend">${legend}</div>` : ""}
        <div class="stk-figs">
          <div class="sf"><span class="sf-v">${kinds}</span><span class="sf-l">${esc(T("銘柄"))}</span></div>
          ${value ? `<div class="sf"><span class="sf-v">¥${value.toLocaleString()}</span><span class="sf-l">${esc(T("在庫金額"))}</span></div>` : ""}
          ${oldest ? `<div class="sf"><span class="sf-v">${oldest < 12 ? T("{n}ヶ月", { n: oldest }) : T("{y}年", { y: Math.floor(oldest / 12) })}</span><span class="sf-l">${esc(T("最長の熟成"))}</span></div>` : ""}
        </div>
        ${unset ? `
        <div class="stk-fix">
          <span>${T("産地未設定が <b>{n}本</b> あります。", { n: unset })}</span>
          <select id="stkFixTo" title="${esc(T("まとめて設定する産地"))}">${countryOptions("")}</select>
          <button type="button" class="btn btn-sm btn-ghost" id="stkFixApply">${esc(T("まとめて設定"))}</button>
        </div>` : ""}
        <div class="stk-aging"><div class="stk-sub-h">${esc(T("熟成の内訳"))}</div>${aging}</div>
      </div>`;
  }

  /* ---------- 探すための絞り込み ---------- */
  let sQuery = "";          // 検索語
  let sSort = "recent";     // 並び順
  let sCountry = "";        // 産地での絞り込み（花の凡例をタップして切り替える）
  let hideZero = true;      // 在庫0を隠すか

  const kana = (s) => String(s || "").replace(/[ァ-ン]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60));
  const key = (s) => kana(String(s || "").toLowerCase().replace(/\s+/g, ""));

  /* 検索語は 銘柄名・ブランド・産地 のどれかに当たれば通す。
     カタカナ／ひらがなの違いは無視する（「もんて」でモンテクリストが出る）。 */
  function match(it) {
    if (sCountry && (it.country || "産地未設定") !== sCountry) return false;
    if (hideZero && !(Number(it.qty) > 0)) return false;
    if (!sQuery) return true;
    const hay = key(it.name) + " " + key(it.brand) + " " + key(I18N.both(it.country));
    return key(sQuery).split(/\s+/).filter(Boolean).every(w => hay.includes(w));
  }

  const SORTS = {
    recent: ["追加した順", null],
    aged: ["熟成が長い順", (a, b) => agingMonths(b.date) - agingMonths(a.date)],
    fresh: ["熟成が短い順", (a, b) => agingMonths(a.date) - agingMonths(b.date)],
    name: ["銘柄名順", (a, b) => String(a.name).localeCompare(String(b.name), "ja")],
    country: ["産地順", (a, b) => String(I18N.country(a.country) || "zz").localeCompare(String(I18N.country(b.country) || "zz"), "ja") || String(a.name).localeCompare(String(b.name), "ja")],
    qty: ["本数が多い順", (a, b) => (Number(b.qty) || 0) - (Number(a.qty) || 0)],
    price: ["価格が高い順", (a, b) => (Number(b.price) || 0) - (Number(a.price) || 0)]
  };

  function visible() {
    const out = items.filter(match);
    const cmp = SORTS[sSort] && SORTS[sSort][1];
    return cmp ? out.slice().sort(cmp) : out;
  }

  /* 一覧だけを描き直す。検索欄に文字を打つたびに全体を描き直すと
     入力欄からフォーカスが外れてしまうため、ここだけ差し替える。 */
  function renderList() {
    const list = q("#stkList"), hits = q("#stkHits");
    if (!list) return;
    const shown = visible();
    const zeroHidden = hideZero ? items.filter(it => !(Number(it.qty) > 0)).length : 0;
    if (hits) {
      const qty = shown.reduce((s, it) => s + (Number(it.qty) || 0), 0);
      const filtered = sQuery || sCountry;
      hits.innerHTML = (filtered
        ? T("<b>{k}銘柄・{n}本</b> が該当", { k: shown.length, n: qty })
          + (sCountry ? T("（産地：{c}）", { c: esc(I18N.country(sCountry)) }) : "")
        : T("{k}銘柄・{n}本", { k: shown.length, n: qty }))
        + (zeroHidden ? `<button type="button" class="stk-showzero" id="stkShowZero">${esc(T("在庫0の{n}件を表示", { n: zeroHidden }))}</button>` : "")
        + (filtered ? `<button type="button" class="stk-clear" id="stkClear">${esc(T("絞り込みを解除"))}</button>` : "");
    }
    list.innerHTML = shown.length ? shown.map(rowHtml).join("")
      : `<p class="photo-hint" style="margin:10px 0">${esc(T("該当する在庫がありません。"))}${sQuery || sCountry ? esc(T("検索や絞り込みを解除してみてください。")) : ""}</p>`;
    qa(".stk-lg").forEach(b => b.classList.toggle("on", b.dataset.fc === sCountry && !!sCountry));
  }

  function rowHtml(it) {
    return `
      <div class="stk-row">
        <div class="stk-main">
          <div class="stk-name"><i class="stk-dot" style="background:${toneOf(it.country || "産地未設定")}" aria-hidden="true"></i>${esc(it.name)}${it.brand ? `<span class="stk-brand">${esc(it.brand)}</span>` : ""}</div>
          <div class="stk-sub">${it.date ? `${esc(T("購入 {date}", { date: it.date }))} · <b>${esc(agingLabel(it.date))}</b>` : ""}${it.price ? ` · ${esc(T("¥{n}/本", { n: Number(it.price).toLocaleString() }))}` : ""}</div>
          <select class="stk-csel${it.country ? "" : " none"}" data-scountry="${it.id}" title="${esc(T("産地（変えるとグラフに反映されます）"))}">${countryOptions(it.country || "")}</select>
        </div>
        <div class="stk-qty">
          <button type="button" class="stk-btn" data-sdec="${it.id}" title="${esc(T("1本減らす"))}">−</button>
          <span class="stk-n">${Number(it.qty) || 0}</span>
          <button type="button" class="stk-btn" data-sinc="${it.id}" title="${esc(T("1本増やす"))}">＋</button>
        </div>
        <div class="stk-acts">
          <button type="button" class="btn btn-sm btn-ghost" data-ssmoke="${it.id}">${esc(T("🔥 吸う"))}</button>
          <button type="button" class="btn btn-sm btn-danger" data-sdel="${it.id}">${esc(T("削除"))}</button>
        </div>
      </div>`;
  }

  function render() {
    const body = q("#stockBody");
    const cnt = q("#stockCount");
    if (!body) return;
    const totalQty = items.reduce((s, it) => s + (Number(it.qty) || 0), 0);
    if (cnt) cnt.textContent = T("{n} 本", { n: totalQty });
    body.innerHTML = `
      ${vizHtml(totalQty)}
      ${items.length ? `
      <div class="stk-tools">
        <input type="search" id="stkSearch" placeholder="${esc(T("🔍 銘柄・ブランド・産地で探す"))}" value="${esc(sQuery)}" autocomplete="off">
        <select id="stkSort" title="${esc(T("並び替え"))}">
          ${Object.entries(SORTS).map(([k, v]) => `<option value="${k}"${sSort === k ? " selected" : ""}>${esc(T(v[0]))}</option>`).join("")}
        </select>
      </div>
      <div class="stk-hits" id="stkHits"></div>
      <div class="stk-list" id="stkList"></div>`
      : `<p class="photo-hint" style="margin:10px 0">${esc(T("在庫はまだありません。買った葉巻を登録しておくと、熟成期間がひと目で分かります。"))}</p>`}
      <div class="stk-form">
        ${visionOn ? `
        <div class="stk-ai">
          <button type="button" class="btn btn-sm btn-ghost" id="stkPhotoBtn">${esc(T("📷 写真から自動入力"))}</button>
          <input type="file" id="stkPhoto" accept="image/*" hidden>
          <span class="stk-ai-status" id="stkAiStatus"></span>
        </div>` : ""}
        <input type="text" id="stkName" placeholder="${esc(T("銘柄名（例：モンテクリスト No.4）"))}">
        <input type="text" id="stkBrand" placeholder="${esc(T("ブランド（任意）"))}">
        <select id="stkCountry" title="${esc(T("産地"))}">${countryOptions("")}</select>
        <input type="number" id="stkQty" min="1" value="1" title="${esc(T("本数"))}">
        <input type="date" id="stkDate" value="${todayStr()}" title="${esc(T("購入日"))}">
        <input type="number" id="stkPrice" min="0" placeholder="${esc(T("1本の価格（任意）"))}">
        <button type="button" class="btn btn-sm btn-primary" id="stkAdd">${esc(T("＋ 在庫に追加"))}</button>
      </div>
      <div class="photo-hint">${visionOn ? esc(T("箱やバンドの写真を選ぶと、銘柄名とブランドをAIが読み取って入れます（入力済みの欄は上書きしません）。")) + "<br>" : ""}${esc(T("「🔥 吸う」で在庫が1本減り、記録ノートのフォームが銘柄入りで開きます。産地の色の凡例をタップすると、その産地だけを表示します。"))}</div>`;
    renderList();
    wire();
  }

  /* ---------- 写真からのAI自動入力 ----------
     記録ノートと同じ画像認識（VISION）を使う。
     読み取れた項目のうち、まだ空欄のものだけを埋める（入力済みは尊重する）。 */
  function setAiStatus(kind, msg) {
    const el = q("#stkAiStatus");
    if (!el) return;
    el.className = "stk-ai-status" + (kind ? " " + kind : "");
    el.textContent = msg || "";
  }
  /* ブランド一覧を手がかりとして渡すと、表記ゆれが減る */
  function brandHints() {
    try {
      const out = [];
      Object.keys(BRANDS_DATA || {}).forEach(k =>
        (BRANDS_DATA[k] || []).forEach(b => { if (b.kind !== "leaf") { out.push(b.ja); out.push(b.en); } }));
      return out.filter(Boolean).slice(0, 400);
    } catch (e) { return []; }
  }
  async function runStockVision(file) {
    if (!visionOn || aiBusy || !file) return;
    const btn = q("#stkPhotoBtn");
    aiBusy = true;
    if (btn) btn.disabled = true;
    setAiStatus("loading", T("AIが写真を読み取っています…（数秒かかります）"));
    try {
      const src = await NOTE.resizeImage(file);
      const hints = {
        countries: ((typeof CIGAR_DATA !== "undefined" && CIGAR_DATA.countries) || []).map(c => c.name_ja),
        vitolas: ((typeof CIGAR_DATA !== "undefined" && CIGAR_DATA.vitolas) || []).map(v => v.ja),
        brands: brandHints()
      };
      const r = await VISION.identify(src, hints);
      const filled = [];
      const put = (sel, val, label) => {
        const el = q(sel);
        if (el && val && !el.value.trim()) { el.value = val; filled.push(label); }
      };
      put("#stkName", r.name, T("銘柄名"));
      put("#stkBrand", r.brand, T("ブランド"));
      /* 産地は選択肢に同じものがあるときだけ入れる（未選択のときのみ） */
      const cSel = q("#stkCountry");
      if (cSel && !cSel.value && r.country && [...cSel.options].some(o => o.value === r.country)) {
        cSel.value = r.country; filled.push(T("産地"));
      }
      aiMeta = { country: r.country || "", vitola: r.vitola || "" };
      if (!filled.length) {
        setAiStatus("warn", r.band_readable === false
          ? T("バンドの文字が読み取れませんでした。明るく正面から撮り直すか、手で入力してください。")
          : T("新しく入れられる項目がありませんでした（すでに入力済みのようです）。"));
      } else {
        const low = r.confidence === "low";
        const what = filled.join(I18N.isEn ? " and " : "・");
        setAiStatus(low ? "warn" : "ok",
          low ? T("✓ 自信は高くありませんが、{what}を入力しました。ご確認ください。", { what })
              : T("✓ {what}を入力しました。ご確認ください。", { what }));
      }
    } catch (err) {
      setAiStatus("error", T("読み取れませんでした：{msg}", { msg: (err && err.message) || T("エラー") }));
    } finally {
      aiBusy = false;
      if (btn) btn.disabled = false;
    }
  }

  /* 描画のたびに作り直される要素（フォームのボタン類）だけをつなぐ。
     一覧のクリック監視は #stockBody 自身に付けるが、この要素は innerHTML の
     置き換えでは消えないので、ここで付けると描画のたびに監視が積み上がり、
     1回のクリックで何度も処理が走ってしまう。監視は init() で一度だけ付ける。 */
  function wire() {
    const pbtn = q("#stkPhotoBtn"), pfile = q("#stkPhoto");
    if (pbtn && pfile) {
      pbtn.addEventListener("click", () => pfile.click());
      pfile.addEventListener("change", () => {
        const f = pfile.files && pfile.files[0];
        pfile.value = "";                       // 同じ写真を選び直せるように
        if (f && f.type.startsWith("image/")) runStockVision(f);
      });
    }
    q("#stkAdd").addEventListener("click", () => {
      const name = q("#stkName").value.trim();
      if (!name) { q("#stkName").focus(); return; }
      items.unshift({
        id: uid(), name, brand: q("#stkBrand").value.trim(),
        qty: Math.max(1, Number(q("#stkQty").value) || 1),
        date: q("#stkDate").value || todayStr(),
        price: Number(q("#stkPrice").value) || null,
        country: q("#stkCountry").value || aiMeta.country || "", vitola: aiMeta.vitola || ""
      });
      aiMeta = { country: "", vitola: "" };   // 次の登録に持ち越さない
      save(); render();
    });
  }

  /* 一覧のクリック処理。#stockBody に一度だけ付ける（init から呼ぶ） */
  function wireList() {
    const body = q("#stockBody");
    if (!body || body.dataset.wired === "1") return;
    body.dataset.wired = "1";
    /* 検索は打つたびに一覧だけ描き直す（入力欄のフォーカスを保つため） */
    body.addEventListener("input", (e) => {
      if (!e.target.closest("#stkSearch")) return;
      sQuery = e.target.value;
      renderList();
    });
    body.addEventListener("change", (e) => {
      /* 並び替え */
      if (e.target.closest("#stkSort")) { sSort = e.target.value; renderList(); return; }
      /* 産地の変更（行ごとのプルダウン） */
      const sel = e.target.closest("[data-scountry]");
      if (!sel) return;
      const it = items.find(x => x.id === sel.dataset.scountry);
      if (!it) return;
      it.country = sel.value;
      save(); render();
    });
    body.addEventListener("click", (e) => {
      /* 産地の凡例をタップして、その産地だけを表示 */
      const chip = e.target.closest("[data-fc]");
      if (chip) { sCountry = (sCountry === chip.dataset.fc) ? "" : chip.dataset.fc; renderList(); return; }
      if (e.target.closest("#stkShowZero")) { hideZero = false; renderList(); return; }
      if (e.target.closest("#stkClear")) {
        sQuery = ""; sCountry = "";
        const s = q("#stkSearch"); if (s) s.value = "";
        renderList(); return;
      }
      /* 産地未設定をまとめて設定 */
      if (e.target.closest("#stkFixApply")) {
        const to = (q("#stkFixTo") || {}).value || "";
        if (!to) { const s = q("#stkFixTo"); if (s) s.focus(); return; }
        const target = items.filter(x => !x.country);
        if (!target.length) return;
        const qty = target.reduce((s, x) => s + (Number(x.qty) || 0), 0);
        if (!confirm(T("産地未設定の {k}銘柄（{n}本）を、すべて「{to}」にします。\nよろしいですか？", { k: target.length, n: qty, to: I18N.country(to) }))) return;
        items.forEach(x => { if (!x.country) x.country = to; });
        save(); render();
        return;
      }
      const inc = e.target.closest("[data-sinc]");
      const dec = e.target.closest("[data-sdec]");
      const del = e.target.closest("[data-sdel]");
      const smk = e.target.closest("[data-ssmoke]");
      if (inc) { const it = items.find(x => x.id === inc.dataset.sinc); if (it) { it.qty = (Number(it.qty) || 0) + 1; save(); render(); } }
      if (dec) { const it = items.find(x => x.id === dec.dataset.sdec); if (it) { it.qty = Math.max(0, (Number(it.qty) || 0) - 1); save(); render(); } }
      if (del) {
        const it = items.find(x => x.id === del.dataset.sdel);
        if (it && confirm(T("「{name}」を在庫から削除しますか？", { name: it.name }))) { items = items.filter(x => x.id !== it.id); save(); render(); }
      }
      if (smk) {
        const it = items.find(x => x.id === smk.dataset.ssmoke);
        if (!it) return;
        it.qty = Math.max(0, (Number(it.qty) || 0) - 1);
        save(); render();
        if (typeof NOTE !== "undefined" && NOTE.prefillNew) {
          NOTE.prefillNew({
            name: it.name, brand: it.brand || "",
            country: it.country || "", vitola: it.vitola || "",
            price: it.price || null
          });
        }
      }
    });
  }

  /* 前回開いていたなら開いた状態で出す（吸うたびに開き直す手間をなくす） */
  const OPEN_KEY = "cigar_stock_open";
  function wirePanel() {
    const p = q("#stockPanel");
    if (!p) return;
    try { if (localStorage.getItem(OPEN_KEY) === "1") p.open = true; } catch (e) {}
    p.addEventListener("toggle", () => {
      try { localStorage.setItem(OPEN_KEY, p.open ? "1" : "0"); } catch (e) {}
    });
  }

  function init() {
    if (!q("#stockPanel")) return;
    load();
    wirePanel();
    wireList();     // 一覧のクリック監視は最初に一度だけ
    render();
  }

  document.addEventListener("DOMContentLoaded", init);
  return { init };
})();
