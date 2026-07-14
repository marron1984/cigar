/* ============================================================
   葉巻大辞典 — ブランド大全レンダリング
   国別の銘柄（マルカ）を検索付きアコーディオン一覧で表示
   ============================================================ */
const BRANDS = (() => {
  const B = BRANDS_DATA;
  const q = (s, el = document) => el.querySelector(s);
  const qa = (s, el = document) => [...el.querySelectorAll(s)];
  const e = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  /* 収録国の定義（タブ表示順） */
  const COUNTRIES = [
    { key: "cuba", elId: "brandsCuba",
      intro: (n) => `現行ハバノス（Habanos S.A.）ポートフォリオの全${n}マルカを、創業からの歴史とともに収録。銘柄名で絞り込みできます。` },
    { key: "dominican", elId: "brandsDominican",
      intro: (n) => `世界最大級の高級葉巻生産国ドミニカ共和国の主要${n}ブランドを、創業からの歴史とともに収録。銘柄名で絞り込みできます。` },
    { key: "nicaragua", elId: "brandsNicaragua",
      intro: (n) => `近年最も評価を高めている生産国ニカラグアの主要${n}ブランドを、創業からの歴史とともに収録。銘柄名で絞り込みできます。` },
    { key: "honduras", elId: "brandsHonduras",
      intro: (n) => `伝統の葉巻生産国ホンジュラスの主要${n}ブランドを、創業からの歴史とともに収録。銘柄名で絞り込みできます。` },
  ];

  function specRow(k, en, v) {
    if (!v) return "";
    return `<div class="spec-row"><div class="k">${e(k)}<span class="en">${e(en)}</span></div><div class="v">${e(v)}</div></div>`;
  }

  // 「1966」→「1966年」／「1880年代」「1901/1902」「〜頃」などはそのまま表示
  function foundedLabel(f) {
    const s = String(f || "").trim();
    return /^\d{4}$/.test(s) ? s + "年" : s;
  }

  function brandAcc(b) {
    const vitolas = (b.vitolas || []).map(v => `<span class="chip brand">${e(v)}</span>`).join("");
    return `
      <details class="acc brand-entry" data-search="${e((b.ja + " " + b.en).toLowerCase())}">
        <summary>${e(b.ja)} — ${e(b.en)}<span class="tag">${e(foundedLabel(b.founded))}</span></summary>
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

  function renderCountry(cfg) {
    const el = q("#" + cfg.elId);
    if (!el) return;
    const list = [...(B[cfg.key] || [])].sort((a, b2) => (a.order || 0) - (b2.order || 0));
    if (!list.length) {
      el.innerHTML = `<div class="cd-placeholder">ブランド情報を準備中です。</div>`;
      return;
    }
    const searchId = `brandSearch-${cfg.key}`;
    const listId = `brandList-${cfg.key}`;
    el.innerHTML = `
      <p class="prose" style="margin-bottom:14px">${e(cfg.intro(list.length))}</p>
      <input type="text" class="note-search lex-search" id="${searchId}" placeholder="銘柄名で検索（例：コイーバ、Fuente…）">
      <div id="${listId}">${list.map(brandAcc).join("")}</div>`;

    q("#" + searchId).addEventListener("input", (ev) => {
      const term = ev.target.value.trim().toLowerCase();
      qa(`#${listId} .brand-entry`).forEach(d => {
        d.style.display = !term || d.dataset.search.includes(term) ? "" : "none";
      });
    });
  }

  function initSubnav() {
    const nav = q("#brandsSubnav");
    if (!nav) return;
    nav.addEventListener("click", (ev) => {
      const btn = ev.target.closest("[data-bsub]");
      if (!btn) return;
      qa("#brandsSubnav button").forEach(x => x.classList.toggle("active", x === btn));
      COUNTRIES.forEach(cfg => {
        const el = q("#" + cfg.elId);
        if (el) el.classList.toggle("active", cfg.key === btn.dataset.bsub);
      });
    });
  }

  function init() {
    COUNTRIES.forEach(renderCountry);
    initSubnav();
  }

  return { init };
})();
