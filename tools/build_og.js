#!/usr/bin/env node
/* ============================================================
   SNS共有カード（assets/og.png）を作る
   ------------------------------------------------------------
   X・LINE・Slack などにリンクを貼ったとき、1200×630の画像として
   出るカードを作る。写真とロゴを重ねたHTMLをそのまま撮っている。

   使い方： NODE_PATH=/opt/node22/lib/node_modules \
              /opt/node22/bin/node tools/build_og.js
   ============================================================ */
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
function findChrome() {
  const root = "/opt/pw-browsers";
  if (!fs.existsSync(root)) return null;
  for (const d of fs.readdirSync(root)) {
    const p = path.join(root, d, "chrome-linux", "chrome");
    if (/^chromium/.test(d) && fs.existsSync(p)) return p;
  }
  return null;
}
const b64 = (rel) => "data:image/" + (rel.endsWith(".png") ? "png" : "jpeg") +
  ";base64," + fs.readFileSync(path.join(ROOT, rel)).toString("base64");

const card = (title, sub) => `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:1200px; height:630px; overflow:hidden;
         font-family:"Noto Sans CJK JP","Noto Sans JP",system-ui,sans-serif; }
  .card { position:relative; width:1200px; height:630px; background:#1c140a; }
  .photo { position:absolute; inset:0; background:url('${b64("assets/hero-portrait.jpg")}') center/cover no-repeat; }
  .veil { position:absolute; inset:0;
          background:linear-gradient(100deg,#1a1209 0%,rgba(26,18,9,.94) 42%,rgba(26,18,9,.35) 68%,rgba(26,18,9,.15) 100%); }
  .inner { position:absolute; inset:0; display:flex; flex-direction:column;
           justify-content:center; gap:20px; padding:0 74px; width:800px; }
  .lock { display:flex; align-items:center; gap:18px; }
  .lock img { width:74px; height:74px; border-radius:14px; }
  .name { font-size:40px; font-weight:800; letter-spacing:.04em; color:#f4e7d4; }
  .rule { width:78px; height:3px; background:#b5763a; }
  h1 { font-size:${title.length > 30 ? 44 : 54}px; line-height:1.28; font-weight:800; color:#fdf6ec; }
  p  { font-size:23px; line-height:1.55; color:#d8c6ad; }
  .dom { position:absolute; right:44px; bottom:34px; font-size:21px; letter-spacing:.16em;
         color:#c9a878; font-weight:700; }
</style></head><body><div class="card">
  <div class="photo"></div><div class="veil"></div>
  <div class="inner">
    <div class="lock"><img src="${b64("assets/logo.png")}"><span class="name">Cigar Cafe</span></div>
    <div class="rule"></div>
    <h1>${title}</h1>
    <p>${sub}</p>
  </div>
  <div class="dom">cigar.cafe</div>
</div></body></html>`;

(async () => {
  const { chromium } = require("/opt/node22/lib/node_modules/playwright");
  const browser = await chromium.launch(findChrome() ? { executablePath: findChrome() } : {});
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  const jobs = [
    ["assets/og.jpg", "はじめての葉巻を、<br>やさしく。", "基礎知識・産地・太さ・価格・道具、<br>そして一本を残す記録ノート。"],
    ["assets/og-en.jpg", "Cigars,<br>explained gently.", "Basics, origins, sizes, prices and accessories —<br>with a journal for every one you smoke."]
  ];
  for (const [out, title, sub] of jobs) {
    await page.setContent(card(title, sub), { waitUntil: "load" });
    await page.screenshot({ path: path.join(ROOT, out), type: "jpeg", quality: 88 });
    console.log(out + " を生成しました。");
  }
  await browser.close();
})();
