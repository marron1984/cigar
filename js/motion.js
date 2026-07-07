/* ============================================================
   葉巻大辞典 — モーション（スクロールリビール・アコーディオン開閉・
   View Transitions によるページ切替・統計カードのカウントアップ）
   最後に読み込むこと（showView 等、既存のグローバル関数を上書きするため）
   ============================================================ */
(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) document.documentElement.classList.add("motion-off");

  /* ---------- 1. スクロールで要素をフェードアップ表示 ---------- */
  const REVEAL_SELECTOR = [
    ".home-card", ".card", ".country-card", ".tool-card", ".person",
    ".review-card", ".entry", ".shop-card", ".gloss-item", ".compound",
    ".pair-card", ".qa-item", ".myth-item", ".lex", ".gauge-figure",
    ".stat-box", ".tier-card", ".shade"
  ].join(",");

  let revealIO = null;
  if (!reduceMotion && "IntersectionObserver" in window) {
    revealIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in-view");
        revealIO.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
  }

  function observeReveal(root) {
    if (!revealIO || !root) return;
    if (root.nodeType !== 1) return;
    if (root.matches && root.matches(REVEAL_SELECTOR) && !root.classList.contains("in-view")) {
      revealIO.observe(root);
    }
    root.querySelectorAll && root.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
      if (!el.classList.contains("in-view")) revealIO.observe(el);
    });
  }

  if (revealIO) {
    observeReveal(document.body);
    // 記録ノートなど、後から動的に追加されるカードも自動的に監視対象へ
    new MutationObserver((mutations) => {
      mutations.forEach((m) => m.addedNodes.forEach((n) => observeReveal(n)));
    }).observe(document.body, { childList: true, subtree: true });
  }

  /* ---------- 2. アコーディオン（<details class="acc">）の開閉を高さアニメーション ---------- */
  if (!reduceMotion) {
    document.addEventListener("click", (e) => {
      const summary = e.target.closest(".acc > summary");
      if (!summary) return;
      const details = summary.parentElement;
      const body = details.querySelector(":scope > .acc-body");
      if (!body) return;

      if (details.open) {
        // 閉じる：ネイティブの瞬間クローズを止めて高さ0までアニメーションしてから閉じる
        e.preventDefault();
        const h = body.scrollHeight;
        body.style.height = h + "px";
        body.style.opacity = "1";
        // 強制リフローで現在の高さを確定させてから0へ
        void body.offsetHeight;
        requestAnimationFrame(() => {
          body.style.height = "0px";
          body.style.opacity = "0";
        });
        body.addEventListener("transitionend", function onEnd(ev) {
          if (ev.propertyName !== "height") return;
          body.removeEventListener("transitionend", onEnd);
          details.open = false;
          body.style.height = "";
          body.style.opacity = "";
        });
      } else {
        // 開く：0 → 実測の高さへアニメーション（ネイティブの open 処理はそのまま進める）
        requestAnimationFrame(() => {
          const h = body.scrollHeight;
          body.style.height = "0px";
          body.style.opacity = "0";
          void body.offsetHeight;
          body.style.height = h + "px";
          body.style.opacity = "1";
          body.addEventListener("transitionend", function onEnd(ev) {
            if (ev.propertyName !== "height") return;
            body.removeEventListener("transitionend", onEnd);
            body.style.height = ""; // 内容変化やリサイズに追従できるよう auto に戻す
          });
        });
      }
    });
  }

  /* ---------- 3. ハッシュ切り替えを View Transitions API で滑らかにクロスフェード ---------- */
  if (!reduceMotion && typeof showView === "function" && document.startViewTransition) {
    const originalShowView = showView;
    showView = function (name) {
      document.startViewTransition(() => originalShowView(name));
    };
  }

  /* ---------- 4. 統計カードの数字をカウントアップ ---------- */
  if (!reduceMotion && "IntersectionObserver" in window) {
    const countIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        countIO.unobserve(entry.target);
        animateCount(entry.target);
      });
    }, { threshold: 0.4 });

    function observeCounts(root) {
      if (!root || root.nodeType !== 1) return;
      if (root.matches && root.matches(".stat-box .sv")) countIO.observe(root);
      root.querySelectorAll && root.querySelectorAll(".stat-box .sv").forEach((el) => countIO.observe(el));
    }
    observeCounts(document.body);
    new MutationObserver((mutations) => {
      mutations.forEach((m) => m.addedNodes.forEach((n) => observeCounts(n)));
    }).observe(document.body, { childList: true, subtree: true });
  }

  function animateCount(el) {
    const raw = el.textContent.trim();
    // 先頭の非数字プレフィックス（¥ など）・数値本体・末尾サフィックス（本、% など）に分解
    const m = raw.match(/^([^\d\-+]*)([+\-]?[\d,]+(?:\.\d+)?)(.*)$/);
    if (!m) return;
    const prefix = m[1];
    const end = parseFloat(m[2].replace(/,/g, ""));
    if (!isFinite(end)) return;
    const suffix = m[3];
    const isFloat = m[2].includes(".");
    const dur = 900;
    const t0 = performance.now();
    function tick(now) {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out-cubic
      const val = end * eased;
      el.textContent = prefix + (isFloat ? val.toFixed(1) : Math.round(val).toLocaleString()) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = raw; // 誤差なく元の表記に戻す
    }
    requestAnimationFrame(tick);
  }
})();
