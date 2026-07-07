/* ============================================================
   葉巻大辞典 — クラウド同期（Supabase）
   記録ノートを複数人で共有するためのデータ層。
   CLOUD_CONFIG.enabled が false のときは何もしない（ローカル保存）。
   テーブル構成: id text primary key, created int8, owner text, data jsonb
   owner（＝記録者名）ごとに絞り込み、各自は自分の記録だけを閲覧する。
   ============================================================ */

const CLOUD = (() => {
  const cfg = window.CLOUD_CONFIG || {};
  const enabled = !!(cfg.enabled && cfg.supabaseUrl && cfg.supabaseAnonKey);
  const TABLE = cfg.table || "cigar_notes";
  let client = null;

  // Supabase JS を必要時にだけ読み込む
  function loadLib() {
    return new Promise((resolve, reject) => {
      if (window.supabase && window.supabase.createClient) return resolve();
      const s = document.createElement("script");
      s.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
      s.onload = () => resolve();
      s.onerror = () => reject(new Error("Supabase ライブラリの読み込みに失敗しました"));
      document.head.appendChild(s);
    });
  }
  async function getClient() {
    if (!enabled) return null;
    if (client) return client;
    await loadLib();
    client = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);
    return client;
  }

  const rowToEntry = (row) => Object.assign({}, row.data, { id: row.id, created: row.created, owner: row.owner });
  const entryToRow = (e) => ({ id: e.id, created: e.created || Date.now(), owner: e.owner || e.author || "", data: e });

  // owner（記録者名）で絞り込み、その人の記録だけを取得
  async function list(owner) {
    const c = await getClient();
    const { data, error } = await c.from(TABLE).select("*")
      .eq("owner", owner || "").order("created", { ascending: false });
    if (error) throw error;
    return (data || []).map(rowToEntry);
  }
  async function upsert(entry) {
    const c = await getClient();
    const { error } = await c.from(TABLE).upsert(entryToRow(entry), { onConflict: "id" });
    if (error) throw error;
  }
  async function remove(id) {
    const c = await getClient();
    const { error } = await c.from(TABLE).delete().eq("id", id);
    if (error) throw error;
  }
  async function replaceAll(entries) {
    // インポート用：全件upsert
    const c = await getClient();
    const rows = entries.map(entryToRow);
    const { error } = await c.from(TABLE).upsert(rows, { onConflict: "id" });
    if (error) throw error;
  }

  return { enabled, list, upsert, remove, replaceAll };
})();
