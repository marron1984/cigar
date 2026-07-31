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
  // 管理画面用：記録者で絞らず全件取得する。
  // 注意：この構成では anon キーで全件読めるため、これは新たな穴を開けるものではなく
  // 既にできることを画面から使えるようにしているだけ。厳密な非公開が必要なら
  // Supabase の認証（Auth）＋ owner = auth.uid() の RLS に切り替える必要がある
  // （DATABASE_SETUP.md のプライバシー注記を参照）。
  async function listAll(limit) {
    const c = await getClient();
    let qy = c.from(TABLE).select("*").order("created", { ascending: false });
    if (limit) qy = qy.limit(limit);
    const { data, error } = await qy;
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

  /* ---------- ヒュミドール在庫 ----------
     テーブル: cigar_stock (id text primary key, created bigint, owner text, data jsonb)
     記録ノートと同じく owner（＝記録者名）で自分の在庫だけを出し入れする。
     在庫は端末ごとの持ち物ではなく本人の持ち物なので、記録と同じ扱いに揃えている。 */
  const STOCK_TABLE = "cigar_stock";
  async function stockList(owner) {
    const c = await getClient();
    const { data, error } = await c.from(STOCK_TABLE).select("*")
      .eq("owner", owner || "").order("created", { ascending: false });
    if (error) throw error;
    return (data || []).map(rowToEntry);
  }
  const stockRow = (it, owner) => ({
    id: it.id, created: it.created || Date.now(), owner: owner || "", data: it
  });
  async function stockUpsert(items, owner) {
    const c = await getClient();
    const rows = (Array.isArray(items) ? items : [items]).map(it => stockRow(it, owner));
    if (!rows.length) return;
    const { error } = await c.from(STOCK_TABLE).upsert(rows, { onConflict: "id" });
    if (error) throw error;
  }
  async function stockRemove(id) {
    const c = await getClient();
    const { error } = await c.from(STOCK_TABLE).delete().eq("id", id);
    if (error) throw error;
  }

  /* ---------- 共有リンク（1件の記録を誰でも見られるURLにする） ----------
     テーブル: cigar_shares (id text primary key, created bigint, data jsonb)
     id は推測不能なランダムトークン。DATABASE_SETUP.md のSQLで作成。 */
  const SHARE_TABLE = "cigar_shares";
  async function shareUpsert(token, data) {
    const c = await getClient();
    const { error } = await c.from(SHARE_TABLE).upsert({ id: token, created: Date.now(), data }, { onConflict: "id" });
    if (error) throw error;
  }
  async function shareGet(token) {
    const c = await getClient();
    const { data, error } = await c.from(SHARE_TABLE).select("*").eq("id", token);
    if (error) throw error;
    return data && data[0] ? data[0].data : null;
  }
  async function shareRemove(token) {
    const c = await getClient();
    const { error } = await c.from(SHARE_TABLE).delete().eq("id", token);
    if (error) throw error;
  }

  return { enabled, list, listAll, upsert, remove, replaceAll,
           stockList, stockUpsert, stockRemove,
           shareUpsert, shareGet, shareRemove };
})();
