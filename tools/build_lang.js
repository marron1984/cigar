#!/usr/bin/env node
/* ============================================================
   各言語版シェルの生成（旧 build_en.js の一般化）
   ------------------------------------------------------------
   index.html（日本語）と i18n/html.<言語>.json（対訳）から
   <言語>/index.html を作る。翻訳版のHTMLを手で二重管理しないための道具。
   対象言語は tools/languages.js で管理する。

   ・日本語のまま残った文字列は最後に「未翻訳」として報告する
     （index.html を直したのに対訳を足し忘れた、を検出するため）
   ・<option> は表示だけ訳し、value には日本語の元の値を残す
     （記録データの中身が言語で変わらないようにするため）

   使い方：
     node tools/build_lang.js            … enabled な全言語（普段はこれ）
     node tools/build_lang.js zh         … 指定した言語だけ（未対応言語の試し組みも可）
     node tools/build_lang.js zh --allow-missing
                                         … 未翻訳があっても止めない（骨組みの確認用）
   ============================================================ */
const fs = require("fs");
const path = require("path");
const LANGUAGES = require("./languages");

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

const args = process.argv.slice(2);
const allowMissing = args.includes("--allow-missing");
const wanted = args.filter(a => !a.startsWith("--"));
const targets = wanted.length
  ? wanted.map(c => {
      const l = LANGUAGES.find(x => x.code === c);
      if (!l) { console.error(`tools/languages.js に無い言語です: ${c}`); process.exit(1); }
      return l;
    })
  : LANGUAGES.filter(l => l.enabled);

async function buildOne(browser, L) {
  const dictPath = path.join(ROOT, L.htmlDict);
  const dict = fs.existsSync(dictPath) ? JSON.parse(fs.readFileSync(dictPath, "utf8")) : {};
  delete dict._readme;

  // スクリプトを止めた状態で読み込む（描画前の素のHTMLを対象にするため）
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto("file://" + path.join(ROOT, "index.html"));

  /* data/<言語>/ に置いた差し替えデータは、その言語版だけで読み込む。
     読み込む段取りは js/dataload.js が持っている。PACKS には data/en/ の
     道筋を正準として書き、他言語では同名ファイルを data/<言語>/ から読む
     決まりなので、ここでは「正準の側に書き忘れがないか」だけ確かめる。
     summary.js だけは例外で、ページ単位ではなくシェルが直接読む（要約は
     ホーム・横断検索・用語クイズがどのページからでも引くため）。 */
  const ovrDir = path.join(ROOT, "data", L.code);
  const SHELL_LOADED = ["summary.js"];
  const overlays = fs.existsSync(ovrDir)
    ? fs.readdirSync(ovrDir).filter(f => f.endsWith(".js") && !SHELL_LOADED.includes(f)).sort() : [];
  const loaderSrc = fs.readFileSync(path.join(ROOT, "js/dataload.js"), "utf8");
  const unwired = overlays.filter(f => !loaderSrc.includes("data/en/" + f));
  if (unwired.length) {
    console.error("js/dataload.js の PACKS（data/en/ の正準一覧）に無い差し替えデータがあります: " + unwired.join(", "));
    process.exit(1);
  }
  /* 要約はその言語のものがあるときだけ差し替える。無ければ日本語のまま
     （翻訳が揃う前の試し組みで、要約の読み込みを404にしないため） */
  const hasSummary = fs.existsSync(path.join(ovrDir, "summary.js"));

  /* ホームの題と説明文は data/pages.js を唯一の出どころにする
     （画面を切り替えたときにJSが入れるものと食い違わないようにするため）。 */
  const HOME_META = new Function(
    fs.readFileSync(path.join(ROOT, "data/pages.js"), "utf8") + "\n;return PAGE_META.home;")();
  const HOME = HOME_META[L.code] || HOME_META.en;

  /* ホームの hreflang に載せる言語：日本語＋「シェルが生成される言語」。
     enabled 前の試し組みは自分を載せない（検索に未完成版を案内しないため）。 */
  const altLangs = LANGUAGES.filter(x => x.enabled || x.code === L.code && L.enabled);

  const ogImage = fs.existsSync(path.join(ROOT, `assets/og/home-${L.code}.jpg`))
    ? SITE + `assets/og/home-${L.code}.jpg` : null;

  const result = await page.evaluate(([dict, SITE, HOME, L, altLangs, hasSummary, ogImage]) => {
    const JP = /[぀-ヿ㐀-鿿]/;
    const ATTRS = ["placeholder", "title", "alt", "aria-label", "content", "label"];
    const missing = [];
    const tr = (s) => {
      const raw = String(s);
      const key = raw.trim();
      if (!key || !JP.test(key)) return null;
      const t = dict[key];
      if (t == null) { if (!missing.includes(key)) missing.push(key); return null; }
      return raw.replace(key, t);       // 前後の空白・改行はそのまま保つ
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

    document.documentElement.setAttribute("lang", L.hreflang);

    // 言語切替（翻訳版では日本語版へ戻る。3言語以上の切替UIは有効化のときに）
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
      let el = document.querySelector(sel);
      if (!el && hreflang) {
        // index.html に無い言語のタグは、既存の alternate の並びの末尾に足す
        const all = document.querySelectorAll('link[rel="alternate"][hreflang]');
        const last = all[all.length - 1];
        el = document.createElement("link");
        el.setAttribute("rel", "alternate"); el.setAttribute("hreflang", hreflang);
        if (last && last.parentNode) last.parentNode.insertBefore(el, last.nextSibling);
        else document.head.appendChild(el);
      }
      if (el) el.setAttribute("href", href);
    };
    setLink("canonical", null, SITE + L.code + "/");
    setLink(null, "ja", SITE);
    altLangs.forEach(x => setLink(null, x.hreflang, SITE + x.code + "/"));
    setLink(null, "x-default", SITE);

    // 題と説明文は data/pages.js のものを使う
    const setMeta = (sel, attr, v) => { const el = document.querySelector(sel); if (el) el.setAttribute(attr, v); };
    document.title = HOME.title;
    setMeta('meta[name="description"]', "content", HOME.desc);
    setMeta('meta[property="og:title"]', "content", HOME.title);
    setMeta('meta[property="og:description"]', "content", HOME.desc);
    setMeta('meta[name="twitter:title"]', "content", HOME.title);
    setMeta('meta[name="twitter:description"]', "content", HOME.desc);

    // SNSカードもその言語のもの（専用画像があれば差し替え・ロケール）に
    setMeta('meta[property="og:locale"]', "content", L.ogLocale);
    setMeta('meta[property="og:url"]', "content", SITE + L.code + "/");
    if (ogImage) {
      setMeta('meta[property="og:image"]', "content", ogImage);
      setMeta('meta[name="twitter:image"]', "content", ogImage);
    }

    // 構造化データ（サイト情報）もその言語のものに
    const ld = document.querySelector('script[type="application/ld+json"]');
    if (ld) {
      ld.textContent = JSON.stringify([
        {
          "@context": "https://schema.org", "@type": "WebSite", name: "Cigar Cafe",
          url: SITE + L.code + "/", inLanguage: L.hreflang,
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
    s.textContent = 'window.SITE_LANG = ' + JSON.stringify(L.code) + ';';
    const first = document.querySelector("script");
    if (first && first.parentNode) first.parentNode.insertBefore(s, first);
    else document.head.appendChild(s);

    // UI文言の辞書が別ファイルの言語は、i18n.js より先に読み込ませる
    if (L.extraScript) {
      const i18nTag = document.querySelector('script[src$="js/i18n.js"]');
      if (i18nTag) {
        const ex = document.createElement("script");
        ex.setAttribute("src", "../" + L.extraScript);
        i18nTag.parentNode.insertBefore(ex, i18nTag);
      }
    }

    /* 要約データはその言語のものに差し替える（同じ形で丸ごと用意してあるので、
       日本語版と両方読ませない）。ホームの今日の一本・横断検索・用語クイズが使う。 */
    if (hasSummary) {
      const sum = document.querySelector('script[src$="data/summary.js"]');
      if (sum) sum.setAttribute("src", sum.getAttribute("src").replace("data/summary.js", "data/" + L.code + "/summary.js"));
    }

    return { html: document.documentElement.outerHTML, missing };
  }, [dict, SITE, HOME, { code: L.code, hreflang: L.hreflang, ogLocale: L.ogLocale, extraScript: L.extraScript, enabled: L.enabled },
      altLangs.map(x => ({ code: x.code, hreflang: x.hreflang })), hasSummary, ogImage]);

  await ctx.close();

  fs.mkdirSync(path.join(ROOT, L.code), { recursive: true });
  fs.writeFileSync(path.join(ROOT, L.code, "index.html"),
    "<!DOCTYPE html>\n" + result.html + "\n");

  console.log(`${L.code}/index.html を生成しました。` + (overlays.length ? " 差し替えデータ: " + overlays.join(", ") : ""));
  if (result.missing.length) {
    console.log(`\n未翻訳 ${result.missing.length}件（${L.htmlDict} に追加してください）:`);
    result.missing.forEach(m => console.log("  " + JSON.stringify(m)));
    if (!allowMissing) process.exit(1);
  } else {
    console.log("未翻訳: 0件");
  }
}

(async () => {
  const { chromium } = require("/opt/node22/lib/node_modules/playwright");
  const browser = await chromium.launch(findChrome() ? { executablePath: findChrome() } : {});
  for (const L of targets) await buildOne(browser, L);
  await browser.close();
})();
