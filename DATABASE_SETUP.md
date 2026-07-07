# 記録ノートを「複数人で共有」する設定（データベース化）

記録ノートは、標準では各自のブラウザ内（localStorage）に保存されます。
**数人で同じ記録を共有**したい場合は、無料の [Supabase](https://supabase.com/) を使って
共有データベースに切り替えられます。以下の手順で設定してください（無料枠で十分です）。

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
  data jsonb
);

-- 少人数の信頼できるグループ向けの簡易ポリシー（anonキーで読み書き可）
alter table cigar_notes enable row level security;

create policy "allow read for anon"  on cigar_notes for select using (true);
create policy "allow write for anon" on cigar_notes for insert with check (true);
create policy "allow update for anon" on cigar_notes for update using (true) with check (true);
create policy "allow delete for anon" on cigar_notes for delete using (true);
```

> ⚠️ **注意**：anon public キーはサイトに埋め込むため、サイトを開ける人は誰でも
> この記録を読み書きできます。**信頼できる少人数**での共有に留め、パスワードのような
> 秘密情報は記録しないでください。より厳密なアクセス制御が必要な場合は Supabase の
> 認証（Auth）と RLS ポリシーを追加してください。

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

- 記録ノートを開くと、上部に **☁ 共有モード** と表示されます。
- 「記録者」にお名前を入れると、各記録に名前が付き、誰が書いたか分かります。
- 記録・編集・削除は自動的に共有データベースに反映され、全員に共有されます。
- 通信に失敗した場合も手元（localStorage）には保存されるので記録は失われません。

## 元に戻す（各自のブラウザ保存に戻す）

`js/config.js` の `enabled` を `false` に戻すだけです。

---

### 補足
- 写真は各記録の `data`（JSON）内に縮小・圧縮して保存されます。多人数・大量の写真を扱う
  場合は、Supabase Storage への切り出しを検討してください（`js/cloud.js` を拡張）。
- 別のサービス（Firebase 等）を使いたい場合は、`js/cloud.js` の `list / upsert / remove`
  を差し替えれば対応できます。
