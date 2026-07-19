/* ============================================================
   葉巻大辞典 — サイズ実寸表示（太さ・サイズ別ページ）
   画面をものさし代わりに、ビトラを実物大で表示する。
   画面の実寸は端末ごとに違うため、クレジットカード（横85.6mm）で
   一度だけ較正（キャリブレーション）してもらう方式。
   ============================================================ */
const REALSIZE = (() => {
  const q = (s) => document.querySelector(s);
  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const KEY = "cigar_pxmm";
  const CARD_MM = 85.6;   // クレジットカードの横幅

  function pxPerMm() {
    const v = Number(localStorage.getItem(KEY));
    return v > 0 ? v : 96 / 25.4;   // 未較正なら CSS 96dpi 相当
  }
  function setPxPerMm(v) { try { localStorage.setItem(KEY, String(v)); } catch (e) {} }

  // "132〜146mm" → 139（中央値）, "42〜44" → 43
  function midNum(s) {
    const m = String(s || "").match(/(\d+(?:\.\d+)?)(?:\s*[〜~-]\s*(\d+(?:\.\d+)?))?/);
    if (!m) return 0;
    return m[2] ? (Number(m[1]) + Number(m[2])) / 2 : Number(m[1]);
  }

  function drawCigar(v) {
    const box = q("#rsCigar");
    if (!box) return;
    const px = pxPerMm();
    const lenMm = midNum(v.len);
    const rgMm = midNum(v.rg) / 64 * 25.4;
    const w = Math.round(lenMm * px);
    const h = Math.max(8, Math.round(rgMm * px));
    box.innerHTML = `
      <div class="rs-scroll">
        <div class="rs-cigar" style="width:${w}px;height:${h}px"><div class="rs-band" style="width:${Math.round(h * .9)}px"></div></div>
      </div>
      <div class="rs-caption"><b>${esc(v.ja)}</b>（${esc(v.en)}）実物大 — 長さ約${Math.round(lenMm)}mm × 直径約${rgMm.toFixed(1)}mm（RG ${esc(v.rg)}）</div>
      <div class="photo-hint">画面が小さい場合は横にスクロールできます。手持ちの葉巻と重ねて比べてみてください。</div>`;
  }

  function calibBar() {
    const el = q("#rsCard");
    if (el) el.style.width = (CARD_MM * pxPerMm()) + "px";
    const lbl = q("#rsCalVal");
    if (lbl) lbl.textContent = pxPerMm().toFixed(2) + " px/mm";
  }

  function init() {
    const root = q("#realSizeBox");
    if (!root || typeof CIGAR_DATA === "undefined") return;
    const vitolas = CIGAR_DATA.vitolas || [];
    if (!vitolas.length) return;
    root.innerHTML = `
      <h3>実物大で見る（画面ものさし）</h3>
      <p class="prose" style="margin-bottom:12px">選んだビトラを<b>実物大</b>で画面に表示します。正確に表示するには、最初に一度だけ「ものさし合わせ」をしてください。</p>
      <details class="acc rs-cal">
        <summary>📐 ものさし合わせ（最初に一度だけ）</summary>
        <div class="acc-body">
          <p>クレジットカード（またはICカード）を下の枠に<b>横向きに重ね</b>、スライダーで枠の幅をカードのサイズにピッタリ合わせてください。</p>
          <div class="rs-cardbox"><div class="rs-card" id="rsCard">クレジットカード（横 85.6mm）</div></div>
          <input type="range" id="rsCal" min="2" max="10" step="0.02" style="width:100%">
          <div class="photo-hint">現在の設定：<span id="rsCalVal"></span>（この端末に記憶されます）</div>
        </div>
      </details>
      <div class="rs-picker">${vitolas.map((v, i) => `<button type="button" class="chip rs-pick${i === 0 ? " on" : ""}" data-rs="${i}">${esc(v.ja)}</button>`).join("")}</div>
      <div id="rsCigar"></div>`;

    const slider = q("#rsCal");
    slider.value = pxPerMm();
    calibBar();
    let selected = 0;
    slider.addEventListener("input", () => {
      setPxPerMm(Number(slider.value));
      calibBar();
      drawCigar(vitolas[selected]);
    });
    root.querySelectorAll("[data-rs]").forEach(btn => {
      btn.addEventListener("click", () => {
        selected = Number(btn.dataset.rs);
        root.querySelectorAll(".rs-pick").forEach(b => b.classList.toggle("on", b === btn));
        drawCigar(vitolas[selected]);
      });
    });
    drawCigar(vitolas[0]);
  }

  document.addEventListener("DOMContentLoaded", init);
  return { init };
})();
