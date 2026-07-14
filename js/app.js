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
  sizes: "view-sizes", prices: "view-prices", tools: "view-tools", humidor: "view-humidor",
  advanced: "view-advanced", phd: "view-phd", world: "view-world", note: "view-note"
};
function showView(name, opts = {}) {
  if (!views[name]) name = "home";
  $$(".view").forEach(v => v.classList.remove("active"));
  $("#" + views[name]).classList.add("active");
  $$("#navTabs button").forEach(b =>
    b.classList.toggle("active", b.dataset.view === name));
  window.scrollTo({ top: 0, behavior: "smooth" });
  // 履歴に積む（pushState）ことで、ブラウザの「戻る」やスワイプバックで
  // 直前のページに戻れるようにする。戻る操作由来（fromPop）のときは積まない。
  if (location.hash !== "#" + name) {
    if (opts.replace) history.replaceState(null, "", "#" + name);
    else if (!opts.fromPop) history.pushState(null, "", "#" + name);
  }
  if (name === "note") NOTE.render();
  closeNav();
}

/* 戻る／進む（スワイプバック含む）でビューを同期 */
window.addEventListener("popstate", () => {
  showView((location.hash || "#home").slice(1), { fromPop: true });
});

/* ---------- モバイル・ハンバーガーメニュー ---------- */
function setNav(open) {
  const tabs = $("#navTabs");
  const btn = $("#navToggle");
  if (!tabs || !btn) return;
  tabs.classList.toggle("open", open);
  btn.classList.toggle("open", open);
  btn.setAttribute("aria-expanded", open ? "true" : "false");
}
function closeNav() { setNav(false); }

document.addEventListener("click", (e) => {
  const toggle = e.target.closest("#navToggle");
  if (toggle) {
    e.preventDefault();
    setNav(!$("#navTabs").classList.contains("open"));
    return;
  }
  const t = e.target.closest("[data-view]");
  if (t) { e.preventDefault(); showView(t.dataset.view); return; }
  // メニュー外クリックで閉じる
  if ($("#navTabs").classList.contains("open") && !e.target.closest(".site-header")) closeNav();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeNav();
});

/* 国別など大きな画像は、画面内に収まるライトボックスで表示（新規タブを開かない） */
document.addEventListener("click", (e) => {
  const im = e.target.closest(".cd-img, .country-overview img, #countryOthers img, .gauge-photo, .guide-photo");
  if (im && im.src) {
    e.preventDefault();
    const lb = $("#lightbox"), lbi = $("#lightboxImg");
    if (lb && lbi) { lbi.src = im.src; lb.classList.add("open"); }
  }
});

/* ============================================================
   ホーム
   ============================================================ */
const HOME_CARDS = [
  { view: "basics", h: "基礎知識", p: "葉巻とは？構造・吸い方・味わいの表現・歴史・マナーまで。" },
  { view: "countries", h: "国・産地別", p: "キューバ、ドミニカ、ニカラグア…9か国の個性を比較。" },
  { view: "sizes", h: "太さ・サイズ別", p: "リングゲージとビトラ。定番サイズを一覧で。" },
  { view: "prices", h: "価格帯別", p: "入門からハイエンドまで、価格別の選び方。" },
  { view: "tools", h: "喫煙具・保管", p: "カッター、ライター、ヒュミドールの選び方。" },
  { view: "humidor", h: "ヒュミドール大全", p: "歴史・メーカー・使い方・種類・価格を5つの観点で徹底調査。" },
  { view: "advanced", h: "上級編（オタクの世界）", p: "品種・発酵・キューバ通・名門・喫煙術・ペアリング・熟成科学。" },
  { view: "phd", h: "博士編（学術）", p: "化学・植物学・官能評価・銘柄DB・産業経済・健康科学。" },
  { view: "world", h: "世界編（総覧）", p: "年表・文化・愛好家・日本・実践レビュー・投資・用語大全・トラベル・FAQ。" }
];
function renderHome() {
  $("#homeGrid").innerHTML = HOME_CARDS.map(c => `
    <div class="home-card" data-view="${c.view}">
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
      <div class="prose">${FMT.prose(D.whatIsCigar)}</div>
    </div>

    <div class="kb-block">
      <img class="guide-photo" src="assets/anatomy-guide.png"
           alt="葉巻の構造（アナトミー）と吸い方 ビジュアルガイド"
           onerror="this.closest('.kb-block').remove()">
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
      <div class="prose">${FMT.prose(D.tastingTerms)}</div>
    </div>

    <div class="kb-block">
      <h3>ラッパーの色（シェード）による分類</h3>
      <p class="prose" style="margin-bottom:14px">葉巻の一番外側の葉「ラッパー」の色は、味わいの傾向を映す目安になります（※色の濃さ＝強さ ではなく、強さは主にフィラーが決めます）。</p>
      <div class="shade-grid">${shades}</div>
    </div>

    <div class="kb-block">
      <h3>葉巻の歴史</h3>
      <div class="prose">${FMT.prose(D.history)}</div>
    </div>

    <div class="kb-block">
      <h3>マナー・楽しみ方とペアリング</h3>
      <div class="prose">${FMT.prose(D.manners)}</div>
    </div>

    <div class="kb-block">
      <h3>用語集</h3>
      <div class="glossary">${gloss}</div>
    </div>`;
}

/* ============================================================
   国・産地別
   ============================================================ */
// 各国のインフォグラフィック画像のファイル名（assets/countries/<slug>.png）
const COUNTRY_SLUG = {
  "Cuba": "cuba",
  "Dominican Republic": "dominican-republic",
  "Nicaragua": "nicaragua",
  "Honduras": "honduras",
  "Mexico": "mexico",
  "Ecuador": "ecuador",
  "USA (Connecticut)": "usa-connecticut",
  "Brazil": "brazil",
  "Cameroon": "cameroon"
};

function countryFields(c) {
  return `
    <div class="field"><div class="lbl">風味の特徴</div><div class="val">${FMT.prose(c.flavor)}</div></div>
    <div class="field"><div class="lbl">気候・土壌</div><div class="val">${FMT.prose(c.climate)}</div></div>
    <div class="field"><div class="lbl">主な栽培地域</div>
      <div class="chips">${c.regions.map(r => `<span class="chip">${esc(r)}</span>`).join("")}</div></div>
    <div class="field"><div class="lbl">代表的な銘柄</div>${brandChips(c.brands)}</div>
    <div class="field"><div class="lbl">歴史</div><div class="val">${FMT.prose(c.history)}</div></div>
    <div class="field"><div class="lbl">豆知識</div><div class="val">${FMT.prose(c.trivia)}</div></div>`;
}

function renderCountryDetail(idx) {
  const c = D.countries[idx];
  if (!c) return;
  const slug = COUNTRY_SLUG[c.name_en];
  const img = slug ? `assets/countries/${slug}.png` : "";
  // 画像onerror: 画像リンクを消し、テキストを開いてプレースホルダーを表示
  const onerr = "var d=this.closest('.country-detail');var lk=this.closest('.cd-imglink');if(lk)lk.remove();var t=d.querySelector('.cd-text');if(t){t.open=true;t.classList.add('no-img');}var ph=d.querySelector('.cd-placeholder');if(ph)ph.style.display='block';";
  $("#countryDetail").innerHTML = `
    <div class="country-detail">
      <div class="cd-head">
        <span class="cd-flag">${c.flag}</span>
        <div class="cd-title"><div class="cd-name">${esc(c.name_ja)}</div><div class="cd-en">${esc(c.name_en)}</div></div>
        ${strengthBadge(c.strength)}
      </div>
      ${img ? `<a class="cd-imglink" href="${img}" target="_blank" rel="noopener">
        <img class="cd-img" src="${img}" alt="${esc(c.name_ja)} 葉巻インフォグラフィック" onerror="${onerr}">
        <span class="cf-hint">画像をタップで拡大</span></a>` : ""}
      <div class="cd-placeholder" style="display:none"><b>${esc(c.name_ja)}</b> のインフォグラフィックは準備中です。下のテキスト情報をご覧ください。</div>
      <details class="acc cd-text"><summary>テキストで詳しく見る</summary>
        <div class="acc-body">${countryFields(c)}</div>
      </details>
    </div>`;
}

/* その他・新興の葉巻生産国：フィリピンの詳細セクション（歴史・産地・現代の担い手を掘り下げ） */
function renderPhilippinesDetail() {
  const p = D.philippinesDetail;
  if (!p) return "";
  const sections = p.sections.map(s => `
    <details class="acc">
      <summary>${esc(s.h)}</summary>
      <div class="acc-body">${FMT.prose(s.body)}</div>
    </details>`).join("");
  return `
    <div class="kb-block" style="margin-top:30px">
      <h3>${p.flag} ${esc(p.name_ja)} — 埋もれた葉巻大国を掘り下げる</h3>
      <div class="field"><div class="lbl">強さの目安</div><div class="val">${strengthBadge(p.strength)}</div></div>
      <div class="field"><div class="lbl">風味の特徴</div><div class="val">${FMT.prose(p.flavor)}</div></div>
      <div class="field"><div class="lbl">主な栽培地域</div>
        <div class="chips">${p.regions.map(r => `<span class="chip">${esc(r)}</span>`).join("")}</div></div>
      <div class="field"><div class="lbl">現存する主要ブランド</div>${brandChips(p.brands)}</div>
      <div style="margin-top:16px">${sections}</div>
    </div>`;
}

function renderCountries() {
  // 国・産地別の概要ポスター（画像が無ければ自動で非表示）
  $("#countryOverview").innerHTML = `
    <a class="country-overview" href="assets/countries/_overview.png" target="_blank" rel="noopener">
      <img src="assets/countries/_overview.png" alt="世界の主要葉巻生産国 一覧"
           onerror="var o=document.getElementById('countryOverview');if(o)o.innerHTML='';">
    </a>`;
  // その他・新興の葉巻生産国 概要ポスター（画像が無ければ自動で非表示）
  $("#countryOthers").innerHTML = `
    <div class="kb-block">
      <h3>その他・新興の葉巻生産国</h3>
      <p class="prose" style="margin-bottom:12px">主要9か国のほかにも、高品質なラッパー葉や個性的な葉を支える産地があります（カメルーン、インドネシア／スマトラ、フィリピン、コスタリカ、パナマ、ペルー、コロンビア、エルサルバドル、パラグアイ 等）。</p>
      <a class="country-overview" href="assets/countries/_others.png" target="_blank" rel="noopener">
        <img src="assets/countries/_others.png" alt="第三国・ニューワールド・その他の葉巻生産国 一覧"
             onerror="var o=this.closest('.kb-block');if(o)o.remove();">
      </a>
    </div>
    ${renderPhilippinesDetail()}`;
  $("#countryNav").innerHTML = D.countries.map((c, i) =>
    `<button data-country="${i}"${i === 0 ? ' class="active"' : ''}>${c.flag} ${esc(c.name_ja)}</button>`).join("");
  $("#countryNav").addEventListener("click", (e) => {
    const b = e.target.closest("[data-country]");
    if (!b) return;
    $$("#countryNav button").forEach(x => x.classList.remove("active"));
    b.classList.add("active");
    renderCountryDetail(Number(b.dataset.country));
    $("#countryDetail").scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
  renderCountryDetail(0);
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

  // ゲージ（太さ）ビジュアル一覧
  const gauges = [
    { g: 28, name: "パナテラ", mm: "約11mm" },
    { g: 33, name: "コロナ", mm: "約13mm" },
    { g: 42, name: "ペティコロナ", mm: "約17mm" },
    { g: 46, name: "コロナゴルダ", mm: "約18mm" },
    { g: 50, name: "ロブスト", mm: "約20mm" },
    { g: 52, name: "トロ", mm: "約21mm" },
    { g: 54, name: "トロゴルダ", mm: "約21.5mm" },
    { g: 60, name: "グランロブスト", mm: "約24mm" },
    { g: 64, name: "ダブルトロ", mm: "約25.4mm" }
  ];
  const cigs = gauges.map(x => {
    const w = Math.round(20 + (x.g - 28) * 1.15); // ゲージに比例した幅(px)
    return `<div class="gauge-col">
      <div class="cig" style="width:${w}px"><div class="band"></div></div>
      <div class="g-num">${x.g}</div>
      <div class="g-name">${esc(x.name)}</div>
      <div class="g-mm">${esc(x.mm)}</div>
    </div>`;
  }).join("");
  const refRows = [
    { g: "28〜33", mm: "約11〜13mm", img: "とても細い", feat: "軽やかで上品、短時間向き" },
    { g: "40〜46", mm: "約16〜18mm", img: "細め〜中細", feat: "バランスが良く、スタンダード" },
    { g: "50〜54", mm: "約20〜21.5mm", img: "中太", feat: "味わいと煙量のバランスが良い" },
    { g: "60〜64", mm: "約24〜25.4mm", img: "太め〜極太", feat: "濃厚で煙量も多く、長時間向き" }
  ].map(r => `<tr><td style="color:var(--gold-bright)">${r.g}</td><td>${r.mm}</td><td>${r.img}</td><td>${r.feat}</td></tr>`).join("");

  const gaugeFigure = `
    <div class="kb-block">
      <h3>葉巻の太さの種類（ゲージサイズ）一覧</h3>
      <img class="gauge-photo" src="assets/gauge-size-chart.png"
           alt="葉巻の太さの種類（ゲージサイズ）一覧"
           style="display:none"
           onload="this.style.display='block';var f=document.getElementById('gaugeFallback');if(f)f.style.display='none';"
           onerror="this.remove()">
      <div id="gaugeFallback" class="gauge-figure">
        <div class="gf-lead">葉巻の太さは「ゲージ（直径）」で表され、数値が大きいほど太くなります。</div>
        <div class="gauge-scroll"><div class="gauge-track">${cigs}</div></div>
        <div class="gauge-gradients">
          <div class="gg-row"><div class="gg-lbl">味わい<br>（目安）</div>
            <div class="gg-bar"><span class="l">軽やか・ライト</span><span class="arrow">→</span><span class="r">濃厚・フルボディ</span></div></div>
          <div class="gg-row"><div class="gg-lbl">喫煙時間<br>（目安）</div>
            <div class="gg-bar"><span class="l">短い（20〜30分）</span><span class="arrow">→</span><span class="r">長い（60〜120分）</span></div></div>
        </div>
        <div class="gauge-explain">
          <div class="gauge-def">
            <h4>ゲージ（Ring Gauge）とは？</h4>
            <p>葉巻の直径を1/64インチ単位で表したもの。ゲージが大きいほど太く、煙の量や味わいの濃さ、喫煙時間に影響します。</p>
            <div class="ring-vis"><div class="ring-circle"></div><div class="ring-cap">直径（ゲージ）<br>＝1/64インチ単位</div></div>
          </div>
          <div class="table-wrap">
            <table class="ref"><thead><tr><th>ゲージ</th><th>直径(mm)</th><th>太さのイメージ</th><th>特徴</th></tr></thead>
            <tbody>${refRows}</tbody></table>
          </div>
        </div>
        <div class="callout" style="margin-top:16px">※葉巻の長さ（リングゲージ以外）や形状（パレホ、トーピード、チャーチル等）によっても、喫煙体験は異なります。</div>
      </div>
    </div>`;

  $("#sizesContent").innerHTML = gaugeFigure + `
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
      <div class="callout">初心者の最初の一本には <b>ロブスト（約5インチ × RG50）</b> がおすすめ。まろやかで扱いやすく、30〜45分で楽しめます。</div>
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
      <div class="prose">${FMT.prose(D.priceFactors)}</div>
    </div>
    <div class="kb-block">
      <h3>ドライシガーとプレミアムシガーの違い</h3>
      <div class="prose">${FMT.prose(D.dryVsPremium)}</div>
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
      <div class="field"><div class="lbl">役割</div><div class="val">${FMT.prose(t.role)}</div></div>
      <div class="field"><div class="lbl">種類</div><div class="val">${FMT.prose(t.types)}</div></div>
      <div class="field"><div class="lbl">選び方</div><div class="val">${FMT.prose(t.choose)}</div></div>
      <div class="field"><div class="lbl">使い方</div><div class="val">${FMT.prose(t.use)}</div></div>
      <div class="field"><div class="lbl">価格の目安</div><div class="val">${esc(t.price)}</div></div>
      <div class="field"><div class="lbl">おすすめブランド</div>${brandChips(t.brands)}</div>
    </div>`).join("");

  $("#toolsContent").innerHTML = `
    <div class="grid grid-2">${tools}</div>
    <div class="kb-block">
      <h3>保管の基礎知識</h3>
      <div class="card prose">${FMT.prose(D.storageBasics)}</div>
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
  WORLD.init();
  HUMIDOR.init();
  NOTE.init();
  const start = (location.hash || "#home").slice(1);
  showView(start, { replace: true });
}
document.addEventListener("DOMContentLoaded", init);
