# 記録ノートを「複数人で使う」設定（データベース化）

記録ノートは、標準では各自のブラウザ内（localStorage）に保存されます。
**数人で使う**場合は、無料の [Supabase](https://supabase.com/) を使ってデータベースに
切り替えられます（無料枠で十分）。

このモードでは、**「記録者」名がその人の目印**になり、**各自は自分の記録だけを閲覧**します
（他の人の記録は表示されません）。別の端末でも同じ名前を入れれば、自分の記録を続きから使えます。

---

## 1. Supabase プロジェクトを作る

1. https://supabase.com/ で登録し、**New project** を作成。
2. プロジェクトができたら、左メニューの **Project Settings → API** を開く。
3. 次の2つを控える：
   - **Project URL**（例：`https://abcdxyz.supabase.co`）
   - **anon public** キー（`eyJhbGci...` で始まる長い文字列）

## 2. テーブルを作る

左メニューの **SQL Editor** を開き、以下を貼り付けて実行：

```sql
create table if not exists cigar_notes (
  id text primary key,
  created bigint,
  owner text,          -- 記録者名（この人だけが自分の記録を見る目印）
  data jsonb
);
create index if not exists cigar_notes_owner_idx on cigar_notes (owner);

alter table cigar_notes enable row level security;

create policy "allow read for anon"   on cigar_notes for select using (true);
create policy "allow write for anon"  on cigar_notes for insert with check (true);
create policy "allow update for anon" on cigar_notes for update using (true) with check (true);
create policy "allow delete for anon" on cigar_notes for delete using (true);
```

> ⚠️ **プライバシーについて**：この簡易構成では「記録者名」で自分の記録だけを表示しますが、
> 技術的には anon キーでテーブル全体を読み取ることも可能です（アプリ上は各自の分だけ表示）。
> **信頼できる少人数**での利用を想定し、秘密情報は記録しないでください。
> 他人に一切読ませない厳密な非公開が必要な場合は、Supabase の **認証（Auth）＋
> `owner = auth.uid()` の RLS** に切り替えてください（ログインが必要になります）。
> → その切り替え手順を **AUTH_SETUP.md** に用意しました。フロントエンドは対応済みで、
> SQLを実行した瞬間から認証構成（v2）に自動で切り替わります。

### 管理画面の「写真」欄を出したいとき（任意）

管理画面（`#admin`）は、写真そのものを持ち帰らずに一覧を作ります。写真は1枚あたり
数百KBあり、全件ぶんを読むと Supabase の実行時間の上限に掛かって
`canceling statement due to statement timeout` で失敗するためです。

そのぶん、既定では枚数が分からず「写真」欄は `—` になります。枚数も出したい場合は、
**SQL Editor** で次を実行して、枚数だけを持つ列を足してください（無くても動きます）：

```sql
alter table cigar_notes
  add column if not exists photo_count int
  generated always as (jsonb_array_length(coalesce(data->'photos', '[]'::jsonb))) stored;
```

## 3. `js/config.js` に設定を書く

`js/config.js` を開き、次のように編集：

```js
window.CLOUD_CONFIG = {
  enabled: true,                                   // ← true にする
  supabaseUrl: "https://abcdxyz.supabase.co",      // ← 手順1のProject URL
  supabaseAnonKey: "eyJhbGci...",                  // ← 手順1のanon publicキー
  table: "cigar_notes"
};
```

保存して push（またはアップロード）すれば完了です。

## 3.5 共有リンク機能のテーブル（1件の記録をURLでシェアする）

記録ノートの「シェア →🔗 リンクで共有」を使う場合は、**SQL Editor** で以下も実行してください：

```sql
create table if not exists cigar_shares (
  id text primary key,   -- 推測不能なランダムトークン（URLの一部）
  created bigint,
  data jsonb             -- 共有する記録の公開コピー（写真含む）
);

alter table cigar_shares enable row level security;

create policy "shares read for anon"   on cigar_shares for select using (true);
create policy "shares write for anon"  on cigar_shares for insert with check (true);
create policy "shares update for anon" on cigar_shares for update using (true) with check (true);
create policy "shares delete for anon" on cigar_shares for delete using (true);
```

> 共有リンクを知っている人だけがその記録を見られます（リンクは長いランダム文字列）。
> 記録を削除すると共有コピーも削除され、リンクは無効になります。

## 4. 使い方

- 記録ノートを開くと、上部に **☁ 共有DB（自分の記録だけ表示）** と表示されます。
- 「記録者」にお名前を入れると、**その名前の人の記録だけ**が表示されます（名前＝あなたの目印）。
- 記録・編集・削除は自動的にデータベースへ保存され、別の端末でも同じ名前で続きから使えます。
- 通信に失敗した場合も手元（localStorage）には保存されるので記録は失われません。

## 元に戻す（各自のブラウザ保存に戻す）

`js/config.js` の `enabled` を `false` に戻すだけです。

---

### 補足
- 写真は各記録の `data`（JSON）内に縮小・圧縮して保存されます。多人数・大量の写真を扱う
  場合は、Supabase Storage への切り出しを検討してください（`js/cloud.js` を拡張）。
- 別のサービス（Firebase 等）を使いたい場合は、`js/cloud.js` の `list / upsert / remove`
  を差し替えれば対応できます。
