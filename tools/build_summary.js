#!/usr/bin/env node
/* ============================================================
   data/summary.js を作る
   ------------------------------------------------------------
   ホーム・横断検索・記録ノート・在庫・用語クイズは「銘柄の名前」と
   「用語」しか使っていないのに、そのためだけに data/brands.js（約4.8MB）
   などの大物を最初から読み込んでいた。
   そこで、名前まわりだけを抜き出した小さな要約ファイルを作っておき、
   本体は「そのページを開いたとき」に読み込む形に変える。

   出力: data/summary.js（グローバル BRANDS_SUMMARY）

   使い方： NODE_PATH=/opt/node22/lib/node_modules \
              /opt/node22/bin/node tools/build_summary.js
   ============================================================ */
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const ROOT = path.resolve(__dirname, "..");
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");

/* データファイルはブラウザ用のベタ書きなので、Node では
   「読み込んだあとに目的の変数を返す」関数として評価する。 */
function loadGlobal(files, name) {
  const src = files.map(read).join("\n;\n");
  return new Function(src + "\n;return " + name + ";")();
}

const CIGAR_DATA = loadGlobal(["data/data.js"], "CIGAR_DATA");
const BRANDS_DATA = loadGlobal(["data/brands.js"], "BRANDS_DATA");
const PHD_DATA = loadGlobal(["data/phd.js"], "PHD_DATA");
const ADVANCED_DATA = loadGlobal(["data/advanced.js", "data/advanced_deep.js"], "ADVANCED_DATA");
const WORLD_DATA = loadGlobal(["data/world.js", "data/world_deep.js"], "WORLD_DATA");
const NEWS_DATA = loadGlobal(["data/news.js"], "NEWS_DATA");

/* 産地キー → 日本語の国名（js/app.js・js/search.js と同じ対応） */
const COUNTRY_JA = {
  cuba: "キューバ", dominican: "ドミニカ共和国", nicaragua: "ニカラグア", honduras: "ホンジュラス",
  mexico: "メキシコ", ecuador: "エクアドル", usa: "アメリカ", brazil: "ブラジル", cameroon: "カメルーン",
  peru: "ペルー", colombia: "コロンビア", philippines: "フィリピン", indonesia: "インドネシア", argentina: "アルゼンチン"
};

/* ---------- 1. 銘柄の名前一覧（ホーム・横断検索・在庫） ---------- */
const LEAD = 150;     // 「今日の一本」に出す導入文の長さ（js/app.js の表示と揃える）
const brands = {};
Object.keys(BRANDS_DATA).forEach(key => {
  brands[key] = (BRANDS_DATA[key] || []).map(b => {
    const o = { ja: b.ja, en: b.en };
    if (b.founded) o.f = String(b.founded).slice(0, 18);
    if (b.kind) o.k = b.kind;
    const lead = String(b.history || "").replace(/【[^】]*】/g, "").trim().slice(0, LEAD);
    if (lead) o.d = lead;
    return o;
  });
});

/* ---------- 2. 記録ノートのブランド選択肢 ----------
   js/note.js の brandGroups() と同じ手順で組み立てる。
   博士編DB → 上級編 → 産地別の代表銘柄 → ブランド大全 の順に集め、
   先に登録された国のものを優先する（重複掲載を防ぐため）。 */
function normalizeCountry(raw) {
  if (!raw) return "";
  let s = String(raw).replace(/[（(].*?[）)]/g, "").split("/")[0].trim();
  const alias = { "米": "アメリカ", "ドミニカ": "ドミニカ共和国" };
  return alias[s] || s;
}
const COUNTRY_ORDER = [
  "キューバ", "ドミニカ共和国", "ニカラグア", "ホンジュラス",
  "メキシコ", "エクアドル", "アメリカ", "ブラジル", "カメルーン"
];
function noteBrands() {
  const groups = new Map();
  const assigned = new Set();
  const push = (country, n) => {
    const name = (n || "").trim();
    if (!name || assigned.has(name)) return;
    const c = normalizeCountry(country) || "その他";
    if (!groups.has(c)) groups.set(c, new Set());
    groups.get(c).add(name);
    assigned.add(name);
  };
  ((PHD_DATA.db && PHD_DATA.db.cubanMarcas) || []).forEach(m => push("キューバ", m.ja));
  ((PHD_DATA.db && PHD_DATA.db.newWorld) || []).forEach(m => push(m.country, m.ja));
  (ADVANCED_DATA.brands || []).forEach(b => push(b.country, b.ja));
  (CIGAR_DATA.countries || []).forEach(c =>
    (c.brands || []).forEach(b => { if (!/ラッパー|使用/.test(b.ja)) push(c.name_ja, b.ja); }));
  Object.keys(BRANDS_DATA).forEach(k =>
    (BRANDS_DATA[k] || []).forEach(b => { if (b && b.ja) push(COUNTRY_JA[k] || "その他", b.ja); }));

  const ordered = [
    ...COUNTRY_ORDER.filter(n => groups.has(n)),
    ...[...groups.keys()].filter(n => n !== "その他" && !COUNTRY_ORDER.includes(n)),
    ...(groups.has("その他") ? ["その他"] : [])
  ];
  return ordered.map(country => ({
    country,
    brands: [...groups.get(country)].sort((a, b) => a.localeCompare(b, "ja"))
  }));
}

/* ---------- 3. 用語大全（横断検索・用語クイズ） ---------- */
const lexicon = (WORLD_DATA.lexicon || []).map(t => {
  const o = { ja: t.ja, desc: t.desc };
  if (t.es) o.es = t.es;
  if (t.en) o.en = t.en;
  return o;
});

const summary = {
  generated: new Date().toISOString().slice(0, 10),
  brands,
  noteBrands: noteBrands(),
  lexicon,
  newsCount: (NEWS_DATA && NEWS_DATA.items || []).length
};

const out =
`/* ============================================================
   Cigar Cafe — 要約データ（自動生成・手で編集しない）
   tools/build_summary.js が data/*.js から作る。
   銘柄の名前・「今日の一本」の導入文・記録ノートの選択肢・用語だけを
   持つ。重い本体データは、そのページを開いたときに読み込む。
   ============================================================ */
var BRANDS_SUMMARY = ${JSON.stringify(summary)};
`;

fs.writeFileSync(path.join(ROOT, "data/summary.js"), out);

/* ---------- 英語版の用語の説明 ----------
   要約データは日本語で作る。用語クイズと横断検索は、そこから説明文を取るので、
   英語版ではそこだけ日本語が残ってしまう。世界編の差し替え（data/en/world_*.js）を
   当てた説明を別ファイルに出し、英語版でだけ上書きする。 */
const enWorld = fs.existsSync(path.join(ROOT, "data/en"))
  ? fs.readdirSync(path.join(ROOT, "data/en")).filter(f => /^world_\d+\.js$/.test(f)).sort().map(f => "data/en/" + f)
  : [];
if (enWorld.length) {
  const W_EN = loadGlobal(["data/world.js", "data/world_deep.js", ...enWorld], "WORLD_DATA");
  const pairs = (W_EN.lexicon || []).map(t => [t.ja, t.desc]);
  const outEn =
`/* ============================================================
   Cigar Cafe — 用語の説明（英語・自動生成・手で編集しない）
   tools/build_summary.js が data/en/world_*.js から作る。
   英語版でだけ読み、BRANDS_SUMMARY.lexicon の説明を英語に差し替える。
   ============================================================ */
(function () {
  if (typeof BRANDS_SUMMARY === "undefined" || !BRANDS_SUMMARY.lexicon) return;
  var EN = ${JSON.stringify(Object.fromEntries(pairs))};
  BRANDS_SUMMARY.lexicon.forEach(function (t) { if (EN[t.ja]) t.desc = EN[t.ja]; });
})();
`;
  fs.writeFileSync(path.join(ROOT, "data/en/lexicon.js"), outEn);
  const gzEn = zlib.gzipSync(Buffer.from(outEn), { level: 9 }).length;
  console.log(`data/en/lexicon.js を生成しました。 用語 ${pairs.length}語 / ${(outEn.length / 1024).toFixed(0)}KB（gzip ${(gzEn / 1024).toFixed(0)}KB）`);
}

const gz = zlib.gzipSync(Buffer.from(out), { level: 9 }).length;
const nBrands = Object.keys(brands).reduce((n, k) => n + brands[k].length, 0);
console.log(`data/summary.js を生成しました。`);
console.log(`  産地 ${Object.keys(brands).length} / 銘柄 ${nBrands}`);
console.log(`  記録ノートの選択肢 ${summary.noteBrands.reduce((n, g) => n + g.brands.length, 0)}件（${summary.noteBrands.length}か国）`);
console.log(`  用語 ${lexicon.length} / ニュース ${summary.newsCount}件`);
console.log(`  サイズ ${(out.length / 1024).toFixed(0)}KB（gzip ${(gz / 1024).toFixed(0)}KB）`);
