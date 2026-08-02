/* ============================================================
   葉巻大辞典 — 用語クイズ（博士編の下部）
   用語大全（WORLD_DATA.lexicon）から3択クイズを自動生成する。
   ============================================================ */
const QUIZ = (() => {
  const q = (s) => document.querySelector(s);
  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  let pool = [];
  let current = null;
  let score = 0, total = 0, streak = 0;

  /* 選択肢に出す語。英語版では英語の用語（無ければ日本語のまま）。
     西語の添え字は両方の版で出す（用語大全と同じ流儀）。 */
  const term = (t) => (I18N.isEn && t.en) || t.ja;

  function pick(n, exclude) {
    // pool からランダムに n 件（exclude 以外）
    const cand = pool.filter(t => t !== exclude);
    const out = [];
    while (out.length < n && cand.length) {
      const i = Math.floor(Math.random() * cand.length);
      out.push(cand.splice(i, 1)[0]);
    }
    return out;
  }

  function nextQuestion() {
    const answer = pick(1)[0];
    if (!answer) return;
    const wrong = pick(2, answer);
    const choices = [answer, ...wrong].sort(() => Math.random() - 0.5);
    current = { answer, choices };
    const box = q("#quizBody");
    if (!box) return;
    box.innerHTML = `
      <div class="qz-q">${T("この説明にあてはまる用語は？")}</div>
      <div class="qz-desc">${esc(answer.desc)}</div>
      <div class="qz-choices">${choices.map((c, i) => `
        <button type="button" class="qz-c" data-qz="${i}">${esc(term(c))}${c.es ? `<span class="qz-es">${esc(c.es)}</span>` : ""}</button>`).join("")}
      </div>
      <div class="qz-fb" id="quizFb"></div>`;
    box.querySelectorAll("[data-qz]").forEach(btn => {
      btn.addEventListener("click", () => answerTap(Number(btn.dataset.qz), btn));
    });
  }

  function answerTap(i, btn) {
    if (!current || current.done) return;
    current.done = true;
    total++;
    const ok = current.choices[i] === current.answer;
    if (ok) { score++; streak++; } else streak = 0;
    const box = q("#quizBody");
    box.querySelectorAll(".qz-c").forEach((b, j) => {
      b.disabled = true;
      if (current.choices[j] === current.answer) b.classList.add("right");
      else if (j === i) b.classList.add("wrong");
    });
    const fb = q("#quizFb");
    fb.innerHTML = `
      <div class="${ok ? "qz-ok" : "qz-ng"}">${ok
        ? (streak >= 3 ? T("🎉 正解！ {n}問連続！", { n: streak }) : T("⭕ 正解！"))
        : T("❌ 正解は「{t}」", { t: esc(term(current.answer)) })}</div>
      <button type="button" class="btn btn-sm btn-primary" id="quizNext">${T("次の問題 →")}</button>`;
    updateScore();
    q("#quizNext").addEventListener("click", nextQuestion);
  }

  function updateScore() {
    const el = q("#quizScore");
    if (el) el.textContent = total ? T("{s} / {t} 問正解", { s: score, t: total }) : "";
  }

  function init() {
    const root = q("#quizBox");
    if (!root) return;
    // 用語は要約データ（data/summary.js）から取る。世界編の本体（0.5MB）を
    // クイズのためだけに読み込まないようにするため。
    try {
      const lex = (typeof BRANDS_SUMMARY !== "undefined" && BRANDS_SUMMARY.lexicon)
        || (typeof WORLD_DATA !== "undefined" && WORLD_DATA.lexicon) || [];
      pool = lex.filter(t => t.ja && t.desc && t.desc.length > 20);
    } catch (e) { pool = []; }
    if (pool.length < 6) return;
    root.innerHTML = `
      <div class="quiz-card">
        <div class="qz-head">
          <h3>${T("🎓 用語クイズに挑戦")}</h3>
          <span class="qz-score" id="quizScore"></span>
        </div>
        <p class="photo-hint">${T("用語大全（{n}語）から自動出題。説明文に合う用語を選んでください。", { n: pool.length })}</p>
        <div id="quizBody"><button type="button" class="btn btn-primary" id="quizStart">${T("クイズを始める")}</button></div>
      </div>`;
    q("#quizStart").addEventListener("click", nextQuestion);
  }

  document.addEventListener("DOMContentLoaded", init);
  return { init };
})();
