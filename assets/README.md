# assets

## gauge-size-chart.png（葉巻の太さの種類 ゲージサイズ一覧）

「太さ・サイズ別」ページ先頭の**ゲージサイズ一覧のインフォグラフィック画像**を、このファイル名で置くと、そのまま実写真として表示されます。

- 置き場所： `assets/gauge-size-chart.png`
- 未設置の場合は、同等内容の CSS 版グラフィックが自動的にフォールバック表示されます（`js/app.js` の `renderSizes()` 参照）。
- 画像を差し替えたい場合はこのファイルを上書きしてください。

### 追加方法
1. GitHub のリポジトリ画面で `assets/` フォルダを開き、`Add file → Upload files` から画像を `gauge-size-chart.png` という名前でアップロード（ブランチ `claude/cigar-encyclopedia-database-zel4j1`）。
2. もしくはローカルに画像を置いて `git add assets/gauge-size-chart.png && git commit && git push`。

アップロード後、ページを再読み込みすると先頭に実写真が表示されます。
