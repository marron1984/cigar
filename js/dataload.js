/* ============================================================
   Cigar Cafe — データの後読み込み
   ------------------------------------------------------------
   以前は data/*.js（合計 6.7MB）を全部 <script> で先に読んでいたため、
   ホームを開くだけでブランド大全4.8MBまで待たされていた。
   ここでは「そのページを開いたときに、そのページのデータだけ読む」形にする。

   ・DATA.pack("brands") … そのビューに要るファイルを読み終えたら解決する Promise
   ・一度読んだファイルは覚えておき、二度は読まない
   ・script.async = false で挿し込むので、入れた順に実行される
     （world_deep.js は world.js の後、という前提が守られる）
   ・英語版（/en/）では data/en/*.js の差し替えも同じ組に入れて読む
   ============================================================ */
const DATA = (() => {
  /* このファイル自身の在り処から、サイトの根っこ（data/ や assets/ がある場所）を
     割り出す。currentScript.src は絶対URLに解決済みなので、
     /brands/ のような下層ページでも、pushState でアドレスが変わったあとでも、
     同じ場所を指し続ける（相対パスのままだと下層で迷子になる）。 */
  const BASE = (() => {
    const el = document.currentScript;
    const src = el ? el.src : "";
    const i = src.lastIndexOf("js/dataload.js");
    return i >= 0 ? src.slice(0, i) : "";
  })();
  /* JSが後から作る <img> などの当て先。ほかのファイルからも使う。 */
  window.SITE_ROOT = BASE;

  const isEn = (typeof window !== "undefined" && window.SITE_LANG === "en");

  /* ビュー名 → 読み込むファイル。en は英語版でだけ足す差し替えデータ
     （元データの後に読み、該当項目を英語文に置き換える）。 */
  const PACKS = {
    basics:    { files: [], en: ["data/en/basics.js"] },
    sizes:     { files: [], en: ["data/en/sizes.js"] },
    /* はじめの一本さがしは、すすめる太さの寸法・時間をサイズのデータから引く */
    finder:    { files: [], en: ["data/en/sizes.js"] },
    countries: { files: ["data/countries_deep.js", "data/philippines_deep.js"],
                 en: ["data/en/countries_a.js", "data/en/countries_b.js"] },
    prices:    { files: ["data/prices_deep.js"], en: ["data/en/prices.js"] },
    tools:     { files: ["data/tools.js"], en: ["data/en/tools_a.js", "data/en/tools_b.js"] },
    humidor:   { files: ["data/humidor.js"], en: ["data/en/humidor.js"] },
    advanced:  { files: ["data/advanced.js", "data/advanced_deep.js"],
                 en: ["data/en/advanced_1.js", "data/en/advanced_2.js", "data/en/advanced_3.js", "data/en/advanced_4.js"] },
    phd:       { files: ["data/phd.js", "data/phd_lit.js"],
                 en: ["data/en/phd_1.js", "data/en/phd_2.js", "data/en/phd_3.js"] },
    world:     { files: ["data/world.js", "data/world_deep.js"],
                 en: ["data/en/japan_guide.js", "data/en/world_1.js", "data/en/world_2.js", "data/en/world_3.js", "data/en/world_4.js", "data/en/world_5.js", "data/en/world_6.js"] },
    /* 日本ガイドの解説は世界編（WORLD_DATA.japan）から作るので、世界編も要る */
    japan:     { needs: ["world"], files: ["data/japan_shops.js"], en: ["data/en/japan_shops.js", "data/en/japan_visitor.js"] },
    brands:    { files: ["data/brands.js"],
                 en: ["data/en/brands_cuba_1.js", "data/en/brands_cuba_2.js", "data/en/brands_cuba_3.js", "data/en/brands_cuba_4.js", "data/en/brands_cuba_5.js", "data/en/brands_cuba_6.js", "data/en/brands_cuba_7.js", "data/en/brands_cuba_8.js",
                      "data/en/brands_dominican_1.js", "data/en/brands_dominican_2.js", "data/en/brands_dominican_3.js", "data/en/brands_dominican_4.js", "data/en/brands_dominican_5.js", "data/en/brands_dominican_6.js", "data/en/brands_dominican_7.js", "data/en/brands_dominican_8.js", "data/en/brands_dominican_9.js", "data/en/brands_dominican_10.js",
                      "data/en/brands_nicaragua_1.js", "data/en/brands_nicaragua_2.js", "data/en/brands_nicaragua_3.js", "data/en/brands_nicaragua_4.js", "data/en/brands_nicaragua_5.js", "data/en/brands_nicaragua_6.js", "data/en/brands_nicaragua_7.js", "data/en/brands_nicaragua_8.js", "data/en/brands_nicaragua_9.js", "data/en/brands_nicaragua_10.js",
                      "data/en/brands_usa_1.js", "data/en/brands_usa_2.js", "data/en/brands_usa_3.js", "data/en/brands_usa_4.js", "data/en/brands_usa_5.js", "data/en/brands_usa_6.js",
                      "data/en/brands_honduras_1.js", "data/en/brands_honduras_2.js", "data/en/brands_honduras_3.js", "data/en/brands_honduras_4.js", "data/en/brands_honduras_5.js",
                      "data/en/brands_mexico_1.js", "data/en/brands_mexico_2.js", "data/en/brands_mexico_3.js",
                      "data/en/brands_philippines_1.js", "data/en/brands_philippines_2.js", "data/en/brands_philippines_3.js",
                      "data/en/brands_indonesia_1.js", "data/en/brands_indonesia_2.js",
                      "data/en/brands_brazil_1.js", "data/en/brands_brazil_2.js",
                      "data/en/brands_colombia_1.js", "data/en/brands_colombia_2.js",
                      "data/en/brands_argentina_1.js", "data/en/brands_ecuador_1.js", "data/en/brands_peru_1.js", "data/en/brands_cameroon_1.js"] },
    news:      { files: ["data/news.js"] }
  };

  const loading = new Map();      // ファイル名 → Promise（読み込み中／済み）
  let pending = 0;                // いま読み込み中の本数（進捗バーの表示に使う）

  function bump(d) {
    pending += d;
    const el = document.getElementById("dataProgress");
    if (el) el.classList.toggle("on", pending > 0);
  }

  function loadFile(rel) {
    if (loading.has(rel)) return loading.get(rel);
    const p = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = BASE + rel;
      s.async = false;            // 挿し込んだ順に実行させる（読み込み順が意味を持つため）
      s.onload = () => { bump(-1); resolve(rel); };
      s.onerror = () => {
        bump(-1);
        // 失敗は覚えない。通信が戻ったあと、もう一度開けばやり直せるように
        loading.delete(rel);
        s.remove();
        reject(new Error(rel));
      };
      bump(1);
      document.head.appendChild(s);
    });
    loading.set(rel, p);
    return p;
  }

  function filesOf(name) {
    const p = PACKS[name];
    if (!p) return [];
    const out = [];
    (p.needs || []).forEach(n => out.push(...filesOf(n)));
    out.push(...(p.files || []));
    if (isEn) out.push(...(p.en || []));
    return out;
  }
  /* 英語の差し替えファイルだけを列挙（読み込み失敗の扱いを分けるため） */
  function enFilesOf(name) {
    const p = PACKS[name];
    if (!p || !isEn) return [];
    const out = [];
    (p.needs || []).forEach(n => out.push(...enFilesOf(n)));
    out.push(...(p.en || []));
    return out;
  }

  /* 指定ビューのデータを揃える。読むものが無いビューは即座に解決する。
     英語の差し替えは「無ければ日本語のまま表示」でよいので、
     読み込みに失敗してもページの表示は止めない（本体データの失敗は止める）。 */
  function pack(name) {
    const files = filesOf(name);
    if (!files.length) return Promise.resolve();
    const en = new Set(enFilesOf(name));
    return Promise.all(files.map(f =>
      en.has(f) ? loadFile(f).catch(() => undefined) : loadFile(f)
    )).then(() => undefined);
  }

  /* すでに読み始めている（＝待たずに済む）か */
  const has = (name) => { const f = filesOf(name); return f.length > 0 && f.every(x => loading.has(x)); };

  /* 先読み。回線が細い端末や通信量節約モードでは何もしない。
     opts.now が真なら（メニューに触れた等、すぐ開きそうなとき）待たずに読み始める。 */
  function prefetch(names, opts) {
    const c = navigator.connection;
    if (c && (c.saveData || /^(slow-)?2g$/.test(c.effectiveType || ""))) return;
    const todo = names.filter(n => PACKS[n] && !has(n));
    if (!todo.length) return;
    const run = () => todo.forEach(n => pack(n).catch(() => {}));
    if (opts && opts.now) run();
    else if (typeof requestIdleCallback === "function") requestIdleCallback(run, { timeout: 4000 });
    else setTimeout(run, 1500);
  }

  return { pack, prefetch, has, packs: Object.keys(PACKS) };
})();
