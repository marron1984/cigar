/* ============================================================
   葉巻大辞典 — アプリ本体（ナビゲーション & 事典レンダリング）
   ============================================================ */

const D = CIGAR_DATA;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (s) => String(s == null ? "" : s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

/* ---------- 強さ → バッジクラス ---------- */
function strengthBadge(s) {
  const cls = /フル/.test(s) ? "s-full" : /ミディアム/.test(s) ? "s-medium" : "s-mild";
  return `<span class="strength-badge ${cls}">${esc(s)}</span>`;
}
function brandChips(brands, extraClass = "brand") {
  return `<div class="chips">${brands.map(b =>
    `<span class="chip ${extraClass}">${esc(b.ja)}${b.en ? ` <span style="opacity:.6">${esc(b.en)}</span>` : ""}</span>`
  ).join("")}</div>`;
}

/* ============================================================
   ナビゲーション
   ============================================================ */
const views = {
  home: "view-home", basics: "view-basics", countries: "view-countries",
  sizes: "view-sizes", prices: "view-prices", tools: "view-tools",
  advanced: "view-advanced", phd: "view-phd", note: "view-note"
};
function showView(name) {
  if (!views[name]) name = "home";
  $$(".view").forEach(v => v.classList.remove("active"));
  $("#" + views[name]).classList.add("active");
  $$("#navTabs button").forEach(b =>
    b.classList.toggle("active", b.dataset.view === name));
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (location.hash !== "#" + name) history.replaceState(null, "", "#" + name);
  if (name === "note") NOTE.render();
}
document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-view]");
  if (t) { e.preventDefault(); showView(t.dataset.view); }
});

/* ============================================================
   ホーム
   ============================================================ */
const HOME_CARDS = [
  { view: "basics", ic: "📖", h: "基礎知識", p: "葉巻とは？構造・吸い方・味わいの表現・歴史・マナーまで。" },
  { view: "countries", ic: "🌎", h: "国・産地別", p: "キューバ、ドミニカ、ニカラグア…9か国の個性を比較。" },
  { view: "sizes", ic: "📏", h: "太さ・サイズ別", p: "リングゲージとビトラ。定番サイズを一覧で。" },
  { view: "prices", ic: "💰", h: "価格帯別", p: "入門からハイエンドまで、価格別の選び方。" },
  { view: "tools", ic: "🧰", h: "喫煙具・保管", p: "カッター、ライター、ヒュミドールの選び方。" },
  { view: "advanced", ic: "🎓", h: "上級編（オタクの世界）", p: "品種・発酵・キューバ通・名門・喫煙術・ペアリング・熟成科学。" },
  { view: "phd", ic: "🔬", h: "博士編（学術）", p: "化学・植物学・官能評価・銘柄DB・産業経済・健康科学。" },
  { view: "note", ic: "📝", h: "記録ノート", p: "吸った一本を記録して自分だけの一冊に。" }
];
function renderHome() {
  $("#homeGrid").innerHTML = HOME_CARDS.map(c => `
    <div class="home-card" data-view="${c.view}">
      <div class="ic">${c.ic}</div>
      <h3>${c.h}</h3>
      <p>${c.p}</p>
      <div class="go">開く →</div>
    </div>`).join("");
}

/* ============================================================
   基礎知識
   ============================================================ */
function renderBasics() {
  const anatomy = D.anatomy.map(a => `
    <div class="item">
      <div><span class="p-name">${esc(a.ja)}</span><span class="p-en">${esc(a.en)}</span></div>
      <div class="p-desc">${esc(a.desc)}</div>
    </div>`).join("");

  const steps = D.howToSmoke.map(s => `
    <li><span class="st">${esc(s.title)}</span><span class="sd">${esc(s.desc)}</span></li>`).join("");

  const shades = D.wrapperShades.map(s => `
    <div class="shade">
      <div class="swatch" style="background:${s.hex}"></div>
      <div class="meta">
        <div class="sn">${esc(s.ja)}</div>
        <div class="se">${esc(s.en)}</div>
        <div class="sf">${esc(s.flavor)}</div>
      </div>
    </div>`).join("");

  const gloss = D.glossary.map(g => `
    <div class="gloss-item">
      <span class="gt">${esc(g.ja)}</span> <span class="ge">${esc(g.en)}</span>
      <div class="gd">${esc(g.desc)}</div>
    </div>`).join("");

  $("#basicsContent").innerHTML = `
    <div class="kb-block">
      <h3>葉巻とは</h3>
      <div class="prose"><p>${esc(D.whatIsCigar)}</p></div>
    </div>

    <div class="kb-block">
      <h3>葉巻の構造（アナトミー）</h3>
      <div class="anatomy-list">${anatomy}</div>
    </div>

    <div class="kb-block">
      <h3>葉巻の吸い方（初心者向け 5ステップ）</h3>
      <ol class="step-list">${steps}</ol>
      <div class="callout warn">よくある失敗：紙巻き感覚で肺に吸い込んでむせる／早いペースで吸って火が高温になり苦く・辛くなる／深く切りすぎて巻きがほどける。ゆっくり、少しずつが基本です。</div>
    </div>

    <div class="kb-block">
      <h3>味わいの表現・テイスティング</h3>
      <div class="prose"><p>${esc(D.tastingTerms)}</p></div>
    </div>

    <div class="kb-block">
      <h3>ラッパーの色（シェード）による分類</h3>
      <p class="prose" style="margin-bottom:14px">葉巻の一番外側の葉「ラッパー」の色は、味わいの傾向を映す目安になります（※色の濃さ＝強さ ではなく、強さは主にフィラーが決めます）。</p>
      <div class="shade-grid">${shades}</div>
    </div>

    <div class="kb-block">
      <h3>葉巻の歴史</h3>
      <div class="prose"><p>${esc(D.history)}</p></div>
    </div>

    <div class="kb-block">
      <h3>マナー・楽しみ方とペアリング</h3>
      <div class="prose"><p>${esc(D.manners)}</p></div>
    </div>

    <div class="kb-block">
      <h3>用語集</h3>
      <div class="glossary">${gloss}</div>
    </div>`;
}

/* ============================================================
   国・産地別
   ============================================================ */
function renderCountries() {
  $("#countriesGrid").innerHTML = D.countries.map(c => `
    <div class="card country-card">
      <div class="flag">${c.flag}</div>
      <h3>${esc(c.name_ja)}</h3>
      <div class="en-name">${esc(c.name_en)}</div>
      <div style="margin-top:8px">${strengthBadge(c.strength)}</div>

      <div class="field"><div class="lbl">風味の特徴</div><div class="val">${esc(c.flavor)}</div></div>
      <div class="field"><div class="lbl">気候・土壌</div><div class="val">${esc(c.climate)}</div></div>
      <div class="field"><div class="lbl">主な栽培地域</div>
        <div class="chips">${c.regions.map(r => `<span class="chip">${esc(r)}</span>`).join("")}</div>
      </div>
      <div class="field"><div class="lbl">代表的な銘柄</div>${brandChips(c.brands)}</div>
      <div class="field"><div class="lbl">歴史</div><div class="val">${esc(c.history)}</div></div>
      <div class="field"><div class="lbl">豆知識</div><div class="val">${esc(c.trivia)}</div></div>
    </div>`).join("");
}

/* ============================================================
   太さ・サイズ別
   ============================================================ */
function renderSizes() {
  const rows = D.vitolas.map(v => `
    <tr>
      <td><span class="vn">${esc(v.ja)}</span><br><span class="ve">${esc(v.en)}</span></td>
      <td>${esc(v.len)}</td>
      <td>${esc(v.rg)}</td>
      <td>${esc(v.time)}</td>
      <td>${esc(v.feat)}</td>
    </tr>`).join("");

  $("#sizesContent").innerHTML = `
    <div class="kb-block">
      <h3>リングゲージとは</h3>
      <div class="prose"><p>${esc(D.ringGaugeIntro)}</p></div>
    </div>

    <div class="kb-block">
      <h3>主要なビトラ（サイズ規格）一覧</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>ビトラ</th><th>長さ</th><th>リングゲージ</th><th>喫煙時間</th><th>特徴</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>

    <div class="kb-block">
      <h3>太さ別ガイド（細い vs 太い）</h3>
      <div class="prose"><p>${esc(D.thicknessGuide)}</p></div>
      <div class="callout">🔰 初心者の最初の一本には <b>ロブスト（約5インチ × RG50）</b> がおすすめ。まろやかで扱いやすく、30〜45分で楽しめます。</div>
    </div>

    <div class="kb-block">
      <h3>形状の分類（パラホ / フィギュラード）</h3>
      <div class="prose"><p>${esc(D.shapeClassification)}</p></div>
    </div>`;
}

/* ============================================================
   価格帯別
   ============================================================ */
function renderPrices() {
  const tiers = D.priceTiers.map(t => `
    <div class="card tier-card">
      <h3>${esc(t.tier)}</h3>
      <div class="price-band">${esc(t.range)}</div>
      <div class="field"><div class="lbl">特徴</div><div class="val">${esc(t.feat)}</div></div>
      <div class="field"><div class="lbl">こんな人に</div><div class="val">${esc(t.whom)}</div></div>
      <div class="field"><div class="lbl">代表的な銘柄</div>${brandChips(t.brands)}</div>
      <div class="field"><div class="lbl">アドバイス</div><div class="val">${esc(t.advice)}</div></div>
    </div>`).join("");

  $("#pricesContent").innerHTML = `
    <div class="grid grid-2">${tiers}</div>
    <div class="kb-block">
      <h3>価格を左右する要因</h3>
      <div class="prose"><p>${esc(D.priceFactors)}</p></div>
    </div>
    <div class="kb-block">
      <h3>ドライシガーとプレミアムシガーの違い</h3>
      <div class="prose"><p>${esc(D.dryVsPremium)}</p></div>
    </div>`;
}

/* ============================================================
   喫煙具
   ============================================================ */
function renderTools() {
  const tools = D.tools.map(t => `
    <div class="card tool-card">
      <h3><span class="ic">${t.icon}</span>${esc(t.ja)}</h3>
      <div class="en-name">${esc(t.en)}</div>
      <div class="field"><div class="lbl">役割</div><div class="val">${esc(t.role)}</div></div>
      <div class="field"><div class="lbl">種類</div><div class="val">${esc(t.types)}</div></div>
      <div class="field"><div class="lbl">選び方</div><div class="val">${esc(t.choose)}</div></div>
      <div class="field"><div class="lbl">使い方</div><div class="val">${esc(t.use)}</div></div>
      <div class="field"><div class="lbl">価格の目安</div><div class="val">${esc(t.price)}</div></div>
      <div class="field"><div class="lbl">おすすめブランド</div>${brandChips(t.brands)}</div>
    </div>`).join("");

  $("#toolsContent").innerHTML = `
    <div class="grid grid-2">${tools}</div>
    <div class="kb-block">
      <h3>保管の基礎知識</h3>
      <div class="card prose">${D.storageBasics.split("\n").map(p => `<p>${esc(p)}</p>`).join("")}</div>
    </div>`;
}

/* ============================================================
   初期化
   ============================================================ */
function init() {
  renderHome();
  renderBasics();
  renderCountries();
  renderSizes();
  renderPrices();
  renderTools();
  ADV.init();
  PHD.init();
  NOTE.init();
  const start = (location.hash || "#home").slice(1);
  showView(start);
}
document.addEventListener("DOMContentLoaded", init);
