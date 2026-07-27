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

  /* 熟成の月数（表示用のラベルではなく数値がほしいとき） */
  function agingMonths(dateStr) {
    if (!dateStr) return 0;
    const from = new Date(dateStr + "T12:00");
    if (isNaN(from)) return 0;
    const now = new Date();
    let m = (now.getFullYear() - from.getFullYear()) * 12 + (now.getMonth() - from.getMonth());
    if (now.getDate() < from.getDate()) m--;
    return Math.max(0, m);
  }

  /* 産地ごとの色。ラッパーの色合いを思わせる並びにしている */
  const COUNTRY_TONE = {
    "キューバ": "#8d4f2a", "ドミニカ": "#a9713c", "ドミニカ共和国": "#a9713c",
    "ニカラグア": "#6f3f22", "ホンジュラス": "#b5763a", "メキシコ": "#4a2c18",
    "ブラジル": "#5c3a1e", "エクアドル": "#c08a4e", "アメリカ": "#8a6a45",
    "ペルー": "#7a5230", "コロンビア": "#9c6238", "フィリピン": "#a8814a",
    "インドネシア": "#6b4526", "カメルーン": "#94643a", "アルゼンチン": "#7f5a35",
    "コスタリカ": "#9a7b52", "パナマ": "#87582f", "ジャマイカ": "#b0885a",
    "イタリア": "#6d5233", "産地未設定": "#c9bda8"
  };
  const toneOf = (c) => COUNTRY_TONE[c] || "#8a6a45";

  /* 在庫に付けられる産地。並びは主要生産国から */
  const STOCK_COUNTRIES = [
    "キューバ", "ドミニカ共和国", "ニカラグア", "ホンジュラス", "メキシコ",
    "ブラジル", "エクアドル", "アメリカ", "フィリピン", "インドネシア",
    "カメルーン", "ペルー", "コロンビア", "コスタリカ", "パナマ",
    "ジャマイカ", "イタリア", "その他"
  ];
  /* 既に入っている産地が一覧に無い場合（AIの読み取り結果など）も選択肢として残す */
  function countryOptions(cur) {
    const list = STOCK_COUNTRIES.slice();
    if (cur && !list.includes(cur)) list.unshift(cur);
    return `<option value="">産地未設定</option>` +
      list.map(c => `<option${c === cur ? " selected" : ""}>${esc(c)}</option>`).join("");
  }

  /* 在庫の中身を見える形にする（本数・棚・産地の内訳・熟成の分布） */
  function vizHtml(totalQty) {
    if (!totalQty) return "";
    const kinds = items.filter(it => (Number(it.qty) || 0) > 0).length;
    const value = items.reduce((s, it) => s + (Number(it.price) || 0) * (Number(it.qty) || 0), 0);
    const oldest = items.reduce((m, it) => Math.max(m, agingMonths(it.date)), 0);

    /* 棚：1本ずつ並べる。多いときは上限を設けて残数を添える */
    const MAX_STICKS = 60;
    const sticks = [];
    items.forEach(it => {
      const n = Math.min(Number(it.qty) || 0, MAX_STICKS);
      for (let i = 0; i < n && sticks.length < MAX_STICKS; i++) {
        sticks.push(`<span class="stk-stick" style="--tone:${toneOf(it.country)};--i:${sticks.length}" title="${esc(it.name)}"></span>`);
      }
    });
    const restCount = totalQty - sticks.length;

    /* 産地の内訳 */
    const byCountry = {};
    items.forEach(it => {
      const k = it.country || "産地未設定";
      byCountry[k] = (byCountry[k] || 0) + (Number(it.qty) || 0);
    });
    const cList = Object.entries(byCountry).filter(([, n]) => n > 0).sort((a, b) => b[1] - a[1]);
    const unset = byCountry["産地未設定"] || 0;
    const bar = cList.map(([k, n]) =>
      `<span class="stk-seg" style="width:${(n / totalQty * 100).toFixed(2)}%;background:${toneOf(k)}" title="${esc(k)} ${n}本"></span>`).join("");
    const legend = cList.map(([k, n]) =>
      `<span class="stk-lg"><i style="background:${toneOf(k)}"></i>${esc(k)} <b>${n}</b></span>`).join("");

    /* 熟成の分布 */
    const buckets = [
      { l: "6ヶ月未満", n: 0 }, { l: "6ヶ月〜1年", n: 0 },
      { l: "1〜2年", n: 0 }, { l: "2年以上", n: 0 }
    ];
    items.forEach(it => {
      const m = agingMonths(it.date), n = Number(it.qty) || 0;
      if (!n) return;
      if (m < 6) buckets[0].n += n; else if (m < 12) buckets[1].n += n;
      else if (m < 24) buckets[2].n += n; else buckets[3].n += n;
    });
    const maxB = Math.max(...buckets.map(b => b.n), 1);
    const aging = buckets.map(b => `
      <div class="stk-age">
        <span class="sa-l">${b.l}</span>
        <span class="sa-t"><span class="sa-f" style="width:${(b.n / maxB * 100).toFixed(1)}%"></span></span>
        <span class="sa-n">${b.n}</span>
      </div>`).join("");

    return `
      <div class="stk-viz">
        <div class="stk-figs">
          <div class="sf"><span class="sf-v">${totalQty}</span><span class="sf-l">本</span></div>
          <div class="sf"><span class="sf-v">${kinds}</span><span class="sf-l">銘柄</span></div>
          ${value ? `<div class="sf"><span class="sf-v">¥${value.toLocaleString()}</span><span class="sf-l">在庫金額</span></div>` : ""}
          ${oldest ? `<div class="sf"><span class="sf-v">${oldest < 12 ? oldest + "ヶ月" : Math.floor(oldest / 12) + "年"}</span><span class="sf-l">最長の熟成</span></div>` : ""}
        </div>
        <div class="stk-rack" aria-hidden="true">${sticks.join("")}${restCount > 0 ? `<span class="stk-rest">＋${restCount}</span>` : ""}</div>
        ${cList.length ? `<div class="stk-bar">${bar}</div><div class="stk-legend">${legend}</div>` : ""}
        ${unset ? `
        <div class="stk-fix">
          <span>産地未設定が <b>${unset}本</b> あります。</span>
          <select id="stkFixTo" title="まとめて設定する産地">${countryOptions("")}</select>
          <button type="button" class="btn btn-sm btn-ghost" id="stkFixApply">まとめて設定</button>
        </div>` : ""}
        <div class="stk-aging"><div class="stk-sub-h">熟成の内訳</div>${aging}</div>
      </div>`;
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
          <select class="stk-csel${it.country ? "" : " none"}" data-scountry="${it.id}" title="産地（変えるとグラフに反映されます）">${countryOptions(it.country || "")}</select>
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
      ${vizHtml(totalQty)}
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
        <select id="stkCountry" title="産地">${countryOptions("")}</select>
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
      /* 産地は選択肢に同じものがあるときだけ入れる（未選択のときのみ） */
      const cSel = q("#stkCountry");
      if (cSel && !cSel.value && r.country && [...cSel.options].some(o => o.value === r.country)) {
        cSel.value = r.country; filled.push("産地");
      }
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
        country: q("#stkCountry").value || aiMeta.country || "", vitola: aiMeta.vitola || ""
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
    /* 産地の変更（行ごとのプルダウン） */
    body.addEventListener("change", (e) => {
      const sel = e.target.closest("[data-scountry]");
      if (!sel) return;
      const it = items.find(x => x.id === sel.dataset.scountry);
      if (!it) return;
      it.country = sel.value;
      save(); render();
    });
    body.addEventListener("click", (e) => {
      /* 産地未設定をまとめて設定 */
      if (e.target.closest("#stkFixApply")) {
        const to = (q("#stkFixTo") || {}).value || "";
        if (!to) { const s = q("#stkFixTo"); if (s) s.focus(); return; }
        const target = items.filter(x => !x.country);
        if (!target.length) return;
        const qty = target.reduce((s, x) => s + (Number(x.qty) || 0), 0);
        if (!confirm(`産地未設定の ${target.length}銘柄（${qty}本）を、すべて「${to}」にします。\nよろしいですか？`)) return;
        items.forEach(x => { if (!x.country) x.country = to; });
        save(); render();
        return;
      }
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
