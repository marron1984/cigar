/* ============================================================
   葉巻大辞典 — アプリ本体（ナビゲーション & 事典レンダリング）
   ============================================================ */

const D = CIGAR_DATA;
/* JSが後から作る画像の当て先。/brands/ のような下層ページでも、
   画面切替でアドレスが変わったあとでも迷子にならないよう、
   サイトの根っこから絶対で指す（根っこは js/dataload.js が割り出す）。 */
const ASSET = (window.SITE_ROOT || "") + "assets/";
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (s) => String(s == null ? "" : s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

/* 日英の名前ペアを、表示言語に合わせて[主,副]の順で返す。
   英語版では英名を主にし、日本語名は参照用に添える。 */
function namePair(ja, en) { return I18N.isEn ? [en || ja, ja] : [ja, en || ""]; }

/* ---------- 強さ → バッジクラス ---------- */
function strengthBadge(s) {
  const cls = /フル/.test(s) ? "s-full" : /ミディアム/.test(s) ? "s-medium" : "s-mild";
  return `<span class="strength-badge ${cls}">${esc(I18N.strength(s))}</span>`;
}
function brandChips(brands, extraClass = "brand", brandKey = null) {
  return `<div class="chips">${brands.map(b => {
    const [n1, n2] = namePair(b.ja, b.en);
    const inner = `${esc(n1)}${n2 ? ` <span style="opacity:.6">${esc(n2)}</span>` : ""}`;
    if (brandKey) {
      return `<button type="button" class="chip ${extraClass} brand-link" data-bkey="${esc(brandKey)}" data-ben="${esc(b.en || "")}" data-bja="${esc(b.ja || "")}">${inner}<span class="brand-link-go" aria-hidden="true">›</span></button>`;
    }
    return `<span class="chip ${extraClass}">${inner}</span>`;
  }).join("")}</div>`;
}

/* 国・産地別 → ブランド大全 の国キー対応 */
const COUNTRY_BRAND_KEY = {
  "Cuba": "cuba", "Dominican Republic": "dominican", "Nicaragua": "nicaragua",
  "Honduras": "honduras", "Mexico": "mexico", "Ecuador": "ecuador",
  "USA (Connecticut)": "usa", "Brazil": "brazil", "Cameroon": "cameroon",
  "Philippines": "philippines"
};

/* ブランド大全 → 国・産地別 の対応（上の逆引き）。
   ペルー・コロンビア・インドネシア・アルゼンチンは産地ページに独立の章が無いので、
   ここには載せない（案内を出さない） */
const BRAND_COUNTRY_TAB = {
  cuba: 0, dominican: 1, nicaragua: 2, honduras: 3, mexico: 4,
  ecuador: 5, usa: 6, brazil: 7, cameroon: 8, philippines: "ph"
};

/* ブランド大全の国タブから、その産地の解説を開く（openBrandInBrands の逆向き） */
function openCountryFromBrands(brandKey) {
  const tab = BRAND_COUNTRY_TAB[brandKey];
  if (tab === undefined) return;
  showView("countries");
  ensureView("countries").then(() => {
    setTimeout(() => {
      const btn = document.querySelector(`#countryNav [data-country="${tab}"]`);
      if (btn) btn.click();
      const d = document.getElementById("countryDetail");
      if (d) d.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  }).catch(() => {});
}

/* ブランドチップから「ブランド大全」の該当国タブを開き、一致する銘柄があれば展開する */
function openBrandInBrands(key, en, ja) {
  showView("brands");
  // ブランド大全のデータは開いたときに読み込むので、描画を待ってから探す
  ensureView("brands").then(() => openBrandAfterRender(key, en, ja)).catch(() => {});
}
function openBrandAfterRender(key, en, ja) {
  const btn = document.querySelector(`#brandsSubnav button[data-bsub="${key}"]`);
  if (btn) btn.click();
  const base = (s) => String(s || "").split(/[（(〔[]/)[0].trim().toLowerCase();
  const enB = base(en), jaB = base(ja);
  setTimeout(() => {
    const container = document.querySelector("#view-brands .sub-view.active");
    if (!container) return;
    // 検索フィルタが残っていれば解除
    const search = container.querySelector(".lex-search");
    if (search && search.value) { search.value = ""; search.dispatchEvent(new Event("input")); }
    let hit = null;
    container.querySelectorAll(".brand-entry").forEach(d => {
      if (hit) return;
      const ds = d.dataset.search || "";
      if ((enB.length >= 3 && ds.includes(enB)) || (jaB.length >= 2 && ds.includes(jaB))) hit = d;
    });
    if (hit) {
      hit.open = true;
      hit.scrollIntoView({ behavior: "smooth", block: "center" });
      hit.classList.remove("brand-flash");
      void hit.offsetWidth;
      hit.classList.add("brand-flash");
    } else if (container.scrollIntoView) {
      container.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, 130);
}

document.addEventListener("click", (e) => {
  const link = e.target.closest(".brand-link");
  if (!link) return;
  e.preventDefault();
  openBrandInBrands(link.dataset.bkey, link.dataset.ben, link.dataset.bja);
});

/* ============================================================
   ナビゲーション
   ============================================================ */
const views = {
  home: "view-home", finder: "view-finder", basics: "view-basics", countries: "view-countries",
  sizes: "view-sizes", prices: "view-prices", tools: "view-tools", humidor: "view-humidor",
  advanced: "view-advanced", phd: "view-phd", japan: "view-japan", world: "view-world", brands: "view-brands",
  news: "view-news",
  admin: "view-admin",        /* 管理画面。ナビには出さず #admin で開く */
  note: "view-note"
};

/* ============================================================
   URL（アドレス）とページの対応
   ------------------------------------------------------------
   以前は #brands のようにハッシュだけで切り替えていたため、
   検索エンジンから見るとサイト全体が1ページしかなかった。
   いまは /brands/ という本物のURLを持たせ、各ページに
   別々の題と説明文を付けている（対応表は data/pages.js）。

   ・古い #brands 形式のリンクも今までどおり開ける（開いたあと /brands/ に直す）
   ・file:// で開いたときはURLを書き換えられないので、ハッシュのまま動く
   ・管理画面（#admin）だけはURLを持たせない（検索対象にしないため）
   ============================================================ */
const META = (typeof PAGE_META !== "undefined") ? PAGE_META : {};
/* サイトの土台。日本語版は "/"、翻訳版は "/en/" "/zh/" のように言語コード。 */
const SITE_BASE = I18N.lang === "ja" ? "/" : "/" + I18N.lang + "/";
const canPushPath = /^https?:$/.test(location.protocol);
/* 道筋 → ビュー名 */
const PATH_VIEW = (() => {
  const m = {};
  Object.keys(META).forEach(v => { m[META[v].path || ""] = v; });
  return m;
})();
function viewUrl(name) {
  if (!canPushPath) return "#" + name;
  const p = META[name] && META[name].path;
  if (p == null) return SITE_BASE + "#" + name;   // 管理画面など、URLを持たないページ
  return SITE_BASE + (p ? p + "/" : "");
}
/* いま開くべきページを、アドレスから読み取る */
function routeFromLocation() {
  const h = (location.hash || "").replace(/^#/, "");
  if (views[h]) return h;                         // 古い #brands 形式のリンク
  if (canPushPath) {
    let rest = location.pathname;
    if (rest.indexOf(SITE_BASE) === 0) rest = rest.slice(SITE_BASE.length);
    rest = rest.replace(/index\.html$/, "").replace(/^\/+|\/+$/g, "");
    try { rest = decodeURIComponent(rest); } catch (e) {}
    if (PATH_VIEW[rest]) return PATH_VIEW[rest];
  }
  if (views[window.SITE_ROUTE]) return window.SITE_ROUTE;
  return "home";
}
/* 題・正規URL・SNSカードを、いま開いているページのものに書き換える。
   最初の表示では生成ずみのHTMLと同じ値になるので、実質は画面切替のときに効く。 */
function applyPageMeta(name) {
  const m = META[name] && (META[name][I18N.lang] || META[name].ja);
  if (!m) return;
  document.title = m.title;
  const set = (sel, attr, val) => { const el = document.querySelector(sel); if (el) el.setAttribute(attr, val); };
  set('meta[name="description"]', "content", m.desc);
  set('meta[property="og:title"]', "content", m.title);
  set('meta[property="og:description"]', "content", m.desc);
  set('meta[name="twitter:title"]', "content", m.title);
  set('meta[name="twitter:description"]', "content", m.desc);
  if (!canPushPath) return;
  const abs = location.origin + viewUrl(name);
  set('link[rel="canonical"]', "href", abs);
  set('meta[property="og:url"]', "content", abs);
  // 言語切替の行き先も、同じページの相手言語に合わせる
  const other = I18N.isEn ? "/" : "/en/";
  const p = META[name] && META[name].path;
  set("#langSwitch", "href", other + (p ? p + "/" : ""));
  /* hreflang は「英語版の中身ができているページ」だけに出す（data/pages.js の enReady）。
     まだのページで出すと、noindex の英語ページを検索エンジンに案内してしまう。
     画面切替で行き来するので、その場で足したり外したりする。 */
  const ensure = (hreflang, href) => {
    let el = document.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`);
    if (!el) {
      el = document.createElement("link");
      el.setAttribute("rel", "alternate");
      el.setAttribute("hreflang", hreflang);
      document.head.appendChild(el);
    }
    el.setAttribute("href", href);
  };
  if (META[name] && META[name].enReady) {
    ensure("ja", location.origin + "/" + (p ? p + "/" : ""));
    ensure("en", location.origin + "/en/" + (p ? p + "/" : ""));
    ensure("x-default", location.origin + "/" + (p ? p + "/" : ""));
  } else {
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
  }
}
/* ---------- ページごとの遅延描画 ----------
   以前は起動時に全ページを描画していたため、そのために全データを
   先に読み込む必要があった。いまは「開いたページだけ」データを読み、
   そのとき初めて描画する。二度目からは何もしない。 */
const RENDER = {
  finder: () => FINDER.init(),
  basics: () => renderBasics(),
  countries: () => renderCountries(),
  /* 実寸表示の置き場（#realSizeBox）は renderSizes が作るので、その後に */
  sizes: () => { renderSizes(); if (typeof REALSIZE !== "undefined") REALSIZE.init(); },
  prices: () => renderPrices(),
  tools: () => renderTools(),
  humidor: () => HUMIDOR.init(),
  advanced: () => ADV.init(),
  phd: () => PHD.init(),
  world: () => WORLD.init(),
  japan: () => JAPAN.init(),
  brands: () => BRANDS.init(),
  news: () => (typeof NEWS !== "undefined" ? NEWS.init() : undefined)
};
const viewReady = {};      // ビュー名 → 描画済みの Promise
function ensureView(name) {
  if (viewReady[name]) return viewReady[name];
  const p = DATA.pack(name)
    .then(() => {
      const old = $("#" + views[name] + " .data-error");   // 前回の読み込み失敗の断り書きを消す
      if (old) old.remove();
      if (RENDER[name]) RENDER[name]();
    })
    .catch((err) => {
      delete viewReady[name];        // 通信が戻ったら次の表示でやり直せるように
      const host = $("#" + views[name]);
      if (host && !host.querySelector(".data-error")) {
        const box = document.createElement("div");
        box.className = "callout warn data-error";
        box.textContent = T("データを読み込めませんでした。通信環境をご確認のうえ、もう一度お試しください。");
        host.appendChild(box);
      }
      throw err;
    });
  viewReady[name] = p;
  return p;
}

function showView(name, opts = {}) {
  if (!views[name]) name = "home";
  ensureView(name).catch(() => {});
  $$(".view").forEach(v => v.classList.remove("active"));
  $("#" + views[name]).classList.add("active");
  $$("#navTabs [data-view], .bottom-nav [data-view]").forEach(b =>
    b.classList.toggle("active", b.dataset.view === name));
  window.scrollTo({ top: 0, behavior: "smooth" });
  applyPageMeta(name);
  // 履歴に積む（pushState）ことで、ブラウザの「戻る」やスワイプバックで
  // 直前のページに戻れるようにする。戻る操作由来（fromPop）のときは積まない。
  // opts.keepUrl は #share=… のような、ページ名以外の用途で使われている
  // ハッシュを消さないための逃げ道。
  const url = viewUrl(name);
  const here = canPushPath ? (location.pathname + location.hash) : location.hash;
  if (!opts.keepUrl && here !== url) {
    if (opts.replace) history.replaceState(null, "", url);
    else if (!opts.fromPop) history.pushState(null, "", url);
  }
  if (name === "note") NOTE.render();
  closeNav();
  trackPageView(name);
}

/* ページ切替をアクセス解析へ送る。
   このサイトは1枚のHTMLでハッシュ（#brands 等）を切り替える作りなので、
   タグを貼るだけでは最初の表示しか計測されない。画面が変わるたびに
   page_view を送ることで、どのページが読まれているかが分かるようにする。
   解析タグが未読込／ブロックされている場合は何もしない（サイトの動作には影響しない）。 */
const VIEW_TITLES = {
  home: "ホーム", basics: "基礎知識", countries: "国と産地", sizes: "太さと長さ",
  prices: "価格", tools: "喫煙具", humidor: "ヒュミドール", advanced: "上級編",
  phd: "葉巻博士", japan: "日本の葉巻", world: "世界の名店", brands: "ブランド大全",
  news: "ニュース", note: "記録ノート"
};
function trackPageView(name) {
  if (typeof gtag !== "function") return;
  const label = T(VIEW_TITLES[name] || name);
  gtag("event", "page_view", {
    page_title: label + "｜Cigar Cafe",
    page_location: location.origin + viewUrl(name),
    page_path: viewUrl(name)
  });
}

/* 戻る／進む（スワイプバック含む）でビューを同期 */
window.addEventListener("popstate", () => {
  showView(routeFromLocation(), { fromPop: true });
});

/* ---------- モバイル・ハンバーガーメニュー ---------- */
function setNav(open) {
  const tabs = $("#navTabs");
  const btn = $("#navToggle");
  if (!tabs) return;
  tabs.classList.toggle("open", open);
  if (btn) { btn.classList.toggle("open", open); btn.setAttribute("aria-expanded", open ? "true" : "false"); }
  const scrim = $("#navScrim");
  if (scrim) { scrim.hidden = !open; scrim.classList.toggle("show", open); }
  const menuBtn = $(".bottom-nav .bn-menu");
  if (menuBtn) menuBtn.classList.toggle("active", open);
  // メニュー展開中は背面のスクロールを固定
  document.body.classList.toggle("nav-open", open);
}
function closeNav() { setNav(false); }

document.addEventListener("click", (e) => {
  if (!(e.target instanceof Element)) return;   // テキストノード等での closest 呼び出しを防ぐ
  const toggle = e.target.closest("[data-nav-toggle]");
  if (toggle) {
    e.preventDefault();
    setNav(!$("#navTabs").classList.contains("open"));
    return;
  }
  if (e.target.closest("#navScrim")) { closeNav(); return; }
  const t = e.target.closest("[data-view]");
  if (t) {
    // 新しいタブで開く操作（⌘/Ctrl＋クリック、中クリック等）はブラウザに任せる。
    // メニューは本物のリンクなので、そのまま別タブで開けるようにしておく。
    if (t.tagName === "A" && (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)) return;
    e.preventDefault();
    showView(t.dataset.view);
    return;
  }
  // メニュー外クリックで閉じる（シート内・ヘッダー内のタップでは閉じない）
  if ($("#navTabs").classList.contains("open") && !e.target.closest(".site-header") && !e.target.closest("#navTabs")) closeNav();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeNav();
});

/* 国別など大きな画像は、画面内に収まるライトボックスで表示（新規タブを開かない） */
document.addEventListener("click", (e) => {
  const im = e.target.closest(".gauge-photo, .guide-photo");
  if (im && im.src) {
    e.preventDefault();
    const lb = $("#lightbox"), lbi = $("#lightboxImg");
    if (lb && lbi) { lbi.src = im.src; lb.classList.add("open"); }
  }
});

/* ============================================================
   ホーム
   ============================================================ */
const HOME_CARDS = [
  { view: "finder", h: "はじめの一本さがし", p: "4つの質問に答えると、254銘柄からあなたに合いそうな3本を選びます。" },
  { view: "basics", h: "基礎知識", p: "葉巻とは？構造・吸い方・味わいの表現・歴史・マナーまで。" },
  { view: "countries", h: "国・産地別", p: "キューバ、ドミニカ、ニカラグア…主要10産地の個性を比較。" },
  { view: "sizes", h: "太さ・サイズ別", p: "リングゲージとビトラ。定番サイズを一覧で。" },
  { view: "prices", h: "価格帯別", p: "入門からハイエンドまで、価格別の選び方。" },
  { view: "tools", h: "喫煙具・保管", p: "カッター、ライター、ヒュミドールの選び方。" },
  { view: "humidor", h: "ヒュミドール大全", p: "歴史・メーカー・使い方・種類・価格を5つの観点で徹底調査。" },
  { view: "advanced", h: "上級編（オタクの世界）", p: "品種・発酵・キューバ通・名門・喫煙術・ペアリング・熟成科学。" },
  { view: "phd", h: "博士編（学術）", p: "化学・植物学・官能評価・銘柄DB・産業経済・健康科学。" },
  { view: "japan", h: "日本ガイド", p: "全国47都道府県の販売店・シガーバー一覧。日本の歴史・税制・喫煙環境・マナーも。" },
  { view: "world", h: "世界編（総覧）", p: "年表・文化・愛好家・日本・実践レビュー・投資・用語大全・トラベル・FAQ。" },
  { view: "brands", h: "ブランド大全", p: "世界の銘柄（マルカ）を創業からの歴史とともに。まずはキューバ全マルカ。" },
  { view: "news", h: "葉巻ニュース", p: "海外一次ソースの翻訳＋日本国内ニュース。新製品・業界・イベント・規制。" }
];
/* ホームで使う銘柄一覧は、名前まわりだけを抜き出した要約データ（data/summary.js）。
   ブランド大全の本体（約4.8MB）はブランド大全を開いたときに読み込むので、
   ホームの表示のためだけに待たされることがなくなる。
   要約のキーは短縮してある（d=導入文 / f=創業 / k=種別）。 */
function brandsIndex() {
  if (typeof BRANDS_SUMMARY !== "undefined" && BRANDS_SUMMARY.brands) return BRANDS_SUMMARY.brands;
  return (typeof BRANDS_DATA !== "undefined") ? BRANDS_DATA : {};
}
const bLead = (b) => b.d || String(b.history || "").replace(/【[^】]*】/g, "").trim().slice(0, 150);
const bFounded = (b) => b.f || String(b.founded || "").slice(0, 18);
const bKind = (b) => b.k || b.kind || "";

/* 今日の一本：全ブランドから日替わりで1つ紹介（日付で決まるので1日固定） */
function dailyBrandPick() {
  try {
    const COUNTRY_JA_MAP = {
      cuba: "キューバ", dominican: "ドミニカ共和国", nicaragua: "ニカラグア", honduras: "ホンジュラス",
      mexico: "メキシコ", ecuador: "エクアドル", usa: "アメリカ", brazil: "ブラジル", cameroon: "カメルーン",
      peru: "ペルー", colombia: "コロンビア", philippines: "フィリピン", indonesia: "インドネシア", argentina: "アルゼンチン"
    };
    const IDX = brandsIndex();
    const flat = [];
    Object.keys(IDX).forEach(key =>
      (IDX[key] || []).forEach(b => flat.push({ key, b, cja: COUNTRY_JA_MAP[key] || "" })));
    if (!flat.length) return null;
    const now = new Date();
    const seed = now.getFullYear() * 372 + (now.getMonth() + 1) * 31 + now.getDate();
    return flat[seed % flat.length];
  } catch (e) { return null; }
}

/* 収録内容から「数字」を集計する。データを足せば自動で増えるので、
   手で書いた数字が古くなることがない。
   view はその数字が指している中身のページ（カードごと押せるようにする）。 */
function homeFigures() {
  const out = [];
  try {
    const IDX = brandsIndex();
    const keys = Object.keys(IDX);
    const brands = keys.reduce((n, k) => n + (IDX[k] || []).length, 0);
    if (brands) out.push({ v: brands, u: "", view: "brands", l: T("収録ブランド"), s: T("世界の銘柄（マルカ）を創業から現在まで") });
    if (keys.length) out.push({ v: keys.length, u: "", view: "countries", l: T("産地・国"), s: T("キューバから東南アジアまで") });
  } catch (e) { /* データ未読込でも他は出す */ }
  try {
    const v = (CIGAR_DATA && CIGAR_DATA.vitolas || []).length;
    if (v) out.push({ v, u: "", view: "sizes", l: T("サイズ（ビトラ）"), s: T("寸法と味わいの目安つき") });
  } catch (e) {}
  try {
    // ニュース本体はニュースページを開くまで読まないので、件数は要約データから
    const n = (typeof BRANDS_SUMMARY !== "undefined" && BRANDS_SUMMARY.newsCount)
      || ((window.NEWS_DATA && window.NEWS_DATA.items) || []).length;
    if (n) out.push({ v: n, u: "", view: "news", l: T("翻訳ニュース"), s: T("海外一次ソース＋国内の動き") });
  } catch (e) {}
  return out;
}

/* 横スクロールで見せる銘柄。日替わりで並びが変わる */
function showcaseBrands(n) {
  try {
    const COUNTRY_JA_MAP = {
      cuba: "キューバ", dominican: "ドミニカ", nicaragua: "ニカラグア", honduras: "ホンジュラス",
      mexico: "メキシコ", ecuador: "エクアドル", usa: "アメリカ", brazil: "ブラジル", cameroon: "カメルーン",
      peru: "ペルー", colombia: "コロンビア", philippines: "フィリピン", indonesia: "インドネシア", argentina: "アルゼンチン"
    };
    const IDX = brandsIndex();
    const flat = [];
    Object.keys(IDX).forEach(key =>
      (IDX[key] || []).forEach(b => {
        if (bKind(b) === "leaf") return;            // 葉・産地の項目は銘柄ではないので出さない
        flat.push({ key, b, cja: COUNTRY_JA_MAP[key] || "" });
      }));
    if (!flat.length) return [];
    const now = new Date();
    let seed = now.getFullYear() * 372 + (now.getMonth() + 1) * 31 + now.getDate();
    const out = [], used = new Set();
    while (out.length < Math.min(n, flat.length)) {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;   // 日付から決まる擬似乱数
      const i = seed % flat.length;
      if (used.has(i)) continue;
      used.add(i); out.push(flat[i]);
    }
    return out;
  } catch (e) { return []; }
}

function renderHome() {
  /* --- 数字 --- */
  const figs = homeFigures();
  /* 数字はそれぞれの中身のページへの入口にする（ナビと同じ書き方で、
     押せばそのページへ。アドレスも持たせるので新しいタブで開ける）。 */
  $("#homeFigures").innerHTML = figs.length ? figs.map(f => `
    <a class="stat-box fig" href="${esc(viewUrl(f.view))}" data-view="${esc(f.view)}">
      <div class="sv">${f.v}${f.u}</div>
      <div class="sl">${esc(f.l)}</div>
      <div class="sn">${esc(f.s)}</div>
      <span class="sgo" aria-hidden="true">→</span>
    </a>`).join("") : "";

  /* --- 今日の一本 --- */
  const pick = dailyBrandPick();
  $("#homeFeature").innerHTML = pick ? `
    <article class="feature-brand" data-daily="1">
      <div class="fb-kicker">${T("今日の一本")} — ${esc(I18N.country(pick.cja))}</div>
      <h2 class="fb-title">${esc(namePair(pick.b.ja, pick.b.en)[0])}</h2>
      <div class="fb-en">${esc(namePair(pick.b.ja, pick.b.en)[1])}</div>
      <p class="fb-lead">${esc(bLead(pick.b))}…</p>
      <div class="fb-go">${T("ブランド大全で読む")} →</div>
    </article>` : "";
  const dc = $("#homeFeature .feature-brand");
  if (dc && pick) dc.addEventListener("click", () => openBrandInBrands(pick.key, pick.b.en, pick.b.ja));

  /* --- 銘柄ショーケース（横スクロール） --- */
  const show = showcaseBrands(12);
  $("#homeShowcase").innerHTML = show.length ? `
    <div class="showcase-head">
      <span class="hi-num">BRANDS</span>
      <h2>${T("今日の並び")}</h2>
      <button class="sc-more" data-view="brands">${T("すべて見る")} →</button>
    </div>
    <div class="showcase-rail" role="list">
      ${show.map(s => `
        <button class="sc-card" role="listitem" data-sc-key="${esc(s.key)}" data-sc-en="${esc(s.b.en)}" data-sc-ja="${esc(s.b.ja)}">
          <span class="sc-country">${esc(I18N.country(s.cja))}</span>
          <span class="sc-ja">${esc(namePair(s.b.ja, s.b.en)[0])}</span>
          <span class="sc-en">${esc(namePair(s.b.ja, s.b.en)[1])}</span>
          <span class="sc-founded">${esc(I18N.isEn ? bFounded(s.b).replace("年頃", " (c.)").replace("年", "") : bFounded(s.b))}</span>
        </button>`).join("")}
    </div>` : "";
  $$("#homeShowcase .sc-card").forEach(el => {
    el.addEventListener("click", () =>
      openBrandInBrands(el.dataset.scKey, el.dataset.scEn, el.dataset.scJa));
  });

  /* --- 索引 --- */
  /* 通し番号は .home-card 側の CSS カウンタが自動で振る */
  /* 索引は本物のリンク（<a href>）にしてある。
     クリックは共通のハンドラが受けて画面を切り替えるが、
     リンクにしておくことで検索エンジンが各ページを辿れる。 */
  $("#homeGrid").innerHTML = HOME_CARDS.map(c => `
    <a class="home-card" href="${esc(viewUrl(c.view))}" data-view="${c.view}">
      <h3>${T(c.h, null, "home")}</h3>
      <p>${T(c.p, null, "home")}</p>
      <div class="go">${T("開く")} →</div>
    </a>`).join("");
}

/* ============================================================
   基礎知識
   ============================================================ */
function renderBasics() {
  const anatomy = D.anatomy.map(a => { const [p1, p2] = namePair(a.ja, a.en); return `
    <div class="item">
      <div><span class="p-name">${esc(p1)}</span><span class="p-en">${esc(p2)}</span></div>
      <div class="p-desc">${esc(a.desc)}</div>
    </div>`; }).join("");

  const steps = D.howToSmoke.map(s => `
    <li><span class="st">${esc(s.title)}</span><span class="sd">${esc(s.desc)}</span></li>`).join("");

  const shades = D.wrapperShades.map(s => { const [p1, p2] = namePair(s.ja, s.en); return `
    <div class="shade">
      <div class="swatch" style="background:${s.hex}"></div>
      <div class="meta">
        <div class="sn">${esc(p1)}</div>
        <div class="se">${esc(p2)}</div>
        <div class="sf">${esc(s.flavor)}</div>
      </div>
    </div>`; }).join("");

  const gloss = D.glossary.map(g => { const [p1, p2] = namePair(g.ja, g.en); return `
    <div class="gloss-item">
      <span class="gt">${esc(p1)}</span> <span class="ge">${esc(p2)}</span>
      <div class="gd">${esc(g.desc)}</div>
    </div>`; }).join("");

  $("#basicsContent").innerHTML = `
    <div class="kb-block">
      <h3>${T("葉巻とは")}</h3>
      <div class="prose">${FMT.prose(D.whatIsCigar)}</div>
    </div>

    ${I18N.isEn ? "" : `<div class="kb-block">
      <img class="guide-photo" loading="lazy" decoding="async" src="${ASSET}anatomy-guide.webp"
           alt="葉巻の構造（アナトミー）と吸い方 ビジュアルガイド"
           onerror="this.closest('.kb-block').remove()">
    </div>`}

    <div class="kb-block">
      <h3>${T("葉巻の構造（アナトミー）")}</h3>
      <div class="anatomy-list">${anatomy}</div>
    </div>

    <div class="kb-block">
      <h3>${T("葉巻の吸い方（初心者向け 5ステップ）")}</h3>
      <ol class="step-list">${steps}</ol>
      <div class="callout warn">${T("よくある失敗：紙巻き感覚で肺に吸い込んでむせる／早いペースで吸って火が高温になり苦く・辛くなる／深く切りすぎて巻きがほどける。ゆっくり、少しずつが基本です。")}</div>
    </div>

    <div class="kb-block">
      <h3>${T("味わいの表現・テイスティング")}</h3>
      <div class="prose">${FMT.prose(D.tastingTerms)}</div>
    </div>

    <div class="kb-block">
      <h3>${T("ラッパーの色（シェード）による分類")}</h3>
      <p class="prose" style="margin-bottom:14px">${T("葉巻の一番外側の葉「ラッパー」の色は、味わいの傾向を映す目安になります（※色の濃さ＝強さ ではなく、強さは主にフィラーが決めます）。")}</p>
      <div class="shade-grid">${shades}</div>
    </div>

    <div class="kb-block">
      <h3>${T("葉巻の歴史")}</h3>
      <div class="prose">${FMT.prose(D.history)}</div>
    </div>

    <div class="kb-block">
      <h3>${T("マナー・楽しみ方とペアリング")}</h3>
      <div class="prose">${FMT.prose(D.manners)}</div>
    </div>

    <div class="kb-block">
      <h3>${T("用語集")}</h3>
      <div class="glossary">${gloss}</div>
    </div>`;
}

/* ============================================================
   国・産地別
   ============================================================ */
// 深掘りセクション（countries_deep.js が各国に追加する sections / sources）を描画
function countrySections(c) {
  if (!Array.isArray(c.sections) || !c.sections.length) return "";
  return `<div class="cd-sections">` + c.sections.map(s => `
    <details class="acc">
      <summary>${esc(s.h)}</summary>
      <div class="acc-body">${FMT.prose(s.body)}</div>
    </details>`).join("") + `</div>`;
}

// 出典文字列内のURLをクリック可能なリンクにする（それ以外はエスケープ）
function srcLink(s) {
  return String(s).split(/(https?:\/\/[^\s、，）)]+)/g).map((part, i) =>
    i % 2 ? `<a href="${esc(part)}" target="_blank" rel="noopener">${esc(part)}</a>` : esc(part)
  ).join("");
}

function countrySources(c) {
  if (!Array.isArray(c.sources) || !c.sources.length) return "";
  return `
    <div class="field"><div class="lbl">${T("主な出典")} <span class="brand-refs-n">${T("{n}件", { n: c.sources.length })}</span></div>
      <ul class="brand-refs">${c.sources.map(s => `<li>${srcLink(s)}</li>`).join("")}</ul></div>`;
}

function countryFields(c) {
  return `
    <div class="field"><div class="lbl">${T("風味の特徴")}</div><div class="val">${FMT.prose(c.flavor)}</div></div>
    <div class="field"><div class="lbl">${T("気候・土壌")}</div><div class="val">${FMT.prose(c.climate)}</div></div>
    <div class="field"><div class="lbl">${T("主な栽培地域")}</div>
      <div class="chips">${c.regions.map(r => `<span class="chip">${esc(r)}</span>`).join("")}</div></div>
    <div class="field"><div class="lbl">${T("代表的な銘柄")}</div>${brandChips(c.brands, "brand", COUNTRY_BRAND_KEY[c.name_en])}</div>
    <div class="field"><div class="lbl">${T("歴史")}</div><div class="val">${FMT.prose(c.history)}</div></div>
    <div class="field"><div class="lbl">${T("豆知識")}</div><div class="val">${FMT.prose(c.trivia)}</div></div>
    ${countrySections(c)}
    ${countrySources(c)}`;
}

function renderCountryDetail(idx) {
  const c = D.countries[idx];
  if (!c) return;
  $("#countryDetail").innerHTML = `
    <div class="country-detail">
      <div class="cd-head">
        <span class="cd-flag">${c.flag}</span>
        <div class="cd-title"><div class="cd-name">${esc(namePair(c.name_ja, c.name_en)[0])}</div><div class="cd-en">${esc(namePair(c.name_ja, c.name_en)[1])}</div></div>
        ${strengthBadge(c.strength)}
      </div>
      <div class="cd-body">${countryFields(c)}</div>
    </div>`;
}

/* フィリピン：他国と同じタブ内詳細として表示（埋もれた葉巻大国を掘り下げる） */
function renderPhilippinesDetail() {
  const p = D.philippinesDetail;
  if (!p) return;
  const sections = p.sections.map(s => `
    <details class="acc">
      <summary>${esc(s.h)}</summary>
      <div class="acc-body">${FMT.prose(s.body)}</div>
    </details>`).join("");
  $("#countryDetail").innerHTML = `
    <div class="country-detail">
      <div class="cd-head">
        <span class="cd-flag">${p.flag}</span>
        <div class="cd-title"><div class="cd-name">${esc(namePair(p.name_ja, p.name_en)[0])}</div><div class="cd-en">${esc(namePair(p.name_ja, p.name_en)[1])}</div></div>
        ${strengthBadge(p.strength)}
      </div>
      <div class="cd-body">
        <div class="field"><div class="lbl">${T("風味の特徴")}</div><div class="val">${FMT.prose(p.flavor)}</div></div>
        <div class="field"><div class="lbl">${T("主な栽培地域")}</div>
          <div class="chips">${p.regions.map(r => `<span class="chip">${esc(r)}</span>`).join("")}</div></div>
        <div class="field"><div class="lbl">${T("現存する主要ブランド")}</div>${brandChips(p.brands, "brand", "philippines")}</div>
        <div class="cd-sections">${sections}</div>
        ${sourcesField(p.sources)}
      </div>
    </div>`;
}

function renderCountries() {
  if ($("#countryOverview")) $("#countryOverview").innerHTML = "";
  // その他・新興の葉巻生産国（フィリピンは独立タブへ移動）
  $("#countryOthers").innerHTML = `
    <div class="kb-block">
      <h3>${T("その他・新興の葉巻生産国")}</h3>
      <p class="prose" style="margin-bottom:12px">${T("主要国のほかにも、高品質なラッパー葉や個性的な葉を支える産地があります（インドネシア／スマトラ、コスタリカ、パナマ、ペルー、コロンビア、エルサルバドル、パラグアイ 等）。")}</p>
    </div>`;
  const tabs = D.countries.map((c, i) =>
    `<button data-country="${i}"${i === 0 ? ' class="active"' : ''}>${c.flag} ${esc(namePair(c.name_ja, c.name_en)[0])}</button>`).join("");
  const phTab = D.philippinesDetail
    ? `<button data-country="ph">${D.philippinesDetail.flag} ${esc(namePair(D.philippinesDetail.name_ja, D.philippinesDetail.name_en)[0])}</button>` : "";
  $("#countryNav").innerHTML = tabs + phTab;
  $("#countryNav").addEventListener("click", (e) => {
    const b = e.target.closest("[data-country]");
    if (!b) return;
    $$("#countryNav button").forEach(x => x.classList.remove("active"));
    b.classList.add("active");
    if (b.dataset.country === "ph") renderPhilippinesDetail();
    else renderCountryDetail(Number(b.dataset.country));
    $("#countryDetail").scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
  renderCountryDetail(0);
}

/* ============================================================
   太さ・サイズ別
   ============================================================ */
function renderSizes() {
  // スマホで横スクロールせず読めるよう、表ではなくカード形式で表示
  const vitolaCards = D.vitolas.map(v => { const [p1, p2] = namePair(v.ja, v.en); return `
    <div class="vitola-card">
      <div class="vc-name">${esc(p1)}<span class="vc-en">${esc(p2)}</span></div>
      <div class="vc-specs">
        <div class="vc-spec"><span class="vc-k">${T("長さ")}</span><span class="vc-v">${esc(v.len)}</span></div>
        <div class="vc-spec"><span class="vc-k">${T("リングゲージ")}</span><span class="vc-v">${esc(v.rg)}</span></div>
        <div class="vc-spec"><span class="vc-k">${T("喫煙時間")}</span><span class="vc-v">${esc(v.time)}</span></div>
      </div>
      <p class="vc-feat">${esc(v.feat)}</p>
    </div>`; }).join("");

  // ゲージ（太さ）ビジュアル一覧
  const gauges = [
    { g: 28, name: "パナテラ", mm: "約11mm" },
    { g: 33, name: "コロナ", mm: "約13mm" },
    { g: 42, name: "ペティコロナ", mm: "約17mm" },
    { g: 46, name: "コロナゴルダ", mm: "約18mm" },
    { g: 50, name: "ロブスト", mm: "約20mm" },
    { g: 52, name: "トロ", mm: "約21mm" },
    { g: 54, name: "トロゴルダ", mm: "約21.5mm" },
    { g: 60, name: "グランロブスト", mm: "約24mm" },
    { g: 64, name: "ダブルトロ", mm: "約25.4mm" }
  ];
  const cigs = gauges.map(x => {
    const w = Math.round(20 + (x.g - 28) * 1.15); // ゲージに比例した幅(px)
    return `<div class="gauge-col">
      <div class="cig" style="width:${w}px"><div class="band"></div></div>
      <div class="g-num">${x.g}</div>
      <div class="g-name">${esc(T(x.name, null, "vitola"))}</div>
      <div class="g-mm">${esc(I18N.isEn ? x.mm.replace("約", "≈") : x.mm)}</div>
    </div>`;
  }).join("");
  const refRows = [
    { g: "28〜33", mm: "約11〜13mm", img: "とても細い", feat: "軽やかで上品、短時間向き" },
    { g: "40〜46", mm: "約16〜18mm", img: "細め〜中細", feat: "バランスが良く、スタンダード" },
    { g: "50〜54", mm: "約20〜21.5mm", img: "中太", feat: "味わいと煙量のバランスが良い" },
    { g: "60〜64", mm: "約24〜25.4mm", img: "太め〜極太", feat: "濃厚で煙量も多く、長時間向き" }
  ].map(r => `<tr><td style="color:var(--gold-bright)">${r.g}</td><td>${I18N.isEn ? r.mm.replace("約", "≈") : r.mm}</td><td>${T(r.img, null, "gauge")}</td><td>${T(r.feat, null, "gauge")}</td></tr>`).join("");

  const gaugeFigure = `
    <div class="kb-block">
      <h3>${T("葉巻の太さの種類（ゲージサイズ）一覧")}</h3>
      ${I18N.isEn ? "" : `<img class="gauge-photo" loading="lazy" decoding="async" src="${ASSET}gauge-size-chart.webp"
           alt="葉巻の太さの種類（ゲージサイズ）一覧"
           style="display:none"
           onload="this.style.display='block';var f=document.getElementById('gaugeFallback');if(f)f.style.display='none';"
           onerror="this.remove()">`}
      <div id="gaugeFallback" class="gauge-figure">
        <div class="gf-lead">${T("葉巻の太さは「ゲージ（直径）」で表され、数値が大きいほど太くなります。")}</div>
        <div class="gauge-scroll"><div class="gauge-track">${cigs}</div></div>
        <div class="gauge-gradients">
          <div class="gg-row"><div class="gg-lbl">${T("味わい<br>（目安）")}</div>
            <div class="gg-bar"><span class="l">${T("軽やか・ライト")}</span><span class="arrow">→</span><span class="r">${T("濃厚・フルボディ")}</span></div></div>
          <div class="gg-row"><div class="gg-lbl">${T("喫煙時間<br>（目安）")}</div>
            <div class="gg-bar"><span class="l">${T("短い（20〜30分）")}</span><span class="arrow">→</span><span class="r">${T("長い（60〜120分）")}</span></div></div>
        </div>
        <div class="gauge-explain">
          <div class="gauge-def">
            <h4>${T("ゲージ（Ring Gauge）とは？")}</h4>
            <p>${T("葉巻の直径を1/64インチ単位で表したもの。ゲージが大きいほど太く、煙の量や味わいの濃さ、喫煙時間に影響します。")}</p>
            <div class="ring-vis"><div class="ring-circle"></div><div class="ring-cap">${T("直径（ゲージ）<br>＝1/64インチ単位")}</div></div>
          </div>
          <div class="table-wrap">
            <table class="ref"><thead><tr><th>${T("ゲージ")}</th><th>${T("直径(mm)")}</th><th>${T("太さのイメージ")}</th><th>${T("特徴", null, "gauge")}</th></tr></thead>
            <tbody>${refRows}</tbody></table>
          </div>
        </div>
        <div class="callout" style="margin-top:16px">${T("※葉巻の長さ（リングゲージ以外）や形状（パレホ、トーピード、チャーチル等）によっても、喫煙体験は異なります。")}</div>
      </div>
    </div>`;

  $("#sizesContent").innerHTML = gaugeFigure + `
    <div class="kb-block">
      <h3>${T("リングゲージとは")}</h3>
      <div class="prose"><p>${esc(D.ringGaugeIntro)}</p></div>
    </div>

    <div class="kb-block">
      <h3>${T("主要なビトラ（サイズ規格）一覧")}</h3>
      <div class="vitola-list">${vitolaCards}</div>
    </div>

    <div class="kb-block">
      <h3>${T("太さ別ガイド（細い vs 太い）")}</h3>
      <div class="prose"><p>${esc(D.thicknessGuide)}</p></div>
      <div class="callout">${T("初心者の最初の一本には <b>ロブスト（約5インチ × RG50）</b> がおすすめ。まろやかで扱いやすく、30〜45分で楽しめます。")}</div>
    </div>

    <div class="kb-block">
      <h3>${T("形状の分類（パラホ / フィギュラード）")}</h3>
      <div class="prose"><p>${esc(D.shapeClassification)}</p></div>
    </div>

    <div class="kb-block" id="realSizeBox"></div>`;
}

/* ============================================================
   価格帯別
   ============================================================ */
// 出典リスト（拡充データ用の共通ヘルパー）
function sourcesField(sources) {
  if (!Array.isArray(sources) || !sources.length) return "";
  return `<div class="field"><div class="lbl">${T("主な出典")} <span class="brand-refs-n">${T("{n}件", { n: sources.length })}</span></div>
    <ul class="brand-refs">${sources.map(s => `<li>${srcLink(s)}</li>`).join("")}</ul></div>`;
}

function renderPrices() {
  const tiers = D.priceTiers.map(t => {
    const secs = Array.isArray(t.sections) && t.sections.length
      ? `<div class="tool-more">${t.sections.map(s =>
          `<details class="acc tool-sub"><summary>${esc(s.h)}</summary><div class="acc-body">${FMT.prose(s.body)}</div></details>`).join("")}</div>`
      : "";
    return `
    <div class="card tier-card">
      <h3>${esc(t.tier)}</h3>
      <div class="price-band">${esc(t.range)}</div>
      <div class="field"><div class="lbl">${T("特徴")}</div><div class="val">${FMT.prose(t.feat)}</div></div>
      <div class="field"><div class="lbl">${T("こんな人に")}</div><div class="val">${FMT.prose(t.whom)}</div></div>
      <div class="field"><div class="lbl">${T("代表的な銘柄")}</div>${brandChips(t.brands)}</div>
      <div class="field"><div class="lbl">${T("アドバイス")}</div><div class="val">${FMT.prose(t.advice)}</div></div>
      ${secs}
      ${sourcesField(t.sources)}
    </div>`;
  }).join("");

  const topics = Array.isArray(D.priceTopics) && D.priceTopics.length
    ? `<div class="kb-block">
        <h3>${T("価格を深く読み解く")}</h3>
        <div class="tool-list">${D.priceTopics.map(t => `
          <details class="acc">
            <summary>${esc(t.h)}</summary>
            <div class="acc-body">${FMT.prose(t.body)}${sourcesField(t.sources)}</div>
          </details>`).join("")}</div>
      </div>`
    : "";

  $("#pricesContent").innerHTML = `
    <div class="grid grid-2">${tiers}</div>
    ${topics}
    <div class="kb-block">
      <h3>${T("価格を左右する要因")}</h3>
      <div class="prose">${FMT.prose(D.priceFactors)}</div>
    </div>
    <div class="kb-block">
      <h3>${T("ドライシガーとプレミアムシガーの違い")}</h3>
      <div class="prose">${FMT.prose(D.dryVsPremium)}</div>
    </div>`;
}

/* ============================================================
   喫煙具
   ============================================================ */
function renderTools() {
  const list = [...D.tools].sort((a, b) => (a.order || 0) - (b.order || 0));
  // 各喫煙具をアコーディオン化し、長文が一度に並んで間延びしないようにする。
  // 詳細内も「基本（役割・選び方・価格・ブランド）」を先に見せ、
  // 参照色の濃い項目（種類・使い方・手入れ・歴史）は入れ子アコーディオンに畳む。
  const sub = (label, body) => body
    ? `<details class="acc tool-sub"><summary>${esc(label)}</summary><div class="acc-body">${FMT.prose(body)}</div></details>` : "";
  const tools = list.map((t, i) => `
    <details class="acc tool-acc"${i === 0 ? " open" : ""}>
      <summary>
        <span class="tool-sum"><span class="tool-ic">${t.icon}</span>
          <span class="tool-sum-txt">${esc(namePair(t.ja, t.en)[0])}<span class="tool-sum-en">${esc(namePair(t.ja, t.en)[1])}</span></span></span>
      </summary>
      <div class="acc-body tool-body">
        <div class="field"><div class="lbl">${T("役割")}</div><div class="val">${FMT.prose(t.role)}</div></div>
        <div class="field"><div class="lbl">${T("選び方")}</div><div class="val">${FMT.prose(t.choose)}</div></div>
        <div class="tool-more">
          ${sub(T("種類・バリエーション"), t.types)}
          ${sub(T("使い方"), t.use)}
          ${sub(T("手入れ・トラブル対処"), t.care)}
          ${sub(T("歴史・文化・豆知識"), t.history)}
        </div>
        <div class="field"><div class="lbl">${T("価格の目安")}</div><div class="val">${FMT.prose(t.price)}</div></div>
        <div class="field"><div class="lbl">${T("おすすめブランド")}</div>${brandChips(t.brands)}</div>
      </div>
    </details>`).join("");

  $("#toolsContent").innerHTML = `
    <div class="tool-list">${tools}</div>
    <details class="acc storage-acc">
      <summary>📦 ${T("保管の基礎知識")}</summary>
      <div class="acc-body prose">${FMT.prose(D.storageBasics)}</div>
    </details>`;
}

/* ============================================================
   初期化
   ============================================================ */
function init() {
  renderHome();
  NOTE.init();
  const start = routeFromLocation();
  /* #share=… のように、ページ名以外の意味を持つハッシュで開かれたときは
     アドレスをそのままにする（再読み込みしても共有リンクが生きるように）。 */
  const foreignHash = !!location.hash && !views[location.hash.slice(1)];
  showView(start, { replace: true, keepUrl: foreignHash });
  /* 最初の表示が済んだら、軽いページのデータだけ裏でそっと取っておく。
     世界編・日本ガイド・ブランド大全は大きいので自動では取りに行かず、
     メニューに触れた時点（下の「触れたら先読み」）で読み始める。
     通信量節約モードや細い回線では先読みそのものをやめる
     （判断は js/dataload.js の prefetch にまとめてある）。 */
  DATA.prefetch(["countries", "prices", "tools", "humidor", "news", "advanced", "phd"]);
  wirePrefetchOnIntent();
}

/* 触れたら先読み：メニューやカードに指・カーソルが乗った時点で
   そのページのデータを取り始める。押してから読み始めるより待ち時間が短くなる。 */
function wirePrefetchOnIntent() {
  const hit = (e) => {
    const el = e.target instanceof Element ? e.target.closest("[data-view]") : null;
    if (el && el.dataset.view) DATA.prefetch([el.dataset.view], { now: true });
  };
  document.addEventListener("pointerover", hit, { passive: true });
  document.addEventListener("touchstart", hit, { passive: true });
  document.addEventListener("focusin", hit);
}
document.addEventListener("DOMContentLoaded", init);
