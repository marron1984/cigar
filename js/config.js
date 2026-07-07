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
