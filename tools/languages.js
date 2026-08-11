/* ============================================================
   Cigar Cafe — 対応言語の一覧（日本語以外）
   ------------------------------------------------------------
   多言語まわりの道具（build_lang.js / build_pages.js /
   check_en_content.js）はすべてこの表を見る。言語を足すときは
   ここに1行足し、I18N_GUIDE.md の手順で中身を作っていく。

   ・code     … URLの階層（/en/）・データの置き場（data/en/）・
                window.SITE_LANG の値。すべてこの1つで揃える
   ・enabled  … true にするとビルド対象になり、シェルと各ページが
                生成される。翻訳が揃うまでは false のまま
                （false でも build_lang.js に code を渡せば試し組みできる）
   ・hreflang … sitemap と <link rel="alternate"> に使う言語タグ
   ・ogLocale … SNSカードの og:locale
   ・htmlDict … index.html の静的文言の対訳（build_lang.js が使う）
   ・extraScript … 実行時のUI文言辞書（js/i18n.js より先に読み込ませ、
                window.I18N_EXTRA を立てるファイル）。英語だけは歴史的に
                js/i18n.js 本体に辞書があるので null
   ・untranslated … 未翻訳の検出方法。
                en: 日本語の文字（かな・漢字）が残っていれば未翻訳。
                zh: 漢字は中国語と共有なので使えない。かなが残っていれば
                    未翻訳と判定する（日本語の文章にはほぼ必ずかなが混ざる）
   ============================================================ */
module.exports = [
  {
    code: "en",
    enabled: true,
    hreflang: "en",
    ogLocale: "en_US",
    htmlDict: "i18n/html.en.json",
    extraScript: null,
    untranslated: { re: "[぀-ヿ㐀-鿿]", limit: 15 }
  },
  {
    /* 繁体字中国語（香港・台湾向け）。翻訳が揃うまで enabled: false。
       有効化までの手順は I18N_GUIDE.md を参照 */
    code: "zh",
    enabled: false,
    hreflang: "zh-Hant",
    ogLocale: "zh_TW",
    htmlDict: "i18n/html.zh.json",
    extraScript: "js/i18n.zh.js",
    untranslated: { re: "[ぁ-んァ-ヶー]", limit: 4 }
  }
];
