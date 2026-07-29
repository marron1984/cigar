#!/usr/bin/env node
/* index.html から日本語を含むテキスト・属性を抜き出して一覧にする（辞書の下書き用） */
const fs = require("fs"), path = require("path");
function findChrome() {
  const root = "/opt/pw-browsers";
  for (const d of fs.readdirSync(root)) {
    if (!/^chromium/.test(d)) continue;
    const p = path.join(root, d, "chrome-linux", "chrome");
    if (fs.existsSync(p)) return p;
  }
  return null;
}
(async () => {
  const { chromium } = require("/opt/node22/lib/node_modules/playwright");
  const browser = await chromium.launch({ executablePath: findChrome() });
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto("file://" + path.resolve("index.html"));
  const out = await page.evaluate(() => {
    const JP = /[぀-ヿ㐀-鿿]/;
    const ATTRS = ["placeholder", "title", "alt", "aria-label", "content", "value", "label"];
    const seen = [];
    const push = (s) => { const t = s.trim(); if (t && JP.test(t) && !seen.includes(t)) seen.push(t); };
    const walk = (n) => {
      if (n.nodeType === 3) { push(n.nodeValue); return; }
      if (n.nodeType !== 1) return;
      if (/^(script|style)$/i.test(n.tagName)) return;
      ATTRS.forEach(a => { if (n.hasAttribute(a)) push(n.getAttribute(a)); });
      [...n.childNodes].forEach(walk);
    };
    walk(document.documentElement);
    return seen;
  });
  await browser.close();
  console.log(JSON.stringify(out, null, 2));
})();
