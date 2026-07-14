/* ============================================================
   葉巻大辞典 — ブランド大全レンダリング
   国別の銘柄（マルカ）を検索付きアコーディオン一覧で表示
   ============================================================ */
const BRANDS = (() => {
  const B = BRANDS_DATA;
  const q = (s, el = document) => el.querySelector(s);
  const e = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  function specRow(k, en, v) {
    if (!v) return "";
    return `<div class="spec-row"><div class="k">${e(k)}<span class="en">${e(en)}</span></div><div class="v">${e(v)}</div></div>`;
  }

  function brandAcc(b) {
    const vitolas = (b.vitolas || []).map(v => `<span class="chip brand">${e(v)}</span>`).join("");
    return `
      <details class="acc brand-entry" data-search="${e((b.ja + " " + b.en).toLowerCase())}">
        <summary>${e(b.ja)} — ${e(b.en)}<span class="tag">${e(b.founded)}年</span></summary>
        <div class="acc-body">
          ${specRow("創業・誕生", "Founded", b.founded)}
          ${specRow("創業者・創設主体", "Founder", b.founder)}
          ${specRow("名前の由来", "Name", b.meaning)}
          ${specRow("強さの目安", "Body", b.strength)}
          ${specRow("現在の位置づけ", "Status", b.status)}
          <div class="brand-history">${FMT.prose(b.history)}</div>
          ${vitolas ? `<div class="field"><div class="lbl">代表的なヴィトラ・ライン</div><div class="chips">${vitolas}</div></div>` : ""}
          ${b.trivia ? `<div class="field"><div class="lbl">豆知識</div><div class="val">${FMT.prose(b.trivia)}</div></div>` : ""}
        </div>
      </details>`;
  }

  function renderCuba() {
    const el = q("#brandsCuba");
    if (!el) return;
    const list = [...(B.cuba || [])].sort((a, b2) => (a.order || 0) - (b2.order || 0));
    if (!list.length) {
      el.innerHTML = `<div class="cd-placeholder">ブランド情報を準備中です。</div>`;
      return;
    }
    el.innerHTML = `
      <p class="prose" style="margin-bottom:14px">現行ハバノス（Habanos S.A.）ポートフォリオの全${list.length}マルカを、創業からの歴史とともに収録。銘柄名で絞り込みできます。</p>
      <input type="text" class="note-search lex-search" id="brandSearch" placeholder="銘柄名で検索（例：コイーバ、Partagás…）">
      <div id="brandList">${list.map(brandAcc).join("")}</div>`;

    q("#brandSearch").addEventListener("input", (ev) => {
      const term = ev.target.value.trim().toLowerCase();
      document.querySelectorAll("#brandList .brand-entry").forEach(d => {
        d.style.display = !term || d.dataset.search.includes(term) ? "" : "none";
      });
    });
  }

  function init() {
    renderCuba();
  }

  return { init };
})();
