/* ============================================================
   葉巻大辞典 — 上級編レンダリング
   7サブセクション（葉と品種・製造と技・キューバ学・名門ブランド・
   喫煙の極意・ペアリング学・保管と熟成の科学）
   ============================================================ */

const ADV = (() => {
  const A = ADVANCED_DATA;
  const qq = (s, el = document) => el.querySelector(s);
  const e = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  // 改行を段落に
  const paras = (t) => e(t).split("\n").filter(Boolean)
    .map(p => `<p>${p}</p>`).join("");
  const block = (title, inner) =>
    `<div class="kb-block"><h3>${e(title)}</h3>${inner}</div>`;
  const acc = (title, inner, tag) =>
    `<details class="acc"><summary>${e(title)}${tag ? `<span class="tag">${e(tag)}</span>` : ""}</summary><div class="acc-body">${inner}</div></details>`;
  const chips = (arr) => `<div class="chips">${arr.map(x => `<span class="chip brand">${e(x)}</span>`).join("")}</div>`;

  /* ---------- 1. 葉と品種 ---------- */
  function leaf() {
    const varietals = A.varietals.map(v => acc(
      `${v.ja} — ${v.en}`,
      `<div class="spec-row"><div class="k">用途<span class="en">Use</span></div><div class="v">${e(v.use)}</div></div>
       <div class="spec-row"><div class="k">特徴<span class="en">Character</span></div><div class="v">${e(v.feature)}</div></div>`
    )).join("");

    const primings = `<div class="table-wrap"><table>
      <thead><tr><th>葉位</th><th>株の位置</th><th>燃焼性</th><th>強さ</th><th>ブレンドでの役割</th></tr></thead>
      <tbody>${A.primings.map(p => `<tr>
        <td><span class="vn">${e(p.ja)}</span><br><span class="ve">${e(p.en)}</span></td>
        <td>${e(p.pos)}</td><td>${e(p.burn)}</td><td>${e(p.strength)}</td><td>${e(p.role)}</td>
      </tr>`).join("")}</tbody></table></div>`;

    const wrappers = `<div class="grid grid-3">${A.wrapperTypes.map(w => `
      <div class="card"><h4 style="font-family:var(--serif);color:var(--cream);font-size:1.15rem">${e(w.ja)}</h4>
      <div class="en-name" style="font-size:.72rem;letter-spacing:.15em;color:var(--gold);margin:2px 0 8px">${e(w.en)}</div>
      <div class="val" style="font-size:.9rem;color:var(--text-soft)">${e(w.flavor)}</div></div>`).join("")}</div>`;

    return block("タバコ品種（バラエティ／シード）", `<p class="prose" style="margin-bottom:14px">葉巻の風味は、まず“どの品種の種子を、どの土地で育てたか”で決まります。主要品種をタップして展開。</p>${varietals}`)
      + block("葉位（プライミング）— 1株のどの高さの葉か", `<p class="prose" style="margin-bottom:12px">同じ株でも、日光を浴びる上部ほど強く難燃、下部ほど軽く良燃焼。ブレンダーはこの“葉位”を積み木のように組んでボディを設計します。</p>${primings}`)
      + block("栽培法 — シェード vs サン", `<div class="prose">${paras(A.cultivation)}</div>`)
      + block("ブレンド設計の哲学", `<div class="prose">${paras(A.blendingPhilosophy)}</div>`)
      + block("ラッパーの種類と風味", wrappers);
  }

  /* ---------- 2. 製造と技 ---------- */
  function craft() {
    const timeline = `<div class="timeline">${A.processSteps.map(s => `
      <div class="tl-item">
        <div class="tl-h">${e(s.step)}</div>
        <div class="tl-en">${e(s.en)}</div>
        <div class="tl-d">${e(s.what)}</div>
        <div class="tl-chem">🧪 ${e(s.chem)}</div>
      </div>`).join("")}</div>`;

    return block("製造の全工程 — 葉から一本へ", `<p class="prose" style="margin-bottom:12px">収穫から出荷まで、各工程で“何が起き、化学的に何が変わるか”。🧪は化学変化。</p>${timeline}`)
      + block("巻きの技法（バンチング＆キャップ）", `<div class="prose">${paras(A.rollingTechniques)}</div>`)
      + block("フィラー構造の格", `<div class="prose">${paras(A.fillerTypes)}</div>`)
      + block("ボックスプレス vs ラウンド", `<div class="prose">${paras(A.boxPress)}</div>`)
      + block("プルーム vs カビ — 通の見極め", `<div class="callout">この見極めは葉巻愛好家の必修科目。白い粉が“熟成の勲章”か“カビ”かで、一本の運命が分かれます。</div><div class="prose">${paras(A.plumeVsMold)}</div>`)
      + block("熟成による味変化の化学", `<div class="prose">${paras(A.agingChemistry)}</div>`)
      + block("色による選別・格付け（エスコヒダ）", `<div class="prose">${paras(A.grading)}</div>`);
  }

  /* ---------- 3. キューバ学 ---------- */
  function cuba() {
    const galera = `<div class="table-wrap"><table>
      <thead><tr><th>ガレラ名</th><th>寸法(mm×RG)</th><th>代表銘柄・通称</th></tr></thead>
      <tbody>${A.galeraNames.map(g => `<tr>
        <td><span class="vn" style="font-size:.95rem">${e(g.g)}</span></td>
        <td>${e(g.dim)}</td><td>${e(g.ex)}</td></tr>`).join("")}</tbody></table></div>`;

    const editions = `<div class="grid grid-2">${A.specialEditions.map(s => `
      <div class="card"><h4 style="font-family:var(--serif);color:var(--cream);font-size:1.15rem">${e(s.ja)} <span style="font-size:.7rem;color:var(--gold);letter-spacing:.1em;border:1px solid var(--line);padding:2px 8px;border-radius:999px;margin-left:4px">${e(s.abbr)}</span></h4>
      <div class="val" style="font-size:.9rem;color:var(--text-soft);margin-top:8px">${e(s.desc)}</div></div>`).join("")}</div>`;

    const fakes = A.spottingFakes.map(f => acc(`🔍 ${f.p}`, `<p>${e(f.h)}</p>`)).join("");

    const legend = `<div class="grid grid-2">${A.legendaryCuban.map(l => `
      <div class="card"><h4 style="font-family:var(--serif);color:var(--gold-bright);font-size:1.2rem">${e(l.name)}</h4>
      <div class="val" style="font-size:.9rem;color:var(--text-soft);margin-top:8px">${e(l.why)}</div></div>`).join("")}</div>`;

    return block("ヴィトラの二重命名（ガレラ vs サリダ）", `<div class="prose">${paras(A.vitolaNaming)}</div>`)
      + block("主要ガレラ名 早見表", galera)
      + block("箱の刻印の読み方（工場コード・デートコード）", `<div class="prose">${paras(A.boxCodes)}</div>`)
      + block("ハバノスのブランド階層とライン", `<div class="prose">${paras(A.brandHierarchy)}</div>`)
      + block("限定・特別版の種類", editions)
      + block("偽物（フェイク）の見分け方", `<div class="callout warn">コイーバは世界で最も贋作が多い銘柄。以下のポイントを複合的に確認します。各項目をタップで展開。</div>${fakes}`)
      + block("CC vs NC — キューバ産 対 非キューバ産", `<div class="prose">${paras(A.ccVsNc)}</div>`)
      + block("伝説の一本（キューバ）", legend);
  }

  /* ---------- 4. 名門ブランド ---------- */
  function brands() {
    const cards = A.brands.map(b => `
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px;flex-wrap:wrap">
          <h3 style="font-family:var(--serif);color:var(--cream);font-size:1.4rem">${e(b.ja)}</h3>
          <span class="strength-badge s-medium">${e(b.country)}・${e(b.founded)}</span>
        </div>
        <div class="en-name" style="font-size:.74rem;letter-spacing:.2em;color:var(--gold);text-transform:uppercase;margin-bottom:8px">${e(b.en)}</div>
        <div class="field"><div class="lbl">作風</div><div class="val">${e(b.style)}</div></div>
        <div class="field"><div class="lbl">看板の一本</div><div class="val" style="color:var(--gold-bright)">${e(b.sig)}</div></div>
        <div class="field"><div class="lbl">代表銘柄</div>${chips(b.icons)}</div>
        <div class="field"><div class="lbl">通のメモ</div><div class="val">${e(b.note)}</div></div>
      </div>`).join("");

    const highscore = `<div class="grid grid-2">${A.legendaryHighscore.map(h => `
      <div class="card"><h4 style="font-family:var(--serif);color:var(--gold-bright);font-size:1.15rem">${e(h.name)}</h4>
      <div class="val" style="font-size:.9rem;color:var(--text-soft);margin-top:6px">${e(h.note)}</div></div>`).join("")}</div>`;

    return block("名門ブランド・カタログ（16銘柄）", `<div class="grid grid-2">${cards}</div>`)
      + block("シガー・オブ・ザ・イヤー（COTY）とは", `<div class="prose">${paras(A.cotyConcept)}</div>`)
      + block("殿堂級の高得点・伝説の銘柄", highscore);
  }

  /* ---------- 5. 喫煙の極意 ---------- */
  function technique() {
    const trouble = A.troubleshooting.map(t => acc(
      `⚠️ ${t.problem}`,
      `<div class="spec-row"><div class="k">原因<span class="en">Cause</span></div><div class="v">${e(t.cause)}</div></div>
       <div class="spec-row"><div class="k">対処<span class="en">Fix</span></div><div class="v">${e(t.fix)}</div></div>`
    )).join("");

    return block("理想の点火とパージ", `<div class="prose">${paras(A.lighting)}</div>`)
      + block("ドロー（吸い心地）の調整", `<div class="prose">${paras(A.draw)}</div>`)
      + block("トラブルシューティング", `<p class="prose" style="margin-bottom:12px">燃焼の乱れは腕でリカバーできます。症状をタップで対処法を展開。</p>${trouble}`)
      + block("レトロヘイル（鼻抜き）", `<div class="callout">香りの7〜8割は嗅覚由来。これを覚えると葉巻の解像度が一段上がります。</div><div class="prose">${paras(A.retrohale)}</div>`)
      + block("喫煙ペースと燃焼温度の科学", `<div class="prose">${paras(A.pace)}</div>`)
      + block("ナブ（どこで止めるか）", `<div class="prose">${paras(A.nub)}</div>`)
      + block("味の三分割（Rule of Thirds）を読む", `<div class="prose">${paras(A.readingThirds)}</div>`)
      + block("通の儀式（ドライボックス他）", `<div class="prose">${paras(A.rituals)}</div>`);
  }

  /* ---------- 6. ペアリング学 ---------- */
  function pairing() {
    const cats = `<div class="grid grid-2">${A.pairingCategories.map(c => `
      <div class="pair-card">
        <h4>${e(c.ja)} <span class="en">${e(c.en)}</span></h4>
        <div class="pw">◎ ${e(c.pw)}</div>
        <div class="val" style="font-size:.9rem;color:var(--text-soft)">${e(c.why)}</div>
        <div class="field"><div class="lbl">具体例</div><div class="val">${e(c.ex)}</div></div>
      </div>`).join("")}</div>`;

    const quick = `<div class="table-wrap"><table>
      <thead><tr><th>葉巻のタイプ</th><th>おすすめドリンク</th></tr></thead>
      <tbody>${A.quickMatch.map(q => `<tr>
        <td class="cig" style="min-width:200px"><span class="vn" style="font-size:.98rem">${e(q.cig)}</span></td>
        <td>${e(q.drink)}</td></tr>`).join("")}</tbody></table></div>`;

    return block("ペアリングの3原則", `<div class="prose">${paras(A.pairingPrinciples)}</div>`)
      + block("ドリンク別・相性ガイド", cats)
      + block("強さ別・早見表", quick)
      + block("フードとの相性", `<div class="prose">${paras(A.pairingFood)}</div>`)
      + block("時間帯で選ぶ", `<div class="prose">${paras(A.pairingTime)}</div>`)
      + block("やってはいけないNG例", `<div class="callout warn">よくある失敗を避けるだけで、ペアリングの成功率は大きく上がります。</div><div class="prose">${paras(A.pairingNg)}</div>`);
  }

  /* ---------- 7. 保管と熟成の科学 ---------- */
  function storage() {
    const humid = `<div class="grid grid-2">${A.humidification.map(h => `
      <div class="card"><h4 style="font-family:var(--serif);color:var(--cream);font-size:1.15rem">${e(h.type)}</h4>
      <div class="field"><div class="lbl" style="color:var(--leaf)">長所</div><div class="val">${e(h.pros)}</div></div>
      <div class="field"><div class="lbl" style="color:var(--ember-glow)">短所</div><div class="val">${e(h.cons)}</div></div></div>`).join("")}</div>`;

    const htypes = A.humidorTypes.map(h => acc(h.type, `<p>${e(h.desc)}</p>`)).join("");

    return block("相対湿度（RH）の科学", `<div class="prose">${paras(A.rhScience)}</div>`)
      + block("69%論争 — 「70/70神話」への反論", `<div class="prose">${paras(A.rhDebate)}</div>`)
      + block("なぜスパニッシュ・シダーなのか", `<div class="prose">${paras(A.spanishCedar)}</div>`)
      + block("シーズニング（慣らし）の正しい手順", `<div class="callout">新品ヒュミドールに“いきなり葉巻を入れる”のは厳禁。木が乾いていて水分を奪われます。</div><div class="prose">${paras(A.seasoning)}</div>`)
      + block("加湿材の比較", humid)
      + block("タバコシバンムシ対策と冷凍法", `<div class="callout warn">高温（22℃超）が最大の引き金。1匹見つけたら全数処理を。</div><div class="prose">${paras(A.beetles)}</div>`)
      + block("長期熟成とマリッジ", `<div class="prose">${paras(A.longAging)}</div>`)
      + block("ヒュミドールの種類（上級）", htypes)
      + block("輸送・気候順応", `<div class="prose">${paras(A.acclimation)}</div>`);
  }

  const RENDERERS = { leaf, craft, cuba, brands, technique, pairing, storage };
  const rendered = {};

  function showSub(name) {
    if (!RENDERERS[name]) name = "leaf";
    if (!rendered[name]) { qq("#sub-" + name).innerHTML = RENDERERS[name](); rendered[name] = true; }
    document.querySelectorAll("#view-advanced .sub-view").forEach(v => v.classList.remove("active"));
    qq("#sub-" + name).classList.add("active");
    document.querySelectorAll("#advSubnav button").forEach(b =>
      b.classList.toggle("active", b.dataset.sub === name));
  }

  function init() {
    qq("#advSubnav").addEventListener("click", (ev) => {
      const b = ev.target.closest("[data-sub]");
      if (b) showSub(b.dataset.sub);
    });
    showSub("leaf"); // 初期描画
  }

  return { init, showSub };
})();
