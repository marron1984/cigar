#!/usr/bin/env node
/* ============================================================
   まとめてビルドする
   ------------------------------------------------------------
   データやHTMLを直したら、これ1本を走らせれば公開できる形になる。
   順番に意味があるので、個別に走らせるときも下の順を守ること。

     1. build_summary.js  data/*.js  → data/summary.js（軽い要約）
     2. build_en.js       index.html → en/index.html（英語版シェル）
     3. build_pages.js    上の2つ    → /brands/ などの各ページ・sitemap・robots
     4. check_seo.js      取りこぼしの確認

   共有カード画像（assets/og.jpg）は写真や煽り文を変えたときだけ
   tools/build_og.js を別途走らせる（毎回作り直す必要はない）。

   使い方： NODE_PATH=/opt/node22/lib/node_modules \
              /opt/node22/bin/node tools/build.js
   ============================================================ */
const { execFileSync } = require("child_process");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const NODE = "/opt/node22/bin/node";
const env = Object.assign({}, process.env, { NODE_PATH: "/opt/node22/lib/node_modules" });

const steps = [
  ["要約データ", "tools/build_summary.js"],
  ["英語版シェル", "tools/build_en.js"],
  ["各ページ・sitemap・robots", "tools/build_pages.js"],
  ["公開まわりの確認", "tools/check_seo.js"]
];

for (const [label, script] of steps) {
  console.log(`\n▶ ${label}（${script}）`);
  try {
    execFileSync(NODE, [path.join(ROOT, script)], { cwd: ROOT, env, stdio: "inherit" });
  } catch (e) {
    console.error(`\n${script} で止まりました。上の出力を見て直してから、もう一度。`);
    process.exit(1);
  }
}
console.log("\nビルド完了。仕上げに実ブラウザでの確認を：");
console.log("  NODE_PATH=/opt/node22/lib/node_modules /opt/node22/bin/node .claude/skills/add-brand/scripts/render_check.js");
console.log("  NODE_PATH=/opt/node22/lib/node_modules /opt/node22/bin/node .claude/skills/add-brand/scripts/render_check.js en/index.html");
