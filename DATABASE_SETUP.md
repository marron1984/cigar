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
