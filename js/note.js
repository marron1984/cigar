/* ============================================================
   葉巻大辞典 — 記録ノート（localStorage）
   吸った葉巻を記録・検索・評価・エクスポート/インポート
   ============================================================ */

const NOTE = (() => {
  const KEY = "cigar_journal_v1";
  const q = (s, el = document) => el.querySelector(s);
  const escN = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

  let entries = [];
  let searchTerm = "";

  /* ---------- 永続化 ---------- */
  function load() {
    try { entries = JSON.parse(localStorage.getItem(KEY)) || []; }
    catch (e) { entries = []; }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(entries)); }
    catch (e) { alert("保存に失敗しました。ブラウザのストレージ設定をご確認ください。"); }
  }
  function uid() {
    return "e" + Date.now().toString(36) + Math.floor(Math.random() * 1e6).toString(36);
  }

  /* ---------- 星評価 ---------- */
  function stars(n) {
    n = Number(n) || 0;
    let out = "";
    for (let i = 1; i <= 5; i++)
      out += `<span class="${i <= n ? "" : "off"}">★</span>`;
    return `<span class="stars">${out}</span>`;
  }

  /* ---------- フォームのセレクト初期化 ---------- */
  function fillSelects() {
    const cSel = q("#fCountry");
    const vSel = q("#fVitola");
    if (cSel && !cSel.dataset.filled) {
      cSel.innerHTML = `<option value="">—</option>` +
        CIGAR_DATA.countries.map(c => `<option>${escN(c.name_ja)}</option>`).join("") +
        `<option>その他</option>`;
      cSel.dataset.filled = "1";
    }
    if (vSel && !vSel.dataset.filled) {
      vSel.innerHTML = `<option value="">—</option>` +
        CIGAR_DATA.vitolas.map(v => `<option>${escN(v.ja)}</option>`).join("") +
        `<option>その他</option>`;
      vSel.dataset.filled = "1";
    }
  }

  /* ---------- モーダル ---------- */
  function openModal(entry) {
    fillSelects();
    const isEdit = !!entry;
    q("#modalTitle").textContent = isEdit ? "記録を編集する" : "葉巻を記録する";
    q("#entryId").value = isEdit ? entry.id : "";
    q("#fName").value = isEdit ? entry.name : "";
    q("#fBrand").value = isEdit ? (entry.brand || "") : "";
    q("#fCountry").value = isEdit ? (entry.country || "") : "";
    q("#fVitola").value = isEdit ? (entry.vitola || "") : "";
    q("#fStrength").value = isEdit ? (entry.strength || "") : "";
    q("#fDate").value = isEdit ? (entry.date || "") : todayStr();
    q("#fPrice").value = isEdit ? (entry.price ?? "") : "";
    q("#fNote").value = isEdit ? (entry.note || "") : "";
    setRating(isEdit ? (entry.rating || 0) : 0);
    q("#entryModal").classList.add("open");
    setTimeout(() => q("#fName").focus(), 50);
  }
  function closeModal() { q("#entryModal").classList.remove("open"); }

  function todayStr() {
    const d = new Date();
    const p = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
  }

  /* ---------- 星入力 ---------- */
  function setRating(n) {
    q("#fRating").value = n;
    q("#ratingInput").querySelectorAll(".star").forEach(s =>
      s.classList.toggle("on", Number(s.dataset.v) <= n));
  }

  /* ---------- 保存処理 ---------- */
  function submit(e) {
    e.preventDefault();
    const id = q("#entryId").value;
    const data = {
      name: q("#fName").value.trim(),
      brand: q("#fBrand").value.trim(),
      country: q("#fCountry").value,
      vitola: q("#fVitola").value,
      strength: q("#fStrength").value,
      date: q("#fDate").value,
      price: q("#fPrice").value ? Number(q("#fPrice").value) : null,
      rating: Number(q("#fRating").value) || 0,
      note: q("#fNote").value.trim()
    };
    if (!data.name) return;
    if (id) {
      const i = entries.findIndex(x => x.id === id);
      if (i > -1) entries[i] = { ...entries[i], ...data };
    } else {
      data.id = uid();
      data.created = Date.now();
      entries.unshift(data);
    }
    save();
    closeModal();
    render();
  }

  function removeEntry(id) {
    const en = entries.find(x => x.id === id);
    if (!confirm(`「${en ? en.name : "この記録"}」を削除しますか？`)) return;
    entries = entries.filter(x => x.id !== id);
    save();
    render();
  }

  /* ---------- 統計 ---------- */
  function renderStats() {
    const box = q("#noteStats");
    if (!entries.length) { box.innerHTML = ""; return; }
    const rated = entries.filter(e => e.rating > 0);
    const avg = rated.length
      ? (rated.reduce((s, e) => s + e.rating, 0) / rated.length).toFixed(1) : "—";
    const spent = entries.reduce((s, e) => s + (Number(e.price) || 0), 0);
    const countries = new Set(entries.map(e => e.country).filter(Boolean)).size;
    box.innerHTML = `
      <div class="stat-box"><div class="sv">${entries.length}</div><div class="sl">記録した本数</div></div>
      <div class="stat-box"><div class="sv">${avg}</div><div class="sl">平均評価（★）</div></div>
      <div class="stat-box"><div class="sv">${countries}</div><div class="sl">産地の数</div></div>
      <div class="stat-box"><div class="sv">¥${spent.toLocaleString()}</div><div class="sl">総額の記録</div></div>`;
  }

  /* ---------- 一覧描画 ---------- */
  function render() {
    load.done || (load(), load.done = true);
    renderStats();
    q("#entryCount").textContent = `${entries.length} 本`;

    const term = searchTerm.trim().toLowerCase();
    const list = term
      ? entries.filter(e =>
          [e.name, e.brand, e.country, e.vitola, e.note]
            .some(v => (v || "").toLowerCase().includes(term)))
      : entries;

    const area = q("#entriesArea");
    if (!entries.length) {
      area.innerHTML = `
        <div class="empty-state">
          <div class="ic">📝</div>
          <p style="margin-top:10px">まだ記録がありません。<br>「＋ 新しく記録する」から、最初の一本を書き留めましょう。</p>
        </div>`;
      return;
    }
    if (!list.length) {
      area.innerHTML = `<div class="empty-state"><div class="ic">🔍</div><p style="margin-top:10px">「${escN(searchTerm)}」に一致する記録は見つかりませんでした。</p></div>`;
      return;
    }

    area.innerHTML = `<div class="entry-grid">${list.map(e => `
      <div class="entry">
        <div class="e-top">
          <div>
            <h4>${escN(e.name)}</h4>
            ${e.brand ? `<div class="e-brand">${escN(e.brand)}</div>` : ""}
          </div>
          <div class="e-date">${escN(e.date || "")}</div>
        </div>
        <div class="e-meta">
          ${e.country ? `<span class="chip">${escN(e.country)}</span>` : ""}
          ${e.vitola ? `<span class="chip">${escN(e.vitola)}</span>` : ""}
          ${e.strength ? `<span class="chip">${escN(e.strength)}</span>` : ""}
          ${e.price ? `<span class="chip">¥${Number(e.price).toLocaleString()}</span>` : ""}
        </div>
        ${e.rating ? stars(e.rating) : ""}
        ${e.note ? `<div class="e-note">${escN(e.note)}</div>` : ""}
        <div class="e-actions">
          <button class="btn btn-sm btn-ghost" data-edit="${e.id}">編集</button>
          <button class="btn btn-sm btn-danger" data-del="${e.id}">削除</button>
        </div>
      </div>`).join("")}</div>`;
  }

  /* ---------- エクスポート / インポート ---------- */
  function exportJSON() {
    if (!entries.length) { alert("記録がまだありません。"); return; }
    const blob = new Blob([JSON.stringify(entries, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cigar-journal.json";
    a.click();
    URL.revokeObjectURL(url);
  }
  function importJSON(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!Array.isArray(data)) throw new Error("形式が不正です");
        const merge = confirm("既存の記録に追加しますか？\n［OK＝追加 / キャンセル＝すべて置き換え］");
        const cleaned = data.filter(d => d && d.name).map(d => ({
          id: d.id || (uid()), created: d.created || Date.now(),
          name: d.name, brand: d.brand || "", country: d.country || "",
          vitola: d.vitola || "", strength: d.strength || "",
          date: d.date || "", price: d.price ?? null,
          rating: Number(d.rating) || 0, note: d.note || ""
        }));
        entries = merge ? [...cleaned, ...entries] : cleaned;
        // 重複ID回避
        const seen = new Set();
        entries = entries.filter(e => (seen.has(e.id) ? (e.id = uid(), true) : (seen.add(e.id), true)));
        save();
        render();
        alert(`${cleaned.length} 件の記録を読み込みました。`);
      } catch (err) {
        alert("読み込みに失敗しました：" + err.message);
      }
    };
    reader.readAsText(file);
  }

  /* ---------- 初期化 ---------- */
  function init() {
    load(); load.done = true;

    q("#btnNewEntry").addEventListener("click", () => openModal(null));
    q("#btnCancel").addEventListener("click", closeModal);
    q("#entryForm").addEventListener("submit", submit);
    q("#entryModal").addEventListener("click", (e) => {
      if (e.target.id === "entryModal") closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });

    // 星入力
    q("#ratingInput").addEventListener("click", (e) => {
      const s = e.target.closest(".star");
      if (s) {
        const v = Number(s.dataset.v);
        // 同じ星を再クリックで解除
        setRating(Number(q("#fRating").value) === v ? v - 1 : v);
      }
    });

    // 検索
    q("#noteSearch").addEventListener("input", (e) => {
      searchTerm = e.target.value; render();
    });

    // 編集・削除（イベント委譲）
    q("#entriesArea").addEventListener("click", (e) => {
      const ed = e.target.closest("[data-edit]");
      const dl = e.target.closest("[data-del]");
      if (ed) openModal(entries.find(x => x.id === ed.dataset.edit));
      if (dl) removeEntry(dl.dataset.del);
    });

    // エクスポート/インポート
    q("#btnExport").addEventListener("click", exportJSON);
    q("#btnImport").addEventListener("click", () => q("#importFile").click());
    q("#importFile").addEventListener("change", (e) => {
      if (e.target.files[0]) importJSON(e.target.files[0]);
      e.target.value = "";
    });
  }

  return { init, render };
})();
