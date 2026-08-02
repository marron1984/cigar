/* ============================================================
   葉巻大辞典 — ブランド大全レンダリング
   国別の銘柄（マルカ）を検索付きアコーディオン一覧で表示
   ============================================================ */
const BRANDS = (() => {
  /* データ本体は、このページを開いたときに読み込む（js/dataload.js）。
     読み込みが済んでから init() が呼ばれるので、そこで受け取る。 */
  let B = null;
  const useData = () => { if (!B) B = BRANDS_DATA; };
  /* ロゴ画像の当て先。下層ページ（/brands/）でも迷子にならないよう根っこから指す */
  const ASSET = (window.SITE_ROOT || "") + "assets/";
  const q = (s, el = document) => el.querySelector(s);
  const qa = (s, el = document) => [...el.querySelectorAll(s)];
  const e = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  /* 収録国の定義（タブ表示順） */
  const COUNTRIES = [
    { key: "cuba", elId: "brandsCuba",
      intro: (n) => T("現行ハバノス（Habanos S.A.）ポートフォリオの全{n}マルカを、創業からの歴史とともに収録。銘柄名で絞り込みできます。", { n }) },
    { key: "dominican", elId: "brandsDominican",
      intro: (n) => T("世界最大級の高級葉巻生産国ドミニカ共和国の主要{n}ブランドを、創業からの歴史とともに収録。銘柄名で絞り込みできます。", { n }) },
    { key: "nicaragua", elId: "brandsNicaragua",
      intro: (n) => T("近年最も評価を高めている生産国ニカラグアの主要{n}ブランドを、創業からの歴史とともに収録。銘柄名で絞り込みできます。", { n }) },
    { key: "honduras", elId: "brandsHonduras",
      intro: (n) => T("伝統の葉巻生産国ホンジュラスの主要{n}ブランドを、創業からの歴史とともに収録。銘柄名で絞り込みできます。", { n }) },
    { key: "mexico", elId: "brandsMexico",
      intro: (n) => T("マドゥーロ用ラッパーの聖地サン・アンドレスを擁するメキシコの主要{n}ブランドを、創業からの歴史とともに収録。銘柄名で絞り込みできます。", { n }) },
    { key: "ecuador", elId: "brandsEcuador",
      intro: (n) => T("世界最大のラッパー葉供給国エクアドル。完成品ブランドではなく、世界中の高級葉巻を支える栽培家系と葉の「ブランド」{n}件を収録。", { n }) },
    { key: "usa", elId: "brandsUSA",
      intro: (n) => T("タンパの黄金時代からマイアミの micro-factory、マシンメイドの巨人まで。アメリカの主要{n}ブランドを、創業からの歴史とともに収録。", { n }) },
    { key: "brazil", elId: "brandsBrazil",
      intro: (n) => T("バイーアのマタ・フィナを擁する南米の伝統産地ブラジルの主要{n}エントリを、創業からの歴史とともに収録。", { n }) },
    { key: "cameroon", elId: "brandsCameroon",
      intro: (n) => T("世界で最も希少なラッパー葉の産地カメルーン。葉を支える一族と葉の「ブランド」{n}件を収録。", { n }) },
    { key: "peru", elId: "brandsPeru",
      intro: (n) => T("アマゾン源流域タラポトに知られざる産地を持つペルーの{n}エントリを、歴史とともに収録。", { n }) },
    { key: "colombia", elId: "brandsColombia",
      intro: (n) => T("カリブ沿岸に古い葉たばこ文化を持つコロンビアの{n}エントリを、歴史とともに収録。", { n }) },
    { key: "philippines", elId: "brandsPhilippines",
      intro: (n) => T("アジア最古の葉巻産地フィリピンの主要{n}ブランドを、創業からの歴史とともに収録。", { n }) },
    { key: "indonesia", elId: "brandsIndonesia",
      intro: (n) => T("スマトラ・ジャワに世界的な葉の産地を持つインドネシアの{n}エントリを、歴史とともに収録。", { n }) },
    { key: "argentina", elId: "brandsArgentina",
      intro: (n) => T("サルタ州に小さな葉巻文化を持つアルゼンチンの{n}エントリを、歴史とともに収録。", { n }) },
  ];

  function specRow(k, en, v) {
    if (!v) return "";
    // 見出しは日本語版で「日本語＋英語の小見出し」、英語版で主副が入れ替わる（advanced.js 等と同じ流儀）
    const [k1, k2] = namePair(k, en);
    return `<div class="spec-row"><div class="k">${e(k1)}<span class="en">${e(k2)}</span></div><div class="v">${e(v)}</div></div>`;
  }

  // サマリー行のタグ用に短い年号表示を作る。
  // 「1966」→「1966年」、補足つきの長い値は括弧の前まで＋20字で切り詰める
  // （完全な記述はアコーディオン内の「創業・誕生」スペック行に表示される）。
  function foundedLabel(f) {
    let s = String(f || "").trim().split(/[（(]/)[0].trim();
    if (s.length > 20) s = s.slice(0, 20) + "…";
    return /^\d{4}$/.test(s) ? T("{y}年", { y: s }, "brands") : s;
  }

  /* ---------- ブランドのエンブレム（頭文字モノグラム。任意で実ロゴ画像に差し替え可） ---------- */
  // 冠詞・一般語を除いた主要語の頭文字を1〜2字取り出す（例: Romeo y Julieta → RJ）
  const EMBLEM_STOP = new Set(["de", "del", "la", "el", "y", "e", "and", "the", "of", "cigars", "cigar", "co", "company", "habanos", "tabacos", "tabacalera", "group"]);
  function brandInitials(b) {
    const base = String(b.en || b.ja || "");
    const words = base.replace(/[^0-9A-Za-zÀ-ÿ\s]/g, " ").split(/\s+/).filter(w => w && !EMBLEM_STOP.has(w.toLowerCase()));
    let ini;
    if (!words.length) ini = base.replace(/[^0-9A-Za-zÀ-ÿ]/g, "").slice(0, 2);
    else if (words.length === 1) ini = words[0].slice(0, 2);
    else ini = words[0][0] + words[1][0];
    return (ini || "•").toUpperCase();
  }
  // 落ち着いた葉巻色のパレットから、名前で決まる1色を選ぶ（同じブランドは常に同じ色）
  const EMBLEM_COLORS = ["#6b4226", "#7d2e2e", "#2f5d50", "#3a4a6b", "#8a5a1f", "#5a4a6b", "#4a5b3f", "#7a3b26", "#4d4038", "#2f4858"];
  function brandColor(b) {
    const s = String(b.en || b.ja || "");
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    return EMBLEM_COLORS[h % EMBLEM_COLORS.length];
  }
  // b.logo に画像ファイル名（assets内）があればロゴ画像、無ければ頭文字エンブレム
  function brandEmblem(b) {
    if (b.logo) return `<span class="brand-emblem has-img"><img src="${ASSET}${e(b.logo)}" alt="" loading="lazy"></span>`;
    return `<span class="brand-emblem" style="--bg:${brandColor(b)}" aria-hidden="true">${e(brandInitials(b))}</span>`;
  }

  /* ---------- 吸いたいリスト（ウィッシュリスト） ---------- */
  const WISH_KEY = "cigar_wishlist_v1";
  const COUNTRY_JA = {
    cuba: "キューバ", dominican: "ドミニカ共和国", nicaragua: "ニカラグア", honduras: "ホンジュラス",
    mexico: "メキシコ", ecuador: "エクアドル", usa: "アメリカ", brazil: "ブラジル", cameroon: "カメルーン",
    peru: "ペルー", colombia: "コロンビア", philippines: "フィリピン", indonesia: "インドネシア", argentina: "アルゼンチン"
  };
  function wishList() {
    try { return JSON.parse(localStorage.getItem(WISH_KEY)) || []; } catch (err) { return []; }
  }
  function saveWish(list) { try { localStorage.setItem(WISH_KEY, JSON.stringify(list)); } catch (err) {} }
  function isWished(en) { return wishList().some(w => w.en === en); }
  function toggleWish(item) {
    let list = wishList();
    if (list.some(w => w.en === item.en)) list = list.filter(w => w.en !== item.en);
    else list.push(item);
    saveWish(list);
    renderWishPanel();
    // 全一覧の★表示を同期
    qa(".wish-btn").forEach(btn => {
      const on = list.some(w => w.en === btn.dataset.wen);
      btn.classList.toggle("on", on);
      btn.textContent = on ? "★" : "☆";
      btn.title = on ? T("吸いたいリストから外す") : T("吸いたいリストへ");
    });
  }
  function renderWishPanel() {
    const el = q("#wishlistPanel");
    if (!el) return;
    const list = wishList();
    if (!list.length) { el.innerHTML = ""; return; }
    el.innerHTML = `
      <div class="wish-panel">
        <div class="wish-h">${T("⭐ 吸いたいリスト")} <span class="count-pill">${T("{n}件", { n: list.length })}</span></div>
        <div class="wish-items">${list.map(w => `
          <span class="wish-item">
            <span class="wi-name">${e(namePair(w.ja, w.en)[0])}</span>
            <button type="button" class="wi-log" data-wlog="${e(w.en)}" title="${e(T("記録ノートに記録する"))}">${T("✎ 記録")}</button>
            <button type="button" class="wi-rm" data-wrm="${e(w.en)}" title="${e(T("リストから外す"))}">×</button>
          </span>`).join("")}</div>
        <div class="photo-hint">${T("★を押した銘柄のメモです。「✎ 記録」で吸った記録をすぐ書けます。")}</div>
      </div>`;
  }

  function brandAcc(b, countryKey) {
    const vitolas = (b.vitolas || []).map(v => `<span class="chip brand">${e(v)}</span>`).join("");
    // 葉・産地の項目（kind:"leaf"）は銘柄ではないので、「吸いたいリスト」には入れられない。
    // 代わりに種別バッジを出して、ブランドの項目と一目で区別できるようにする。
    const isLeaf = b.kind === "leaf";
    const wished = isWished(b.en);
    const wishBtn = isLeaf ? "" :
      `<button type="button" class="wish-btn${wished ? " on" : ""}" data-wen="${e(b.en)}" data-wja="${e(b.ja)}" data-wc="${e(countryKey || "")}" title="${e(wished ? T("吸いたいリストから外す") : T("吸いたいリストへ"))}">${wished ? "★" : "☆"}</button>`;
    const kindBadge = isLeaf ? `<span class="tag leaf">${T("葉・産地")}</span>` : "";
    const [n1, n2] = namePair(b.ja, b.en);
    return `
      <details class="acc brand-entry${isLeaf ? " is-leaf" : ""}" data-search="${e((b.ja + " " + b.en).toLowerCase())}">
        <summary><span class="brand-sum-wrap">${brandEmblem(b)}<span class="brand-sum">${e(n1)} — ${e(n2)}${kindBadge}<span class="tag">${e(foundedLabel(b.founded))}</span></span></span>${wishBtn}</summary>
        <div class="acc-body">
          ${specRow("創業・誕生", "Founded", b.founded)}
          ${specRow("創業者・創設主体", "Founder", b.founder)}
          ${specRow("名前の由来", "Name", b.meaning)}
          ${specRow("強さの目安", "Body", I18N.strength(b.strength))}
          ${specRow("現在の位置づけ", "Status", b.status)}
          <div class="brand-history">${FMT.prose(b.history)}</div>
          ${vitolas ? `<div class="field"><div class="lbl">${T("代表的なヴィトラ・ライン")}</div><div class="chips">${vitolas}</div></div>` : ""}
          ${b.trivia ? `<div class="field"><div class="lbl">${T("豆知識")}</div><div class="val">${FMT.prose(b.trivia)}</div></div>` : ""}
          ${b.sources && b.sources.length ? `<div class="brand-refs"><div class="brand-refs-h">${T("主要出典")} <span class="brand-refs-n">${T("{n}件", { n: b.sources.length })}</span></div><ol>${b.sources.map(s => `<li>${e(s)}</li>`).join("")}</ol></div>` : ""}
        </div>
      </details>`;
  }

  function renderCountry(cfg) {
    const el = q("#" + cfg.elId);
    if (!el) return;
    const list = [...(B[cfg.key] || [])].sort((a, b2) => (a.order || 0) - (b2.order || 0));
    if (!list.length) {
      el.innerHTML = `<div class="cd-placeholder">${T("ブランド情報を準備中です。")}</div>`;
      return;
    }
    const searchId = `brandSearch-${cfg.key}`;
    const listId = `brandList-${cfg.key}`;
    /* 産地ページに解説の章がある国は、そちらへの入口も置く
       （気候・土壌・作り手の話は「国・産地別」に集めてあるため） */
    const hasOrigin = typeof BRAND_COUNTRY_TAB !== "undefined" && BRAND_COUNTRY_TAB[cfg.key] !== undefined;
    el.innerHTML = `
      <p class="prose" style="margin-bottom:14px">${e(cfg.intro(list.length))}</p>
      ${hasOrigin ? `<button type="button" class="origin-go" data-origin="${e(cfg.key)}">${e(T("この産地の気候・土壌・歴史を読む"))} →</button>` : ""}
      <input type="text" class="note-search lex-search" id="${searchId}" placeholder="${e(T("銘柄名で検索（例：コイーバ、Fuente…）"))}">
      <div id="${listId}">${list.map(b => brandAcc(b, cfg.key)).join("")}</div>`;

    const go = el.querySelector("[data-origin]");
    if (go) go.addEventListener("click", () => openCountryFromBrands(go.dataset.origin));

    q("#" + searchId).addEventListener("input", (ev) => {
      const term = ev.target.value.trim().toLowerCase();
      qa(`#${listId} .brand-entry`).forEach(d => {
        d.style.display = !term || d.dataset.search.includes(term) ? "" : "none";
      });
    });
  }

  function initSubnav() {
    const nav = q("#brandsSubnav");
    if (!nav) return;
    nav.addEventListener("click", (ev) => {
      const btn = ev.target.closest("[data-bsub]");
      if (!btn) return;
      qa("#brandsSubnav button").forEach(x => x.classList.toggle("active", x === btn));
      COUNTRIES.forEach(cfg => {
        const el = q("#" + cfg.elId);
        if (el) el.classList.toggle("active", cfg.key === btn.dataset.bsub);
      });
    });
  }

  function initWishlist() {
    renderWishPanel();
    // ★ボタン（summary内なので開閉を止める）と、パネル内の操作
    document.addEventListener("click", (ev) => {
      const star = ev.target.closest(".wish-btn");
      if (star) {
        ev.preventDefault(); ev.stopPropagation();
        toggleWish({ en: star.dataset.wen, ja: star.dataset.wja, country: star.dataset.wc });
        return;
      }
      const logBtn = ev.target.closest("[data-wlog]");
      if (logBtn) {
        const w = wishList().find(x => x.en === logBtn.dataset.wlog);
        if (w && typeof NOTE !== "undefined" && NOTE.prefillNew) {
          NOTE.prefillNew({ brand: w.ja, country: COUNTRY_JA[w.country] || "" });
        }
        return;
      }
      const rm = ev.target.closest("[data-wrm]");
      if (rm) {
        const w = wishList().find(x => x.en === rm.dataset.wrm);
        if (w) toggleWish(w);
      }
    });
  }

  function init() {
    useData();
    COUNTRIES.forEach(renderCountry);
    initSubnav();
    initWishlist();
  }

  return { init };
})();
