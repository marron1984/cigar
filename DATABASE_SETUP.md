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
> `owner = auth.uid()` の RLS** に切り替えてください（ログインが必要になります）。ご希望あれば対応します。

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

## 3.6 ヒュミドール在庫のテーブル（在庫をスマホとパソコンで同じにする）

記録ノートの中の「🗃 ヒュミドール在庫」を複数の端末で共有する場合は、**SQL Editor** で以下も実行してください：

```sql
create table if not exists cigar_stock (
  id text primary key,   -- 在庫1件のID
  created bigint,
  owner text,            -- 記録者名（記録ノートと同じ名前で紐づく）
  data jsonb             -- 在庫の中身（銘柄・本数・購入日・価格・産地など）
);

create index if not exists cigar_stock_owner_idx on cigar_stock (owner);

alter table cigar_stock enable row level security;

create policy "stock read for anon"   on cigar_stock for select using (true);
create policy "stock write for anon"  on cigar_stock for insert with check (true);
create policy "stock update for anon" on cigar_stock for update using (true) with check (true);
create policy "stock delete for anon" on cigar_stock for delete using (true);
```

> 実行後、記録ノートの「記録者」に**両方の端末で同じ名前**を入れると、在庫が揃います。
> 在庫パネルの上に同期の状態（`☁ 共有データベースと同期しました（◯本）`）が出ます。
>
> **削除の扱い**：在庫を削除すると「消した印」がデータベースに残ります。これが無いと、
> もう一方の端末が古い在庫を持ったままなので、次の同期で削除した在庫が復活してしまいます。
>
> **同時に触ったとき**：両方の端末で同じ在庫を変えた場合は、**後に変更したほうが残ります**。
>
> 通信に失敗しても、その端末の中には保存されるので在庫は失われません。

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
