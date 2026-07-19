# 写真からのAI自動入力（画像認識）セットアップ

記録ノートで **写真をアップロードすると、銘柄・ブランド・産地・サイズが自動で入力される**
機能のセットアップ手順です。写真の中身は Claude（AI）で読み取ります。

未設定のあいだは、この機能は動かず、従来どおりの手入力になります（サイト自体は問題なく使えます）。

---

## しくみ（かんたんな説明）

```
ブラウザ（記録ノート）
   │  写真（縮小したもの）を送る
   ▼
Supabase Edge Function  「identify-cigar」
   │  ANTHROPIC のAPIキー（サーバー側の金庫に保管）で
   ▼
Claude（画像認識）→ 銘柄・ブランド・産地・サイズ を返す
```

**大切なこと：APIキーはサーバー側（Supabase の「シークレット」）にだけ置きます。**
ブラウザやこのリポジトリには絶対に書きません（漏れると勝手に使われてしまうため）。

---

## 必要なもの

- Supabase プロジェクト（無料枠でOK。共有DB＝`DATABASE_SETUP.md` と同じプロジェクトで構いません）
- Anthropic（Claude）の API キー … <https://console.anthropic.com/> で発行
- Supabase CLI … <https://supabase.com/docs/guides/cli> （インストール手順あり）

> 使うたびに Anthropic の API 料金が少しかかります（1枚の読み取りで数円程度）。
> 料金の上限は Anthropic のコンソールで設定できます。

---

## 手順

### 1. Supabase CLI でログイン & プロジェクトに接続

```bash
supabase login
supabase link --project-ref <あなたのプロジェクトRef>
```

`<プロジェクトRef>` は Supabase 管理画面の URL（`https://supabase.com/dashboard/project/xxxx`）の
`xxxx` の部分、または Settings → General の「Reference ID」です。

### 2. Edge Function をデプロイ

このリポジトリの `supabase/functions/identify-cigar/` をそのままデプロイします。

```bash
supabase functions deploy identify-cigar
```

デプロイ後、関数の URL は次の形になります：

```
https://<プロジェクトRef>.supabase.co/functions/v1/identify-cigar
```

### 3. Anthropic の API キーを「シークレット」として登録（サーバー側）

```bash
supabase secrets set ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxx
```

> これで API キーは Supabase 側に安全に保管されます。
> **この値は config.js などブラウザ側のファイルには絶対に書かないでください。**

### 4. サイト側の設定（`js/config.js`）

`js/config.js` の `VISION_CONFIG` を次のように設定します：

```js
window.VISION_CONFIG = {
  enabled: true,
  endpoint: "https://<プロジェクトRef>.supabase.co/functions/v1/identify-cigar",
  anonKey:  "eyJhbGciOi..."   // Supabase の anon public キー（DATABASE_SETUP.md と同じ）
};
```

- `anonKey` は Supabase 管理画面 → Settings → API →「Project API keys」の **anon public** キーです。
  （公開キーなので、ブラウザに置いて問題ありません。秘密の `service_role` キーは使いません）
- 共有DB（`CLOUD_CONFIG`）を使っているなら `supabaseAnonKey` と同じ値でOKです。

設定できたら変更を保存し、GitHub Pages 等へ反映（push）してください。

---

## 使い方

1. 記録ノートで「＋ 一本を記録する」を開く
2. **葉巻のバンド（ラベル）がはっきり写った写真**を1枚追加する
3. 数秒待つと、読み取れた項目（銘柄名・ブランド・産地・サイズなど）が自動で入ります
4. 「✨ 写真からAIで自動入力」ボタンで、もう一度読み取り直すこともできます
5. 内容を確認・修正して保存

> すでに入力済みの欄は、AIが上書きしません（あなたの入力を優先します）。

---

## 精度について（正直な注意）

- **ブランド・銘柄名**：バンドの文字がはっきり写っていれば、比較的よく当たります。
- **産地**：銘柄が分かれば推定できますが、外れることもあります。
- **サイズ（ビトラ）**：**写真だけでの判定は苦手です。** 比較できる物差しが写っていないと
  長さ・太さは分かりづらいため、空欄になったり、おおまかな推定になったりします。
  正確なサイズは手入力で補ってください。

いずれも「下書きを埋める」補助と考え、**保存前に必ず確認**してください。

---

## うまくいかないとき

| 症状 | 確認すること |
| --- | --- |
| ボタンが出ない | `js/config.js` の `VISION_CONFIG.enabled` が `true` か。反映（push）済みか |
| 「サーバーに接続できませんでした」 | `endpoint` の URL が正しいか。`supabase functions deploy` 済みか |
| 「ANTHROPIC_API_KEY が設定されていません」 | 手順3の `supabase secrets set` を実行したか |
| 「サーバーエラー (401)」 | `anonKey` が anon public キーになっているか |
| 読み取れない | 写真のバンドがぼやけていないか。明るく正面から撮り直す |

ログの確認：

```bash
supabase functions logs identify-cigar
```

---

## AI講評（おまけ機能）

保存した記録の「AI講評」ボタンで、その一本への短い解説とおすすめの次の一本をAIが添えます。
この機能は同じEdge Functionの `mode: "comment"` を使うため、**古いバージョンの関数を
デプロイしている場合は、このリポジトリの最新の `index.ts` を貼り直して再デプロイ**してください。
（ボタンを押して「サーバー関数の更新が必要です」と出たら、それが合図です）

---

## セキュリティ

- API キーは **サーバー側（Supabase シークレット）のみ**。リポジトリ・ブラウザには置かない。
- ブラウザに置く `anonKey` は公開前提の anon public キー。`service_role` キーは置かない。
- この関数は誰でも呼び出せる公開エンドポイントです。不特定多数に公開するサイトで
  乱用が気になる場合は、Supabase 側でレート制限を設けるか、機能を必要な期間だけ
  `enabled:true` にする運用をおすすめします。
