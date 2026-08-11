#!/usr/bin/env node
/* ============================================================
   英語版の本文が本当に英語になっているか確かめる
   ------------------------------------------------------------
   data/en/ の差し替えを当てたあとの CIGAR_DATA を歩き、
   「英語であるべき項目」に日本語が残っていないかを数える。
   翻訳を書いたら必ずこれで確かめる。

   使い方： node tools/check_en_content.js basics sizes prices tools countries
     引数は確かめたい範囲（省略すると全部）。
     --lang=zh のように言語も選べる（省略時は en）。
     未翻訳の判定は言語ごとに違う（tools/languages.js の untranslated）：
       en … 日本語の文字（かな・漢字）が残っていれば未翻訳
       zh … 漢字は中国語と共有なので、かなが残っていれば未翻訳
   合格： 「未翻訳: 0項目」

   ・訳語の補足として日本語を括弧書きで残すのは可（字数は言語ごとの上限まで）
   ・name_ja / ja / brands / sources / strength / flag は対象外
     （固有名・出典・強さ表示は別の仕組みで扱う）
   ============================================================ */
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");

const langArg = (process.argv.find(a => a.startsWith("--lang=")) || "--lang=en").slice(7);
const LANGCFG = require("./languages").find(l => l.code === langArg);
if (!LANGCFG) { console.error(`tools/languages.js に無い言語です: ${langArg}`); process.exit(1); }

const BASE = ["data/data.js", "data/countries_deep.js", "data/philippines_deep.js",
  "data/prices_deep.js", "data/tools.js", "data/humidor.js",
  "data/advanced.js", "data/advanced_deep.js", "data/phd.js", "data/phd_lit.js",
  "data/world.js", "data/world_deep.js", "data/brands.js"];
const ovrDir = path.join(ROOT, "data", LANGCFG.code);
const OVERLAYS = fs.existsSync(ovrDir)
  ? fs.readdirSync(ovrDir).filter(f => /^(basics|sizes|prices|tools_[ab]|countries_[ab]|humidor|advanced_\d|phd_\d|world_\d|brands_[a-z]+_\d+)\.js$/.test(f)).map(f => "data/" + LANGCFG.code + "/" + f)
  : [];

const src = [...BASE, ...OVERLAYS].map(f => fs.readFileSync(path.join(ROOT, f), "utf8")).join("\n;\n");
const D = new Function(src + "\n;return CIGAR_DATA;")();
const H = new Function(src + "\n;return HUMIDOR_DATA;")();
const ADV = new Function(src + "\n;return ADVANCED_DATA;")();
const PHD = new Function(src + "\n;return PHD_DATA;")();
const WLD = new Function(src + "\n;return WORLD_DATA;")();
const BRD = new Function(src + "\n;return BRANDS_DATA;")();

/* 深掘り走査：構造ごと歩き、文字列の葉をすべて確かめる。
   ja/es（意図して残す日本語名）・refs/sources（出典）・japan（翻訳済み別ファイル）は対象外 */
const SKIP_KEYS = new Set(["ja", "name_ja", "es", "refs", "sources", "icons", "abbr", "japan", "strength", "logo", "kind"]);
function deepScan(obj, prefix, out) {
  if (obj == null) return out;
  if (typeof obj === "string") { out.push([prefix, obj]); return out; }
  if (Array.isArray(obj)) { obj.forEach((v, i) => deepScan(v, `${prefix}[${i}]`, out)); return out; }
  if (typeof obj === "object") {
    Object.keys(obj).forEach(k => { if (!SKIP_KEYS.has(k)) deepScan(obj[k], `${prefix}.${k}`, out); });
  }
  return out;
}

const jaRe = new RegExp(LANGCFG.untranslated.re, "g");
const ja = (s) => (String(s == null ? "" : s).match(jaRe) || []).length;
const LIMIT = LANGCFG.untranslated.limit;   // 補足として許す残存文字数（言語ごと）

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
  humidor: () => [
    ["humidor.history", H.history], ["humidor.brands", H.brands],
    ["humidor.usage", H.usage], ["humidor.types", H.types], ["humidor.price", H.price],
    ...H.historyTimeline.map((t, i) => [`historyTimeline[${i}].t`, t.t])
  ],
  /* ブランド大全：差し替えファイルが存在する国だけ検査する
     （国ごとに波を分けて翻訳するため。全国そろえば全量が対象になる） */
  brands: () => {
    const covered = [...new Set(OVERLAYS.map(f => (f.match(/brands_([a-z]+)_/) || [])[1]).filter(Boolean))];
    /* strength は SKIP_KEYS で全体からは外してある（産地ページの「ミディアム〜フル」など、
       定型の短い表記は I18N.strength が表示時に訳すため）。
       ただしブランド大全の強さは注釈つきの地の文なので、ここだけは訳文が要る。 */
    return covered.flatMap(c => [
      ...deepScan(BRD[c], "BRANDS." + c, []),
      ...BRD[c].filter(b => b.strength).map(b => [`BRANDS.${c}[${b.en}].strength`, b.strength])
    ]);
  },
  advanced: () => deepScan(ADV, "ADV", []),
  phd: () => deepScan(PHD, "PHD", []),
  world: () => deepScan(WLD, "WORLD", []),
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
