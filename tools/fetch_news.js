#!/usr/bin/env node
/* ============================================================
   葉巻ニュースを毎日取り込む
   ------------------------------------------------------------
   tools/news_sources.js に並べたRSSを見に行き、まだ載せていない記事を
   Claude に渡して「載せる価値があるか」を判断させ、日本語の見出しと要約に
   してから data/news.js へ足す。

   守っていること：
   ・要約は渡したRSSの本文だけから書かせる（無い情報は書かせない）
   ・単なるレビュー記事や販促は載せない（ニュース性のあるものだけ）
   ・原文へのリンクは必ず残す（出典をたどれるように）
   ・同じURLは二度載せない

   使い方：
     ANTHROPIC_API_KEY=... node tools/fetch_news.js
     node tools/fetch_news.js --dry-run   … 取得元の生死とRSSの中身だけ確認
     node tools/fetch_news.js --days 30   … さかのぼる日数（既定14日）
     node tools/fetch_news.js --max 8     … 1回に足す上限（既定6件）
   ============================================================ */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const NEWS_FILE = path.join(ROOT, "data/news.js");
const SOURCES = require("./news_sources.js");

const MODEL = "claude-opus-4-8";
const CATEGORIES = ["新製品", "業界・企業", "イベント・アワード", "規制・市場", "日本国内"];
const MAX_ITEMS = 160;          // data/news.js に残す上限（古いものから落とす）

const argv = process.argv.slice(2);
const flag = (name, def) => {
  const i = argv.indexOf("--" + name);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[i + 1] : def;
};
const DRY = argv.includes("--dry-run");
const DAYS = Number(flag("days", 14));
const MAX_NEW = Number(flag("max", 6));
const CANDIDATE_CAP = 45;       // Claude に見せる候補の上限

/* ---------- 日付まわり（サイトは日本語なので日本時間で数える） ---------- */
const jstDate = (d) => new Date(d.getTime() + 9 * 3600 * 1000).toISOString().slice(0, 10);
const TODAY = jstDate(new Date());

/* ---------- ちいさなRSS/Atom読み取り ----------
   外部ライブラリを入れずに済ませたいので、必要な項目だけを拾う。
   RSS（<item>）と Atom（<entry>）の両方に対応する。 */
const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", "#39": "'", nbsp: " " };
function decode(s) {
  return String(s || "")
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&([a-z#0-9]+);/gi, (m, n) => (ENTITIES[n.toLowerCase()] != null ? ENTITIES[n.toLowerCase()] : m));
}
const strip = (s) => decode(s).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
const tag = (block, names) => {
  for (const n of names) {
    const m = new RegExp(`<${n}[^>]*>([\\s\\S]*?)</${n}>`, "i").exec(block);
    if (m) return m[1];
  }
  return "";
};
function parseFeed(xml) {
  const blocks = xml.match(/<(item|entry)[\s>][\s\S]*?<\/\1>/gi) || [];
  return blocks.map(b => {
    // Atom の <link href="…"/> と RSS の <link>…</link> の両方
    let link = strip(tag(b, ["link"]));
    if (!link) {
      const m = /<link[^>]*href="([^"]+)"/i.exec(b);
      if (m) link = decode(m[1]);
    }
    const raw = tag(b, ["content:encoded", "description", "summary", "content"]);
    return {
      title: strip(tag(b, ["title"])),
      link: link.trim(),
      date: strip(tag(b, ["pubDate", "published", "updated", "dc:date"])),
      text: strip(raw).slice(0, 1200)
    };
  }).filter(x => x.title && x.link);
}

async function fetchFeed(src) {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), 25000);
  try {
    const res = await fetch(src.url, {
      signal: ctl.signal,
      headers: {
        "user-agent": "CigarCafeNewsBot/1.0 (+https://cigar.cafe/news/)",
        "accept": "application/rss+xml, application/atom+xml, application/xml, text/xml, */*"
      }
    });
    if (!res.ok) return { ok: false, reason: "HTTP " + res.status, items: [] };
    const items = parseFeed(await res.text());
    return { ok: items.length > 0, reason: items.length ? "" : "記事が見つからない（形式が違う可能性）", items };
  } catch (e) {
    return { ok: false, reason: String(e.message || e).slice(0, 120), items: [] };
  } finally {
    clearTimeout(timer);
  }
}

/* ---------- いま載っているもの ---------- */
function loadNews() {
  const src = fs.readFileSync(NEWS_FILE, "utf8");
  return new Function(src + "\n;return NEWS_DATA;")();
}
/* URLの揺れ（末尾スラッシュ・追跡パラメータ）を吸収して同一記事を見分ける */
function urlKey(u) {
  try {
    const x = new URL(u);
    x.hash = "";
    [...x.searchParams.keys()].forEach(k => { if (/^utm_|^fbclid$|^gclid$/i.test(k)) x.searchParams.delete(k); });
    return (x.origin + x.pathname.replace(/\/+$/, "") + x.search).toLowerCase();
  } catch (e) { return String(u).toLowerCase(); }
}

/* ---------- Claude に選ばせて日本語にする ---------- */
const SYSTEM = `あなたは葉巻専門メディアの日本語版デスクです。海外・国内の葉巻関連ニュースを受け取り、
日本の読者に届ける価値があるものだけを選び、日本語の見出しと要約に直します。

【選ぶ基準】載せるのは次のいずれかに当たるものだけです。
- 新製品・新ライン・限定品の発表やリリース
- メーカー・流通・小売の動き（買収、提携、工場、人事、経営）
- 規制・税制・訴訟・市場統計の動き
- 業界イベント、アワード、展示会の結果
載せないもの：個別銘柄の試喫レビュー、ランキング記事、ポッドキャスト回、
広告・販促、読み物コラム、他社記事のまとめ、葉巻と関係の薄い話題。

【要約の書き方】
- 渡された本文に書かれていることだけを使う。推測・補足・一般論を足さない。
- 本文が薄いときは短い要約でよい。無理に膨らませない。
- 事実（社名・銘柄名・数量・価格・日付・地名）は原文の表記を保つ。
- 日本語として自然に。ですます調ではなく、簡潔な報道文体（〜した／〜と発表した）。
- 見出しは全角35字以内。要約は80〜200字。
- 銘柄名・社名はカタカナ表記＋必要なら原綴りを括弧で添える。

【カテゴリ】必ず次のどれか1つ：${CATEGORIES.join(" / ")}
日本国内の媒体・出来事は「日本国内」を選ぶ。

【出典】source には媒体名を入れる。媒体名が記事タイトルの末尾に「 - 媒体名」の形で
付いている場合は、そこから取り出し、title_en からは取り除く。

【英語版】このサイトには英語版もある。各記事に英語の見出し title_en と
英語の要約 summary_en も書くこと。英語ソースの記事は原文見出し・本文に忠実に、
日本語ソースの記事は日本語の見出し・要約を自然な英語に。summary_en は
summary_ja と同じ情報量（イギリス英語・報道文体・60〜120語）。

出典も英語版の表示に要る。source_en には媒体名の英語表記を入れる。
媒体が自ら名乗っている英語表記があればそれに従い（例：日本シガー協会 →
Japan Cigar Association、マイナビニュース → Mynavi News）、無ければ
ヘボン式のローマ字にする。英語媒体なら source と同じでよい。
source_title_en には元記事タイトルの英訳を入れる（英語媒体なら原題のまま）。`;

const SCHEMA = {
  type: "object",
  properties: {
    picks: {
      type: "array",
      description: "載せると決めた記事。載せる価値が無ければ空配列。",
      items: {
        type: "object",
        properties: {
          i: { type: "integer", description: "候補の通し番号" },
          category: { type: "string", enum: CATEGORIES },
          title_ja: { type: "string", description: "日本語の見出し（全角35字以内）" },
          summary_ja: { type: "string", description: "日本語の要約（80〜200字）" },
          source: { type: "string", description: "媒体名" },
          title_en: { type: "string", description: "英語の見出し（英語ソースは原文見出しを基に、媒体名は除く。日本語ソースは英訳）" },
          summary_en: { type: "string", description: "英語の要約（summary_ja と同じ情報量、60〜120語）" },
          source_en: { type: "string", description: "媒体名の英語表記（英語媒体なら source と同じ）" },
          source_title_en: { type: "string", description: "元記事タイトルの英訳（英語媒体なら原題のまま）" }
        },
        required: ["i", "category", "title_ja", "summary_ja", "source", "title_en", "summary_en", "source_en", "source_title_en"],
        additionalProperties: false
      }
    }
  },
  required: ["picks"],
  additionalProperties: false
};

async function translate(candidates) {
  const Anthropic = require("@anthropic-ai/sdk");
  const client = new Anthropic();
  const payload = candidates.map((c, i) => ({
    i,
    source: c.source,
    lang: c.lang,
    date: c.date,
    title: c.title,
    text: c.text
  }));
  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 8000,
    thinking: { type: "adaptive" },
    system: SYSTEM,
    output_config: { format: { type: "json_schema", schema: SCHEMA } },
    messages: [{
      role: "user",
      content:
        `次の候補から、載せる価値のあるものを新しい順に最大 ${MAX_NEW} 件まで選び、日本語にしてください。\n` +
        `該当が無ければ picks を空配列にしてください。\n\n` +
        JSON.stringify(payload, null, 1)
    }]
  });
  const text = res.content.filter(b => b.type === "text").map(b => b.text).join("");
  let out;
  try { out = JSON.parse(text); }
  catch (e) { throw new Error("Claude の返答をJSONとして読めませんでした:\n" + text.slice(0, 500)); }
  return Array.isArray(out.picks) ? out.picks : [];
}

/* ---------- 書き出す前の点検 ----------
   自動で書き足すぶん、形の崩れたものが混じるとページ全体が壊れる。
   入れる直前に、必要な項目が揃っているかだけ機械で確かめる。 */
const REQUIRED = ["date", "category", "title_ja", "summary_ja", "title_en", "summary_en", "source", "source_title", "url"];
function validate(items) {
  const bad = [];
  items.forEach((x, i) => {
    REQUIRED.forEach(k => { if (!x[k] || typeof x[k] !== "string") bad.push(`${i}件目: ${k} が空`); });
    if (x.category && !CATEGORIES.includes(x.category)) bad.push(`${i}件目: 未知のカテゴリ「${x.category}」`);
    if (x.date && !/^\d{4}-\d{2}(-\d{2})?$/.test(x.date)) bad.push(`${i}件目: 日付の形が変「${x.date}」`);
    if (x.url && !/^https?:\/\//.test(x.url)) bad.push(`${i}件目: URLが変「${x.url}」`);
  });
  if (bad.length) {
    console.error("書き出しを中止します。おかしな項目がありました:");
    bad.slice(0, 10).forEach(b => console.error("  ✗ " + b));
    process.exit(1);
  }
}

/* ---------- data/news.js を書き戻す ---------- */
function writeNews(data) {
  validate(data.items);
  const head =
`/* ============================================================
   葉巻大辞典 — 葉巻ニュース データ
   海外一次ソース（英語）の内容を翻訳・要約したもの。編集時点の情報。
   各記事の url が原文（一次ソース）。

   このファイルは tools/fetch_news.js が毎日書き足しています。
   手で足すこともできますが、items の並び・キーは崩さないでください。
   ============================================================ */
var NEWS_DATA = `;
  fs.writeFileSync(NEWS_FILE, head + JSON.stringify(data, null, 2) + ";\n");
}

/* ---------- 本体 ---------- */
(async () => {
  const news = loadNews();
  const known = new Set((news.items || []).map(x => urlKey(x.url)));
  const since = Date.now() - DAYS * 86400 * 1000;

  console.log(`取得元 ${SOURCES.length}件を確認します（過去${DAYS}日 / 既存${news.items.length}件）\n`);

  const candidates = [];
  const report = [];
  for (const src of SOURCES) {
    const r = await fetchFeed(src);
    let fresh = 0;
    for (const it of r.items) {
      const t = it.date ? Date.parse(it.date) : NaN;
      if (!Number.isNaN(t) && t < since) continue;         // 古い記事は見ない
      if (known.has(urlKey(it.link))) continue;            // もう載せてある
      candidates.push({
        source: src.name, lang: src.lang,
        date: Number.isNaN(t) ? TODAY : jstDate(new Date(t)),
        title: it.title, text: it.text, url: it.link
      });
      fresh++;
    }
    report.push(`${r.ok ? "○" : "×"} ${src.name.padEnd(20)} 取得${r.items.length}件 / 新着${fresh}件${r.ok ? "" : "  — " + r.reason}`);
  }
  report.forEach(l => console.log("  " + l));

  // 新しい順、同じ取得元に偏らないよう軽くならす
  candidates.sort((a, b) => b.date.localeCompare(a.date));
  const trimmed = candidates.slice(0, CANDIDATE_CAP);
  console.log(`\n新着候補 ${candidates.length}件（うち ${trimmed.length}件を判定にかけます）`);

  if (DRY) {
    trimmed.slice(0, 15).forEach(c => console.log(`  [${c.date}] ${c.source} — ${c.title.slice(0, 70)}`));
    console.log("\n--dry-run のため、ここで終わります（Claude は呼びません）。");
    return;
  }
  if (!trimmed.length) { console.log("足すものはありませんでした。"); return; }
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("ANTHROPIC_API_KEY が設定されていません。");
    process.exit(1);
  }

  const picks = await translate(trimmed);
  console.log(`\nClaude が ${picks.length}件を選びました。`);

  const added = [];
  for (const p of picks) {
    const c = trimmed[p.i];
    if (!c) { console.log(`  ! 候補番号 ${p.i} が見つからないので飛ばします`); continue; }
    if (known.has(urlKey(c.url))) continue;
    if (!CATEGORIES.includes(p.category)) { console.log(`  ! 未知のカテゴリ「${p.category}」なので飛ばします`); continue; }
    known.add(urlKey(c.url));
    added.push({
      date: c.date,
      category: p.category,
      title_ja: p.title_ja,
      summary_ja: p.summary_ja,
      title_en: p.title_en || c.title,
      summary_en: p.summary_en || "",
      source: p.source || c.source,
      /* 出典は原語のまま持ち、英語版の表示ぶんを別に添える（js/news.js が使い分ける）。
         元記事の題は原題そのまま。英訳が取れなければ英語の見出しで代用する。 */
      source_title: c.title || p.title_en,
      source_en: p.source_en || p.source || c.source,
      source_title_en: p.source_title_en || p.title_en || c.title,
      url: c.url
    });
    console.log(`  + [${p.category}] ${p.title_ja}`);
  }

  if (!added.length) { console.log("載せる価値のあるものはありませんでした。"); return; }

  const items = [...added, ...news.items]
    .sort((a, b) => String(b.date).localeCompare(String(a.date)))
    .slice(0, MAX_ITEMS);
  writeNews({ updated: TODAY, items });
  console.log(`\ndata/news.js を更新しました（${added.length}件追加 / 合計${items.length}件 / 更新日 ${TODAY}）`);
})().catch(e => { console.error("\n失敗しました: " + (e.stack || e.message || e)); process.exit(1); });
