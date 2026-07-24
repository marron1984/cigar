#!/usr/bin/env node
/* ============================================================
   ブランド追加スキル — マージ＆検証スクリプト
   ------------------------------------------------------------
   リサーチ担当が data/fragments/*.json に書き出した「ブランド断片」を
   data/brands.js の BRANDS_DATA へ安全に取り込む。

   安全設計：
   - 各ブランドは品質しきい値を満たしたものだけを取り込む（未達は元のまま据え置き）
   - 既存ブランドは en 名（アクセント無視で照合）で突き合わせて上書き更新
   - 新規ブランドは末尾に追加し order を採番
   - 先頭のコメントヘッダは保持

   使い方：
     node merge_brand.js <fragment.json> [brands.jsのパス]
   省略時は data/fragments/pending.json と data/brands.js を使う。

   断片JSONの形：
     {
       "key": "nicaragua",           // BRANDS_DATA の国キー（下の VALID KEYS 参照）
       "brands": [ { ja, en, founded, founder, meaning, strength,
                     status, history, vitolas:[…], trivia, sources:[…] }, … ]
     }
   ============================================================ */
const fs = require("fs");
const path = require("path");

// しきい値（ブランド大全の品質基準）。断片はこれを上回るよう作る。
const MIN_HISTORY = 2800;  // history の文字数
const MIN_SOURCES = 8;     // 出典の数
const MIN_VITOLAS = 4;     // 代表ヴィトラの数
const MIN_SECTIONS = 5;    // history 内の【見出し】の数

const fragPath = process.argv[2] || "data/fragments/pending.json";
const brandsPath = process.argv[3] || "data/brands.js";

const norm = (s) => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/\s+/g, " ").trim();

if (!fs.existsSync(fragPath)) { console.error(`断片が見つかりません: ${fragPath}`); process.exit(1); }
if (!fs.existsSync(brandsPath)) { console.error(`brands.js が見つかりません: ${brandsPath}`); process.exit(1); }

const src = fs.readFileSync(brandsPath, "utf8");
let B;
try { B = new Function(src + "\n;return BRANDS_DATA;")(); }
catch (e) { console.error("brands.js の読み込みに失敗（構文エラーの可能性）：" + e.message); process.exit(1); }

let frag;
try { frag = JSON.parse(fs.readFileSync(fragPath, "utf8")); }
catch (e) { console.error("断片JSONの解析に失敗：" + e.message); process.exit(1); }

const key = frag.key;
const arr = B[key];
if (!arr) {
  console.error(`未知の国キー: "${key}"`);
  console.error("使えるキー: " + Object.keys(B).join(", "));
  process.exit(1);
}

let maxOrder = Math.max(0, ...arr.map(b => b.order || 0));
let added = 0, updated = 0, skipped = 0;

for (const nb of (frag.brands || [])) {
  const h = String(nb.history || "");
  const sec = (h.match(/【/g) || []).length;
  const reasons = [];
  if (h.length < MIN_HISTORY) reasons.push(`history ${h.length}字<${MIN_HISTORY}`);
  if ((nb.sources || []).length < MIN_SOURCES) reasons.push(`出典 ${(nb.sources||[]).length}<${MIN_SOURCES}`);
  if ((nb.vitolas || []).length < MIN_VITOLAS) reasons.push(`ヴィトラ ${(nb.vitolas||[]).length}<${MIN_VITOLAS}`);
  if (sec < MIN_SECTIONS) reasons.push(`見出し ${sec}<${MIN_SECTIONS}`);
  if (!nb.en || !nb.ja) reasons.push("en/ja 欠落");
  if (!nb.founded) reasons.push("founded 欠落");
  if (!nb.status) reasons.push("status 欠落");
  if (!nb.trivia) reasons.push("trivia 欠落");
  if (reasons.length) {
    console.log(`  ✗ SKIP ${nb.en || nb.ja || "(無名)"} — ${reasons.join(" / ")}`);
    skipped++; continue;
  }
  const old = arr.find(x => norm(x.en) === norm(nb.en));
  const payload = {
    ja: nb.ja, en: nb.en, founded: nb.founded, founder: nb.founder || "",
    meaning: nb.meaning || (old && old.meaning) || "",
    strength: nb.strength || (old && old.strength) || "",
    status: nb.status, history: h, vitolas: nb.vitolas, trivia: nb.trivia, sources: nb.sources,
  };
  if (old) {
    Object.assign(old, payload);
    console.log(`  ✓ 更新 ${nb.en} — ${h.length}字 / 出典${nb.sources.length}`);
    updated++;
  } else {
    maxOrder += 1;
    arr.push({ order: maxOrder, ...payload });
    console.log(`  ✓ 新規 ${nb.en} — ${h.length}字 / 出典${nb.sources.length} (order=${maxOrder})`);
    added++;
  }
}

if (added + updated === 0) {
  console.error(`\n取り込めたブランドがありません（SKIP ${skipped}件）。断片の品質を上げて再実行してください。`);
  process.exit(2);
}

const header = src.slice(0, src.indexOf("var BRANDS_DATA"));
fs.writeFileSync(brandsPath, header + "var BRANDS_DATA = " + JSON.stringify(B, null, 2) + ";\n");

// 書き戻した結果が再度読めるか（構文健全性）を確認
try { new Function(fs.readFileSync(brandsPath, "utf8") + "\n;return BRANDS_DATA;")(); }
catch (e) { console.error("書き戻し後の brands.js が壊れています：" + e.message); process.exit(1); }

console.log(`\n完了：新規 ${added} / 更新 ${updated} / スキップ ${skipped}。 ${key} は現在 ${arr.length} 件。`);
