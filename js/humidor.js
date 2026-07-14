/* ============================================================
   葉巻大辞典 — ヒュミドール大全レンダリング
   5サブセクション（歴史・メーカー・使い方・種類・価格）
   ============================================================ */

const HUMIDOR = (() => {
  const H = HUMIDOR_DATA;
  const qh = (s, el = document) => el.querySelector(s);
  const e = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const paras = (t) => FMT.prose(t);  // 改行・【】見出し・長文を読みやすい段落に
  const block = (title, inner, count) =>
    `<div class="kb-block"><h3>${e(title)}${count ? `<span class="data-count">${e(count)}</span>` : ""}</h3>${inner}</div>`;

  /* ---------- 1. 歴史 ---------- */
  function history() {
    const tl = `<div class="htimeline">${H.historyTimeline.map(t => `
      <div class="ht-item">
        <div class="ht-y">${e(t.y)}</div>
        <div class="ht-t">${e(t.t)}</div>
      </div>`).join("")}</div>`;
    return block("ヒュミドールの歴史", `<div class="prose">${paras(H.history)}</div>`)
      + block("簡易年表", tl, `${H.historyTimeline.length}項目`);
  }

  /* ---------- 2. メーカー・ブランド ---------- */
  function brands() {
    return block("世界のヒュミドールメーカー・ブランド", `<div class="prose">${paras(H.brands)}</div>`);
  }

  /* ---------- 3. 使い方・メンテナンス ---------- */
  function usage() {
    return block("使い方・日常メンテナンス", `<div class="prose">${paras(H.usage)}</div>`);
  }

  /* ---------- 4. 種類・分類 ---------- */
  function types() {
    return block("ヒュミドールの種類・分類", `<div class="prose">${paras(H.types)}</div>`);
  }

  /* ---------- 5. 価格 ---------- */
  function price() {
    return block("価格帯別ガイド", `<div class="prose">${paras(H.price)}</div>`);
  }

  const R = { history, brands, usage, types, price };
  const done = {};

  function showSub(name) {
    if (!R[name]) name = "history";
    if (!done[name]) { qh("#hsub-" + name).innerHTML = R[name](); done[name] = true; }
    document.querySelectorAll("#view-humidor .sub-view").forEach(v => v.classList.remove("active"));
    qh("#hsub-" + name).classList.add("active");
    document.querySelectorAll("#humidorSubnav button").forEach(b =>
      b.classList.toggle("active", b.dataset.hsub === name));
  }

  function init() {
    qh("#humidorSubnav").addEventListener("click", (ev) => {
      const b = ev.target.closest("[data-hsub]");
      if (b) showSub(b.dataset.hsub);
    });
    showSub("history");
  }

  return { init, showSub };
})();
