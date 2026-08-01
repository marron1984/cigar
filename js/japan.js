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

  /* ---------- 英語版の差し替えデータ ----------
     店名・住所にあたる情報は日本語のまま残す（現地で店を探すのに要るため）。
     説明文・エリア・業態・営業状況だけを英語に差し替える。
     data/en/japan_shops.js が読み込まれているときだけ効く。
     この差し替えは日本ガイドを開いたときに読み込まれるので、
     読み込みより前に固定してしまわないよう、使うたびに見に行く。 */
  const en = () => ((typeof JAPAN_EN !== "undefined" && I18N.isEn) ? JAPAN_EN : null);
  const enShop = (code, name) => { const E = en(); return (E && E.shops && E.shops[code + "|" + name]) || null; };
  const enPick = (map, v) => (map && map[v]) || v;
  const enMap = (key) => { const E = en(); return E ? E[key] : null; };

  function statusBadge(st) {
    const s = String(st || "");
    const cls = /閉店|終了|廃止|不可|中止/.test(s) ? "closed" : /移転/.test(s) ? "moved" : /要確認/.test(s) ? "check" : "open";
    return `<span class="shop-status ${cls}">${e(enPick(enMap("statuses"), s) || T("要確認"))}</span>`;
  }

  function shopCard(s, code) {
    const t = enShop(code, s.name) || {};
    const src = Array.isArray(s.sources) && s.sources.length
      ? `<div class="sh-src">${s.sources.map(x => `<span>${link(x)}</span>`).join("")}</div>` : "";
    return `<div class="shop-card jp-shop">
      <div class="sh-head"><div class="sh-name">${e(s.name)}</div>${statusBadge(s.status)}</div>
      <div class="sh-meta"><span class="sh-type">${e(enPick(enMap("types"), s.type))}</span><span class="sh-area">${e(t.area || s.area)}</span></div>
      ${(t.desc || s.desc) ? `<div class="sh-desc">${e(t.desc || s.desc)}</div>` : ""}
      ${(t.note || s.note) ? `<div class="sh-note">${e(t.note || s.note)}</div>` : ""}
      ${src}
    </div>`;
  }

  function prefBlock(p) {
    const shops = Array.isArray(p.shops) ? p.shops : [];
    const openN = shops.filter(s => !/閉店|移転/.test(String(s.status))).length;
    const enNotes = enMap("prefNotes");
    const prefNote = (enNotes && enNotes[p.code]) || p.prefNote;
    /* 検索は日本語・英語どちらの語でも当たるようにする */
    const search = shops.map(s => {
      const t = enShop(p.code, s.name) || {};
      return `${s.name} ${s.area} ${t.area || ""} ${s.type} ${enPick(enMap("types"), s.type)} ${s.status}`;
    }).join(" ").toLowerCase();
    const prefName = I18N.isEn && p.pref_en ? p.pref_en : p.pref;
    const body = shops.length
      ? `<div class="shop-grid">${shops.map(s => shopCard(s, p.code)).join("")}</div>`
      : `<div class="callout">${e(prefNote || T("公開情報では確認できませんでした。"))}</div>`;
    const note = shops.length && prefNote ? `<div class="pref-note">${e(prefNote)}</div>` : "";
    return `<details class="acc pref-acc" data-search="${e(search + " " + prefName)}" data-count="${shops.length}">
      <summary><span class="pref-name">${e(prefName)}</span>
        <span class="pref-count">${shops.length ? T("{n}軒", { n: openN }) : "—"}</span></summary>
      <div class="acc-body">${note}${body}</div>
    </details>`;
  }

  function directory() {
    const D = (typeof JAPAN_GUIDE_DATA !== "undefined") ? JAPAN_GUIDE_DATA : null;
    if (!D || !Array.isArray(D.regions) || !D.regions.length) {
      return `<div class="kb-block"><h3>${e(T("全国の葉巻販売店・シガーバー"))}</h3>
        <div class="callout">${e(T("全国一覧はただいま調査・整備中です。"))}</div></div>`;
    }
    let totalShops = 0, totalClosed = 0;
    D.regions.forEach(r => (r.prefectures || []).forEach(p => {
      const sh = p.shops || []; totalShops += sh.length;
      totalClosed += sh.filter(s => /閉店/.test(String(s.status))).length;
    }));
    const regions = D.regions.map(r => `
      <div class="jp-region">
        <h4 class="jp-region-h">${e(enPick(enMap("regions"), r.region))}</h4>
        ${(r.prefectures || []).map(prefBlock).join("")}
      </div>`).join("");
    return `<div class="kb-block jp-directory">
      <h3>${e(T("全国の葉巻販売店・シガーバー"))}</h3>
      <div class="jp-meta">
        <span class="data-count">${T("{n}件", { n: totalShops })}</span>
        <span class="jp-updated">${e(T("情報更新日：{date}", { date: D.updated || "" }))}</span>
      </div>
      <div class="callout warn">${T("掲載情報は公開情報（各店公式・食べログ・正規取扱店リスト・報道等）をもとにした<b>{date}時点の目安</b>です。営業状況・移転・閉店・品揃え・喫煙可否・持込ルールは変わりやすいため、<b>来店前に必ず各店の公式・電話で最新情報をご確認ください</b>。「要確認」表示は特にご注意を。閉店が判明した店も記録として残しています。", { date: e(D.updated || "") })}</div>
      <input type="text" class="note-search lex-search" id="jpSearch" placeholder="${e(T("店名・エリア・都道府県で検索（例：銀座、シガーバー…）"))}">
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

  /* 訪日外国人向けの実用ガイド（英語版専用）。
     data/en/japan_visitor.js が読み込まれているときだけ、一覧の前に出す。
     定価制・キューバ産の合法性・免税範囲など「まず知るべき要点」を出典つきで。 */
  function visitorSection() {
    if (!I18N.isEn || typeof JAPAN_VISITOR === "undefined") return "";
    const V = JAPAN_VISITOR;
    const topics = (V.topics || []).map((t, i) => `
      <details class="acc"${i === 0 ? " open" : ""}>
        <summary>${e(t.h)}</summary>
        <div class="acc-body">${FMT.prose(t.body)}</div>
      </details>`).join("");
    const src = (V.sources || []).length ? `
      <div class="brand-refs" style="margin-top:14px"><div class="brand-refs-h">Sources <span class="brand-refs-n">${V.sources.length}</span></div>
      <ol>${V.sources.map(x => `<li>${link(x)}</li>`).join("")}</ol></div>` : "";
    return `<div class="kb-block jp-visitor">
      <h3>${e(V.title)}</h3>
      <div class="prose" style="margin-bottom:12px">${FMT.prose(V.lead)}</div>
      ${topics}${src}
    </div>`;
  }

  function init() {
    const host = q("#japanGuide");
    if (!host) return;
    const guide = (typeof WORLD !== "undefined" && WORLD.japanGuideHTML) ? WORLD.japanGuideHTML() : "";
    host.innerHTML = visitorSection() + directory() + (guide ? `<div class="jp-guide">${guide}</div>` : "");
    wireSearch();
  }

  return { init };
})();
