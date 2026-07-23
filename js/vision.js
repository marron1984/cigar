/* ============================================================
   葉巻大辞典 — 写真からのAI自動入力（画像認識）
   ------------------------------------------------------------
   記録ノートで写真をアップロードすると、Supabase Edge Function
   （identify-cigar）経由で Claude の画像認識を呼び出し、
   銘柄・ブランド・産地・サイズを推定してフォームに自動入力する。

   VISION_CONFIG.enabled が false のときは何もしない（従来どおり手入力）。
   APIキーはサーバー側（Supabase シークレット）にのみ置く。ここには置かない。
   設定手順は VISION_SETUP.md 参照。
   ============================================================ */

const VISION = (() => {
  const cfg = window.VISION_CONFIG || {};
  const enabled = !!(cfg.enabled && cfg.endpoint);

  // 写真（dataURL）を認識サーバーへ送り、構造化された推定結果を受け取る。
  // hints: { countries:[], vitolas:[], brands:[] }（選択肢に表記を合わせるための手がかり）
  async function identify(imageDataUrl, hints) {
    if (!enabled) throw new Error("画像認識は未設定です");
    const headers = { "Content-Type": "application/json" };
    // Supabase Functions は anon キー（公開キー）での認証を要求する
    if (cfg.anonKey) {
      headers["Authorization"] = "Bearer " + cfg.anonKey;
      headers["apikey"] = cfg.anonKey;
    }
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 45000);
    let res;
    try {
      res = await fetch(cfg.endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify({
          image: imageDataUrl,
          countries: (hints && hints.countries) || [],
          vitolas: (hints && hints.vitolas) || [],
          brands: (hints && hints.brands) || [],
        }),
        signal: ctrl.signal,
      });
    } catch (e) {
      clearTimeout(timer);
      throw new Error(e.name === "AbortError" ? "時間がかかりすぎました" : "サーバーに接続できませんでした");
    }
    clearTimeout(timer);
    let data;
    try { data = await res.json(); } catch { throw new Error("サーバーの応答を読み取れませんでした"); }
    if (!res.ok || (data && data.error)) {
      throw new Error((data && data.error) || `サーバーエラー (${res.status})`);
    }
    return data; // { name, brand, country, vitola, strength, band_readable, confidence, notes }
  }

  // 保存済みの記録から、AIの一言講評（テキストのみ）を生成する
  async function comment(entry) {
    if (!enabled) throw new Error("AI機能は未設定です");
    const headers = { "Content-Type": "application/json" };
    if (cfg.anonKey) {
      headers["Authorization"] = "Bearer " + cfg.anonKey;
      headers["apikey"] = cfg.anonKey;
    }
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 45000);
    let res;
    try {
      res = await fetch(cfg.endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify({ mode: "comment", entry: entry || {} }),
        signal: ctrl.signal,
      });
    } catch (e) {
      clearTimeout(timer);
      throw new Error(e.name === "AbortError" ? "時間がかかりすぎました" : "サーバーに接続できませんでした");
    }
    clearTimeout(timer);
    let data;
    try { data = await res.json(); } catch { throw new Error("サーバーの応答を読み取れませんでした"); }
    if (!res.ok || (data && data.error)) {
      const msg = (data && data.error) || `サーバーエラー (${res.status})`;
      // 旧バージョンの関数はcommentモード未対応（画像必須エラーを返す）
      if (/画像/.test(msg)) throw new Error("サーバー関数の更新が必要です（VISION_SETUP.md の最新コードを再デプロイしてください）");
      throw new Error(msg);
    }
    if (!data.comment) throw new Error("講評を生成できませんでした");
    return data.comment;
  }

  // 日本語のテキストを自然な英語に翻訳して返す
  async function translate(text) {
    if (!enabled) throw new Error("AI機能は未設定です");
    const headers = { "Content-Type": "application/json" };
    if (cfg.anonKey) { headers["Authorization"] = "Bearer " + cfg.anonKey; headers["apikey"] = cfg.anonKey; }
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 45000);
    let res;
    try {
      res = await fetch(cfg.endpoint, {
        method: "POST", headers,
        body: JSON.stringify({ mode: "translate", text: String(text || "") }),
        signal: ctrl.signal,
      });
    } catch (e) {
      clearTimeout(timer);
      throw new Error(e.name === "AbortError" ? "時間がかかりすぎました" : "サーバーに接続できませんでした");
    }
    clearTimeout(timer);
    let data;
    try { data = await res.json(); } catch { throw new Error("サーバーの応答を読み取れませんでした"); }
    if (!res.ok || (data && data.error)) {
      const msg = (data && data.error) || `サーバーエラー (${res.status})`;
      if (/画像/.test(msg)) throw new Error("サーバー関数の更新が必要です（VISION_SETUP.md の最新コードを再デプロイしてください）");
      throw new Error(msg);
    }
    if (!data.text) throw new Error("翻訳結果を取得できませんでした");
    return data.text;
  }

  return { enabled, identify, comment, translate };
})();
