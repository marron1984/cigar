#!/usr/bin/env node
/* ============================================================
   ブランド追加スキル — レンダリング確認スクリプト
   ------------------------------------------------------------
   全ページを実ブラウザ（Chromium/Playwright）で開き、
   JSエラーと横スクロールはみ出しが 0 であることを確認する。
   ブランドを増やした後に必ず走らせ、壊れていないことを保証する。

   使い方： NODE_PATH=/opt/node22/lib/node_modules \
              /opt/node22/bin/node render_check.js [index.htmlのパス]
   合格の目印： "TOTAL JS ERRORS: 0 | routes with overflow: 0"
   ============================================================ */
const fs = require("fs");
const path = require("path");

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

(async () => {
  const { chromium } = require("/opt/node22/lib/node_modules/playwright");
  const exe = findChrome();
  const indexPath = process.argv[2] || "index.html";
  const abs = path.resolve(indexPath);
  const url = "file://" + abs;

  const browser = await chromium.launch(exe ? { executablePath: exe } : {});
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const routes = ["home","basics","countries","sizes","prices","tools","humidor","advanced","phd","world","brands","note"];
  let totalErr = 0, totalOverflow = 0;
  for (const r of routes) {
    const errors = [];
    page.removeAllListeners("pageerror"); page.removeAllListeners("console");
    page.on("pageerror", e => errors.push("pageerror: " + e.message));
    page.on("console", m => { if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errors.push("console: " + m.text()); });
    await page.goto(url + "#" + r);
    await page.waitForTimeout(400);
    const ov = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (errors.length || ov > 0) console.log(`${r}: errors=${errors.length} overflow=${ov}`, errors.slice(0, 3));
    totalErr += errors.length; totalOverflow += (ov > 0 ? 1 : 0);
  }
  console.log(`TOTAL JS ERRORS: ${totalErr} | routes with overflow: ${totalOverflow}`);
  await browser.close();
  process.exit(totalErr === 0 && totalOverflow === 0 ? 0 : 1);
})();
