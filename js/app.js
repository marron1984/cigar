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
function brandChips(brands, extraClass = "brand", brandKey = null) {
  return `<div class="chips">${brands.map(b => {
    const inner = `${esc(b.ja)}${b.en ? ` <span style="opacity:.6">${esc(b.en)}</span>` : ""}`;
    if (brandKey) {
      return `<button type="button" class="chip ${extraClass} brand-link" data-bkey="${esc(brandKey)}" data-ben="${esc(b.en || "")}" data-bja="${esc(b.ja || "")}">${inner}<span class="brand-link-go" aria-hidden="true">›</span></button>`;
    }
    return `<span class="chip ${extraClass}">${inner}</span>`;
  }).join("")}</div>`;
}

/* 国・産地別 → ブランド大全 の国キー対応 */
const COUNTRY_BRAND_KEY = {
  "Cuba": "cuba", "Dominican Republic": "dominican", "Nicaragua": "nicaragua",
  "Honduras": "honduras", "Mexico": "mexico", "Ecuador": "ecuador",
  "USA (Connecticut)": "usa", "Brazil": "brazil", "Cameroon": "cameroon",
  "Philippines": "philippines"
};

/* ブランドチップから「ブランド大全」の該当国タブを開き、一致する銘柄があれば展開する */
function openBrandInBrands(key, en, ja) {
  showView("brands");
  const btn = document.querySelector(`#brandsSubnav button[data-bsub="${key}"]`);
  if (btn) btn.click();
  const base = (s) => String(s || "").split(/[（(〔[]/)[0].trim().toLowerCase();
  const enB = base(en), jaB = base(ja);
  setTimeout(() => {
    const container = document.querySelector("#view-brands .sub-view.active");
    if (!container) return;
    // 検索フィルタが残っていれば解除
    const search = container.querySelector(".lex-search");
    if (search && search.value) { search.value = ""; search.dispatchEvent(new Event("input")); }
    let hit = null;
    container.querySelectorAll(".brand-entry").forEach(d => {
      if (hit) return;
      const ds = d.dataset.search || "";
      if ((enB.length >= 3 && ds.includes(enB)) || (jaB.length >= 2 && ds.includes(jaB))) hit = d;
    });
    if (hit) {
      hit.open = true;
      hit.scrollIntoView({ behavior: "smooth", block: "center" });
      hit.classList.remove("brand-flash");
      void hit.offsetWidth;
      hit.classList.add("brand-flash");
    } else if (container.scrollIntoView) {
      container.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, 130);
}

document.addEventListener("click", (e) => {
  const link = e.target.closest(".brand-link");
  if (!link) return;
  e.preventDefault();
  openBrandInBrands(link.dataset.bkey, link.dataset.ben, link.dataset.bja);
});

/* ============================================================
   ナビゲーション
   ============================================================ */
const views = {
  home: "view-home", basics: "view-basics", countries: "view-countries",
  sizes: "view-sizes", prices: "view-prices", tools: "view-tools", humidor: "view-humidor",
  advanced: "view-advanced", phd: "view-phd", japan: "view-japan", world: "view-world", brands: "view-brands",
  news: "view-news",
  note: "view-note"
};
function showView(name, opts = {}) {
  if (!views[name]) name = "home";
  $$(".view").forEach(v => v.classList.remove("active"));
  $("#" + views[name]).classList.add("active");
  $$("#navTabs button, .bottom-nav button").forEach(b =>
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
  if (!tabs) return;
  tabs.classList.toggle("open", open);
  if (btn) { btn.classList.toggle("open", open); btn.setAttribute("aria-expanded", open ? "true" : "false"); }
  const scrim = $("#navScrim");
  if (scrim) { scrim.hidden = !open; scrim.classList.toggle("show", open); }
  const menuBtn = $(".bottom-nav .bn-menu");
  if (menuBtn) menuBtn.classList.toggle("active", open);
  // メニュー展開中は背面のスクロールを固定
  document.body.classList.toggle("nav-open", open);
}
function closeNav() { setNav(false); }

document.addEventListener("click", (e) => {
  if (!(e.target instanceof Element)) return;   // テキストノード等での closest 呼び出しを防ぐ
  const toggle = e.target.closest("[data-nav-toggle]");
  if (toggle) {
    e.preventDefault();
    setNav(!$("#navTabs").classList.contains("open"));
    return;
  }
  if (e.target.closest("#navScrim")) { closeNav(); return; }
  const t = e.target.closest("[data-view]");
  if (t) { e.preventDefault(); showView(t.dataset.view); return; }
  // メニュー外クリックで閉じる（シート内・ヘッダー内のタップでは閉じない）
  if ($("#navTabs").classList.contains("open") && !e.target.closest(".site-header") && !e.target.closest("#navTabs")) closeNav();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeNav();
});

/* 国別など大きな画像は、画面内に収まるライトボックスで表示（新規タブを開かない） */
document.addEventListener("click", (e) => {
  const im = e.target.closest(".gauge-photo, .guide-photo");
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
  { view: "countries", h: "国・産地別", p: "キューバ、ドミニカ、ニカラグア…主要10産地の個性を比較。" },
  { view: "sizes", h: "太さ・サイズ別", p: "リングゲージとビトラ。定番サイズを一覧で。" },
  { view: "prices", h: "価格帯別", p: "入門からハイエンドまで、価格別の選び方。" },
  { view: "tools", h: "喫煙具・保管", p: "カッター、ライター、ヒュミドールの選び方。" },
  { view: "humidor", h: "ヒュミドール大全", p: "歴史・メーカー・使い方・種類・価格を5つの観点で徹底調査。" },
  { view: "advanced", h: "上級編（オタクの世界）", p: "品種・発酵・キューバ通・名門・喫煙術・ペアリング・熟成科学。" },
  { view: "phd", h: "博士編（学術）", p: "化学・植物学・官能評価・銘柄DB・産業経済・健康科学。" },
  { view: "japan", h: "日本ガイド", p: "全国47都道府県の販売店・シガーバー一覧。日本の歴史・税制・喫煙環境・マナーも。" },
  { view: "world", h: "世界編（総覧）", p: "年表・文化・愛好家・日本・実践レビュー・投資・用語大全・トラベル・FAQ。" },
  { view: "brands", h: "ブランド大全", p: "世界の銘柄（マルカ）を創業からの歴史とともに。まずはキューバ全マルカ。" },
  { view: "news", h: "葉巻ニュース", p: "海外一次ソースの最新ニュースを翻訳・要約。新製品・業界・イベント・規制。" }
];
/* 今日の一本：全ブランドから日替わりで1つ紹介（日付で決まるので1日固定） */
function dailyBrandPick() {
  try {
    const COUNTRY_JA_MAP = {
      cuba: "キューバ", dominican: "ドミニカ共和国", nicaragua: "ニカラグア", honduras: "ホンジュラス",
      mexico: "メキシコ", ecuador: "エクアドル", usa: "アメリカ", brazil: "ブラジル", cameroon: "カメルーン",
      peru: "ペルー", colombia: "コロンビア", philippines: "フィリピン", indonesia: "インドネシア", argentina: "アルゼンチン"
    };
    const flat = [];
    Object.keys(BRANDS_DATA).forEach(key =>
      (BRANDS_DATA[key] || []).forEach(b => flat.push({ key, b, cja: COUNTRY_JA_MAP[key] || "" })));
    if (!flat.length) return null;
    const now = new Date();
    const seed = now.getFullYear() * 372 + (now.getMonth() + 1) * 31 + now.getDate();
    return flat[seed % flat.length];
  } catch (e) { return null; }
}

function renderHome() {
  const pick = dailyBrandPick();
  const daily = pick ? `
    <div class="home-card daily-card" data-daily="1">
      <div class="daily-kicker">☀️ 今日の一本 · ${pick.cja}</div>
      <h3>${esc(pick.b.ja)} — ${esc(pick.b.en)}</h3>
      <p>${esc(String(pick.b.history || "").slice(0, 72))}…</p>
      <div class="go">ブランド大全で読む →</div>
    </div>` : "";
  $("#homeGrid").innerHTML = daily + HOME_CARDS.map(c => `
    <div class="home-card" data-view="${c.view}">
      <h3>${c.h}</h3>
      <p>${c.p}</p>
      <div class="go">開く →</div>
    </div>`).join("");
  const dc = $("#homeGrid .daily-card");
  if (dc && pick) dc.addEventListener("click", () => openBrandInBrands(pick.key, pick.b.en, pick.b.ja));
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
// 深掘りセクション（countries_deep.js が各国に追加する sections / sources）を描画
function countrySections(c) {
  if (!Array.isArray(c.sections) || !c.sections.length) return "";
  return `<div class="cd-sections">` + c.sections.map(s => `
    <details class="acc">
      <summary>${esc(s.h)}</summary>
      <div class="acc-body">${FMT.prose(s.body)}</div>
    </details>`).join("") + `</div>`;
}

// 出典文字列内のURLをクリック可能なリンクにする（それ以外はエスケープ）
function srcLink(s) {
  return String(s).split(/(https?:\/\/[^\s、，）)]+)/g).map((part, i) =>
    i % 2 ? `<a href="${esc(part)}" target="_blank" rel="noopener">${esc(part)}</a>` : esc(part)
  ).join("");
}

function countrySources(c) {
  if (!Array.isArray(c.sources) || !c.sources.length) return "";
  return `
    <div class="field"><div class="lbl">主な出典 <span class="brand-refs-n">${c.sources.length}件</span></div>
      <ul class="brand-refs">${c.sources.map(s => `<li>${srcLink(s)}</li>`).join("")}</ul></div>`;
}

function countryFields(c) {
  return `
    <div class="field"><div class="lbl">風味の特徴</div><div class="val">${FMT.prose(c.flavor)}</div></div>
    <div class="field"><div class="lbl">気候・土壌</div><div class="val">${FMT.prose(c.climate)}</div></div>
    <div class="field"><div class="lbl">主な栽培地域</div>
      <div class="chips">${c.regions.map(r => `<span class="chip">${esc(r)}</span>`).join("")}</div></div>
    <div class="field"><div class="lbl">代表的な銘柄</div>${brandChips(c.brands, "brand", COUNTRY_BRAND_KEY[c.name_en])}</div>
    <div class="field"><div class="lbl">歴史</div><div class="val">${FMT.prose(c.history)}</div></div>
    <div class="field"><div class="lbl">豆知識</div><div class="val">${FMT.prose(c.trivia)}</div></div>
    ${countrySections(c)}
    ${countrySources(c)}`;
}

function renderCountryDetail(idx) {
  const c = D.countries[idx];
  if (!c) return;
  $("#countryDetail").innerHTML = `
    <div class="country-detail">
      <div class="cd-head">
        <span class="cd-flag">${c.flag}</span>
        <div class="cd-title"><div class="cd-name">${esc(c.name_ja)}</div><div class="cd-en">${esc(c.name_en)}</div></div>
        ${strengthBadge(c.strength)}
      </div>
      <div class="cd-body">${countryFields(c)}</div>
    </div>`;
}

/* フィリピン：他国と同じタブ内詳細として表示（埋もれた葉巻大国を掘り下げる） */
function renderPhilippinesDetail() {
  const p = D.philippinesDetail;
  if (!p) return;
  const sections = p.sections.map(s => `
    <details class="acc">
      <summary>${esc(s.h)}</summary>
      <div class="acc-body">${FMT.prose(s.body)}</div>
    </details>`).join("");
  $("#countryDetail").innerHTML = `
    <div class="country-detail">
      <div class="cd-head">
        <span class="cd-flag">${p.flag}</span>
        <div class="cd-title"><div class="cd-name">${esc(p.name_ja)}</div><div class="cd-en">${esc(p.name_en)}</div></div>
        ${strengthBadge(p.strength)}
      </div>
      <div class="cd-body">
        <div class="field"><div class="lbl">風味の特徴</div><div class="val">${FMT.prose(p.flavor)}</div></div>
        <div class="field"><div class="lbl">主な栽培地域</div>
          <div class="chips">${p.regions.map(r => `<span class="chip">${esc(r)}</span>`).join("")}</div></div>
        <div class="field"><div class="lbl">現存する主要ブランド</div>${brandChips(p.brands, "brand", "philippines")}</div>
        <div class="cd-sections">${sections}</div>
      </div>
    </div>`;
}

function renderCountries() {
  if ($("#countryOverview")) $("#countryOverview").innerHTML = "";
  // その他・新興の葉巻生産国（フィリピンは独立タブへ移動）
  $("#countryOthers").innerHTML = `
    <div class="kb-block">
      <h3>その他・新興の葉巻生産国</h3>
      <p class="prose" style="margin-bottom:12px">主要国のほかにも、高品質なラッパー葉や個性的な葉を支える産地があります（インドネシア／スマトラ、コスタリカ、パナマ、ペルー、コロンビア、エルサルバドル、パラグアイ 等）。</p>
    </div>`;
  const tabs = D.countries.map((c, i) =>
    `<button data-country="${i}"${i === 0 ? ' class="active"' : ''}>${c.flag} ${esc(c.name_ja)}</button>`).join("");
  const phTab = D.philippinesDetail
    ? `<button data-country="ph">${D.philippinesDetail.flag} ${esc(D.philippinesDetail.name_ja)}</button>` : "";
  $("#countryNav").innerHTML = tabs + phTab;
  $("#countryNav").addEventListener("click", (e) => {
    const b = e.target.closest("[data-country]");
    if (!b) return;
    $$("#countryNav button").forEach(x => x.classList.remove("active"));
    b.classList.add("active");
    if (b.dataset.country === "ph") renderPhilippinesDetail();
    else renderCountryDetail(Number(b.dataset.country));
    $("#countryDetail").scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
  renderCountryDetail(0);
}

/* ============================================================
   太さ・サイズ別
   ============================================================ */
function renderSizes() {
  // スマホで横スクロールせず読めるよう、表ではなくカード形式で表示
  const vitolaCards = D.vitolas.map(v => `
    <div class="vitola-card">
      <div class="vc-name">${esc(v.ja)}<span class="vc-en">${esc(v.en)}</span></div>
      <div class="vc-specs">
        <div class="vc-spec"><span class="vc-k">長さ</span><span class="vc-v">${esc(v.len)}</span></div>
        <div class="vc-spec"><span class="vc-k">リングゲージ</span><span class="vc-v">${esc(v.rg)}</span></div>
        <div class="vc-spec"><span class="vc-k">喫煙時間</span><span class="vc-v">${esc(v.time)}</span></div>
      </div>
      <p class="vc-feat">${esc(v.feat)}</p>
    </div>`).join("");

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
      <div class="vitola-list">${vitolaCards}</div>
    </div>

    <div class="kb-block">
      <h3>太さ別ガイド（細い vs 太い）</h3>
      <div class="prose"><p>${esc(D.thicknessGuide)}</p></div>
      <div class="callout">初心者の最初の一本には <b>ロブスト（約5インチ × RG50）</b> がおすすめ。まろやかで扱いやすく、30〜45分で楽しめます。</div>
    </div>

    <div class="kb-block">
      <h3>形状の分類（パラホ / フィギュラード）</h3>
      <div class="prose"><p>${esc(D.shapeClassification)}</p></div>
    </div>

    <div class="kb-block" id="realSizeBox"></div>`;
}

/* ============================================================
   価格帯別
   ============================================================ */
// 出典リスト（拡充データ用の共通ヘルパー）
function sourcesField(sources) {
  if (!Array.isArray(sources) || !sources.length) return "";
  return `<div class="field"><div class="lbl">主な出典 <span class="brand-refs-n">${sources.length}件</span></div>
    <ul class="brand-refs">${sources.map(s => `<li>${srcLink(s)}</li>`).join("")}</ul></div>`;
}

function renderPrices() {
  const tiers = D.priceTiers.map(t => {
    const secs = Array.isArray(t.sections) && t.sections.length
      ? `<div class="tool-more">${t.sections.map(s =>
          `<details class="acc tool-sub"><summary>${esc(s.h)}</summary><div class="acc-body">${FMT.prose(s.body)}</div></details>`).join("")}</div>`
      : "";
    return `
    <div class="card tier-card">
      <h3>${esc(t.tier)}</h3>
      <div class="price-band">${esc(t.range)}</div>
      <div class="field"><div class="lbl">特徴</div><div class="val">${FMT.prose(t.feat)}</div></div>
      <div class="field"><div class="lbl">こんな人に</div><div class="val">${FMT.prose(t.whom)}</div></div>
      <div class="field"><div class="lbl">代表的な銘柄</div>${brandChips(t.brands)}</div>
      <div class="field"><div class="lbl">アドバイス</div><div class="val">${FMT.prose(t.advice)}</div></div>
      ${secs}
      ${sourcesField(t.sources)}
    </div>`;
  }).join("");

  const topics = Array.isArray(D.priceTopics) && D.priceTopics.length
    ? `<div class="kb-block">
        <h3>価格を深く読み解く</h3>
        <div class="tool-list">${D.priceTopics.map(t => `
          <details class="acc">
            <summary>${esc(t.h)}</summary>
            <div class="acc-body">${FMT.prose(t.body)}${sourcesField(t.sources)}</div>
          </details>`).join("")}</div>
      </div>`
    : "";

  $("#pricesContent").innerHTML = `
    <div class="grid grid-2">${tiers}</div>
    ${topics}
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
  const list = [...D.tools].sort((a, b) => (a.order || 0) - (b.order || 0));
  // 各喫煙具をアコーディオン化し、長文が一度に並んで間延びしないようにする。
  // 詳細内も「基本（役割・選び方・価格・ブランド）」を先に見せ、
  // 参照色の濃い項目（種類・使い方・手入れ・歴史）は入れ子アコーディオンに畳む。
  const sub = (label, body) => body
    ? `<details class="acc tool-sub"><summary>${esc(label)}</summary><div class="acc-body">${FMT.prose(body)}</div></details>` : "";
  const tools = list.map((t, i) => `
    <details class="acc tool-acc"${i === 0 ? " open" : ""}>
      <summary>
        <span class="tool-sum"><span class="tool-ic">${t.icon}</span>
          <span class="tool-sum-txt">${esc(t.ja)}<span class="tool-sum-en">${esc(t.en)}</span></span></span>
      </summary>
      <div class="acc-body tool-body">
        <div class="field"><div class="lbl">役割</div><div class="val">${FMT.prose(t.role)}</div></div>
        <div class="field"><div class="lbl">選び方</div><div class="val">${FMT.prose(t.choose)}</div></div>
        <div class="tool-more">
          ${sub("種類・バリエーション", t.types)}
          ${sub("使い方", t.use)}
          ${sub("手入れ・トラブル対処", t.care)}
          ${sub("歴史・文化・豆知識", t.history)}
        </div>
        <div class="field"><div class="lbl">価格の目安</div><div class="val">${FMT.prose(t.price)}</div></div>
        <div class="field"><div class="lbl">おすすめブランド</div>${brandChips(t.brands)}</div>
      </div>
    </details>`).join("");

  $("#toolsContent").innerHTML = `
    <div class="tool-list">${tools}</div>
    <details class="acc storage-acc">
      <summary>📦 保管の基礎知識</summary>
      <div class="acc-body prose">${FMT.prose(D.storageBasics)}</div>
    </details>`;
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
  JAPAN.init();
  HUMIDOR.init();
  BRANDS.init();
  NOTE.init();
  const start = (location.hash || "#home").slice(1);
  showView(start, { replace: true });
}
document.addEventListener("DOMContentLoaded", init);
