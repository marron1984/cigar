#!/usr/bin/env node
/* ============================================================
   英語版の本文が本当に英語になっているか確かめる
   ------------------------------------------------------------
   data/en/ の差し替えを当てたあとの CIGAR_DATA を歩き、
   「英語であるべき項目」に日本語が残っていないかを数える。
   翻訳を書いたら必ずこれで確かめる。

   使い方： node tools/check_en_content.js basics sizes prices tools countries
     引数は確かめたい範囲（省略すると全部）。
   合格： 「未翻訳: 0項目」

   ・訳語の補足として日本語を括弧書きで残すのは可（1項目15字まで）
   ・name_ja / ja / brands / sources / strength / flag は対象外
     （固有名・出典・強さ表示は別の仕組みで扱う）
   ============================================================ */
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");

const BASE = ["data/data.js", "data/countries_deep.js", "data/philippines_deep.js",
  "data/prices_deep.js", "data/tools.js"];
const enDir = path.join(ROOT, "data/en");
const OVERLAYS = fs.existsSync(enDir)
  ? fs.readdirSync(enDir).filter(f => /^(basics|sizes|prices|tools_[ab]|countries_[ab])\.js$/.test(f)).map(f => "data/en/" + f)
  : [];

const src = [...BASE, ...OVERLAYS].map(f => fs.readFileSync(path.join(ROOT, f), "utf8")).join("\n;\n");
const D = new Function(src + "\n;return CIGAR_DATA;")();

const ja = (s) => (String(s == null ? "" : s).match(/[ぁ-んァ-ヶ一-龠]/g) || []).length;
const LIMIT = 15;   // 補足の括弧書きとして許す日本語の字数

/* 範囲 → 確かめる項目。fn は [ラベル, 値] の一覧を返す */
const SCOPES = {
  basics: () => [
    ["whatIsCigar", D.whatIsCigar], ["history", D.history], ["manners", D.manners],
    ["tastingTerms", D.tastingTerms],
    ...D.anatomy.map((a, i) => [`anatomy[${i}].desc`, a.desc]),
    ...D.howToSmoke.flatMap((s, i) => [[`howToSmoke[${i}].title`, s.title], [`howToSmoke[${i}].desc`, s.desc]]),
    ...D.wrapperShades.map((s, i) => [`wrapperShades[${i}].flavor`, s.flavor]),
    ...D.glossary.map((g, i) => [`glossary[${i}].desc`, g.desc])
  ],
  sizes: () => [
    ["ringGaugeIntro", D.ringGaugeIntro], ["thicknessGuide", D.thicknessGuide],
    ["shapeClassification", D.shapeClassification],
    ...D.vitolas.flatMap((v, i) => [[`vitolas[${i}].feat`, v.feat], [`vitolas[${i}].time`, v.time]])
  ],
  prices: () => [
    ["priceFactors", D.priceFactors], ["dryVsPremium", D.dryVsPremium],
    ...D.priceTiers.flatMap((t, i) => [
      [`priceTiers[${i}].tier`, t.tier], [`priceTiers[${i}].range`, t.range],
      [`priceTiers[${i}].feat`, t.feat], [`priceTiers[${i}].whom`, t.whom],
      [`priceTiers[${i}].advice`, t.advice],
      ...(t.sections || []).flatMap((s, j) => [[`priceTiers[${i}].sections[${j}].h`, s.h], [`priceTiers[${i}].sections[${j}].body`, s.body]])
    ]),
    ...(D.priceTopics || []).flatMap((t, i) => [[`priceTopics[${i}].h`, t.h], [`priceTopics[${i}].body`, t.body]])
  ],
  tools: () => [
    ["storageBasics", D.storageBasics],
    ...D.tools.flatMap((t, i) => ["role", "types", "choose", "use", "care", "history", "price"]
      .map(k => [`tools[${i}(${t.en})].${k}`, t[k]]))
  ],
  countries: () => [
    ...D.countries.flatMap((c) => [
      [`${c.name_en}.flavor`, c.flavor], [`${c.name_en}.climate`, c.climate],
      [`${c.name_en}.history`, c.history], [`${c.name_en}.trivia`, c.trivia],
      ...(c.regions || []).map((r, i) => [`${c.name_en}.regions[${i}]`, r]),
      ...(c.sections || []).flatMap((s, j) => [[`${c.name_en}.sections[${j}].h`, s.h], [`${c.name_en}.sections[${j}].body`, s.body]])
    ]),
    ["philippinesDetail.flavor", D.philippinesDetail.flavor],
    ...(D.philippinesDetail.regions || []).map((r, i) => [`philippinesDetail.regions[${i}]`, r]),
    ...(D.philippinesDetail.sections || []).flatMap((s, j) => [[`philippinesDetail.sections[${j}].h`, s.h], [`philippinesDetail.sections[${j}].body`, s.body]])
  ]
};

const targets = process.argv.slice(2).filter(a => SCOPES[a]);
const scopes = targets.length ? targets : Object.keys(SCOPES);
console.log(`差し替え: ${OVERLAYS.length ? OVERLAYS.join(", ") : "（まだ無い）"}\n`);

let bad = 0, total = 0;
for (const sc of scopes) {
  const items = SCOPES[sc]();
  const ng = items.filter(([, v]) => ja(v) > LIMIT);
  total += items.length;
  console.log(`${sc.padEnd(10)} ${items.length}項目中、日本語のまま ${ng.length}件`);
  ng.slice(0, 8).forEach(([label, v]) => console.log(`    ✗ ${label}（日本語${ja(v)}字）: ${String(v).slice(0, 40)}…`));
  if (ng.length > 8) console.log(`    …ほか${ng.length - 8}件`);
  bad += ng.length;
}
console.log(`\n未翻訳: ${bad}項目 / 全${total}項目`);
process.exit(bad ? 1 : 0);
