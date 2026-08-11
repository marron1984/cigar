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

  /* ---------- 構成バージョン ----------
     v1: 認証なし・anonキーで読み書き（従来）
     v2: AUTH_SETUP.md 適用後。RLSが本人のみになり、同期にログインが要る。
     判別は app_meta テーブル（v2で新設）を読めるかどうか。結果はページ内で
     使い回す（1回の軽い読み取りだけ）。 */
  let schemaV = null;
  async function schemaVersion() {
    if (schemaV != null) return schemaV;
    try {
      const c = await getClient();
      const { data, error } = await c.from("app_meta").select("value").eq("key", "schema_version");
      if (error) throw error;
      schemaV = data && data[0] ? (Number(data[0].value) || 1) : 1;
    } catch (e) { schemaV = 1; }   // テーブルが無い＝v1
    return schemaV;
  }
  /* v2でログイン中なら user_id。行に付けてRLSを通す */
  const authUid = () => {
    try { return (typeof AUTH !== "undefined" && AUTH.userId && AUTH.userId()) || null; }
    catch (e) { return null; }
  };

  const rowToEntry = (row) => Object.assign({}, row.data, { id: row.id, created: row.created, owner: row.owner });
  const entryToRow = (e) => {
    const row = { id: e.id, created: e.created || Date.now(), owner: e.owner || e.author || "", data: e };
    // v1のテーブルには user_id 列が無いので、v2と確認できたときだけ付ける
    if (schemaV >= 2 && authUid()) row.user_id = authUid();
    return row;
  };

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

  /* 管理画面用：写真を持ち帰らずに全件取る。
     ------------------------------------------------------------
     写真（data.photos）は1400pxのJPEGをデータURLにしたもので、1枚あたり
     数百KBある。上の listAll のように select("*") で全件を取ると転送量が
     一気に膨らみ、Supabase 側の statement timeout に掛かって
     「canceling statement due to statement timeout」で失敗する。
     管理画面は写真そのものを出さず枚数しか使わないので、ここでは
     必要な項目だけを名前を付けて取り出し、さらに小分けにして読む。
     写真の枚数は、DATABASE_SETUP.md の任意の生成列 photo_count があれば出す
     （無いデータベースでも動くよう、一度だけ付けずにやり直す）。 */
  const META_COLS = ["id", "created", "owner",
    "name:data->>name", "brand:data->>brand", "country:data->>country",
    "vitola:data->>vitola", "strength:data->>strength", "date:data->>date",
    "rating:data->>rating", "price:data->>price", "location:data->>location",
    "note:data->>note", "author:data->>author"].join(",");
  const PAGE = 500;
  const metaToEntry = (r) => ({
    id: r.id, created: r.created, owner: r.owner, author: r.author,
    name: r.name, brand: r.brand, country: r.country, vitola: r.vitola,
    strength: r.strength, date: r.date, location: r.location, note: r.note,
    rating: r.rating == null || r.rating === "" ? "" : Number(r.rating),
    price: r.price == null || r.price === "" ? "" : Number(r.price),
    /* null は「数えていない」。0 は「写真なし」。区別して扱う */
    photoCount: r.photo_count == null ? null : Number(r.photo_count)
  });
  async function listAllMeta(onProgress) {
    const c = await getClient();
    let cols = META_COLS + ",photo_count";
    let triedPlain = false;
    const out = [];
    for (let from = 0; ; from += PAGE) {
      const ask = () => c.from(TABLE).select(cols)
        .order("created", { ascending: false }).range(from, from + PAGE - 1);
      let { data, error } = await ask();
      if (error && !triedPlain) {          // photo_count が無いデータベース
        triedPlain = true; cols = META_COLS;
        ({ data, error } = await ask());
      }
      if (error) throw error;
      const rows = data || [];
      rows.forEach(r => out.push(metaToEntry(r)));
      if (onProgress) onProgress(out.length);
      if (rows.length < PAGE) break;
    }
    return out;
  }
  /* v2専用：自分の記録を全部取る。絞り込みはRLS（user_id = auth.uid()）が行う。
     v1のポリシーでは全員の記録が返ってしまうので、v2確認前に呼んではいけない */
  async function listMine() {
    const c = await getClient();
    const { data, error } = await c.from(TABLE).select("*").order("created", { ascending: false });
    if (error) throw error;
    return (data || []).map(rowToEntry);
  }
  /* v2専用：まだアカウントに紐づいていない昔の記録者名の一覧と、その引き取り */
  async function unclaimedOwners() {
    const c = await getClient();
    const { data, error } = await c.rpc("unclaimed_owners");
    if (error) throw error;
    return data || [];
  }
  async function claimNotes(owner) {
    const c = await getClient();
    const { data, error } = await c.rpc("claim_notes", { p_owner: owner });
    if (error) throw error;
    return Number(data) || 0;
  }
  async function upsert(entry) {
    await schemaVersion();          // entryToRow が user_id を付けるかの判断に要る
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
    await schemaVersion();
    const c = await getClient();
    const rows = entries.map(entryToRow);
    const { error } = await c.from(TABLE).upsert(rows, { onConflict: "id" });
    if (error) throw error;
  }

  /* ---------- 管理画面（v2） ----------
     RLSで自分の行しか見えなくなるため、全件の一覧は is_admin 限定の
     RPC（security definer）で取る。写真は含まれない（枚数のみ）。 */
  async function adminListMeta(onProgress) {
    const c = await getClient();
    const out = [];
    for (let from = 0; ; from += PAGE) {
      const { data, error } = await c.rpc("admin_list_meta", { p_offset: from, p_limit: PAGE });
      if (error) throw error;
      const rows = data || [];
      rows.forEach(r => out.push(metaToEntry(r)));
      if (onProgress) onProgress(out.length);
      if (rows.length < PAGE) break;
    }
    return out;
  }
  async function adminRemove(id) {
    const c = await getClient();
    const { error } = await c.rpc("admin_delete_note", { p_id: id });
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

  return { enabled, client: getClient, schemaVersion,
           list, listMine, listAll, listAllMeta, unclaimedOwners, claimNotes,
           adminListMeta, adminRemove,
           upsert, remove, replaceAll, shareUpsert, shareGet, shareRemove };
})();
