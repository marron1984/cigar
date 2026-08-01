#!/usr/bin/env node
/* ============================================================
   ブランド追加スキル — レンダリング確認スクリプト
   ------------------------------------------------------------
   全ページを実ブラウザ（Chromium/Playwright）で開き、
   JSエラーと横スクロールはみ出しが 0 であることを確認する。
   ブランドを増やした後に必ず走らせ、壊れていないことを保証する。

   各ページのデータは「開いたときに読み込む」形（js/dataload.js）なので、
   中身が出そろうまで待ってから測る。ページが空のままなら不合格にする。
   合わせて data/summary.js（要約データ）が最新かも確かめる。

   使い方： NODE_PATH=/opt/node22/lib/node_modules \
              /opt/node22/bin/node render_check.js [index.htmlのパス]
   合格の目印： "TOTAL JS ERRORS: 0 | routes with overflow: 0 | empty routes: 0"
   ============================================================ */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

// Chromium バイナリを自動検出（バージョン番号がセッションで変わるため）
function findChrome() {
  const roots = ["/opt/pw-browsers"];
  for (const root of roots) {
    if (!fs.existsSync(root)) continue;
    for (const d of fs.readdirSync(root)) {
      if (!/^chromium/.test(d)) continue;
      const p = path.join(root, d, "chrome-linux", "chrome");
      if (fs.existsSync(p)) return p;
    }
  }
  return null;
}

/* ページごとに「ここが出ていれば描画できた」と言える目印 */
const PROBE = {
  home: "#homeShowcase .sc-card",
  basics: "#basicsContent .kb-block",
  countries: "#countryNav [data-country]",
  sizes: "#realSizeBox .rs-pick",
  prices: "#pricesContent .kb-block",
  tools: "#toolsContent .tool-acc",
  humidor: "#hsub-history .kb-block",
  advanced: "#sub-leaf .kb-block",
  phd: "#psub-litreview .lit-acc",
  japan: "#japanGuide .pref-acc",
  world: "#wsub-history .kb-block",
  brands: "#brandsCuba .brand-entry",
  news: "#newsRoot .news-card",
  note: "#btnNewEntry",
  admin: "#view-admin"
};

/* 要約データ（data/summary.js）が data/*.js と食い違っていないか。
   ブランドを足したのに要約を作り直し忘れると、ホーム・横断検索・記録ノートの
   選択肢が古いままになるので、ここで気づけるようにしておく。 */
function checkSummary(root) {
  const gen = path.join(root, "tools/build_summary.js");
  const out = path.join(root, "data/summary.js");
  if (!fs.existsSync(gen) || !fs.existsSync(out)) return true;
  const before = fs.readFileSync(out, "utf8");
  try {
    execFileSync("/opt/node22/bin/node", [gen], {
      cwd: root, stdio: "ignore",
      env: Object.assign({}, process.env, { NODE_PATH: "/opt/node22/lib/node_modules" })
    });
  } catch (e) { return true; }   // 生成できないときはここでは判定しない
  const after = fs.readFileSync(out, "utf8");
  // 生成日だけの差は無視する
  const strip = (s) => s.replace(/"generated":"[^"]*"/, "");
  if (strip(before) !== strip(after)) {
    console.log("data/summary.js が古かったので作り直しました（このままコミットしてください）。");
    return false;
  }
  return true;
}

(async () => {
  const { chromium } = require("/opt/node22/lib/node_modules/playwright");
  const exe = findChrome();
  const indexPath = process.argv[2] || "index.html";
  const abs = path.resolve(indexPath);
  const url = "file://" + abs;
  const stale = !checkSummary(path.dirname(abs).replace(/\/en$/, ""));

  const browser = await chromium.launch(exe ? { executablePath: exe } : {});
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  let totalErr = 0, totalOverflow = 0, empty = 0;
  for (const r of Object.keys(PROBE)) {
    const errors = [];
    page.removeAllListeners("pageerror"); page.removeAllListeners("console");
    page.on("pageerror", e => errors.push("pageerror: " + e.message));
    page.on("console", m => { if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errors.push("console: " + m.text()); });
    await page.goto(url + "#" + r);
    let found = true;
    try { await page.waitForSelector(PROBE[r], { timeout: 15000, state: "attached" }); }
    catch (e) { found = false; empty++; }
    await page.waitForTimeout(250);
    const ov = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (errors.length || ov > 0 || !found)
      console.log(`${r}: errors=${errors.length} overflow=${ov} rendered=${found}`, errors.slice(0, 3));
    totalErr += errors.length; totalOverflow += (ov > 0 ? 1 : 0);
  }
  console.log(`TOTAL JS ERRORS: ${totalErr} | routes with overflow: ${totalOverflow} | empty routes: ${empty}`);
  await browser.close();
  process.exit(totalErr === 0 && totalOverflow === 0 && empty === 0 && !stale ? 0 : 1);
})();
