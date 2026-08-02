#!/usr/bin/env node
/* ============================================================
   英語版シェルの生成
   ------------------------------------------------------------
   index.html（日本語）と i18n/html.en.json（対訳）から
   en/index.html を作る。英語版のHTMLを手で二重管理しないための道具。

   ・日本語のまま残った文字列は最後に「未翻訳」として報告する
     （index.html を直したのに対訳を足し忘れた、を検出するため）
   ・<option> は表示だけ英語にし、value には日本語の元の値を残す
     （記録データの中身が言語で変わらないようにするため）

   使い方： NODE_PATH=/opt/node22/lib/node_modules \
              /opt/node22/bin/node tools/build_en.js
   ============================================================ */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SITE = "https://cigar.cafe/";

function findChrome() {
  const root = "/opt/pw-browsers";
  if (!fs.existsSync(root)) return null;
  for (const d of fs.readdirSync(root)) {
    if (!/^chromium/.test(d)) continue;
    const p = path.join(root, d, "chrome-linux", "chrome");
    if (fs.existsSync(p)) return p;
  }
  return null;
}

(async () => {
  const { chromium } = require("/opt/node22/lib/node_modules/playwright");
  const dict = JSON.parse(fs.readFileSync(path.join(ROOT, "i18n/html.en.json"), "utf8"));
  delete dict._readme;

  const browser = await chromium.launch(findChrome() ? { executablePath: findChrome() } : {});
  // スクリプトを止めた状態で読み込む（描画前の素のHTMLを対象にするため）
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto("file://" + path.join(ROOT, "index.html"));

  /* data/en/ に置いた差し替えデータは、英語版だけで読み込む。
     読み込む段取りは js/dataload.js が持っているので（ページを開いたときに
     本体データと一緒に読む）、ここでは「書き忘れ」がないかだけ確かめる。
     summary.js だけは例外で、ページ単位ではなくシェルが直接読む（要約は
     ホーム・横断検索・用語クイズがどのページからでも引くため）。このファイルが
     data/summary.js の読み込みを英語版のものに差し替える。 */
  const enDir = path.join(ROOT, "data/en");
  const SHELL_LOADED = ["summary.js"];
  const overlays = fs.existsSync(enDir)
    ? fs.readdirSync(enDir).filter(f => f.endsWith(".js") && !SHELL_LOADED.includes(f)).sort() : [];
  const loaderSrc = fs.readFileSync(path.join(ROOT, "js/dataload.js"), "utf8");
  const unwired = overlays.filter(f => !loaderSrc.includes("data/en/" + f));
  if (unwired.length) {
    console.error("js/dataload.js の PACKS に書かれていない差し替えデータがあります: " + unwired.join(", "));
    process.exit(1);
  }

  /* ホームの題と説明文は data/pages.js を唯一の出どころにする
     （画面を切り替えたときにJSが入れるものと食い違わないようにするため）。 */
  const HOME_EN = new Function(
    fs.readFileSync(path.join(ROOT, "data/pages.js"), "utf8") + "\n;return PAGE_META.home.en;")();

  const result = await page.evaluate(([dict, SITE, HOME_EN]) => {
    const JP = /[぀-ヿ㐀-鿿]/;
    const ATTRS = ["placeholder", "title", "alt", "aria-label", "content", "label"];
    const missing = [];
    const tr = (s) => {
      const raw = String(s);
      const key = raw.trim();
      if (!key || !JP.test(key)) return null;
      const en = dict[key];
      if (en == null) { if (!missing.includes(key)) missing.push(key); return null; }
      return raw.replace(key, en);      // 前後の空白・改行はそのまま保つ
    };

    const walk = (n) => {
      if (n.nodeType === 3) { const v = tr(n.nodeValue); if (v != null) n.nodeValue = v; return; }
      if (n.nodeType !== 1) return;
      if (/^(script|style)$/i.test(n.tagName)) return;
      // <option> は表示だけ訳し、値は日本語のまま（保存データを言語に依存させない）
      if (n.tagName === "OPTION" && !n.hasAttribute("value") && JP.test(n.textContent)) {
        n.setAttribute("value", n.textContent.trim());
      }
      ATTRS.forEach(a => {
        if (!n.hasAttribute(a)) return;
        const v = tr(n.getAttribute(a));
        if (v != null) n.setAttribute(a, v);
      });
      [...n.childNodes].forEach(walk);
    };
    walk(document.documentElement);

    // 相対パスは1階層深くなるぶんだけ ../ を足す
    const rel = (u) => (u && !/^(https?:|mailto:|tel:|data:|#|\/)/i.test(u)) ? "../" + u : null;
    document.querySelectorAll("[src],[href]").forEach(el => {
      ["src", "href"].forEach(a => {
        if (!el.hasAttribute(a)) return;
        if (el.id === "langSwitch") return;                 // 言語切替は下で作り直す
        const v = rel(el.getAttribute(a));
        if (v != null) el.setAttribute(a, v);
      });
    });

    document.documentElement.setAttribute("lang", "en");

    // 言語切替（英語版では日本語版へ戻る）
    const sw = document.getElementById("langSwitch");
    if (sw) {
      sw.setAttribute("href", "../");
      sw.setAttribute("hreflang", "ja");
      sw.setAttribute("lang", "ja");
      sw.setAttribute("title", "日本語版");
      sw.textContent = "日本語";
    }

    // 正規URLと言語の対応
    const setLink = (relAttr, hreflang, href) => {
      const sel = hreflang ? `link[rel="alternate"][hreflang="${hreflang}"]` : `link[rel="${relAttr}"]`;
      const el = document.querySelector(sel);
      if (el) el.setAttribute("href", href);
    };
    setLink("canonical", null, SITE + "en/");
    setLink(null, "ja", SITE);
    setLink(null, "en", SITE + "en/");
    setLink(null, "x-default", SITE);

    // 題と説明文は data/pages.js のものを使う
    const setMeta = (sel, attr, v) => { const el = document.querySelector(sel); if (el) el.setAttribute(attr, v); };
    document.title = HOME_EN.title;
    setMeta('meta[name="description"]', "content", HOME_EN.desc);
    setMeta('meta[property="og:title"]', "content", HOME_EN.title);
    setMeta('meta[property="og:description"]', "content", HOME_EN.desc);
    setMeta('meta[name="twitter:title"]', "content", HOME_EN.title);
    setMeta('meta[name="twitter:description"]', "content", HOME_EN.desc);

    // SNSカードも英語版のもの（英語の共有画像・英語ロケール）に差し替える
    setMeta('meta[property="og:locale"]', "content", "en_US");
    setMeta('meta[property="og:url"]', "content", SITE + "en/");
    setMeta('meta[property="og:image"]', "content", SITE + "assets/og/home-en.jpg");
    setMeta('meta[name="twitter:image"]', "content", SITE + "assets/og/home-en.jpg");

    // 構造化データ（サイト情報）も英語版のものに
    const ld = document.querySelector('script[type="application/ld+json"]');
    if (ld) {
      ld.textContent = JSON.stringify([
        {
          "@context": "https://schema.org", "@type": "WebSite", name: "Cigar Cafe",
          url: SITE + "en/", inLanguage: "en",
          description: (document.querySelector('meta[name="description"]') || {}).content || "",
          publisher: { "@id": SITE + "#site" }
        },
        {
          "@context": "https://schema.org", "@type": "Organization", "@id": SITE + "#site",
          name: "Cigar Cafe", url: SITE,
          logo: { "@type": "ImageObject", url: SITE + "assets/logo.png" }
        }
      ]);
    }

    // 表示言語をJSに伝える（最初のスクリプトより前に置く）
    const s = document.createElement("script");
    s.textContent = 'window.SITE_LANG = "en";';
    const first = document.querySelector("script");
    if (first && first.parentNode) first.parentNode.insertBefore(s, first);
    else document.head.appendChild(s);

    /* 要約データは英語版のものに差し替える（同じ形で丸ごと用意してあるので、
       日本語版と両方読ませない）。ホームの今日の一本・横断検索・用語クイズが使う。 */
    const sum = document.querySelector('script[src$="data/summary.js"]');
    if (sum) sum.setAttribute("src", sum.getAttribute("src").replace("data/summary.js", "data/en/summary.js"));

    return { html: document.documentElement.outerHTML, missing };
  }, [dict, SITE, HOME_EN]);

  await browser.close();

  fs.mkdirSync(path.join(ROOT, "en"), { recursive: true });
  fs.writeFileSync(path.join(ROOT, "en/index.html"),
    "<!DOCTYPE html>\n" + result.html + "\n");

  console.log("en/index.html を生成しました。" + (overlays.length ? " 差し替えデータ: " + overlays.join(", ") : ""));
  if (result.missing.length) {
    console.log(`\n未翻訳 ${result.missing.length}件（i18n/html.en.json に追加してください）:`);
    result.missing.forEach(m => console.log("  " + JSON.stringify(m)));
    process.exit(1);
  }
  console.log("未翻訳: 0件");
})();
