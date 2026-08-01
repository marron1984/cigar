/* ============================================================
   Cigar Cafe — 表示言語
   ------------------------------------------------------------
   JavaScript が組み立てる文言を英語に切り替えるための仕組み。

   ■ 考え方
   辞書のキーは「日本語の原文そのもの」にしている。
   こうすると日本語版は t() を通しても何も変わらず（見つからなければ
   原文をそのまま返す）、英語版だけが辞書を引く。
   キー名を新しく考える必要が無いので、既存コードへの差し込みが小さくて済む。

   ■ 数値などの差し込み
   t("在庫が{n}本あります", { n: 3 }) のように {名前} を使う。
   英語側の語順が違っても、同じ差し込み名で書ける。

   ■ 産地名（産地は「データ」でもある）
   在庫や記録に保存される産地は日本語のまま扱い、表示のときだけ英語にする。
   言語を切り替えても保存済みのデータの中身が変わらないようにするため。
   ============================================================ */
var I18N = (function () {
  var LANG = (typeof window !== "undefined" && window.SITE_LANG) || "ja";

  /* 産地名：保存される値は日本語、表示だけ英語 */
  var COUNTRY = {
    "キューバ": "Cuba",
    "ドミニカ": "Dominican Republic",
    "ドミニカ共和国": "Dominican Republic",
    "ニカラグア": "Nicaragua",
    "ホンジュラス": "Honduras",
    "メキシコ": "Mexico",
    "ブラジル": "Brazil",
    "エクアドル": "Ecuador",
    "アメリカ": "United States",
    "アメリカ（コネチカット）": "United States (Connecticut)",
    "ペルー": "Peru",
    "コロンビア": "Colombia",
    "フィリピン": "Philippines",
    "インドネシア": "Indonesia",
    "カメルーン": "Cameroon",
    "アルゼンチン": "Argentina",
    "コスタリカ": "Costa Rica",
    "パナマ": "Panama",
    "ジャマイカ": "Jamaica",
    "イタリア": "Italy",
    "スペイン": "Spain",
    "その他": "Other",
    "産地未設定": "Origin not set"
  };

  /* 強さ（記録フォームの選択肢と同じ語） */
  var STRENGTH = {
    "ライト": "Light",
    "ライトミディアム": "Light–Medium",
    "ミディアム": "Medium",
    "ミディアムフル": "Medium–Full",
    "フル": "Full"
  };

  var EN = {
    /* ---------- 共通 ---------- */
    "保存する": "Save",
    "キャンセル": "Cancel",
    "削除": "Delete",
    "閉じる": "Close",
    "本": "cigars",
    "銘柄": "kinds",
    "件": "entries",

    /* ---------- ページ名（履歴・アクセス解析用のタイトル） ---------- */
    "ホーム": "Home",
    "記録ノート": "Journal",
    "基礎知識": "Basics",
    "国・産地別": "Origins",
    "太さ別": "Sizes",
    "価格別": "Prices",
    "喫煙具": "Tools",
    "ヒュミドール": "Humidors",
    "上級編": "Advanced",
    "博士編": "Doctorate",
    "日本ガイド": "Japan Guide",
    "世界編": "The World",
    "ブランド大全": "Brands",
    "ニュース": "News",
    "記録の管理": "Journal admin",
    "国と産地": "Countries & origins",
    "太さと長さ": "Sizes & lengths",
    "価格": "Prices",
    "葉巻博士": "Doctorate",
    "日本の葉巻": "Cigars in Japan",
    "世界の名店": "The world",

    /* ---------- ヒュミドール在庫 ---------- */
    "在庫を保存できませんでした。": "Could not save your humidor stock.",
    "熟成 1ヶ月未満": "Aged under 1 month",
    "熟成 {n}ヶ月": "Aged {n} months",
    "熟成 {y}年": "Aged {y} yr",
    "熟成 {y}年{m}ヶ月": "Aged {y} yr {m} mo",
    "{n}ヶ月": "{n} mo",
    "{y}年": "{y} yr",
    "産地未設定": "Origin not set",
    "{c}だけを表示": "Show {c} only",
    "図は割合で表示": "shown to scale",
    "在庫金額": "value",
    "最長の熟成": "oldest",
    "6ヶ月未満": "under 6 mo",
    "6ヶ月〜1年": "6 mo – 1 yr",
    "1〜2年": "1 – 2 yr",
    "2年以上": "over 2 yr",
    "熟成の内訳": "By age",
    "産地未設定が <b>{n}本</b> あります。": "<b>{n} cigars</b> have no origin set.",
    "まとめて設定する産地": "Origin to apply to all of them",
    "まとめて設定": "Apply to all",
    "産地未設定の {k}銘柄（{n}本）を、すべて「{to}」にします。\nよろしいですか？":
      "Set the origin of {k} cigars ({n} in total) to \"{to}\".\nAre you sure?",
    "「{name}」を在庫から削除しますか？": "Remove \"{name}\" from your humidor?",
    "追加した順": "Recently added",
    "熟成が長い順": "Longest aged",
    "熟成が短い順": "Newest leaf",
    "銘柄名順": "By name",
    "産地順": "By origin",
    "本数が多い順": "Most in stock",
    "価格が高い順": "Most expensive",
    "🔍 銘柄・ブランド・産地で探す": "🔍 Search by cigar, brand or origin",
    "並び替え": "Sort",
    "{k}銘柄・{n}本": "{k} kinds · {n} cigars",
    "<b>{k}銘柄・{n}本</b> が該当": "<b>{k} kinds · {n} cigars</b> match",
    "（産地：{c}）": " (origin: {c})",
    "（{p}%）": " ({p}%)",
    "在庫0の{n}件を表示": "Show {n} with none left",
    "絞り込みを解除": "Clear filters",
    "該当する在庫がありません。": "Nothing in your humidor matches.",
    "検索や絞り込みを解除してみてください。": "Try clearing the search or the filter.",
    "在庫はまだありません。買った葉巻を登録しておくと、熟成期間がひと目で分かります。":
      "Your humidor is empty. Add the cigars you buy and you can see at a glance how long each has been resting.",
    "購入 {date}": "Bought {date}",
    "¥{n}/本": "¥{n} each",
    "1本減らす": "One fewer",
    "1本増やす": "One more",
    "産地（変えるとグラフに反映されます）": "Origin (the chart updates when you change it)",
    "🔥 吸う": "🔥 Smoke",
    "銘柄名（例：モンテクリスト No.4）": "Cigar name (e.g. Montecristo No. 4)",
    "ブランド（任意）": "Brand (optional)",
    "産地": "Origin",
    "本数": "How many",
    "購入日": "Date bought",
    "1本の価格（任意）": "Price each (optional)",
    "＋ 在庫に追加": "＋ Add to humidor",
    "📷 写真から自動入力": "📷 Fill in from a photo",
    "箱やバンドの写真を選ぶと、銘柄名とブランドをAIが読み取って入れます（入力済みの欄は上書きしません）。":
      "Pick a photo of the box or band and AI will read the name and brand into the form (fields you have already filled in are left alone).",
    "「🔥 吸う」で在庫が1本減り、記録ノートのフォームが銘柄入りで開きます。産地の色の凡例をタップすると、その産地だけを表示します。":
      "\"🔥 Smoke\" takes one off the count and opens the journal form with the cigar filled in. Tap a colour in the legend to show only that origin.",
    "{n} 本": "{n} cigars",
    "在庫はこの端末にのみ保存されます（記録ノートとは別で、他の端末とは共有されません）。":
      "Your humidor is stored on this device only — separately from the journal, and not shared with your other devices.",

    /* ---------- 写真からのAI入力 ---------- */
    "AIが写真を読み取っています…（数秒かかります）": "AI is reading the photo… (a few seconds)",
    "バンドの文字が読み取れませんでした。明るく正面から撮り直すか、手で入力してください。":
      "The band could not be read. Try again in better light and straight on, or type it in yourself.",
    "新しく入れられる項目がありませんでした（すでに入力済みのようです）。":
      "Nothing new to fill in — those fields already have values.",
    "✓ {what}を入力しました。ご確認ください。": "✓ Filled in {what}. Please check it.",
    "✓ 自信は高くありませんが、{what}を入力しました。ご確認ください。":
      "✓ Not fully confident, but filled in {what}. Please check it.",
    "読み取れませんでした：{msg}": "Could not read the photo: {msg}",
    "エラー": "error",
    "銘柄名": "the name",
    "ブランド": "the brand",

    /* ---------- 記録ノート ---------- */
    "画像を読み込めませんでした": "Could not load the image",
    "ファイルを読み込めませんでした": "Could not read the file",
    "保存が中断されました": "Saving was interrupted",
    "保存できませんでした。端末の空き容量が不足している可能性があります。不要な写真や記録を削除してからお試しください。":
      "Could not save. Your device may be low on storage. Try deleting some photos or entries first.",
    "保存できませんでした。端末の空き容量が不足している可能性があります。":
      "Could not save. Your device may be low on storage.",
    "保存できませんでした。写真の枚数が多いと端末の保存容量を超えることがあります。写真を減らすか、不要な記録を削除してからお試しください。":
      "Could not save. A lot of photos can exceed what your device will hold. Try using fewer photos, or deleting some entries.",
    "その他（自由入力）": "Other (type your own)",
    "その他": "Other",
    "記録を編集する": "Edit entry",
    "葉巻を記録する": "Log a cigar",
    "写真{n}": "Photo {n}",
    "写真は最大{n}枚までです。": "You can add up to {n} photos.",
    "写真は最大{max}枚まで。{n}枚のみ追加しました。": "Up to {max} photos — only {n} were added.",
    "画像の処理に失敗しました：{msg}": "Could not process the image: {msg}",
    "サイズ": "the size",
    "強さ": "the strength",
    "写真からは判別できませんでした。お手数ですが手入力でお願いします。":
      "The photo could not be identified. Please fill the form in yourself.",
    "✓ {what}を入力しました。念のためご確認ください。": "✓ Filled in {what}. Please double-check it.",
    "✓ 自信は高くありませんが、{what}を入力しました。念のためご確認ください。":
      "✓ Not fully confident, but filled in {what}. Please double-check it.",
    "先に写真を追加してください。": "Add a photo first.",

    "タップで評価（半個刻み）": "Tap to rate (half stars)",
    "{n}／5　{word}": "{n}/5 · {word}",
    "タップで評価": "Tap to rate",
    "イマイチ": "Disappointing",
    "まずまず": "Fair",
    "良い": "Good",
    "とても良い": "Very good",
    "最高の一本": "Outstanding",

    "共有モードでは、先に「記録者」にお名前を入力してください（その名前があなたの記録の目印になります）。":
      "In shared mode, enter your name under \"Logged by\" first — that name marks the entries as yours.",
    "共有データベースへの保存に失敗しました。手元には保存されています。時間をおいて再度お試しください。":
      "Could not save to the shared database. Your copy is safe on this device. Please try again later.",
    "「{name}」を削除しますか？": "Delete \"{name}\"?",
    "この記録": "this entry",
    "共有データベースからの削除に失敗しました。時間をおいて再度お試しください。":
      "Could not delete from the shared database. Please try again later.",

    "これまでに記録した葉巻": "cigars logged so far",
    "stats::産地": "origins",
    "平均評価": "avg rating",
    "喫煙場所": "places",
    "総額の記録": "total spent",
    "月別の本数（直近12か月）": "By month (last 12 months)",
    "{n}月": "{n}",
    "{n}本": "{n} cigars",
    "よく吸う産地": "Most-smoked origins",
    "評価の分布": "Ratings",
    "<div class=\"dur-row\">{k}：平均 <b>{avg}分</b>（{n}回）</div>":
      "<div class=\"dur-row\">{k} · <b>{avg} min</b> on average ({n} logged)</div>",
    "喫煙時間（タイマー記録）": "Smoking time (from the timer)",
    "📊 くわしい統計": "📊 More statistics",
    "合計 {n}本 · 月平均 {a}本": "{n} total · {a}/month on average",
    "{m}：{n}本": "{m}: {n} cigars",
    "平均": "avg",
    "上位{n}件": "top {n}",
    "平均 ★{a}": "★{a} on average",
    "（{n}回）": " ({n})",
    "分": "min",
    "サイズ別の平均 · {n}件から": "average by size · from {n} entries",
    "chart::本": " cigars",
    "chart::分": " min",
    "今年 {n}本目": "{n} this year",
    "🎁 年間まとめを見る": "🎁 See your year in smoke",

    "🔁 この銘柄は過去 <b>{n}回</b> 記録しています（前回 {rating}・{date}{quote}）":
      "🔁 You have logged this cigar <b>{n} times</b> before (last time {rating} · {date}{quote})",
    "評価なし": "unrated",
    "▶ タイマー開始": "▶ Start timer",
    "⏸ 終了して記録": "⏸ Stop and log",
    "生成中…": "Writing…",
    "AI講評を生成できませんでした：{msg}": "Could not write the AI note: {msg}",
    "{n}分": "{n} min",
    "Cigar Cafe — 葉巻をたのしむ": "Cigar Cafe — enjoy the cigar",
    "作成中…": "Creating…",
    "葉巻の記録": "Cigar journal entry",
    "画像を作成できませんでした：{msg}": "Could not create the image: {msg}",

    "— Cigar Cafe 記録ノート": "— Cigar Cafe journal",
    "英語を生成中…": "Translating…",
    "（英語の付加に失敗したため日本語のみ。サーバー関数の更新が必要かもしれません）":
      " (Japanese only — the translation failed; the server function may need updating)",
    "（日本語＋英語）": " (Japanese + English)",
    "テキスト{suffix}をコピーしました。LINEやメールに貼り付けてください。":
      "Copied the text{suffix}. Paste it into a message or email.",
    "リンクでのシェアには共有データベース（クラウド設定）が必要です。":
      "Sharing by link needs the shared database (cloud settings) to be set up.",
    "リンク作成中…": "Creating link…",
    "共有リンクをコピーしました：": "Share link copied:",
    "リンクを作成しました：": "Link created:",
    "共有リンク用のテーブルが未作成です。DATABASE_SETUP.md の「共有リンク」のSQLをSupabaseで実行してください。":
      "The table for share links has not been created. Run the \"share links\" SQL from DATABASE_SETUP.md in Supabase.",
    "共有リンクを作成できませんでした：{msg}": "Could not create a share link: {msg}",

    "「{name}」をシェア": "Share \"{name}\"",
    "🖼 画像で共有": "🖼 Share as an image",
    "写真つきのカード画像を作成して共有・保存": "Make a card image with your photos, to share or save",
    "🔗 リンクで共有": "🔗 Share a link",
    "URLを送るだけで、相手のブラウザで記録が見られる": "Send a URL and they can read the entry in their browser",
    "📝 テキストで共有": "📝 Share as text",
    "日本語＋英語（AI自動翻訳）をコピー・共有": "Copy Japanese + English (translated by AI)",
    "LINEやメールに貼れる文章をコピー": "Copy text you can paste into a message or email",
    "記録を読み込んでいます…": "Loading the entry…",
    "共有された記録が見つかりませんでした。": "That shared entry could not be found.",
    "リンクが削除されたか、期限切れの可能性があります。": "The link may have been deleted or expired.",
    "共有写真": "Shared photo",
    "記録：{name}": "Logged by {name}",

    "{y}年のまとめ": "{y} in review",
    "吸った本数": "cigars smoked",
    "総額": "total spent",
    "産地の数": "origins",
    "平均評価（★）": "avg rating (★)",
    "いちばん吸ったブランド：<b>{name}</b>（{n}本）": "Most-smoked brand: <b>{name}</b> ({n})",
    "ベストの一本：<b>{name}</b>": "Best of the year: <b>{name}</b>",
    "よく楽しんだ場所：<b>{name}</b>（{n}回）": "Favourite spot: <b>{name}</b> ({n} visits)",
    "{y}年の記録はまだありません。": "No entries yet for {y}.",

    "「記録者」にお名前を入力すると、クラウドに保存した自分の記録が表示されます。":
      "Enter your name under \"Logged by\" to see the entries you saved to the cloud.",
    "この端末にはまだ記録がありません。": "There are no entries on this device yet.",
    "まだ記録がありません。": "No entries yet.",
    "「＋ 一本を記録する」から、最初の一本を書き留めましょう。":
      "Tap \"＋ Log a cigar\" to write down your first one.",
    "「{q}」に一致する記録は見つかりませんでした。": "Nothing matches \"{q}\".",
    "☁ この端末に保存された記録を表示中です。上の「記録者」にお名前を入れると、クラウドに保存されて別の端末でも使え、消えなくなります。":
      "☁ Showing the entries stored on this device. Put your name in \"Logged by\" above and they will be saved to the cloud — available on your other devices, and safe from being lost.",
    "🔁 {n}回目": "🔁 #{n}",
    "⏱ {n}分": "⏱ {n} min",
    "続きを読む": "Read more",
    "{name}の写真{n}": "{name}, photo {n}",
    "編集": "Edit",
    "シェア": "Share",
    "AI講評": "AI note",

    "記録がまだありません。": "There are no entries yet.",
    "形式が不正です": "The file is not in the right format",
    "先に上の「記録者」にお名前を入力してから読み込んでください（その名前であなたの記録として保存されます）。":
      "Enter your name under \"Logged by\" above before importing — the entries will be saved under that name.",
    "既存の記録に追加しますか？\n［OK＝追加 / キャンセル＝すべて置き換え］":
      "Add to your existing entries?\n[OK = add / Cancel = replace everything]",
    "共有DBへの反映に一部失敗しました。": "Some entries could not be written to the shared database.",
    "{n} 件の記録を読み込みました。": "Imported {n} entries.",
    "読み込みに失敗しました：{msg}": "Import failed: {msg}",
    "共有DB（自分の記録だけ表示）": "Shared database (only your entries)",
    "この端末に保存（大容量）": "Saved on this device (large capacity)",
    "この端末に保存": "Saved on this device",
    "金額とレート（1通貨＝何円か）を入れてください。": "Enter an amount and a rate (how many yen to one unit).",
    "{a} {cur} × {r}円 ＝ 約 ¥{yen} を価格欄に入れました。": "{a} {cur} × ¥{r} ≈ ¥{yen} — put into the price field.",

    /* ---------- ホーム ---------- */
    "今日の一本": "Cigar of the day",
    "ブランド大全で読む": "Read in the brand encyclopaedia",
    "今日の並び": "Today's line-up",
    "すべて見る": "See all",
    "開く": "Open",
    "収録ブランド": "brands covered",
    "世界の銘柄（マルカ）を創業から現在まで": "The world's marcas, from founding to now",
    "産地・国": "origins & countries",
    "キューバから東南アジアまで": "From Cuba to South-East Asia",
    "サイズ（ビトラ）": "sizes (vitolas)",
    "寸法と味わいの目安つき": "With dimensions and flavour notes",
    "翻訳ニュース": "news stories",
    "海外一次ソース＋国内の動き": "Overseas reporting plus Japan",
    /* ホームの索引カード（見出しと説明） */
    "home::基礎知識": "Basics",
    "home::葉巻とは？構造・吸い方・味わいの表現・歴史・マナーまで。": "What a cigar is — anatomy, how to smoke, flavour, history and etiquette.",
    "home::国・産地別": "By country",
    "home::キューバ、ドミニカ、ニカラグア…主要10産地の個性を比較。": "Cuba, the Dominican Republic, Nicaragua… ten origins compared.",
    "home::太さ・サイズ別": "By size",
    "home::リングゲージとビトラ。定番サイズを一覧で。": "Ring gauge and vitolas — the standard sizes at a glance.",
    "home::価格帯別": "By price",
    "home::入門からハイエンドまで、価格別の選び方。": "From first buys to high end — how to choose at each price.",
    "home::喫煙具・保管": "Accessories & storage",
    "home::カッター、ライター、ヒュミドールの選び方。": "Choosing cutters, lighters and humidors.",
    "home::ヒュミドール大全": "The humidor in full",
    "home::歴史・メーカー・使い方・種類・価格を5つの観点で徹底調査。": "History, makers, use, types and prices — five angles in depth.",
    "home::上級編（オタクの世界）": "Going deeper",
    "home::品種・発酵・キューバ通・名門・喫煙術・ペアリング・熟成科学。": "Varietals, fermentation, Cuba lore, the great houses, technique, pairing, ageing.",
    "home::博士編（学術）": "The scholarship",
    "home::化学・植物学・官能評価・銘柄DB・産業経済・健康科学。": "Chemistry, botany, sensory science, a brand database, economics, health.",
    "home::日本ガイド": "Japan guide",
    "home::全国47都道府県の販売店・シガーバー一覧。日本の歴史・税制・喫煙環境・マナーも。": "Shops and cigar bars in all 47 prefectures, plus Japan's history, tax and smoking rules.",
    "home::世界編（総覧）": "The cigar world",
    "home::年表・文化・愛好家・日本・実践レビュー・投資・用語大全・トラベル・FAQ。": "Timeline, culture, devotees, tasting, investment, glossary, travel, FAQ.",
    "home::ブランド大全": "Brand encyclopaedia",
    "home::世界の銘柄（マルカ）を創業からの歴史とともに。まずはキューバ全マルカ。": "The world's marcas with their histories — starting with every Cuban marca.",
    "home::葉巻ニュース": "Cigar news",
    "home::海外一次ソースの翻訳＋日本国内ニュース。新製品・業界・イベント・規制。": "Overseas reporting translated, plus news from Japan — releases, industry, events, regulation.",

    /* ---------- 基礎知識 ---------- */
    "葉巻とは": "What a cigar is",
    "葉巻の構造（アナトミー）": "Anatomy of a cigar",
    "葉巻の吸い方（初心者向け 5ステップ）": "How to smoke one — five steps for beginners",
    "よくある失敗：紙巻き感覚で肺に吸い込んでむせる／早いペースで吸って火が高温になり苦く・辛くなる／深く切りすぎて巻きがほどける。ゆっくり、少しずつが基本です。":
      "Common mistakes: inhaling into the lungs as with a cigarette and coughing; puffing too fast so the burn runs hot, bitter and harsh; cutting too deep so the wrapper unravels. Slowly, a little at a time, is the rule.",
    "味わいの表現・テイスティング": "The vocabulary of flavour",
    "ラッパーの色（シェード）による分類": "Wrapper shades",
    "葉巻の一番外側の葉「ラッパー」の色は、味わいの傾向を映す目安になります（※色の濃さ＝強さ ではなく、強さは主にフィラーが決めます）。":
      "The colour of the outermost leaf — the wrapper — is a rough guide to how a cigar will taste. (Darker does not mean stronger: strength comes mainly from the filler.)",
    "葉巻の歴史": "A short history",
    "マナー・楽しみ方とペアリング": "Etiquette, enjoyment and pairing",
    "用語集": "Glossary",

    /* ---------- 国・産地別 ---------- */
    "風味の特徴": "Flavour",
    "気候・土壌": "Climate & soil",
    "主な栽培地域": "Growing regions",
    "代表的な銘柄": "Notable marcas",
    "歴史": "History",
    "豆知識": "Worth knowing",
    "主な出典": "Main sources",
    "現存する主要ブランド": "Principal brands today",
    "その他・新興の葉巻生産国": "Other and emerging origins",
    "主要国のほかにも、高品質なラッパー葉や個性的な葉を支える産地があります（インドネシア／スマトラ、コスタリカ、パナマ、ペルー、コロンビア、エルサルバドル、パラグアイ 等）。":
      "Beyond the major countries, other origins supply fine wrapper leaf and distinctive tobaccos — Indonesia (Sumatra), Costa Rica, Panama, Peru, Colombia, El Salvador and Paraguay among them.",

    /* ---------- 太さ・サイズ別 ---------- */
    "長さ": "Length",
    "リングゲージ": "Ring gauge",
    "喫煙時間": "Smoking time",
    "葉巻の太さの種類（ゲージサイズ）一覧": "Cigar thicknesses — the ring gauges",
    "葉巻の太さは「ゲージ（直径）」で表され、数値が大きいほど太くなります。":
      "A cigar's thickness is given as its ring gauge (diameter); the higher the number, the thicker the cigar.",
    "味わい<br>（目安）": "Flavour<br>(roughly)",
    "喫煙時間<br>（目安）": "Time<br>(roughly)",
    "軽やか・ライト": "Light & delicate",
    "濃厚・フルボディ": "Rich & full-bodied",
    "短い（20〜30分）": "Short (20–30 min)",
    "長い（60〜120分）": "Long (60–120 min)",
    "ゲージ（Ring Gauge）とは？": "What is ring gauge?",
    "葉巻の直径を1/64インチ単位で表したもの。ゲージが大きいほど太く、煙の量や味わいの濃さ、喫煙時間に影響します。":
      "The diameter of a cigar in 64ths of an inch. The bigger the gauge, the thicker the cigar — and the more smoke, the richer the flavour, the longer the smoke.",
    "直径（ゲージ）<br>＝1/64インチ単位": "Diameter (gauge)<br>= 64ths of an inch",
    "ゲージ": "Gauge",
    "直径(mm)": "Diameter (mm)",
    "太さのイメージ": "How thick",
    "gauge::特徴": "Character",
    "gauge::とても細い": "Very slim",
    "gauge::細め〜中細": "Slim to medium",
    "gauge::中太": "Medium",
    "gauge::太め〜極太": "Thick to very thick",
    "gauge::軽やかで上品、短時間向き": "Light and elegant; for a short smoke",
    "gauge::バランスが良く、スタンダード": "Well balanced; the standard",
    "gauge::味わいと煙量のバランスが良い": "A good balance of flavour and smoke",
    "gauge::濃厚で煙量も多く、長時間向き": "Rich, generous smoke; for a long sitting",
    "vitola::パナテラ": "Panetela",
    "vitola::コロナ": "Corona",
    "vitola::ペティコロナ": "Petit Corona",
    "vitola::コロナゴルダ": "Corona Gorda",
    "vitola::ロブスト": "Robusto",
    "vitola::トロ": "Toro",
    "vitola::トロゴルダ": "Toro Gordo",
    "vitola::グランロブスト": "Gran Robusto",
    "vitola::ダブルトロ": "Double Toro",
    "※葉巻の長さ（リングゲージ以外）や形状（パレホ、トーピード、チャーチル等）によっても、喫煙体験は異なります。":
      "Length and shape (parejo, torpedo, Churchill and so on) change the experience too — ring gauge is only part of it.",
    "リングゲージとは": "About ring gauge",
    "主要なビトラ（サイズ規格）一覧": "The principal vitolas",
    "太さ別ガイド（細い vs 太い）": "Thin versus thick",
    "初心者の最初の一本には <b>ロブスト（約5インチ × RG50）</b> がおすすめ。まろやかで扱いやすく、30〜45分で楽しめます。":
      "For a first cigar, a <b>Robusto (about 5 inches × RG50)</b> is the usual advice: mellow, forgiving, and done in 30–45 minutes.",
    "形状の分類（パラホ / フィギュラード）": "Shapes — parejo and figurado",
    /* 実寸表示 */
    "実物大で見る（画面ものさし）": "See it life-size (your screen as a ruler)",
    "選んだビトラを<b>実物大</b>で画面に表示します。正確に表示するには、最初に一度だけ「ものさし合わせ」をしてください。":
      "Shows the chosen vitola at <b>actual size</b> on your screen. For accuracy, calibrate once first.",
    "ものさし合わせ（最初に一度だけ）": "Calibrate (once only)",
    "クレジットカード（またはICカード）を下の枠に<b>横向きに重ね</b>、スライダーで枠の幅をカードのサイズにピッタリ合わせてください。":
      "Hold a credit card (or any IC card) <b>sideways against the frame below</b>, and move the slider until the frame matches the card exactly.",
    "クレジットカード（横 85.6mm）": "Credit card (85.6mm wide)",
    "現在の設定：": "Current setting: ",
    "（この端末に記憶されます）": " (remembered on this device)",
    "<b>{ja}</b>（{en}）実物大 — 長さ約{len}mm × 直径約{dia}mm（RG {rg}）":
      "<b>{ja}</b> ({en}) at life size — about {len}mm long × {dia}mm across (RG {rg})",
    "画面が小さい場合は横にスクロールできます。手持ちの葉巻と重ねて比べてみてください。":
      "On a small screen you can scroll sideways. Try holding a real cigar against it.",

    /* ---------- 価格帯別 ---------- */
    "特徴": "What it is",
    "こんな人に": "Who it suits",
    "アドバイス": "Advice",
    "価格を深く読み解く": "Reading the price tag",
    "価格を左右する要因": "What drives the price",
    "ドライシガーとプレミアムシガーの違い": "Dry cigars versus premium cigars",

    /* ---------- 喫煙具 ---------- */
    "役割": "What it is for",
    "選び方": "How to choose",
    "種類・バリエーション": "Types and variations",
    "使い方": "How to use it",
    "手入れ・トラブル対処": "Care and troubleshooting",
    "歴史・文化・豆知識": "History, culture, trivia",
    "価格の目安": "What it costs",
    "おすすめブランド": "Recommended makers",
    "保管の基礎知識": "The basics of storage",

    /* ---------- ヒュミドール大全 ---------- */
    "ヒュミドールの歴史": "A history of the humidor",
    "簡易年表": "Timeline",
    "{n}項目": "{n} entries",
    "世界のヒュミドールメーカー・ブランド": "The world's humidor makers",
    "使い方・日常メンテナンス": "Use and daily upkeep",
    "ヒュミドールの種類・分類": "Types of humidor",
    "価格帯別ガイド": "A guide by price",

    /* ---------- ニュース ---------- */
    "ニュースを準備中です。": "News is on its way.",
    "最終更新：": "Last updated: ",
    "{n}件掲載": "{n} stories",
    "海外ニュースは英語の一次ソースをAIが翻訳・要約したもの、日本国内ニュースは国内ソースを要約したものです。正確な内容・最新の情報は、各記事の元記事リンクでご確認ください。掲載内容は最終更新時点の情報です（毎日自動更新）。":
      "Stories are AI summaries of their sources — follow the link on each story for the full original. Content reflects the last update (refreshed daily).",
    "すべて": "All",
    "newscat::新製品": "New releases",
    "newscat::業界・企業": "Industry",
    "newscat::イベント・アワード": "Events & awards",
    "newscat::規制・市場": "Regulation & markets",
    "newscat::日本国内": "Japan",
    "出典：": "Source: ",
    "元記事を読む →": "Read the original →",
    "原文を読む（英語）→": "Read the original →",

    /* ---------- 上級編 ---------- */
    "主要出典": "Main sources",
    "タバコ品種（バラエティ／シード）": "Tobacco varietals — the seed",
    "葉巻の風味は、まず“どの品種の種子を、どの土地で育てたか”で決まります。主要品種をタップして展開。":
      "A cigar's flavour begins with which seed was sown, and where it grew. Tap a varietal to expand.",
    "葉位（プライミング）— 1株のどの高さの葉か": "Primings — how high on the plant a leaf grew",
    "同じ株でも、日光を浴びる上部ほど強く難燃、下部ほど軽く良燃焼。ブレンダーはこの“葉位”を積み木のように組んでボディを設計します。":
      "On one plant, the sun-drenched upper leaves are strong but reluctant to burn; the lower leaves are light and burn well. Blenders stack these primings like building blocks to design a cigar's body.",
    "葉位": "Priming",
    "株の位置": "Position on the plant",
    "燃焼性": "Burn",
    "th::強さ": "Strength",
    "ブレンドでの役割": "Role in the blend",
    "栽培法 — シェード vs サン": "Shade-grown versus sun-grown",
    "ブレンド設計の哲学": "The philosophy of blending",
    "ラッパーの種類と風味": "Wrapper types and their flavours",
    "製造の全工程 — 葉から一本へ": "The whole process — from leaf to cigar",
    "収穫から出荷まで、各工程で“何が起き、化学的に何が変わるか”。":
      "From harvest to shipping — what happens at each stage, and what changes chemically.",
    "巻きの技法（バンチング＆キャップ）": "Rolling technique — bunching and the cap",
    "フィラー構造の格": "Grades of filler construction",
    "ボックスプレス vs ラウンド": "Box-pressed versus round",
    "プルーム vs カビ — 通の見極め": "Plume versus mould — the connoisseur's call",
    "この見極めは葉巻愛好家の必修科目。白い粉が“熟成の勲章”か“カビ”かで、一本の運命が分かれます。":
      "Every cigar lover must learn this one. Whether that white dust is a medal of ageing or mould decides a cigar's fate.",
    "熟成による味変化の化学": "The chemistry of flavour change with age",
    "色による選別・格付け（エスコヒダ）": "Sorting and grading by colour — the escogida",
    "ヴィトラの二重命名（ガレラ vs サリダ）": "The vitola's two names — galera and salida",
    "主要ガレラ名 早見表": "The main galera names at a glance",
    "ガレラ名": "Galera name",
    "寸法(mm×RG)": "Size (mm × RG)",
    "代表銘柄・通称": "Examples & nicknames",
    "箱の刻印の読み方（工場コード・デートコード）": "Reading the box stamps — factory and date codes",
    "ハバノスのブランド階層とライン": "The Habanos brand hierarchy and its lines",
    "限定・特別版の種類": "Limited and special editions",
    "偽物（フェイク）の見分け方": "Spotting a fake",
    "コイーバは世界で最も贋作が多い銘柄。以下のポイントを複合的に確認します。各項目をタップで展開。":
      "Cohiba is the most counterfeited cigar in the world. Check these points together, not singly. Tap an item to expand.",
    "CC vs NC — キューバ産 対 非キューバ産": "CC versus NC — Cuban against the rest",
    "伝説の一本（キューバ）": "Legendary Cuban cigars",
    "名門ブランド・カタログ（16銘柄）": "A catalogue of the great houses (16 brands)",
    "作風": "Style",
    "看板の一本": "The flagship",
    "adv::代表銘柄": "Signature cigars",
    "通のメモ": "Connoisseur's note",
    "シガー・オブ・ザ・イヤー（COTY）とは": "What Cigar of the Year (COTY) is",
    "殿堂級の高得点・伝説の銘柄": "Hall-of-fame scores and legendary cigars",
    "理想の点火とパージ": "The perfect light, and the purge",
    "ドロー（吸い心地）の調整": "Adjusting the draw",
    "トラブルシューティング": "Troubleshooting",
    "燃焼の乱れは腕でリカバーできます。症状をタップで対処法を展開。":
      "A wayward burn can be rescued with technique. Tap a symptom for the remedy.",
    "レトロヘイル（鼻抜き）": "The retrohale",
    "香りの7〜8割は嗅覚由来。これを覚えると葉巻の解像度が一段上がります。":
      "Seven- or eight-tenths of flavour comes through the nose. Learn this and the whole cigar comes into sharper focus.",
    "喫煙ペースと燃焼温度の科学": "The science of pace and burn temperature",
    "ナブ（どこで止めるか）": "The nub — where to stop",
    "味の三分割（Rule of Thirds）を読む": "Reading the rule of thirds",
    "通の儀式（ドライボックス他）": "Rituals of the connoisseur — dry-boxing and more",
    "ペアリングの3原則": "Three principles of pairing",
    "ドリンク別・相性ガイド": "A guide, drink by drink",
    "具体例": "Examples",
    "強さ別・早見表": "Quick matches by strength",
    "葉巻のタイプ": "Type of cigar",
    "おすすめドリンク": "Drink to reach for",
    "フードとの相性": "Pairing with food",
    "時間帯で選ぶ": "Choosing by time of day",
    "やってはいけないNG例": "What not to do",
    "よくある失敗を避けるだけで、ペアリングの成功率は大きく上がります。":
      "Simply avoiding the common mistakes lifts your success rate enormously.",
    "相対湿度（RH）の科学": "The science of relative humidity",
    "69%論争 — 「70/70神話」への反論": "The 69% debate — against the 70/70 myth",
    "なぜスパニッシュ・シダーなのか": "Why Spanish cedar",
    "シーズニング（慣らし）の正しい手順": "Seasoning a humidor properly",
    "新品ヒュミドールに“いきなり葉巻を入れる”のは厳禁。木が乾いていて水分を奪われます。":
      "Never put cigars straight into a brand-new humidor — the dry wood will rob them of moisture.",
    "加湿材の比較": "Humidification compared",
    "長所": "Pros",
    "短所": "Cons",
    "タバコシバンムシ対策と冷凍法": "Tobacco beetles, and the freezer cure",
    "高温（22℃超）が最大の引き金。1匹見つけたら全数処理を。":
      "Heat above 22°C is the great trigger. Find one beetle and you treat everything.",
    "長期熟成とマリッジ": "Long ageing and the marriage",
    "ヒュミドールの種類（上級）": "Types of humidor — the advanced view",
    "輸送・気候順応": "Transport and acclimatisation",

    /* ---------- 博士編 ---------- */
    "ニコチンとアルカロイド — 生合成と薬理": "Nicotine and the alkaloids — biosynthesis and pharmacology",
    "発酵の生化学": "The biochemistry of fermentation",
    "燃焼の物理化学 — 800〜950℃の反応炉": "The physical chemistry of combustion — a reactor at 800–950°C",
    "煙の組成 — 粒子相とガス相": "What smoke is made of — particulate and gas phases",
    "フレーバー化合物の科学": "The science of flavour compounds",
    "各風味ノートに対応する具体的な化合物クラス。香りは化学で説明できます。":
      "The compound classes behind each flavour note — aroma can be explained by chemistry.",
    "{n}種": "{n} types",
    "TSNA（タバコ特異的ニトロソアミン）": "TSNAs — tobacco-specific nitrosamines",
    "発がん物質群の生成機構。発酵・乾燥条件との関係を科学的に。":
      "How this family of carcinogens forms, and how fermentation and curing conditions affect it.",
    "煙のpH・アルカリ度と『強さ』": "Smoke pH, alkalinity and 'strength'",
    "熟成の化学（詳論）": "The chemistry of ageing, in detail",
    "植物学・分類 — Nicotiana tabacum": "Botany and taxonomy — Nicotiana tabacum",
    "栽培サイクルの科学": "The science of the growing cycle",
    "播種から段階収穫まで、各工程の日数と生理学的な目的。":
      "From sowing to staged harvest — how long each stage takes, and its physiological purpose.",
    "{n}工程": "{n} stages",
    "土壌科学とテロワール": "Soil science and terroir",
    "{n}産地": "{n} regions",
    "土壌": "Soil",
    "なぜ良質か": "Why it is so good",
    "気候・微気候と雲栽培": "Climate, microclimate and growing under cloud",
    "病害と品種改良（耐病性育種）": "Disease, and breeding for resistance",
    "葉巻史を動かした病害と、それに抗う遺伝学。各項目をタップで展開。":
      "The diseases that shaped cigar history, and the genetics that fight back. Tap an item to expand.",
    "{n}疾病": "{n} diseases",
    "キュアリング（乾燥）の植物生理": "The plant physiology of curing",
    "収量・農業データ": "Yields and farm data",
    "味覚・嗅覚の神経科学": "The neuroscience of taste and smell",
    "レトロヘイルで香りの解像度が上がる理由を、脳科学で説明。":
      "Why retrohaling sharpens the aromas — the brain science.",
    "フレーバーホイールと評価語彙": "The flavour wheel and the tasting vocabulary",
    "Cigar Aficionado 100点法の詳細": "The Cigar Aficionado 100-point scale in detail",
    "プロのテイスティング手順": "How the professionals taste",
    "専門パネルが1本を評価する標準的な9ステップ。":
      "The standard nine steps a professional panel uses to judge a cigar.",
    "{n}ステップ": "{n} steps",
    "マルカ": "Marca",
    "創業": "Founded",
    "分類": "Class",
    "代表ヴィトラ": "Key vitolas",
    "ヴィトラ・デ・ガレラ": "Vitola de galera",
    "長さ(mm)": "Length (mm)",
    "通称": "Known as",
    "th::銘柄": "Cigar",
    "ヴィトラ": "Vitola",
    "ボディ": "Body",
    "評": "Note",
    "th::ブランド": "Brand",
    "国": "Country",
    "代表ライン": "Key lines",
    "年": "Year",
    "点": "Score",
    "キューバ全マルカ（ブランド）一覧": "Every Cuban marca",
    "{n}銘柄": "{n} brands",
    "主要ヴィトラ完全寸法表": "The principal vitolas — full dimensions",
    "{n}規格": "{n} sizes",
    "キューバ銘品セレクション": "A selection of great Cuban cigars",
    "ニューワールド主要ブランド一覧": "The principal New World brands",
    "{n}ブランド": "{n} brands",
    "Cigar of the Year 全史（2004〜2025）": "Cigar of the Year — the full record (2004–2025)",
    "{n}年": "{n} years",
    "主要工場と工場コード": "The major factories and their codes",
    "米国の対キューバ通商禁輸（エンバーゴ）": "The US embargo on Cuba",
    "ハバノスS.A.の企業構造": "How Habanos S.A. is structured",
    "商標戦争 — コイーバを巡る30年の訴訟": "The trademark wars — thirty years of fighting over Cohiba",
    "革命とディアスポラ — 現代産地の起源": "Revolution and diaspora — where today's origins came from",
    "世界市場データ": "The world market in numbers",
    "数値はいずれも概算・出典により幅があります。": "All figures are approximate and vary by source.",
    "偽造品の経済": "The economics of counterfeiting",
    "価格の歴史と高騰・投資対象化": "Prices — their history, the recent surge, and cigars as investments",
    "はじめに — 中立・誠実な健康情報": "First — honest, neutral health information",
    "本項は葉巻文化の理解のため、公的機関（WHO・CDC・NCI・FDA等）の科学的コンセンサスに忠実に健康リスクをまとめたものです。喫煙を推奨するものではありません。喫煙は成人（20歳以上）のみ。":
      "For a full understanding of cigar culture, this section summarises the health risks faithfully to the scientific consensus of the public authorities (WHO, CDC, NCI, FDA and others). It does not encourage smoking. Smoking is for adults only (20 and over in Japan).",
    "健康科学 — リスクの正確な理解": "The health science — understanding the risks accurately",
    "ニコチンの薬理と『ニコチン酔い』": "The pharmacology of nicotine, and 'nicotine sickness'",
    "法規制と喫煙可能年齢": "The law, and the smoking age",
    "論文精読を準備中です。": "The literature reviews are being prepared.",
    "論文精読について — 文献レビューの方針": "About these close readings — how the reviews were written",
    "各分野の査読論文・専門モノグラフ・公的機関の報告（IARC・WHO・NCI・FDA・Nature系誌ほか）を横断的に読み込み、日本語で平易に再構成した文献レビューです。解釈が分かれる論点や出典の乏しい主張は「〜とされる」「議論がある」等と明示し、断定を避けています。各編末尾に主要文献を掲げます。専門的な内容を含みますが、順を追って読めるよう配慮しました。":
      "These literature reviews draw across peer-reviewed papers, specialist monographs and the reports of public bodies (IARC, WHO, NCI, FDA, the Nature journals and others), recast in plain language. Where interpretations differ or the sources are thin, we say so — 'it is held that', 'this is debated' — rather than assert. Key references are listed at the end of each review. The material is technical, but arranged to be read in order.",
    "主要文献": "Key references",

    /* ---------- 世界編 ---------- */
    "葉巻の通史・詳細年表": "A detailed timeline of the cigar",
    "歴史を作った重要人物": "The people who made the history",
    "{n}名": "{n} people",
    "世界の葉巻フェスティバル・イベント": "Cigar festivals and events worldwide",
    "世界の著名シガーバー・名店": "Celebrated cigar bars and shops of the world",
    "world::{n}軒": "{n} venues",
    "地域別の葉巻文化": "Cigar culture, region by region",
    "各地域をタップで展開。": "Tap a region to expand.",
    "{n}地域": "{n} regions",
    "葉巻にまつわる慣習・豆知識": "Customs and lore of the cigar",
    "歴史上・現代の著名な葉巻愛好家": "Famous cigar lovers, past and present",
    "好んだ銘柄：": "Cigar of choice: ",
    "実践テイスティングノート集": "Tasting notes, cigar by cigar",
    "銘柄・産地・強さ・風味で検索…": "Search by cigar, origin, strength or flavour…",
    "序盤": "Start",
    "中盤": "Middle",
    "終盤": "Finish",
    "造り": "Build",
    "ペア": "Pair",
    "総評": "Verdict",
    "種類": "Type",
    "価格（日本）": "Price (Japan)",
    "th::特徴": "Character",
    "タイプ": "Type",
    "カテゴリ解説（リトル/シガリロ/ドライ/フレーバー/機械巻き）":
      "The categories — little, cigarillo, dry, flavoured, machine-made",
    "主要ブランド一覧": "The principal brands",
    "日本で買えるドライ/リトルシガー": "Dry and little cigars you can buy in Japan",
    "プレミアムとの違い・位置づけ": "How they differ from premium cigars",
    "葉巻投資の考え方": "Cigars as an investment — how to think about it",
    "数値はいずれも概算。嗜好品ゆえ流動性が低く、あくまで趣味の延長・分散資産の一つとして。":
      "All figures are rough. Cigars are illiquid — treat this as an extension of the hobby and a small diversifier, nothing more.",
    "オークション市場": "The auction market",
    "史上最も高価な葉巻": "The most expensive cigars ever sold",
    "{n}選": "{n} picks",
    "ヴィンテージ・生産終了の伝説的銘柄": "Vintage and discontinued legends",
    "各銘柄をタップで展開。": "Tap a cigar to expand.",
    "年代の見分け方と保管": "Dating a box, and keeping it",
    "コレクションの始め方": "Starting a collection",
    "多言語・葉巻用語大全（西 / 英 / 日）": "The cigar lexicon — Spanish / English / Japanese",
    "用語を検索（日本語・スペイン語・英語）…": "Search terms (Japanese, Spanish, English)…",
    "{n}語": "{n} terms",
    "国・地域": "Country / territory",
    "葉巻の免税持込み（目安）": "Duty-free allowance (guide)",
    "注意": "Notes",
    "ハバナ（キューバ）での購入ガイド": "Buying in Havana",
    "『工員のおすそ分け』を騙る路上販売はほぼ偽物。公認店で正価・領収書つきが鉄則です。":
      "Street sellers claiming a 'factory worker's share' are almost always selling fakes. The rule: official shops, full price, receipt in hand.",
    "旅先での偽物回避チェックリスト": "A traveller's checklist against fakes",
    "主要国の免税・持込み規制": "Duty-free and import limits by country",
    "{n}か国": "{n} countries",
    "数値はいずれも目安で、改定されうるため各国税関公式で最新確認を。":
      "All figures are a guide only and do change — check each country's customs authority for the latest.",
    "免税店（デューティフリー）活用のコツ": "Making the most of duty-free",
    "オンライン購入・個人輸入の注意": "Buying online and importing yourself",
    "日本への持込み・個人輸入": "Bringing cigars into Japan",
    "判定：": "Verdict: ",
    "葉巻の神話・都市伝説の検証": "Cigar myths and legends, examined",
    "よくある俗説を事実で検証します。": "Common claims, tested against the facts.",
    "初心者からのよくある質問（FAQ）": "Frequently asked questions",
    "{n}問": "{n} questions",

    /* ---------- ページのデータ読み込み ---------- */
    "データを読み込めませんでした。通信環境をご確認のうえ、もう一度お試しください。":
      "This page's data could not be loaded. Please check your connection and try again.",

    /* ---------- 日本ガイド ---------- */
    "全国の葉巻販売店・シガーバー": "Cigar shops and cigar bars across Japan",
    "全国一覧はただいま調査・整備中です。": "The nationwide list is still being researched.",
    "公開情報では確認できませんでした。": "Nothing could be confirmed from published sources.",
    "要確認": "Unconfirmed",
    "{n}軒": "{n} open",
    "{n}件": "{n} listed",
    "{n}店": "{n} shops",
    "情報更新日：{date}": "Updated {date}",
    "掲載情報は公開情報（各店公式・食べログ・正規取扱店リスト・報道等）をもとにした<b>{date}時点の目安</b>です。営業状況・移転・閉店・品揃え・喫煙可否・持込ルールは変わりやすいため、<b>来店前に必ず各店の公式・電話で最新情報をご確認ください</b>。「要確認」表示は特にご注意を。閉店が判明した店も記録として残しています。":
      "This list is drawn from published sources — each venue's own pages, Tabelog, authorised-stockist lists and press reports — and reflects <b>the position as of {date}</b>. Opening status, moves, closures, stock, whether smoking is allowed and rules on bringing your own all change easily, so <b>please check with the venue directly before you go</b>. Take particular care with anything marked \"Unconfirmed\". Venues known to have closed are kept here as a record.",
    "店名・エリア・都道府県で検索（例：銀座、シガーバー…）": "Search by name, area or prefecture (Ginza, cigar bar…)",
    "掲載の店舗情報は公開情報をもとにした<b>目安</b>です。営業状況・品揃え・喫煙可否・持込ルールは変わりやすいため、来店前に各店の公式・電話でご確認ください（「※要確認」付きは特に）。":
      "The venue information here is drawn from published sources and is <b>a guide only</b>. Opening status, stock, whether smoking is allowed and rules on bringing your own change easily — please check with the venue before you go, especially anything marked as needing confirmation.",
    "葉巻を買える専門店・売り場": "Where to buy: shops and counters",
    "シガーバー・ラウンジ（店内で購入・喫煙）": "Cigar bars and lounges (buy and smoke on the premises)",
    "大阪で葉巻を探すコツ": "Finding cigars in Osaka",
    "日本の葉巻の歴史": "The history of the cigar in Japan",
    "輸入・流通・税制": "Import, distribution and tax",
    "日本で葉巻を買う": "Buying a cigar in Japan",
    "【大阪】葉巻が買えるお店・シガーバー": "Osaka — shops and cigar bars",
    "日本の喫煙環境": "Where you may smoke in Japan",
    "日本の葉巻文化・和のマナー": "Cigar culture and Japanese etiquette",
    "初心者が日本で葉巻を始めるには": "Starting out with cigars in Japan",
    "まずは信頼できるシガーバーで一本を、が最短ルートです。":
      "The shortest way in: one cigar, at a cigar bar you can trust."
  };

  function fill(s, vars) {
    if (!vars) return s;
    return String(s).replace(/\{(\w+)\}/g, function (m, k) {
      return vars[k] != null ? vars[k] : m;
    });
  }

  /* 文言。英語版で辞書に無いものは日本語のまま返す（表示が消えるより良い）。
     ctx は「同じ日本語でも置き場所によって英語が変わる」場合の目印。
     例：「産地」はフォームの項目名なら Origin、統計の見出しなら origins。 */
  function t(s, vars, ctx) {
    if (LANG !== "en") return fill(s, vars);
    var key = ctx ? ctx + "::" + s : null;
    var en = key && Object.prototype.hasOwnProperty.call(EN, key) ? EN[key]
           : (Object.prototype.hasOwnProperty.call(EN, s) ? EN[s] : s);
    return fill(en, vars);
  }
  /* ビトラ（サイズ）名。データ側に英語名があるのでそれを使う */
  var VITOLA = null;
  function vitola(v) {
    if (LANG !== "en" || !v) return v || "";
    if (!VITOLA) {
      VITOLA = {};
      try { (CIGAR_DATA.vitolas || []).forEach(function (x) { if (x.ja && x.en) VITOLA[x.ja] = x.en; }); }
      catch (e) { /* データ未読み込みの環境ではそのまま返す */ }
    }
    return VITOLA[v] || v;
  }
  /* 産地名。保存される値は日本語のまま、表示だけ英語にする */
  function country(c) {
    if (LANG !== "en" || !c) return c || "";
    return COUNTRY[c] || c;
  }
  function strength(s) {
    if (LANG !== "en" || !s) return s || "";
    if (STRENGTH[s]) return STRENGTH[s];
    /* 「ミディアム〜フル」のような範囲表記は、両端をそれぞれ訳してつなぐ */
    var WORD = { "マイルド": "Mild", "ライト": "Light", "ミディアム": "Medium", "フル": "Full" };
    return String(s).split(/[〜~–]/).map(function (w) {
      return WORD[w.trim()] || STRENGTH[w.trim()] || w;
    }).join("–");
  }
  /* 検索用：日本語と英語のどちらで打っても当たるように、両方を並べた文字列 */
  function both(c) {
    if (!c) return "";
    return c + " " + (COUNTRY[c] || "");
  }

  return { lang: LANG, isEn: LANG === "en", t: t, country: country, strength: strength, vitola: vitola, both: both };
})();

/* 呼び出しを短くするための別名。
   既存コードに関数内ローカルの t（ソート用の一時関数など）が複数あるため、
   うっかり隠れて別物を呼ぶことがないよう、大文字の T を使う。 */
var T = I18N.t;
