/* ============================================================
   葉巻大辞典 — ヒュミドール在庫管理（記録ノート内）
   持っている葉巻の在庫を、購入日・熟成期間つきで管理する。
   この端末（localStorage）に保存。
   ============================================================ */
const STOCK = (() => {
  const KEY = "cigar_stock_v1";
  const q = (s) => document.querySelector(s);
  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  let items = [];
  const visionOn = typeof VISION !== "undefined" && VISION.enabled;   // 写真からのAI自動入力
  let aiBusy = false;
  /* AIが読み取った産地・サイズ。在庫フォームには欄が無いが、
     在庫に持たせておくと「🔥 吸う」で記録フォームへそのまま引き継げる。 */
  let aiMeta = { country: "", vitola: "" };

  function load() {
    try { items = JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { items = []; }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) { alert("在庫を保存できませんでした。"); }
  }
  function uid() { return "s" + Date.now().toString(36) + Math.floor(Math.random() * 1e5).toString(36); }
  function todayStr() {
    const d = new Date(), p = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
  }
  // 購入日からの熟成期間の表示（◯ヶ月 / ◯年◯ヶ月）
  function agingLabel(dateStr) {
    if (!dateStr) return "";
    const from = new Date(dateStr + "T12:00");
    if (isNaN(from)) return "";
    const now = new Date();
    let months = (now.getFullYear() - from.getFullYear()) * 12 + (now.getMonth() - from.getMonth());
    if (now.getDate() < from.getDate()) months--;
    if (months < 0) months = 0;
    if (months < 1) return "熟成 1ヶ月未満";
    if (months < 12) return `熟成 ${months}ヶ月`;
    return `熟成 ${Math.floor(months / 12)}年${months % 12 ? months % 12 + "ヶ月" : ""}`;
  }

  function render() {
    const body = q("#stockBody");
    const cnt = q("#stockCount");
    if (!body) return;
    const totalQty = items.reduce((s, it) => s + (Number(it.qty) || 0), 0);
    if (cnt) cnt.textContent = `${totalQty} 本`;
    const rows = items.map(it => `
      <div class="stk-row">
        <div class="stk-main">
          <div class="stk-name">${esc(it.name)}${it.brand ? `<span class="stk-brand">${esc(it.brand)}</span>` : ""}</div>
          <div class="stk-sub">${it.date ? `購入 ${esc(it.date)} · <b>${esc(agingLabel(it.date))}</b>` : ""}${it.price ? ` · ¥${Number(it.price).toLocaleString()}/本` : ""}</div>
        </div>
        <div class="stk-qty">
          <button type="button" class="stk-btn" data-sdec="${it.id}" title="1本減らす">−</button>
          <span class="stk-n">${Number(it.qty) || 0}</span>
          <button type="button" class="stk-btn" data-sinc="${it.id}" title="1本増やす">＋</button>
        </div>
        <div class="stk-acts">
          <button type="button" class="btn btn-sm btn-ghost" data-ssmoke="${it.id}">🔥 吸う</button>
          <button type="button" class="btn btn-sm btn-danger" data-sdel="${it.id}">削除</button>
        </div>
      </div>`).join("");
    body.innerHTML = `
      ${items.length ? `<div class="stk-list">${rows}</div>` : `<p class="photo-hint" style="margin:10px 0">在庫はまだありません。買った葉巻を登録しておくと、熟成期間がひと目で分かります。</p>`}
      <div class="stk-form">
        ${visionOn ? `
        <div class="stk-ai">
          <button type="button" class="btn btn-sm btn-ghost" id="stkPhotoBtn">📷 写真から自動入力</button>
          <input type="file" id="stkPhoto" accept="image/*" hidden>
          <span class="stk-ai-status" id="stkAiStatus"></span>
        </div>` : ""}
        <input type="text" id="stkName" placeholder="銘柄名（例：モンテクリスト No.4）">
        <input type="text" id="stkBrand" placeholder="ブランド（任意）">
        <input type="number" id="stkQty" min="1" value="1" title="本数">
        <input type="date" id="stkDate" value="${todayStr()}" title="購入日">
        <input type="number" id="stkPrice" min="0" placeholder="1本の価格（任意）">
        <button type="button" class="btn btn-sm btn-primary" id="stkAdd">＋ 在庫に追加</button>
      </div>
      <div class="photo-hint">${visionOn ? "箱やバンドの写真を選ぶと、銘柄名とブランドをAIが読み取って入れます（入力済みの欄は上書きしません）。<br>" : ""}「🔥 吸う」で在庫が1本減り、記録ノートのフォームが銘柄入りで開きます。</div>`;
    wire();
  }

  /* ---------- 写真からのAI自動入力 ----------
     記録ノートと同じ画像認識（VISION）を使う。
     読み取れた項目のうち、まだ空欄のものだけを埋める（入力済みは尊重する）。 */
  function setAiStatus(kind, msg) {
    const el = q("#stkAiStatus");
    if (!el) return;
    el.className = "stk-ai-status" + (kind ? " " + kind : "");
    el.textContent = msg || "";
  }
  /* ブランド一覧を手がかりとして渡すと、表記ゆれが減る */
  function brandHints() {
    try {
      const out = [];
      Object.keys(BRANDS_DATA || {}).forEach(k =>
        (BRANDS_DATA[k] || []).forEach(b => { if (b.kind !== "leaf") { out.push(b.ja); out.push(b.en); } }));
      return out.filter(Boolean).slice(0, 400);
    } catch (e) { return []; }
  }
  async function runStockVision(file) {
    if (!visionOn || aiBusy || !file) return;
    const btn = q("#stkPhotoBtn");
    aiBusy = true;
    if (btn) btn.disabled = true;
    setAiStatus("loading", "AIが写真を読み取っています…（数秒かかります）");
    try {
      const src = await NOTE.resizeImage(file);
      const hints = {
        countries: ((typeof CIGAR_DATA !== "undefined" && CIGAR_DATA.countries) || []).map(c => c.name_ja),
        vitolas: ((typeof CIGAR_DATA !== "undefined" && CIGAR_DATA.vitolas) || []).map(v => v.ja),
        brands: brandHints()
      };
      const r = await VISION.identify(src, hints);
      const filled = [];
      const put = (sel, val, label) => {
        const el = q(sel);
        if (el && val && !el.value.trim()) { el.value = val; filled.push(label); }
      };
      put("#stkName", r.name, "銘柄名");
      put("#stkBrand", r.brand, "ブランド");
      aiMeta = { country: r.country || "", vitola: r.vitola || "" };
      if (!filled.length) {
        setAiStatus("warn", r.band_readable === false
          ? "バンドの文字が読み取れませんでした。明るく正面から撮り直すか、手で入力してください。"
          : "新しく入れられる項目がありませんでした（すでに入力済みのようです）。");
      } else {
        const low = r.confidence === "low";
        setAiStatus(low ? "warn" : "ok",
          `✓ ${low ? "自信は高くありませんが、" : ""}${filled.join("・")}を入力しました。ご確認ください。`);
      }
    } catch (err) {
      setAiStatus("error", "読み取れませんでした：" + (err && err.message || "エラー"));
    } finally {
      aiBusy = false;
      if (btn) btn.disabled = false;
    }
  }

  /* 描画のたびに作り直される要素（フォームのボタン類）だけをつなぐ。
     一覧のクリック監視は #stockBody 自身に付けるが、この要素は innerHTML の
     置き換えでは消えないので、ここで付けると描画のたびに監視が積み上がり、
     1回のクリックで何度も処理が走ってしまう。監視は init() で一度だけ付ける。 */
  function wire() {
    const pbtn = q("#stkPhotoBtn"), pfile = q("#stkPhoto");
    if (pbtn && pfile) {
      pbtn.addEventListener("click", () => pfile.click());
      pfile.addEventListener("change", () => {
        const f = pfile.files && pfile.files[0];
        pfile.value = "";                       // 同じ写真を選び直せるように
        if (f && f.type.startsWith("image/")) runStockVision(f);
      });
    }
    q("#stkAdd").addEventListener("click", () => {
      const name = q("#stkName").value.trim();
      if (!name) { q("#stkName").focus(); return; }
      items.unshift({
        id: uid(), name, brand: q("#stkBrand").value.trim(),
        qty: Math.max(1, Number(q("#stkQty").value) || 1),
        date: q("#stkDate").value || todayStr(),
        price: Number(q("#stkPrice").value) || null,
        country: aiMeta.country || "", vitola: aiMeta.vitola || ""
      });
      aiMeta = { country: "", vitola: "" };   // 次の登録に持ち越さない
      save(); render();
    });
  }

  /* 一覧のクリック処理。#stockBody に一度だけ付ける（init から呼ぶ） */
  function wireList() {
    const body = q("#stockBody");
    if (!body || body.dataset.wired === "1") return;
    body.dataset.wired = "1";
    body.addEventListener("click", (e) => {
      const inc = e.target.closest("[data-sinc]");
      const dec = e.target.closest("[data-sdec]");
      const del = e.target.closest("[data-sdel]");
      const smk = e.target.closest("[data-ssmoke]");
      if (inc) { const it = items.find(x => x.id === inc.dataset.sinc); if (it) { it.qty = (Number(it.qty) || 0) + 1; save(); render(); } }
      if (dec) { const it = items.find(x => x.id === dec.dataset.sdec); if (it) { it.qty = Math.max(0, (Number(it.qty) || 0) - 1); save(); render(); } }
      if (del) {
        const it = items.find(x => x.id === del.dataset.sdel);
        if (it && confirm(`「${it.name}」を在庫から削除しますか？`)) { items = items.filter(x => x.id !== it.id); save(); render(); }
      }
      if (smk) {
        const it = items.find(x => x.id === smk.dataset.ssmoke);
        if (!it) return;
        it.qty = Math.max(0, (Number(it.qty) || 0) - 1);
        save(); render();
        if (typeof NOTE !== "undefined" && NOTE.prefillNew) {
          NOTE.prefillNew({
            name: it.name, brand: it.brand || "",
            country: it.country || "", vitola: it.vitola || "",
            price: it.price || null
          });
        }
      }
    });
  }

  function init() {
    if (!q("#stockPanel")) return;
    load();
    wireList();     // 一覧のクリック監視は最初に一度だけ
    render();
  }

  document.addEventListener("DOMContentLoaded", init);
  return { init };
})();
