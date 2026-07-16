/* ============================================================
   Cigar Cafe — 日本ガイド
   全国47都道府県の葉巻販売店・シガーバー一覧（出典・閉店情報付き）＋
   世界編から昇格した日本ガイド解説（歴史・税制・環境・マナー等）。
   ============================================================ */
const JAPAN = (() => {
  const q = (s, el = document) => el.querySelector(s);
  const qa = (s, el = document) => [...el.querySelectorAll(s)];
  const e = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  // URLをリンク化（それ以外はエスケープ）
  const link = (s) => String(s).split(/(https?:\/\/[^\s、，）)]+)/g)
    .map((p, i) => i % 2 ? `<a href="${e(p)}" target="_blank" rel="noopener">${e(p)}</a>` : e(p)).join("");

  function statusBadge(st) {
    const s = String(st || "");
    const cls = /閉店|終了|廃止|不可|中止/.test(s) ? "closed" : /移転/.test(s) ? "moved" : /要確認/.test(s) ? "check" : "open";
    return `<span class="shop-status ${cls}">${e(s || "要確認")}</span>`;
  }

  function shopCard(s) {
    const src = Array.isArray(s.sources) && s.sources.length
      ? `<div class="sh-src">${s.sources.map(x => `<span>${link(x)}</span>`).join("")}</div>` : "";
    return `<div class="shop-card jp-shop">
      <div class="sh-head"><div class="sh-name">${e(s.name)}</div>${statusBadge(s.status)}</div>
      <div class="sh-meta"><span class="sh-type">${e(s.type)}</span><span class="sh-area">${e(s.area)}</span></div>
      ${s.desc ? `<div class="sh-desc">${e(s.desc)}</div>` : ""}
      ${s.note ? `<div class="sh-note">${e(s.note)}</div>` : ""}
      ${src}
    </div>`;
  }

  function prefBlock(p) {
    const shops = Array.isArray(p.shops) ? p.shops : [];
    const openN = shops.filter(s => !/閉店|移転/.test(String(s.status))).length;
    const search = shops.map(s => `${s.name} ${s.area} ${s.type} ${s.status}`).join(" ").toLowerCase();
    const body = shops.length
      ? `<div class="shop-grid">${shops.map(shopCard).join("")}</div>`
      : `<div class="callout">${e(p.prefNote || "公開情報では確認できませんでした。")}</div>`;
    const note = shops.length && p.prefNote ? `<div class="pref-note">${e(p.prefNote)}</div>` : "";
    return `<details class="acc pref-acc" data-search="${e(search)}" data-count="${shops.length}">
      <summary><span class="pref-name">${e(p.pref)}</span>
        <span class="pref-count">${shops.length ? `${openN}軒` : "—"}</span></summary>
      <div class="acc-body">${note}${body}</div>
    </details>`;
  }

  function directory() {
    const D = (typeof JAPAN_GUIDE_DATA !== "undefined") ? JAPAN_GUIDE_DATA : null;
    if (!D || !Array.isArray(D.regions) || !D.regions.length) {
      return `<div class="kb-block"><h3>全国の葉巻販売店・シガーバー</h3>
        <div class="callout">全国一覧はただいま調査・整備中です。</div></div>`;
    }
    let totalShops = 0, totalClosed = 0;
    D.regions.forEach(r => (r.prefectures || []).forEach(p => {
      const sh = p.shops || []; totalShops += sh.length;
      totalClosed += sh.filter(s => /閉店/.test(String(s.status))).length;
    }));
    const regions = D.regions.map(r => `
      <div class="jp-region">
        <h4 class="jp-region-h">${e(r.region)}</h4>
        ${(r.prefectures || []).map(prefBlock).join("")}
      </div>`).join("");
    return `<div class="kb-block jp-directory">
      <h3>全国の葉巻販売店・シガーバー</h3>
      <div class="jp-meta">
        <span class="data-count">${totalShops}件</span>
        <span class="jp-updated">情報更新日：${e(D.updated || "")}</span>
      </div>
      <div class="callout warn">掲載情報は公開情報（各店公式・食べログ・正規取扱店リスト・報道等）をもとにした<b>${e(D.updated || "")}時点の目安</b>です。営業状況・移転・閉店・品揃え・喫煙可否・持込ルールは変わりやすいため、<b>来店前に必ず各店の公式・電話で最新情報をご確認ください</b>。「要確認」表示は特にご注意を。閉店が判明した店も記録として残しています。</div>
      <input type="text" class="note-search lex-search" id="jpSearch" placeholder="店名・エリア・都道府県で検索（例：銀座、シガーバー…）">
      <div id="jpRegions">${regions}</div>
    </div>`;
  }

  function wireSearch() {
    const inp = q("#jpSearch");
    if (!inp) return;
    inp.addEventListener("input", (ev) => {
      const term = ev.target.value.trim().toLowerCase();
      qa("#jpRegions .pref-acc").forEach(d => {
        const hit = !term || (d.dataset.search || "").includes(term) || (d.querySelector(".pref-name").textContent.toLowerCase().includes(term));
        d.style.display = hit ? "" : "none";
        if (term && hit && Number(d.dataset.count) > 0) d.open = true;
        if (!term) d.open = false;
      });
      qa("#jpRegions .jp-region").forEach(r => {
        const any = qa(".pref-acc", r).some(d => d.style.display !== "none");
        r.style.display = any ? "" : "none";
      });
    });
  }

  function init() {
    const host = q("#japanGuide");
    if (!host) return;
    const guide = (typeof WORLD !== "undefined" && WORLD.japanGuideHTML) ? WORLD.japanGuideHTML() : "";
    host.innerHTML = directory() + (guide ? `<div class="jp-guide">${guide}</div>` : "");
    wireSearch();
  }

  return { init };
})();
