/* ============================================================
   Cigar Cafe — ログイン（Supabase Auth）
   ------------------------------------------------------------
   記録ノートのクラウド同期を「本人だけが読み書きできる」形にするための
   認証まわり。AUTH_SETUP.md のSQLを実行した構成（v2）でだけ意味を持ち、
   実行前（v1）のデータベースでは何もしない。v1/v2 の判別は
   CLOUD.schemaVersion()（app_meta テーブルの有無）で行う。

   ・ログインはメールのリンク（Magic Link）を基本にする。パスワードを
     覚えさせない・保存しないため。Googleはダッシュボード側で有効化
     されていれば使える（されていなければボタンからのエラーで分かる）。
   ・Supabaseのクライアントは cloud.js と同じものを共有する。
     二つ作るとセッションの持ち主が分かれてしまうため。
   ・ライブラリの読み込みは重い（CDN約100KB）ので、普段は記録ノートを
     開くまで待つ。ただし「ログインリンクから戻ってきた直後」と
     「前回のセッションが残っている」ときだけは、ページを開いた時点で
     起こす——リンクの受け取り（URLの ?code=）はページ読み込み時に
     しか処理できないため。
   ============================================================ */
const AUTH = (() => {
  const enabled = typeof CLOUD !== "undefined" && CLOUD.enabled;
  let session = null;
  let started = null;              // start() の Promise（多重起動を防ぐ）
  const listeners = [];

  const user = () => (session && session.user) || null;
  const userId = () => (user() ? user().id : null);
  const signedIn = () => !!userId();
  const email = () => (user() && user().email) || "";

  function onChange(fn) { listeners.push(fn); }
  function emit() { listeners.forEach(f => { try { f(session); } catch (e) {} }); }

  /* ログイン後、profiles に自分の行を用意する（表示名は記録者名かメールの頭）。
     失敗しても同期は動くので、静かに諦める */
  async function ensureProfile() {
    if (!signedIn()) return;
    try {
      const c = await CLOUD.client();
      let name = "";
      try { name = (localStorage.getItem("cigar_journal_author") || "").trim(); } catch (e) {}
      if (!name) name = (email().split("@")[0] || "smoker").slice(0, 20);
      await c.from("profiles").upsert({ id: userId(), username: name }, { onConflict: "id" });
    } catch (e) { /* profiles 未作成（v1）や一時的な失敗はここでは問題にしない */ }
  }

  async function start() {
    if (!enabled) return;
    let c;
    try { c = await CLOUD.client(); }     // 作成時に detectSessionInUrl が ?code= を処理する
    catch (e) { return; }                 // 回線が無い等でライブラリが読めない：未ログイン扱いで続行
    try {
      const { data } = await c.auth.getSession();
      session = (data && data.session) || null;
    } catch (e) { session = null; }
    c.auth.onAuthStateChange((_ev, s) => { session = s; ensureProfile(); emit(); });
    if (session) ensureProfile();
    emit();
  }
  function init() { if (!started) started = start(); return started; }

  /* ページを開いた時点で起こすべきか：
     認証リダイレクトの印（?code= / #access_token=）があるか、
     Supabaseが localStorage に残したセッションがあるか */
  function shouldWake() {
    if (!enabled) return false;
    try {
      if (/[?&]code=/.test(location.search) || /access_token=/.test(location.hash)) return true;
      for (let i = 0; i < localStorage.length; i++) {
        if (/^sb-.*-auth-token$/.test(localStorage.key(i) || "")) return true;
      }
    } catch (e) {}
    return false;
  }

  async function signInEmail(addr) {
    const c = await CLOUD.client();
    // 戻り先はいま見ているページ（/note/ など）。ハッシュや引数は付けない
    const redirect = location.origin + location.pathname;
    const { error } = await c.auth.signInWithOtp({
      email: addr, options: { emailRedirectTo: redirect }
    });
    if (error) throw error;
  }
  async function signInGoogle() {
    const c = await CLOUD.client();
    const { error } = await c.auth.signInWithOAuth({
      provider: "google", options: { redirectTo: location.origin + location.pathname }
    });
    if (error) throw error;
  }
  async function signOut() {
    const c = await CLOUD.client();
    try { await c.auth.signOut(); } catch (e) {}
    session = null;
    emit();
  }

  if (shouldWake()) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => init());
    else init();
  }

  return { enabled, init, onChange, user, userId, signedIn, email, signInEmail, signInGoogle, signOut };
})();
