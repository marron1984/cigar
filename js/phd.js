/* ============================================================
   葉巻大辞典 — 博士編レンダリング
   6サブセクション（化学と燃焼・植物学と農学・官能評価の科学・
   銘柄規格DB・産業経済地政学・健康と法規制）
   ============================================================ */

const PHD = (() => {
  const P = PHD_DATA;
  const qp = (s, el = document) => el.querySelector(s);
  const e = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const paras = (t) => FMT.prose(t);  // 改行・【】見出し・長文を読みやすい段落に
  const block = (title, inner, count) =>
    `<div class="kb-block"><h3>${e(title)}${count ? `<span class="data-count">${e(count)}</span>` : ""}</h3>${inner}</div>`;

  /* ---------- 1. 化学と燃焼 ---------- */
  function chem() {
    const C = P.chem;
    const compounds = `<div class="compound-grid">${C.flavorCompounds.map(c => `
      <div class="compound">
        <div class="cn">${e(c.note)}</div>
        <div class="cc">${e(c.comp)}</div>
        <div class="cd">${e(c.detail)}</div>
      </div>`).join("")}</div>`;

    return block("ニコチンとアルカロイド — 生合成と薬理", `<div class="prose">${paras(C.alkaloids)}</div>`)
      + block("発酵の生化学", `<div class="prose">${paras(C.fermentation)}</div>`)
      + block("燃焼の物理化学 — 800〜950℃の反応炉", `<div class="prose">${paras(C.combustion)}</div>`)
      + block("煙の組成 — 粒子相とガス相", `<div class="prose">${paras(C.smoke)}</div>`)
      + block("フレーバー化合物の科学", `<p class="prose" style="margin-bottom:12px">各風味ノートに対応する具体的な化合物クラス。香りは化学で説明できます。</p>${compounds}`, `${C.flavorCompounds.length}種`)
      + block("TSNA（タバコ特異的ニトロソアミン）", `<div class="research-note"><span class="rn-h">Note</span>発がん物質群の生成機構。発酵・乾燥条件との関係を科学的に。</div><div class="prose">${paras(C.tsna)}</div>`)
      + block("煙のpH・アルカリ度と『強さ』", `<div class="prose">${paras(C.ph)}</div>`)
      + block("熟成の化学（詳論）", `<div class="prose">${paras(C.agingDeep)}</div>`);
  }

  /* ---------- 2. 植物学・農学 ---------- */
  function botany() {
    const B = P.botany;
    const cycle = `<div class="timeline">${B.cultivationCycle.map(s => `
      <div class="tl-item">
        <div class="tl-h">${e(s.stage)}</div>
        <div class="tl-en">${e(s.en)} ・ ${e(s.days)}</div>
        <div class="tl-d">${e(s.purpose)}</div>
      </div>`).join("")}</div>`;

    const soil = `<div class="grid grid-2">${B.soilTerroir.map(s => `
      <div class="card">
        <h4 style="font-family:var(--serif);color:var(--cream);font-size:1.2rem">${e(s.region)}</h4>
        <div class="field"><div class="lbl">土壌</div><div class="val">${e(s.soil)}</div></div>
        <div class="field"><div class="lbl">なぜ良質か</div><div class="val">${e(s.why)}</div></div>
      </div>`).join("")}</div>`;

    const diseases = B.diseases.map(d => `
      <details class="acc"><summary>${e(d.ja)} — ${e(d.en)}</summary>
      <div class="acc-body">
        <div class="spec-row"><div class="k">病原<span class="en">Pathogen</span></div><div class="v">${e(d.pathogen)}</div></div>
        <div class="spec-row"><div class="k">被害<span class="en">Impact</span></div><div class="v">${e(d.impact)}</div></div>
        <div class="spec-row"><div class="k">抵抗性・育種<span class="en">Resistance</span></div><div class="v">${e(d.resistance)}</div></div>
      </div></details>`).join("");

    return block("植物学・分類 — Nicotiana tabacum", `<div class="prose">${paras(B.taxonomy)}</div>`)
      + block("栽培サイクルの科学", `<p class="prose" style="margin-bottom:12px">播種から段階収穫まで、各工程の日数と生理学的な目的。</p>${cycle}`, `${B.cultivationCycle.length}工程`)
      + block("土壌科学とテロワール", soil, `${B.soilTerroir.length}産地`)
      + block("気候・微気候と雲栽培", `<div class="prose">${paras(B.climate)}</div>`)
      + block("病害と品種改良（耐病性育種）", `<p class="prose" style="margin-bottom:12px">葉巻史を動かした病害と、それに抗う遺伝学。各項目をタップで展開。</p>${diseases}`, `${B.diseases.length}疾病`)
      + block("キュアリング（乾燥）の植物生理", `<div class="prose">${paras(B.curing)}</div>`)
      + block("収量・農業データ", `<div class="prose">${paras(B.yield)}</div>`);
  }

  /* ---------- 3. 官能評価の科学 ---------- */
  function sensory() {
    const S = P.sensory;
    const proc = `<ol class="step-list">${S.procedure.map(p => `
      <li><span class="st">${e(p.step)}</span><span class="sd">${e(p.detail)}</span></li>`).join("")}</ol>`;

    return block("味覚・嗅覚の神経科学", `<div class="research-note"><span class="rn-h">Neuroscience</span>レトロヘイルで香りの解像度が上がる理由を、脳科学で説明。</div><div class="prose">${paras(S.neuroscience)}</div>`)
      + block("フレーバーホイールと評価語彙", `<div class="prose">${paras(S.lexicon)}</div>`)
      + block("Cigar Aficionado 100点法の詳細", `<div class="prose">${paras(S.rating)}</div>`)
      + block("プロのテイスティング手順", `<p class="prose" style="margin-bottom:12px">専門パネルが1本を評価する標準的な9ステップ。</p>${proc}`, `${S.procedure.length}ステップ`);
  }

  /* ---------- 4. 銘柄・規格データベース ---------- */
  function db() {
    const DB = P.db;
    const marcas = `<div class="table-wrap"><table class="ref">
      <thead><tr><th>マルカ</th><th>創業</th><th>分類</th><th>作風</th><th>代表ヴィトラ</th></tr></thead>
      <tbody>${DB.cubanMarcas.map(m => `<tr>
        <td><span class="vn" style="font-size:.95rem">${e(m.ja)}</span><br><span class="ve">${e(m.en)}</span></td>
        <td>${e(m.founded)}</td><td>${e(m.cls)}</td><td>${e(m.style)}</td>
        <td>${m.vitolas.map(v => `<span class="chip" style="margin:1px">${e(v)}</span>`).join("")}</td>
      </tr>`).join("")}</tbody></table></div>`;

    const dims = `<div class="table-wrap"><table class="ref">
      <thead><tr><th>ヴィトラ・デ・ガレラ</th><th>長さ(mm)</th><th>RG</th><th>通称</th></tr></thead>
      <tbody>${DB.vitolaDim.map(v => `<tr>
        <td><span class="vn" style="font-size:.92rem">${e(v.name)}</span></td>
        <td>${e(v.mm)}</td><td>${e(v.rg)}</td><td>${e(v.common)}</td>
      </tr>`).join("")}</tbody></table></div>`;

    const top = `<div class="table-wrap"><table class="ref">
      <thead><tr><th>銘柄</th><th>ヴィトラ</th><th>ボディ</th><th>評</th></tr></thead>
      <tbody>${DB.cubanTop.map(t => `<tr>
        <td><span class="vn" style="font-size:.92rem">${e(t.cigar)}</span></td>
        <td>${e(t.vitola)}</td><td>${strengthCell(t.body)}</td><td>${e(t.note)}</td>
      </tr>`).join("")}</tbody></table></div>`;

    const nw = `<div class="table-wrap"><table class="ref">
      <thead><tr><th>ブランド</th><th>国</th><th>作風</th><th>代表ライン</th></tr></thead>
      <tbody>${DB.newWorld.map(b => `<tr>
        <td><span class="vn" style="font-size:.95rem">${e(b.ja)}</span><br><span class="ve">${e(b.en)}</span></td>
        <td>${e(b.country)}</td><td>${e(b.style)}</td>
        <td>${b.lines.map(l => `<span class="chip" style="margin:1px">${e(l)}</span>`).join("")}</td>
      </tr>`).join("")}</tbody></table></div>`;

    const coty = `<div class="table-wrap"><table class="ref">
      <thead><tr><th>年</th><th>銘柄</th><th>産地</th><th>点</th></tr></thead>
      <tbody>${DB.coty.map(c => `<tr>
        <td style="color:var(--gold-bright);font-family:var(--serif)">${e(c.y)}</td>
        <td><span class="vn" style="font-size:.9rem">${e(c.c)}</span></td>
        <td>${e(c.country)}</td><td style="color:var(--gold-bright)">${e(c.s)}</td>
      </tr>`).join("")}</tbody></table></div>`;

    const fac = DB.factories.map(f => `
      <details class="acc"><summary>${e(f.name)} <span class="tag">${e(f.en)}</span></summary>
      <div class="acc-body"><p>${e(f.note)}</p></div></details>`).join("");

    return block("キューバ全マルカ（ブランド）一覧", marcas, `${DB.cubanMarcas.length}銘柄`)
      + block("主要ヴィトラ完全寸法表", dims, `${DB.vitolaDim.length}規格`)
      + block("キューバ銘品セレクション", top, `${DB.cubanTop.length}本`)
      + block("ニューワールド主要ブランド一覧", nw, `${DB.newWorld.length}ブランド`)
      + block("Cigar of the Year 全史（2004〜2025）", coty, `${DB.coty.length}年`)
      + block("主要工場と工場コード", fac, `${DB.factories.length}項目`);
  }
  function strengthCell(b) {
    const cls = /フル/.test(b) ? "s-full" : /ミディアム|M/.test(b) ? "s-medium" : "s-mild";
    return `<span class="strength-badge ${cls}" style="font-size:.68rem">${e(b)}</span>`;
  }

  /* ---------- 5. 産業・経済・地政学 ---------- */
  function industry() {
    const I = P.industry;
    return block("米国の対キューバ通商禁輸（エンバーゴ）", `<div class="prose">${paras(I.embargo)}</div>`)
      + block("ハバノスS.A.の企業構造", `<div class="prose">${paras(I.habanos)}</div>`)
      + block("商標戦争 — コイーバを巡る30年の訴訟", `<div class="prose">${paras(I.trademark)}</div>`)
      + block("革命とディアスポラ — 現代産地の起源", `<div class="prose">${paras(I.diaspora)}</div>`)
      + block("世界市場データ", `<div class="research-note"><span class="rn-h">Market Data</span>数値はいずれも概算・出典により幅があります。</div><div class="prose">${paras(I.market)}</div>`)
      + block("偽造品の経済", `<div class="prose">${paras(I.counterfeit)}</div>`)
      + block("価格の歴史と高騰・投資対象化", `<div class="prose">${paras(I.price)}</div>`);
  }

  /* ---------- 6. 健康と法規制 ---------- */
  function health() {
    const H = P.health;
    return `<div class="health-box"><div class="hb-h">はじめに — 中立・誠実な健康情報</div>
        <div class="prose" style="font-size:.9rem">本項は葉巻文化の理解のため、公的機関（WHO・CDC・NCI・FDA等）の科学的コンセンサスに忠実に健康リスクをまとめたものです。喫煙を推奨するものではありません。喫煙は成人（20歳以上）のみ。</div></div>`
      + block("健康科学 — リスクの正確な理解", `<div class="prose">${paras(H.science)}</div>`)
      + block("ニコチンの薬理と『ニコチン酔い』", `<div class="prose">${paras(H.nicotine)}</div>`)
      + block("法規制と喫煙可能年齢", `<div class="prose">${paras(H.regulation)}</div>`);
  }

  const R = { chem, botany, sensory, db, industry, health };
  const done = {};

  function showSub(name) {
    if (!R[name]) name = "chem";
    if (!done[name]) { qp("#psub-" + name).innerHTML = R[name](); done[name] = true; }
    document.querySelectorAll("#view-phd .sub-view").forEach(v => v.classList.remove("active"));
    qp("#psub-" + name).classList.add("active");
    document.querySelectorAll("#phdSubnav button").forEach(b =>
      b.classList.toggle("active", b.dataset.psub === name));
  }

  function init() {
    qp("#phdSubnav").addEventListener("click", (ev) => {
      const b = ev.target.closest("[data-psub]");
      if (b) showSub(b.dataset.psub);
    });
    showSub("chem");
  }

  return { init, showSub };
})();
