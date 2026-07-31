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

    /* ---------- 在庫の同期 ---------- */
    "☁ 共有データベースと同期しています…": "☁ Syncing with the shared database…",
    "☁ 共有データベースと同期しました（{n}本）。": "☁ Synced with the shared database ({n} cigars).",
    "☁ 共有データベースに保存しました。": "☁ Saved to the shared database.",
    "☁ 共有データベースへの保存に失敗しました（手元には保存されています）。":
      "☁ Could not save to the shared database (your copy on this device is safe).",
    "☁ 同期できませんでした：{msg}": "☁ Could not sync: {msg}",
    "☁ 在庫用のテーブルがまだ作られていません。DATABASE_SETUP.md の「ヒュミドール在庫」のSQLをSupabaseで実行してください。":
      "☁ The table for humidor stock has not been created yet. Run the \"humidor stock\" SQL from DATABASE_SETUP.md in Supabase.",
    "☁ 上の「記録者」にお名前を入れると、在庫がスマホとパソコンで同じになります。":
      "☁ Put your name in \"Logged by\" above and your humidor will be the same on your phone and your computer.",

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
    return STRENGTH[s] || s;
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
