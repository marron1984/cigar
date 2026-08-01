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

function buildPage(srcHtml, lang, view) {
  const m = META[view][lang];
  const p = META[view].path;
  const base = lang === "en" ? "/en/" : "/";
  const url = SITE + base + (p ? p + "/" : "");
  const jaUrl = SITE + "/" + (p ? p + "/" : "");
  const enUrl = SITE + "/en/" + (p ? p + "/" : "");
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
  h = setAttr(h, /<link rel="alternate" hreflang="ja"[^>]*>/, "href", jaUrl);
  h = setAttr(h, /<link rel="alternate" hreflang="en"[^>]*>/, "href", enUrl);
  h = setAttr(h, /<link rel="alternate" hreflang="x-default"[^>]*>/, "href", jaUrl);
  h = setAttr(h, /<meta property="og:url"[^>]*>/, "content", url);
  h = setAttr(h, /<meta property="og:title"[^>]*>/, "content", m.title);
  h = setAttr(h, /<meta property="og:description"[^>]*>/, "content", m.desc);
  h = setAttr(h, /<meta name="twitter:title"[^>]*>/, "content", m.title);
  h = setAttr(h, /<meta name="twitter:description"[^>]*>/, "content", m.desc);

  // 言語切替は、相手言語の同じページへ
  h = setAttr(h, /<a class="lang-switch"[^>]*>/, "href",
    lang === "en" ? "/" + (p ? p + "/" : "") : "/en/" + (p ? p + "/" : ""));

  /* 検索結果に「Cigar Cafe › ブランド大全」のような道筋を出してもらうための構造化データ。
     ホーム（index.html）にはサイト自体の情報が直接書いてあるので、
     下層ページではそれをパンくずに差し替える。 */
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Cigar Cafe", item: SITE + base },
      { "@type": "ListItem", position: 2, name: pageName(m.title), item: url }
    ]
  };
  h = h.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json">${JSON.stringify(ld)}</script>`);

  // 最初に開くページをJSへ伝える（アドレスからも読めるが、念のため明示する）
  if (view !== "home") {
    h = h.replace(/<\/head>/, `  <script>window.SITE_ROUTE = ${JSON.stringify(view)};</script>\n</head>`);
  }
  return BANNER + h;
}

/* ---------- 書き出す前に、既存のディレクトリと重ならないか確かめる ----------
   ページのURLと、ソースの置き場（js/ や tools/ など）が同じ名前になると、
   生成した index.html がそこへ紛れ込んでしまう。先に止める。 */
const RESERVED = ["assets", "css", "js", "data", "i18n", "tools", "supabase", "en", "node_modules"];
const clash = Object.keys(META).map(v => META[v].path).filter(p => p && RESERVED.includes(p));
if (clash.length) {
  console.error(`data/pages.js の path が既存のディレクトリと重なっています: ${clash.join(", ")}`);
  console.error("別の名前に変えてください（例: tools → accessories）。");
  process.exit(1);
}

/* ---------- ページを書き出す ---------- */
const jaSrc = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const enSrc = fs.readFileSync(path.join(ROOT, "en/index.html"), "utf8");
const views = Object.keys(META);
let made = 0;
for (const lang of ["ja", "en"]) {
  const src = lang === "ja" ? jaSrc : enSrc;
  for (const view of views) {
    const p = META[view].path;
    if (!p) continue;                        // ホームは index.html / en/index.html そのもの
    const dir = path.join(ROOT, lang === "en" ? "en" : ".", p);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), buildPage(src, lang, view));
    made++;
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
  const enUrl = SITE + "/en/" + (p ? p + "/" : "");
  for (const url of [jaUrl, enUrl]) {
    entries.push(
`  <url>
    <loc>${url}</loc>
    <xhtml:link rel="alternate" hreflang="ja" href="${jaUrl}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${jaUrl}"/>
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

console.log(`ページを ${made}件 生成しました（日本語${views.length - 1} / 英語${views.length - 1}）。`);
console.log(`sitemap.xml: ${entries.length}件のURL / robots.txt を更新しました。`);
