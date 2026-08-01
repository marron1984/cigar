---
name: add-brand
description: >-
  Cigar Cafe（葉巻大辞典）のブランド大全 data/brands.js に、葉巻ブランドを1つ深掘りリサーチして
  追加・更新する一連の作業を担うスキル。海外一次ソースを横断調査 → JSON断片に編纂 → 品質検証つき
  マージ → 全ページのレンダリング確認 → コミット／プッシュまでを一貫して行う。ユーザーが
  「◯◯（ブランド名）をブランド大全に追加して」「△△を深掘りして」「このメーカーを事典に載せて」
  「ブランドを1件足して」等と頼んだとき、また既存ブランドの記述を大幅に増補・修正したいときに必ず使う。
  単に葉巻の雑談に答えるだけのときは使わない（データ追加が目的のときに使う）。
---

# ブランド大全にブランドを追加する

Cigar Cafe のブランド大全（`data/brands.js` の `BRANDS_DATA`）へ、1つの葉巻ブランドを
**海外一次ソースに基づいて深掘りリサーチし、出典明記で編纂して追加・更新する**ためのスキル。

このリポジトリのブランド記事は「読み物として通用する分量と精度」を基準にしている。だから
手順の要は**リサーチの質**と、**品質を満たさないものを本番データに入れない検証**の2点にある。
下のフローはその2点を守るために組んである。

## 全体フロー

1. **対象を確定** — ブランド名（日本語・英語）と、どの国キーに属するかを決める
2. **リサーチ** — WebSearch 専門のサブエージェントに海外一次ソースを横断調査させ、JSON断片を書かせる
3. **マージ＋検証** — `scripts/merge_brand.js` で品質しきい値を満たすものだけを取り込む
4. **要約データを作り直す** — `tools/build_summary.js` で `data/summary.js` を更新
5. **レンダリング確認** — `scripts/render_check.js` で全ページがエラー0・はみ出し0か確認
6. **コミット＆プッシュ** — 作業ブランチへ

順にやり切ること。特に 3→4→5 を飛ばして 6 に進まない（壊れたデータ・古い要約を公開しないため）。

---

## 1. 対象を確定

国キー（`BRANDS_DATA` のトップレベル）は以下。断片の `key` はこの中から選ぶ：

`cuba` `dominican` `nicaragua` `honduras` `mexico` `ecuador` `usa` `brazil`
`cameroon` `peru` `colombia` `philippines` `indonesia` `argentina`

既存かどうかは、追加前に一度確認すると手戻りがない：

```bash
/opt/node22/bin/node -e 'const fs=require("fs");const B=new Function(fs.readFileSync("data/brands.js","utf8")+"\n;return BRANDS_DATA;")();for(const k in B)console.log(k,B[k].map(b=>b.en).join(", "))' | grep -i "<ブランド名>"
```

既存なら「増補・修正」、無ければ「新規追加」。どちらもマージスクリプトが自動で判定する
（英語名をアクセント無視で照合し、あれば上書き・無ければ追加）。

---

## 2. リサーチ（サブエージェントに委任）

`Agent` ツールで **general-purpose** エージェントを起動し、下のテンプレートを渡す。
このリポジトリで確実に動く制約を必ず含めること：

- **WebSearch だけを使う**。`WebFetch` はこの環境では 403 で失敗するので使わせない。
- エージェント自身がさらに別のエージェントを呼ぶと破綻するので、**委任を禁止する**一文を必ず入れる。
- 出力は指定パスの **JSON断片ファイル**（`data/fragments/` は .gitignore 済みなので安全）。
- 出典は**検索で実在を確認した URL のみ**。うろ覚えや捏造は厳禁（信頼の核心）。

複数ブランドをまとめて足すときは、1エージェント＝1〜数ブランドに分け、断片ファイル名を分けて
並列で走らせるとよい（例：`data/fragments/brand_padron.json`）。

### リサーチ依頼テンプレート（そのまま渡す）

```
あなたは葉巻ブランドの調査・編纂担当です。次のブランドを深掘りリサーチし、日本語で編纂して
JSONファイルに書き出してください。

対象ブランド： <日本語名>（<English Name>）
国キー： <key>
出力先： <repo>/data/fragments/<slug>.json

CRITICAL — 委任禁止： Agent ツールを絶対に呼ばないこと。あなた自身が WebSearch で調べて書く。
CRITICAL — WebFetch は使用禁止（この環境では失敗する）。調査は WebSearch のみで行う。

【調べ方】
- halfwheel / Cigar Aficionado / Cuban Cigar Website / Cigar Journal / Habanos S.A. /
  各メーカー公式 / Wikipedia など、海外の一次〜準一次ソースを英語で横断検索する。
- 創業年・創業者・名の由来・製造拠点・主要ヴィトラ・味の傾向・現在の位置づけ・逸話・係争など、
  複数ソースで裏を取る。単一ソースだけの事柄には本文で「とされる／伝えられる」と留保を付す。

【出力するJSONの形】（1ブランドを brands 配列に1つ）
{
  "key": "<key>",
  "brands": [{
    "ja": "<日本語名>",
    "en": "<English Name>",
    "founded": "<創業年（不確かなら諸説を併記）>",
    "founder": "<創業者・母体>",
    "meaning": "<ブランド名の由来>",
    "strength": "<味の強さの傾向>",
    "status": "<現在の位置づけを1〜2文で>",
    "history": "<本文。下の品質基準を満たすこと>",
    "vitolas": ["<代表規格を寸法・年込みで> …（最低4つ、可能なら8以上）"],
    "trivia": "<豆知識・逸話（複数文）>",
    "sources": ["<出典。『媒体名（年）『記事名』ドメイン.』の形で最低8件、実在URLのみ>"]
  }]
}

【品質基準（下回るとマージ時に自動で弾かれるので必ず超える）】
- history は 2800 文字以上。【見出し】付きの段落を最低5つ（創業/命名/製造/ライン展開/評価/係争 等）。
- 各段落は事実を積み上げ、年号・人名・地名・寸法を具体的に。誇張や決めつけを避け、
  不確実な点は末尾に【不確実な点の留保】としてまとめる。
- vitolas は最低4、sources は最低8。sources は検索で実在を確認したものだけ。

書き終えたら JSON をファイルに保存し、history の文字数・vitolas 数・sources 数を報告してください。
```

`<repo>` は実際の絶対パス（例 `/home/user/cigar`）、`<slug>` は英名の小文字ハイフン繋ぎに置換する。

---

## 3. マージ＋検証

断片ファイルができたら、同梱スクリプトで取り込む。品質しきい値
（history≥2800字・出典≥8・ヴィトラ≥4・見出し≥5、必須項目の有無）を**満たすものだけ**が入り、
未達のブランドは元のまま据え置かれて理由が表示される：

```bash
/opt/node22/bin/node .claude/skills/add-brand/scripts/merge_brand.js data/fragments/<slug>.json
```

- 「✗ SKIP …」が出たら、そのブランドは基準未達。理由（例 `history 2100字<2800`）を見て、
  リサーチをやり直させるか、断片を補強してから再実行する。**未達のまま先に進めない。**
- スクリプトは書き戻した後に brands.js を再パースして構文健全性まで確認する。
- 既存ブランドは自動で上書き更新、新規は末尾に追加して order を採番する。

---

## 4. 要約データを作り直す

`data/brands.js` は重い（約4.8MB）ので、サイトはブランド大全を開いたときにだけ読み込む。
ホーム（今日の一本・銘柄ショーケース・収録数）・横断検索・記録ノートのブランド選択肢・
在庫のAI手がかりは、名前だけを抜き出した **`data/summary.js`** を見ている。
ブランドを足したら、これを作り直さないと新しい銘柄がそれらに出てこない：

```bash
NODE_PATH=/opt/node22/lib/node_modules /opt/node22/bin/node tools/build_summary.js
```

（`data/data.js` `data/phd.js` `data/advanced*.js` `data/world*.js` `data/news.js` を
変えたときも同じく作り直す。要約はこれらからも作っている。）

---

## 5. レンダリング確認

データを変えたら、全ページが壊れていないか実ブラウザで確認する。これが通って初めて公開してよい：

```bash
NODE_PATH=/opt/node22/lib/node_modules /opt/node22/bin/node .claude/skills/add-brand/scripts/render_check.js
```

合格の目印は次の一行：

```
TOTAL JS ERRORS: 0 | routes with overflow: 0 | empty routes: 0
```

このスクリプトは `data/summary.js` が最新かどうかも確かめ、古ければ作り直したうえで不合格にする
（＝作り直した summary.js も一緒にコミットすればよい）。`empty routes` は、データの後読み込みが
うまくいかず中身が出なかったページの数。エラー・はみ出し・空ページが出たら、その行に出る
ページ名を手がかりに原因を直してから再実行する。

英語版のシェル（`en/index.html`）を作り直したときは、そちらも確認する：

```bash
NODE_PATH=/opt/node22/lib/node_modules /opt/node22/bin/node tools/build_en.js
NODE_PATH=/opt/node22/lib/node_modules /opt/node22/bin/node .claude/skills/add-brand/scripts/render_check.js en/index.html
```

---

## 6. コミット＆プッシュ

作業ブランチ（このプロジェクトの指定ブランチ）へコミットしてプッシュする。
断片ファイル（`data/fragments/`）は .gitignore 済みなので、コミット対象は
`data/brands.js` と作り直した `data/summary.js`：

```bash
git add data/brands.js data/summary.js
git commit -m "ブランド大全に〈ブランド名〉を追加（海外一次ソース基づく深掘り・出典N件）"
git push -u origin <作業ブランチ>
```

コミットメッセージは日本語で、何を足した/増補したか・出典を明記した旨がわかるように書く。
（このプロジェクトのコミット規約＝末尾トレーラーがあれば従う。内部モデルIDやエージェントIDは書かない。）

---

## つまずきやすい点

- **リサーチ担当が薄い記事を返す** → テンプレートの品質基準を強調して再依頼。分量だけ埋めた水増しは
  弾けないので、「複数ソースで裏を取り、具体的な年号・人名・寸法を入れる」ことを求める。
- **出典が怪しい** → sources は検索で実在確認したものだけ。疑わしい URL は落とさせる。信頼の生命線。
- **国キーが違う** → merge スクリプトが使えるキー一覧を出して止まる。断片の `key` を直す。
- **render_check が Chromium を見つけられない** → スクリプトが `/opt/pw-browsers` 配下を自動探索する。
  それでも見つからなければ Playwright 既定の解決に任せて起動する。
