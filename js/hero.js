/* ============================================================
   Cigar Cafe — ホームのヒーロー写真の入れ替え
   ------------------------------------------------------------
   全画面のヒーローに複数の写真を用意しておき、ゆっくり切り替える。

   ・最初の1枚は index.html に直接書いてある（表示の速さを落とさないため）。
     2枚目以降はページが落ち着いてから読み込む。
   ・切り替えは重ね置きした <img> の透明度で行う（位置ずれが起きない）。
   ・写真を増やすときは PHOTOS に足すだけ。assets/ に置いた名前を書く。
     pos は横長の画面で切り抜かれるときの見せどころ（縦位置）。主役が下寄りの
     写真は大きめの数字にする。省略すればCSSの既定（center 32%）のまま。
   ・動きを減らす設定の端末、通信量節約モード、細い回線では
     最初の1枚のままにする（増やした写真は読み込まない）。
   ============================================================ */
const HERO = (() => {
  const PHOTOS = [
    { src: "hero-welcome.webp" },
    { src: "hero-cafe.webp", pos: "center 38%" },    // 談笑する3人の顔がやや上
    { src: "hero-lounge.webp", pos: "center 64%" }   // 灰皿の一本が下寄り
  ];
  const HOLD = 9000;        // 1枚を見せている長さ
  const FADE = 1600;        // 重なって入れ替わる長さ（CSSと揃える）

  let timer = null;

  const quiet = () => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
    const c = navigator.connection;
    return !!(c && (c.saveData || /^(slow-)?2g$/.test(c.effectiveType || "")));
  };

  function init() {
    const first = document.querySelector(".hero-cine .hc-media");
    if (!first || PHOTOS.length < 2 || quiet()) return;

    const base = (window.SITE_ROOT || "/") + "assets/";
    /* 1枚目は既に出ている。2枚目以降を同じ場所に重ねて作る。 */
    const layers = [first];
    if (PHOTOS[0].pos) first.style.objectPosition = PHOTOS[0].pos;
    let ref = first;                    // 並びを PHOTOS と同じにするための挿し込み位置
    PHOTOS.slice(1).forEach(ph => {
      const img = new Image();
      img.className = "hc-media hc-next";
      img.alt = "";
      img.setAttribute("aria-hidden", "true");
      img.decoding = "async";
      if (ph.pos) img.style.objectPosition = ph.pos;
      img.src = base + ph.src;
      ref.parentNode.insertBefore(img, ref.nextSibling);
      ref = img;
      layers.push(img);
    });

    let i = 0;
    const step = () => {
      const cur = layers[i];
      i = (i + 1) % layers.length;
      const nxt = layers[i];
      /* 拡大の動きを頭から見せたいので、出るたびに付け直す */
      nxt.style.animation = "none";
      void nxt.offsetWidth;
      nxt.style.animation = "";
      nxt.classList.add("on");
      cur.classList.remove("on");
      timer = setTimeout(step, HOLD + FADE);
    };
    layers[0].classList.add("on");
    timer = setTimeout(step, HOLD);

    /* 画面を離れているあいだは止める（戻ったら続きから） */
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) { clearTimeout(timer); timer = null; }
      else if (!timer) timer = setTimeout(step, HOLD);
    });
  }

  /* 表示を邪魔しないよう、ページが出来上がってから始める */
  if (document.readyState === "complete") setTimeout(init, 1200);
  else window.addEventListener("load", () => setTimeout(init, 1200));

  return { init };
})();
