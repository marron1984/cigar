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

  const result = await page.evaluate(([dict, SITE]) => {
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

    // 表示言語をJSに伝える（最初のスクリプトより前に置く）
    const s = document.createElement("script");
    s.textContent = 'window.SITE_LANG = "en";';
    const first = document.querySelector("script");
    if (first && first.parentNode) first.parentNode.insertBefore(s, first);
    else document.head.appendChild(s);

    return { html: document.documentElement.outerHTML, missing };
  }, [dict, SITE]);

  await browser.close();

  fs.mkdirSync(path.join(ROOT, "en"), { recursive: true });
  fs.writeFileSync(path.join(ROOT, "en/index.html"),
    "<!DOCTYPE html>\n" + result.html + "\n");

  console.log("en/index.html を生成しました。");
  if (result.missing.length) {
    console.log(`\n未翻訳 ${result.missing.length}件（i18n/html.en.json に追加してください）:`);
    result.missing.forEach(m => console.log("  " + JSON.stringify(m)));
    process.exit(1);
  }
  console.log("未翻訳: 0件");
})();
