/* ============================================================
   葉巻大辞典 — 世界編レンダリング
   10サブセクション（年表・文化・愛好家・日本・テイスティング・
   その他の葉巻・投資・用語大全・トラベル・神話FAQ）
   ============================================================ */

const WORLD = (() => {
  /* データ本体は、このページを開いたときに読み込む（js/dataload.js）。
     読み込みが済んでから init() が呼ばれるので、そこで受け取る。 */
  let W = null;
  const useData = () => { if (!W) W = WORLD_DATA; };
  const qw = (s, el = document) => el.querySelector(s);
  const e = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const paras = (t) => FMT.prose(t);  // 改行・【】見出し・長文を読みやすい段落に
  const block = (title, inner, count) =>
    `<div class="kb-block"><h3>${e(title)}${count ? `<span class="data-count">${e(count)}</span>` : ""}</h3>${inner}</div>`;
  // 各サブセクション末尾に主要出典を表示（WORLD_DATA.sources[key]）
  const sourcesBlock = (key) => {
    const s = (W.sources && W.sources[key]) || [];
    if (!s.length) return "";
    return `<div class="kb-block"><div class="brand-refs" style="margin-top:0"><div class="brand-refs-h">主要出典 <span class="brand-refs-n">${s.length}件</span></div><ol>${s.map(x => `<li>${e(x)}</li>`).join("")}</ol></div></div>`;
  };

  /* ---------- 1. 年表・通史 ---------- */
  function history() {
    const tl = `<div class="htimeline">${W.timeline.map(t => `
      <div class="ht-item">
        <div class="ht-y">${e(t.year)}</div>
        <div class="ht-t">${e(t.title)}</div>
        <div class="ht-d">${e(t.desc)}</div>
      </div>`).join("")}</div>`;
    const fig = `<div class="person-grid">${W.figures.map(f => `
      <div class="person">
        <div class="pn">${e(f.name)}</div>
        <div class="pf">${e(f.era)}</div>
        <div class="ps">${e(f.contribution)}</div>
      </div>`).join("")}</div>`;
    return block("葉巻の通史・詳細年表", tl, `${W.timeline.length}項目`)
      + block("歴史を作った重要人物", fig, `${W.figures.length}名`);
  }

  /* ---------- 2. 世界の文化・名店 ---------- */
  function culture() {
    const fes = `<div class="grid grid-2">${W.festivals.map(f => `
      <div class="card"><h4 style="font-family:var(--serif);color:var(--cream);font-size:1.15rem">${e(f.name)}</h4>
        <div class="pw" style="font-size:.8rem;color:var(--gold-bright);margin:4px 0">${e(f.place)} ・ ${e(f.when)}</div>
        <div class="val" style="font-size:.9rem;color:var(--text-soft)">${e(f.desc)}</div></div>`).join("")}</div>`;
    const ven = `<div class="grid grid-2">${W.venues.map(v => `
      <div class="card"><h4 style="font-family:var(--serif);color:var(--cream);font-size:1.12rem">${e(v.name)}</h4>
        <div class="pw" style="font-size:.78rem;color:var(--gold);margin:4px 0">${e(v.city)}, ${e(v.country)}</div>
        <div class="val" style="font-size:.9rem;color:var(--text-soft)">${e(v.desc)}</div></div>`).join("")}</div>`;
    const reg = W.regionalCulture.map(r => `
      <details class="acc"><summary>${e(r.region)}</summary><div class="acc-body"><p>${e(r.desc)}</p></div></details>`).join("");
    return block("世界の葉巻フェスティバル・イベント", fes, `${W.festivals.length}件`)
      + block("世界の著名シガーバー・名店", ven, `${W.venues.length}軒`)
      + block("地域別の葉巻文化", `<p class="prose" style="margin-bottom:10px">各地域をタップで展開。</p>${reg}`, `${W.regionalCulture.length}地域`)
      + block("葉巻にまつわる慣習・豆知識", `<div class="prose">${paras(W.cultureCustoms)}</div>`);
  }

  /* ---------- 3. 著名愛好家 ---------- */
  function smokers() {
    const cards = `<div class="person-grid">${W.smokers.map(s => `
      <div class="person">
        <div class="pn">${e(s.name)}</div>
        <div class="pf">${e(s.field)} ・ ${e(s.era)}</div>
        <div class="ps">${e(s.story)}</div>
        ${s.favorite ? `<div class="pfav">好んだ銘柄：${e(s.favorite)}</div>` : ""}
      </div>`).join("")}</div>`;
    return block("歴史上・現代の著名な葉巻愛好家", cards, `${W.smokers.length}名`);
  }

  /* ---------- 4. 日本ガイド ---------- */
  function shopCard(s) {
    return `<div class="shop-card">
      <div class="sh-name">${e(s.name)}</div>
      <div class="sh-meta"><span class="sh-type">${e(s.type_en || s.type)}</span><span class="sh-area">${e(s.area)}</span></div>
      <div class="sh-desc">${e(s.desc)}</div>
      ${s.note ? `<div class="sh-note">${e(s.note)}</div>` : ""}
    </div>`;
  }
  function japan() {
    const J = W.japan;
    const buys = J.osakaShops.filter(s => /専門店|百貨店/.test(s.type));
    const bars = J.osakaShops.filter(s => !/専門店|百貨店/.test(s.type));
    const osaka = `
      <div class="callout warn">${T("掲載の店舗情報は公開情報をもとにした<b>目安</b>です。営業状況・品揃え・喫煙可否・持込ルールは変わりやすいため、来店前に各店の公式・電話でご確認ください（「※要確認」付きは特に）。")}</div>
      <h4 style="font-family:var(--serif);color:var(--cream);font-size:1.15rem;margin:18px 0 10px">${e(T("葉巻を買える専門店・売り場"))}<span class="data-count">${T("{n}店", { n: buys.length })}</span></h4>
      <div class="shop-grid">${buys.map(shopCard).join("")}</div>
      <h4 style="font-family:var(--serif);color:var(--cream);font-size:1.15rem;margin:22px 0 10px">${e(T("シガーバー・ラウンジ（店内で購入・喫煙）"))}<span class="data-count">${T("{n}軒", { n: bars.length })}</span></h4>
      <div class="shop-grid">${bars.map(shopCard).join("")}</div>
      <div class="kb-block" style="margin-top:18px"><h3>${e(T("大阪で葉巻を探すコツ"))}</h3><div class="prose">${paras(J.osakaTips)}</div></div>`;
    return block(T("日本の葉巻の歴史"), `<div class="prose">${paras(J.history)}</div>`)
      + block(T("輸入・流通・税制"), `<div class="prose">${paras(J.tax)}</div>`)
      + block(T("日本で葉巻を買う"), `<div class="prose">${paras(J.buy)}</div>`)
      + block(T("【大阪】葉巻が買えるお店・シガーバー"), osaka, T("{n}店", { n: J.osakaShops.length }))
      + block(T("日本の喫煙環境"), `<div class="prose">${paras(J.environment)}</div>`)
      + block(T("日本の葉巻文化・和のマナー"), `<div class="prose">${paras(J.culture)}</div>`)
      + block(T("初心者が日本で葉巻を始めるには"), `<div class="callout">${e(T("まずは信頼できるシガーバーで一本を、が最短ルートです。"))}</div><div class="prose">${paras(J.beginner)}</div>`);
  }

  /* ---------- 5. テイスティング集 ---------- */
  function tasting() {
    let searchWired = false;
    const cards = W.reviews.map(r => reviewCard(r)).join("");
    const html = block("実践テイスティングノート集",
      `<input type="text" class="note-search lex-search" id="reviewSearch" placeholder="銘柄・産地・強さ・風味で検索…">
       <div id="reviewList" class="grid grid-2">${cards}</div>`, `${W.reviews.length}本`);
    return html;
  }
  function strengthBadge(s) {
    const cls = /フル/.test(s) ? "s-full" : /ミディアム|M\/F|M〜/.test(s) ? "s-medium" : "s-mild";
    return `<span class="strength-badge ${cls}">${e(s)}</span>`;
  }
  function reviewCard(r) {
    return `<div class="review-card" data-search="${e((r.cigar + r.origin + r.strength + r.first + r.middle + r.final + r.summary).toLowerCase())}">
      <div class="rv-top">
        <div><h4>${e(r.cigar)}</h4><div class="rv-sub">${e(r.origin)} ・ ${e(r.size)} ・ ${e(r.wrapper)}</div></div>
        ${strengthBadge(r.strength)}
      </div>
      <div class="rv-chips"><span class="chip">${e(r.price)}</span></div>
      <div class="rv-thirds">
        <div class="rv-third"><span class="lb">序盤</span><span class="tx">${e(r.first)}</span></div>
        <div class="rv-third"><span class="lb">中盤</span><span class="tx">${e(r.middle)}</span></div>
        <div class="rv-third"><span class="lb">終盤</span><span class="tx">${e(r.final)}</span></div>
        <div class="rv-third"><span class="lb">造り</span><span class="tx">${e(r.construction)}</span></div>
        <div class="rv-third"><span class="lb">ペア</span><span class="tx">${e(r.pairing)}</span></div>
      </div>
      <div class="rv-foot"><span class="k">総評</span> ${e(r.summary)}</div>
    </div>`;
  }

  /* ---------- 6. その他の葉巻 ---------- */
  function other() {
    const cats = `<div class="table-wrap"><table class="ref">
      <thead><tr><th>種類</th><th>価格（日本）</th><th>喫煙時間</th><th>特徴</th></tr></thead>
      <tbody>${W.otherCategories.map(c => `<tr>
        <td><span class="vn" style="font-size:.95rem">${e(c.type)}</span></td>
        <td>${e(c.price)}</td><td>${e(c.time)}</td><td>${e(c.desc)}</td></tr>`).join("")}</tbody></table></div>`;
    const brands = `<div class="table-wrap"><table class="ref">
      <thead><tr><th>ブランド</th><th>国</th><th>タイプ</th><th>特徴</th></tr></thead>
      <tbody>${W.otherBrands.map(b => `<tr>
        <td><span class="vn" style="font-size:.9rem">${e(b.name)}</span></td>
        <td>${e(b.country)}</td><td>${e(b.type)}</td><td>${e(b.desc)}</td></tr>`).join("")}</tbody></table></div>`;
    return block("カテゴリ解説（リトル/シガリロ/ドライ/フレーバー/機械巻き）", cats, `${W.otherCategories.length}種`)
      + block("主要ブランド一覧", brands, `${W.otherBrands.length}銘柄`)
      + block("日本で買えるドライ/リトルシガー", `<div class="prose">${paras(W.otherJapan)}</div>`)
      + block("プレミアムとの違い・位置づけ", `<div class="prose">${paras(W.otherVsPremium)}</div>`);
  }

  /* ---------- 7. 投資・コレクション ---------- */
  function invest() {
    const I = W.invest;
    const exp = `<div class="grid grid-2">${I.mostExpensive.map(m => `
      <div class="card"><h4 style="font-family:var(--serif);color:var(--gold-bright);font-size:1.1rem">${e(m.name)}</h4>
        <div class="price-band" style="font-size:1.2rem;margin:4px 0">${e(m.price)}</div>
        <div class="val" style="font-size:.88rem;color:var(--text-soft)">${e(m.note)}</div></div>`).join("")}</div>`;
    const leg = W.invest.vintageLegends.map(v => `
      <details class="acc"><summary>${e(v.name)}</summary><div class="acc-body"><p>${e(v.desc)}</p></div></details>`).join("");
    return block("葉巻投資の考え方", `<div class="research-note"><span class="rn-h">Note</span>数値はいずれも概算。嗜好品ゆえ流動性が低く、あくまで趣味の延長・分散資産の一つとして。</div><div class="prose">${paras(I.thesis)}</div>`)
      + block("オークション市場", `<div class="prose">${paras(I.auctions)}</div>`)
      + block("史上最も高価な葉巻", exp, `${I.mostExpensive.length}選`)
      + block("ヴィンテージ・生産終了の伝説的銘柄", `<p class="prose" style="margin-bottom:10px">各銘柄をタップで展開。</p>${leg}`, `${W.invest.vintageLegends.length}選`)
      + block("年代の見分け方と保管", `<div class="prose">${paras(I.dating)}</div>`)
      + block("コレクションの始め方", `<div class="prose">${paras(I.start)}</div>`);
  }

  /* ---------- 8. 用語大全 ---------- */
  function lexicon() {
    const items = W.lexicon.map(l => `
      <div class="lex" data-search="${e((l.ja + l.es + l.en + l.desc).toLowerCase())}">
        <div class="lx-ja">${e(l.ja)}</div>
        <div class="lx-for"><span class="es">${e(l.es)}</span> / ${e(l.en)}</div>
        <div class="lx-d">${e(l.desc)}</div>
      </div>`).join("");
    return block("多言語・葉巻用語大全（西 / 英 / 日）",
      `<input type="text" class="note-search lex-search" id="lexSearch" placeholder="用語を検索（日本語・スペイン語・英語）…">
       <div id="lexList" class="lex-grid">${items}</div>`, `${W.lexicon.length}語`);
  }

  /* ---------- 9. トラベル・購入 ---------- */
  function travel() {
    const T = W.travel;
    const cust = `<div class="table-wrap"><table class="ref">
      <thead><tr><th>国・地域</th><th>葉巻の免税持込み（目安）</th><th>注意</th></tr></thead>
      <tbody>${T.customs.map(c => `<tr>
        <td><span class="vn" style="font-size:.92rem">${e(c.country)}</span></td>
        <td>${e(c.allowance)}</td><td>${e(c.note)}</td></tr>`).join("")}</tbody></table></div>`;
    return block("ハバナ（キューバ）での購入ガイド", `<div class="callout warn">『工員のおすそ分け』を騙る路上販売はほぼ偽物。公認店で正価・領収書つきが鉄則です。</div><div class="prose">${paras(T.havana)}</div>`)
      + block("旅先での偽物回避チェックリスト", `<div class="prose">${paras(T.fakes)}</div>`)
      + block("主要国の免税・持込み規制", `<div class="research-note"><span class="rn-h">Note</span>数値はいずれも目安で、改定されうるため各国税関公式で最新確認を。</div>${cust}`, `${T.customs.length}か国`)
      + block("免税店（デューティフリー）活用のコツ", `<div class="prose">${paras(T.dutyFree)}</div>`)
      + block("オンライン購入・個人輸入の注意", `<div class="prose">${paras(T.online)}</div>`)
      + block("日本への持込み・個人輸入", `<div class="prose">${paras(T.japanBring)}</div>`);
  }

  /* ---------- 10. 神話・FAQ ---------- */
  function myths() {
    const verdictClass = (v) => /誤り/.test(v) ? "mv-false" : /半分/.test(v) ? "mv-half" : "mv-true";
    const m = W.myths.map(x => `
      <div class="myth-item">
        <div class="mc">「${e(x.claim)}」</div>
        <span class="myth-verdict ${verdictClass(x.verdict)}">判定：${e(x.verdict)}</span>
        <div class="me">${e(x.explanation)}</div>
      </div>`).join("");
    const f = W.faq.map(x => `
      <div class="qa-item"><div class="q">${e(x.q)}</div><div class="a">${e(x.a)}</div></div>`).join("");
    return block("葉巻の神話・都市伝説の検証", `<p class="prose" style="margin-bottom:12px">よくある俗説を事実で検証します。</p>${m}`, `${W.myths.length}件`)
      + block("初心者からのよくある質問（FAQ）", f, `${W.faq.length}問`);
  }

  const R = { history, culture, smokers, japan, tasting, other, invest, lexicon, travel, myths };
  const done = {};

  function wireSearch(name) {
    if (name === "tasting") {
      const inp = qw("#reviewSearch");
      if (inp) inp.addEventListener("input", (ev) => {
        const t = ev.target.value.trim().toLowerCase();
        qw("#reviewList").querySelectorAll(".review-card").forEach(c =>
          c.style.display = (!t || c.dataset.search.includes(t)) ? "" : "none");
      });
    }
    if (name === "lexicon") {
      const inp = qw("#lexSearch");
      if (inp) inp.addEventListener("input", (ev) => {
        const t = ev.target.value.trim().toLowerCase();
        qw("#lexList").querySelectorAll(".lex").forEach(c =>
          c.style.display = (!t || c.dataset.search.includes(t)) ? "" : "none");
      });
    }
  }

  function showSub(name) {
    useData();
    if (!R[name]) name = "history";
    if (!done[name]) { qw("#wsub-" + name).innerHTML = R[name]() + sourcesBlock(name); done[name] = true; wireSearch(name); }
    document.querySelectorAll("#view-world .sub-view").forEach(v => v.classList.remove("active"));
    qw("#wsub-" + name).classList.add("active");
    document.querySelectorAll("#worldSubnav button").forEach(b =>
      b.classList.toggle("active", b.dataset.wsub === name));
  }

  function init() {
    useData();
    qw("#worldSubnav").addEventListener("click", (ev) => {
      const b = ev.target.closest("[data-wsub]");
      if (b) showSub(b.dataset.wsub);
    });
    showSub("history");
  }

  // 日本ガイドは独立メニューへ昇格。既存の解説HTMLを外部（JAPANモジュール）へ提供する。
  function japanGuideHTML() {
    useData(); return japan() + sourcesBlock("japan"); }

  return { init, showSub, japanGuideHTML };
})();
