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

/* ---------- 英語版の要約データ ----------
   要約は日本語で作る。英語版でも、ホームの「今日の一本」とショーケース、
   横断検索、用語クイズはここから文章を取るので、そのままでは日本語が出る。
   差し替え（data/en/*.js）を当てた分だけを別ファイルに出し、英語版で上書きする。

   英語の創業表記は、括弧の注記を落として短く整える
   （日本語は18字で切っているが、英語は同じ内容に字数がいるため長めに取る）。 */
function shortFoundedEn(s) {
  const head = String(s || "").split(/[（(]/)[0].trim() || String(s || "");
  if (head.length <= 40) return head;
  const cut = head.slice(0, 40);
  const sp = cut.lastIndexOf(" ");
  return sp > 12 ? cut.slice(0, sp) : cut;
}
const enDir2 = path.join(ROOT, "data/en");
const enPick = (re) => fs.existsSync(enDir2)
  ? fs.readdirSync(enDir2).filter(f => re.test(f)).sort().map(f => "data/en/" + f) : [];
const enWorld = enPick(/^world_\d+\.js$/);
const enBrands = enPick(/^brands_[a-z]+_\d+\.js$/);

if (enWorld.length && enBrands.length) {
  /* 差し替えを当てたうえで、日本語版とまったく同じ形の要約をもう一組作る。
     英語版は data/summary.js の代わりにこちらを読む（二重に読ませない）。 */
  const summaryEn = JSON.parse(JSON.stringify(summary));

  const W_EN = loadGlobal(["data/world.js", "data/world_deep.js", ...enWorld], "WORLD_DATA");
  const lexEn = new Map((W_EN.lexicon || []).map(t => [t.ja, t.desc]));
  summaryEn.lexicon.forEach(t => { if (lexEn.has(t.ja)) t.desc = lexEn.get(t.ja); });

  const B_EN = loadGlobal(["data/brands.js", ...enBrands], "BRANDS_DATA");
  let nBr = 0;
  Object.keys(summaryEn.brands).forEach(key => {
    const src = new Map((B_EN[key] || []).map(b => [b.en, b]));
    summaryEn.brands[key].forEach(b => {
      const e = src.get(b.en);
      if (!e) return;
      if (e.founded) b.f = shortFoundedEn(e.founded);
      const lead = String(e.history || "").replace(/【[^】]*】/g, "").trim().slice(0, LEAD);
      if (lead) b.d = lead;
      nBr++;
    });
  });

  const outEn =
`/* ============================================================
   Cigar Cafe — 要約データ・英語版（自動生成・手で編集しない）
   tools/build_summary.js が data/en/*.js を当てて作る。
   英語版のシェルは data/summary.js の代わりにこれを読む。
   中身の形は日本語版とまったく同じ（銘柄名の ja は併記に使うので残す）。
   ============================================================ */
var BRANDS_SUMMARY = ${JSON.stringify(summaryEn)};
`;
  fs.writeFileSync(path.join(ROOT, "data/en/summary.js"), outEn);
  const gzEn = zlib.gzipSync(Buffer.from(outEn), { level: 9 }).length;
  console.log(`data/en/summary.js を生成しました。 用語 ${summaryEn.lexicon.length}語 / 銘柄 ${nBr}件`);
  console.log(`  サイズ ${(outEn.length / 1024).toFixed(0)}KB（gzip ${(gzEn / 1024).toFixed(0)}KB）`);
}

const gz = zlib.gzipSync(Buffer.from(out), { level: 9 }).length;
const nBrands = Object.keys(brands).reduce((n, k) => n + brands[k].length, 0);
console.log(`data/summary.js を生成しました。`);
console.log(`  産地 ${Object.keys(brands).length} / 銘柄 ${nBrands}`);
console.log(`  記録ノートの選択肢 ${summary.noteBrands.reduce((n, g) => n + g.brands.length, 0)}件（${summary.noteBrands.length}か国）`);
console.log(`  用語 ${lexicon.length} / ニュース ${summary.newsCount}件`);
console.log(`  サイズ ${(out.length / 1024).toFixed(0)}KB（gzip ${(gz / 1024).toFixed(0)}KB）`);
