/* ============================================================
   Cigar Cafe — 管理画面（#admin）
   ------------------------------------------------------------
   共有データベースに入っている記録を、記録者ごとに集計して一覧する。
   ナビには出さず、URLに #admin を付けたときだけ開く。

   ■ このページの位置づけについて（重要）
   現在の共有データベースは、記録者名で表示を切り替えるだけの簡易構成で、
   行レベルセキュリティ（RLS）は anon キーに全件の読み書きを許している
   （DATABASE_SETUP.md のプライバシー注記を参照）。
   つまり、この画面が無くても、サイトの JavaScript に含まれる anon キーを
   使えば誰でも全件を読める状態にある。この画面はその「既にできること」を
   見やすくしたものであって、新しく穴を開けるものではない。
   逆に、この画面にパスワードを付けても、ブラウザ側の判定は誰でも
   書き換えられるため、実質的な保護にはならない。
   本当に他人に読ませたくない場合は、Supabase の認証（Auth）を入れて
   RLS を owner = auth.uid() に変える必要がある。
   ============================================================ */

const ADMIN = (() => {
  const q = (s, el = document) => el.querySelector(s);
  const qa = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

  let rows = [];            // 読み込んだ全記録
  let sortKey = "count";    // 記録者一覧の並び順
  let openOwner = null;     // 展開中の記録者

  const NO_NAME = "（記録者名なし）";
  const ownerOf = (e) => (e.owner || e.author || "").trim() || NO_NAME;

  function fmtDate(s) {
    if (!s) return "";
    const d = /^\d{4}-\d{2}-\d{2}$/.test(s) ? new Date(s + "T12:00") : new Date(s);
    return isNaN(d) ? String(s) : `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`;
  }
  /* 記録の「時点」：喫煙日を優先し、無ければ登録日時 */
  function timeOf(e) {
    if (e.date) { const d = new Date(e.date + "T12:00"); if (!isNaN(d)) return d.getTime(); }
    return Number(e.created) || 0;
  }

  function summarize() {
    const byOwner = new Map();
    rows.forEach(e => {
      const k = ownerOf(e);
      if (!byOwner.has(k)) byOwner.set(k, { owner: k, list: [] });
      byOwner.get(k).list.push(e);
    });
    const out = [...byOwner.values()].map(g => {
      const rated = g.list.filter(e => Number(e.rating) > 0);
      const times = g.list.map(timeOf).filter(Boolean);
      const countries = {};
      g.list.forEach(e => { if (e.country) countries[e.country] = (countries[e.country] || 0) + 1; });
      const top = Object.entries(countries).sort((a, b) => b[1] - a[1])[0];
      return {
        owner: g.owner,
        count: g.list.length,
        last: times.length ? Math.max(...times) : 0,
        first: times.length ? Math.min(...times) : 0,
        avg: rated.length ? (rated.reduce((n, e) => n + Number(e.rating), 0) / rated.length) : 0,
        topCountry: top ? `${top[0]}（${top[1]}）` : "",
        photos: g.list.reduce((n, e) => n + ((e.photos || []).length), 0),
        list: g.list.slice().sort((a, b) => timeOf(b) - timeOf(a))
      };
    });
    const cmp = {
      count: (a, b) => b.count - a.count,
      last: (a, b) => b.last - a.last,
      name: (a, b) => a.owner.localeCompare(b.owner, "ja"),
      avg: (a, b) => b.avg - a.avg
    }[sortKey] || ((a, b) => b.count - a.count);
    return out.sort(cmp);
  }

  /* 集計欄は読み込み直後に一度だけ描く。
     並び替えや記録者の開閉で描き直すと、カウントアップ演出が毎回0から
     やり直しになって目障りなため、一覧とは描画を分けている。 */
  function renderStats() {
    const box = q("#adminStats");
    if (!box) return;
    if (!rows.length) { box.innerHTML = ""; return; }
    const groups = summarize();
    const now = Date.now();
    const wk = rows.filter(e => now - timeOf(e) < 7 * 864e5).length;
    const mo = rows.filter(e => now - timeOf(e) < 30 * 864e5).length;
    const rated = rows.filter(e => Number(e.rating) > 0);
    const avgAll = rated.length ? (rated.reduce((n, e) => n + Number(e.rating), 0) / rated.length) : 0;

    box.innerHTML = `
      <div class="admin-stats">
        <div class="stat-box"><div class="sv">${groups.length}</div><div class="sl">記録者</div></div>
        <div class="stat-box"><div class="sv">${rows.length}</div><div class="sl">総記録数</div></div>
        <div class="stat-box"><div class="sv">${wk}</div><div class="sl">直近7日</div></div>
        <div class="stat-box"><div class="sv">${mo}</div><div class="sl">直近30日</div></div>
        <div class="stat-box"><div class="sv">${avgAll ? avgAll.toFixed(1) : "—"}</div><div class="sl">平均評価</div></div>
      </div>`;
  }

  /* 一覧（並び替え・記録者の開閉で描き直す部分） */
  function render() {
    const root = q("#adminRoot");
    if (!root) return;
    if (!rows.length) { root.innerHTML = ""; return; }
    const groups = summarize();

    const sorter = `
      <div class="admin-sort">
        <span>並び替え</span>
        ${[["count", "記録数"], ["last", "最終記録"], ["name", "名前"], ["avg", "平均評価"]]
          .map(([k, l]) => `<button class="as-btn${sortKey === k ? " on" : ""}" data-sort="${k}">${l}</button>`).join("")}
      </div>`;

    const table = groups.map(g => `
      <div class="admin-owner${openOwner === g.owner ? " open" : ""}">
        <button class="ao-head" data-owner="${esc(g.owner)}">
          <span class="ao-name">${esc(g.owner)}</span>
          <span class="ao-count">${g.count}件</span>
          <span class="ao-meta">最終 ${g.last ? fmtDate(new Date(g.last).toISOString().slice(0, 10)) : "—"}</span>
          <span class="ao-meta">平均 ${g.avg ? g.avg.toFixed(1) : "—"}</span>
          <span class="ao-meta">${esc(g.topCountry)}</span>
          <span class="ao-caret">${openOwner === g.owner ? "▲" : "▼"}</span>
        </button>
        ${openOwner === g.owner ? `
          <div class="ao-body">
            <table class="admin-table">
              <thead><tr><th>銘柄</th><th>産地</th><th>日付</th><th>評価</th><th>写真</th><th></th></tr></thead>
              <tbody>
                ${g.list.map(e => `
                  <tr>
                    <td>${esc(e.name || "（無題）")}${e.brand ? `<span class="at-sub">${esc(e.brand)}</span>` : ""}</td>
                    <td>${esc(e.country || "")}</td>
                    <td>${esc(fmtDate(e.date) || (e.created ? fmtDate(new Date(e.created).toISOString().slice(0, 10)) : ""))}</td>
                    <td>${Number(e.rating) ? Number(e.rating).toFixed(1) : ""}</td>
                    <td>${(e.photos || []).length || ""}</td>
                    <td><button class="at-del" data-del="${esc(e.id)}" title="この記録を共有データベースから削除">削除</button></td>
                  </tr>`).join("")}
              </tbody>
            </table>
          </div>` : ""}
      </div>`).join("");

    root.innerHTML = sorter + `<div class="admin-owners">${table}</div>`;

    qa("#adminRoot [data-sort]").forEach(b =>
      b.addEventListener("click", () => { sortKey = b.dataset.sort; render(); }));
    qa("#adminRoot .ao-head").forEach(b =>
      b.addEventListener("click", () => {
        openOwner = (openOwner === b.dataset.owner) ? null : b.dataset.owner; render();
      }));
    qa("#adminRoot [data-del]").forEach(b =>
      b.addEventListener("click", (ev) => { ev.stopPropagation(); removeOne(b.dataset.del); }));
  }

  async function removeOne(id) {
    const e = rows.find(x => x.id === id);
    if (!e) return;
    if (!confirm(`「${e.name || "この記録"}」を共有データベースから削除します。\nこの操作は取り消せません。よろしいですか？`)) return;
    try {
      await CLOUD.remove(id);
      rows = rows.filter(x => x.id !== id);
      renderStats(); render();
    } catch (err) {
      alert("削除に失敗しました：" + (err && err.message || err));
    }
  }

  async function load() {
    const btn = q("#adminLoad");
    const root = q("#adminRoot");
    if (!CLOUD || !CLOUD.enabled) {
      root.innerHTML = `<div class="callout">共有データベースが未設定です（js/config.js の CLOUD_CONFIG）。この画面は共有データベースの記録を対象にしています。</div>`;
      return;
    }
    const old = btn.textContent;
    btn.disabled = true; btn.textContent = "読み込み中…";
    try {
      rows = await CLOUD.listAll();
      openOwner = null;
      renderStats(); render();
      q("#adminExport").hidden = !rows.length;
      if (!rows.length) q("#adminStats").innerHTML = "";
      if (!rows.length) root.innerHTML = `<div class="callout">共有データベースに記録がありません。</div>`;
    } catch (err) {
      root.innerHTML = `<div class="callout">読み込みに失敗しました：${esc(String(err && err.message || err))}</div>`;
    }
    btn.disabled = false; btn.textContent = old;
  }

  /* 表計算ソフトで開ける形に書き出す */
  function exportCsv() {
    if (!rows.length) return;
    const cell = (v) => `"${String(v == null ? "" : v).replace(/"/g, '""')}"`;
    const head = ["記録者", "銘柄", "ブランド", "産地", "サイズ", "強さ", "日付", "評価", "価格", "場所", "写真枚数", "メモ"];
    const body = rows.map(e => [
      ownerOf(e), e.name, e.brand, e.country, e.vitola, e.strength,
      e.date || (e.created ? new Date(e.created).toISOString().slice(0, 10) : ""),
      e.rating || "", e.price || "", e.location, (e.photos || []).length, e.note
    ].map(cell).join(","));
    const csv = "﻿" + [head.map(cell).join(","), ...body].join("\r\n");   // BOM付きでExcel対応
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = `cigarcafe-records-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 3000);
  }

  function init() {
    const warn = q("#adminWarn");
    if (warn) {
      warn.innerHTML = `<b>この画面はアクセス制限されていません。</b>
        現在の共有データベースは記録者名で表示を切り替えるだけの簡易構成で、サイトのJavaScriptに含まれる
        公開キーを使えば誰でも全件を読める状態です（DATABASE_SETUP.md のプライバシー注記のとおり）。
        この画面はその内容を見やすくしたもので、新たに公開範囲を広げるものではありません。
        厳密に非公開にしたい場合は Supabase の認証（Auth）を入れて、行レベルセキュリティを
        <code>owner = auth.uid()</code> に切り替える必要があります。`;
    }
    const lb = q("#adminLoad"); if (lb) lb.addEventListener("click", load);
    const eb = q("#adminExport"); if (eb) eb.addEventListener("click", exportCsv);
  }

  return { init };
})();

document.addEventListener("DOMContentLoaded", () => ADMIN.init());
