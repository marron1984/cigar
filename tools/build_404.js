#!/usr/bin/env node
/* ============================================================
   404.html を作る（見つからなかったときの案内）
   ------------------------------------------------------------
   静的サイトなので、無いアドレスを開くと配信側の素っ気ない画面が出る。
   そこを、サイトの意匠のまま「探し直せる場所」に変える。

   ・本体（1枚もののアプリ）は読み込まない。案内だけの軽いページにする。
   ・日本語版と英語版の両方を書いておき、開かれたアドレスが /en/ で
     始まるかどうかで出し分ける（JSが動かない場合は日本語のまま）。
   ・ページの一覧は data/pages.js から作るので、道筋を変えても追随する。
   ・探しものは、打ち始めてから要約データを読む（開いただけでは読まない）。

   出力: 404.html（リポジトリ直下）

   使い方（build_pages.js の後に）：
     NODE_PATH=/opt/node22/lib/node_modules /opt/node22/bin/node tools/build_404.js
   ============================================================ */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const META = new Function(fs.readFileSync(path.join(ROOT, "data/pages.js"), "utf8") + "\n;return PAGE_META;")();

const esc = (s) => String(s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* 題からページ名だけを取り出す（build_pages.js と同じ流儀）
   「葉巻ブランド大全 — 世界の銘柄…｜Cigar Cafe」→「葉巻ブランド大全」 */
const pageName = (title) => title.split(/[｜|]/)[0].split(/\s+[—-]\s+/)[0].trim();

/* ホーム以外を、data/pages.js に並んでいる順で案内に出す */
const views = Object.keys(META).filter(v => v !== "home" && META[v].path != null);

function links(lang) {
  return views.map(v => {
    const m = META[v];
    const href = (lang === "en" ? "/en/" : "/") + (m.path ? m.path + "/" : "");
    return `<a href="${esc(href)}">${esc(pageName(m[lang].title))}</a>`;
  }).join("\n        ");
}

/* 探しもので拾える「ページそのもの」の一覧。銘柄・用語は要約データから足す。 */
const pageIndex = JSON.stringify(views.map(v => ({
  ja: pageName(META[v].ja.title), en: pageName(META[v].en.title), p: META[v].path
})));

const html = `<!DOCTYPE html>
<!-- このファイルは tools/build_404.js が作っています。手で編集しないでください。 -->
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#f7f1e7">
<meta name="robots" content="noindex">
<title>ページが見つかりません｜Cigar Cafe</title>
<link rel="stylesheet" href="/css/style.css">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32.png">
<link rel="icon" type="image/png" href="/assets/logo.png">
<link rel="apple-touch-icon" href="/assets/logo.png">
<style>
  .nf-wrap { max-width: 720px; margin: 0 auto; padding: 56px 20px 80px; }
  .nf-brand { display: flex; align-items: center; gap: 12px; text-decoration: none; color: inherit; }
  .nf-brand img { width: 42px; height: 42px; border-radius: 10px; }
  .nf-brand b { font-family: var(--serif); font-size: 1.25rem; font-weight: 600; letter-spacing: .02em; }
  .nf-brand span { display: block; font-size: .72rem; color: var(--muted); letter-spacing: .16em; }
  .nf-code { font-family: var(--serif); font-size: .8rem; letter-spacing: .3em; color: var(--gold); margin: 54px 0 10px; }
  .nf-wrap h1 { font-family: var(--serif); font-size: clamp(1.5rem, 4.6vw, 2.1rem); font-weight: 400; line-height: 1.5; margin: 0; }
  .nf-lead { font-family: var(--serif); color: var(--text-soft); margin: 18px 0 0; line-height: 1.9; }
  .nf-find { margin-top: 34px; }
  .nf-find input {
    width: 100%; box-sizing: border-box; padding: 15px 16px;
    font: inherit; color: inherit;
    background: var(--panel); border: 1px solid var(--line-soft); border-radius: var(--radius);
  }
  .nf-hits { list-style: none; margin: 12px 0 0; padding: 0; }
  .nf-hits li { border-bottom: 1px solid var(--line-soft); }
  .nf-hits a { display: block; padding: 13px 4px; text-decoration: none; color: inherit; }
  .nf-hits a:hover { background: var(--panel-2); }
  .nf-hits .w { display: block; font-size: .74rem; color: var(--muted); margin-top: 3px; }
  .nf-links { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 38px; }
  .nf-links a {
    text-decoration: none; color: var(--text-soft);
    font-size: .84rem; padding: 9px 15px;
    border: 1px solid var(--line-soft); border-radius: 999px;
    background: var(--panel);
  }
  .nf-links a:hover { color: var(--cream); border-color: var(--gold); }
  .nf-home { display: inline-block; margin-top: 34px; padding: 14px 30px; border-radius: 999px;
    background: var(--gold); color: var(--on-accent); text-decoration: none; font-weight: 700; font-size: .9rem; }
  [data-lang="en"] .ja, [data-lang="ja"] .en { display: none; }
</style>
</head>
<body data-lang="ja">
  <div class="nf-wrap">
    <a class="nf-brand" href="/" id="nfHome">
      <img src="/assets/logo.png" alt="">
      <span><b>Cigar Cafe</b><span class="ja">葉巻をたのしむ</span><span class="en">ENJOY THE CIGAR</span></span>
    </a>

    <p class="nf-code">404</p>
    <h1 class="ja">お探しのページは見つかりませんでした</h1>
    <h1 class="en">We couldn’t find that page</h1>
    <p class="nf-lead ja">アドレスが変わったか、入力に誤りがあるのかもしれません。銘柄名や用語で探すか、下の入口からどうぞ。</p>
    <p class="nf-lead en">The address may have changed, or there may be a typo. Search for a cigar or a term below, or pick a section.</p>

    <div class="nf-find">
      <input type="search" id="nfQ" autocomplete="off"
        data-ph-ja="銘柄・産地・用語で探す…" data-ph-en="Search for a cigar, origin or term…"
        placeholder="銘柄・産地・用語で探す…">
      <ul class="nf-hits" id="nfHits"></ul>
    </div>

    <nav class="nf-links ja">
        ${links("ja")}
    </nav>
    <nav class="nf-links en">
        ${links("en")}
    </nav>

    <a class="nf-home" href="/"><span class="ja">ホームへ戻る</span><span class="en">Back to home</span></a>
  </div>

<script>
(function () {
  var EN = location.pathname.indexOf("/en/") === 0 || location.pathname === "/en";
  var base = EN ? "/en/" : "/";
  if (EN) {
    document.documentElement.lang = "en";
    document.body.setAttribute("data-lang", "en");
    document.title = "Page not found | Cigar Cafe";
    document.getElementById("nfHome").setAttribute("href", base);
    document.querySelector(".nf-home").setAttribute("href", base);
  }
  var q = document.getElementById("nfQ");
  var hits = document.getElementById("nfHits");
  q.placeholder = q.getAttribute(EN ? "data-ph-en" : "data-ph-ja");

  var PAGES = ${pageIndex};
  var index = null, loading = false;

  /* 要約データ（銘柄名と用語）は、打ち始めてから読む */
  function load(then) {
    if (index) return then();
    if (loading) return;
    loading = true;
    var s = document.createElement("script");
    s.src = EN ? "/data/en/summary.js" : "/data/summary.js";
    s.onload = function () { build(); then(); };
    s.onerror = function () { build(); then(); };
    document.head.appendChild(s);
  }

  function build() {
    index = PAGES.map(function (p) {
      return { t: EN ? p.en : p.ja, sub: EN ? p.ja : p.en, w: EN ? "Section" : "ページ", href: base + (p.p ? p.p + "/" : "") };
    });
    var S = window.BRANDS_SUMMARY;
    if (!S) return;
    Object.keys(S.brands || {}).forEach(function (k) {
      (S.brands[k] || []).forEach(function (b) {
        index.push({ t: EN ? b.en : b.ja, sub: EN ? b.ja : b.en, w: EN ? "Brand" : "銘柄", href: base + "brands/" });
      });
    });
    (S.lexicon || []).forEach(function (t) {
      index.push({ t: EN ? (t.en || t.ja) : t.ja, sub: t.es || (EN ? t.ja : t.en), w: EN ? "Term" : "用語", href: base + "world/" });
    });
  }

  function show() {
    var v = q.value.trim().toLowerCase();
    if (!v) { hits.innerHTML = ""; return; }
    var out = (index || []).filter(function (x) {
      return (x.t + " " + (x.sub || "")).toLowerCase().indexOf(v) >= 0;
    }).slice(0, 8);
    hits.innerHTML = out.map(function (x) {
      return '<li><a href="' + x.href + '">' + x.t.replace(/[&<>]/g, "") +
        '<span class="w">' + x.w + (x.sub ? " · " + String(x.sub).replace(/[&<>]/g, "") : "") + "</span></a></li>";
    }).join("");
  }

  q.addEventListener("input", function () { load(show); if (index) show(); });
})();
</script>
</body>
</html>
`;

fs.writeFileSync(path.join(ROOT, "404.html"), html);
console.log(`404.html を生成しました。 案内するページ ${views.length}件（日英）`);
