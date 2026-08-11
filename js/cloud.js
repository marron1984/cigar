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

  return { enabled, list, listAll, listAllMeta, upsert, remove, replaceAll, shareUpsert, shareGet, shareRemove };
})();
