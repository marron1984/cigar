/* ============================================================
   葉巻大辞典 — 共通テキスト整形（FMT）
   データ内の長文文字列を読みやすいHTMLに変換する。
   - \n で段落分割
   - 【ラベル】を小見出し（.ph）として独立表示
   - 長すぎる段落は文単位（。区切り）で適度な長さに自動分割
   すべての描画モジュールより先に読み込むこと。
   ============================================================ */
const FMT = (() => {
  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

  // 長い段落を文の切れ目（。）でおよそ CHUNK 文字ごとの塊に分割する。
  // 「」内の句点では切らない簡易判定として、閉じ括弧の直前では区切らない。
  const CHUNK = 130;
  function chunkSentences(par) {
    if (par.length <= CHUNK * 1.6) return [par];
    const sentences = par.match(/[^。]*。(?![」』）\)])|[^。]+。?$/g) || [par];
    const out = [];
    let cur = "";
    for (const s of sentences) {
      cur += s;
      if (cur.length >= CHUNK) { out.push(cur); cur = ""; }
    }
    if (cur.trim()) out.push(cur);
    return out;
  }

  function prose(text) {
    const paragraphs = String(text == null ? "" : text).split("\n")
      .map(s => s.trim()).filter(Boolean);
    const html = [];
    for (const par of paragraphs) {
      // 【ラベル】の直前で分割し、各セグメントを見出し付き段落として描画。
      // 英語版の本文は同じ役割に [ラベル] を使うので、そちらも見出しとして扱う。
      const segs = par.split(/(?=【)|(?=^\[)/m).filter(s => s.trim());
      for (const seg of segs) {
        const m = seg.match(/^【(.+?)】\s*([\s\S]*)$/) || seg.match(/^\[([^\]]+)\]\s*([\s\S]*)$/);
        if (m) {
          html.push(`<span class="ph">${esc(m[1])}</span>`);
          for (const c of chunkSentences(m[2])) {
            if (c.trim()) html.push(`<p>${esc(c)}</p>`);
          }
        } else {
          for (const c of chunkSentences(seg)) {
            html.push(`<p>${esc(c)}</p>`);
          }
        }
      }
    }
    return html.join("");
  }

  return { prose, esc };
})();
