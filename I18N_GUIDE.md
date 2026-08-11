# 言語を増やすときの手引き（多言語化ガイド）

このサイトの多言語まわりは、英語化のときに作った仕組みを一般化してあり、
**言語を足す作業は「作り直し」ではなく「足し算」**になっている。
このガイドは、次の言語（想定：繁体字中国語 `zh`）を足すときの手順書。

## 仕組みの全体像

```
tools/languages.js        言語の台帳（コード・hreflang・辞書の場所・未翻訳の判定方法）
tools/build_lang.js       index.html → <言語>/index.html（シェル生成。旧 build_en.js）
tools/build_pages.js      各ページ・sitemap・hreflang（<code>Ready で言語ごとに解禁）
tools/check_en_content.js 本文の未翻訳チェック（--lang=zh で切替）
i18n/html.<言語>.json      HTMLの静的文言の対訳（キーは日本語の原文）
js/i18n.js                実行時のUI文言。英語辞書はこの中、他言語は ↓ から受け取る
js/i18n.<言語>.js          window.I18N_EXTRA = { lang, dict, country, strength, vitola }
data/<言語>/*.js           本文の差し替えデータ（ファイル名は data/en/ と同じにする）
data/pages.js             ページごとの題・説明文（ja / en / <言語> キー）と <言語>Ready
```

決まりごと（全言語共通）：

- **保存されるデータは日本語の正準値のまま**。表示だけを各言語にする
  （記録ノートの産地・サイズなどが言語切替で壊れないため）
- **差し替えデータのファイル名は data/en/ と同じにする**。
  `js/dataload.js` の PACKS は data/en/ の道筋を正準として持ち、
  他言語では同名ファイルを `data/<言語>/` から読む
- 翻訳がまだのページは `<言語>Ready` を付けない → noindex になり、
  sitemap にも hreflang にも載らない（検索に未完成版を出さない）

## zh（繁体字）を足す手順

### 第1段（道具として使える最小限：UI＋要約）

1. `i18n/html.zh.json` — index.html の静的文言（en版が約400項目の目安）
2. `js/i18n.zh.js` — UI文言辞書。`js/i18n.js` の EN 辞書（約1000項目）と同じキーを訳す。
   country / strength は対応表を埋める（vitola は英語のままで可）
3. `tools/build_summary.js` — 現在 ja / en の要約を書き出している。zh の要約
   （`data/zh/summary.js`）も書くよう拡張する（導入文 `d` と用語 `lexicon` の翻訳が要る）
4. `data/pages.js` — 各ページに `zh: { title, desc }` を追加。
   準備できたページから `zhReady: true` を付ける
5. `tools/languages.js` — zh の `enabled: true`
6. `node tools/build.js` → `zh/` 一式が生成される

この段階での確認：
```
node tools/build_lang.js zh                  # シェルの未翻訳が0か
node tools/check_en_content.js --lang=zh     # 本文の未翻訳（差し替えを書いた範囲）
render_check.js zh/index.html                # 実ブラウザでJSエラー0か
```

### 第2段（本文の翻訳）

7. `data/zh/*.js` — 英語化と同じ波状の進め方で。data/en/ の78ファイルと
   同じ割り方・同じファイル名で作る（1ファイル＝1翻訳単位）。
   英語化の実績：約200万字・8波・延べ100体強のエージェント
8. `tools/build_404.js` — 404ページに zh の案内を足す
9. `tools/fetch_news.js` — ニュースの毎日翻訳に zh の欄を足す（継続コストが増える点に注意）
10. `tools/build_og.py` — OG画像の繁体字フォント（Noto Sans TC）を追加

### 第3段（有効化のときに必ずやる）

11. **言語切替UI** — 現在は日↔英の2言語トグル。3言語になるので、
    ヘッダーの切替をメニュー式に作り直す（build_lang.js と build_pages.js の
    lang-switch の扱いもそのとき更新）
12. `I18N.isEn` **の使用箇所の点検** — 約60箇所。「英語版か」ではなく
    「日本語以外か」の意味で使っている箇所（引用符・区切り記号・名前の並び順など）を
    `I18N.lang !== "ja"` に置き換えるか、言語ごとの分岐にする
13. Search Console に zh 版の sitemap 反映を確認（sitemap.xml は自動で zh を含む）

## 未翻訳の検出について（重要）

英語は「日本語の文字（かな・漢字）が残っていれば未翻訳」で検出できるが、
**中国語は漢字を共有するため、この方法は使えない**。zh は「かなが残っていれば
未翻訳」で判定する（日本語の文章にはほぼ必ずかなが混ざるので実用上は捕まえられる）。
この判定式は `tools/languages.js` の `untranslated` にあり、チェッカーと共通。

かなを含まない日本語（漢字だけの見出しなど）はすり抜けるので、
zh の翻訳波では各エージェントの自己検証（対象ファイルの全項目を照合）を
英語化のときと同様に必須とすること。

## 試し組み（翻訳を書き始める前の動作確認）

```
node tools/build_lang.js zh --allow-missing
```

翻訳が空でも zh/index.html の骨組みが生成でき、仕組みの動作を確かめられる。
enabled: false のままなので、sitemap や hreflang には载らず、
生成した zh/ はコミットしないこと（.gitignore には入れていない）。
