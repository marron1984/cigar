/* ============================================================
   葉巻大辞典 — クラウド設定（複数人でノートを共有する場合）
   ------------------------------------------------------------
   記録ノートを「数人で共有できるデータベース」にするには、
   無料の Supabase プロジェクトを作成し、下の3項目を設定して
   enabled を true にしてください（手順は DATABASE_SETUP.md 参照）。

   未設定（enabled:false）の場合は、従来どおり各自のブラウザ内
   （localStorage）に保存されます。
   ============================================================ */

window.CLOUD_CONFIG = {
  enabled: false,                 // ← 共有DBを使うときは true に
  supabaseUrl: "",                // 例: "https://xxxxxxxx.supabase.co"
  supabaseAnonKey: "",            // 例: "eyJhbGciOi..."（anon public キー）
  table: "cigar_notes"            // テーブル名（DATABASE_SETUP.md のSQLで作成）
};

/* ------------------------------------------------------------
   写真からのAI自動入力（画像認識）
   記録ノートで写真をアップロードすると、銘柄・ブランド・産地・サイズを
   AIが読み取って自動入力します。Supabase Edge Function を1つ用意します。
   （手順は VISION_SETUP.md 参照）

   ※ ANTHROPIC のAPIキーはサーバー側（Supabaseのシークレット）に置きます。
      ここ（ブラウザ側）には絶対に書かないでください。
   未設定（enabled:false）の場合は、従来どおり手入力になります。
   ------------------------------------------------------------ */
window.VISION_CONFIG = {
  // ↓ Edge Function（identify-cigar）のデプロイとシークレット登録が済んだら true に
  enabled: true,
  // Edge Function の URL（Supabase上の実際の関数スラッグは quick-task）
  endpoint: "https://pacwabnelvjpyfqdssar.supabase.co/functions/v1/quick-task",
  // Supabase の anon public キー（公開してよいキー）
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhY3dhYm5lbHZqcHlmcWRzc2FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQzMTgwNzUsImV4cCI6MjA5OTg5NDA3NX0.aLarnm2GI-auHc4uKH5a0Bs3mcmkbfynSrW9AM0bUE0"
};
