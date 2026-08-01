/* ============================================================
   葉巻大辞典 — 葉巻ニュース
   海外一次ソース（英語）のニュースを日本語に翻訳・要約して表示。
   データは data/news.js（NEWS_DATA）。
   ============================================================ */
const NEWS = (() => {
  const q = (s) => document.querySelector(s);
  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  let filter = "all";

  // "2026-06-15" → "2026.6.15"、"2026-06" → "2026.6"
  function fmtDate(d) {
    const m = /^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(d || "");
    if (!m) return d || "";
    return m[3] ? `${m[1]}.${Number(m[2])}.${Number(m[3])}` : `${m[1]}.${Number(m[2])}`;
  }
  // 並べ替え用（月のみの日付は月末扱いで安定ソート）
  function sortKey(d) {
    const m = /^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(d || "");
    if (!m) return "0000-00-00";
    return `${m[1]}-${m[2]}-${m[3] || "28"}`;
  }

  function render() {
    const root = q("#newsRoot");
    if (!root) return;
    if (typeof NEWS_DATA === "undefined" || !Array.isArray(NEWS_DATA.items) || !NEWS_DATA.items.length) {
      root.innerHTML = `<div class="cd-placeholder">ニュースを準備中です。</div>`;
      return;
    }
    const cats = [...new Set(NEWS_DATA.items.map(n => n.category).filter(Boolean))];
    const items = NEWS_DATA.items
      .filter(n => filter === "all" || n.category === filter)
      .slice()
      .sort((a, b) => sortKey(b.date).localeCompare(sortKey(a.date)));

    root.innerHTML = `
      <div class="jp-meta">
        <span class="jp-updated">最終更新：${esc(NEWS_DATA.updated || "")}</span>
        <span class="jp-count">${NEWS_DATA.items.length}件掲載</span>
      </div>
      <div class="callout news-note">海外ニュースは英語の一次ソースをAIが翻訳・要約したもの、日本国内ニュースは国内ソースを要約したものです。正確な内容・最新の情報は、各記事の元記事リンクでご確認ください。掲載内容は最終更新時点の情報です（毎週自動更新）。</div>
      <div class="news-filter">
        <button type="button" class="chip nf${filter === "all" ? " on" : ""}" data-nf="all">すべて</button>
        ${cats.map(c => `<button type="button" class="chip nf${filter === c ? " on" : ""}" data-nf="${esc(c)}">${esc(c)}</button>`).join("")}
      </div>
      <div class="news-list">${items.map(n => `
        <article class="news-card">
          <div class="news-top">
            <span class="news-date">${esc(fmtDate(n.date))}</span>
            <span class="news-cat">${esc(n.category || "")}</span>
          </div>
          <h3 class="news-title">${esc(n.title_ja)}</h3>
          <p class="news-sum">${esc(n.summary_ja)}</p>
          <div class="news-src">出典：${esc(n.source || "")}${n.source_title ? `「${esc(n.source_title)}」` : ""}
            ${n.url ? `<a href="${esc(n.url)}" target="_blank" rel="noopener">${n.category === "日本国内" ? "元記事を読む →" : "原文を読む（英語）→"}</a>` : ""}
          </div>
        </article>`).join("")}
      </div>`;

    root.querySelectorAll("[data-nf]").forEach(btn =>
      btn.addEventListener("click", () => { filter = btn.dataset.nf; render(); }));
  }

  /* 描画は data/news.js を読み終えてから（js/app.js の ensureView が呼ぶ）。
     起動時に描画すると、ニュースを開いていないのにデータを待つことになる。 */
  function init() { render(); }
  return { init, render };
})();
