/* ============================================================
   Cigar Cafe — はじめの一本さがし
   ------------------------------------------------------------
   254銘柄を前にした人が、いちばん最初につまずくのは
   「で、結局どれを買えばいいのか」。そこに答えを出すための道具。

   4つの問いに答えると、合いそうな3銘柄と、その日にちょうどよい
   太さ（ヴィトラ）を出す。選んだ理由も一緒に見せる。

   ■ 何をもとに選んでいるか
   ・強さ    … 要約データの s（［下限, 上限］。1=マイルド 〜 4.5=フル）
   ・産地    … 収録国のキー
   ・知名度  … 要約データの o（国ごとの並び順。小さいほど手に入りやすい定番）
   価格は銘柄ごとのデータを持っていないので、選定には使っていない。

   ■ 重い本体データは読まない
   判定は data/summary.js（どのページでも読んである軽い要約）だけで行う。
   ブランド大全4.8MBは、結果から銘柄を開くときに初めて読む。
   ============================================================ */
const FINDER = (() => {
  const q = (s) => document.querySelector(s);
  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  /* 産地キー → 表示名（記録ノート・在庫と同じ言い方に揃える） */
  const COUNTRY_JA = {
    cuba: "キューバ", dominican: "ドミニカ共和国", nicaragua: "ニカラグア", honduras: "ホンジュラス",
    mexico: "メキシコ", ecuador: "エクアドル", usa: "アメリカ", brazil: "ブラジル", cameroon: "カメルーン",
    peru: "ペルー", colombia: "コロンビア", philippines: "フィリピン", indonesia: "インドネシア", argentina: "アルゼンチン"
  };

  const QUESTIONS = [
    {
      id: "exp", q: "葉巻を吸ったことはありますか？",
      opts: [
        { v: "first", l: "はじめて", s: "これから一本目" },
        { v: "few", l: "何本か", s: "まだ探している途中" },
        { v: "used", l: "慣れている", s: "好みが分かってきた" }
      ]
    },
    {
      id: "time", q: "どのくらいの時間がとれますか？",
      opts: [
        { v: "short", l: "30分ほど", s: "短めに一服" },
        { v: "mid", l: "1時間くらい", s: "ゆっくりめ" },
        { v: "long", l: "たっぷり", s: "時間を気にせず" }
      ]
    },
    {
      id: "body", q: "味わいの好みは？",
      opts: [
        { v: "light", l: "軽やかに", s: "穏やかで香りを楽しむ" },
        { v: "medium", l: "ほどよく", s: "軽すぎず重すぎず" },
        { v: "full", l: "しっかり", s: "濃く力強い" }
      ]
    },
    {
      id: "origin", q: "産地に希望はありますか？",
      opts: [
        { v: "cuba", l: "キューバ", s: "本場を試したい" },
        { v: "new", l: "新世界", s: "中米・カリブの新しい作り手" },
        { v: "any", l: "こだわらない", s: "おいしければどこでも" }
      ]
    }
  ];

  /* 答え → 求める強さの中心。慣れていない人には強すぎるものを勧めない */
  const WANT = { light: 1.4, medium: 2.6, full: 4.0 };
  const CAP = { first: 3.0, few: 3.8, used: 5 };     // 経験に応じた上限

  /* 時間 → すすめる太さ。data/data.js の vitolas から実データを引く */
  const TIME_VITOLA = {
    short: ["プティ・コロナ", "ロブスト", "コロナ"],
    mid: ["ロブスト", "トロ", "コロナ"],
    long: ["チャーチル", "トロ", "ダブルコロナ"]
  };

  let step = 0;
  const answers = {};

  /* すすめる相手は「日本で手に入る見込みのある葉巻」。
     エクアドル・カメルーンはラッパー葉の産地が主で、完成品の銘柄はほぼ流通しない。
     ペルー・コロンビア・アルゼンチン・インドネシアは地元向けが中心で、
     事典としては載せていても「はじめの一本」には向かない。
     ブランド大全ではこれらも全部読めるので、案内先を絞るだけにとどめる。 */
  const RECOMMEND = ["cuba", "dominican", "nicaragua", "honduras", "mexico", "usa", "brazil", "philippines"];

  /* 案内から外すもの（ブランド大全には載っている。ここで出さないだけ）。
     ・機械巻きの量販銘柄 … コンビニ・ドラッグストアの一本で、
       このサイトが扱う手巻きプレミアムとは別の土俵にある
     ・会社・工場・historical な項目 … 買える「銘柄」ではない
     英語名で持つ（表示言語が変わっても同じものを指すため）。 */
  const SKIP = new Set([
    "Swisher Sweets", "Dutch Masters", "Avanti / Parodi", "Marsh Wheeling",
    "Black & Mild", "White Owl", "Backwoods", "Phillies", "Garcia y Vega",
    "King Edward", "Hav-A-Tampa", "Bering",
    "Ybor City / V. Martinez Ybor & Co.", "General Cigar Company",
    "Altadis U.S.A. Inc. / Tabacalera USA Inc.",
    "Nueva Matacapan de Tabacos (Tabacalera Alberto Turrent)",
    "Tabacos y Puros de San Andrés",
    "Fábrica de Tabacos Raíces Cubanas S. de R.L. (Raíces Cubanas)"
  ]);

  /* ---------- 選ぶ ---------- */
  function candidates() {
    const S = (typeof BRANDS_SUMMARY !== "undefined" && BRANDS_SUMMARY.brands) || {};
    const out = [];
    RECOMMEND.forEach(key => {
      (S[key] || []).forEach(b => {
        if (b.k === "leaf" || !b.s || SKIP.has(b.en)) return;   // 葉・産地、強さ不明、案内対象外
        /* 国ごとの並び順が後ろのものは、工場・商社・地方の小銘柄が多い。
           はじめの一本としては案内しない。 */
        const order = b.o || 99;
        if (order > 20) return;
        out.push({ key, ja: b.ja, en: b.en, lo: b.s[0], hi: b.s[1], order, f: b.f });
      });
    });
    return out;
  }

  function score(b, a) {
    const want = WANT[a.body];
    const cap = CAP[a.exp];
    const center = (b.lo + b.hi) / 2;
    const width = b.hi - b.lo;
    /* 強さは「銘柄の真ん中」で測る。幅に入っていれば少し足す。 */
    let s = 100 - Math.abs(center - want) * 22;
    if (b.lo <= want && want <= b.hi) s += 8;
    /* 「マイルド〜フル」のように幅の広いものは、銘柄全体をまとめた言い方であって
       一本の性格を表していない。どの答えにも当たってしまうので、その分を引く。 */
    s -= width * 9;
    /* 経験に見合わない強さは大きく下げる（はじめての一本でフルボディは勧めない） */
    if (center > cap) s -= (center - cap) * 26;
    /* 産地の希望 */
    if (a.origin === "cuba") s += b.key === "cuba" ? 24 : -30;
    else if (a.origin === "new") s += b.key === "cuba" ? -30 : 12;
    /* 知名度。国ごとの並び順が前のものほど、店で見かけやすい定番。
       はじめての人には強く、慣れた人には控えめに効かせる。 */
    const fame = Math.max(0, 20 - b.order);
    s += fame * (a.exp === "first" ? 2.2 : a.exp === "few" ? 1.4 : 0.7);
    return s;
  }

  function reason(b, a) {
    const bits = [];
    const want = WANT[a.body];
    const center = (b.lo + b.hi) / 2;
    if (Math.abs(center - want) <= 0.6) bits.push(T("好みの強さに合う"));
    else if (center < want) bits.push(T("好みよりやや穏やか"));
    else bits.push(T("好みよりやや力強い"));
    if (a.origin === "cuba" && b.key === "cuba") bits.push(T("本場キューバ"));
    else if (a.origin === "new" && b.key !== "cuba") bits.push(I18N.country(COUNTRY_JA[b.key] || ""));
    if (b.order <= 5) bits.push(T("入手しやすい定番"));
    return bits.join(DOT());
  }

  const STRENGTH_WORD = (n) =>
    n <= 1.2 ? T("マイルド") : n <= 1.9 ? T("ライト") : n <= 2.9 ? T("ミディアム")
      : n <= 3.9 ? T("ミディアムフル") : T("フル");
  /* 区切りは表示言語に合わせる（英語版に「〜」「・」を出さない） */
  const DASH = () => (I18N.isEn ? "–" : "〜");
  const DOT = () => (I18N.isEn ? " · " : "・");
  const strengthLabel = (b) =>
    b.lo === b.hi ? STRENGTH_WORD(b.lo) : STRENGTH_WORD(b.lo) + DASH() + STRENGTH_WORD(b.hi);

  /* 寸法は「124〜133mm」のように数字だけなので訳文を持たない。
     英語版では波ダッシュだけ英語の書き方に直す。 */
  const dim = (s) => (I18N.isEn ? String(s || "").replace(/〜/g, "–") : String(s || ""));

  function vitolaPick(a) {
    const names = TIME_VITOLA[a.time] || [];
    const list = (typeof CIGAR_DATA !== "undefined" && CIGAR_DATA.vitolas) || [];
    for (const n of names) {
      const v = list.find(x => String(x.ja).indexOf(n) === 0 || x.ja === n);
      if (v) return v;
    }
    return null;
  }

  /* ---------- 画面 ---------- */
  function render() {
    const root = q("#finderBox");
    if (!root) return;
    if (step < QUESTIONS.length) return renderQuestion(root);
    renderResult(root);
  }

  function renderQuestion(root) {
    const Q = QUESTIONS[step];
    root.innerHTML = `
      <div class="fd-card">
        <div class="fd-step">${T("{a} / {b}", { a: step + 1, b: QUESTIONS.length })}</div>
        <h3 class="fd-q">${esc(T(Q.q))}</h3>
        <div class="fd-opts">${Q.opts.map(o => `
          <button type="button" class="fd-opt" data-v="${esc(o.v)}">
            <b>${esc(T(o.l))}</b><span>${esc(T(o.s))}</span>
          </button>`).join("")}
        </div>
        ${step > 0 ? `<button type="button" class="fd-back" id="fdBack">← ${T("ひとつ戻る")}</button>` : ""}
      </div>`;
    root.querySelectorAll(".fd-opt").forEach(btn =>
      btn.addEventListener("click", () => { answers[Q.id] = btn.dataset.v; step++; render(); }));
    const back = q("#fdBack");
    if (back) back.addEventListener("click", () => { step--; render(); });
  }

  function renderResult(root) {
    const a = answers;
    const list = candidates().map(b => ({ b, s: score(b, a) })).sort((x, y) => y.s - x.s);
    const top = list.slice(0, 3);
    const v = vitolaPick(a);

    if (!top.length) {
      root.innerHTML = `<div class="fd-card"><p class="prose">${T("データを読み込めませんでした。ページを開き直してみてください。")}</p></div>`;
      return;
    }

    root.innerHTML = `
      <div class="fd-card fd-result">
        <div class="fd-step">${T("あなたに合いそうな3本")}</div>
        <ol class="fd-hits">${top.map(({ b }, i) => `
          <li>
            <button type="button" class="fd-hit" data-key="${esc(b.key)}" data-en="${esc(b.en)}" data-ja="${esc(b.ja)}">
              <span class="fd-rank">${i + 1}</span>
              <span class="fd-name">
                <b>${esc(namePair(b.ja, b.en)[0])}</b>
                <span class="en">${esc(namePair(b.ja, b.en)[1])}</span>
              </span>
              <span class="fd-meta">${esc(I18N.country(COUNTRY_JA[b.key] || "") + DOT() + strengthLabel(b))}</span>
              <span class="fd-why">${esc(reason(b, a))}</span>
              <span class="fd-go">${T("くわしく見る")} →</span>
            </button>
          </li>`).join("")}
        </ol>
        ${v ? `<div class="fd-vitola">
          <b>${T("太さはこのあたりを")}</b>
          <span>${esc(namePair(v.ja, v.en)[0])}${I18N.isEn ? ` (${esc(dim(v.len))} / ${esc(dim(v.time))})` : `（${esc(v.len)}／${esc(v.time)}）`}</span>
          <span class="fd-vfeat">${esc(v.feat || "")}</span>
        </div>` : ""}
        <p class="fd-note">${T("強さ・産地・定番かどうかから選んでいます。値段は銘柄ごとの資料が無いため、選定には入れていません。")}</p>
        <div class="fd-again">
          <button type="button" class="fd-retry" id="fdRetry">${T("もう一度えらぶ")}</button>
          <button type="button" class="fd-retry" data-view="prices">${T("価格帯から探す")} →</button>
        </div>
      </div>`;

    root.querySelectorAll(".fd-hit").forEach(btn => btn.addEventListener("click", () => {
      openBrandInBrands(btn.dataset.key, btn.dataset.en, btn.dataset.ja);
    }));
    q("#fdRetry").addEventListener("click", () => { step = 0; render(); });
  }

  function init() {
    step = 0;
    Object.keys(answers).forEach(k => delete answers[k]);
    render();
  }

  return { init };
})();
