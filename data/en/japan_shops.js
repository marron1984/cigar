/* ============================================================
   Cigar Cafe — Japan shop directory, English text
   ------------------------------------------------------------
   英語版でだけ読み込まれ、js/japan.js が JAPAN_EN を見て
   説明文・エリア・業態・営業状況を英語に差し替える。

   ■ 店名と店の所在地の日本語は残す
   訪日客が実際に店へたどり着くには、日本語の店名・住所が要る。
   英語だけにすると地図・タクシー・店への電話で通じなくなるため、
   店名はそのまま、エリアはローマ字表記にしている。

   ■ 差分だけを持つ
   出典・状態などの構造は元データのままで、ここには訳した項目だけを置く。
   キーは「都道府県コード|店名」。
   ============================================================ */
var JAPAN_EN = {
  regions: {
    "北海道・東北": "Hokkaido & Tohoku",
    "関東": "Kanto",
    "中部": "Chubu",
    "近畿": "Kansai",
    "中国": "Chugoku",
    "四国": "Shikoku",
    "九州・沖縄": "Kyushu & Okinawa"
  },

  types: {
    "シガーバー": "Cigar bar",
    "専門店": "Specialist shop",
    "バー（葉巻あり）": "Bar (cigars available)",
    "ホテルラウンジ": "Hotel lounge",
    "専門店（バー併設）": "Specialist shop (with bar)",
    "シガーラウンジ": "Cigar lounge",
    "専門店（たばこ販売）": "Specialist shop (tobacconist)",
    "専門店（カフェ併設）": "Specialist shop (with café)",
    "専門店（たばこ・喫煙具、葉巻取扱）": "Tobacconist (tobacco, accessories, cigars)",
    "専門店（たばこ・喫煙具、プレミアシガー取扱）": "Tobacconist (premium cigars)",
    "専門店（たばこ販売、葉巻取扱の可能性）": "Tobacconist (cigars possibly stocked)",
    "専門店（喫茶併設）": "Specialist shop (with café)",
    "ダイニングバー": "Dining bar",
    "百貨店売り場": "Department-store counter",
    "専門店（たばこ店・葉巻取扱）": "Tobacconist (cigars stocked)"
  },

  statuses: {
    "営業": "Open",
    "要確認": "Unconfirmed",
    "閉店（2017年頃）": "Closed (around 2017)",
    "閉店（時期不明）": "Closed (date unknown)",
    "葉巻提供終了（2026年）": "No longer serves cigars (2026)"
  },

  prefNotes: {
    hokkaido: "Shops carrying cigars are concentrated in Susukino, Chuo-ku, Sapporo, centred on the long-established tobacconist Momoya (around 100 cigars), with cigar bars — TAKE 5, Hiijii Cafe, AZUBAR and others — scattered around it. Out in the region, Tobacco House KONYA in Kushiro has one of the largest selections in eastern Hokkaido. In Hakodate, Asahikawa and other cities you will find the occasional bar serving cigars, but published sources show few specialist shops or dedicated cigar bars. Other tobacconists around Susukino — Big Dan, Tabako Land Yamagishi — are mentioned as carrying cigars, but we could not confirm their current status, so only the well-attested venues are listed here.",
    aomori: "No independent cigar specialist could be confirmed in Aomori Prefecture, but cigars can be bought at tobacconists in Aomori City (Cigar Break, Sake no Nakamura) and at a liquor shop in Misawa (Nakai Shoten). For somewhere to smoke, a handful of bars carrying cigars are scattered across Aomori and Hirosaki. Whether any hold official Habanos accounts, and what is actually in stock, needs checking with each shop.",
    iwate: "Cigar culture in Iwate is concentrated in the prefectural capital, Morioka; in Ichinoseki, Kitakami, Oshu, Hanamaki and along the coast, no specialist shop or cigar bar could be confirmed from published sources (as of 2026-07-16). The one certainty is Victoria Cigar Morioka in Saien; the rest are bars with cigars, or venues that need confirming.",
    miyagi: "Cigar culture in Miyagi is concentrated in Aoba-ku, Sendai — Kokubuncho, Ichibancho and Showacho. For buying, the long-established tobacconist Tabako Center Kawarada in Kita-Sendai is the anchor; for smoking, there is Cigar Lounge 9.2 and authentic bars carrying cigars such as LE BAR KAWAGOE and L'essentiel Bar. Outside Sendai, no specialist shop or cigar bar could be confirmed from published sources (as of 2026-07-16).",
    akita: "No cigar specialist could be confirmed in Akita from published sources; cigars are mainly found in authentic bars. At present we can confirm AquaBar Linden in Yuzawa and BAR LOG in Akita City as places that keep cigars. The dining bar ISOLA in Kawabara, Akita City, was known as a cigar bar but has closed. BAR Le Verre, a long-standing upmarket bar in Omachi/Kawabara, could not be confirmed either way on cigars.",
    yamagata: "Few cigar-related venues in Yamagata can be confirmed from published sources. For smoking there is Higashiya Bar in Yamagata City and BAR ChiC in Tsuruoka, both bars carrying Havana cigars; for buying, the tobacconist Shimakura in Takahata. No specialist shop with an official Habanos account (a Casa del Habano or similar) could be confirmed (as of 2026-07-16).",
    fukushima: "Places to enjoy a cigar in Fukushima are scattered around Koriyama and Fukushima City. Cigar Bar Churchill in Koriyama, with its walk-in humidor, is the standout. Fukushima City has bars carrying cigars such as BAR LIBRARY, and cigars can be bought at neighbourhood tobacconists in Koriyama and Iwaki (Tsutaya, Otake Shoten). No dedicated cigar lounge or department-store cigar counter could be confirmed; venues appearing only in directory listings (emu, L'Atelier Saran) may be out of date and need checking.",
    ibaraki: "What can be confirmed in Ibaraki from published sources is the smoking-accessory specialist Monperi Inariya in Hitachi (mainly dry cigars and foreign tobacco), plus a handful of bars carrying cigars in Mito, Tsuchiura, Koga and Hitachinaka (Katsuta). Rather than premium (Habanos) specialists, the picture is tobacconists plus bars that keep some cigars. What the bars have in stock varies, so it is worth checking before you go — including whether you may bring your own."
  },

  shops: {
    /* ---------- 北海道 ---------- */
    "hokkaido|TAKE 5 Bar & Cigar（テイクファイブ）": {
      area: "Susukino, Chuo-ku, Sapporo (S6 W4)",
      desc: "A hideaway bar about five minutes' walk from Susukino station. Over 140 whiskies (Japanese and Scotch) alongside Cuban cigars kept at controlled temperature and humidity. The Taiwanese owner also cooks Taiwanese food.",
      note: "Posts regularly on its official Threads account (@bar_take5)."
    },
    "hokkaido|札幌煙管ひいじいCAFE（ひいじいカフェ）": {
      area: "Susukino, Chuo-ku, Sapporo (S6 W3, Arima Building)",
      desc: "A cigar bar for smokers, opened in 2015 by an owner who loves pipes and cigars. Pipes are free to use, rolling tobacco is included in the cover charge, and cigars start from around ¥120 apiece — an easy place to try one. Also serves its own roasted coffee.",
      note: "The Arima Building is known as a location in the film 'The Detective is in the Bar'. Seven seats, smoking permitted."
    },
    "hokkaido|AZUBAR（アズバー）": {
      area: "Susukino, Chuo-ku, Sapporo",
      desc: "An authentic bar stocking Cuban Havanas for everyone from newcomers to heavy smokers. A strong list of fresh-fruit cocktails and single malts, with a choice of glassware led by Baccarat. A well-made hideaway, with McIntosh and JBL audio.",
      note: ""
    },
    "hokkaido|The Bow Bar（ザ・ボウ・バー）": {
      area: "Susukino, Chuo-ku, Sapporo (S4 W2)",
      desc: "An authentic bar with a back bar of bottles running to the ceiling, where whisky and brandy enthusiasts gather. Listed among Hokkaido's cigar bars as a place to enjoy a cigar with a spirit.",
      note: ""
    },
    "hokkaido|BAR MADURO（バー マデューロ）": {
      area: "Susukino, Chuo-ku, Sapporo",
      desc: "About two minutes from Susukino station, known for seasonal-fruit cocktails and champagne and beer chilled in an ultra-low-temperature fridge. Listed by Suntory's BAR-NAVI among Hokkaido bars with a good cigar selection.",
      note: "What cigars are in stock needs checking."
    },
    "hokkaido|リカー&タバコショップ モモヤ（MOMOYA）": {
      area: "Susukino, Chuo-ku, Sapporo (S5 W5, Momoya Building 1F)",
      desc: "A tobacco and liquor specialist in Susukino, in business over a century. The ground floor holds around 200 tobaccos and some 100 cigars and pipe tobaccos, with Cuban and Dominican cigars kept in large humidor cabinets. Also supplies many bars and restaurants.",
      note: "Open 10:00–02:00 (shorter hours on Sundays and holidays)."
    },
    "hokkaido|たばこハウスKONYA（こんや）": {
      area: "Kushiro",
      desc: "A tobacco and smoking-accessory specialist claiming one of the largest selections in eastern Hokkaido. Premium, dry, little and mini cigars (Davidoff, Café Crème and others), pipes, rolling tobacco, foreign tobacco and accessories. Also sells by mail order.",
      note: ""
    },
    "hokkaido|BAR JOURNEY（バー ジャーニー）": {
      area: "Hakodate (near Chuo Byoin-mae tram stop)",
      desc: "A shot bar with an unusually deep craft gin list, from the standards to bottles that are hard to find. Counter and table seating, comfortable for a solo visit. Appears in BAR-NAVI's search for Hokkaido bars with cigars.",
      note: "Whether cigars are actually stocked could not be confirmed from published sources."
    },

    /* ---------- 青森県 ---------- */
    "aomori|シガーブレイク（Cigar Break）": {
      area: "Midori, Aomori City (Sunroad Aomori)",
      desc: "A specialist in cigarettes, cigars, pipe tobacco and smoking accessories on the ground floor of Sunroad Aomori. Carries everything from cigarettes to cigars and pipe tobacco, with a range of accessories. Also takes mail orders from its catalogue.",
      note: "Open 10:00–20:00, no closing days (per published sources). Whether it holds an official Habanos account needs checking."
    },
    "aomori|酒のなかむら": {
      area: "Aoyagi, Aomori City",
      desc: "A local sake shop in Aomori that also carries pipes, cigars, kiseru and rolling tobacco. Tobacco is kept in good storage conditions, and there are unusual pipes and accessories too — a long-established liquor shop selling smoking goods alongside sake.",
      note: "Closed Sundays, 8:30–19:00 (per published sources). Check what cigars are in stock before visiting."
    },
    "aomori|中居酒店（WORLD LIQUOR NAKAI）": {
      area: "Chuo-cho, Misawa",
      desc: "A liquor shop in Misawa carrying tobacco and cigars alongside whisky and other spirits. Its website has a dedicated 'Tobacco & Cigars' page stating that cigars are stocked.",
      note: "The selection needs checking. Also listed by the Misawa tourism association and in Rurubu."
    },
    "aomori|COCKTAIL&SHOTBAR Ar（カクテルアンドショットバー アール）": {
      area: "Hashimoto, Aomori City (near Aomori station, Alpha Hotel 1F)",
      desc: "A stylish shot bar lining up more than 600 spirits from around the world. Cigars can be enjoyed alongside award-winning originals and seasonal cocktails. A calm, grown-up room.",
      note: "Which cigars are kept in stock needs checking. Listed on BAR-NAVI, Gurunavi, Tabelog and Retty."
    },
    "aomori|BAR LUCK": {
      area: "Shinkajimachi, Hirosaki (near Chuo Hirosaki station)",
      desc: "A quiet bar for a drink and a cigar. The owner is a certified Tequila Maestro of the Japan Tequila Association, and the bar is described as serving cigars alongside its spirits. About three minutes from Chuo Hirosaki station.",
      note: "Also appears in national cigar-bar lists (Hokkaido & Tohoku). Stock needs checking."
    },
    "aomori|GarCom de Bar（ガルソン・ジ・バール）": {
      area: "Okeyamachi, Hirosaki (near Chuo Hirosaki station)",
      desc: "A calm bar with its own cocktails, craft beers from across Japan and a good whisky list. Smoking is permitted, and it appears in national cigar-bar lists (Hokkaido & Tohoku) as a venue carrying cigars.",
      note: "The cigar listing comes from directory sources, so it needs confirming. Closed Sundays, from 18:00 (per published sources)."
    },

    /* ---------- 岩手県 ---------- */
    "iwate|Victoria Cigar Morioka（ヴィクトリア シガー モリオカ）": {
      area: "Saien, Morioka",
      desc: "A cigar café and specialist shop in the Saien district, about 14 minutes' walk from the south exit of Morioka station. The owner visits the Cuban producers in person, judging aroma and taste before buying, and deals exclusively in Cuban premium cigars. Smoking is permitted throughout, and there is an online store.",
      note: "Has its own site (victoria-cigar.jp), an online store, Instagram and a Tabelog listing. The best-documented cigar specialist in Iwate."
    },
    "iwate|ラクリマ・バッカス（LACRIMA Bacchus）": {
      area: "Odori, Morioka",
      desc: "An authentic-style bar on Odori in Morioka, listed in various directories as a cigar bar carrying cigars. Also appears in the Tohoku edition of the national cigar-bar list.",
      note: "The old address is recorded as Odori 3-2-23, but Ekiten shows Odori 1-9-10, Rainbow Building 7F, while Tabelog and Retty mark it as relocated. The position after the move could not be established — needs checking."
    },
    "iwate|Cigar Cafe AZ'（シガー・カフェ エー・ゼット・ダッシュ／カフェ AZ）": {
      area: "Daijiji-cho, Morioka",
      desc: "A café in a storehouse over 130 years old on the grounds of the Asabiraki sake brewery, long listed in national cigar-bar directories as a place to enjoy a cigar. A calm, old-warehouse atmosphere; also sells imported goods.",
      note: "Appears only in cigar-bar directory sources, and its current status as a cigar venue could not be confirmed. Listed on Jalan and elsewhere simply as 'Café AZ'."
    },

    /* ---------- 宮城県 ---------- */
    "miyagi|タバコセンター カワラダ（Tabako Center Kawarada）": {
      area: "Showacho, Aoba-ku, Sendai (Kita-Sendai)",
      desc: "A tobacconist about two minutes from Kita-Sendai station, holding cigars aged long-term in humidors — including fine cigars such as H. Upmann Petit Coronas and marques that are hard to find elsewhere. Regarded as one of the best cigar shops in Tohoku, with a notably knowledgeable owner.",
      note: "Believed to be the ground-floor tobacconist beneath the former cigar bar EL Fumador on the second floor of the same building."
    },
    "miyagi|cigarlounge9.2（ナインポイントツー）": {
      area: "Ichibancho, Aoba-ku, Sendai (Aoba-dori Ichibancho / Iroha Yokocho)",
      desc: "A cigar lounge in the Iroha Yokocho area, a few minutes from Aoba-dori Ichibancho station. Described as a relaxed room where you can enjoy a cigar over conversation with the owner.",
      note: ""
    },
    "miyagi|LE BAR KAWAGOE（ル バール カワゴエ）": {
      area: "Kokubuncho, Aoba-ku, Sendai (Kotodai Koen)",
      desc: "A serious authentic bar running from malt whiskies to cocktails, and serving cigars. Calm, with jazz playing. Selected for Tabelog's Hyakumeiten list (bars, 2022).",
      note: ""
    },
    "miyagi|L'essentiel Bar 国分町店（レサシエル・バール）": {
      area: "Kokubuncho, Aoba-ku, Sendai",
      desc: "A shot bar open since 2000, keeping several cigars in a humidor to enjoy alongside rare single malts and old bottles. A quiet street-level room just off Kokubuncho-dori.",
      note: "Has a sister bar in Ichibancho, opened 2021."
    },
    "miyagi|L'essentiel Bar 一番町店（レサシエル・バール）": {
      area: "Ichibancho, Aoba-ku, Sendai",
      desc: "Opened in 2021 as the sister to the Kokubuncho bar. A hinoki counter and proper cocktails made by the owner, with cigars always in stock.",
      note: "Same ownership as the Kokubuncho bar."
    },
    "miyagi|Bar HORIE（バー ホリエ）": {
      area: "Sendai (believed Aoba-ku — needs confirming)",
      desc: "Listed in the cigar-bar section of the cigar site Cigar Connection, where the owner is described as knowledgeable enough to change how you think about cigars. Also appears in the Miyagi cigar-bar address list.",
      note: "Little primary information on its location or trading status — needs confirming."
    },
    "miyagi|EL Fumador（エル フマドール）": {
      area: "Showacho, Aoba-ku, Sendai",
      desc: "A cigar bar on the second floor of a building in Showacho, run by the tobacconist below (believed to be Tabako Center Kawarada). Had a reputation for its stock and for how well the cigars were kept.",
      note: "Reported to have closed around 2017."
    },

    /* ---------- 秋田県 ---------- */
    "akita|AquaBar Linden（アクアバーリンデン）": {
      area: "Yuzawa (near Yuzawa station)",
      desc: "An authentic bar with what it says is Japan's first and Tohoku's only Nature Aquarium display. Run by an owner who trained in Ginza, serving proper cocktails, malt whisky and wine — and cigars. Smoking permitted, with a good list of non-alcoholic cocktails too.",
      note: "Listed by Suntory BAR-NAVI among bars with a good cigar selection. Tabelog and BAR-NAVI sometimes place it in Yokote rather than Yuzawa (it is close to Yuzawa station). The size of the cigar selection needs checking."
    },
    "akita|BAR LOG（バーログ）": {
      area: "Akita City (near Akita station)",
      desc: "A bar within walking distance of Akita station (about 286m). Casual in feel, with whisky, more than 100 original cocktails and food; it appears under Tabelog's 'cigar bar' keyword and in BAR-NAVI's cigar listings, and serves snacks chosen to go with a cigar.",
      note: "A casual bar with a table-tennis table, where cigars are one item on the menu. Whether the selection is serious (Habanos and the like) needs checking."
    },
    "akita|Dining Bar ISOLA（イゾラ）": {
      area: "Omachi / Kawabara, Akita City",
      desc: "A dining bar in Omachi (Kawabara), Akita City. Known for proper cocktails from an owner who trained in Ginza and for an open room overlooking the Kawabara night view; it was written up as a cigar bar.",
      note: "Now closed; the year could not be established. The closure is confirmed in cigar-bar closure lists and on local information sites."
    },

    /* ---------- 山形県 ---------- */
    "yamagata|東屋BAR（ヒガシヤバー / Higashiya Bar）": {
      area: "Kasumicho, Yamagata City (by Yamagata station)",
      desc: "An authentic bar on the second floor of a building in Kasumicho, about two minutes from the east exit of Yamagata station. More than 450 bottles including vintage single malts and old bottles, plus Havana cigars. Fresh-fruit cocktails as well — a calm room for grown-ups.",
      note: "Smoking permitted. Cigars confirmed on its own site, Tabelog and BAR-NAVI."
    },
    "yamagata|BAR ChiC（バー シック）": {
      area: "Honcho, Tsuruoka",
      desc: "A calm, black-toned shot bar in Honcho, Tsuruoka. Several hundred spirits and cocktails plus Havana cigars, so you can drink with the scent of a cigar. The chef cooks French and casual dishes, and there is live jazz roughly monthly.",
      note: "Smoking permitted throughout. Bills itself as DRINK & CIGAR. Cigars confirmed on Tabelog, BAR-NAVI and local listings."
    },
    "yamagata|シマクラ（Shimakura）": {
      area: "Negishi, Takahata, Higashiokitama District",
      desc: "A tobacconist in Takahata carrying a wide range beyond cigarettes: rolling tobacco (shag), pipe tobacco, cigars, little cigars and kizami. Also sells by mail order — one of the few bricks-and-mortar shops where cigars can be bought outside the cities.",
      note: "A shop, not a place to smoke. Closed Wednesdays and Thursdays. Whether it holds an official Habanos account needs checking."
    },

    /* ---------- 福島県 ---------- */
    "fukushima|シガーバー チャーチル (CIGAR bar CHURCHILL)": {
      area: "Nakamachi, Koriyama (by Koriyama station)",
      desc: "Koriyama's leading cigar bar. A walk-in humidor and cigars for sale, mainly Cuban Habanos, with cutters and cigar ashtrays provided. Calls itself a café and cigar bar, serving drinks and light food alongside. A calm room of about ten seats.",
      note: "Open 19:00–05:00, closed the 1st and 3rd Sundays. Current information on its own site, Tabelog and Hot Pepper."
    },
    "fukushima|BAR LIBRARY (バー ライブラリー)": {
      area: "Sakaemachi, Fukushima City (near the east exit of Fukushima station)",
      desc: "A grown-up hideaway where you take your shoes off and settle in with a book and a cigar. Cigars are served alongside cocktails and whisky, and smoking is permitted. About nine seats, and an owner who reads as much as the name suggests.",
      note: "Mon–Sat 19:00–02:00, closed Sundays. Current information on BAR-NAVI, Tabelog and its own site."
    },
    "fukushima|emu (エミュー) ワイン＆シガーバー": {
      area: "Jinbacho, Fukushima City",
      desc: "A wine and cigar bar in central Fukushima City, listed in national cigar-bar directories as a place to enjoy a cigar with wine.",
      note: "The sources are mainly cigar-bar address lists; current trading status and stock are unverified. Check before visiting."
    },
    "fukushima|L'Atelier Saran (ラトリエ・サラン)": {
      area: "Okitamacho, Fukushima City",
      desc: "A cigar bar said to be in Okitamacho, central Fukushima City. Appears in several cigar shop and bar address lists.",
      note: "The sources are directory listings that may be out of date, and current trading status is unverified. Check before visiting."
    },
    "fukushima|つたや（ワイン＆リカー つたや）": {
      area: "Nakamachi, Koriyama (near Koriyama station)",
      desc: "A liquor shop and tobacconist in Nakamachi, Koriyama, carrying a broad range of tobacco and accessories — rolling tobacco, pipes and cigars — and said to order in anything not held in stock.",
      note: "Listed on local business directories. The actual cigar selection needs checking."
    },
    "fukushima|大竹商店": {
      area: "Uchigo Tsuzuramachi, Iwaki",
      desc: "A tobacconist in Uchigo Tsuzuramachi, Iwaki. A neighbourhood shop belonging to the national Tobacco Shop Leaders Club (TLC), said to carry cigarettes and cigars. Open 07:00–18:00, closed Sundays and the 3rd Saturday.",
      note: "A general TLC-member tobacconist. Whether premium cigars are always in stock needs checking."
    },

    /* ---------- 茨城県 ---------- */
    "ibaraki|モンペリ いなりや（有限会社 稲荷屋）": {
      area: "Tagacho, Hitachi",
      desc: "Ibaraki's foremost tobacco and accessory specialist, holding more than 300 cigars, rolling tobaccos and pipe tobaccos at any time. Sells singles, mainly dry cigars and mini cigarillos, and will order in from catalogues what it does not hold. Open every day.",
      note: "Its site is kept up to date, confirming it is trading. The selection leans towards foreign tobacco and dry cigars rather than premium Habanos."
    },
    "ibaraki|Cigar & Cocktails TOSHIZO BAR（トシゾウバー）": {
      area: "Sakuramachi, Tsuchiura",
      desc: "A cigar and cocktail bar dealing mainly in Cuban cigars. It advertises a cigar manager trained in Cuba, and will walk newcomers through cutting, holding, smoking and etiquette. About 30 seats across counter and tables, tucked down a back street.",
      note: "Listed on its own site (Jimdo), Gurunavi and Tabelog."
    },
    "ibaraki|bar 虎蔵（TORAZO／バートラゾー）": {
      area: "Koga (near the west exit of Koga station)",
      desc: "An authentic bar a few minutes from the west exit of Koga station, written up as a bar with a good cigar offering to go with its whisky, tequila and cocktails. Quiet, with candlelight.",
      note: "Listed on Suntory BAR-NAVI and Gurunavi. Whether cigars are always in stock should be checked before visiting."
    },
    "ibaraki|BAR Fame（フェーム）": {
      area: "Katsuta (Kyoeicho), Hitachinaka",
      desc: "A cigar bar in the Katsuta area of Hitachinaka, listed in cigar-bar directories as a place to enjoy a cigar.",
      note: "Appears in various cigar-bar address lists. Mostly directory information — current trading and stock need checking."
    },
    "ibaraki|H's BAR（アッシェ・バー）": {
      area: "Sakaemachi, Mito",
      desc: "A bar in Sakaemachi, Mito, listed among Kanto cigar bars as carrying cigars.",
      note: "Mainly directory listings. Current trading status and cigar service need checking."
    },
    "ibaraki|Bar Bebop（ビバップ／旧 Bar 4cats）": {
      area: "Izumicho / Daikumachi, Mito",
      desc: "A whisky and cocktail bar in Mito's entertainment district. It was once written up as a cigar bar holding stock, and posted about buying cigars on Instagram, but recent reviews note that it no longer keeps them and suggest bringing your own.",
      note: "Whether cigars are stocked is uncertain. Check before visiting, including whether you may bring your own. Formerly Bar 4cats."
    }
  }
};
