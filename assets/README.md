# assets

## 各国のインフォグラフィック（国・産地別ページ）

「国・産地別」ページは、国旗チップで国を選ぶと、その国のインフォグラフィック画像を大きく表示します。
画像は **`assets/countries/<slug>.png`** に置いてください。ファイル名（slug）は以下の通り：

| 国 | ファイル名 |
|---|---|
| キューバ | `assets/countries/cuba.png` |
| ドミニカ共和国 | `assets/countries/dominican-republic.png` |
| ニカラグア | `assets/countries/nicaragua.png` |
| ホンジュラス | `assets/countries/honduras.png` |
| メキシコ | `assets/countries/mexico.png` |
| エクアドル | `assets/countries/ecuador.png` |
| アメリカ（コネチカット） | `assets/countries/usa-connecticut.png` |
| ブラジル | `assets/countries/brazil.png` |
| カメルーン | `assets/countries/cameroon.png` |

- 画像を置くと、その国を選んだときに自動で表示されます（画像タップで原寸拡大）。
- 画像が無い国は「準備中」プレースホルダー＋テキスト情報が表示されます（情報は失われません）。
- 縦長ポスター形式（例：864×1821）でも横長でも、幅に合わせて自動調整されます。
- 追加方法：GitHub の `assets/countries/` フォルダに上記の名前でアップロードするか、ローカルで `git add` → `commit` → `push`。

※ ファイル名の対応は `js/app.js` の `COUNTRY_SLUG` で定義しています。

## gauge-size-chart.png（葉巻の太さの種類 ゲージサイズ一覧）

「太さ・サイズ別」ページ先頭のゲージサイズ一覧の画像。`assets/gauge-size-chart.png` に置くと表示され、
無い場合は同等の CSS 版グラフィックが自動フォールバック表示されます。
