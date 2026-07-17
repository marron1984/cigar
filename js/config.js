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
  enabled: false,                 // ← 写真AI自動入力を使うときは true に
  // Edge Function の URL
  //   例: "https://xxxxxxxx.supabase.co/functions/v1/identify-cigar"
  endpoint: "",
  // Supabase の anon public キー（CLOUD_CONFIG.supabaseAnonKey と同じでOK）
  anonKey: ""
};
