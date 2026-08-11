#!/usr/bin/env node
/* ============================================================
   ページごとの入口（/brands/index.html など）と sitemap.xml を作る
   ------------------------------------------------------------
   1枚のHTMLで画面を切り替える作りのままだと、検索エンジンから見て
   サイト全体が1ページしかない。そこでページごとに本物のURLを用意し、
   それぞれに固有の題・説明文・正規URL・SNSカードを持たせる。

   中身は index.html（英語版は en/index.html）と同じで、
   ・<title> / description / canonical / hreflang / og: を差し替え
   ・window.SITE_ROUTE で「最初に開くページ」を伝える
   ・1階層深くなるぶん、相対パスに ../ を足す
   だけが違う。データ読み込みも描画も、これまでどおりJSが行う。

   robots.txt と sitemap.xml もここで作る。

   使い方（build_summary.js → build_en.js の後に）：
     NODE_PATH=/opt/node22/lib/node_modules /opt/node22/bin/node tools/build_pages.js
   ============================================================ */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SITE = "https://cigar.cafe";
const META = new Function(fs.readFileSync(path.join(ROOT, "data/pages.js"), "utf8") + "\n;return PAGE_META;")();

/* 日本語以外の対応言語（tools/languages.js）。enabled のものだけページを作る。
   ページごとの「その言語の中身ができているか」は data/pages.js の
   <code>Ready（enReady / zhReady …）で判定する。 */
const FOREIGN = require("./languages").filter(l => l.enabled);
const ready = (view, code) => code === "ja" ? true : !!META[view][code + "Ready"];
const HREFLANG = Object.fromEntries([["ja", "ja"], ...FOREIGN.map(l => [l.code, l.hreflang])]);

/* 生成物の見分けがつくよう、先頭に断りを入れておく（手で直さないため） */
const BANNER = "<!-- このファイルは tools/build_pages.js が index.html から作っています。手で編集しないでください。 -->\n";

const esc = (s) => String(s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* 題からページ名だけを取り出す（パンくず用）。
   「葉巻ブランド大全 — 世界の銘柄…｜Cigar Cafe」→「葉巻ブランド大全」 */
const pageName = (title) => title.split(/[｜|]/)[0].split(/\s+[—-]\s+/)[0].trim();

/* 属性の値だけを差し替える小道具。head の中しか触らない。 */
function setAttr(html, selectorRe, attr, value) {
  return html.replace(selectorRe, (tag) => {
    const re = new RegExp(`(${attr}=")[^"]*(")`);
    if (re.test(tag)) return tag.replace(re, `$1${esc(value)}$2`);
    return tag.replace(/\/?>$/, ` ${attr}="${esc(value)}">`);
  });
}

/* ---------- ページごとの構造化データ ----------
   「何がいくつ載っているか」を検索エンジンにも読める形で添える。
   本文に無いことは書かない（数も名前も、実データから作る）。 */
function loadGlobal(files, name) {
  try {
    const src = files.map(f => fs.readFileSync(path.join(ROOT, f), "utf8")).join("\n;\n");
    return new Function(src + "\n;return " + name + ";")();
  } catch (e) { return null; }
}
const SUMMARY = Object.fromEntries([
  ["ja", loadGlobal(["data/summary.js"], "BRANDS_SUMMARY")],
  ...FOREIGN.map(l => [l.code, loadGlobal([`data/${l.code}/summary.js`], "BRANDS_SUMMARY")])
]);
const NEWS = loadGlobal(["data/news.js"], "NEWS_DATA");

/* 用語の説明は長いので、最初のひと区切りだけ添える */
const firstSentence = (s, max) => {
  const t = String(s || "").split(/(?<=[。.])\s*/)[0].trim();
  return t.length > max ? t.slice(0, max) + "…" : t;
};

function pageLd(view, lang, url, name) {
  const S = SUMMARY[lang];
  if (view === "brands" && S && S.brands) {
    const items = [];
    Object.keys(S.brands).forEach(k => (S.brands[k] || []).forEach(b => {
      const n = (lang !== "ja" ? b.en : b.ja) || b.en;
      if (n) items.push({ "@type": "ListItem", position: items.length + 1, name: n });
    }));
    if (!items.length) return null;
    return {
      "@context": "https://schema.org", "@type": "CollectionPage", url, name,
      inLanguage: HREFLANG[lang] || lang,
      mainEntity: { "@type": "ItemList", numberOfItems: items.length, itemListElement: items }
    };
  }
  if (view === "news" && NEWS && NEWS.items) {
    const items = NEWS.items.map((x, i) => {
      const t = (lang !== "ja" ? x.title_en : x.title_ja) || x.title_ja;
      const o = { "@type": "ListItem", position: i + 1, name: t };
      if (x.url) o.url = x.url;                 // 出どころは元記事
      return o;
    }).filter(x => x.name);
    if (!items.length) return null;
    return {
      "@context": "https://schema.org", "@type": "CollectionPage", url, name,
      inLanguage: HREFLANG[lang] || lang,
      mainEntity: { "@type": "ItemList", numberOfItems: items.length, itemListElement: items }
    };
  }
  if (view === "world" && S && S.lexicon) {
    const terms = S.lexicon.map(t => {
      const n = (lang !== "ja" ? (t.en || t.ja) : t.ja);
      if (!n) return null;
      const o = { "@type": "DefinedTerm", name: n };
      const d = firstSentence(t.desc, 160);
      if (d) o.description = d;
      return o;
    }).filter(Boolean);
    if (!terms.length) return null;
    return {
      "@context": "https://schema.org", "@type": "DefinedTermSet",
      "@id": url + "#lexicon", url,
      name: lang !== "ja" ? "The cigar lexicon" : "葉巻用語大全",
      inLanguage: HREFLANG[lang] || lang, hasDefinedTerm: terms
    };
  }
  return null;
}

function buildPage(srcHtml, lang, view) {
  const m = META[view][lang];
  const p = META[view].path;
  const base = lang === "ja" ? "/" : `/${lang}/`;
  const url = SITE + base + (p ? p + "/" : "");
  const jaUrl = SITE + "/" + (p ? p + "/" : "");
  const langUrl = (code) => SITE + "/" + code + "/" + (p ? p + "/" : "");
  const depth = p ? 1 : 0;                   // /brands/ は1階層深い
  let h = srcHtml;

  // 相対パス（css/… js/… assets/… data/… ../…）に ../ を足す
  if (depth) {
    h = h.replace(/\s(src|href)="([^"]+)"/g, (all, a, v) => {
      if (/^(https?:|mailto:|tel:|data:|#|\/)/i.test(v)) return all;
      return ` ${a}="${("../" + v).replace(/^\.\.\/\.\//, "../")}"`;
    });
  }

  h = h.replace(/<title>[^<]*<\/title>/, `<title>${esc(m.title)}</title>`);
  h = setAttr(h, /<meta name="description"[^>]*>/, "content", m.desc);
  h = setAttr(h, /<link rel="canonical"[^>]*>/, "href", url);
  /* この画面の翻訳ができている言語。1つも無ければ hreflang 自体を出さない */
  const readyF = FOREIGN.filter(f => ready(view, f.code));
  if (readyF.length) {
    h = setAttr(h, /<link rel="alternate" hreflang="ja"[^>]*>/, "href", jaUrl);
    for (const f of readyF) {
      const re = new RegExp(`<link rel="alternate" hreflang="${f.hreflang}"[^>]*>`);
      if (re.test(h)) h = setAttr(h, re, "href", langUrl(f.code));
      else h = h.replace(/([ \t]*)(<link rel="alternate" hreflang="x-default")/,
        `$1<link rel="alternate" hreflang="${f.hreflang}" href="${esc(langUrl(f.code))}">\n$1$2`);
    }
    // 翻訳がまだの言語のタグが雛形に残っていたら消す（enはテンプレートに常在）
    for (const f of FOREIGN.filter(f => !ready(view, f.code))) {
      h = h.replace(new RegExp(`[ \\t]*<link rel="alternate" hreflang="${f.hreflang}"[^>]*>\\n?`), "");
    }
    h = setAttr(h, /<link rel="alternate" hreflang="x-default"[^>]*>/, "href", jaUrl);
  } else {
    /* 翻訳版の中身がまだ日本語のままのページ。
       ・どの版でも hreflang を出さない（対になる翻訳版を検索に案内しないため）
       ・翻訳版には noindex を付け、検索結果に出さない
       言語切替のリンクは残すので、人は今までどおり行き来できる。 */
    h = h.replace(/[ \t]*<link rel="alternate" hreflang="[^"]*"[^>]*>\n?/g, "");
    if (lang !== "ja") {
      h = h.replace(/<link rel="canonical"[^>]*>/,
        (t) => t + `\n  <meta name="robots" content="noindex">`);
    }
  }
  /* SNSカードの画像は、そのページ専用のもの（tools/build_og.py が作る）。
     まだ作っていないページは、サイト共通の1枚のままにしておく。 */
  const ogFile = `assets/og/${view}${lang === "ja" ? "" : "-" + lang}.jpg`;
  if (fs.existsSync(path.join(ROOT, ogFile))) {
    h = setAttr(h, /<meta property="og:image"[^>]*>/, "content", `${SITE}/${ogFile}`);
    h = setAttr(h, /<meta name="twitter:image"[^>]*>/, "content", `${SITE}/${ogFile}`);
  }
  h = setAttr(h, /<meta property="og:url"[^>]*>/, "content", url);
  h = setAttr(h, /<meta property="og:title"[^>]*>/, "content", m.title);
  h = setAttr(h, /<meta property="og:description"[^>]*>/, "content", m.desc);
  h = setAttr(h, /<meta name="twitter:title"[^>]*>/, "content", m.title);
  h = setAttr(h, /<meta name="twitter:description"[^>]*>/, "content", m.desc);

  // 言語切替は、相手言語の同じページへ（翻訳版→日本語版、日本語版→英語版。
  //  3言語以上の切替UIは、言語を有効化するときに作り直す）
  h = setAttr(h, /<a class="lang-switch"[^>]*>/, "href",
    lang !== "ja" ? "/" + (p ? p + "/" : "") : "/en/" + (p ? p + "/" : ""));

  /* 検索結果に「Cigar Cafe › ブランド大全」のような道筋を出してもらうための構造化データ。
     ホーム（index.html）にはサイト自体の情報が直接書いてあるので、
     下層ページではそれをパンくずに差し替える。
     収録の中身が数えられるページには、その一覧も添える（pageLd）。 */
  const ld = [{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Cigar Cafe", item: SITE + base },
      { "@type": "ListItem", position: 2, name: pageName(m.title), item: url }
    ]
  }];
  const extra = pageLd(view, lang, url, pageName(m.title));
  if (extra) ld.push(extra);
  h = h.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json">${JSON.stringify(ld.length === 1 ? ld[0] : ld)}</script>`);

  // 最初に開くページをJSへ伝える（アドレスからも読めるが、念のため明示する）
  if (view !== "home") {
    h = h.replace(/<\/head>/, `  <script>window.SITE_ROUTE = ${JSON.stringify(view)};</script>\n</head>`);
  }
  return BANNER + h;
}

/* ---------- 書き出す前に、既存のディレクトリと重ならないか確かめる ----------
   ページのURLと、ソースの置き場（js/ や tools/ など）が同じ名前になると、
   生成した index.html がそこへ紛れ込んでしまう。先に止める。 */
const RESERVED = ["assets", "css", "js", "data", "i18n", "tools", "supabase", "node_modules",
  "en", ...FOREIGN.map(l => l.code)];
const clash = Object.keys(META).map(v => META[v].path).filter(p => p && RESERVED.includes(p));
if (clash.length) {
  console.error(`data/pages.js の path が既存のディレクトリと重なっています: ${clash.join(", ")}`);
  console.error("別の名前に変えてください（例: tools → accessories）。");
  process.exit(1);
}

/* ---------- ページを書き出す ---------- */
const SRC = { ja: fs.readFileSync(path.join(ROOT, "index.html"), "utf8") };
FOREIGN.forEach(l => { SRC[l.code] = fs.readFileSync(path.join(ROOT, l.code, "index.html"), "utf8"); });
const views = Object.keys(META);
const perLang = {};
let made = 0;
for (const lang of ["ja", ...FOREIGN.map(l => l.code)]) {
  for (const view of views) {
    const p = META[view].path;
    if (!p) continue;                        // ホームは index.html / <言語>/index.html そのもの
    if (!META[view][lang]) {                 // その言語の題・説明文がまだ無いページは作らない
      console.error(`data/pages.js: ${view} に ${lang} の題・説明文がありません`);
      process.exit(1);
    }
    const dir = path.join(ROOT, lang === "ja" ? "." : lang, p);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), buildPage(SRC[lang], lang, view));
    made++; perLang[lang] = (perLang[lang] || 0) + 1;
  }
}

/* ---------- sitemap.xml ---------- */
/* 日本語版と英語版を1つの <url> にまとめず、それぞれを載せたうえで
   xhtml:link で互いを指す（Google が推奨する多言語サイトの書き方）。 */
const today = new Date().toISOString().slice(0, 10);
const PRIORITY = { home: "1.0", brands: "0.9", japan: "0.9", basics: "0.8", countries: "0.8" };
const entries = [];
for (const view of views) {
  const p = META[view].path;
  const jaUrl = SITE + "/" + (p ? p + "/" : "");
  const langUrl = (code) => SITE + "/" + code + "/" + (p ? p + "/" : "");
  /* 翻訳版は、中身がその言語になっているページ（enReady / zhReady …）だけ載せる。
     まだのページは noindex を付けてあり、sitemap に載せると矛盾するため。 */
  const readyF = FOREIGN.filter(f => ready(view, f.code));
  const urls = [jaUrl, ...readyF.map(f => langUrl(f.code))];
  const alt = readyF.length
    ? `
    <xhtml:link rel="alternate" hreflang="ja" href="${jaUrl}"/>` +
      readyF.map(f => `
    <xhtml:link rel="alternate" hreflang="${f.hreflang}" href="${langUrl(f.code)}"/>`).join("") + `
    <xhtml:link rel="alternate" hreflang="x-default" href="${jaUrl}"/>` : "";
  for (const url of urls) {
    entries.push(
`  <url>
    <loc>${url}</loc>${alt}
    <lastmod>${today}</lastmod>
    <changefreq>${view === "news" ? "weekly" : "monthly"}</changefreq>
    <priority>${PRIORITY[view] || "0.7"}</priority>
  </url>`);
  }
}
fs.writeFileSync(path.join(ROOT, "sitemap.xml"),
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join("\n")}
</urlset>
`);

/* ---------- robots.txt ---------- */
fs.writeFileSync(path.join(ROOT, "robots.txt"),
`# Cigar Cafe — tools/build_pages.js が生成しています
User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`);

console.log(`ページを ${made}件 生成しました（` +
  ["ja", ...FOREIGN.map(l => l.code)].map(c => `${c}:${perLang[c] || 0}`).join(" / ") + `）。`);
console.log(`sitemap.xml: ${entries.length}件のURL / robots.txt を更新しました。`);
