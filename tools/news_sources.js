/* ============================================================
   Cigar Cafe — ニュースの取得元（RSS）
   ------------------------------------------------------------
   毎日の自動更新（.github/workflows/news-daily.yml → tools/fetch_news.js）が
   ここに並べたフィードを順に見に行く。落ちている・形式が変わった取得元は
   黙って飛ばし、実行ログに「どれが取れてどれが取れなかったか」を残す。

   足したいときはこの配列に1行足すだけでよい。
     name  … 記事に載せる媒体名（そのまま「出典：」に出る）
     url   … RSS/Atom のURL
     lang  … en なら翻訳して要約、ja ならそのまま要約
     note  … 覚え書き（動作には影響しない）
   ============================================================ */
var NEWS_SOURCES = [
  {
    name: "halfwheel",
    url: "https://halfwheel.com/feed/",
    lang: "en",
    note: "業界紙。新製品・企業・規制を日々報じる。要約は100語程度の抜粋つき。"
  },
  {
    name: "Cigar Journal",
    url: "https://www.cigarjournal.com/feed/",
    lang: "en",
    note: "国際誌。アワード（Cigar Trophy）や欧州の動きに強い。"
  },
  {
    name: "Cigar Coop",
    url: "https://cigarcoop.com/feed/",
    lang: "en",
    note: "新製品リリースの拾い上げが早い。"
  },
  {
    name: "Tobacco Business",
    url: "https://tobaccobusiness.com/feed/",
    lang: "en",
    note: "業界ビジネス誌。企業・流通・規制。"
  },
  {
    name: "Developing Palates",
    url: "https://developingpalates.com/feed/",
    lang: "en",
    note: "レビュー中心だがリリース情報も出る。"
  },
  {
    name: "StogiePress",
    url: "https://stogiepress.com/feed/",
    lang: "en",
    note: "ニュース中心。"
  },
  {
    /* 国内はまとまったRSSを出している媒体が見当たらないため、
       Google ニュースの検索フィードで拾う。見出し中心で本文が薄いので、
       要約も見出し相当の短いものになる（無い情報は書かせない）。 */
    name: "（国内報道）",
    url: "https://news.google.com/rss/search?q=%E8%91%89%E5%B7%BB+OR+%E3%82%B7%E3%82%AC%E3%83%BC+when:14d&hl=ja&gl=JP&ceid=JP:ja",
    lang: "ja",
    note: "国内の葉巻関連報道。媒体名は記事タイトル末尾から取る。"
  }
];

if (typeof module !== "undefined") module.exports = NEWS_SOURCES;
