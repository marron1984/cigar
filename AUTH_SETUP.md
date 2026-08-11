# 認証（ログイン）の導入手順 — Phase 0

記録ノートのクラウド同期を「名前の自己申告」から「本人だけが読み書きできるアカウント」に
切り替える手順です。PLATFORM_PLAN.md の Phase 0-①。

**この手順を実行するまで、サイトは今までどおり動きます**（フロントエンドは新旧両方の
構成を自動判別します）。実行した瞬間から、クラウド同期にはログインが必要になります。

---

## 1. なにが変わるか

| | いままで（v1） | これから（v2） |
|---|---|---|
| 同期の単位 | 記録者名（自由入力の文字列） | アカウント（Supabase Auth） |
| 読める範囲 | anonキーで**誰でも全件** | 自分の記録だけ（RLS: `user_id = auth.uid()`） |
| 書ける範囲 | anonキーで誰でも | ログイン中の本人だけ |
| 管理画面 | 誰でも開けば見えた | **is_admin のアカウントだけ**（RPC経由） |
| 共有リンク | トークンを知る人だけ | 変更なし |
| ローカル保存 | ブラウザ内（IndexedDB） | 変更なし（ログインしなくても記録は付けられる） |

## 2. SQL（SQL Editor で上から順に実行）

```sql
-- ============================================================
-- (1) プロフィール：auth.users と1対1
-- ============================================================
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null,
  avatar_url text,
  bio text,
  country text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table profiles enable row level security;
create policy "profiles readable" on profiles for select using (true);
create policy "insert own profile" on profiles for insert with check (id = auth.uid());
create policy "update own profile" on profiles
  for update using (id = auth.uid()) with check (id = auth.uid());

-- ============================================================
-- (2) 構成バージョン：フロントエンドが v1/v2 を自動判別するための目印
-- ============================================================
create table if not exists app_meta (key text primary key, value text);
alter table app_meta enable row level security;
create policy "meta readable" on app_meta for select using (true);

-- ============================================================
-- (3) 記録テーブルにアカウント列を足す
-- ============================================================
alter table cigar_notes add column if not exists user_id uuid references auth.users(id);
create index if not exists cigar_notes_user_idx on cigar_notes (user_id);

-- ============================================================
-- (4) RLSを引き締める：anon全開 → 本人のみ
-- ============================================================
drop policy if exists "allow read for anon"   on cigar_notes;
drop policy if exists "allow write for anon"  on cigar_notes;
drop policy if exists "allow update for anon" on cigar_notes;
drop policy if exists "allow delete for anon" on cigar_notes;

create policy "read own notes" on cigar_notes
  for select using (user_id = auth.uid());
create policy "insert own notes" on cigar_notes
  for insert with check (user_id = auth.uid());
create policy "update own notes" on cigar_notes
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "delete own notes" on cigar_notes
  for delete using (user_id = auth.uid());

-- ============================================================
-- (5) 既存記録の引き取り：昔の「記録者名」を自分のアカウントに紐づける
--    ※ ログインしていれば誰でも、まだ引き取られていない名前を引き取れます。
--      名前の取り合いを防ぐ仕組みはありません（信頼できる少人数向け。
--      これまでの「誰でも全件読み書きできる」状態よりは厳格です）。
-- ============================================================
create or replace function unclaimed_owners()
returns table(owner text, cnt bigint)
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then raise exception 'login required'; end if;
  return query
    select n.owner, count(*) from cigar_notes n
    where n.user_id is null group by n.owner order by count(*) desc;
end $$;

create or replace function claim_notes(p_owner text)
returns integer
language plpgsql security definer set search_path = public as $$
declare n integer;
begin
  if auth.uid() is null then raise exception 'login required'; end if;
  update cigar_notes set user_id = auth.uid()
    where user_id is null and owner = p_owner;
  get diagnostics n = row_count;
  return n;
end $$;

-- ============================================================
-- (6) 管理画面用RPC：is_admin のアカウントだけが全件（写真抜き）を見られる
-- ============================================================
create or replace function admin_list_meta(p_offset int default 0, p_limit int default 500)
returns table(id text, created bigint, owner text,
              name text, brand text, country text, vitola text, strength text,
              date text, rating text, price text, location text, note text,
              author text, photo_count int)
language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from profiles p where p.id = auth.uid() and p.is_admin) then
    raise exception 'admin only';
  end if;
  return query select n.id, n.created, n.owner,
    n.data->>'name', n.data->>'brand', n.data->>'country', n.data->>'vitola',
    n.data->>'strength', n.data->>'date', n.data->>'rating', n.data->>'price',
    n.data->>'location', n.data->>'note', n.data->>'author',
    jsonb_array_length(coalesce(n.data->'photos', '[]'::jsonb))::int
  from cigar_notes n order by n.created desc offset p_offset limit p_limit;
end $$;

create or replace function admin_delete_note(p_id text)
returns void
language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from profiles p where p.id = auth.uid() and p.is_admin) then
    raise exception 'admin only';
  end if;
  delete from cigar_notes where cigar_notes.id = p_id;
end $$;

-- ============================================================
-- (7) 最後に切り替えの目印を立てる（この行でフロントエンドがv2動作になる）
-- ============================================================
insert into app_meta values ('schema_version', '2')
  on conflict (key) do update set value = excluded.value;
```

> `cigar_shares`（共有リンク）は変更しません。トークンを知っている人だけが
> 1件を見られる、という今の仕組みのままです。

## 3. ダッシュボードの設定

1. **Authentication → URL Configuration**
   - Site URL: `https://cigar.cafe`
   - Redirect URLs に追加: `https://cigar.cafe/note/`, `https://cigar.cafe/en/note/`
2. **メールログイン**は初期状態で有効（Magic Link）。追加設定は不要。
   ※ Supabase内蔵のメール送信は1時間あたりの上限が小さめですが、少人数なら十分です。
3. **Googleログイン（任意）**: Authentication → Providers → Google を有効にし、
   Google Cloud Console の OAuth クライアントID/シークレットを設定。
   未設定でもメールログインだけで運用できます。

## 4. 自分を管理者にする（管理画面 #admin を使う人だけ）

一度サイトでログインしてから、SQL Editor で：

```sql
update profiles set is_admin = true
 where id = (select id from auth.users where email = 'あなたのメールアドレス');
```

## 5. 切り替え後のユーザーの流れ

1. 記録ノートを開く → 「ログインすると同期」の案内が出る（**ローカル記録は今までどおり使える**）
2. メールアドレスを入れてログインリンクを受け取る → リンクを開くとログイン完了
3. 初回ログイン時、まだ引き取られていない記録者名の一覧が出る →
   自分の名前を選ぶと、これまでの記録がアカウントに紐づく
4. 以後は端末が変わっても、ログインすれば自分の記録が同期される

## 6. 戻したいとき（ロールバック）

```sql
update app_meta set value = '1' where key = 'schema_version';
create policy "allow read for anon"   on cigar_notes for select using (true);
create policy "allow write for anon"  on cigar_notes for insert with check (true);
create policy "allow update for anon" on cigar_notes for update using (true) with check (true);
create policy "allow delete for anon" on cigar_notes for delete using (true);
```
