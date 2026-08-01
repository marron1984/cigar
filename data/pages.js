/* ============================================================
   Cigar Cafe — ページごとのURL・タイトル・説明文
   ------------------------------------------------------------
   1枚のHTMLで画面を切り替える作りだが、検索エンジンには
   ページごとに別々のURL（/brands/ など）として拾ってもらいたい。
   その対応表と、ページごとの <title> / description をここにまとめる。

   ・path … サイト直下からの道筋。ホームだけ空（＝ "/" と "/en/"）
   ・ja / en … 各言語の題と説明文
   ・enReady … 英語版の「中身」ができているか。
       true のページだけ、英語版を sitemap に載せて検索対象にする。
       まだ本文が日本語のままのページは、英語ページ自体は残す
       （言語切替から開ける）が、noindex を付けて検索結果に出さない。
       英語のタイトルで検索から来た人に日本語本文を読ませないため。
       本文を英語化できたページから true に変えていく。
   使うのは3か所：
     - js/app.js        画面を切り替えたときに題とURLを書き換える
     - tools/build_pages.js  /brands/index.html などの実体を作る
     - tools/build_pages.js  sitemap.xml を作る
   ============================================================ */
var PAGE_META = {
  home: {
    enReady: true,
    path: "",
    ja: {
      title: "Cigar Cafe｜はじめての葉巻を、やさしく",
      desc: "はじめての人でも入りやすい葉巻（シガー）の入門サイト。基礎知識・国や産地・太さ・価格・道具をやさしく解説。吸った一本を記録できるノート付き。"
    },
    en: {
      title: "Cigar Cafe — cigars, explained gently",
      desc: "A friendly introduction to cigars. Basics, countries and origins, sizes, prices and accessories — explained plainly, with a journal for the cigars you smoke."
    }
  },
  basics: {
    enReady: true,
    path: "basics",
    ja: {
      title: "葉巻の基礎知識 — 構造・吸い方・味わい・歴史｜Cigar Cafe",
      desc: "葉巻とは何か。ラッパー・バインダー・フィラーの構造、カットと火の付け方の5ステップ、味わいの表現、ラッパーの色による分類、歴史とマナーまで。はじめの一本の前に。"
    },
    en: {
      title: "Cigar basics — anatomy, how to smoke, flavour, history | Cigar Cafe",
      desc: "What a cigar is: wrapper, binder and filler, a five-step guide to cutting and lighting, the vocabulary of flavour, wrapper shades, history and etiquette. Read this before your first one."
    }
  },
  countries: {
    enReady: true,
    path: "countries",
    ja: {
      title: "国・産地別の葉巻 — キューバ／ドミニカ／ニカラグアほか｜Cigar Cafe",
      desc: "キューバ、ドミニカ共和国、ニカラグア、ホンジュラス、メキシコ、エクアドル、アメリカ、ブラジル、カメルーン、フィリピン。主要産地の気候・土壌・味の傾向・歴史を比較。"
    },
    en: {
      title: "Cigars by country — Cuba, Dominican Republic, Nicaragua and more | Cigar Cafe",
      desc: "Cuba, the Dominican Republic, Nicaragua, Honduras, Mexico, Ecuador, the USA, Brazil, Cameroon and the Philippines — climate, soil, flavour and history, side by side."
    }
  },
  sizes: {
    enReady: true,
    path: "sizes",
    ja: {
      title: "葉巻の太さとサイズ — リングゲージとビトラ早見表｜Cigar Cafe",
      desc: "ロブスト、コロナ、チャーチル、トロ…定番ビトラの長さ・リングゲージ・喫煙時間の目安を一覧で比較。画面をものさしにした実物大表示つき。"
    },
    en: {
      title: "Cigar sizes — ring gauge and vitola reference | Cigar Cafe",
      desc: "Robusto, Corona, Churchill, Toro and the rest — length, ring gauge and rough smoking time for every standard vitola, plus a life-size view using your screen as a ruler."
    }
  },
  prices: {
    enReady: true,
    path: "prices",
    ja: {
      title: "葉巻の価格帯別ガイド — 入門からハイエンドまで｜Cigar Cafe",
      desc: "ドライシガーからプレミアム、ハイエンドまで。価格帯ごとの特徴と代表銘柄、選び方のアドバイス、価格を左右する要因をまとめて解説。"
    },
    en: {
      title: "Cigars by price — from first buys to high end | Cigar Cafe",
      desc: "From dry cigars to premium and high end: what each price band gets you, which marques to look at, how to choose, and what actually drives the price."
    }
  },
  tools: {
    enReady: true,
    /* URLは accessories（喫煙具＝アクセサリー）。
       tools/ はビルド用スクリプトの置き場なので、そこと重ならないようにしている。 */
    path: "accessories",
    ja: {
      title: "葉巻の喫煙具と保管 — カッター・ライター・ヒュミドール｜Cigar Cafe",
      desc: "カッター、ライター、パンチ、シガーレスト、ヒュミドールなど喫煙具の役割・選び方・使い方・手入れ・価格の目安。保管の基礎知識も収録。"
    },
    en: {
      title: "Cigar accessories and storage — cutters, lighters, humidors | Cigar Cafe",
      desc: "Cutters, lighters, punches, rests and humidors: what each is for, how to choose one, how to use and look after it, and what it costs. Plus the basics of storage."
    }
  },
  humidor: {
    enReady: false,
    path: "humidor",
    ja: {
      title: "ヒュミドール大全 — 歴史・メーカー・使い方・種類・価格｜Cigar Cafe",
      desc: "葉巻の保管庫ヒュミドールを5つの観点で解説。スペイン杉の役割、加湿方式の違い、シーズニングの手順、主要メーカーと価格帯まで。"
    },
    en: {
      title: "The humidor in full — history, makers, use, types, prices | Cigar Cafe",
      desc: "Everything about the humidor in five parts: why Spanish cedar, how the humidification methods differ, how to season one, and who makes them at what price."
    }
  },
  advanced: {
    enReady: false,
    path: "advanced",
    ja: {
      title: "葉巻の上級編 — 品種・発酵・キューバ学・ペアリング・熟成｜Cigar Cafe",
      desc: "タバコの品種と葉の部位、発酵と製造の技、キューバ葉巻の見方、名門ブランドの系譜、喫煙術、ペアリング、保管と熟成の科学。一歩踏み込みたい人へ。"
    },
    en: {
      title: "Going deeper — varietals, fermentation, Cuba, pairing, ageing | Cigar Cafe",
      desc: "Tobacco varietals and leaf positions, fermentation and the craft of rolling, reading Cuban cigars, the great houses, smoking technique, pairing, and the science of ageing."
    }
  },
  phd: {
    enReady: false,
    path: "phd",
    ja: {
      title: "葉巻の学術 — 化学・植物学・官能評価・産業経済・健康科学｜Cigar Cafe",
      desc: "査読論文・公的モノグラフを読み込んだ文献レビュー。燃焼の化学、植物学と農学、官能評価の方法論、銘柄規格DB、産業構造と地政学、健康と法規制。"
    },
    en: {
      title: "The scholarship — chemistry, botany, sensory science, economics | Cigar Cafe",
      desc: "A literature review built from peer-reviewed papers and public monographs: combustion chemistry, botany and agronomy, sensory methodology, a specification database, industry and geopolitics, health and regulation."
    }
  },
  japan: {
    enReady: true,
    path: "japan",
    ja: {
      title: "日本の葉巻ガイド — 全国47都道府県の販売店・シガーバー一覧｜Cigar Cafe",
      desc: "全国47都道府県の葉巻販売店・シガーバーを出典つきで一覧。日本の葉巻の歴史、たばこ税、受動喫煙対策と喫煙環境、持込みルール、はじめての歩き方も。"
    },
    en: {
      title: "Cigars in Japan — fixed prices, legal Cubans, where to buy and smoke | Cigar Cafe",
      desc: "How cigars really work in Japan: retail prices fixed by law, Cuban cigars sold legally, customs allowances, where smoking is allowed — plus shops and cigar bars in all 47 prefectures."
    }
  },
  world: {
    enReady: false,
    path: "world",
    ja: {
      title: "世界の葉巻 — 年表・文化・名店・投資・用語大全・トラベル｜Cigar Cafe",
      desc: "葉巻の通史と年表、世界の名店と文化、著名な愛好家、テイスティングの実践、投資とオークション、用語大全、旅先での楽しみ方、都市伝説の検証。"
    },
    en: {
      title: "The cigar world — timeline, culture, lounges, investment, glossary | Cigar Cafe",
      desc: "The long history and a detailed timeline, the great lounges and their culture, famous devotees, tasting in practice, investment and auctions, a full glossary, travel, and myths examined."
    }
  },
  brands: {
    enReady: false,
    path: "brands",
    ja: {
      title: "葉巻ブランド大全 — 世界の銘柄（マルカ）を創業から現在まで｜Cigar Cafe",
      desc: "14産地の銘柄を収録。創業年・創業者・名の由来・製造拠点・代表ヴィトラ・味の傾向・現在の位置づけを、海外一次ソースに基づき出典つきで解説。"
    },
    en: {
      title: "Cigar brands in full — the world's marcas, from founding to now | Cigar Cafe",
      desc: "Marcas from fourteen origins: founding year, founder, the meaning of the name, where they are made, the signature vitolas and how they taste — sourced from overseas primary material."
    }
  },
  news: {
    enReady: true,
    path: "news",
    ja: {
      title: "葉巻ニュース — 新製品・業界・イベント・規制｜Cigar Cafe",
      desc: "海外一次ソースの翻訳要約と日本国内のニュース。新製品リリース、メーカーの動き、イベント、規制と税制の変化を定期更新でお届けします。"
    },
    en: {
      title: "Cigar news — releases, industry, events, regulation | Cigar Cafe",
      desc: "Overseas reporting translated and summarised, alongside news from Japan: new releases, what the makers are doing, events, and changes to regulation and tax."
    }
  },
  note: {
    enReady: true,
    path: "note",
    ja: {
      title: "葉巻の記録ノート — 吸った一本を残す｜Cigar Cafe",
      desc: "銘柄・産地・サイズ・価格・場所・評価・感想・写真を残せる記録ノート。統計グラフ、喫煙タイマー、吸いたいリスト付き。記録はお使いの端末に保存されます。"
    },
    en: {
      title: "Cigar journal — keep a record of every one | Cigar Cafe",
      desc: "Record the marque, origin, size, price, place, rating, notes and photographs of each cigar. With charts, a smoking timer and a wish list. Your entries stay on your own device."
    }
  }
};
