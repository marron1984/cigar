/* ============================================================
   葉巻大辞典 — 横断検索（ホームの検索窓）
   ブランド大全・産地・ビトラ・用語大全をまとめて検索する。
   ============================================================ */
const SEARCH = (() => {
  const q = (s) => document.querySelector(s);
  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  const COUNTRY_JA = {
    cuba: "キューバ", dominican: "ドミニカ共和国", nicaragua: "ニカラグア", honduras: "ホンジュラス",
    mexico: "メキシコ", ecuador: "エクアドル", usa: "アメリカ", brazil: "ブラジル", cameroon: "カメルーン",
    peru: "ペルー", colombia: "コロンビア", philippines: "フィリピン", indonesia: "インドネシア", argentina: "アルゼンチン"
  };

  let index = null;
  function buildIndex() {
    if (index) return index;
    index = [];
    // ブランド大全（全産地）
    try {
      Object.keys(BRANDS_DATA).forEach(key => {
        (BRANDS_DATA[key] || []).forEach(b => {
          index.push({
            type: "brand", icon: "🏷", label: `${b.ja} — ${b.en}`, sub: COUNTRY_JA[key] || key,
            hay: `${b.ja} ${b.en}`.toLowerCase(),
            go: () => { if (typeof openBrandInBrands === "function") openBrandInBrands(key, b.en, b.ja); }
          });
        });
      });
    } catch (e) {}
    // 産地
    try {
      (CIGAR_DATA.countries || []).forEach((c, i) => {
        index.push({
          type: "country", icon: "🌍", label: c.name_ja, sub: "国・産地別",
          hay: `${c.name_ja} ${c.name_en}`.toLowerCase(),
          go: () => {
            showView("countries");
            setTimeout(() => {
              const btn = document.querySelector(`#countryNav [data-country="${i}"]`);
              if (btn) btn.click();
            }, 120);
          }
        });
      });
    } catch (e) {}
    // ビトラ（サイズ）
    try {
      (CIGAR_DATA.vitolas || []).forEach(v => {
        index.push({
          type: "vitola", icon: "📏", label: `${v.ja}（${v.en}）`, sub: `太さ・サイズ別 · ${v.len} / RG${v.rg}`,
          hay: `${v.ja} ${v.en}`.toLowerCase(),
          go: () => showView("sizes")
        });
      });
    } catch (e) {}
    // 用語大全（説明をその場で表示）
    try {
      (WORLD_DATA.lexicon || []).forEach(t => {
        index.push({
          type: "term", icon: "📖", label: `${t.ja}${t.es ? "（" + t.es + "）" : ""}`, sub: t.desc,
          hay: `${t.ja} ${t.es || ""} ${t.en || ""} ${t.desc}`.toLowerCase(),
          go: null   // 説明を表示するだけ（タップ不要）
        });
      });
    } catch (e) {}
    return index;
  }

  function search(term) {
    const t = term.trim().toLowerCase();
    if (!t) return [];
    const list = buildIndex();
    // 名前一致を優先し、説明文一致を後ろに
    const starts = [], includes = [];
    for (const item of list) {
      const pos = item.hay.indexOf(t);
      if (pos < 0) continue;
      (pos === 0 ? starts : includes).push(item);
      if (starts.length + includes.length >= 60) break;
    }
    return [...starts, ...includes].slice(0, 12);
  }

  function render(results, term) {
    const box = q("#gsResults");
    if (!box) return;
    if (!term.trim()) { box.hidden = true; box.innerHTML = ""; return; }
    box.hidden = false;
    if (!results.length) {
      box.innerHTML = `<div class="gs-empty">「${esc(term)}」に一致するものは見つかりませんでした。</div>`;
      return;
    }
    box.innerHTML = results.map((r, i) => `
      <button type="button" class="gs-item${r.go ? "" : " gs-static"}" data-gs="${i}">
        <span class="gs-ico">${r.icon}</span>
        <span class="gs-txt"><span class="gs-label">${esc(r.label)}</span><span class="gs-sub">${esc(r.sub)}</span></span>
        ${r.go ? `<span class="gs-go">›</span>` : ""}
      </button>`).join("");
    box.querySelectorAll("[data-gs]").forEach(btn => {
      btn.addEventListener("click", () => {
        const r = results[Number(btn.dataset.gs)];
        if (r && r.go) { r.go(); hide(); }
      });
    });
  }
  function hide() {
    const box = q("#gsResults");
    if (box) { box.hidden = true; }
  }

  function init() {
    const inp = q("#gsInput");
    if (!inp) return;
    let timer = null;
    inp.addEventListener("input", () => {
      clearTimeout(timer);
      timer = setTimeout(() => render(search(inp.value), inp.value), 160);
    });
    inp.addEventListener("focus", () => { if (inp.value.trim()) render(search(inp.value), inp.value); });
    document.addEventListener("click", (e) => {
      if (!e.target.closest("#globalSearch")) hide();
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") hide(); });
  }

  document.addEventListener("DOMContentLoaded", init);
  return { init };
})();
