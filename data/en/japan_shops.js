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
    tochigi: "Cigar culture in Tochigi is concentrated in the prefectural capital, Utsunomiya, built around the specialist shop Cigar House Lanceros with cigar bars — VAL'S BAR, Le Coeur, Chloe — scattered around it. In the north, the Kinugawa Kanaya Hotel has a cigar salon in the Nikko/Kinugawa Onsen hot-spring area, so you can smoke as part of a stay. In the south of the prefecture — Ashikaga, Sano, Oyama — no specialist shop or cigar bar could be confirmed from published sources (as of 2026-07-16).",
    gunma: "For buying cigars in Gunma, the anchor is Von Klaren in Takasaki, which has a walk-in humidor. On the bar side, venues carrying cigars are scattered around Takasaki (Bar Misty, Bar & Co.) and Maebashi (21house). Numbers are limited across the prefecture, and dedicated cigar bars tend to cluster in Takasaki.",
    saitama: "Places to enjoy a cigar cluster around Omiya (Omiya-ku, Saitama City), where several bars keep Cuban cigars — Hang O' Bar, BAR Feliz, THE BAR ALCAZAR. For buying, Tabako & ZIPPO Fujisawa in Omiya and Kyabinkan in Wako sell cigars. There are also bars carrying cigars in Minami-Urawa and Kawagoe, but published information on the north of the prefecture, such as Kumagaya, is thin and needs checking.",
    chiba: "Chiba has few cigar specialists; places to smoke are mostly bars. Torcedor in Ikspiari at Maihama, Dandylion in Chiba-Chuo, and authentic bars in Funabashi, Ichikawa and Kashiwa carry the load in practice. For buying, premium cigars can be had at tobacconists such as Kemutaiya in Yachiyodai and Tabakoya Mo~ri in Kashiwa.",
    tokyo: "Tokyo has the largest cigar scene in Japan, with specialist shops and cigar bars concentrated in Nishi-Azabu, Ginza, Yurakucho, Akasaka, Omotesando, Shibuya and Shinjuku. It holds the official Habanos venue COHIBA ATMOSPHERE, long-established specialists (Placer, founded 1951; Ginza Kikusui, 1903) and members' cigar bars. Aggregator sites list more than 200 bars in the city where cigars are permitted; this list is narrowed to the main venues whose existence and sources we could confirm.",
    kanagawa: "Cigar shops and bars concentrate in Yokohama — Kannai, Bashamichi, Yoshidamachi, Motomachi and Minato Mirai — and in Kawasaki. Long-established specialists with well-managed storage include Humidor Sugishima in Motomachi and Mishima Shoten in Kawasaki, and several serious cigar bars carrying Cuban cigars trade around Kannai. Stock and opening hours vary by venue, so checking before you go is advisable.",
    niigata: "What can be confirmed in Niigata from published sources is mainly the tobacco and accessory specialists in Chuo-ku, Niigata City (Taste Ekinan, Gabido) and a liquor shop in Minami-ku carrying Habanos (Inakazakaya Komeya). The leading cigar bar is Eikokuya in the Furumachi district, where other cigar-friendly bars such as Bar Σ can also be found. The cigar directory Hamaki Suitai lists six cigar bars in the prefecture; one in Sakanoue-cho, Nagaoka also appears but is shown as closed and its name could not be established, so it is left out here. Numbers are modest outside the cities, and what bars keep in stock — and whether you may bring your own — moves around, so check before visiting.",
    toyama: "The centre for buying cigars over the counter in Toyama is Hamakiyasan in Okuda-cho, Toyama City — a cigar and accessory specialist with a broad range from Havanas to premium and dry cigars from many countries, plus a café and cigar evenings. For smoking, the core venues are BAR Kinoshita in Toyama City (a counter bar with a serious cigar list) and Terry's (Havanas with mojitos); American Club West in Toyama and Takaoka Highball in Takaoka also appear in cigar-bar directories. What the bars keep in stock varies, so check before you go, including whether you may bring your own.",
    ishikawa: "Cigars in Ishikawa are concentrated in Kanazawa. For buying, the long-established tobacconist Hayashi in Katamachi; for smoking, the cigar bar Bottomless Uwabami in Oyama-cho and the dining bar HIDEOUT in Katamachi. Outside the city, Cigar Bar Sasabue inside the ryokan Kagaya at Wakura Onsen, Nanao, is one of very few resort cigar bars. Numbers are small overall, and much of the information on regional towns needs checking.",
    fukui: "Fukui has a small cigar market: essentially the only venue confirmable from published sources that both sells cigars and lets you smoke is Usui Tobacco Club in Fukui City. No dedicated cigar bar or lounge, and no authorised Habanos stockist, could be confirmed (as of 2026-07-16).",
    yamanashi: "Cigars in Yamanashi are concentrated in the prefectural capital, Kofu. For buying, the tobacconists Tabako-kan Hayakawa and Kasai Tobacco carry cigars; for smoking, we could confirm the bar lounge The Silk on the ground floor of the Konaya Hotel. In Fujiyoshida, Kawaguchiko and elsewhere, no specialist shop or cigar bar could be confirmed from published sources (as of 2026-07-16).",
    nagano: "What can be confirmed in Nagano from published sources centres on the long-established smoking-accessory specialist Iseya in Matsumoto and Nakayama Tobacco in Karuizawa; Melody Green in Ueda is a general tobacconist whose cigar stock needs checking. On the bar side, BAR GLORY in Nagano City (Cuban cigars) leads, with MAIN BAR COAT and BRORA in Matsumoto and LE BEL COEUR in Karuizawa (which has a cigar room) scattered across the prefecture. Dedicated cigar shops and bars are few outside the cities, and what bars keep in stock — and whether you may bring your own — moves around, so check before going. Note that Kemuji in Karuizawa is a smokehouse restaurant, nothing to do with cigars, and is excluded.",
    gifu: "In Gifu, the cigar bars we can confirm are SpeakEasy in Gifu City and PURPLE PLUS and KAMA·G in Takayama, in the Hida region. Buying centres on tobacconists in Gifu City (Art Shobo, Bevel and others); in the south-west of the prefecture, around Ogaki and Kakamigahara, no clear cigar bar could be confirmed from published sources (as of 2026-07-16). Numbers are lower than in the big metropolitan areas, and current trading should be checked venue by venue.",
    shizuoka: "Buying in Shizuoka centres on tobacconists in Shizuoka City, Hamamatsu, Numazu and Shimada (Yashima, Tabak Mochizuki, Sugiyama Tobacco, Kotobukiya Sugimoto, Care Label Shimada), several of which keep premium cigars in humidors. Dedicated cigar bars are very few — Ringokan in Kakegawa among them — with bars carrying cigars, such as Bar Savigny in Hamamatsu, scattered around. There are casual bars near Shizuoka station serving cigars and shisha, but their formal names could not be established from sources, so they are not listed here.",
    aichi: "Specialist shops and cigar bars concentrate in Nagoya — Sakae, Nishiki and Fushimi. The core is the long-established Cigar Club Kanou and Spirits, the pipe and cigar specialist Funahashi, Antoinette (successor to the old BON) and Climb Up, with bars carrying cigars scattered through the suburbs including Toyota. As metropolitan areas go, the scene here has real depth by national standards.",
    mie: "The centre for buying cigars in Mie is the specialist Tanaka Living in Yokkaichi, which carries more than 100 premium marques — the deepest in the prefecture. Among bars, Bar Range in Yokkaichi is known for its cigar list, and JO'S BAR in Tsu and ALCOHALL in Matsusaka also appear in listings as carrying cigars. No authorised Habanos venue (a Casa del Habano or similar) could be confirmed in the prefecture, and numbers are limited for both shops and bars.",
    shiga: "Shiga has very few cigar specialists or cigar bars. The reliable options for smoking or buying are Salon Bar Thistle in Hikone and Sakimura Shoten, a liquor and tobacco specialist in Kusatsu. The cigar-bar listing in Otsu appears only in directories and its current status needs checking.",
    kyoto: "Kyoto's cigar venues are concentrated in the city. They are led by Ten Hamakishitsu, a members-only Cuban cigar specialist, alongside Cigar Bar SUI in Gion, Itsuki's Bar in Nijo, Cordon Noir in Kiyamachi and the hotel bar BAR ANCHOR — a mix of specialists and bars carrying cigars. Overseas cigar sites also report a Habanos Specialist (authorised stockist) in the Gion area.",
    osaka: "After Tokyo, Osaka is the most competitive cigar city in Japan. Cigar bars and Habanos stockists concentrate in Kitashinchi, Umeda, Yodoyabashi and Shinsaibashi (Super Nova, Edmundo Dantes, Youen, Cigar Club), while large tobacconists carrying cigars sit out in the suburbs in Toyonaka and Takatsuki (Sirius Tabako, Sakaguchi Shoten). Hotel bars once served cigars too, though some — the Ritz-Carlton Osaka among them — have stopped. Venues attached to bars or inside commercial buildings change status over time, so check before you go.",
    hyogo: "Cigars in Hyogo are almost entirely concentrated in Kobe — Motomachi, Sannomiya and Kitano in Chuo-ku, and Rokkomichi in Nada-ku. The long-established specialist Sugimoto Shuhan ('The World of Cigars') in Motomachi carries the largest range in the prefecture and anchors the retail side. Around Sannomiya are bars carrying cigars: LAGUNA THE BAR, designed by Tadao Ando; GRAND BAR, with a Cuban list; PaPa Hemingway, run by the prefecture's first certified cigar adviser; and BAR ASHIBE. Authentic bars near Himeji station also appear on BAR-NAVI as carrying cigars, but no clearly named specialist or cigar bar could be identified there from published sources.",
    nara: "Nara does not have many cigar specialists or cigar bars, but Tobacco Center Komeda in Gose stands out as a serious cigar specialist with admirers abroad. Retail is scattered across Gose, Ikoma and Nara City; for smoking, the bar at the Nara Hotel is the main option. Regular stock of premium Habanos is concentrated at Komeda and the Nara Hotel, with the rest leaning towards cigarillos and little cigars.",
    wakayama: "Published sources show essentially no cigar specialist, and no cigar bar or lounge clearly holding an authorised Habanos account, in Wakayama (as of 2026-07-16). The authentic bar BAR DEN in Wakayama City is about the only venue written up as a place to enjoy a cigar, and enthusiasts appear to use the specialists and cigar bars in Osaka instead. Note that two names that come up in searches are not in Wakayama at all: Sekai no Tabako HAMAYA is in Sakai, Osaka (Kitanoda), and Tanabe Shoten is in Oita.",
    tottori: "Published sources show essentially no cigar specialist in Tottori, and no cigar bar stating an authorised Habanos account. In practice the options are a tobacconist in Yonago that carries cigars and a wine bar in Tottori City that serves them. No serious premium-led cigar bar or lounge could be confirmed as of 2026-07-16.",
    shimane: "Few venues in Shimane carry cigars. Nishiya, a liquor and tobacco specialist in Izumo, has a deep range including cigars and pipes, and Bar Negras in Matsue can be confirmed as a cigar bar serving rum and cigars. Outside those two cities, no specialist shop or cigar bar could be confirmed from published sources (as of 2026-07-16).",
    okayama: "Cigar bars where you can smoke are concentrated in central Okayama City (Kita-ku, along the Nishigawa Canal Park), led by the long-standing Paradis and CigarBar Kennedy, opened in 2022. On the retail side, the long-established tobacconist Tabakoya Shimizu in Kojima, Kurashiki, and the import shop Trend in Minami-ku, Okayama City, both keep premium cigars in humidors. No dedicated cigar bar could be confirmed in Kurashiki or the south of the prefecture from published sources (as of 2026-07-16).",
    hiroshima: "Cigar shops and bars in Hiroshima concentrate in the centre of the city (Naka-ku and Minami-ku). Among specialists, Tabako no Nakamichi Bunke has by far the deepest range in the prefecture, premium cigars included. Fukuyama also has a shop carrying cigars, though it leads with rolling tobacco. No La Casa del Habano (a Habanos-operated venue) could be confirmed in the prefecture.",
    yamaguchi: "Few cigar stockists could be confirmed from published sources. The long-established tobacconist Kawamura Shoten in Yamaguchi City sells cigars, and the cigar bar 'and cigarettes' in Chofu, Shimonoseki, offers somewhere to smoke. No venue stating an authorised Habanos account could be confirmed (as of 2026-07-16).",
    tokushima: "The only shop we could confirm as reliably selling cigars in Tokushima is Tokushima Tabaco Center in Kitajima, which keeps Cuban cigars in a humidor. The Akita-cho area of Tokushima City is known as a cluster of authentic bars and may well include venues carrying cigars, but as of 2026-07-16 no cigar bar or lounge could be pinned to a name from published sources. Ask each venue about cigars and whether you may bring your own.",
    kagawa: "Cigar-related venues in Kagawa are concentrated in Takamatsu. The cigar bar and shop Shinya Tantei-sha sits in the Kawaramachi entertainment district, and tobacconists on the Kobamacho and Kataharamachi shopping streets (Ota Tabako-ten, Okada Tabako-ten) carry cigars and accessories. No dedicated cigar lounge could be confirmed from published sources, so the options are limited.",
    ehime: "Ehime has very few cigar specialists or cigar bars: a bar carrying cigars in central Matsuyama (LE CLUB, in Okaido/Nibancho), the tobacco counter at Iyotetsu Takashimaya, and a long-established tobacconist in Shikokuchuo. No specialist clearly holding an authorised Habanos account could be confirmed, and outside Shikokuchuo and Matsuyama — in Imabari, Niihama, Uwajima and elsewhere — no cigar stockist or bar could be confirmed (as of 2026-07-16).",
    kochi: "In Kochi, no cigar specialist carrying premium cigars, and no bar or lounge dedicated primarily to cigars, could be confirmed from published sources (as of 2026-07-16). The only place we could confirm for actually enjoying a cigar is bar Ju-ka, an authentic whisky bar in central Kochi that keeps a small stock. We could not confirm premium cigars at any tobacconist in the city in this survey — that needs checking.",
    fukuoka: "Cigar shops and bars concentrate in Fukuoka City (Tenjin, Daimyo, Nishi-Nakasu and Haruyoshi in Chuo-ku, and Hakata-ku) and Kitakyushu (Kokura). Accessory specialists (AUN Smoke, Kitahara) sit alongside Cuban-led specialists and bars (CubanCigar, Bar HORIE and others), making this the deepest scene in Kyushu. The Nakasu and Kokura nightlife districts hold many bars carrying cigars, but for a good number it is unclear whether they are cigar bars proper, so this list keeps to the better-attested venues.",
    saga: "Few cigar-related venues in Saga can be confirmed from published sources. The centre is the bars around Chuo-Honmachi (near Saga station): SUIVIE, where cigars can be enjoyed, and Bar Puerto, which appears in cigar-bar listings. For buying, Hokao Sake Shop in Taku carries dry cigars and cigarillos. No premium (Habanos) cigar specialist could be confirmed (as of 2026-07-16).",
    nagasaki: "Cigar-led bars in Nagasaki concentrate in the Shianbashi district of the city, with CIGAR BAR Dio Dio the standout. Elsewhere, Bar Trois in Hamanomachi and Jigger Bar Nashville in Sasebo also serve cigars. No cigar specialist or retailer stating an authorised Habanos account could be confirmed from published sources (as of 2026-07-16).",
    kumamoto: "Places to enjoy a cigar concentrate in the entertainment districts of Chuo-ku, Kumamoto City — Hanabatake-cho, Ichou-dori, Shimotori — where authentic bars and cigar bars such as RICORDI, The Bar Amber, Whiskey CAT and CLARET carry cigars. No cigar specialist with an authorised Habanos account, and no department-store cigar counter, could be clearly confirmed from published sources, so buying generally means a tobacconist or one of these bars (as of 2026-07-16).",
    oita: "What can be confirmed in Oita centres on the bars of Miyakomachi and Chuomachi, the entertainment district near Oita station: BAR VISIONE, which puts cigars front and centre, plus Criadera and Bar CLANNAD. In Yufuin there is Bar Barolo, inside the ryokan Oyado Nihon no Ashitaba. No cigar specialist carrying premium (Habanos) cigars, and no permanent department-store counter, could be confirmed from published sources (as of 2026-07-16).",
    miyazaki: "Cigars in Miyazaki are concentrated in the centre of the city (around Miyazaki station and the Nishitachi entertainment district), and in practice everything runs through Cigar House, whose owner trained at the long-established Nomura Tobacco in Gotanda, Tokyo. The same owner reportedly sells cigars by day at Oda Tobacco Shop. No cigar specialist dealing in premium (Habanos) cigars, and no permanent department-store cigar counter, could be confirmed from published sources (as of 2026-07-16).",
    kagoshima: "No cigar specialist (an authorised Habanos retailer) could be confirmed in Kagoshima from published sources, and places to enjoy a cigar are limited to a handful of bars around the Tenmonkan entertainment district in Kagoshima City. Most lead with whisky or cocktails, and what cigars they keep varies by venue, so checking ahead is advised.",
    okinawa: "Cigars centre on Naha — particularly the Omoromachi and Shintoshin areas — where the specialist Kemuriya Okinawa, the cigar lounge Finca La Vigía Okinawa and Bar & Cafe 7C, the largest in the prefecture, all sit. There are also venues in Okinawa City (Hallelujah) and Chatan (THE VERONA). On the outer islands — Ishigaki, Miyako — no specialist or cigar bar could be confirmed from published sources (as of 2026-07-16).",
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

    /* ---------- 栃木県 ---------- */
    "tochigi|シガーハウス ランセロ（CIGAR HOUSE LANCEROS）": {
      area: "Higashi-Shukugo, Utsunomiya (Hotel Sunshine Utsunomiya, 1F)",
      desc: "A cigar specialist with a walk-in humidor. Staff including a JWA-certified cigar adviser keep around 60 marques at any time, mainly Cuban with Nicaraguan (Padrón and others) alongside. There is an attached pub, and you may smoke on the premises.",
      note: "The centre of Utsunomiya's cigar culture. Said to be connected with the cigar bar VAL'S BAR."
    },
    "tochigi|VAL'S BAR（ヴァルズ バー）": {
      area: "Futara-machi, Utsunomiya (by the Kamagawa river)",
      desc: "An unsigned hideaway cigar bar. The walk-in humidor holds mainly Cubans — Cohiba, Romeo, Punch, Montecristo, Bolívar — with Nicaraguan Padrón too. The owner knows the subject well and will suggest pairings with a drink.",
      note: "Said to be connected with Cigar House Lanceros."
    },
    "tochigi|Bar Le Coeur（バー ル・クール）": {
      area: "Motoimaizumi, Utsunomiya (about 10 min from the east exit of Utsunomiya station)",
      desc: "A bar in Utsunomiya carrying cigars — a grown-up room where you can have one with wine or a cocktail. Its site has a page devoted to cigars.",
      note: ""
    },
    "tochigi|BAR CHLOE（バー クロエ）": {
      area: "Central Utsunomiya",
      desc: "A cigar bar built on the idea that 'grown-ups take it quietly, lovers take it slowly'. Its site has a cigar page, and it announces new arrivals. Also open for lunch (galettes and curry).",
      note: "Posts cigar arrivals on Instagram and elsewhere, confirming it is trading. Closed Sundays."
    },
    "tochigi|鬼怒川金谷ホテル シガーサロン（KINUGAWA KANAYA HOTEL Cigar Salon）": {
      area: "Kinugawa Onsen, Nikko",
      desc: "A cigar salon that owes its existence to the cigar-loving hotel founder Zenjiro (John) Kanaya. Dominican and Nicaraguan premium cigars bought in from Davidoff Ginza — Davidoff, Griffin's, Camacho — covering beginners through to experienced smokers. Leather sofas, antique furniture and jazz.",
      note: "A fine lounge for hotel guests, and one of very few places outside Utsunomiya to enjoy a cigar."
    },

    /* ---------- 群馬県 ---------- */
    "gunma|Von Klaren 高崎店（フォンクラーレン）": {
      area: "Kaminakai-machi, Takasaki",
      desc: "A tobacconist dealing in rolling tobacco, pipes, cigars, cigarettes and Zippos. A glass-walled walk-in humidor keeps cigars in good condition. Opened as the Takasaki branch of the main shop in Gyoda, Saitama.",
      note: "Hours are given as roughly 11:00–21:00, closed Thursdays (worth confirming locally)."
    },
    "gunma|Bar Misty（バーミスティ）": {
      area: "Sunaga-cho, Takasaki (about 3 min from the west exit of Takasaki station)",
      desc: "An authentic bar with a single-malt-led list and cigars to go with it. A large U-shaped counter, jazz, and a grown-up room where the staff will happily recommend a cigar to a newcomer. Evenings into the small hours (18:00–04:00, reportedly closed Sundays).",
      note: ""
    },
    "gunma|Bar&Co.（バーカンパニー）": {
      area: "Ginza-dori, Takasaki (near Takasaki station)",
      desc: "An authentic bar on Ginza-dori near Takasaki station. Bills itself as 'Coffee & Cigar' and serves cigars with coffee. Also carries rare spirits and seasonal fresh-fruit cocktails, in a calm, counter-led room.",
      note: ""
    },
    "gunma|21house 前橋Bar": {
      area: "Jotomachi, Maebashi",
      desc: "A bar of more than 30 years' standing, with around 300 whiskies, 100 single malts, 60 brandies and a long list of original cocktails — and cigars. The depth of the list is the point.",
      note: ""
    },
    "gunma|シエンジロリン村 本店": {
      area: "Takabayashi-Kotobuki-cho, Ota",
      desc: "A tobacconist (with mail order) dealing in rolling tobacco, shag, Zippos, lighters and smoking accessories. Whether cigars are always in stock in the shop is not clear from published sources; the range appears to centre on rolling tobacco and accessories.",
      note: "Whether premium cigars are regularly stocked needs checking."
    },

    /* ---------- 埼玉県 ---------- */
    "saitama|ハングオーバー (hang O' Bar)": {
      area: "Omiya-ku, Saitama City (west exit of Omiya station)",
      desc: "A hideaway authentic bar five minutes from the west exit of Omiya station. Over 300 whiskies and cocktails, plus about 15 cigars kept in stock, and you may smoke on the premises. Bringing your own cigar is also allowed.",
      note: ""
    },
    "saitama|BAR Feliz (バー フェリーズ)": {
      area: "Omiya-ku, Saitama City (east exit of Omiya station)",
      desc: "A rum and cocktail bar two minutes from the east exit of Omiya station. Built around more than 300 rums from around the world, with whisky and port alongside, and around 70 Cuban cigars (Habanos) always in stock.",
      note: ""
    },
    "saitama|THE BAR ALCAZAR (ザ バー アルカサル)": {
      area: "Omiya-ku, Saitama City (east exit of Omiya station)",
      desc: "Open since 2012, three minutes from the east exit of Omiya station. Malt whisky and classic cocktails in a calm, antique-styled room, with Cuban cigars and smoking permitted indoors.",
      note: ""
    },
    "saitama|Bar Revelstoke (レベルストック) 南浦和店": {
      area: "Minami-ku, Saitama City (east exit of Minami-Urawa station)",
      desc: "A small authentic bar in a residential street, six minutes from the east exit of Minami-Urawa station. Over 300 malt whiskies and cocktails, with around ten Havana cigars in stock at any time (roughly ¥500–2,500).",
      note: ""
    },
    "saitama|BEER SAURUS TUSK (ビアザウルス タスク)": {
      area: "Sugawara-cho, Kawagoe (east exit of Kawagoe station)",
      desc: "An authentic bar styled as a cave, two minutes from the east exit of Kawagoe station. Fine spirits from around the world, rare whiskies and brandies and fresh-fruit cocktails — and, unusually for Kawagoe, cigars always in stock.",
      note: "Closed Mondays."
    },
    "saitama|タバコ&ZIPPO ふじさわ (DOMショッピングセンター店)": {
      area: "Sakuragicho, Omiya-ku, Saitama City (inside DOM, west exit of Omiya station)",
      desc: "A tobacco and accessory specialist on the second floor of the DOM shopping centre, a minute from the west exit of Omiya station. Around 250 Japanese and foreign cigarettes, plus cigars, pipes, rolling tobacco, Zippos and lighters.",
      note: "Primarily a shop; whether there is any smoking space needs checking."
    },
    "saitama|cigarettes & coffee きゃびん館": {
      area: "Shirako, Wako",
      desc: "A tobacconist and café of some 30 years' standing in Shirako, Wako. Around 280 cigarettes, plus about 80 dry cigars, 22 premium cigars and 50 pipe tobaccos — and you can have a smoke over a coffee or tea.",
      note: ""
    },
    "saitama|BAR 畠中 (バー はたなか)": {
      area: "Miyamachi, Kumagaya",
      desc: "Listed in cigar-bar directories as a cigar bar in Kumagaya; the former name is given as L'Ami du Vin St James. We could not independently confirm official information or current trading.",
      note: "Not independently confirmable on Tabelog, BAR-NAVI or elsewhere. Whether it is trading, and whether it carries cigars, both need checking."
    },

    /* ---------- 千葉県 ---------- */
    "chiba|トルセドール（Torcedor）": {
      area: "Maihama, Urayasu (Ikspiari 4F)",
      desc: "A British-styled cigar bar on the fourth floor of Ikspiari, outside JR Maihama station. Cigars are kept in a walk-in humidor, including Cuban Habanos, to enjoy with Japanese whisky and spirits from around the world. Food such as steak comes from the neighbouring restaurant. A calm, grown-up room.",
      note: "Part of the Create Restaurants group."
    },
    "chiba|ダンディライオン バー（DANDYLION BAR）": {
      area: "Chiba-Chuo (Fujimi), Chuo-ku, Chiba City",
      desc: "A calm authentic bar by Chiba-Chuo station, one door away from the noise. The owner buys rare whiskies through his own channels; there is a single-slab counter and leather sofa seating. Cigars may be smoked late (after midnight on weekdays).",
      note: "Cigars depend on the time of day — worth confirming."
    },
    "chiba|Bar 篠崎（Bar Shinozaki）": {
      area: "Honcho, Funabashi (by Keisei Funabashi station)",
      desc: "An authentic bar outside Keisei Funabashi station. More than 480 spirits and seasonal fresh-fruit cocktails are the signature. Carries Nicaraguan, Dominican and Cuban cigars, with a walk-in humidor, cutters and the rest.",
      note: "Registered on cigar maps as stocking both Cuban and non-Cuban."
    },
    "chiba|Bar Old Flame（オールドフレーム）": {
      area: "Ichikawa, Ichikawa City (south exit of Ichikawa station)",
      desc: "A hideaway bar about two minutes from the south exit of JR Ichikawa station. One of the few places in Ichikawa strong on cognac, with a collection of around 150. Cuban cigars are served too.",
      note: ""
    },
    "chiba|Bar Plat（バー プラット）": {
      area: "Kashiwa (Yamamoto Building 2F)",
      desc: "A bar near Kashiwa station with 19 seats (11 at the counter plus tables), and a genuine interest in cigars — it publishes cigar writing of its own. Cuban, Dominican and Nicaraguan cigars.",
      note: "Mon–Sat 19:00–02:00, Sun and holidays 17:00–24:00 (worth reconfirming)."
    },
    "chiba|けむたいや（ユアエルム八千代台店）": {
      area: "Yachiyodai, Yachiyo (Your Elm Yachiyodai, 1F)",
      desc: "A specialist in tobacco and smoking accessories from around the world, on the ground floor of Your Elm Yachiyodai. Around 350 cigarettes plus pipe tobacco, cigars, shag and snus, with lighters, cases and other accessories.",
      note: "A tenant in a shopping centre, so hours follow the centre's."
    },
    "chiba|たばこ屋も～り（もーり）": {
      area: "Kashiwa",
      desc: "A long-established tobacconist in Kashiwa with a serious range of pipe tobacco, cigars and rolling leaf. Everything from mini cigarillos to full premium cigars from well-known Cuban and Dominican houses.",
      note: ""
    },
    "chiba|杉山商店": {
      area: "Honcho, Funabashi",
      desc: "A tobacconist in Honcho, Funabashi, listed in cigar-shop address books as carrying cigars in Chiba. What it stocks and whether it is still trading could not be confirmed from published sources.",
      note: "Based on the cigar-shop address book at chankaz.net. Current status and stock need checking."
    },

    /* ---------- 東京都 ---------- */
    "tokyo|COHIBA ATMOSPHERE TOKYO（コイーバ・アトモスフィア東京）": {
      area: "Nishi-Azabu, Minato-ku",
      desc: "The official franchise of Habanos S.A., the Cuban cigar corporation — the only COHIBA ATMOSPHERE in Japan. As well as buying Habanos, you can smoke at the in-house bar over a drink or a meal. The concept is the four Cs: Cigar, Coffee, Chocolate, Champagne. Terrace seating and a VIP room.",
      note: "A related listing exists for COHIBA ATMOSPHERE Kasumicho; how the two relate, and their current status, need checking."
    },
    "tokyo|HABANA VEGAS（ハバナベガス）": {
      area: "Nishi-Azabu, Minato-ku",
      desc: "A members' cigar bar and shop opened in 2014. The owner travels to Cuba monthly to select the 150-plus cigars carried. The second floor is the members' bar; the ground floor is a casual standing cigar bar and shop. There is also a cigar bank (storage service).",
      note: "Members only, though non-members may reportedly visit accompanied by a member."
    },
    "tokyo|シガーバー シャドネィ（Cigar Bar Chardonnay）": {
      area: "Jingumae / Omotesando, Shibuya-ku",
      desc: "A long-standing cigar bar opened in Omotesando in 1997, carrying more than 150 cigars in a retro, unhurried room. A café by day (12:00–18:00) and a bar by night (18:00 until late); the dark-roast coffee is a popular match. There is a billiard table. Cigars may also be bought to take away.",
      note: ""
    },
    "tokyo|喫煙具専門店 kagaya 有楽町（カガヤ）": {
      area: "Yurakucho, Chiyoda-ku",
      desc: "A smoking-accessory and cigar specialist opened in 2021 and run by Fukashiro, on the B1 floor of the Tokyo Kotsu Kaikan outside JR Yurakucho station. Accessories are the focus, alongside cigars well regarded in Europe and the United States, its own coffee, spirits and vintage curios.",
      note: ""
    },
    "tokyo|銀座菊水（GINZA KIKUSUI）": {
      area: "Ginza, Chuo-ku",
      desc: "A pipe, tobacco and accessory specialist founded in 1903. Best known for pipes — around 1,200 in stock at any time, with a deep Dunhill selection — and carrying lighters, cigars and smoking goods broadly. Three minutes from exit A2 of Ginza station.",
      note: "Pipes and accessories are the mainstay; which cigars are carried needs checking."
    },
    "tokyo|世界のたばこ プラセール（Placer）": {
      area: "Akasaka (Akasaka-mitsuke), Minato-ku",
      desc: "A tobacco and accessory specialist founded in 1951, holding more than 600 premium and dry cigars from Cuba, the Dominican Republic, Honduras, Nicaragua and Costa Rica, all kept under proper conditions. Also cigarettes, pipe tobacco, rolling tobacco and snuff. A minute from Akasaka-mitsuke station.",
      note: ""
    },
    "tokyo|cigar club（シガークラブ／ウェスティンホテル東京）": {
      area: "Ebisu, Meguro-ku (Yebisu Garden Place)",
      desc: "A cigar shop inside the Westin Tokyo, selling imported Havana cigars under controlled temperature and humidity, with a space in-store for a cigar and a hard liquor. Open 11:00–20:00.",
      note: "States that it is an authorised stockist of Havana cigars."
    },
    "tokyo|cigar bar escape（シガーバー エスケープ）": {
      area: "Shinjuku-sanchome, Shinjuku-ku",
      desc: "A cigar bar three minutes from Shinjuku-sanchome station, stocking premium Cuban cigars — a hideaway lounge built around matching a cigar with a drink. Still trading and receiving Cuban stock as of the end of 2025.",
      note: ""
    },
    "tokyo|シガーバー R261 CIGAR & ROCK（セルリアンタワー東急ホテル）": {
      area: "Sakuragaoka (Shibuya), Shibuya-ku",
      desc: "A cigar bar on the second floor of the Cerulean Tower Tokyu Hotel, built on rock, repeat and rouge: red-toned lighting, a wall of records and speakers, and rock playing. Cigars and cocktails, 18 seats.",
      note: ""
    },
    "tokyo|BAR IRIE（バー アイリー）": {
      area: "Shibuya, Shibuya-ku",
      desc: "A grown-up cigar bar in Shibuya where cigars may be smoked, with cocktails and spirits in a calm room.",
      note: "Check the official site for the current selection and status."
    },

    /* ---------- 神奈川県 ---------- */
    "kanagawa|ヒュミドール スギシマ（Humidor Sugishima）": {
      area: "Motomachi, Naka-ku, Yokohama",
      desc: "A long-established tobacconist on Motomachi shopping street. As the name says, it has a walk-in humidor built of cedar, keeping premium cigars from around the world at controlled humidity. Around 1,200 lines across cigarettes, cigars, pipes and snuff, drawing enthusiasts from well beyond the prefecture.",
      note: "Around 3-115 Motomachi, Naka-ku, Yokohama. Reportedly closed Mondays."
    },
    "kanagawa|岸商店（岸たばこ店）": {
      area: "Nishi-ku, Yokohama (near Yokohama station)",
      desc: "A tobacconist near Yokohama station with a large humidor at the back of the shop, carrying cigars, dry cigars, rolling tobacco and pipes. Well looked after, so you can buy with confidence.",
      note: "Reportedly Mon–Sat 10:00–19:00, closed Sundays and holidays."
    },
    "kanagawa|黒川商店": {
      area: "Komaoka, Tsurumi-ku, Yokohama",
      desc: "A tobacco and cigar specialist in Tsurumi-ku, Yokohama, known for an enthusiast's range including cigars and cigarillos. Also sells online through its own site.",
      note: "Some way from a station; easier by car. Mail order available."
    },
    "kanagawa|世界のたばこ専門店 三島商店": {
      area: "Isago, Kawasaki-ku, Kawasaki",
      desc: "A serious tobacco specialist four minutes from the east exit of Kawasaki station, carrying more than 1,200 tobaccos from around the world including cigars, kizami and pipe tobacco. Stock is held at 18°C and 70% humidity.",
      note: "Mainly weekdays (reportedly closed weekends and holidays). Has featured on television."
    },
    "kanagawa|たばこ専門店ニコニコ屋": {
      area: "Kanazawa-Bunko, Kanazawa-ku, Yokohama",
      desc: "A tobacconist just outside the east exit of Kanazawa-Bunko station, with the range you would expect of a specialist: Japanese and foreign cigarettes, cigars, rolling tobacco, kizami, pipe tobacco and accessories.",
      note: "Information exists on the Kanazawa-Bunko Suzuran-dori shopping street it sits on. Cigar stock needs checking."
    },
    "kanagawa|光煙（Kohien）": {
      area: "Kannai, Naka-ku, Yokohama",
      desc: "A specialist in Kannai, Yokohama, dealing in rolling tobacco, cigars and smoking accessories, with a broad range including glass pipes.",
      note: "Products listed on its site (kohien.com). Detailed stock needs checking."
    },
    "kanagawa|Bar Super Nova（バー・スーパーノヴァ）": {
      area: "Kannai / Bashamichi, Naka-ku, Yokohama",
      desc: "A proper cigar bar pairing cigars with cocktails made from its own infused spirits. Around 20 cigars in stock at any time, mainly Cuban premiums, in a calm room that smells of cigars. A few minutes from Kannai or Bashamichi stations.",
      note: "Reportedly a ¥300 table charge."
    },
    "kanagawa|Grand Noble（グラン ノーブル）": {
      area: "Yoshidamachi / Kannai, Naka-ku, Yokohama",
      desc: "A serious authentic bar in Yoshidamachi, between Kannai and Bashamichi. Cuban and Dominican cigars, with a deep list of whisky, brandy and rum. A heavy black-and-white interior that non-smokers can enjoy too. Opened 2017.",
      note: "Part of the Bar Noble group (operated by Grand Noble Inc.)."
    },
    "kanagawa|シガーバー リスト（Cigar Bar List）": {
      area: "Isago, Kawasaki-ku, Kawasaki",
      desc: "A hideaway cigar bar near Kawasaki station keeping more than 70 cigars at all times. Up to 14 seats and four extractor fans, so the smoke never hangs. Around 260 whiskies, 210 brandies and 90 rums as well.",
      note: "Normally 18:30–01:00."
    },
    "kanagawa|横浜ベイホテル東急 バー「ジャックス」（Jacks）": {
      area: "Minato Mirai, Nishi-ku, Yokohama",
      desc: "A properly British bar on the second floor of the Yokohama Bay Hotel Tokyu. Authentic in style but with a real cigar selection, and smoking is permitted indoors. Original cocktails from a well-known bartender and some aged bottles. About a minute from Minatomirai station.",
      note: "Open 16:00–24:00. Live music on Fridays and Saturdays."
    },

    /* ---------- 新潟県 ---------- */
    "niigata|煙草・喫煙具専門店 テイスト駅南（Taste 駅南）": {
      area: "South exit of Niigata station, Chuo-ku, Niigata City (Keyaki-dori)",
      desc: "A tobacco and accessory specialist on Keyaki-dori, a few minutes from the south exit of Niigata station. A wall of 450–500 lines — foreign cigarettes, rolling tobacco, pipe tobacco, cigars — plus cutters, ashtrays and other accessories. Written up as one of the deepest ranges in the prefecture.",
      note: "Listed on local and tourism information sites. More a general tobacco and accessory specialist than a premium (Habanos) house. Check current stock before visiting."
    },
    "niigata|雅美堂（がびどう／有限会社雅美堂）": {
      area: "Kamitokoro, Chuo-ku, Niigata City",
      desc: "A tobacconist in Kamitokoro, Chuo-ku, Niigata City. Alongside Japanese cigarettes it carries foreign cigarettes, rolling tobacco and cigars, with premium cigars said to be kept in a humidified case. A neighbourhood shop within walking distance of Hakusan station.",
      note: "Listed on Yahoo! Maps, Ekiten and local directories. Check cigar stock before visiting."
    },
    "niigata|田舎酒屋こめや（田舎酒屋こめや）": {
      area: "Ibarasone, Minami-ku, Niigata City",
      desc: "A liquor shop in Ibarasone, Minami-ku, selling tobacco, cigars and pipes in its shop. Its site and blog post arrivals of Cuban Habanos such as Cohiba and Montecristo, making it one of very few places in the prefecture to find them. Arrivals are announced online too.",
      note: "Its site (inakazakaya.jp) and blog are kept up to date, confirming it is trading. A suburban location in Minami-ku, away from the centre."
    },
    "niigata|シガーバー英國屋（Cigar Bar 英国屋／えいこくや）": {
      area: "Furumachi (Furumachi-dori 8), Chuo-ku, Niigata City",
      desc: "Niigata's leading cigar bar, down an alley off Furumachi-dori 8. Single malts and cigars, with a veteran owner who welcomes solo visitors. A small room of counter and tables, and a considerable local reputation.",
      note: "Listed on Tabelog, Retty, the Niigata restaurant guide, Yahoo! Loco and TripAdvisor; trading confirmed. Sources differ on whether the address is block 8 or 9."
    },
    "niigata|Bar Σ（バー シグマ）": {
      area: "Furumachi (Hakusan), Chuo-ku, Niigata City",
      desc: "An authentic bar in Furumachi (Hakusan), Chuo-ku. Whisky and cocktails led, with an owner known as a Taketsuru ambassador. Listed in Suntory BAR-NAVI's Niigata roundup of bars with a good cigar selection.",
      note: "Moved to its present site in 2021 from its predecessor cocktail bar. Cigars are not the main event; check stock and whether you may bring your own before visiting."
    },

    /* ---------- 富山県 ---------- */
    "toyama|はまきやさん（Cafe/Shop Hamakiyasan／本店）": {
      area: "Okuda-cho, Toyama City (north side of Toyama station)",
      desc: "One of the Hokuriku region's foremost cigar and accessory specialists, run out of a trailer home near the Okuda-cho crossing north of Toyama station. Dry cigars from around the world plus premium cigars from the Philippines, the Dominican Republic, Costa Rica, Nicaragua and Cuba, with a deep range of rolling tobacco, pipes, leaf and imported cigarettes. Coffee and a cigar on the terrace, and the owner runs cigar evenings.",
      note: "Its site (hamaki.net), online store and owner's blog are all kept up to date, and it appears on Tabelog as 'Cafe Hamakiyasan'. The central place to buy cigars over the counter in Toyama. Closed Wednesdays."
    },
    "toyama|BAR 木下（BAR Kinoshita）": {
      area: "Uchisaiwai-cho, Toyama City (Funsui Yokocho, near Shintomicho tram stop)",
      desc: "A counter-led authentic bar at the entrance to Funsui Yokocho. A serious cigar selection alongside scotch and spirits; reviewers single out the cigars, the whisky and the owner. About two minutes from Shintomicho.",
      note: "Listed on its Instagram (@bar_kinoshita), Tabelog and Gurunavi, and in the Chubu cigar-bar list."
    },
    "toyama|テリーズ（TERRYS／Terry's Bar）": {
      area: "Sakuramachi, Toyama City (near Shintomicho)",
      desc: "An authentic bar on the second floor of the Kosugi Building in Sakuramachi, carrying well-kept Havana cigars and known for pairing them with its own mojito. Counter-led and calm. Closed Sundays.",
      note: "Listed on Tabelog, Gurunavi and Retty; a Tabelog review from January 2025 confirms it is trading. Check cigar stock before visiting."
    },
    "toyama|アメリカン クラブ ウエスト（American Club West）": {
      area: "Imaki-cho, Toyama City (near Sakurabashi tram stop)",
      desc: "A large dining bar themed on a Prohibition-era American saloon, with plenty of seating. Listed in cigar-bar directories as carrying cigars. Lively, and used for parties.",
      note: "Existence and trading confirmed via Tabelog, Gurunavi and the prefectural hospitality association. That cigars are always stocked rests mainly on directory listings, so check before visiting."
    },
    "toyama|高岡ハイボール（TAKAOKA HIGHBALL）": {
      area: "Suehiro-cho, Takaoka (near Takaoka station)",
      desc: "A bar in Suehiro-cho near Takaoka station, listed in the Chubu cigar-bar list as carrying cigars. A highball and cocktail bar in the entertainment district.",
      note: "Mainly directory listings; we could not independently confirm that cigars are regularly stocked. Ask before visiting."
    },

    /* ---------- 石川県 ---------- */
    "ishikawa|世界のたばこ ハヤシ（Sekai no Tabako Hayashi）": {
      area: "Katamachi, Kanazawa (Katamachi shopping street)",
      desc: "A tobacconist founded in 1930, holding around 700 lines available in Japan at any time: some 300 cigarettes, 280 cigars, pipe tobacco and rolling tobacco. One of very few bricks-and-mortar shops in central Kanazawa where cigars can be bought.",
      note: "A shop, for buying. Whether there is any smoking space needs checking."
    },
    "ishikawa|CIGAR BAR ボトムレス蟒（Botomuresu Uwabami）": {
      area: "Oyama-cho, Kanazawa (Oyama Building 1F)",
      desc: "A dedicated cigar bar down an alley in Oyama-cho, dealing mainly in hand-rolled cigars and taking ageing seriously. The range runs from casual to hand-rolled premiums at around ¥1,200. Open from 18:00 until late; closing days vary.",
      note: "Instagram and Facebook are kept up to date. Hours and closing days are irregular, so check before visiting."
    },
    "ishikawa|Cigar Bar 笹笛（和倉温泉 加賀屋）": {
      area: "Wakura Onsen, Nanao (Kagaya main building, 1F)",
      desc: "A cigar bar inside the long-established ryokan Kagaya, stocking mainly Cuban cigars with knowledgeable staff on hand. Brandy, whisky, wine and cocktails to go with them. Cigarettes are also permitted.",
      note: "A facility within the ryokan, so mainly for guests. Recently refurbished and reopened."
    },
    "ishikawa|DINING BAR HIDEOUT（ハイドアウト）": {
      area: "Katamachi, Kanazawa",
      desc: "A hideaway dining bar in Katamachi. Spirits from around the world and cheese dishes, plus around ten serious Cuban cigars such as Partagás Shorts. A cigar specialist on the staff guides newcomers, and you may bring your own or take one away.",
      note: "Tabelog shows the old address as relocated; now trading at Katamachi 2-3-7."
    },

    /* ---------- 福井県 ---------- */
    "fukui|CIGAR&CAFE 臼井煙草倶楽部（Usui Tobacco Club）": {
      area: "Junka, Fukui City (Katamachi / Gofukumachi area)",
      desc: "A cigar shop and café created in 2005 out of a long-established tobacconist. Cigars are sold as singles beside the till, and there is a counter and tables where you can smoke over freshly ground coffee. The owner will talk newcomers through each marque. Non-smokers are welcome, and breakfast and lunch are served.",
      note: "A Tabelog review from February 2026 confirms it is trading. One of very few places in Fukui where you can both buy a cigar and smoke it on the spot."
    },

    /* ---------- 山梨県 ---------- */
    "yamanashi|The Silk（ザ シルク）": {
      area: "Chuo, Kofu (Konaya Hotel 1F)",
      desc: "A bar lounge on the ground floor of the Konaya Hotel near Kofu station. A calm, high-ceilinged room looking onto a garden with a waterfall; a café by day and a bar by night. Cigars are on the menu, to enjoy with a cocktail.",
      note: "Formerly written up as 'Cigar Bar SILK'; reportedly it has shifted more towards a café and bar lounge in recent years. Check on cigars before visiting."
    },
    "yamanashi|煙草館はやかわ（Tabako-kan Hayakawa）": {
      area: "Kofu",
      desc: "A tobacco and accessory specialist run by an owner qualified as a smoking-accessory adviser. Rolling tobacco, pipe tobacco and foreign cigarettes alongside cigars and accessories, with advice given especially on rolling tobacco.",
      note: "Which cigars are regularly stocked needs checking."
    },
    "yamanashi|河西たばこ店（河西タバコ店 / Kasai Tobacco）": {
      area: "North exit of Kofu station, Kofu (about 3 min on foot)",
      desc: "A tobacconist near the north exit of Kofu station, reckoned to have one of the better selections of rolling tobacco, pipe tobacco and cigars in Yamanashi. Various shags, cigars and pipes, and will order in.",
      note: "Check cigar stock before visiting."
    },

    /* ---------- 長野県 ---------- */
    "nagano|いせや（ISEYA）": {
      area: "Chuo, Matsumoto (by the Oshiro-guchi / east exit of Matsumoto station)",
      desc: "A long-established tobacco and accessory specialist a few minutes from the Oshiro-guchi exit, marked by a long pipe on its sign. A broad range of rolling tobacco, pipes, pipe tobacco, cigars, kiseru and heated tobacco, and one of very few accessory specialists in the prefecture; newcomers are welcome.",
      note: "Listed by the national Tobacco Shop Leaders Club (TLC) and in accessory-wholesaler stockist information. Check current cigar stock before visiting."
    },
    "nagano|中山タバコ店（Nakayama Tobacco）": {
      area: "Karuizawa-Higashi, Karuizawa, Kitasaku District (by the Shinonome crossing, walkable from the north exit of Karuizawa station)",
      desc: "A tobacco and accessory retailer near the Shinonome crossing in Karuizawa. As well as cigarettes it carries a good number of cigars and pipe tobaccos, and says it can sometimes order in marques not on its list. A long-standing local shop with a product list on its site.",
      note: "Listed on its own site, iTownpage and Yahoo! Loco. Closed Tuesdays. A general tobacconist rather than a premium-cigar house; check stock before visiting."
    },
    "nagano|メロディーグリーン（Melody Green）": {
      area: "Unnomachi shopping street (Chuo), Ueda",
      desc: "An unusual shop on Unnomachi shopping street selling tobacco, music and vintage clothing. It claims one of the better tobacco selections in Ueda and is described as carrying rolling tobacco. Listed on local and shopping-street sites.",
      note: "Described as a general tobacconist; whether premium cigars are regularly stocked could not be established from published sources and needs checking."
    },
    "nagano|BAR GLORY NAGANO（バー グローリー ナガノ）": {
      area: "Minami-Nagano (Kita-Ishido-cho, near Nagano station), Nagano City",
      desc: "An authentic bar in Nagano City descending from a well-known Yokohama house. Cocktails from an experienced bartender, plus Cuban cigars from light to heavy — written up as the city's leading venue for pairing a drink with a cigar.",
      note: "Listed on Tabelog, Hot Pepper, Gurunavi and its own Instagram; trading confirmed. Closed Sundays."
    },
    "nagano|MAIN BAR COAT（メインバー コート）": {
      area: "Chuo, Matsumoto (central Matsumoto, near the station)",
      desc: "A serious authentic bar opened in 1998 on the first floor of a storehouse-style building: an eight-metre single-slab counter, British antique chairs, around 700 whiskies led by single malts and more than 500 spirits. Also appears in cigar-bar lists as a venue carrying cigars.",
      note: "Listed on its own site, Suntory BAR-NAVI and Tabelog; trading confirmed. Cigars are not the main event, so check stock and whether you may bring your own."
    },
    "nagano|BRORA（ブローラ）": {
      area: "Chuo, Matsumoto (central Matsumoto, near the station)",
      desc: "An authentic bar in Matsumoto's drinking quarter, strong on gin and whisky, with a long single-slab counter and a polished bartender. Listed in the Chubu cigar-bar list as a bar where cigars can be enjoyed.",
      note: "Listed on Tabelog, Retty and Suntory BAR-NAVI; trading confirmed. Check cigar stock and whether you may bring your own."
    },
    "nagano|LE BEL COEUR KARUIZAWA（ル・ベル・クール軽井沢）": {
      area: "Roppontsuji, Karuizawa, Kitasaku District",
      desc: "A French restaurant at Roppontsuji in Karuizawa with an attached cigar room — a grown-up space for a cigar after dinner. Listed on cigar directories as a cigar-friendly spot in Karuizawa.",
      note: "Listed on its own site and on cigar-bar directories. Principally a restaurant with a cigar room attached; confirm what is offered when booking."
    },
    "nagano|レストランバー リビアーモ（Restaurant Bar Libiamo）": {
      area: "By Nagano station (Zenkoji-guchi side), Nagano City",
      desc: "A restaurant bar that moved from Ueda to the area outside Nagano station. Wine, cocktails and whisky with food to match. Listed in Suntory BAR-NAVI's Nagano roundup of bars with a good cigar selection.",
      note: "Listed on Suntory BAR-NAVI (Nagano cigars) and Tabelog. Cigars are not the main event; check stock and whether you may bring your own."
    },
    "nagano|THE FUJIYA GOHONJIN（藤屋御本陳）": {
      area: "Daimon-cho, in front of Zenkoji temple, Nagano City",
      desc: "An Italian restaurant and bar in the former Gohonjin Fujiya ryokan, a registered tangible cultural property before Zenkoji. Sukiya-style architecture meeting Taisho romanticism and Art Deco, with a bar service too. Listed on cigar directories as a cigar-friendly spot in Nagano City.",
      note: "Its own site leads with the Italian food and bar, and regular cigar service could not be established from published sources — listed here on the strength of cigar-directory entries, and worth checking."
    },

    /* ---------- 岐阜県 ---------- */
    "gifu|SpeakEasy（スピークイージー）": {
      area: "Kanda-cho, Gifu City (near Yanagase)",
      desc: "A grown-up hideaway authentic bar with more than 600 malt whiskies, more than 600 wines and over 20 cigars. Jazz, a calm room, and a cigar to go with the whisky or wine. Small, counter-led.",
      note: "Closed Thursdays. From 18:30."
    },
    "gifu|世界のたばこ・アート書房（Sekaino Tabacco / Art Shobou）": {
      area: "Kiyomoto-cho, Gifu City",
      desc: "A tobacconist carrying more than 1,000 lines including accessories: rolling tobacco, cigarettes, little cigars, cigars and pipes from around the world, alongside books and coffee beans. Knowledgeable staff who will take time over a cigar beginner.",
      note: "A shop; whether there is any smoking space needs checking."
    },
    "gifu|ベベル タバコ店（Bevel）": {
      area: "Yanagase-dori, Gifu City",
      desc: "A tobacconist in the Yanagase area, said to carry cigars, rolling tobacco, accessories and e-cigarettes across a broad range.",
      note: "Confirmed from business-directory listings. The range and cigar stock need checking."
    },
    "gifu|PURPLE PLUS（パープルプラス）": {
      area: "Tenman-cho, Takayama",
      desc: "A small bar run by the owner of a pottery shop (Ota Chawanten), who knows his whisky, cigars and coffee. A wall of whisky bottles and a calm room of seven or eight counter seats. Cuban cigars for beginners are kept, and smoking is permitted.",
      note: "Small and counter-led."
    },
    "gifu|KAMA・G（カマジー）": {
      area: "Hanazato-cho, Takayama (near Takayama station)",
      desc: "An authentic shot bar where a single-slab wooden counter sets a calm tone. A cigar and a brandy, chosen in conversation with the owner — a place for a certain kind of dandyism. About ten minutes from Takayama station.",
      note: ""
    },

    /* ---------- 静岡県 ---------- */
    "shizuoka|浜松たばこセンター やしま（葉巻倶楽部 / Yashima）": {
      area: "Kajimachi, Chuo-ku, Hamamatsu",
      desc: "A long-established tobacconist dealing in tobacco and accessories from around the world, with a particular commitment to cigars. Several humidors hold premium cigars from Cuba, the Dominican Republic and Nicaragua. Also runs a mail-order site under the name Hamaki Club (yashima-hamaki.com).",
      note: "Some sources still give the old address in Naka-ku, Hamamatsu. Principally a shop."
    },
    "shizuoka|タバック モチヅキ（Tabak Mochizuki）": {
      area: "Matsutomi, Aoi-ku, Shizuoka City",
      desc: "A tobacconist with large humidor cabinets and a deep range of premium cigars. An unusually long list across rolling tobacco, cigars, pipes and dry cigars, with rare foreign tobaccos on display.",
      note: ""
    },
    "shizuoka|杉山たばこ店（Sugiyama Tobacco）": {
      area: "Nakayoshida, Suruga-ku, Shizuoka City (on National Route 1)",
      desc: "A tobacconist beside the Nakayoshida crossing on Route 1, carrying cigars, pipes, rolling tobacco and cigarettes, with premium cigars kept in a humidor. There is a corner for trying things.",
      note: ""
    },
    "shizuoka|寿屋杉本商店（ことぶきや / Kotobukiya Sugimoto）": {
      area: "Agetsuchi-cho, Numazu",
      desc: "A tobacco, lottery and liquor shop founded in 1949. Rolling tobacco and rare foreign cigarettes alongside cigars, with a dedicated cigar mail-order site. A Japanese-styled shopfront.",
      note: "Cigar mail order: kotobukiyanumazu.com. The range needs checking."
    },
    "shizuoka|cigar bar ケアレーベル島田店（Care Label Shimada）": {
      area: "Shimada",
      desc: "A cigar retail space and smoking room (with smoking allowed on the balcony) inside the CARELABEL Shimada hair salon. Cuban and other premium cigars, dry cigars, cigarillos, little cigars, kizami and shag, with a cigar concierge on hand.",
      note: "Inside a complex housing a hair salon, barber and children's room. The Fujieda barber is under the same ownership."
    },
    "shizuoka|Cigar Bar 林檎館（RINGOKAN）": {
      area: "Yanokuchi-cho, Kakegawa (near JR Kakegawa station)",
      desc: "A classical cigar bar furnished with antiques. A deep list of calvados and whisky, and cigars including Cubans. Also serves cocktails made with local fruit and dishes using herbs it grows itself.",
      note: ""
    },
    "shizuoka|Bar Savigny（バー サヴィニー）": {
      area: "Tamachi, Chuo-ku, Hamamatsu",
      desc: "A calm, grown-up authentic bar built on single malts, with standard cocktails, wine and cigars. A quiet room where the owner will explain what you are drinking.",
      note: "Some sources still give the old address in Naka-ku, Hamamatsu."
    },
    "shizuoka|シガーバー（静岡市葵区両替町・黒川ビル／店名未確認）": {
      area: "Ryogaemachi, Aoi-ku, Shizuoka City",
      desc: "Listed on cigar directories as a cigar bar in the Kurokawa Building in Ryogaemachi, central Shizuoka City, welcoming beginners and solo visitors. Its formal name and range could not be established from published sources.",
      note: "The formal name could not be confirmed from sources. Existence and details need checking."
    },

    /* ---------- 愛知県 ---------- */
    "aichi|シガークラブ加納（Cigar Club KANOU）": {
      area: "Sakae, Naka-ku, Nagoya",
      desc: "A cigar shop and bar founded in 1953, said to be the first in Nagoya to install a walk-in humidor. A deep range of premium cigars led by Cubans, plus heated tobacco and shisha. A café by day and a bar by night, for a cigar and a drink.",
      note: "Sakae 1-chome (Monte Charline 1F). Also runs events including live jazz."
    },
    "aichi|Bar Climb Up（バー クライムアップ）": {
      area: "Sakae, Naka-ku, Nagoya",
      desc: "A cigar bar in Sakae built around rum. A deep range of Cuban, Dominican and Nicaraguan cigars, more than 300 rums, mojitos and Cuban sandwiches. Newcomers are shown how to smoke and what the etiquette is.",
      note: "Mon–Sat 19:00–03:00, closed Sundays."
    },
    "aichi|CIGAR BAR SPIRITS（シガーバー スピリッツ）": {
      area: "Sakae, Naka-ku, Nagoya",
      desc: "A bar for cigar enthusiasts on the 7th floor of the Eau de Vie Sakae building, next to the Princess Garden Hotel. Appears to be related to the tobacconist Spirits on the ground floor of the same building; open late.",
      note: "21:00–05:00, closing days vary. The name is written inconsistently across sources; details need checking."
    },
    "aichi|Wine&Cigar Amphi（ワイン アンド シガー アンフィー）": {
      area: "Nishiki 3, Naka-ku, Nagoya",
      desc: "A bar in the Nishiki 3 area for cigars with wine. It opens relatively early, at 16:00, so it works either side of dinner.",
      note: "Nishiki 3-chome (Daiyon Nishiki Building 2F). Mon–Sat 16:00–01:00, closed Sundays and holidays."
    },
    "aichi|BAR URBAN COWBOY（バー アーバンカウボーイ）": {
      area: "Higashi-Sakura, Higashi-ku, Nagoya",
      desc: "A warm, wood-lined cigar bar that is easy to walk into as a beginner. The cigar list changes daily, and first-timers are talked through it carefully.",
      note: "Higashi-Sakura 2-chome (Ochiai Building B1F). Closed Sundays."
    },
    "aichi|Bar Ankh（バー アンク）": {
      area: "Motoshiro-cho, Toyota",
      desc: "An authentic bar about seven minutes from Toyota-shi station. Rare whiskies led by single malts and seasonal cocktails, with Cuban and other cigars. Calm, and comfortable for a solo visit.",
      note: "18:00–03:00, closed Mondays."
    },
    "aichi|エストマーレ（Estomare）／名古屋マリオットアソシアホテル": {
      area: "Nagoya station, Nakamura-ku, Nagoya",
      desc: "The main bar on the 15th floor of the Nagoya Marriott Associa Hotel, directly above Nagoya station. A calm, well-made room; visitors report that cigars are available alongside the spirits and cocktails.",
      note: "Check with the hotel on whether cigars are regularly carried, and which."
    },
    "aichi|Antoinette Cigar Café（アントワネット シガーカフェ）": {
      area: "Kita-ku, Nagoya",
      desc: "A cigar specialist carrying around 300 lines, from Cuban premiums to dry cigars and cigarillos, kept at controlled temperature and humidity in a walk-in humidor, with a café attached. The former cigar specialist BON, relocated and reopened with the café.",
      note: "Successor to BON. Known for charcoal-roasted coffee from Kobe and classical and operatic music."
    },
    "aichi|世界の銘酒&たばこ専門店 スピリッツ（本店）": {
      area: "Sakae, Naka-ku, Nagoya",
      desc: "A liquor and tobacco specialist in Sakae 3-chome. Premium cigars kept in humidors, plus dry cigars, cigarillos, pipes, shag and shisha. A deep spirits list too, gin and rum included. There is also a Hirokoji-Fushimi branch.",
      note: "Main shop (Sakae 3-13-6) 12:00–21:00, closed Sundays. The Hirokoji-Fushimi branch is in Sakae 2-chome."
    },
    "aichi|スモーキングショップ フナハシ（有限会社フナハシ）": {
      area: "Kikui, Nishi-ku, Nagoya",
      desc: "A pipe and cigar specialist known well beyond the region, with more than 50 cigars from various countries displayed in a large humidor, plus pipes, accessories and lighters.",
      note: "Kikui 1-chome. 08:00–18:00, closed Sundays (except the first three days of January)."
    },
    "aichi|丸已商会（まるみしょうかい）": {
      area: "Mizuho-ku, Nagoya",
      desc: "A tobacco and accessory specialist founded in 1955, dealing in rolling tobacco, pipe leaf, cigars and portable ashtrays. Cigars are held in a dedicated humidor at controlled temperature and humidity, with only samples on display and stock brought out on request.",
      note: "Shinkai-cho. Closed Thursdays and the second Sunday. Also gives instruction on pipe smoking."
    },
    "aichi|橘屋（たちばなや）": {
      area: "Ama",
      desc: "Founded in 1924 and relaunched in 1997 as a wine and tobacco specialist. Rolling tobacco leads, with cigars, cigarillos, little cigars, pipe leaf and kiseru leaf alongside. The range runs to unusual things, and customers come from Nagoya and Mie.",
      note: "Confirming stock in advance is advised. There is a smoking area at the shop."
    },

    /* ---------- 三重県 ---------- */
    "mie|田中リビング（Tanaka Living）": {
      area: "Aoba-cho, Yokkaichi",
      desc: "A tobacconist with one of the largest selections in the Tokai region: around 115 premium cigars kept in humidors, 44 dry cigars and 18 little cigars — more than 170 cigar lines in stock at any time. A full range of humidors, cutters and lighters too, and an owner qualified as a smoking-accessory adviser. Mail order available.",
      note: "Walkable from Ise-Matsumoto station on the Kintetsu Yunoyama line. The central place to actually buy cigars in Mie."
    },
    "mie|Bar Range（バー レンジ）": {
      area: "Nishiura, Yokkaichi (near Kintetsu Yokkaichi station)",
      desc: "An authentic bar billing itself as having the largest cigar list in Yokkaichi. Box seating, and cigars for sale. Roughly 20:00–24:00 (to around 02:00 on Fridays and Saturdays), closed Tuesdays. About five minutes from Kintetsu Yokkaichi station.",
      note: "Well known locally as the place in Yokkaichi to enjoy a cigar."
    },
    "mie|JO'S BAR（ジョーズ バー）": {
      area: "Hadokoro-cho, Tsu (east exit of Tsu station)",
      desc: "A shot bar about two minutes from the east exit of Tsu station. A deep list of scotch, whisky, bourbon and cocktails, with guitars and curios hung from the ceiling. Listed in cigar-bar directories as carrying cigars. 19:00–02:00, open daily.",
      note: "The cigar listing rests on a somewhat dated source (a cigar-bar list), so ask about cigars before visiting. The bar itself appears to be trading."
    },
    "mie|ALCOHALL（アルコホール）": {
      area: "Ekibeta-cho, Matsusaka",
      desc: "A dining bar in Matsusaka with a long row of bottles behind the counter and table seating for groups. Listed in cigar-bar directories as carrying cigars.",
      note: "The listing is somewhat dated and we could not confirm that it is still trading or still carries cigars — worth checking."
    },

    /* ---------- 滋賀県 ---------- */
    "shiga|Salon Bar Thistle（サロンバー・シスル）": {
      area: "West exit of Hikone station, Hikone (Hotel Sunroute Hikone 1F)",
      desc: "A cigar bar inside the Hotel Sunroute Hikone, about three minutes from the west exit of Hikone station. Cigars alongside whisky and other spirits and original cocktails themed on local warlords; the staff explain how to choose and handle a cigar, so it is easy as a beginner. Known as one of very few places in Shiga to take your time over a cigar and a drink.",
      note: "Named after the thistle, Scotland's national flower. Serves lunch, but the bar trades year-round."
    },
    "shiga|Liquor & Cigar SAKIMURA（崎村商店）": {
      area: "Kusatsu (on National Route 1)",
      desc: "A liquor and tobacco specialist on Route 1, with a broad range of cigars from around the world, rolling tobacco and regional cigarettes. Also sells its own Kusatsu-brand sake and wine. Cigars can be bought in the shop or through its online store.",
      note: "A member of the national Tobacco Shop Leaders Club (TLC). Roughly 10:00–20:00, closed Wednesdays (subject to change — worth checking)."
    },
    "shiga|シガーバー オヤジ（Cigar Bar oyaji）": {
      area: "Ogaya, Otsu",
      desc: "A cigar bar said to be in the Ogaya area of Otsu, listed in cigar-bar directories as a bar carrying cigars. Little is published about its range or atmosphere.",
      note: "No official site or current trading information could be found; directory listings only, so its status needs checking."
    },

    /* ---------- 京都府 ---------- */
    "kyoto|点 葉巻室（Ten / 点 喫茶室 葉巻部）": {
      area: "Jingu-Marutamachi, Kamigyo-ku, Kyoto",
      desc: "A Cuban cigar specialist where cigars are enjoyed with coffee or tea, in a calm space divided into a tearoom and a cigar room. Membership is by introduction from an existing member as a rule — a grown-up hideaway in the Kyoto Imperial Palace and Nishijin area.",
      note: "Members only (by introduction). Roughly 13:00–21:00."
    },
    "kyoto|シガーバー SUI（粋 / Cigar Bar SUI Gion）": {
      area: "Gion, Higashiyama-ku, Kyoto",
      desc: "A cigar bar opened in Gion in autumn 2022, attached to the kappo restaurant Sui. Carefully chosen cigars including Habanos, with fine sake, wine and champagne, in a room with the feel of the old capital. Since a refit in January 2026 the ground floor is a non-smoking bar and the first floor the cigar bar.",
      note: "A shop reported to be a Habanos Specialist (authorised stockist) also exists in Gion; SUI carries Habanos too."
    },
    "kyoto|樹sBAR（ITSUKI's Bar）": {
      area: "Nijojo-mae / Nijo station, Nakagyo-ku, Kyoto",
      desc: "An authentic bar for a cigar, right by Nijo station and Nijojo-mae. Carries Sancho Panza, José L. Piedra, VegaFina and others, to enjoy with whisky, beer or a cocktail. Over 14 years in the neighbourhood.",
      note: ""
    },
    "kyoto|Bar Cordon Noir（バー コルドンノワール）": {
      area: "Kiyamachi / Pontocho (Sanjo), Nakagyo-ku, Kyoto",
      desc: "A whisky bar between Pontocho and Kiyamachi with more than 1,000 bottles, and Cuban cigars. A grown-up room built around whisky. Roughly 19:00–03:00, closed Wednesdays.",
      note: ""
    },
    "kyoto|BAR ANCHOR（バー アンカー）": {
      area: "Shijo-Karasuma, Shimogyo-ku, Kyoto (Karasuma Kyoto Hotel)",
      desc: "The Karasuma Kyoto Hotel's own authentic bar, with a strong list led by single malts, and cigars. A calm, grown-up room a minute from Shijo or Karasuma stations.",
      note: ""
    },
    "kyoto|angelini（アンジェリーニ）": {
      area: "Gion-Shijo, Higashiyama-ku, Kyoto",
      desc: "A bar in the Gion-Shijo area written up as a cigar bar where smoking is permitted. Appears in various bar lists as a place to enjoy a cigar. Little else is published about its range or atmosphere.",
      note: "Published information is thin; current trading and what cigars are carried both need checking."
    },

    /* ---------- 大阪府 ---------- */
    "osaka|シガーネスト（Cigar Nest）": {
      area: "Dotonbori, Chuo-ku, Osaka (Minami)",
      desc: "A cigar bar and cigar café in the Soemoncho area by Dotonbori. Open from early afternoon — a hideaway for taking your time over a cigar with coffee, a cocktail or a rum. Opened December 2020.",
      note: "Cigarettes are permitted but cigars come first. Closed Tuesdays (hours and closing days can change — worth checking)."
    },
    "osaka|シガーバー スーペルノーバ 北新地店（Cigar Bar Super Nova Kitashinchi）": {
      area: "Kitashinchi, Kita-ku, Osaka",
      desc: "One of western Japan's leading cigar bars, keeping around 100 Cuban marques — more than 2,000 cigars — in what is said to be the largest custom humidor in the region. A cigar manager will pick one to your taste, and there are Cuban cocktails such as mojitos, and rum.",
      note: "Sister venues in Yodoyabashi and in Ginza, Tokyo (opened 2022)."
    },
    "osaka|シガーバー スーペルノーバ 淀屋橋店（Cigar Bar Super Nova）": {
      area: "Yodoyabashi, Chuo-ku, Osaka",
      desc: "The first Super Nova, originally opened in Minami and since moved to Yodoyabashi. A deep Cuban list and dedicated staff who will take you from choosing a cigar to lighting it — a hideaway of a cigar bar.",
      note: "The original venue moved from Minami to Yodoyabashi."
    },
    "osaka|葉巻喫茶 洋煙 -ヨウエン-（Cigar Youen）": {
      area: "Kitahama / Koraibashi, Chuo-ku, Osaka",
      desc: "Opened August 2023. A cigar café serving only high-quality Cuban cigars rolled by experienced hands. Only Cuban cigars may be smoked (no cigarettes, e-cigarettes or pipes); the seat charge is ¥500. Bringing your own carries a ¥1,000 cigar charge per cigar, and non-Cuban cigars may not be brought in. Open 12:00–24:00, closed Wednesdays.",
      note: ""
    },
    "osaka|シガーバー エドモンダンテス（cigar Bar Edmundo Dantes）": {
      area: "Shinsaibashi, Chuo-ku, Osaka",
      desc: "A cigar bar on Shinsaibashi-suji with a deep Cuban list — Partagás, Por Larrañaga, Hoyo de Monterrey, Ramón Allones — where a specialist will choose one to fit what you are after. Open 19:00–04:00, closed Sundays.",
      note: ""
    },
    "osaka|シガークラブ（Cigar Club）": {
      area: "Umeda, Kita-ku, Osaka (Herbis)",
      desc: "Opened in 1999 and said to be the first cigar specialist in the Kansai region. A calm room holding around 180 Havana cigars, plus cutters, humidors and private lockers, with knowledgeable staff. Inside Herbis Osaka in Umeda.",
      note: "A tenant in a commercial building, so current trading should be checked."
    },
    "osaka|たばこ専門店 さくらんぼ": {
      area: "Umeda / Higashi-dori (Doyamacho), Kita-ku, Osaka",
      desc: "A tobacconist on the Higashi-dori shopping street in Umeda, carrying around 600 tobacco products including cigarettes, rolling tobacco, pipe tobacco and cigars. Sells online as well as in the shop. Open until around 22:00.",
      note: ""
    },
    "osaka|たばこ専門店 阪口商店": {
      area: "Akutagawa-cho, Takatsuki",
      desc: "A tobacconist in Takatsuki with one of the largest ranges in the city. A good number of cigars, plus a deep selection of rolling tobacco and pipe tobacco.",
      note: ""
    },
    "osaka|シリウスタバコ（庄内店）": {
      area: "Shonai-Nishimachi, Toyonaka",
      desc: "A large tobacco and accessory specialist claiming one of the biggest ranges in Japan. Cigarettes, rolling tobacco, pipes and kiseru, plus premium cigars — Havanas included — kept in a walk-in humidor. In the Shonai WEST shopping street.",
      note: ""
    },
    "osaka|ザ・バー／ザ・リッツ・カールトン大阪（The Bar, The Ritz-Carlton Osaka）": {
      area: "Umeda / Kitashinchi, Kita-ku, Osaka",
      desc: "The main bar of the Ritz-Carlton Osaka, with 460 spirits including malt whiskies and its martinis, live jazz and a heavy interior. It once held 16 cigars and you could smoke here; cigars and smoking have since ended.",
      note: "Once known as a hotel bar for cigars; cigars and smoking on the premises are understood to have ended (as of 2026). The bar itself is open."
    },
    "osaka|ブルーバー（Blue Bar）／ウェスティンホテル大阪": {
      area: "Shin-Umeda City, Kita-ku, Osaka",
      desc: "A bar inside the Westin Osaka, written up as a hotel bar where cigars can be enjoyed. Little is published about the range or whether smoking is permitted.",
      note: "Cigar service rests mainly on secondary sources; the current position needs checking."
    },
    "osaka|ARTEMIS（アルテミス）": {
      area: "Umeda / Chayamachi, Kita-ku, Osaka",
      desc: "A bar in Chayamachi, Umeda, written up in several bar guides as having a good cigar offering. An authentic bar where cigars are available rather than a specialist.",
      note: "A bar carrying cigars rather than a cigar house. Current trading and cigar service need checking."
    },

    /* ---------- 兵庫県 ---------- */
    "hyogo|杉本酒販株式会社（葉巻の世界 / Sugimoto）": {
      area: "Motomachi (Motomachi 1-bangai), Chuo-ku, Kobe",
      desc: "A liquor and tobacco house of more than 70 years' standing, running a dedicated cigar department — 'The World of Cigars' — with the largest range in the prefecture: around 700 lines from inexpensive cigarillos and dry cigars through Honduran, Dominican and Jamaican cigars to the finest Cubans. Nada sake and Kobe brandy sit alongside, and the shop suggests pairing cigars with vintage cognac, rum and sherry.",
      note: "Roughly 10:00–19:00 (from 12:00 on Sundays and holidays). Closed the third Wednesday, over Obon and at New Year."
    },
    "hyogo|LAGUNA THE BAR（ラグナ ザ バー）": {
      area: "Kitano / Hunter-zaka (Sannomiya), Chuo-ku, Kobe",
      desc: "One of Kobe's landmark authentic bars, on the first floor of an exposed-concrete building designed by the architect Tadao Ando. High ceilings, a long single-slab counter and indirect light spilling through round openings in the wall make for a striking grown-up room. Also listed on Tabelog as a cigar bar, and well known as a place to enjoy one.",
      note: "Has been selected for Tabelog's Bar Hyakumeiten list. Roughly 19:00–02:30."
    },
    "hyogo|GRAND BAR（グランド・バー）": {
      area: "Shimoyamate-dori (Sannomiya), Chuo-ku, Kobe",
      desc: "A cigar bar on the second floor of the Ikuta Shakaikan building, five minutes from Sannomiya station. A metre-wide counter and semi-private sofa seating give it the polish of a hotel lounge. Around 50 premium cigars, mainly Cuban, kept in good condition, to pair with champagne or a good wine.",
      note: ""
    },
    "hyogo|PaPa Hemingway（パパ ヘミングウェイ）": {
      area: "Nakayamate-dori (Sannomiya), Chuo-ku, Kobe",
      desc: "A Sannomiya bar that describes itself as 'an authentic bar with cigars'. The owner, Junya Fukutomi, is an international bartender and the first certified cigar adviser in Hyogo; cigars such as Partagás are served with cocktails, scotch and bourbon. A 14-seat long counter, smoking permitted throughout.",
      note: "Roughly 18:00–02:00 (to 24:00 on Sundays and holidays)."
    },
    "hyogo|BAR ASHIBE（バー アシベ）": {
      area: "Shimoyamate-dori (Sannomiya), Chuo-ku, Kobe",
      desc: "A calm bar in the Ikuta Shakaikan building, five minutes from Sannomiya station. Low light and a row of bottles behind the counter; cigars may be smoked here and are also sold to take away. Frozen cocktails and food, clear pricing, and an easy door to walk through.",
      note: "Roughly 19:00–04:00, open daily."
    },
    "hyogo|Bar Sanctuary（バー サンクチュアリ）": {
      area: "Rokkomichi, Nada-ku, Kobe",
      desc: "A cigar bar opened in Rokkomichi in December 2021 by four cigar-loving Kobe University students, on the idea of 'a sanctuary of your own'. Alongside the standards it keeps hard-to-find limited releases and cigarillos for newcomers, with care taken over ventilation and smell. Non-alcoholic cocktails too, so it works whatever your taste in cigars.",
      note: "Opened December 2021."
    },

    /* ---------- 奈良県 ---------- */
    "nara|たばこセンター米田（Tobacco Center Komeda）": {
      area: "Ohiro-cho, Gose (by Kintetsu Gose station)",
      desc: "A long-established cigar and pipe specialist with devoted admirers abroad. A walk-in humidor and a deep range of premium cigars, plus pipes, cutters, humidors, tobacco from around the world and Zippos; the owner buys abroad in person. Advice on how to smoke is part of the service.",
      note: "Known as one of the most serious cigar shops in Nara."
    },
    "nara|ブルーレース（Blue Race）": {
      area: "By Ikoma station, Ikoma",
      desc: "A tobacco, accessory and lottery shop of more than 25 years' standing. On the cigar side it stocks mainly cigarillos and little cigars across a range of marques, with a particular commitment to rolling tobacco (shag). Sells online too, and will discuss ordering things in.",
      note: "Leans towards cigarillos and little cigars rather than premium cigars."
    },
    "nara|FUMARE（フマーレ）": {
      area: "Higashi-Tomigaoka, Nara City",
      desc: "A tobacconist led by rolling tobacco, with rare cigarettes, dry cigars and little cigars. Accessories are stocked too.",
      note: "Posts product information on X (@fumare_nara). Whether premium Habanos are regularly stocked needs checking."
    },
    "nara|緑屋": {
      area: "Ukyo, Nara City",
      desc: "A tobacconist written up as a stockist of Indonesian tobacco and said to sell cigars and rolling tobacco. Little is published about the range.",
      note: "Published information on what cigars are regularly carried is thin — needs checking."
    },
    "nara|奈良ホテル ザ・バー（THE BAR）": {
      area: "Takabatake-cho, Nara City (Nara Hotel)",
      desc: "A classic authentic bar on the ground floor of the main building of the Nara Hotel, founded in the Meiji era. Counter and sofa seating, spirits from around the world and original cocktails — and a serious cigar list, with many guests coming for one. Smoking permitted throughout.",
      note: "Also listed on cigar maps and cigar-friendly venue lists."
    },
    "nara|THE BAR（登大路ホテル）": {
      area: "Noborioji-cho, Nara City (Noborioji Hotel)",
      desc: "A bar inside the Noborioji Hotel in Noborioji-cho, Nara City, listed on Cigar Connection's cigar-bar pages as a place to enjoy a cigar.",
      note: "A different venue from the Nara Hotel's 'The Bar' above. Published detail is thin, so its current status needs checking."
    },

    /* ---------- 和歌山県 ---------- */
    "wakayama|BAR DEN（バー デン）": {
      area: "Okayama-cho, Wakayama City (Keyaki-odori, near JR Wakayama station)",
      desc: "A calm authentic bar built on the idea of 'a man's study'. The owner has more than 30 years behind the bar, and there are over 100 whiskies as well as cocktails. Small — seven counter seats and seven at tables — and written up as a place to enjoy a cigar, appearing in Suntory BAR-NAVI's cigar search.",
      note: "Published sources say little about which cigars are kept in stock — worth checking. The bar itself is trading (local press marked its tenth anniversary around 2023)."
    },

    /* ---------- 鳥取県 ---------- */
    "tottori|米子東タバコセンター（東タバコセンター）": {
      area: "Kumato, Yonago",
      desc: "A tobacconist reckoned to have the deepest range in the San'in region, carrying cigars and cigarillos alongside rolling tobacco and pipe tobacco. Valued for an owner who knows the subject and will help you choose.",
      note: "Local media (Tottori Magazine) describes it as the best-stocked in San'in. Whether premium cigars are always in stock needs checking."
    },
    "tottori|ラ・コルク（La Koruku、旧ワイン ダイニング コルク）": {
      area: "Suehiro-Onsen-cho, Tottori City (near Tottori station)",
      desc: "A wine and dining bar about five minutes from Tottori station, with around 500 drinks and dishes built on local ingredients such as Tottori wagyu and blackthroat seaperch. Reviewers call it one of very few places in Tottori where you can enjoy a cigar, and cigars are served.",
      note: "Formerly Wine Dining Cork, which moved and was renamed La Koruku. Whether cigars are always available, and which, needs checking."
    },

    /* ---------- 島根県 ---------- */
    "shimane|西屋（Nishiya／酒とタバコの専門店 西屋）": {
      area: "Yano-cho, Izumo",
      desc: "A liquor and tobacco specialist in Izumo. Cigarettes and shag from around the world alongside a broad range of cigars and pipe tobacco, with its own 'cigars, kiseru and pipes' category. Lighters, cigar accessories and other equipment too — reckoned one of the deeper ranges in the Chugoku region.",
      note: "Shop plus mail order. Happy to advise beginners. Whether Cuban Habanos are carried could not be established from published sources."
    },
    "shimane|Bar Negras（バー ネグラス）": {
      area: "Isemiya-cho, Matsue (about 6 min from the north exit of Matsue station)",
      desc: "A spirits bar built on rum and cigars, with a long list of rare rums from around the world and seasonal fresh-fruit cocktails. Low-lit and calm, smoking permitted throughout, small and counter-led. Opens at 18:00.",
      note: "Cigar service confirmed on Tabelog and BAR-NAVI. Which marques, and whether Habanos are carried, needs checking."
    },

    /* ---------- 岡山県 ---------- */
    "okayama|パラディ（Paradis / Paradis cigar wine jazz bar）": {
      area: "Saiwaicho, Kita-ku, Okayama City (along Nishigawa Canal Park)",
      desc: "Reckoned the oldest cigar bar in Okayama, on the Nishigawa canal in the city centre. It has a dedicated cigar floor — unusual in the prefecture — with cigars kept in humidors. Also known for a considered wine list, fruit cocktails and live jazz at weekends. Beginners and enthusiasts alike.",
      note: "Claims to be the only venue in Okayama with a dedicated cigar space. Around 46 seats in total (main bar plus cigar floor)."
    },
    "okayama|シガーバー ケネディ（CigarBar Kennedy）": {
      area: "Nishikimachi, Kita-ku, Okayama City (by the Nishigawa canal)",
      desc: "An authentic bar built around cigars, opened in January 2022 in Nishikimachi. On the fifth floor, looking out over the Nishigawa canal at night, with cigars alongside whisky and cocktails. Operated by Hikasa Co.",
      note: "Operated by Hikasa Co. Closed Sundays."
    },
    "okayama|Yショップ 暮らしの店 しみず（たばこ屋しみず）": {
      area: "Kojima, Kurashiki",
      desc: "A tobacconist founded in 1883 and now in its fifth generation. It installed a humidor (a Forster Japan LongFresh) in 2004 and keeps premium cigars, dry cigars, cigarillos, pipe tobacco and unusual tobaccos from around the world. Also sells online.",
      note: "Attached to a Yamazaki convenience store. Closed Sundays (open on public holidays). Ships nationwide from Kojima."
    },
    "okayama|インポートショップ トレンド（Import Shop Trend）岡山店": {
      area: "Minami-ku, Okayama City (near Hayashima IC on the Sanyo Expressway)",
      desc: "An importer of foreign food and goods, trading since 1988, selling premium cigars kept in a proper humidor along with dry cigars, cigarillos and rolling tobacco. Around 520 lines in total across foreign cigarettes, cigars, little cigars, cigarillos, shag and snuff. Parking for 60 cars.",
      note: "Tobacco is one department of the shop rather than its whole business — cigars sold within an import store."
    },

    /* ---------- 広島県 ---------- */
    "hiroshima|たばこのなかみち 分家（Tabako no Nakamichi Bunke）": {
      area: "Senda-machi, Naka-ku, Hiroshima",
      desc: "The deepest tobacco, cigar and pipe specialist in Hiroshima. Premium cigars kept in humidors, plus dry cigars, cigarillos, pipe tobacco and rolling tobacco — very nearly everything distributed in Japan, some 900 lines. There is a smoking space in the shop.",
      note: "The second shop, opened in January 2014 as a larger relocation of the original."
    },
    "hiroshima|京橋堂タバコセンター（Kyobashido Tobacco Center）": {
      area: "By the south exit of Hiroshima station, Minami-ku, Hiroshima",
      desc: "A tobacconist about three minutes from the south exit of JR Hiroshima station, carrying premium cigars, dry cigars, cigarillos and rolling tobacco (shag). Also known as a stockist of Indonesian tobacco.",
      note: ""
    },
    "hiroshima|BAR ISHIMOTO CIGAR ＆ WHISKY": {
      area: "Kanayama-cho, Naka-ku, Hiroshima",
      desc: "A whisky and cigar bar in Kanayama-cho — a grown-up room built around the two. In the entertainment district, a few minutes from the Kanayama-cho or Ebisu-cho tram stops.",
      note: ""
    },
    "hiroshima|BAR CEDAR（シガーバー シダー / cigar bar cedar hiroshima）": {
      area: "Fukuromachi (near Hatchobori / Kami-Hatchobori), Naka-ku, Hiroshima",
      desc: "A cigar bar with cigars, whisky, rum and cocktails across three spaces: counter, semi-private room and sofa seating. Whisky aged in-house in oak casks is a speciality. About five minutes from the Kami-Hatchobori tram stop.",
      note: "Closed Mondays. Mainly evenings."
    },
    "hiroshima|doga（ドア）": {
      area: "Okinogami-cho, Fukuyama",
      desc: "A rolling-tobacco (shag) specialist in Fukuyama, keeping more than 170 shags at any time along with cigars, kiseru tobacco, papers, filters and related goods. Carries top international brands and more obscure things too.",
      note: "Rolling tobacco is the focus; the size of the cigar selection needs checking."
    },

    /* ---------- 山口県 ---------- */
    "yamaguchi|河村商店（Kawamura Shoten）": {
      area: "Central shopping street, Yamaguchi City",
      desc: "A tobacconist of some 60 years' standing, with around 300 cigarettes plus cigars and rolling tobacco. As well as easy cigarillos and flavoured cigars, it carries serious dry cigars from Cuba and the Dominican Republic.",
      note: "A tobacconist with a cigar selection. No statement of an authorised Habanos account could be confirmed; worth checking with the shop."
    },
    "yamaguchi|CigarBar and cigarettes（アンドシガレッツ）": {
      area: "Chofu, Shimonoseki (Chofu castle-town shopping street)",
      desc: "A cigar bar in the old castle town of Chofu, serving premium cigars and scotch. The owner cuts and lights for you and takes time to show newcomers how to smoke. Cocktails too, so non-smokers are welcome.",
      note: "Closed Mondays and Tuesdays. Written up as a relatively new addition to the Chofu shopping street."
    },

    /* ---------- 徳島県 ---------- */
    "tokushima|徳島たばこセンター（Tokushima Tabaco Center）": {
      area: "Kitajima, Itano District",
      desc: "A tobacco and accessory specialist billing itself as 'the shop with the world's tobaccos'. Japanese and foreign cigarettes and rolling tobacco alongside a broad range of cigars, pipe tobacco and accessories. Premium cigars, Cuban included, are kept in a dedicated humidor, and customers come from beyond the prefecture.",
      note: "A shop — not a bar, and no smoking. Whether it holds an authorised Habanos account cannot be established from published sources, so ask about specific marques."
    },

    /* ---------- 香川県 ---------- */
    "kagawa|真也探偵社（Shinya Tantei-sha）": {
      area: "Kawaramachi, Takamatsu",
      desc: "A cigar bar and shop in the Kawaramachi entertainment district. A good range of cigars — Cuban included — and spirits, rum especially, with cigars reportedly from around ¥2,600. Counter-led and hideaway-ish, good for one or two people taking their time.",
      note: "Reportedly not always easy to get into without an introduction. Also appears on Instagram under #瓦町 #ラム酒 #葉巻."
    },
    "kagawa|太田たばこ店（太田タバコ店 / Ota Tabako-ten）": {
      area: "Kobamacho, Takamatsu (Lion-dori shopping street)",
      desc: "A tobacconist on the Lion-dori shopping street in Takamatsu's entertainment district, with a good number of cigars and pipe tobaccos, open until late. A few minutes from Kawaramachi station.",
      note: "Cigars and pipes confirmed via the shopping street's own site, Ekiten and mapping services. The details of the range — whether Habanos are carried, for instance — need checking."
    },
    "kagawa|岡田たばこ店（Okada Tabako-ten）": {
      area: "Kataharamachi, Takamatsu (Kataharamachi west shopping street)",
      desc: "A tiny tobacconist (about five square metres) on the Kataharamachi shopping street, carrying around 150 lines — some 300 including things it will order in — sold across the counter by an owner who will talk about the neighbourhood while he does it.",
      note: "Appears to lead with cigarettes and imported tobacco; whether premium cigars are carried is not clear from published sources and needs checking."
    },

    /* ---------- 愛媛県 ---------- */
    "ehime|LE CLUB（ル・クラブ）": {
      area: "Okaido / Nibancho, Matsuyama",
      desc: "A heavy authentic bar in the Okaido entertainment district of central Matsuyama, styled after a medieval European castle. Fresh-fruit cocktails, hard liquor and wine, plus cigars, with staff to cut and light for you. Smoking permitted throughout, and private rooms available.",
      note: "A bar carrying cigars rather than a specialist. The range needs checking."
    },
    "ehime|とよたシガレッツ（いよてつ髙島屋内 たばこ売場）": {
      area: "Minatomachi, Matsuyama (Iyotetsu Takashimaya main building, 1F)",
      desc: "The tobacco counter on the ground floor of Iyotetsu Takashimaya, outside Matsuyamashi station. Cigars sit alongside rolling tobacco, pipes, shisha and accessories — a tobacco section inside a department store.",
      note: "Inside a department store, so hours and stock follow Takashimaya's. What cigars are regularly held needs checking."
    },
    "ehime|蝶野陶器たばこ専門店": {
      area: "Mishima-Chuo, Shikokuchuo (shopping street near Iyo-Mishima station)",
      desc: "A tobacconist founded in 1884, carrying foreign cigarettes, pipes, rolling tobacco and cigarillos across a broad range, and cigars too. On the shopping street near Iyo-Mishima station.",
      note: "A long-standing local tobacconist that also runs a pottery shop. The size of the cigar selection needs checking."
    },

    /* ---------- 高知県 ---------- */
    "kochi|bar 樹香（じゅか / bar Ju-ka）": {
      area: "Hatsudai-cho, Kochi City (Otesuji / Obiyamachi area, walkable from Kochi station)",
      desc: "An authentic bar built on malt whisky, with premium tequila, rum, brandy and champagne — and a small stock of cigars. Its X account (@jyuka_osakeyou) posts cigar and whisky arrivals under #cigar and #葉巻, so whisky and a cigar can be had together. About seven minutes from the Horizume or Hasuikemachi-dori tram stops.",
      note: "Not a cigar specialist — a whisky bar that keeps a few cigars. Stock varies over time, so check before visiting."
    },

    /* ---------- 福岡県 ---------- */
    "fukuoka|AUN Smoke 天神大名店（アウンスモーク）": {
      area: "Daimyo (Tenjin), Chuo-ku, Fukuoka",
      desc: "A full smoking-accessory specialist in the Fukashiro group, with one of the largest ranges in Kyushu. Cigarettes, rolling tobacco, pipes and shisha, plus premium cigars from Cuba (Cohiba, Montecristo, Romeo), the Dominican Republic (Davidoff, Arturo Fuente), Nicaragua and Honduras. There is a smoking room for trying things, and a wine cellar.",
      note: "Opened July 2023."
    },
    "fukuoka|シガーショップきたはら": {
      area: "Shimoshiromizu, Kasuga",
      desc: "A tobacconist trading in Kasuga for around 20 years. Cigarettes, rolling tobacco, pipes and shisha, plus premium cigars, dry cigars and little cigars. Claims one of the largest rolling-tobacco ranges in western Japan. Also sells online.",
      note: ""
    },
    "fukuoka|キューバ産葉巻専門店 CubanCigar（キューバンシガー）": {
      area: "Shimizu, Kokurakita-ku, Kitakyushu",
      desc: "Three areas in one: a cigar and accessory shop, a bar and café, and a smoking lounge. A walk-in humidor held at 69% humidity keeps more than 100 Cuban premium marques and over 5,000 cigars in stock at all times, to enjoy with rum or coffee indoors or on the rooftop open-air lounge. Also sells online.",
      note: "Closed Wednesdays."
    },
    "fukuoka|Bar HORIE（バー ホリエ）": {
      area: "Haruyoshi, Chuo-ku, Fukuoka",
      desc: "A cigar bar on the riverside ground floor of Candeo Hotels The Hakata Terrace. It has a walk-in humidor — a cigar cellar, unusual in Fukuoka — holding more than 200 Cuban and Dominican cigars. The owner is a cigar manager certified by the Japan Cuban Cigar Education Association. Terrace seating.",
      note: ""
    },
    "fukuoka|Bar FURUKAWA（バー古川）": {
      area: "Nishi-Nakasu, Chuo-ku, Fukuoka",
      desc: "An authentic cigar bar opened in September 2019, with a single-slab counter in a Japanese shoin-style room. Hard liquor led by single malts and calvados, and 40–50 cigars in stock at any time, mainly Cuban and Dominican. Counter and sofa seating for up to ten.",
      note: ""
    },
    "fukuoka|THE CIGARS（ザ・シガーズ）": {
      area: "Nishi-Nakasu, Chuo-ku, Fukuoka",
      desc: "A modern cigar bar on the cobbled streets of Nishi-Nakasu, with an open riverside room and around 50 cigars, mainly Cuban. Members only, though about nine in ten of those who come are new to cigars, and the owner helps with the choosing.",
      note: "Members only (with age requirements for men and women)."
    },
    "fukuoka|住吉シガー倶楽部 NOB'S BAR（Sumiyoshi Cigar Club）": {
      area: "Sumiyoshi, Hakata-ku, Fukuoka",
      desc: "A hideaway cigar bar in the Sumiyoshi area, within walking distance of Hakata station. Known as a bar for cigar enthusiasts, and it has an English page.",
      note: ""
    },
    "fukuoka|Cigar & Bar（with Bunny）": {
      area: "Kajimachi, Kokurakita-ku, Kitakyushu",
      desc: "A cigar bar on the ground floor of the Nangoku Building, a landmark of Kokura's nightlife district, dealing in hand-made Cuban cigars. Reportedly run by a female owner and staff.",
      note: "Little detailed information available; current trading needs checking."
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
    },

    /* ---------- 佐賀県 ---------- */
    "saga|酔美（SUIVIE）": {
      area: "Chuo-Honmachi / Aikyomachi, Saga City (near Saga station)",
      desc: "A restaurant bar built on cocktails and whisky, where a cigar counts among the grown-up pleasures on offer. Cuban and Dominican marques, with careful explanation for newcomers. Founded in Hakusan in 1988 and moved in 2023 to the ground floor of the AI Building in Chuo-Honmachi.",
      note: "Relocated (from Hakusan to its present site in 2023). Cigars are smoked in the bar."
    },
    "saga|バー プエルト（Bar Puerto）": {
      area: "Chuo-Honmachi, Saga City (near Saga station)",
      desc: "An authentic bar in the Alpha 318 Building in Chuo-Honmachi, walkable from the south exit of Saga station. A good list of fresh-fruit cocktails and whisky in a classical, calm room. Listed in cigar-bar directories as a Saga venue.",
      note: "Tabelog and others describe it as cocktail- and whisky-led; whether cigars are always carried needs checking. Listed here on the strength of cigar-bar directory entries."
    },
    "saga|ほかお酒店": {
      area: "Kita-Taku-machi, Taku",
      desc: "A liquor shop and tobacconist claiming the best tobacco range in Saga, drawing customers from some distance. A broad selection of dry cigars, cigarillos and rolling tobacco (shag), with a corner in the shop for trying things and a knowledgeable owner to talk it through.",
      note: "The range leans towards dry cigars, cigarillos and rolling tobacco rather than premium Habanos."
    },

    /* ---------- 長崎県 ---------- */
    "nagasaki|CIGAR BAR ディオディオ（Cigar Bar Dio Dio）": {
      area: "Shianbashi (Funadaikumachi), Nagasaki City",
      desc: "A cigar-led bar in Shianbashi, Nagasaki's main entertainment district, serving Cuban and other cigars with single malts and whisky. One of very few venues in the city built around cigars — it says so on the sign.",
      note: "Current listings on Tabelog, Hot Pepper, Hitosara and Yahoo! Maps. Check the latest of those before visiting."
    },
    "nagasaki|Bar 三（バー トロワ／Bar Trois）": {
      area: "Hamanomachi / Shianbashi, Nagasaki City",
      desc: "A bar in the Hamanomachi area, right by the Shianbashi tram stop. Jazz, a view of the trams and a calm room with a sunken counter. Reviewers mention enjoying a cigar with whatever the owner recommends, and it appears in the Kyushu cigar-bar list.",
      note: "A bar where cigars can be enjoyed, not a specialist. Which marques are stocked needs checking."
    },
    "nagasaki|サントリージガーバー ナッシュビル（Suntory Jigger Bar Nashville）": {
      area: "Motoshima-cho, Sasebo",
      desc: "A long-standing jigger bar in central Sasebo with a deep single-malt list, where cigars can also be enjoyed. Cocktails, whisky and thin-crust pizza, in an unhurried room.",
      note: "A bar carrying cigars rather than a specialist. Listed on Suntory BAR-NAVI and in the Kyushu cigar-bar list."
    },

    /* ---------- 熊本県 ---------- */
    "kumamoto|BAR RICORDI（バー リコルディ）": {
      area: "Hanabatake-cho (Ichou-dori), Chuo-ku, Kumamoto",
      desc: "An authentic bar on Ichou-dori in Hanabatake-cho for malts, cocktails and cigars. A deep list of single malts and wine, with cigars available. Smoking permitted, and a calm room that a woman on her own can walk into easily.",
      note: "Private rooms available. Parties of one welcome."
    },
    "kumamoto|The Bar Amber（ザ バー アンバー）": {
      area: "Hanabatake-cho (Ichou-dori), Chuo-ku, Kumamoto",
      desc: "An authentic bar on Ichou-dori with around 300 whiskies plus rum, tequila, sherry and spirits from around the world, and Nicaraguan cigars — described as deep but mild. The owner is a qualified sherry sommelier and Tequila Maestro.",
      note: ""
    },
    "kumamoto|Whiskey CAT（ウイスキーキャット）": {
      area: "Hanabatake-cho, Chuo-ku, Kumamoto",
      desc: "An authentic counter bar with around 400 bottles led by scotch, including five single malts it casks itself. Marked by a cat on the sign; smoking permitted, and it is written up as a cigar bar with enthusiasts in mind.",
      note: ""
    },
    "kumamoto|CLARET（クラレット）": {
      area: "Shimotori, Chuo-ku, Kumamoto",
      desc: "A bar built on French wine, with 20–30 cheeses and good chocolate — and a stock of around 50 cigars. Comfortable on your own. A few minutes from the Karashimacho or Torichosuji tram stops.",
      note: ""
    },
    "kumamoto|Bar HORIE（バー ホリエ）": {
      area: "Chuo-ku, Kumamoto",
      desc: "Listed as a cigar bar on the cigar site Cigar Connection, with an owner who likes cigars and a write-up aimed at those interested in them.",
      note: "Mainly directory information; current trading and the full address are unverified."
    },
    "kumamoto|Basque（バスク）": {
      area: "Shimotori / Tojinmachi area, Chuo-ku, Kumamoto",
      desc: "A bar listed in cigar-bar address books and the Kyushu-Okinawa cigar-bar list as carrying cigars, said to be in the Shimotori to Tojinmachi area.",
      note: "Mainly directory information; neither the cigar service nor current trading is verified. Take care to distinguish it from similarly named venues (BASK and the like)."
    },

    /* ---------- 大分県 ---------- */
    "oita|BAR VISIONE（バール ビジオーネ）": {
      area: "Miyakomachi, Oita City (entertainment district near Oita station)",
      desc: "An authentic bar in the Shirogane Building in Miyakomachi that smells of cigars and whisky. Three spaces — counter, terrace and salon room — and cigars may be smoked in all of them. A serious cigar collection, and the calm of a London hotel bar. Cocktails, scotch and brandy too.",
      note: "The salon room carries a ¥1,000 charge. Closed Sundays and public holidays. One of very few cigar-led bars in the prefecture."
    },
    "oita|Criadera（クリアデラ）": {
      area: "Miyakomachi, Oita City (near Oita station)",
      desc: "A hideaway authentic bar on the third floor of the Shinwa Building in Miyakomachi. A deep run of bottler single malts, with vintage rum and armagnac. Counter-led and calm, and cigars can be enjoyed. No sign outside, so it is hard to spot.",
      note: "Written up on Suntory BAR-NAVI and Tabelog as a venue where cigars are permitted. Spirits are the focus; cigars are smoked in the bar."
    },
    "oita|Bar CLANNAD（クラナド）": {
      area: "Chuomachi, Oita City (about 10 min from Oita station)",
      desc: "A bar on the third floor of the Dai-ni Komatsuzuka Building in Chuomachi, a calm room looking onto Wakakusa Park. Home-made snacks from Oita ingredients with whisky and other spirits — and cigars, at your own pace.",
      note: "Listed on Suntory BAR-NAVI and Tabelog. Cigars are smoked in the bar."
    },
    "oita|Bar Barolo（バー バローロ）": {
      area: "Kawakita, Yufuin-cho, Yufu (inside the ryokan Oyado Nihon no Ashitaba)",
      desc: "An authentic bar inside the Yufuin ryokan Oyado Nihon no Ashitaba, named after Barolo — the king of wines — and with a wine cellar of its own. A quiet room of large windows surrounded by forest, where cigars can be enjoyed with a sommelier's service. A fire burns in winter.",
      note: "Non-residents may use it (within reason). Inside a ryokan, so check access and hours in advance."
    },
    "oita|BAR BROWN（バー ブラウン）": {
      area: "Miyakomachi, Oita City (near Oita station)",
      desc: "A bar in the Kawabe Building in Miyakomachi. Fresh-fruit cocktails, original cocktails using Japanese ingredients, draught dark beer and whiskies from around the world, in a grown-up room. Listed in cigar-bar directories as an Oita venue carrying cigars.",
      note: "Listed here on the strength of cigar-bar directory entries. The bar's own material leads with cocktails and whisky, so whether cigars are always carried needs checking. Tabelog shows the old premises as relocated; it is now in Miyakomachi 3-chome."
    },
    "oita|wine & dining cave.（カーブ）": {
      area: "Miyakomachi, Oita City (near Oita station)",
      desc: "A quiet hideaway wine dining bar on the ground floor of the Futaba Building in Miyakomachi, built around considered cooking and wine. Listed in cigar-bar directories as an Oita venue carrying cigars.",
      note: "Listed here on the strength of cigar-bar directory entries. The venue's own material leads with wine and food, so whether cigars are always carried needs checking."
    },

    /* ---------- 宮崎県 ---------- */
    "miyazaki|シガーハウス（Cigar House）": {
      area: "Central Miyazaki City (near Miyazaki station / the Nishitachi entertainment district)",
      desc: "Described locally as *the* cigar bar in Miyazaki, and a rare thing in the prefecture — a bar devoted to cigars. The owner is a cigar specialist who trained at the long-established Nomura Tobacco in Gotanda, Tokyo, and the room is unpretentious enough for beginners and enthusiasts alike. A cigar set runs ¥3,000–4,000, the range is broad in both marque and price, and old-bottle whiskies are affordable.",
      note: "Listed on Tabelog and elsewhere. Closing days vary; hours and trading can change, so check before visiting."
    },
    "miyazaki|小田煙草店（Oda Tobacco Shop）": {
      area: "Central Miyazaki City (near the Dental Association building)",
      desc: "The tobacconist the owner of Cigar House runs during the day, where cigars can be bought. Run by the same person as the evening cigar bar, and one of very few places in the prefecture to pick up a cigar in person.",
      note: "The main evidence is a mention as 'From Oda Tobacco Shop' in a Tabelog review of Cigar House. Independent published information is thin, so the address and trading status need checking."
    },

    /* ---------- 鹿児島県 ---------- */
    "kagoshima|Cocktail Cre8 ゆらぎ": {
      area: "Tenmonkan (Sennichi-cho), Kagoshima City",
      desc: "An authentic shot bar near the Jizokaku police box in Tenmonkan, keeping cigars to go with whisky, brandy and rum. A deep list of seasonal fruit cocktails and rare malts.",
      note: "Which cigars are in stock varies over time — check before visiting."
    },
    "kagoshima|BAR Satin Doll（サテンドール）": {
      area: "Tenmonkan (Bunka-dori / Sennichi-cho), Kagoshima City",
      desc: "A cocktail and spirits bar in the Tenmonkan area, said to serve cigars alongside single malts and fruit cocktails. Smoking permitted.",
      note: "A similarly named venue nearby (Satin Doll Jazz Restaurant) is easily confused with it. The cigar service needs checking."
    },
    "kagoshima|Whisky House DUFFTOWN（ダフタウン）": {
      area: "Tenmonkan (Sennichi-cho), Kagoshima City",
      desc: "A grown-up hideaway whisky bar on an upper floor near the Jizokaku police box in Tenmonkan. A deep run of scotch, Irish and American whiskies plus Yamazaki, with 20 counter seats. Listed in cigar-bar directories as permitting cigars.",
      note: "Principally a whisky bar. Ask before visiting, including about bringing your own."
    },
    "kagoshima|B.B.13 BAR（ビービーサーティーンバー）": {
      area: "Izumi-cho (Asahi-dori), Kagoshima City",
      desc: "A long-standing bar on the first floor of a stone Western-style building put up in 1916. Several hundred spirits and proper French cooking in an antique room; smoking permitted. Listed in cigar-bar address books as a place to enjoy a cigar.",
      note: "A French-led bar; whether cigars are always carried, and which, needs checking."
    },

    /* ---------- 沖縄県 ---------- */
    "okinawa|たばこショップ けむり屋沖縄（Kemuriya Okinawa）": {
      area: "Akebono (Shintoshin area), Naha",
      desc: "A tobacconist operated by Kurayoshi Ltd. Premium cigars from Cuba, the Dominican Republic and elsewhere, plus pipe tobacco, Japanese and foreign cigarettes and accessories such as cutters. It has a walk-in humidor room, making it one of very few shops in the prefecture with a real cigar selection.",
      note: "There was once reporting of a second shop in Nishimachi, Naha; the main shop now is in Akebono (Shintoshin). Posts on Instagram at @kemuriya_okinawa."
    },
    "okinawa|フィンカビヒア沖縄（FINCA LA VIGIA OKINAWA）": {
      area: "Omoromachi, Naha",
      desc: "The sister venue to COHIBA ATMOSPHERE TOKYO in Nishi-Azabu — a café and bar with a smoking lounge, which is rare here. Mainly Cuban cigars, with mojitos and other Cuban cocktails, rum and single malts. Terrace seating.",
      note: "Moved from near Kokusai-dori (Miebashi) to Omoromachi in November 2020, so treat information about the old address with care."
    },
    "okinawa|Bar&Cafe 7C（セブンシー）": {
      area: "Omoromachi, Naha",
      desc: "A cigar bar billing itself as the largest in Okinawa, with more than 1,000 drinks and over 130 cigars, and a cigar adviser on hand. Easy to walk into as a newcomer to cigars or whisky, and cigars can be bought to take away. Ventilation is fitted for smoking.",
      note: ""
    },
    "okinawa|Rum and Cigar Bar Hallelujah（ハレルヤ）": {
      area: "Uechi / Nakanomachi, Okinawa City",
      desc: "A bar built on rum and cigars, carrying premium cigars led by Cubans, with rums from many countries and original cocktails using seasonal fruit. Staff include a qualified rum concierge.",
      note: "Closed Wednesdays. Posts premium cigar arrivals on its blog."
    },
    "okinawa|Dining and Cigar THE VERONA（ザ・ベローナ）": {
      area: "Mihama, Chatan, Nakagami District",
      desc: "A dining and cigar bar on the top floor of a building overlooking American Village, with around 30 carefully chosen premium cigars, Latin music and a long drinks list. The view takes in the sea, the sunset, the night lights and the fireworks.",
      note: "A dining bar first, where you may also smoke a cigar."
    },
    "okinawa|たばこ屋本舗 外間（ほかま）": {
      area: "Oroku, Naha / Itoman (two shops)",
      desc: "A tobacconist carrying Japanese and foreign cigarettes and heated tobacco alongside cigars, pipe tobacco and rolling tobacco, with shops in Oroku and Itoman. The Itoman shop is small and carries less, so ordering ahead is advised.",
      note: "A shop rather than a bar. Closed Sundays, over New Year, Obon and Golden Week."
    }
  }
};
