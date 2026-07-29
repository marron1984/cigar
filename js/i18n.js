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
    "ブランド": "the brand"
  };

  function fill(s, vars) {
    if (!vars) return s;
    return String(s).replace(/\{(\w+)\}/g, function (m, k) {
      return vars[k] != null ? vars[k] : m;
    });
  }

  /* 文言。英語版で辞書に無いものは日本語のまま返す（表示が消えるより良い） */
  function t(s, vars) {
    if (LANG !== "en") return fill(s, vars);
    var en = Object.prototype.hasOwnProperty.call(EN, s) ? EN[s] : s;
    return fill(en, vars);
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

  return { lang: LANG, isEn: LANG === "en", t: t, country: country, strength: strength, both: both };
})();

/* 呼び出しを短くするための別名。
   既存コードに関数内ローカルの t（ソート用の一時関数など）が複数あるため、
   うっかり隠れて別物を呼ぶことがないよう、大文字の T を使う。 */
var T = I18N.t;
