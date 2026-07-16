/* ============================================================
   Cigar Cafe — 日本ガイド：全国の葉巻販売店・シガーバー（拡充版）
   47都道府県を担当エージェントが実地調査。出典・閉店情報つき。
   情報更新日：2026-07-16
   （data/world.js の後、js/japan.js の前に読み込む）
   ============================================================ */
var JAPAN_GUIDE_DATA = {
  "updated": "2026-07-16",
  "regions": [
    {
      "region": "北海道・東北",
      "prefectures": [
        {
          "code": "hokkaido",
          "pref": "北海道",
          "pref_en": "Hokkaido",
          "region": "北海道・東北",
          "prefNote": "葉巻を扱う店は札幌市中央区・すすきのに集中しており、老舗たばこ店モモヤ（葉巻約100種）を中心に、シガーバー（TAKE 5、ひいじいCafe、AZUBAR等）が点在する。地方では釧路のたばこハウスKONYAが道東最大級の品揃え。函館・旭川など他都市はバーで葉巻を出す店が散見される程度で、専門店・専業シガーバーは公開情報では少ない。すすきの周辺には他にもビッグダン・煙草ランド山岸など葉巻を置くたばこ店の記載があるが、現況が確認しきれないため本リストには確度の高い店のみ掲載した。",
          "shops": [
            {
              "name": "TAKE 5 Bar & Cigar（テイクファイブ）",
              "type": "シガーバー",
              "area": "札幌市中央区・すすきの（南6西4）",
              "desc": "すすきの駅から徒歩約5分の隠れ家的バー。140種以上のウイスキー（ジャパニーズ・スコッチ）と、温湿度管理したキューバ産シガーを楽しめる。台湾出身のマスターによる台湾料理も提供。",
              "note": "公式Threads（@bar_take5）等で発信を継続。",
              "status": "営業",
              "sources": [
                "旅色 (グルメ情報) https://tabiiro.jp/gourmet/s/314257-sapporo-bar-take5/",
                "楽天ぐるなび (店舗情報) https://r.gnavi.co.jp/5yh0gh7w0000/"
              ]
            },
            {
              "name": "札幌煙管ひいじいCAFE（ひいじいカフェ）",
              "type": "シガーバー",
              "area": "札幌市中央区・すすきの（南6西3・有馬ビル）",
              "desc": "パイプ・葉巻愛好家の店主が2015年に開いた喫煙者向けのシガーバー。パイプは無料で自由に使え、手巻きたばこもチャージ料に含まれ、葉巻も一本120円程度から気軽に試せる。自家焙煎コーヒーも提供。",
              "note": "建物の有馬ビルは映画『探偵はBARにいる』の舞台として知られる。7席・喫煙可。",
              "status": "営業",
              "sources": [
                "ウォーカープラス (記事) https://www.walkerplus.com/article/134337/",
                "食べログ (店舗情報) https://tabelog.com/hokkaido/A0101/A010103/1052824/",
                "公式サイト https://hiijicafe.kt-hub.com/"
              ]
            },
            {
              "name": "AZUBAR（アズバー）",
              "type": "シガーバー",
              "area": "札幌市中央区・すすきの",
              "desc": "キューバ・ハバナシガーを初心者からヘビーユーザー向けまで取り揃えるオーセンティックバー。フレッシュフルーツカクテルやシングルモルトが充実し、バカラ中心のグラスを選べる。マッキントッシュ／JBLのオーディオを備えた上質な隠れ家。",
              "note": "",
              "status": "営業",
              "sources": [
                "G DINING札幌 (店舗情報) https://www.gdiningsapporo.com/gourmet/bar/azubar/",
                "SUNTORY BAR-NAVI (店舗情報) https://bar-navi.suntory.co.jp/shop/0X00116904/",
                "ホットペッパーグルメ https://www.hotpepper.jp/strJ000740435/"
              ]
            },
            {
              "name": "The Bow Bar（ザ・ボウ・バー）",
              "type": "バー（葉巻あり）",
              "area": "札幌市中央区・すすきの（南4西2）",
              "desc": "天井まで届くバックバーに無数のボトルが並ぶ、ウイスキー・ブランデー愛好家が集うオーセンティックバー。蒸留酒とともに葉巻を楽しめる店として北海道のシガーバー一覧に挙げられる。",
              "note": "",
              "status": "営業",
              "sources": [
                "食べログ (店舗情報) https://tabelog.com/en/hokkaido/A0101/A010103/1014016/",
                "SUNTORY BAR-NAVI 北海道シガー充実バー一覧 https://bar-navi.suntory.co.jp/search/f__01/p__520/"
              ]
            },
            {
              "name": "BAR MADURO（バー マデューロ）",
              "type": "バー（葉巻あり）",
              "area": "札幌市中央区・すすきの",
              "desc": "すすきの駅から徒歩約2分。季節のフルーツを使ったカクテルや、超低温冷蔵庫で冷やしたシャンパン・ビールが名物。SUNTORY BAR-NAVIの『北海道でシガーが充実しているおすすめバー』に掲載される。",
              "note": "葉巻の在庫・銘柄の詳細は要確認。",
              "status": "営業",
              "sources": [
                "SUNTORY BAR-NAVI (店舗情報) https://bar-navi.suntory.co.jp/shop/0X00168439/",
                "SUNTORY BAR-NAVI 北海道シガー充実バー一覧 https://bar-navi.suntory.co.jp/search/f__01/p__520/"
              ]
            },
            {
              "name": "リカー&タバコショップ モモヤ（MOMOYA）",
              "type": "専門店",
              "area": "札幌市中央区・すすきの（南5西5・モモヤビル1F）",
              "desc": "すすきので創業100年超のたばこ・酒専門店。1階に約200種のたばこと約100種の葉巻・パイプたばこを揃え、キューバ産・ドミニカ産シガーを大型ヒュミドールボックスで管理する。飲食店への卸も多い老舗。",
              "note": "営業時間は10:00〜26:00（日祝は短縮）。",
              "status": "営業",
              "sources": [
                "すすきのへ行こう (店舗情報) https://www.go-susukino.com/shop/15116.html",
                "全国タバコショップリーダースクラブ TLC https://www.tlc-net.co.jp/shop/5195/",
                "すすきのタウン情報WEB https://www.susukino.gr.jp/others/shop-detail.php?sid=215"
              ]
            },
            {
              "name": "たばこハウスKONYA（こんや）",
              "type": "専門店",
              "area": "釧路市",
              "desc": "道東最大級の品揃えを謳うたばこ・喫煙具専門店。プレミアム・ドライ・リトル・ミニシガーなど各種葉巻（ダビドフ、カフェ・クレーム等）、パイプ、手巻きたばこ、外国たばこ、喫煙具を扱う。通販にも対応。",
              "note": "",
              "status": "営業",
              "sources": [
                "たばこハウスKONYA 公式サイト https://www.tabacco-house.com/",
                "たばこハウスKONYA シガー（葉巻）ページ https://www.tabacco-house.com/sp/cigar/index.html"
              ]
            },
            {
              "name": "BAR JOURNEY（バー ジャーニー）",
              "type": "バー（葉巻あり）",
              "area": "函館市（市電・中央病院前駅付近）",
              "desc": "スタンダードから入手困難な銘柄まで、特にクラフトジンが豊富なショットバー。カウンターとテーブル席があり一人でも利用しやすい。SUNTORY BAR-NAVIの北海道シガー充実バー検索に挙がる。",
              "note": "葉巻の取扱・在庫の有無は公開情報では確認しきれず要確認。",
              "status": "要確認",
              "sources": [
                "北海道Likers (店舗情報) https://hokkaidolikers.com/shop/57947",
                "SUNTORY BAR-NAVI 北海道シガー充実バー一覧 https://bar-navi.suntory.co.jp/search/f__01/p__520/"
              ]
            }
          ],
          "sources": [
            "SUNTORY BAR-NAVI 北海道シガー充実バー一覧 https://bar-navi.suntory.co.jp/search/f__01/p__520/",
            "食べログ 北海道シガーバー https://tabelog.com/keywords/%E3%82%B7%E3%82%AC%E3%83%BC%E3%83%90%E3%83%BC/hokkaido/kwdLst/BC01/",
            "シガーショップの住所録[北海道] http://chankaz.net/cigarshop/hokkaido",
            "すすきのへ行こう 葉巻の楽しめる店まとめ https://www.go-susukino.com/18971.html"
          ]
        },
        {
          "code": "aomori",
          "pref": "青森県",
          "pref_en": "Aomori",
          "region": "北海道・東北",
          "prefNote": "青森県では葉巻専門の独立店は確認できないが、青森市のたばこ・喫煙具店（シガーブレイク、酒のなかむら）や三沢市の酒販店（中居酒店）で葉巻を購入できる。喫煙して楽しめる場としては青森市・弘前市に葉巻を扱うバーが点在する。ハバノス正規取扱や個別の在庫は各店で要確認。",
          "shops": [
            {
              "name": "シガーブレイク（Cigar Break）",
              "type": "専門店",
              "area": "青森市緑・サンロード青森",
              "desc": "サンロード青森1Fにある紙巻・葉巻・パイプたばこと喫煙具の専門店。紙巻たばこから葉巻、パイプたばこまで幅広く扱い、喫煙具も各種取り揃える。カタログによる通信販売にも対応。",
              "note": "営業時間10:00〜20:00・年中無休（公開情報）。ハバノス正規取扱の有無は要確認。",
              "status": "営業",
              "sources": [
                "サンロード青森 公式 (店舗ページ) https://www.sunroad.or.jp/cigarbreak/",
                "ポミット (商業施設ショップ紹介) https://www.pomit.jp/shopping/cigar-break%E3%82%B7%E3%82%AC%E3%83%BC%E3%83%96%E3%83%AC%E3%82%A4%E3%82%AF/"
              ]
            },
            {
              "name": "酒のなかむら",
              "type": "専門店",
              "area": "青森市青柳",
              "desc": "青森市の地酒店で、パイプ・葉巻・煙管・手巻きたばこを扱う。良好な保管環境でたばこを提供し、珍しいパイプや喫煙具も置く。地酒と喫煙具を併売する老舗酒店。",
              "note": "日曜定休・8:30〜19:00（公開情報）。葉巻の在庫状況・銘柄は来店前に要確認。",
              "status": "営業",
              "sources": [
                "酒のなかむら 公式 https://www.sakeno-nakamura.com/",
                "マピオン電話帳 (店舗情報) https://www.mapion.co.jp/phonebook/M02014/02201/20230012395/"
              ]
            },
            {
              "name": "中居酒店（WORLD LIQUOR NAKAI）",
              "type": "専門店",
              "area": "三沢市中央町",
              "desc": "三沢市の酒販店で、ウイスキー等の酒類とあわせてたばこ・葉巻を扱う。公式サイトに『タバコ＆葉巻』のページを設け、シガーの取扱を明記している。",
              "note": "葉巻の品揃え・銘柄は要確認。三沢市観光協会・るるぶ等にも掲載。",
              "status": "営業",
              "sources": [
                "中居酒店 公式 (タバコ＆葉巻ページ) https://liquorstore-nakai.com/cigar",
                "三沢市観光協会 (店舗紹介) https://kite-misawa.com/misawa/%E4%B8%AD%E5%B1%85%E9%85%92%E5%BA%97/"
              ]
            },
            {
              "name": "COCKTAIL&SHOTBAR Ar（カクテルアンドショットバー アール）",
              "type": "バー（葉巻あり）",
              "area": "青森市橋本（青森駅周辺・アルファホテル青森1F）",
              "desc": "世界の銘酒600種類以上を並べるスタイリッシュなショットバー。受賞歴のあるオリジナルや定番・季節のカクテルとともに、シガー（葉巻）を楽しめる。落ち着いた大人向けの雰囲気。",
              "note": "葉巻の常備銘柄は要確認。BAR-NAVI・ぐるなび・食べログ・Rettyに掲載。",
              "status": "営業",
              "sources": [
                "BAR-NAVI (サントリー・店舗ページ) https://bar-navi.suntory.co.jp/shop/0177325055/",
                "楽天ぐるなび (店舗情報) https://r.gnavi.co.jp/4mp815u00000/"
              ]
            },
            {
              "name": "BAR LUCK",
              "type": "バー（葉巻あり）",
              "area": "弘前市新鍛冶町（中央弘前駅近く）",
              "desc": "静かに酒と葉巻を楽しめるバー。マスターは日本テキーラ協会認定のテキーラマエストロで、シガーと酒類を提供すると紹介されている。中央弘前駅から徒歩約3分。",
              "note": "全国シガーバーリスト（北海道・東北一覧）にも掲載。葉巻の在庫は要確認。",
              "status": "営業",
              "sources": [
                "スナックガイド (店舗紹介) https://www.snack-guide.com/aomori/37411/",
                "エキテン (店舗情報) https://www.ekiten.jp/shop_6961517/"
              ]
            },
            {
              "name": "GarCom de Bar（ガルソン・ジ・バール）",
              "type": "バー（葉巻あり）",
              "area": "弘前市桶屋町（中央弘前駅近く）",
              "desc": "オリジナルカクテルや全国の地ビール・豊富なウイスキーを揃える落ち着いたバー。喫煙可で、全国シガーバーリスト（北海道・東北一覧）に葉巻を扱う店として掲載されている。",
              "note": "葉巻の常備・銘柄はリスト掲載情報に基づくため要確認。日曜定休・18時〜（公開情報）。",
              "status": "要確認",
              "sources": [
                "食べログ (店舗ページ) https://tabelog.com/aomori/A0202/A020201/2007582/",
                "Retty (店舗ページ) https://retty.me/area/PRE02/ARE343/SUB15902/100000758769/"
              ]
            }
          ],
          "sources": [
            "サンロード青森 公式 https://www.sunroad.or.jp/cigarbreak/",
            "酒のなかむら 公式 https://www.sakeno-nakamura.com/",
            "中居酒店 公式 https://liquorstore-nakai.com/cigar",
            "BAR-NAVI（サントリー）青森県 https://bar-navi.suntory.co.jp/search/f__02/",
            "全国シガーバーリスト（北海道・東北一覧） http://cigarbarlist.gourmet.coocan.jp/hokkaido.html"
          ]
        },
        {
          "code": "iwate",
          "pref": "岩手県",
          "pref_en": "Iwate",
          "region": "北海道・東北",
          "prefNote": "岩手県の葉巻文化は県庁所在地の盛岡市に集中しており、一関・北上・奥州・花巻など県南・沿岸部では公開情報で葉巻専門店・シガーバーを確認できなかった（2026-07-16時点）。情報が確実なのは菜園のVictoria Cigar Moriokaで、他はバー併設・要確認の店が中心。",
          "shops": [
            {
              "name": "Victoria Cigar Morioka（ヴィクトリア シガー モリオカ）",
              "type": "専門店（バー併設）",
              "area": "盛岡市菜園",
              "desc": "盛岡駅南口から徒歩約14分、菜園エリアにあるシガーカフェ／葉巻専門店。オーナーが自らキューバの製造元を訪ね、香りや味を確かめて仕入れるキューバ産プレミアムシガーのみを扱う。全面喫煙可で店内で葉巻を楽しめ、オンラインストアも運営している。",
              "note": "自社サイト（victoria-cigar.jp）・オンラインストア・Instagram・食べログに掲載あり。岩手で最も情報が確実な葉巻専門店。",
              "status": "営業",
              "sources": [
                "Victoria Cigar 公式サイト (店舗) https://victoria-cigar.jp/",
                "Victoria Cigar オンラインストア 店舗案内 https://victoria-cigar.shop/pages/shopinfo",
                "食べログ Victoria Cigar Morioka (カフェ) https://tabelog.com/iwate/A0301/A030101/3012245/",
                "Instagram @victoria_cigar_morioka https://www.instagram.com/victoria_cigar_morioka/"
              ]
            },
            {
              "name": "ラクリマ・バッカス（LACRIMA Bacchus）",
              "type": "シガーバー",
              "area": "盛岡市大通",
              "desc": "盛岡市大通のオーセンティック系バーで、葉巻（シガー）を扱うシガーバーとして各種リストに掲載されている。全国シガーバーリストの東北版にも記載。",
              "note": "旧住所は大通3-2-23として記録されるが、エキテンでは大通1-9-10 レインボービル7Fと表示され、食べログ・Rettyでは「移転」扱い。移転後の現況は公開情報で確定できないため要確認。",
              "status": "要確認",
              "sources": [
                "エキテン ラクリマ・バッカス（盛岡市大通） https://www.ekiten.jp/shop_76615881/",
                "食べログ 【移転】Bacchus（バッカス） https://tabelog.com/iwate/A0301/A030101/3004206/",
                "シガーバーリスト 北海道東北一覧 http://cigarbarlist.gourmet.coocan.jp/hokkaido.html"
              ]
            },
            {
              "name": "Cigar Cafe AZ'（シガー・カフェ エー・ゼット・ダッシュ／カフェ AZ）",
              "type": "バー（葉巻あり）",
              "area": "盛岡市大慈寺町",
              "desc": "酒造「あさ開」敷地内の築130年以上の土蔵を使ったカフェで、葉巻を楽しめる店として全国シガーバーリストに掲載されてきた。落ち着いた蔵の雰囲気で、輸入雑貨なども扱う。",
              "note": "シガーバーリスト系の情報にのみ登場し、シガー営業としての現況が公開情報で確認できないため要確認。じゃらん等には『カフェ AZ』として掲載。",
              "status": "要確認",
              "sources": [
                "じゃらん カフェ AZ - 盛岡 https://www.jalan.net/gourmet/grm_guide000000175919/",
                "シガーバーリスト 北海道東北一覧 http://cigarbarlist.gourmet.coocan.jp/hokkaido.html"
              ]
            }
          ],
          "sources": [
            "シガーバーリスト（全国一覧） http://cigarbarlist.gourmet.coocan.jp/index_pc.html",
            "Victoria Cigar 公式サイト https://victoria-cigar.jp/",
            "食べログ 盛岡エリア https://tabelog.com/iwate/A0301/A030101/",
            "エキテン 盛岡市大通 https://www.ekiten.jp/shop_76615881/"
          ]
        },
        {
          "code": "miyagi",
          "pref": "宮城県",
          "pref_en": "Miyagi",
          "region": "北海道・東北",
          "prefNote": "宮城県の葉巻文化は仙台市青葉区（国分町・一番町・昭和町）に集中する。葉巻購入は北仙台の老舗たばこ専門店『タバコセンター カワラダ』が中核で、喫煙はシガーラウンジ9.2や葉巻を扱うオーセンティックバー（LE BAR KAWAGOE、L'essentiel Bar）で楽しめる。仙台市外では公開情報で葉巻専門店・シガーバーを確認できなかった（2026-07-16時点）。",
          "shops": [
            {
              "name": "タバコセンター カワラダ（Tabako Center Kawarada）",
              "type": "専門店",
              "area": "仙台市青葉区・昭和町（北仙台）",
              "desc": "北仙台駅から徒歩約2分のたばこ専門店。ヒュミドールで長期熟成させた葉巻を揃え、アップマン・ペティコロナスなど高級シガーやよそでは手に入りにくい銘柄も扱う、東北屈指と評される葉巻店。店主の葉巻知識が豊富。",
              "note": "かつて同ビル2階にあったシガーバー「EL Fumador」の一階たばこ屋がこの店とみられる。",
              "status": "営業",
              "sources": [
                "Cigar Map（シガーベニュー情報） https://www.cigarmap.info/venue.php?id=648",
                "Yahoo!マップ（たばこ店・青葉区昭和町） https://map.yahoo.co.jp/v3/place/Ze-8BieQmyw",
                "葉巻のブログ（訪問記・アップマン購入） https://ameblo.jp/cigarro2015/entry-12274623318.html"
              ]
            },
            {
              "name": "cigarlounge9.2（ナインポイントツー）",
              "type": "シガーラウンジ",
              "area": "仙台市青葉区・一番町（青葉通一番町/壱弐参横丁）",
              "desc": "壱弐参（いろは）横丁エリアにあるシガーラウンジ。青葉通一番町駅から徒歩数分。マスターとの会話を楽しみながら葉巻を味わえるくつろぎの空間として紹介されている。",
              "note": "",
              "status": "営業",
              "sources": [
                "食べログ（cigarlounge9.2・青葉通一番町/バー） https://tabelog.com/miyagi/A0401/A040101/4029029/",
                "Instagram 公式アカウント https://www.instagram.com/cigarlounge9.2/"
              ]
            },
            {
              "name": "LE BAR KAWAGOE（ル バール カワゴエ）",
              "type": "バー（葉巻あり）",
              "area": "仙台市青葉区・国分町（勾当台公園）",
              "desc": "モルトウイスキーからカクテルまで幅広く揃える本格オーセンティックバーで、葉巻も提供する。ジャズが流れる落ち着いた雰囲気。食べログ百名店（バー・2022年）に選出。",
              "note": "",
              "status": "営業",
              "sources": [
                "食べログ（LE BAR KAWAGOE・勾当台公園/バー） https://tabelog.com/miyagi/A0401/A040101/4000065/",
                "サントリー BAR-NAVI https://bar-navi.suntory.co.jp/shop/0222132425/"
              ]
            },
            {
              "name": "L'essentiel Bar 国分町店（レサシエル・バール）",
              "type": "バー（葉巻あり）",
              "area": "仙台市青葉区・国分町",
              "desc": "2000年開業のショットバー。ヒュミドールで管理された数種類の葉巻を常備し、レアなシングルモルトやオールドボトルと共に葉巻の香りを楽しめる。国分町通りから小道に入った落ち着いた路面店。",
              "note": "2021年開業の姉妹店「一番町店」あり。",
              "status": "営業",
              "sources": [
                "2sendai（L'essentiel Bar 国分町店 紹介） https://2sendai.net/introduce/lessentiel_bar/",
                "食べログ（L'essentiel Bar・勾当台公園/バー） https://tabelog.com/en/miyagi/A0401/A040101/4007957/"
              ]
            },
            {
              "name": "L'essentiel Bar 一番町店（レサシエル・バール）",
              "type": "バー（葉巻あり）",
              "area": "仙台市青葉区・一番町",
              "desc": "国分町店の姉妹店として2021年開業。檜のカウンターを備え、オーナーが本格カクテルを作るショットバー。葉巻も常備し、カクテルと共に楽しめる。",
              "note": "国分町店と同系列。",
              "status": "営業",
              "sources": [
                "2sendai（L'essentiel Bar 一番町店 紹介） https://2sendai.net/introduce/store_5850/",
                "食べログ（L'ESSENTIEL BAR 一番町店） https://tabelog.com/en/miyagi/A0401/A040101/4024710/"
              ]
            },
            {
              "name": "Bar HORIE（バー ホリエ）",
              "type": "シガーバー",
              "area": "仙台市（青葉区とみられる・要確認）",
              "desc": "シガー情報サイト「シガーコネクション」のシガーバー紹介に掲載されている店。店主が葉巻に精通し、葉巻観が変わると評される。宮城県のシガーバー住所録にも掲載。",
              "note": "所在地・営業状況の一次情報が乏しく、現況は要確認。",
              "status": "要確認",
              "sources": [
                "シガーコネクション（Bar HORIE 紹介） https://www.cigar-connection.net/contents/bar016"
              ]
            },
            {
              "name": "EL Fumador（エル フマドール）",
              "type": "シガーバー",
              "area": "仙台市青葉区・昭和町",
              "desc": "青葉区昭和町のビル2階にあった、一階のたばこ屋（タバコセンター カワラダとみられる）が営むシガーバー。葉巻の在庫・保存状態が良いと評判だった。",
              "note": "2017年頃に閉店との情報。",
              "status": "閉店（2017年頃）",
              "sources": [
                "シガーバーリスト（閉店・宮城/仙台情報） http://cigarbarlist.gourmet.coocan.jp/heiten.html",
                "宮城県のシガーバー住所録 http://chankaz.net/cigarbar/miyagi"
              ]
            }
          ],
          "sources": [
            "食べログ 仙台シガーバー一覧 https://tabelog.com/keywords/%E3%82%B7%E3%82%AC%E3%83%BC%E3%83%90%E3%83%BC/miyagi/C4100/kwdLst/BC01/",
            "Cigar Map（宮城のシガーベニュー） https://www.cigarmap.info/venue.php?id=648",
            "宮城県のシガーバー住所録 http://chankaz.net/cigarbar/miyagi",
            "シガーコネクション シガーバー紹介 https://www.cigar-connection.net/contents/barinfo"
          ]
        },
        {
          "code": "akita",
          "pref": "秋田県",
          "pref_en": "Akita",
          "region": "北海道・東北",
          "prefNote": "秋田県には葉巻専門店は公開情報では確認できず、シガー（葉巻）を扱うのはオーセンティックバー等が中心。現時点で葉巻を用意する店として湯沢市のAquaBar Linden、秋田市のBAR LOGを確認。秋田市川反のダイニングバーISOLAはシガーバーとして知られたが閉店している。秋田市大町・川反の老舗BAR ル・ヴェールは高級バーだが葉巻取扱の有無は公開情報で確認できず（要確認）。",
          "shops": [
            {
              "name": "AquaBar Linden（アクアバーリンデン）",
              "type": "バー（葉巻あり）",
              "area": "湯沢市・湯沢駅周辺",
              "desc": "日本初・東北唯一のネイチャーアクアリウムを展示するオーセンティックバー。銀座で修行したマスターが手掛け、本格カクテルやモルトウイスキー、ワインに加えてシガー（葉巻）も用意している。喫煙可、ノンアルコールカクテルも豊富。",
              "note": "サントリーBAR-NAVIの『シガーが充実しているバー』枠に掲載。食べログ・BAR-NAVIではエリア表記が湯沢／横手と分かれて記載される場合あり（湯沢駅至近）。葉巻の品揃え規模は要確認。",
              "status": "営業",
              "sources": [
                "食べログ AquaBar Linden (店舗ページ) https://tabelog.com/en/akita/A0505/A050502/5006742/",
                "サントリー BAR-NAVI AquaBar Linden (店舗ページ) https://bar-navi.suntory.co.jp/shop/0X00172894/"
              ]
            },
            {
              "name": "BAR LOG（バーログ）",
              "type": "バー（葉巻あり）",
              "area": "秋田市・秋田駅周辺",
              "desc": "秋田駅から徒歩圏（約286m）のバー。ウイスキーや100種以上のオリジナルカクテル、フードが揃うカジュアルな雰囲気で、食べログの『シガーバー』キーワードおよびBAR-NAVIのシガー関連枠に掲載され、葉巻に合うおつまみも提供する。",
              "note": "卓球台のあるカジュアルなバーで、葉巻はメニューの一部との位置づけ。ハバノス等の本格的な品揃えかどうかは要確認。",
              "status": "営業",
              "sources": [
                "食べログ バー ログ BAR LOG (店舗ページ) https://tabelog.com/akita/A0501/A050101/5008336/",
                "サントリー BAR-NAVI BAR LOG (店舗ページ) https://bar-navi.suntory.co.jp/shop/0X00496951/",
                "秋田市公式サイト BAR LOG 紹介 https://www.city.akita.lg.jp/jigyosha/shigaichi-kasseika/1007137/1016562.html"
              ]
            },
            {
              "name": "Dining Bar ISOLA（イゾラ）",
              "type": "シガーバー",
              "area": "秋田市大町・川反",
              "desc": "秋田市大町（川反）にあったダイニングバー。銀座で修行したマスターによる本格カクテルと、川反の夜景を望む開放的な店内が特徴で、シガーバーとして紹介されていた。",
              "note": "現在は閉店。閉店年は公開情報で特定できず。シガーバーリストの閉店情報一覧および地元情報サイトで閉店が確認できる。",
              "status": "閉店（時期不明）",
              "sources": [
                "秋田がいちばん！【閉店】Dining Bar ISOLA（秋田市大町） (地域情報) https://aki-ichi.com/iisola/",
                "シガーバーリスト 閉店情報一覧 (リスト) http://cigarbarlist.gourmet.coocan.jp/heiten.html",
                "食べログ ISOLA イゾラ (店舗ページ) https://tabelog.com/en/akita/A0501/A050101/5000047/"
              ]
            }
          ],
          "sources": [
            "食べログ 秋田 シガーバー キーワード検索 https://tabelog.com/keywords/シガーバー/akita/kwdLst/",
            "サントリー BAR-NAVI 秋田県 シガーが充実しているバー https://bar-navi.suntory.co.jp/search/f__05/p__520/",
            "シガーバーリスト 閉店情報一覧 http://cigarbarlist.gourmet.coocan.jp/heiten.html"
          ]
        },
        {
          "code": "yamagata",
          "pref": "山形県",
          "pref_en": "Yamagata",
          "region": "北海道・東北",
          "prefNote": "山形県で公開情報から確認できる葉巻関連スポットは少数。吸える店としては山形市の東屋BARと鶴岡市のBAR ChiC（いずれもハバナシガー取扱のバー）、物販では高畠町のたばこ店シマクラが中心。ハバノス正規取扱（Casa del Habano等）の専門店は確認できなかった（2026-07-16時点）。",
          "shops": [
            {
              "name": "東屋BAR（ヒガシヤバー / Higashiya Bar）",
              "type": "バー（葉巻あり）",
              "area": "山形市・香澄町（山形駅前）",
              "desc": "山形駅東口から徒歩約2分、香澄町のビル2階にあるオーセンティックバー。ヴィンテージのシングルモルトやオールドボトルなど450本超の洋酒を揃え、ハバナ産シガー（葉巻）も用意している。フレッシュフルーツを使ったカクテルも楽しめる大人向けの落ち着いた空間。",
              "note": "喫煙可。公式サイト・食べログ・BAR-NAVIで葉巻取扱を確認。",
              "status": "営業",
              "sources": [
                "東屋BAR公式サイト http://higashiyabar.com/",
                "食べログ 東屋BAR（山形/バー） https://tabelog.com/en/yamagata/A0601/A060101/6008565/",
                "サントリー BAR-NAVI 山形県 https://bar-navi.suntory.co.jp/search/f__06/"
              ]
            },
            {
              "name": "BAR ChiC（バー シック）",
              "type": "シガーバー",
              "area": "鶴岡市・本町",
              "desc": "鶴岡市本町にある黒を基調とした落ち着いたショットバー。数百種の洋酒・カクテルに加え、ハバナ産シガー（葉巻）を用意しており、シガーの香りとともにカクテルを楽しめる。シェフによるフレンチ＆カジュアル料理や、月1回程度のジャズライブも行われる。",
              "note": "店内全席喫煙可。DRINK & CIGARを掲げる。食べログ・BAR-NAVI・地元グルメサイトで葉巻取扱を確認。",
              "status": "営業",
              "sources": [
                "食べログ BAR ChiC（鶴岡/バー） https://tabelog.com/en/yamagata/A0603/A060302/6003971/",
                "山形どっとこむ BAR ChiC | DRINK & CIGAR http://www.e-yamagata.com/eyamab/0235224958/",
                "サントリー BAR-NAVI BAR ChiC https://bar-navi.suntory.co.jp/shop/0235224958/"
              ]
            },
            {
              "name": "シマクラ（Shimakura）",
              "type": "専門店",
              "area": "東置賜郡高畠町・根岸",
              "desc": "高畠町のたばこ販売店。紙巻たばこのほか、手巻きたばこ（シャグ）、パイプたばこ、シガー（葉巻）、リトルシガー、刻みたばこなどを幅広く扱い、通販にも対応している。地方で葉巻を購入できる数少ない実店舗のひとつ。",
              "note": "吸える場所（バー）ではなく物販店。定休日は水・木曜。ハバノス正規取扱かは要確認。",
              "status": "営業",
              "sources": [
                "シマクラ公式サイト http://www2.jan.ne.jp/~m-shima/",
                "日本国内葉巻販売店一覧（シガーバーリスト） http://cigarbarlist.gourmet.coocan.jp/cigarshop.html"
              ]
            }
          ],
          "sources": [
            "http://higashiyabar.com/",
            "https://tabelog.com/en/yamagata/A0601/A060101/6008565/",
            "https://tabelog.com/en/yamagata/A0603/A060302/6003971/",
            "http://www.e-yamagata.com/eyamab/0235224958/",
            "http://www2.jan.ne.jp/~m-shima/",
            "http://cigarbarlist.gourmet.coocan.jp/cigarshop.html",
            "https://bar-navi.suntory.co.jp/search/f__06/"
          ]
        },
        {
          "code": "fukushima",
          "pref": "福島県",
          "pref_en": "Fukushima",
          "region": "北海道・東北",
          "prefNote": "福島県では郡山市・福島市を中心に葉巻を楽しめる店が点在する。郡山の「シガーバー チャーチル」がウォークインヒュミドールを備えた本格シガーバーとして代表格。福島市にはBAR LIBRARYなど葉巻を置くバーがあるほか、郡山・いわきの街のたばこ店（つたや・大竹商店）で葉巻を購入できる。専門のシガーラウンジや百貨店シガーカウンターは公開情報では確認できず、住所録系リストのみの店（emu・ラトリエ・サラン）は情報が古い可能性があるため要確認。",
          "shops": [
            {
              "name": "シガーバー チャーチル (CIGAR bar CHURCHILL)",
              "type": "シガーバー",
              "area": "郡山市・中町（郡山駅前）",
              "desc": "郡山を代表するシガーバー。ウォークインヒュミドールを備え、キューバ産（ハバノス）を中心に葉巻を販売。シガーカッターやシガー用灰皿も用意され、酒・軽食とともに葉巻を楽しめる「カフェ＆シガーバー」を標榜する。10席ほどの落ち着いた空間。",
              "note": "営業時間PM7:00〜AM5:00、第1・3日曜休。公式サイト・食べログ・ホットペッパー等に現行情報あり。",
              "status": "営業",
              "sources": [
                "カフェ＆シガーバー チャーチル (公式サイト) http://churchill.jmc-japan.com/",
                "食べログ (グルメ) https://tabelog.com/fukushima/A0702/A070201/7010989/",
                "シガーマップ (店舗情報) https://www.cigarmap.info/venue.php?id=690"
              ]
            },
            {
              "name": "BAR LIBRARY (バー ライブラリー)",
              "type": "バー（葉巻あり）",
              "area": "福島市・栄町（福島駅東口近く）",
              "desc": "靴を脱いでくつろぎ、本と葉巻を楽しめる大人の隠れ家バー。カクテルやウイスキーとともにシガーを提供し、店内は喫煙可。9席ほどの落ち着いた空間で、マスターは店名どおりの読書家。",
              "note": "月〜土19:00〜翌2:00、日休。BAR-NAVI・食べログ・公式サイトに現行情報あり。",
              "status": "営業",
              "sources": [
                "BAR-NAVI by SUNTORY (バー情報) https://bar-navi.suntory.co.jp/shop/0X00002666/",
                "食べログ (グルメ) https://tabelog.com/en/fukushima/A0701/A070101/7001110/"
              ]
            },
            {
              "name": "emu (エミュー) ワイン＆シガーバー",
              "type": "バー（葉巻あり）",
              "area": "福島市・陣場町",
              "desc": "福島市中心部にあるワイン＆シガーバー。ワインとともに葉巻を楽しめる店として全国のシガーバーリストに掲載されている。",
              "note": "情報源はシガーバー住所録系リストが中心で、現行の営業状況・葉巻の在庫は未確認。訪問前に要確認。",
              "status": "要確認",
              "sources": [
                "シガーバーリスト日本国内一覧 (葉巻店リスト) http://cigarbarlist.gourmet.coocan.jp/all_txt.html"
              ]
            },
            {
              "name": "L'Atelier Saran (ラトリエ・サラン)",
              "type": "シガーバー",
              "area": "福島市・置賜町",
              "desc": "福島市中心部（置賜町）に所在するとされるシガーバー。複数の葉巻店・シガーバー住所録に掲載されている。",
              "note": "情報源が住所録系リスト中心で情報が古い可能性があり、現行の営業状況は未確認。訪問前に要確認。",
              "status": "要確認",
              "sources": [
                "シガーバーリスト日本国内一覧 (葉巻店リスト) http://cigarbarlist.gourmet.coocan.jp/all_txt.html",
                "シガーバーの住所録 (福島県) http://chankaz.net/cigarbar/fukushima"
              ]
            },
            {
              "name": "つたや（ワイン＆リカー つたや）",
              "type": "バー（葉巻あり）",
              "area": "郡山市・中町（郡山駅周辺）",
              "desc": "郡山市中町の酒販・たばこ店。手巻きたばこ・パイプ・葉巻（シガー）など喫煙具・たばこを幅広く扱い、在庫にない品は取り寄せにも対応するとされる小売店。",
              "note": "地域店舗情報サイトに掲載。葉巻の具体的な品揃えは要確認。",
              "status": "営業",
              "sources": [
                "こおりやま店ナビ (店舗情報) https://koriyama-navi.jp/catalog.php?cd=00120"
              ]
            },
            {
              "name": "大竹商店",
              "type": "専門店",
              "area": "いわき市・内郷綴町",
              "desc": "いわき市内郷綴町のたばこ店。全国タバコショップリーダースクラブ（TLC）加盟の街のたばこ販売店で、紙巻・葉巻（シガー）等を扱うとされる。営業7:00〜18:00、日曜・第3土曜休。",
              "note": "TLC加盟の一般たばこ店。プレミアムシガーの常時在庫状況は要確認。",
              "status": "営業",
              "sources": [
                "TLC 全国タバコショップリーダースクラブ (店舗情報) https://www.tlc-net.co.jp/shop/5225/"
              ]
            }
          ],
          "sources": [
            "葉巻スイタイ 福島県のシガーバー https://ha-maki.com/fukushima/cigar-bar",
            "シガーバーリスト日本国内一覧 http://cigarbarlist.gourmet.coocan.jp/all_txt.html",
            "食べログ 福島 シガーバー https://tabelog.com/keywords/%E3%82%B7%E3%82%AC%E3%83%BC%E3%83%90%E3%83%BC/fukushima/kwdLst/",
            "BAR-NAVI by SUNTORY 福島県のバー https://bar-navi.suntory.co.jp/search/f__07/"
          ]
        }
      ]
    },
    {
      "region": "関東",
      "prefectures": [
        {
          "code": "ibaraki",
          "pref": "茨城県",
          "pref_en": "Ibaraki",
          "region": "関東",
          "prefNote": "茨城県で公開情報から確認できる葉巻の入手先は、日立市の喫煙具専門店「モンペリいなりや」（ドライシガー・外国タバコ中心）と、水戸・土浦・古河・ひたちなか（勝田）などの葉巻を扱うバー数軒。プレミアムシガー（ハバノス）専門店というより、専門タバコ店＋シガーを置くバーが中心。バー各店の葉巻在庫は流動的で、持込可否を含め来店前の確認が無難。",
          "shops": [
            {
              "name": "モンペリ いなりや（有限会社 稲荷屋）",
              "type": "専門店",
              "area": "日立市・多賀町",
              "desc": "葉巻・手巻きタバコ・パイプタバコを常時300種類以上在庫する茨城県随一の喫煙具・タバコ専門店。ドライシガーやミニシガリロを中心にバラ売りも行い、在庫にない製品はカタログからの取り寄せにも対応する。年中無休で営業。",
              "note": "公式サイトが継続更新されており実在・営業を確認。プレミアムシガー（ハバノス）中心というより外国タバコ・ドライシガー系の品揃え。",
              "status": "営業",
              "sources": [
                "モンペリいなりや 公式サイト (専門店) https://www.net1.jway.ne.jp/inariya2011isamu/",
                "モンペリいなりや ドライシガー (専門店) http://www.net1.jway.ne.jp/inariya2011isamu/dry-cigar.html"
              ]
            },
            {
              "name": "Cigar & Cocktails TOSHIZO BAR（トシゾウバー）",
              "type": "シガーバー",
              "area": "土浦市・桜町",
              "desc": "キューバ産を中心とした葉巻を扱うシガー＆カクテルバー。キューバで学んだシガーマネージャー在籍を掲げ、カット・持ち方・吸い方・マナーなど初心者への案内も行う。カウンターとテーブルで約30席の路地裏の隠れ家風の店。",
              "note": "公式サイト（Jimdo）・ぐるなび・食べログに掲載あり。",
              "status": "営業",
              "sources": [
                "トシゾウバー 公式サイト (シガーバー) https://toshizo.jimdofree.com/",
                "楽天ぐるなび TOSHIZO BAR (シガーバー) https://r.gnavi.co.jp/e7164k4u0000/"
              ]
            },
            {
              "name": "bar 虎蔵（TORAZO／バートラゾー）",
              "type": "バー（葉巻あり）",
              "area": "古河市（古河駅西口近く）",
              "desc": "古河駅西口徒歩数分のオーセンティックバー。ウイスキー・テキーラ・カクテルとともに葉巻（シガー）を楽しめるとして、シガーが充実するバーとして紹介されている。キャンドルの灯る落ち着いた雰囲気。",
              "note": "サントリーBAR-NAVI・ぐるなび等に掲載。葉巻の常時在庫状況は来店前に要確認。",
              "status": "営業",
              "sources": [
                "サントリー BAR-NAVI bar 虎蔵 (バー) https://bar-navi.suntory.co.jp/shop/0X00136500/",
                "ぐるなび bar 虎蔵 TORAZO (バー) https://r.gnavi.co.jp/ewtnd1mz0000/"
              ]
            },
            {
              "name": "BAR Fame（フェーム）",
              "type": "シガーバー",
              "area": "ひたちなか市・勝田（共栄町）",
              "desc": "ひたちなか市勝田エリアのシガーバー。葉巻を楽しめる店としてシガーバー系のリスト・ディレクトリに掲載されている。",
              "note": "各種シガーバー住所録に掲載。公開情報が中心で最新の営業・葉巻在庫は要確認。",
              "status": "要確認",
              "sources": [
                "シガーバーの住所録 茨城県 (ディレクトリ) http://chankaz.net/cigarbar/ibaraki",
                "シガーバーリスト関東一覧 (ディレクトリ) http://cigarbarlist.gourmet.coocan.jp/kantou.html"
              ]
            },
            {
              "name": "H's BAR（アッシェ・バー）",
              "type": "バー（葉巻あり）",
              "area": "水戸市・栄町",
              "desc": "水戸市栄町のバー。葉巻（シガー）を扱う店として関東のシガーバー系リストに掲載されている。",
              "note": "ディレクトリ掲載が中心。最新の営業状況・葉巻取扱は要確認。",
              "status": "要確認",
              "sources": [
                "シガーバーの住所録 茨城県 (ディレクトリ) http://chankaz.net/cigarbar/ibaraki",
                "シガーバーリスト関東一覧 (ディレクトリ) http://cigarbarlist.gourmet.coocan.jp/kantou.html"
              ]
            },
            {
              "name": "Bar Bebop（ビバップ／旧 Bar 4cats）",
              "type": "バー（葉巻あり）",
              "area": "水戸市・泉町／大工町",
              "desc": "水戸の繁華街にあるウイスキー・カクテルのバー。かつては葉巻の在庫を持つシガーバーとして紹介され、Instagramでも葉巻仕入れの投稿があったが、近年の口コミには「葉巻の在庫はなく持込推奨」との指摘もある。",
              "note": "葉巻の常時在庫は不確か。持込可否を含め来店前に要確認。旧店名は Bar 4cats。",
              "status": "要確認",
              "sources": [
                "食べログ Bar Bebop (バー) https://tabelog.com/ibaraki/A0801/A080101/8008767/",
                "Instagram bar_bebop 葉巻仕入れ投稿 (店SNS) https://www.instagram.com/bar_bebop/p/CVUHG3EpQTt/"
              ]
            }
          ],
          "sources": [
            "シガーバーの住所録 茨城県 http://chankaz.net/cigarbar/ibaraki",
            "シガーバーリスト関東一覧 http://cigarbarlist.gourmet.coocan.jp/kantou.html",
            "サントリー BAR-NAVI 茨城県シガー https://bar-navi.suntory.co.jp/search/f__08/p__520/",
            "モンペリいなりや 公式サイト https://www.net1.jway.ne.jp/inariya2011isamu/"
          ]
        },
        {
          "code": "tochigi",
          "pref": "栃木県",
          "pref_en": "Tochigi",
          "region": "関東",
          "prefNote": "栃木県の葉巻文化は県都・宇都宮に集中しており、葉巻専門店『シガーハウス ランセロ』を核に、VAL'S BAR・ル・クール・クロエといったシガーバーが点在する。県北の日光・鬼怒川温泉には鬼怒川金谷ホテルのシガーサロンがあり、宿泊とあわせて葉巻を楽しめる。足利・佐野・小山など県南では葉巻専門店・シガーバーは公開情報では確認できなかった（2026-07-16時点）。",
          "shops": [
            {
              "name": "シガーハウス ランセロ（CIGAR HOUSE LANCEROS）",
              "type": "専門店",
              "area": "宇都宮市・東宿郷（ホテルサンシャイン宇都宮1階）",
              "desc": "ウォークインヒュミドールを備えた葉巻専門店。JWA認定シガーアドバイザーを含むスタッフが厳選した銘柄を常時60種類程度そろえ、キューバ産シガーとニカラグア産（パドロンなど）を中心に扱う。パブを併設し、店内での喫煙も可能。",
              "note": "宇都宮のシガー文化の中心的存在。系列のシガーバー『VAL'S BAR』とも関わりがあるとされる。",
              "status": "営業",
              "sources": [
                "シガーハウス ランセロ 公式サイト (専門店) http://www.lanceros.jp/",
                "栃ナビ! CIGAR HOUSE LANCEROS (店舗情報) https://www.tochinavi.net/spot/home/?id=10967",
                "Cigar Map シガーハウス ランセロ (店舗情報) https://www.cigarmap.info/venue.php?id=183"
              ]
            },
            {
              "name": "VAL'S BAR（ヴァルズ バー）",
              "type": "シガーバー",
              "area": "宇都宮市・二荒町（釜川沿い）",
              "desc": "看板を出さない隠れ家的なシガーバー。ウォークインヒュミドールにコイーバ、ロメオ、パンチ、モンテ、ボリバルといったキューバ産を中心に、ニカラグア産（パドロン）なども備える。マスターの葉巻知識が豊富で、酒とのペアリング提案も受けられる。",
              "note": "シガーハウス ランセロと関わりがあるとされる。",
              "status": "営業",
              "sources": [
                "食べログ VAL'S BAR (バー) https://tabelog.com/tochigi/A0901/A090101/9002285/",
                "ぐるなび VAL'S BAR (バー) https://r.gnavi.co.jp/csj1hk9g0000/"
              ]
            },
            {
              "name": "Bar Le Coeur（バー ル・クール）",
              "type": "シガーバー",
              "area": "宇都宮市・元今泉（JR宇都宮駅東口から徒歩約10分）",
              "desc": "葉巻を扱う宇都宮のバー。ワインやカクテルとともにシガーを楽しめる大人向けの店で、公式サイトにシガー専用ページを設けている。",
              "note": "",
              "status": "営業",
              "sources": [
                "Bar Le Coeur 公式サイト シガーページ (バー) https://barlecoeur.com/cigar.php",
                "Bar Le Coeur 公式サイト (バー) https://barlecoeur.com/"
              ]
            },
            {
              "name": "BAR CHLOE（バー クロエ）",
              "type": "シガーバー",
              "area": "宇都宮市中心部",
              "desc": "「大人は静かに、恋人たちはゆっくりと」をコンセプトにしたシガーバー。公式サイトにシガー専用ページがあり、葉巻の入荷情報も発信している。ランチ営業（ガレット・カレー）も行う。",
              "note": "InstagramやSNSで葉巻の入荷を告知しており活動を確認できる。定休日は日曜。",
              "status": "営業",
              "sources": [
                "BAR CHLOE 公式サイト シガーページ (バー) https://gallery-chloe.com/cigar.php",
                "BAR CHLOE 公式サイト (バー) https://gallery-chloe.com/"
              ]
            },
            {
              "name": "鬼怒川金谷ホテル シガーサロン（KINUGAWA KANAYA HOTEL Cigar Salon）",
              "type": "ホテルラウンジ",
              "area": "日光市・鬼怒川温泉",
              "desc": "ホテル創業者・金谷善治（ジョン金谷）の葉巻好きに由来するシガーサロン。ダビドフ銀座から仕入れたドミニカ産・ニカラグア産のプレミアムシガー（ダビドフ、グリフィン、カマチョ等）を、初心者向けから上級者向けまで用意。レザーソファやアンティーク家具、ジャズが流れる大人の空間。",
              "note": "宿泊者向けの上質なラウンジ。宇都宮以外で葉巻を楽しめる数少ない施設。",
              "status": "営業",
              "sources": [
                "鬼怒川金谷ホテル 公式サイト シガーサロン (ホテル) https://kinugawakanaya.com/en/cigar_salon/",
                "鬼怒川金谷ホテル KANAYA PREMIUM シガー特集 (ホテル) https://kinugawakanaya.com/premium/issue23/"
              ]
            }
          ],
          "sources": [
            "シガーハウス ランセロ 公式サイト http://www.lanceros.jp/",
            "Bar Le Coeur 公式サイト https://barlecoeur.com/cigar.php",
            "BAR CHLOE 公式サイト https://gallery-chloe.com/cigar.php",
            "食べログ VAL'S BAR https://tabelog.com/tochigi/A0901/A090101/9002285/",
            "鬼怒川金谷ホテル シガーサロン https://kinugawakanaya.com/en/cigar_salon/",
            "chankaz.net 栃木県のシガーバー http://chankaz.net/cigarbar/tochigi"
          ]
        },
        {
          "code": "gunma",
          "pref": "群馬県",
          "pref_en": "Gunma",
          "region": "関東",
          "prefNote": "群馬県では葉巻を買える専門店として高崎市のVon Klaren高崎店（ウォークインヒュミドール併設）が中心。バー系は高崎（Bar Misty、Bar&Co.）と前橋（21house）にシガーを扱う店が点在する。県全体で店舗数は限られ、専門シガーバーは高崎に集まる傾向。",
          "shops": [
            {
              "name": "Von Klaren 高崎店（フォンクラーレン）",
              "type": "専門店",
              "area": "高崎市・上中居町",
              "desc": "手巻きたばこ・パイプ・葉巻・シガレット・Zippo等を扱うたばこ専門店。ガラス張りのウォークインヒュミドールを常設し、葉巻を良好な状態で保管・販売している。埼玉県行田市の本店の高崎支店として開業。",
              "note": "営業時間の目安は11:00〜21:00、木曜休の情報あり（要現地確認）。",
              "status": "営業",
              "sources": [
                "VonKlaren 高崎店 (公式) https://vonklaren.com/shop/takasaki/",
                "たかさき通信 (地域情報/開業記事) https://takasaki2shin.com/archives/9759031.html"
              ]
            },
            {
              "name": "Bar Misty（バーミスティ）",
              "type": "シガーバー",
              "area": "高崎市・砂賀町（高崎駅西口 徒歩約3分）",
              "desc": "シングルモルトを中心とした品揃えにシガーを揃えるオーセンティックバー。大きなコの字型カウンターとジャズが流れる大人の社交場で、初心者にも葉巻を勧めてくれる。営業は夜〜深夜帯（18:00〜翌4:00、日曜休の情報あり）。",
              "note": "",
              "status": "営業",
              "sources": [
                "Bar-Misty (公式) http://www.bar-misty.sakura.ne.jp/smart/menu.html",
                "BAR-NAVI (サントリー) https://bar-navi.suntory.co.jp/shop/0X00163219/"
              ]
            },
            {
              "name": "Bar&Co.（バーカンパニー）",
              "type": "バー（葉巻あり）",
              "area": "高崎市・銀座通り（高崎駅近く）",
              "desc": "高崎駅近く銀座通りのオーセンティックバー。「Cofee&Cigar 珈琲と葉巻」を掲げ、コーヒーとともに葉巻を提供する。希少な酒や季節のフレッシュフルーツカクテルも扱い、カウンター中心の落ち着いた雰囲気。",
              "note": "",
              "status": "営業",
              "sources": [
                "Bar&Co. (公式) https://www.barcompany.jp/cofee.php",
                "食べログ https://tabelog.com/en/gunma/A1001/A100102/10008219/"
              ]
            },
            {
              "name": "21house 前橋Bar",
              "type": "バー（葉巻あり）",
              "area": "前橋市・城東町",
              "desc": "30年以上続く老舗バー。ウイスキー約300種・シングルモルト約100種・ブランデー約60種・オリジナルカクテル多数を揃え、シガー（葉巻）も楽しめる。品揃えの豊富さが特徴。",
              "note": "",
              "status": "営業",
              "sources": [
                "21house 前橋Bar (公式) http://bar21house.com/event4.html"
              ]
            },
            {
              "name": "シエンジロリン村 本店",
              "type": "専門店",
              "area": "太田市・高林寿町",
              "desc": "手巻きたばこ・シャグ・Zippo・ライター・喫煙具などを扱うたばこ専門店（通販併設）。葉巻・シガーの実店舗常時在庫は公開情報からは明確でなく、手巻きたばこ・小物中心の品揃えとみられる。",
              "note": "葉巻（プレミアムシガー）の常設取扱は要確認。",
              "status": "要確認",
              "sources": [
                "シエンジロリン村 (公式) https://www.jirorinmura.jp/html/company.html"
              ]
            }
          ],
          "sources": [
            "シガーショップの住所録 群馬県 http://chankaz.net/cigarshop/gunma",
            "葉巻スイタイ 群馬県のシガーバー一覧 https://ha-maki.com/gunma/cigar-bar",
            "シガーバーリスト 関東一覧 http://cigarbarlist.gourmet.coocan.jp/kantou.html",
            "BAR-NAVI 群馬県 シガーが充実 https://bar-navi.suntory.co.jp/search/f__10/p__520/",
            "VonKlaren 高崎店 https://vonklaren.com/shop/takasaki/"
          ]
        },
        {
          "code": "saitama",
          "pref": "埼玉県",
          "pref_en": "Saitama",
          "region": "関東",
          "prefNote": "葉巻を楽しめる店は大宮エリア（さいたま市大宮区）に集中し、ハングオーバー・BAR Feliz・THE BAR ALCAZARなどキューバ産シガーを揃えるバーが複数ある。専門店としては大宮のたばこ&ZIPPOふじさわ、和光市のきゃびん館が葉巻を販売。南浦和・川越にも葉巻を扱うバーがあるが、熊谷など県北部は公開情報が乏しく要確認。",
          "shops": [
            {
              "name": "ハングオーバー (hang O' Bar)",
              "type": "シガーバー",
              "area": "さいたま市大宮区・大宮駅西口",
              "desc": "大宮駅西口徒歩5分の隠れ家的オーセンティックバー。300種以上のウイスキーやカクテルに加え、15種ほどのシガーを常備し、店内で喫煙できる。葉巻の持ち込みも可。",
              "note": "",
              "status": "営業",
              "sources": [
                "ハングオーバー公式 (店舗サイト) http://hang-o-bar.com/cigar.html",
                "ホットペッパーグルメ (グルメ媒体) https://www.hotpepper.jp/strJ000797901/",
                "食べログ (グルメ媒体) https://tabelog.com/en/saitama/A1101/A110101/11000141/"
              ]
            },
            {
              "name": "BAR Feliz (バー フェリーズ)",
              "type": "シガーバー",
              "area": "さいたま市大宮区・大宮駅東口",
              "desc": "大宮駅東口徒歩2分のラム＆カクテル専門バー。世界各国のラム300種超を主軸にウイスキー・ポートワイン等を揃え、70種類ほどのキューバ産シガー（ハバノス）を常備する。",
              "note": "",
              "status": "営業",
              "sources": [
                "サントリー BAR-NAVI (媒体) https://bar-navi.suntory.co.jp/shop/S000003105/",
                "食べログ (グルメ媒体) https://tabelog.com/en/saitama/A1101/A110101/11031939/",
                "Facebook 公式 (店舗SNS) https://www.facebook.com/BARFeliz714/"
              ]
            },
            {
              "name": "THE BAR ALCAZAR (ザ バー アルカサル)",
              "type": "シガーバー",
              "area": "さいたま市大宮区・大宮駅東口",
              "desc": "2012年開業、大宮駅東口徒歩3分。アンティーク調の落ち着いた空間でモルトウイスキーやクラシックカクテルを楽しめ、キューバ産シガーを揃えて店内喫煙が可能。",
              "note": "",
              "status": "営業",
              "sources": [
                "THE BAR ALCAZAR 公式 (店舗サイト) https://bar-alcazar.com/",
                "サントリー BAR-NAVI (媒体) https://bar-navi.suntory.co.jp/shop/0X00251406/",
                "食べログ (グルメ媒体) https://tabelog.com/en/saitama/A1101/A110101/11029164/"
              ]
            },
            {
              "name": "Bar Revelstoke (レベルストック) 南浦和店",
              "type": "シガーバー",
              "area": "さいたま市南区・南浦和駅東口",
              "desc": "JR南浦和駅東口徒歩6分、住宅街の小さなオーセンティックバー。300種超のモルトウイスキーとカクテルを揃え、ハバナシガーを常時10種前後（おおむね500〜2,500円）取り扱う。",
              "note": "",
              "status": "営業",
              "sources": [
                "Bar Revelstoke 公式 (店舗サイト) https://www.revelstoke.jp/cigar.php",
                "食べログ (グルメ媒体) https://tabelog.com/en/saitama/A1101/A110102/11002379/"
              ]
            },
            {
              "name": "BEER SAURUS TUSK (ビアザウルス タスク)",
              "type": "バー（葉巻あり）",
              "area": "川越市菅原町・川越駅東口",
              "desc": "川越駅東口徒歩2分、洞窟をイメージしたオーセンティックバー。世界の銘酒やレアなウイスキー・ブランデー、フレッシュフルーツカクテルに加え、川越では珍しくシガーも常備する。",
              "note": "月曜定休。",
              "status": "営業",
              "sources": [
                "BEER SAURUS TUSK 公式 (店舗サイト) https://beersaurus.net/tusk/",
                "川越マガジン (地域情報媒体) https://kawagoe.fun/magazine/gourmet/bar/"
              ]
            },
            {
              "name": "タバコ&ZIPPO ふじさわ (DOMショッピングセンター店)",
              "type": "専門店（たばこ販売）",
              "area": "さいたま市大宮区桜木町・大宮駅西口 DOM内",
              "desc": "JR大宮駅西口徒歩1分、DOMショッピングセンター2Fのたばこ・喫煙具専門店。国産・外国たばこ約250種に加え、葉巻・パイプ・手巻きたばこ、ZIPPOやライターを幅広く扱う。",
              "note": "販売中心の店舗（喫煙スペースの有無は要確認）。",
              "status": "営業",
              "sources": [
                "おおみやマップ (地域情報媒体) http://omiya-map.jp/guidmap/detail.php?id=226",
                "マイタウンさいたま/amatias (媒体) http://www.amatias.com/asp/navi.asp?s_code=S0002151"
              ]
            },
            {
              "name": "cigarettes & coffee きゃびん館",
              "type": "専門店（カフェ併設）",
              "area": "和光市白子",
              "desc": "和光市白子で約30年続くたばこ店兼カフェ。紙巻約280種のほか、ドライシガー約80種・プレミアムシガー約22種、パイプたばこ約50種を扱い、コーヒーや紅茶を飲みながら一服できる。",
              "note": "",
              "status": "営業",
              "sources": [
                "cigarettes & coffee きゃびん館 公式 (店舗サイト) https://www.cabinkan.com/",
                "シガーマップ (葉巻施設DB) https://www.cigarmap.info/venue.php?id=717"
              ]
            },
            {
              "name": "BAR 畠中 (バー はたなか)",
              "type": "シガーバー",
              "area": "熊谷市宮町",
              "desc": "シガーバー系ディレクトリに熊谷のシガーバーとして掲載されている店。旧名「ラミ・デュ・ヴァン・セント・ジェームズ」とされる。公式情報や現行の営業情報を独自に確認できなかった。",
              "note": "食べログ・BAR-NAVI等で独立確認できず。営業実態・葉巻取扱は要確認。",
              "status": "要確認",
              "sources": [
                "シガーバーの住所録 chankaz (葉巻店ディレクトリ) http://chankaz.net/cigarbar/saitama",
                "シガーバーリスト関東 (葉巻店ディレクトリ) http://cigarbarlist.gourmet.coocan.jp/kantou.html"
              ]
            }
          ],
          "sources": [
            "サントリー BAR-NAVI 埼玉県シガー特集 https://bar-navi.suntory.co.jp/search/f__11/p__520/",
            "ext-pm 大宮で葉巻が吸えるBAR3選 https://ext-pm.jp/2023/04/03/",
            "シガーマップ (葉巻施設DB) https://www.cigarmap.info/venue.php?id=717",
            "食べログ 埼玉 シガーバー https://tabelog.com/keywords/%E3%82%B7%E3%82%AC%E3%83%BC%E3%83%90%E3%83%BC/saitama/kwdLst/BC0101/"
          ]
        },
        {
          "code": "chiba",
          "pref": "千葉県",
          "pref_en": "Chiba",
          "region": "関東",
          "prefNote": "千葉県は葉巻「専門店」は少なく、シガーを楽しめる場所はバー併設型が中心。舞浜イクスピアリのトルセドール、千葉中央のダンディライオン、船橋・市川・柏のオーセンティックバーが実質的な受け皿となっている。物販は八千代台のけむたいや、柏のたばこ屋も～り等のたばこ・喫煙具店でプレミアシガーが入手できる。",
          "shops": [
            {
              "name": "トルセドール（Torcedor）",
              "type": "シガーバー",
              "area": "浦安市・舞浜（イクスピアリ4F）",
              "desc": "JR舞浜駅前イクスピアリ4Fにある英国テイストのシガーバー。ウォークインヒュミドールでシガーを管理し、ハバノス（キューバ）を含む葉巻とジャパニーズウイスキーや世界のスピリッツを楽しめる。隣接店のステーキ等の料理も提供する落ち着いた大人向けの空間。",
              "note": "クリエイト・レストランツ系列の店舗。",
              "status": "営業",
              "sources": [
                "イクスピアリ公式 (施設ガイド) https://www.ikspiari.com/gourmet/shops/2422/",
                "トルセドール公式 (店舗サイト) https://shop.create-restaurants.co.jp/0917/",
                "食べログ (店舗ページ) https://tabelog.com/en/chiba/A1202/A120203/12000578/"
              ]
            },
            {
              "name": "ダンディライオン バー（DANDYLION BAR）",
              "type": "シガーバー",
              "area": "千葉市中央区・千葉中央（富士見）",
              "desc": "千葉中央駅前、扉一枚で喧騒から離れる落ち着いたオーセンティックバー。マスターが独自ルートで仕入れる希少なウイスキーを揃え、一枚板のカウンターとレザーソファ席を備える。深夜帯（平日24時以降）は葉巻の喫煙もOK。",
              "note": "葉巻は時間帯により可否あり。詳細は要確認。",
              "status": "営業",
              "sources": [
                "DANDYLION BAR公式 (店舗サイト) https://www.dandy-lion.jp/",
                "千葉市観光協会 (公式スポット紹介) https://www.chibacity-ta.or.jp/en/spots/dandy-lion-bar",
                "食べログ (店舗ページ) https://tabelog.com/en/chiba/A1201/A120101/12019633/"
              ]
            },
            {
              "name": "Bar 篠崎（Bar Shinozaki）",
              "type": "バー（葉巻あり）",
              "area": "船橋市・京成船橋（本町）",
              "desc": "京成船橋駅前のオーセンティックバー。480種以上の洋酒や季節のフレッシュフルーツカクテルが看板。ニカラグア・ドミニカ・キューバ産のシガーを取り扱い、ウォークインヒュミドールやカッター等の設備も備える。",
              "note": "シガーマップにキューバ／ノンキューバ取扱店として登録。",
              "status": "営業",
              "sources": [
                "Bar篠崎公式 (店舗サイト) https://www.barshinozaki.com/",
                "まいぷれ船橋 (店舗ニュース・シガー取扱) https://funabashi.mypl.net/shop/00000344829/news?d=854890",
                "Cigar Map (店舗登録) https://www.cigarmap.info/venue.php?id=1069"
              ]
            },
            {
              "name": "Bar Old Flame（オールドフレーム）",
              "type": "バー（葉巻あり）",
              "area": "市川市・市川（市川駅南口）",
              "desc": "JR市川駅南口から徒歩約2分の隠れ家的バー。市川で数少ないコニャックに強い店で、約150種のコニャックコレクションを揃える。キューバ産シガー（葉巻）も提供し、大人の贅沢な時間を過ごせる。",
              "note": "",
              "status": "営業",
              "sources": [
                "食べログ (店舗ページ) https://tabelog.com/en/chiba/A1202/A120202/12025019/",
                "Bar Old Flame公式 (店舗サイト) http://r.goope.jp/bar-old-flame/"
              ]
            },
            {
              "name": "Bar Plat（バー プラット）",
              "type": "バー（葉巻あり）",
              "area": "柏市・柏（やまもとビル2F）",
              "desc": "柏駅近くのバー。全19席（カウンター11席＋テーブル）で、葉巻（シガー）に関する情報発信も行うシガーに理解のある店。キューバ・ドミニカ・ニカラグア産など葉巻を楽しめる。",
              "note": "月〜土19:00〜2:00、日祝17:00〜24:00営業（情報は要再確認）。",
              "status": "営業",
              "sources": [
                "おいでよ！カシワニ (柏市インフォメーション協会・葉巻紹介記事) https://kashiwainfo.net/201809011kutsurogino_bar1barplat/",
                "食べログ (店舗ページ) https://tabelog.com/en/chiba/A1203/A120301/12007396/",
                "ぐるなび (店舗ページ) https://r.gnavi.co.jp/c0u3nfsw0000/"
              ]
            },
            {
              "name": "けむたいや（ユアエルム八千代台店）",
              "type": "専門店（たばこ・喫煙具、葉巻取扱）",
              "area": "八千代市・八千代台（ユアエルム八千代台 1F）",
              "desc": "ユアエルム八千代台の1Fにある世界のたばこ・喫煙具の専門店。紙巻たばこ約350種に加え、パイプたばこ・葉巻（シガー）・シャグ・スヌースなどを取り扱い、ライターやケースなどの喫煙具も揃える。",
              "note": "商業施設内テナントのため営業時間は施設に準ずる。",
              "status": "営業",
              "sources": [
                "ユアエルム八千代台店公式 (ショップガイド) https://www.yourelm.co.jp/yachiyodai/shop/detail.html?UC=113"
              ]
            },
            {
              "name": "たばこ屋も～り（もーり）",
              "type": "専門店（たばこ・喫煙具、プレミアシガー取扱）",
              "area": "柏市・柏",
              "desc": "柏で本格的にパイプ葉・シガー・手巻きタバコの葉を揃えた老舗系のたばこ専門店。ミニシガリロから、キューバ産・ドミニカ産などの有名ブランドの本格プレミアシガーまで取り扱う。",
              "note": "",
              "status": "営業",
              "sources": [
                "まいぷれ柏 (店舗紹介) https://kashiwa.mypl.net/shop/00000019387/"
              ]
            },
            {
              "name": "杉山商店",
              "type": "専門店（たばこ販売、葉巻取扱の可能性）",
              "area": "船橋市・本町",
              "desc": "シガーショップ住所録に千葉県の葉巻取扱店として掲載されている船橋市本町のたばこ店。品揃えや現在の営業状況は公開情報からは確認しきれない。",
              "note": "シガーショップ住所録（chankaz.net）掲載情報に基づく。現況・葉巻在庫は要確認。",
              "status": "要確認",
              "sources": [
                "シガーショップの住所録 千葉県 (店舗一覧) http://chankaz.net/cigarshop/chiba"
              ]
            }
          ],
          "sources": [
            "Suntory BAR-NAVI 千葉県シガー特集 https://bar-navi.suntory.co.jp/search/f__12/p__520/",
            "食べログ シガーバー（千葉） https://tabelog.com/keywords/%E3%82%B7%E3%82%AC%E3%83%BC%E3%83%90%E3%83%BC/chiba/kwdLst/BC01/",
            "シガーショップの住所録 千葉県 http://chankaz.net/cigarshop/chiba"
          ]
        },
        {
          "code": "tokyo",
          "pref": "東京都",
          "pref_en": "Tokyo",
          "region": "関東",
          "prefNote": "東京都は日本最大の葉巻シーンを持ち、西麻布・銀座・有楽町・赤坂・表参道・渋谷・新宿などに専門店とシガーバーが集中する。ハバノス公式のCOHIBA ATMOSPHERE、老舗専門店（プラセール1951年、銀座菊水1903年）、会員制シガーバー等が揃う。アグリゲーターサイトでは都内に200軒超のシガー可バーが掲載され、本リストは実在・出典を確認できた主要店に絞っている。",
          "shops": [
            {
              "name": "COHIBA ATMOSPHERE TOKYO（コイーバ・アトモスフィア東京）",
              "type": "専門店（バー併設）",
              "area": "港区・西麻布",
              "desc": "キューバ葉巻公社ハバノス（Habanos S.A.）の公式フランチャイズショップで、日本では唯一のCOHIBA ATMOSPHERE。ハバノスシガーの購入に加え、店内バーで葉巻を吸いながらドリンクや料理を楽しめる。コンセプトは4C（Cigar・Coffee・Chocolate・Champagne）で、テラス席やVIPルームもある。",
              "note": "系列に「COHIBA ATMOSPHERE 霞町（Kasumicho）」の掲載もあり、区別・現況は要確認。",
              "status": "営業",
              "sources": [
                "COHIBA ATMOSPHERE TOKYO 公式サイト (公式) https://cohiba-atmosphere.jp/"
              ]
            },
            {
              "name": "HABANA VEGAS（ハバナベガス）",
              "type": "専門店（バー併設）",
              "area": "港区・西麻布",
              "desc": "2014年開業の会員制シガーバー兼シガーショップ。オーナーが月に一度キューバへ渡り選定した150種類以上のシガーを扱う。2階は会員制シガーバー、1階はカジュアルな立ち飲みシガーバー兼ショップ。シガーバンク（保管サービス）もある。",
              "note": "会員制だが会員同伴で非会員も利用可とされる。",
              "status": "営業",
              "sources": [
                "HabanaVegas 公式サイト (公式) https://www.habanavegas.com/home",
                "HABANA VEGAS - Wikipedia (百科) https://ja.wikipedia.org/wiki/HABANA_VEGAS"
              ]
            },
            {
              "name": "シガーバー シャドネィ（Cigar Bar Chardonnay）",
              "type": "シガーバー",
              "area": "渋谷区・神宮前／表参道",
              "desc": "1997年に表参道にオープンした老舗シガーバー。150種類以上のシガーを扱い、レトロで落ち着いた大人の雰囲気。昼はカフェ営業（12:00〜18:00）、夜はバー営業（18:00〜深夜）で、深煎りコーヒーとの相性が人気。ビリヤードもある。葉巻のみの購入も可。",
              "note": "",
              "status": "営業",
              "sources": [
                "原宿表参道オフィシャルサイト (地域公式) https://omotesando.or.jp/shop/31/",
                "食べログ (口コミ) https://tabelog.com/tokyo/A1306/A130601/13001189/"
              ]
            },
            {
              "name": "喫煙具専門店 kagaya 有楽町（カガヤ）",
              "type": "専門店",
              "area": "千代田区・有楽町",
              "desc": "2021年開業の喫煙具・葉巻専門店（フカシロ運営）。東京交通会館B1F、JR有楽町駅前。喫煙具を中心に、欧米で高評価のシガー各種銘柄を取り揃え、オリジナルコーヒーや洋酒、ヴィンテージ雑貨も扱う。",
              "note": "",
              "status": "営業",
              "sources": [
                "フカシロ 会社案内 kagaya有楽町 (公式) https://fukashiro.com/company-profile/outline/kagaya-yurakucho.html",
                "kagaya-smokeweb (公式) https://www.kagaya-smokeweb.com/"
              ]
            },
            {
              "name": "銀座菊水（GINZA KIKUSUI）",
              "type": "専門店",
              "area": "中央区・銀座",
              "desc": "1903年創業のパイプ・煙草・喫煙具専門の老舗。パイプの品揃えに定評があり常時1200本ほど、ダンヒル製パイプが豊富。ライターや葉巻など喫煙関連を幅広く扱う。銀座駅A2出口徒歩3分。",
              "note": "パイプ・喫煙具が主力。葉巻の取扱銘柄は要確認。",
              "status": "営業",
              "sources": [
                "銀座菊水 公式サイト (公式) https://www.ginza-kikusui.com/shop.html"
              ]
            },
            {
              "name": "世界のたばこ プラセール（Placer）",
              "type": "専門店",
              "area": "港区・赤坂（赤坂見附）",
              "desc": "1951年創業のたばこ・喫煙具専門店。キューバ・ドミニカ・ホンジュラス・ニカラグア・コスタリカ産などプレミアム／ドライシガー600種類以上を常時最適管理で在庫。紙巻・パイプ・手巻・スナッフなど各種たばこも扱う。赤坂見附駅徒歩1分。",
              "note": "",
              "status": "営業",
              "sources": [
                "世界のたばこ プラセール 公式サイト (公式) http://www.placer.co.jp/",
                "プラセール 店舗案内 (公式) http://www.placer.co.jp/shop_info.html"
              ]
            },
            {
              "name": "cigar club（シガークラブ／ウェスティンホテル東京）",
              "type": "専門店",
              "area": "目黒区・恵比寿（恵比寿ガーデンプレイス）",
              "desc": "ウェスティンホテル東京内のシガーショップ。輸入葉巻（ハバナシガー）を温度・湿度管理のもと販売し、店内には葉巻とハードリカーを楽しめるスペースがある。営業11:00〜20:00。",
              "note": "ハバナシガーの正規取扱を掲げる。",
              "status": "営業",
              "sources": [
                "cigar club 公式サイト (公式) https://www.cigarclub.co.jp/",
                "恵比寿ガーデンプレイス 店舗詳細 (施設公式) https://gardenplace.jp/shop/detail/93"
              ]
            },
            {
              "name": "cigar bar escape（シガーバー エスケープ）",
              "type": "シガーバー",
              "area": "新宿区・新宿三丁目",
              "desc": "新宿三丁目駅徒歩3分のシガーバー。プレミアムキューバ産シガーを揃え、葉巻とドリンクのマリアージュを楽しめる隠れ家的ラウンジ。2025年末時点でキューバ産シガーの入荷が続き営業中。",
              "note": "",
              "status": "営業",
              "sources": [
                "cigar bar escape 公式サイト (公式) https://cigar-bar-escape.com/"
              ]
            },
            {
              "name": "シガーバー R261 CIGAR & ROCK（セルリアンタワー東急ホテル）",
              "type": "ホテルラウンジ",
              "area": "渋谷区・桜丘（渋谷）",
              "desc": "セルリアンタワー東急ホテル2階のシガーバー。ロック・繰り返し（Repeat）・艶（Rouge）をコンセプトに、赤基調の照明と壁一面のレコード・スピーカー、ロックミュージックが特徴。シガーとカクテルを楽しめる大人の空間で18席。",
              "note": "",
              "status": "営業",
              "sources": [
                "セルリアンタワー東急ホテル R261公式 (施設公式) https://www.tokyuhotels.co.jp/en/cerulean-h/restaurant/r261/index.html",
                "一休コンシェルジュ (紹介記事) https://www.ikyu.com/concierge/51957"
              ]
            },
            {
              "name": "BAR IRIE（バー アイリー）",
              "type": "シガーバー",
              "area": "渋谷区・渋谷",
              "desc": "渋谷にある葉巻が吸える大人のシガーバー。葉巻とカクテル・スピリッツを落ち着いた雰囲気で楽しめる。",
              "note": "詳細な品揃え・現況は公式サイトで要確認。",
              "status": "要確認",
              "sources": [
                "BAR IRIE 公式サイト (公式) https://bar-irie.com/"
              ]
            }
          ],
          "sources": [
            "Cigarino 葉巻はどこで買える (専門メディア) https://cigarino.tokyo/cigar/cigar-dealers/",
            "SeeingJapan 東京のおすすめシガーバー5選 (紹介記事) https://seeing-japan.com/19762",
            "葉巻スイタイ 東京のシガーバー (アグリゲーター) https://ha-maki.com/tokyo/cigar-bar",
            "BAR-NAVI(サントリー) 東京都シガー充実バー (アグリゲーター) https://bar-navi.suntory.co.jp/search/f__13/p__520/"
          ]
        },
        {
          "code": "kanagawa",
          "pref": "神奈川県",
          "pref_en": "Kanagawa",
          "region": "関東",
          "prefNote": "横浜（関内・馬車道・吉田町・元町・みなとみらい）と川崎に葉巻取扱店・シガーバーが集中する。元町のヒュミドール スギシマや川崎の三島商店など温湿度管理の行き届いた老舗専門店があり、関内周辺にはキューバ葉巻を扱う本格シガーバーが複数営業している。個店の在庫・営業時間は変動するため訪問前の確認を推奨。",
          "shops": [
            {
              "name": "ヒュミドール スギシマ（Humidor Sugishima）",
              "type": "専門店",
              "area": "横浜市中区・元町",
              "desc": "元町商店街にある老舗たばこ専門店。店名の通り杉材で作られたウォークイン・ヒュミドールを備え、世界各地のプレミアムシガーを湿度管理して販売する。紙巻・葉巻・パイプ・嗅ぎたばこなど約1200種を扱い、県内外から愛好家が訪れる。",
              "note": "住所は横浜市中区元町3-115付近。定休日月曜との情報。",
              "status": "営業",
              "sources": [
                "Smith Corporation (取扱店紹介) https://smithcorp.jp/introduce-store/2015/08/6944/",
                "NAVITIME (店舗情報) https://www.navitime.co.jp/poi?spot=02022-1067348"
              ]
            },
            {
              "name": "岸商店（岸たばこ店）",
              "type": "専門店",
              "area": "横浜市西区・横浜駅周辺",
              "desc": "横浜駅近くのたばこ専門店。店内奥に大型ヒュミドールを設置し、葉巻やドライシガー、手巻き、パイプなどを扱う。管理が行き届いており葉巻を安心して購入できる。",
              "note": "営業時間は月〜土10:00〜19:00、日祝定休との情報。",
              "status": "営業",
              "sources": [
                "Smith Corporation (取扱店紹介) https://smithcorp.jp/introduce-store/2015/08/6935/",
                "岸商店 X(公式) https://x.com/kishitabakoten"
              ]
            },
            {
              "name": "黒川商店",
              "type": "専門店",
              "area": "横浜市鶴見区・駒岡",
              "desc": "横浜市鶴見区のタバコ・葉巻専門店。葉巻たばこ・シガリロを含むマニアックな品揃えで知られ、公式サイトから通販も行う。",
              "note": "駅からは距離があり車利用が便利。通販対応。",
              "status": "営業",
              "sources": [
                "黒川商店 公式サイト https://kurokawa1.jp/",
                "黒川商店 葉巻一覧 https://kurokawa1.jp/tabaco_d01.html"
              ]
            },
            {
              "name": "世界のたばこ専門店 三島商店",
              "type": "専門店",
              "area": "川崎市川崎区・砂子",
              "desc": "川崎駅東口徒歩4分の本格たばこ専門店。世界1200種類以上のたばこを扱い、葉巻や刻み・パイプたばこも取り扱う。温度18℃・湿度70%で品質管理を行う。",
              "note": "営業は平日中心（土日祝定休との情報）。テレビ番組でも紹介。",
              "status": "営業",
              "sources": [
                "商店街に行こう！in かながわ https://www.shotengai-kanagawa.com/shop/kawasaki/k-kawasaki/shop696.html",
                "エキテン (店舗情報) https://www.ekiten.jp/shop_65339487/"
              ]
            },
            {
              "name": "たばこ専門店ニコニコ屋",
              "type": "専門店",
              "area": "横浜市金沢区・金沢文庫",
              "desc": "金沢文庫駅東口すぐのたばこ専門店。国産・外国産の紙巻、葉巻、手巻き、刻み、パイプたばこ、喫煙具など専門店ならではの品揃え。",
              "note": "所在する金沢文庫すずらん通り商店街に関する情報あり。葉巻の在庫状況は要確認。",
              "status": "要確認",
              "sources": [
                "金沢文庫すずらん通り商店街 (店舗紹介) https://bunko-suzuran.com/shop/%E3%83%8B%E3%82%B3%E3%83%8B%E3%82%B3%E5%B1%8B/"
              ]
            },
            {
              "name": "光煙（Kohien）",
              "type": "専門店",
              "area": "横浜市中区・関内",
              "desc": "横浜・関内の手巻きたばこ・葉巻・喫煙具などを扱う専門店。葉巻やガラスパイプなど幅広い品を取り扱う。",
              "note": "公式サイト(kohien.com)で商品情報を掲載。詳細な在庫は要確認。",
              "status": "要確認",
              "sources": [
                "光煙 公式サイト https://kohien.com/"
              ]
            },
            {
              "name": "Bar Super Nova（バー・スーパーノヴァ）",
              "type": "シガーバー",
              "area": "横浜市中区・関内／馬車道",
              "desc": "自家製インフュージョン・スピリッツのカクテルと葉巻を楽しめる本格シガーバー。キューバ産プレミアムシガーを中心に常時20種前後を揃え、葉巻の香りが漂う落ち着いた大人の空間。関内駅・馬車道駅から徒歩数分。",
              "note": "テーブルチャージ300円との情報。",
              "status": "営業",
              "sources": [
                "Bar Super Nova 公式サイト http://www.barsupernova.com/index.html",
                "横濱BARマップ https://www.yokohama-barmap.net/bar/bar-super-nova/"
              ]
            },
            {
              "name": "Grand Noble（グラン ノーブル）",
              "type": "シガーバー",
              "area": "横浜市中区・吉田町／関内",
              "desc": "関内〜馬車道間、吉田町にある本格オーセンティックバー。キューバやドミニカのシガーを扱い、ウイスキー・ブランデー・ラムも豊富。白と黒を基調とした重厚な内装で、葉巻を吸わない人も楽しめる。2017年開業。",
              "note": "Bar Noble系列（株式会社GRAND NOBLE運営）。",
              "status": "営業",
              "sources": [
                "Grand Noble 公式サイト https://noble-aqua.com/bar_grandnoble/",
                "食べログ https://tabelog.com/en/kanagawa/A1401/A140102/14068194/"
              ]
            },
            {
              "name": "シガーバー リスト（Cigar Bar List）",
              "type": "シガーバー",
              "area": "川崎市川崎区・砂子",
              "desc": "川崎駅近くの隠れ家的シガーバー。葉巻を常時70種類以上取り揃え、最大14席・4基の換気扇で煙がこもらない。ウイスキー約260種、ブランデー約210種、ラム約90種など各国の酒も充実。",
              "note": "通常営業18:30〜1:00との情報。",
              "status": "営業",
              "sources": [
                "ホットペッパーグルメ https://www.hotpepper.jp/strJ001162113/",
                "BAR-NAVI(サントリー) https://bar-navi.suntory.co.jp/shop/S000006676/"
              ]
            },
            {
              "name": "横浜ベイホテル東急 バー「ジャックス」（Jacks）",
              "type": "ホテルラウンジ",
              "area": "横浜市西区・みなとみらい",
              "desc": "横浜ベイホテル東急2階の正統派ブリティッシュバー。オーセンティックバーでありながらシガーの品揃えも充実し、店内喫煙可でシガーを味わえる。名バーテンダーのオリジナルカクテルや年代物の銘酒も楽しめる。みなとみらい駅から徒歩約1分。",
              "note": "営業16:00〜24:00。金・土は生演奏あり。",
              "status": "営業",
              "sources": [
                "横浜ベイホテル東急 公式(バー ジャックス) https://ybht.co.jp/restaurant/jacks.php",
                "横浜ベイホテル東急 シガーアイテム案内 https://ybht.co.jp/restaurant/plan/restfair0005.php"
              ]
            }
          ],
          "sources": [
            "食べログ 神奈川シガーバー一覧 https://tabelog.com/keywords/%E3%82%B7%E3%82%AC%E3%83%BC%E3%83%90%E3%83%BC/kanagawa/kwdLst/",
            "Smith Corporation 神奈川たばこ店紹介 https://smithcorp.jp/introduce-store/2016/10/10580/",
            "radi-toko.blog 横浜シガーバー6選 https://radi-toko.com/ciger-bar/",
            "はまれぽ.com 野毛・関内シガーバー https://hamarepo.com/story.php?story_id=3202"
          ]
        }
      ]
    },
    {
      "region": "中部",
      "prefectures": [
        {
          "code": "niigata",
          "pref": "新潟県",
          "pref_en": "Niigata",
          "region": "中部",
          "prefNote": "新潟県で公開情報から確認できる葉巻の入手先は、新潟市中央区の喫煙具・タバコ専門店（テイスト駅南、雅美堂）と、南区でハバノスを扱う酒販店（田舎酒屋こめや）が中心。シガーバーは古町エリアの『英國屋』が代表格で、Bar Σなど葉巻を楽しめるバーも古町に点在する。葉巻検索サイト（葉巻スイタイ）には県内シガーバー6軒が掲載され、長岡市・坂之上町にもシガーバーの掲載があるが同店は閉店表示で店名を確定できず本表からは除外した。地方につき店舗数は多くなく、バーの葉巻在庫・持込可否は流動的なため来店前の確認が無難。",
          "shops": [
            {
              "name": "煙草・喫煙具専門店 テイスト駅南（Taste 駅南）",
              "type": "専門店",
              "area": "新潟市中央区・新潟駅南口（けやき通り）",
              "desc": "新潟駅南口から徒歩数分、けやき通り沿いの煙草・喫煙具専門店。外国タバコ・手巻きタバコ・パイプタバコ・葉巻など450〜500種類を壁一面に取り揃え、葉巻用カッターや灰皿などの喫煙具も扱う。県内でも品揃えの豊富な専門店として紹介されている。",
              "note": "地域情報サイトや観光情報に掲載あり。プレミアムシガー（ハバノス）中心というより外国タバコ・喫煙具全般の専門店。最新在庫は来店前に確認が無難。",
              "status": "営業",
              "sources": [
                "アテンドパーク テイスト駅南 (地域情報) https://attendpark.com/shops_data/2521",
                "じゃらんnet テイスト駅南 (観光情報) https://www.jalan.net/kankou/spt_guide000000163518/"
              ]
            },
            {
              "name": "雅美堂（がびどう／有限会社雅美堂）",
              "type": "専門店",
              "area": "新潟市中央区・上所",
              "desc": "新潟市中央区上所のたばこ店。国内タバコに加え外国タバコ・手巻きタバコ・葉巻などを扱い、プレミアムシガーは専用ケースで湿度管理して販売していると紹介されている。白山駅から徒歩圏の地元密着の喫煙具・タバコ店。",
              "note": "Yahoo!マップ・エキテン・地域情報サイトに掲載。葉巻の在庫状況は来店前に要確認。",
              "status": "営業",
              "sources": [
                "アテンドパーク 雅美堂 (地域情報) https://attendpark.com/shops_data/20111129002",
                "Yahoo!マップ 有限会社雅美堂 (地図) https://map.yahoo.co.jp/v3/place/hH0gzyxDV7s",
                "エキテン 雅美堂 (店舗情報) https://www.ekiten.jp/shop_1676664/"
              ]
            },
            {
              "name": "田舎酒屋こめや（田舎酒屋こめや）",
              "type": "専門店",
              "area": "新潟市南区・茨曽根",
              "desc": "新潟市南区茨曽根の酒販店で、実店舗でタバコ・葉巻・パイプを販売。公式サイト・ブログではキューバ産葉巻のコイーバやモンテクリストなどハバノスの入荷情報を掲載しており、ハバノスを扱う数少ない県内の入手先のひとつ。オンラインでも入荷情報を発信している。",
              "note": "公式サイト（inakazakaya.jp）とブログが更新されており実在・営業を確認。市街地から離れた南区の郊外立地。",
              "status": "営業",
              "sources": [
                "田舎酒屋こめや 公式サイト (店公式) https://www.inakazakaya.jp/?mode=f2",
                "田舎酒屋こめや ブログ タバコ・パイプ (店公式) https://komeya.inakazakaya.jp/wp/category/%E3%82%BF%E3%83%90%E3%82%B3%E3%83%BB%E3%83%91%E3%82%A4%E3%83%97/"
              ]
            },
            {
              "name": "シガーバー英國屋（Cigar Bar 英国屋／えいこくや）",
              "type": "シガーバー",
              "area": "新潟市中央区・古町（古町通8番町）",
              "desc": "古町通8番町の路地裏にたたずむ新潟を代表するシガーバー。シングルモルト・ウイスキーと葉巻を中心に、ベテランマスターが一人客も歓迎する落ち着いた雰囲気。カウンター＋テーブルの小体な造りで、新潟の重鎮バーとして口コミ評価も高い。",
              "note": "食べログ・Retty・新潟県飲食店ナビ・Yahoo!ロコ・トリップアドバイザーなど複数媒体に掲載。営業を確認。住所表記は8番町／9番町と媒体によりゆれあり。",
              "status": "営業",
              "sources": [
                "新潟県飲食店ナビ シガーバー英國屋 (飲食店情報) https://niigataken-shakou.com/store/1252",
                "食べログ 英国屋 (グルメ) https://tabelog.com/niigata/A1501/A150101/15002055/",
                "Retty シガーバー英國屋 (口コミ) https://retty.me/area/PRE15/ARE157/SUB49502/100000465550/"
              ]
            },
            {
              "name": "Bar Σ（バー シグマ）",
              "type": "バー（葉巻あり）",
              "area": "新潟市中央区・古町（白山）",
              "desc": "新潟市中央区・古町（白山）のオーセンティックバー。ウイスキー・カクテル主体で、マスターは竹鶴アンバサダーとしても知られる。サントリーBAR-NAVIの『シガーが充実しているバー』新潟県一覧に掲載され、葉巻も楽しめる店として紹介されている。",
              "note": "前身のカクテルバーから2021年に現在地へ移転。葉巻はメインではなく常時在庫・持込可否は来店前に要確認。",
              "status": "要確認",
              "sources": [
                "Bar Σ 公式サイト (店公式) https://barsigma.gemstec-con.com/",
                "楽天ぐるなび Bar Σ (グルメ) https://r.gnavi.co.jp/pg10x3fb0000/",
                "サントリー BAR-NAVI 新潟県シガー (バー検索) https://bar-navi.suntory.co.jp/search/f__15/p__520/"
              ]
            }
          ],
          "sources": [
            "葉巻スイタイ 新潟県のシガーバー一覧 https://ha-maki.com/niigata/cigar-bar",
            "サントリー BAR-NAVI 新潟県でシガーが充実しているバー https://bar-navi.suntory.co.jp/search/f__15/p__520/",
            "食べログ 新潟 シガーバー一覧 https://tabelog.com/keywords/%E3%82%B7%E3%82%AC%E3%83%BC%E3%83%90%E3%83%BC/niigata/kwdLst/BC01/",
            "シガーショップの住所録 新潟県 http://chankaz.net/cigarshop/niigata",
            "日本シガーバー協会 会員リスト 新潟県 https://www.cigarbar.or.jp/member/?p=%E6%96%B0%E6%BD%9F%E7%9C%8C"
          ]
        },
        {
          "code": "toyama",
          "pref": "富山県",
          "pref_en": "Toyama",
          "region": "中部",
          "prefNote": "富山県で葉巻を対面購入できる中心は、富山市奥田町の葉巻・喫煙具専門店『はまきやさん』（ハバナ〜各国プレミアム／ドライシガーを幅広く扱い、カフェ・葉巻会も併設）。シガーを楽しめるバーは富山市の『BAR 木下』（葉巻充実のカウンターバー）と『テリーズ』（ハバナ×モヒート）が中核で、加えて富山市『アメリカンクラブ ウエスト』、高岡市『高岡ハイボール』がシガーバー系ディレクトリに掲載される。バー各店の葉巻在庫は流動的で、持込可否を含め来店前の確認が無難。",
          "shops": [
            {
              "name": "はまきやさん（Cafe/Shop Hamakiyasan／本店）",
              "type": "専門店",
              "area": "富山市・奥田町（富山駅北口側）",
              "desc": "富山駅北の奥田町交差点近く、トレーラーハウスで営む北陸屈指の葉巻・喫煙具専門店。世界のドライシガーに加え、フィリピン・ドミニカ・コスタリカ・ニカラグア産やハバナ（キューバ）などのプレミアムシガーを幅広く扱い、手巻きたばこ・パイプ・リーフ・輸入たばこも豊富。テラス席でコーヒーと葉巻を楽しめ、店主が葉巻会（イベント）も開催する。",
              "note": "公式サイト（hamaki.net）・オンラインストア・店主ブログが継続更新され、食べログにも「カフェ はまきやさん 本店」として掲載。富山県で葉巻を対面購入できる中心的な店。水曜定休。",
              "status": "営業",
              "sources": [
                "はまきやさん 公式サイト (専門店) http://www.hamaki.net/",
                "はまきやさん オンラインストア (専門店) https://hamakiyasan.easy-myshop.jp/",
                "食べログ カフェ はまきやさん 本店 (専門店/カフェ) https://tabelog.com/toyama/A1601/A160101/16007505/"
              ]
            },
            {
              "name": "BAR 木下（BAR Kinoshita）",
              "type": "シガーバー",
              "area": "富山市・内幸町（ふんすい横丁／新富町駅近く）",
              "desc": "ふんすい横丁の路地入口にあるカウンター主体のオーセンティックバー。スコッチ・スピリッツとともに葉巻（シガー）の品揃えが充実しており、口コミでも葉巻とウイスキー、マスターの人柄が評価されている。新富町駅から徒歩約2分。",
              "note": "公式Instagram（@bar_kinoshita）・食べログ・ぐるなびに掲載。シガーバーリスト（中部）にも掲載あり。",
              "status": "営業",
              "sources": [
                "食べログ BAR 木下 (バー) https://tabelog.com/en/toyama/A1601/A160101/16010463/",
                "ぐるなび BAR 木下 (バー) https://r.gnavi.co.jp/25gt40gj0000/",
                "シガーバーリスト中部一覧 (ディレクトリ) http://cigarbarlist.gourmet.coocan.jp/chuubu.html"
              ]
            },
            {
              "name": "テリーズ（TERRYS／Terry's Bar）",
              "type": "バー（葉巻あり）",
              "area": "富山市・桜町（新富町駅近く）",
              "desc": "桜町・小杉ビル2階のオーセンティックバー。よく管理されたハバナ（キューバ）シガーを扱い、オリジナルのモヒートと合わせて葉巻を楽しめる店として紹介されている。カウンター主体で落ち着いた雰囲気。日曜定休。",
              "note": "食べログ・ぐるなび・Rettyに掲載。食べログの口コミで2025年1月時点の来店記録があり営業を確認。葉巻の在庫状況は来店前に確認が無難。",
              "status": "営業",
              "sources": [
                "食べログ テリーズ TERRYS (バー) https://tabelog.com/en/toyama/A1601/A160101/16006743/",
                "ぐるなび テリーズ (バー) https://r.gnavi.co.jp/g2crangr0000/"
              ]
            },
            {
              "name": "アメリカン クラブ ウエスト（American Club West）",
              "type": "バー（葉巻あり）",
              "area": "富山市・今木町（市電桜橋駅近く）",
              "desc": "禁酒法時代のアメリカの酒場をモチーフにした大型ダイニングバー（座席多数）。シガーバー系のディレクトリに葉巻を扱う店として掲載されている。宴会利用もできる賑やかな造り。",
              "note": "食べログ・ぐるなび・富山県社交飲食組合サイト等で実在・営業を確認。ただし常時の葉巻在庫・提供はディレクトリ掲載が中心のため、来店前に要確認。",
              "status": "要確認",
              "sources": [
                "食べログ American Club West (ダイニングバー) https://tabelog.com/toyama/A1601/A160101/16001159/",
                "シガーバーリスト中部一覧 (ディレクトリ) http://cigarbarlist.gourmet.coocan.jp/chuubu.html"
              ]
            },
            {
              "name": "高岡ハイボール（TAKAOKA HIGHBALL）",
              "type": "バー（葉巻あり）",
              "area": "高岡市・末広町（高岡駅近く）",
              "desc": "高岡駅近く末広町のバー。シガーバーリスト（中部）に葉巻を扱う店として掲載されている。ハイボール・カクテルを中心とする繁華街のバー。",
              "note": "シガーバーリスト等のディレクトリ掲載が中心で、葉巻の常時取扱は独自には確認できていない。来店前に葉巻の有無を要確認。",
              "status": "要確認",
              "sources": [
                "シガーバーリスト中部一覧 (ディレクトリ) http://cigarbarlist.gourmet.coocan.jp/chuubu.html",
                "シガーバーリスト日本国内一覧 (ディレクトリ) http://cigarbarlist.gourmet.coocan.jp/all_txt.html"
              ]
            }
          ],
          "sources": [
            "はまきやさん 公式サイト http://www.hamaki.net/",
            "シガーバーリスト中部一覧 http://cigarbarlist.gourmet.coocan.jp/chuubu.html",
            "食べログ 富山 シガーバー https://tabelog.com/keywords/%E3%82%B7%E3%82%AC%E3%83%BC%E3%83%90%E3%83%BC/toyama/kwdLst/",
            "サントリー BAR-NAVI 富山県 https://bar-navi.suntory.co.jp/search/f__16/"
          ]
        },
        {
          "code": "ishikawa",
          "pref": "石川県",
          "pref_en": "Ishikawa",
          "region": "中部",
          "prefNote": "石川県の葉巻取扱は金沢市に集中。購入は片町の老舗たばこ専門店「ハヤシ」、喫煙は尾山町のシガー専門バー「ボトムレス蟒」や片町のダイニングバー「HIDEOUT」が代表格。県外では七尾市・和倉温泉の加賀屋内「Cigar Bar 笹笛」が数少ないリゾート型シガーバー。専門店・シガーバーの数は少なく、地方都市部は要確認の情報が多い。",
          "shops": [
            {
              "name": "世界のたばこ ハヤシ（Sekai no Tabako Hayashi）",
              "type": "専門店",
              "area": "金沢市・片町（片町商店街）",
              "desc": "1930年創業の老舗たばこ専門店。紙巻タバコ約300銘柄、葉巻約280銘柄、パイプ刻み、手巻きタバコなど国内販売品を常時700種類ほど幅広く取り揃える。金沢中心部で葉巻を買える数少ない実店舗。",
              "note": "販売店（購入向け）。喫煙スペースの有無は要確認。",
              "status": "営業",
              "sources": [
                "金沢商店街物語（店舗情報） https://shop-kanazawa.jp/shop.php?mll=7&shp=1360",
                "Smith Corporation 取扱店紹介 https://smithcorp.jp/introduce-store/2016/10/10669/"
              ]
            },
            {
              "name": "CIGAR BAR ボトムレス蟒（Botomuresu Uwabami）",
              "type": "シガーバー",
              "area": "金沢市・尾山町（尾山ビル1階）",
              "desc": "尾山町の路地裏にあるシガー専門バー。手巻き葉巻を中心に扱い、熟成にもこだわる。カジュアルなものから1,200円前後のプレミアム手巻き葉巻まで幅広く楽しめる。18時〜深夜の営業で不定休。",
              "note": "InstagramやFacebookは更新継続中。営業時間・定休日は不定のため訪問前に要確認。",
              "status": "営業",
              "sources": [
                "Yahoo!マップ 店舗情報 https://loco.yahoo.co.jp/place/g-vRy2AQVlUQU/",
                "食べログ https://tabelog.com/en/ishikawa/A1701/A170101/17013031/",
                "Instagram @botomuresumang https://www.instagram.com/botomuresumang/"
              ]
            },
            {
              "name": "Cigar Bar 笹笛（和倉温泉 加賀屋）",
              "type": "ホテルラウンジ",
              "area": "七尾市・和倉温泉（加賀屋 本館1階）",
              "desc": "老舗旅館・加賀屋の館内にあるシガーバー。キューバ産を中心とした葉巻を取り揃え、専門知識を持つスタッフが対応。ブランデーやウイスキー、ワイン、カクテルなどと合わせて楽しめる。紙巻きたばこ利用も可。",
              "note": "旅館内施設のため主に宿泊者向け。リニューアルオープン済み。",
              "status": "営業",
              "sources": [
                "和倉温泉加賀屋 公式（Cigar Bar笹笛リニューアルオープン） https://www.kagaya.co.jp/information/detail.php?id=720",
                "北陸中日新聞（シガーバーオープン記事） https://www.chunichi.co.jp/article/302674"
              ]
            },
            {
              "name": "DINING BAR HIDEOUT（ハイドアウト）",
              "type": "バー（葉巻あり）",
              "area": "金沢市・片町",
              "desc": "片町の隠れ家的ダイニングバー。世界の洋酒やチーズ料理に加え、パルタガス・ショートなど本格キューバ葉巻を約10種類ほど用意。葉巻専門のスタッフが初心者にも案内し、持込・持帰りにも対応。",
              "note": "食べログでは旧所在地に「移転」表示。現在は片町2-3-7で営業。",
              "status": "営業",
              "sources": [
                "公式サイト（ウイスキー・シガー案内） http://www.hideout-kanazawa.com/whisky.html",
                "BAR-NAVI（サントリー） https://bar-navi.suntory.co.jp/shop/0762212181/"
              ]
            }
          ],
          "sources": [
            "葉巻スイタイ 石川県シガーバー一覧 https://ha-maki.com/ishikawa/cigar-bar",
            "Smith Corporation（石川県 葉巻・シガリロ取扱店） https://smithcorp.jp/introduce-store/2016/10/10669/",
            "BAR-NAVI 石川県シガー充実バー https://bar-navi.suntory.co.jp/search/f__17/p__520/",
            "北陸中日新聞（加賀屋シガーバー） https://www.chunichi.co.jp/article/302674"
          ]
        },
        {
          "code": "fukui",
          "pref": "福井県",
          "pref_en": "Fukui",
          "region": "中部",
          "prefNote": "福井県は葉巻市場が小さく、公開情報で確認できる葉巻取扱店・喫煙可の店は福井市の「臼井煙草倶楽部」がほぼ唯一。専業のシガーバー／シガーラウンジやハバノス正規取扱店は確認できなかった（2026-07-16時点）。",
          "shops": [
            {
              "name": "CIGAR&CAFE 臼井煙草倶楽部（Usui Tobacco Club）",
              "type": "専門店（喫茶併設）",
              "area": "福井市順化（片町・呉服町エリア）",
              "desc": "老舗のたばこ店を2005年に改装した葉巻＆カフェ。レジ横に葉巻がバラ売りで並び、店内のカウンターとテーブルで挽きたてコーヒーとともに葉巻を楽しめる。初心者には店主が銘柄の特徴を説明してくれる。喫煙しない客も入店可でモーニング・ランチも提供。",
              "note": "食べログに2026年2月時点のレビューがあり営業を確認。福井県内で葉巻を購入でき、その場で吸える数少ない店。",
              "status": "営業",
              "sources": [
                "福井市商店街連合会 (店舗紹介) https://www.291shops.com/useful/entry-449.html",
                "フクブロ (地域メディア記事) https://fukublo.jp/gourmet/caffe/2016/03/14/7695/",
                "食べログ (グルメ・口コミ) https://tabelog.com/fukui/A1801/A180101/18004840/",
                "シガーバーの住所録 chankaz (シガーバー一覧) http://chankaz.net/cigarbar/fukui"
              ]
            }
          ],
          "sources": [
            "シガーバーの住所録 chankaz（福井県） http://chankaz.net/cigarbar/fukui",
            "福井市商店街連合会 https://www.291shops.com/useful/entry-449.html",
            "フクブロ（福井のローカルメディア） https://fukublo.jp/gourmet/caffe/2016/03/14/7695/",
            "食べログ 福井 https://tabelog.com/fukui/A1801/A180101/18004840/",
            "春山商事 取扱店リスト（中部） https://www.haruyama-shoji.co.jp/stores/area/4"
          ]
        },
        {
          "code": "yamanashi",
          "pref": "山梨県",
          "pref_en": "Yamanashi",
          "region": "中部",
          "prefNote": "山梨県の葉巻関連は県庁所在地の甲府市に集中している。専門店としては甲府市内のたばこ専門店（煙草館はやかわ・河西たばこ店）が葉巻を扱い、葉巻を楽しめる場としては古名屋ホテル1階のバーラウンジ The Silk が確認できた。富士吉田・河口湖など他エリアでは公開情報で葉巻専門店・シガーバーを確認できなかった（2026-07-16時点）。",
          "shops": [
            {
              "name": "The Silk（ザ シルク）",
              "type": "ホテルラウンジ",
              "area": "甲府市・中央（古名屋ホテル1F）",
              "desc": "甲府駅近くの古名屋ホテル1階にあるバーラウンジ。滝のある庭園を望む天井の高い落ち着いた空間で、昼はカフェ、夜はバーとして営業する。メニューに葉巻（シガー）を用意しており、カクテルとともに楽しめる。",
              "note": "以前は「シガーバーSILK」として紹介されていたが、近年はカフェ／バーラウンジ寄りに業態が変化しているとの情報あり。葉巻の在庫・提供状況は来店前に要確認。",
              "status": "営業",
              "sources": [
                "食べログ The Silk (バー) https://tabelog.com/yamanashi/A1901/A190101/19004935/",
                "古名屋ホテル公式 バーラウンジ THE SILK https://www.konaya.co.jp/en/",
                "MOKO'S BAR ブログ 甲府のシガーバーSILK https://fmftp.lekumo.biz/bar/2017/11/silk-4031.html"
              ]
            },
            {
              "name": "煙草館はやかわ（Tabako-kan Hayakawa）",
              "type": "専門店",
              "area": "甲府市",
              "desc": "喫煙具アドバイザーの店主が営むたばこ・喫煙具専門店。手巻きタバコ、パイプたばこ、外国たばこに加えて葉巻（シガー）や喫煙具を取り扱う。手巻きタバコを中心に相談にも応じる。",
              "note": "葉巻の常時在庫・銘柄は要確認。",
              "status": "要確認",
              "sources": [
                "アイラブ山梨MAP 煙草館 はやかわ https://machikore.com/map/kuchikomi/shop/3534/",
                "丸和不動産 煙草館はやかわ情報ページ https://www.maru-wa.com/areacho_ma/shisetsu_ma19201/shisecate_ma0414/detail_ma2437445/",
                "煙草館 はやかわ Facebook https://www.facebook.com/TabakoGuanHayakawa/"
              ]
            },
            {
              "name": "河西たばこ店（河西タバコ店 / Kasai Tobacco）",
              "type": "専門店",
              "area": "甲府市・北口（甲府駅北口徒歩約3分）",
              "desc": "甲府駅北口近くのたばこ専門店。山梨県内でも手巻きタバコ・パイプたばこ・葉巻の品揃えが充実していると評され、各種シャグや葉巻、パイプを扱い、取り寄せにも対応する。",
              "note": "葉巻の在庫状況・銘柄は来店前に要確認。",
              "status": "要確認",
              "sources": [
                "Yahoo!マップ 河西タバコ店（甲府市北口） https://map.yahoo.co.jp/v3/place/JG65NhB8RzI",
                "Yelp 河西たばこ店 甲府市（Updated April 2026） https://www.yelp.com/biz/%E6%B2%B3%E8%A5%BF%E3%81%9F%E3%81%B0%E3%81%93%E5%BA%97-%E7%94%B2%E5%BA%9C%E5%B8%82"
              ]
            }
          ],
          "sources": [
            "chankaz.net 山梨県シガーバー住所録 http://chankaz.net/cigarbar/yamanashi",
            "cigarbarlist 日本国内葉巻販売店一覧 http://cigarbarlist.gourmet.coocan.jp/cigarshop.html",
            "春山商事 THE SHOP LIST（地域別取扱店） https://www.haruyama-shoji.co.jp/stores/area/4",
            "食べログ The Silk https://tabelog.com/yamanashi/A1901/A190101/19004935/"
          ]
        },
        {
          "code": "nagano",
          "pref": "長野県",
          "pref_en": "Nagano",
          "region": "中部",
          "prefNote": "長野県で公開情報から確認できる葉巻の入手先は、松本市の老舗喫煙具専門店『いせや』と軽井沢の『中山タバコ店』が中心で、上田市『メロディーグリーン』はたばこ全般の店（葉巻取扱は要確認）。シガー対応バーは長野市の『BAR GLORY』（キューバ産葉巻）が代表格で、松本市の『MAIN BAR COAT』『BRORA』、軽井沢のシガールーム併設『LE BEL COEUR』など県内各地に点在する。地方につき葉巻専業店・専門シガーバーは少なく、バーの葉巻在庫・持込可否は流動的なため来店前の確認が無難。なお軽井沢の『煙事（燻製工房）』は燻製料理店でありシガーとは無関係のため除外した。",
          "shops": [
            {
              "name": "いせや（ISEYA）",
              "type": "専門店",
              "area": "松本市中央・松本駅お城口（東口）周辺",
              "desc": "松本駅お城口から徒歩数分、長いパイプの看板が目印の老舗たばこ・喫煙具専門店。手巻きタバコ・パイプ・パイプタバコ・葉巻（シガー）・キセル・加熱式など各種を幅広く扱い、初心者も歓迎する県内でも数少ない喫煙具専門店。",
              "note": "全国タバコショップリーダースクラブ（TLC）や喫煙具卸の取扱店情報に掲載。葉巻の最新在庫は来店前に確認が無難。",
              "status": "営業",
              "sources": [
                "TLC 全国タバコショップリーダースクラブ いせや (店舗情報) https://www.tlc-net.co.jp/shop/5262/"
              ]
            },
            {
              "name": "中山タバコ店（Nakayama Tobacco）",
              "type": "専門店",
              "area": "北佐久郡軽井沢町・軽井沢東（東雲交差点／軽井沢駅北口徒歩圏）",
              "desc": "軽井沢・東雲交差点近くのたばこ・喫煙具専門小売店。シガレットに加え葉巻（シガー）・パイプ煙草も数多く品揃えし、リストにない銘柄も取り寄せ対応する場合があると案内。公式サイトに商品リストを掲載する地元の老舗たばこ店。",
              "note": "店公式サイト・iタウンページ・Yahoo!ロコ等に掲載。定休日は火曜。プレミアムシガー専業ではなくたばこ全般の専門店で、在庫は来店前に要確認。",
              "status": "営業",
              "sources": [
                "中山タバコ店 公式サイト (店公式) http://www.karuizawa-on.com/nakayama-tabaco/",
                "Yahoo!ロコ 中山タバコ店 (店舗情報) https://loco.yahoo.co.jp/place/g-7allOFgZANc/"
              ]
            },
            {
              "name": "メロディーグリーン（Melody Green）",
              "type": "専門店",
              "area": "上田市・海野町商店街（中央）",
              "desc": "上田・海野町商店街のたばこ／音楽／古着などを扱うユニークな店。上田市内でも屈指のたばこ品揃えを掲げ、手巻きタバコ等を扱うと紹介される。地域情報サイト・商店街サイトに掲載。",
              "note": "たばこ全般の店として紹介されており、プレミアム葉巻（シガー）の常時取扱・在庫は公開情報からは確定できないため要確認。",
              "status": "要確認",
              "sources": [
                "じょうしょう気流（長野県ブログ）メロディーグリーン (地域情報) https://blog.nagano-ken.jp/josho/shokan/13536.html",
                "上田まちなか商店街 メロディーグリーン (商店街情報) http://ueda-machinaka-shop.com/shop/106/"
              ]
            },
            {
              "name": "BAR GLORY NAGANO（バー グローリー ナガノ）",
              "type": "シガーバー",
              "area": "長野市・南長野（北石堂町、長野駅周辺）",
              "desc": "横浜の名店の流れをくむ長野市のオーセンティックバー。熟練バーテンダーのカクテルに加え、ライトからヘビーまでキューバ産葉巻（シガー）を用意し、酒と葉巻のペアリングを楽しめると紹介される長野市の代表的なシガー対応バー。",
              "note": "食べログ・ホットペッパー・ぐるなび・公式Instagram等に掲載。営業を確認。日曜定休。",
              "status": "営業",
              "sources": [
                "食べログ GLORY NAGANO (グルメ) https://tabelog.com/en/nagano/A2001/A200101/20002845/",
                "ホットペッパーグルメ バー グローリー 長野 (グルメ) https://www.hotpepper.jp/strJ000766991/"
              ]
            },
            {
              "name": "MAIN BAR COAT（メインバー コート）",
              "type": "バー（葉巻あり）",
              "area": "松本市中央・松本駅周辺（松本市街地）",
              "desc": "1998年開業、蔵造り風建物2階にある松本の本格オーセンティックバー。8mの一枚板カウンターと英国アンティークの椅子、シングルモルト中心に700種前後のウイスキー・500種超のスピリッツを揃える。葉巻を扱うバーとしてシガーバーリストにも掲載。",
              "note": "店公式・サントリーBAR-NAVI・食べログ等に掲載。営業を確認。葉巻はメインではないため常時在庫・持込可否は来店前に要確認。",
              "status": "営業",
              "sources": [
                "MAIN BAR COAT 公式サイト (店公式) http://mainbarcoat.com/",
                "サントリー BAR-NAVI MAIN BAR COAT (バー情報) https://bar-navi.suntory.co.jp/shop/0263347133/",
                "食べログ メインバー コート (グルメ) https://tabelog.com/en/nagano/A2002/A200201/20000097/"
              ]
            },
            {
              "name": "BRORA（ブローラ）",
              "type": "バー（葉巻あり）",
              "area": "松本市中央・松本駅周辺（松本市街地）",
              "desc": "松本の飲み屋街にあるジン・ウイスキーに強いオーセンティックバー。長大な一枚板カウンターが特徴で、洗練された技のバーテンダーが迎える。中部エリアのシガーバーリストに掲載され、葉巻も楽しめるバーとして紹介される。",
              "note": "食べログ・Retty・サントリーBAR-NAVI等に掲載。営業を確認。葉巻の常時在庫・持込可否は来店前に要確認。",
              "status": "営業",
              "sources": [
                "食べログ ブローラ BRORA (グルメ) https://tabelog.com/en/nagano/A2002/A200201/20010947/",
                "サントリー BAR-NAVI BRORA (バー情報) https://bar-navi.suntory.co.jp/shop/0263366007/"
              ]
            },
            {
              "name": "LE BEL COEUR KARUIZAWA（ル・ベル・クール軽井沢）",
              "type": "バー（葉巻あり）",
              "area": "北佐久郡軽井沢町・六本辻",
              "desc": "軽井沢・六本辻のフレンチレストランで、シガールーム（Cigar Room）を併設。食後に葉巻をくゆらせられる大人の空間として、葉巻検索サイト等に軽井沢のシガー対応スポットとして掲載されている。",
              "note": "店公式サイト・シガーバー検索サイトに掲載。レストラン主体でシガールーム併設のスタイル。営業状況・葉巻の提供内容は予約時に確認が無難。",
              "status": "要確認",
              "sources": [
                "LE BEL COEUR KARUIZAWA 公式サイト (店公式) http://www.belkaruizawa.com/index.html",
                "葉巻スイタイ 長野県のシガーバー一覧 (検索サイト) https://ha-maki.com/nagano/cigar-bar"
              ]
            },
            {
              "name": "レストランバー リビアーモ（Restaurant Bar Libiamo）",
              "type": "バー（葉巻あり）",
              "area": "長野市・長野駅前（善光寺口周辺）",
              "desc": "上田から長野駅前へ移転したレストランバー。ワイン・カクテル・ウイスキーに軽食や料理を合わせられる。サントリーBAR-NAVIの『長野県でシガーが充実しているバー』一覧に掲載され、葉巻を楽しめる店として紹介される。",
              "note": "サントリーBAR-NAVI（長野県シガー）・食べログに掲載。葉巻はメインではなく在庫・持込可否は来店前に要確認。",
              "status": "要確認",
              "sources": [
                "サントリー BAR-NAVI 長野県でシガーが充実しているバー (バー検索) https://bar-navi.suntory.co.jp/search/f__20/p__520/",
                "食べログ Restaurant Bar Libiamo (グルメ) https://tabelog.com/en/nagano/A2001/A200101/20012867/"
              ]
            },
            {
              "name": "THE FUJIYA GOHONJIN（藤屋御本陳）",
              "type": "ダイニングバー",
              "area": "長野市・善光寺門前（大門町）",
              "desc": "善光寺門前に建つ登録有形文化財の旧旅館（御本陳藤屋旅館）を活かしたイタリアン＆バー。数寄屋造りと大正ロマン・アールデコが融合した空間でバータイムも楽しめる。葉巻検索サイトに長野市のシガー対応スポットとして掲載される。",
              "note": "店公式サイトはイタリアン・バーを前面に出しており、葉巻（シガー）の常時提供は公開情報からは確定できないため要確認。葉巻検索サイト掲載に基づく参考掲載。",
              "status": "要確認",
              "sources": [
                "THE FUJIYA GOHONJIN 公式サイト (店公式) https://www.thefujiyagohonjin.com/",
                "葉巻スイタイ 長野県のシガーバー一覧 (検索サイト) https://ha-maki.com/nagano/cigar-bar"
              ]
            }
          ],
          "sources": [
            "葉巻スイタイ 長野県のシガーバー一覧 https://ha-maki.com/nagano/cigar-bar",
            "サントリー BAR-NAVI 長野県でシガーが充実しているバー https://bar-navi.suntory.co.jp/search/f__20/p__520/",
            "シガーバーリスト 中部一覧 http://cigarbarlist.gourmet.coocan.jp/chuubu.html",
            "シガーショップの住所録 長野県 http://chankaz.net/cigarshop/nagano"
          ]
        },
        {
          "code": "gifu",
          "pref": "岐阜県",
          "pref_en": "Gifu",
          "region": "中部",
          "prefNote": "岐阜県では葉巻専門バーとして岐阜市の「SpeakEasy」、飛騨・高山市の「PURPLE PLUS」「KAMA・G」が確認できる。葉巻の物販は岐阜市のたばこ専門店（アート書房、ベベル等）が中心で、大垣市・各務原市など県南西部では公開情報で明確なシガーバーを確認できなかった（2026-07-16時点）。大都市圏に比べ店舗数は少なく、営業状況は各店で要確認。",
          "shops": [
            {
              "name": "SpeakEasy（スピークイージー）",
              "type": "シガーバー",
              "area": "岐阜市・神田町（柳ケ瀬近く）",
              "desc": "モルトウイスキー600種以上、ワイン600種以上に加えて20種類以上のシガー（葉巻）を揃える大人の隠れ家的オーセンティックバー。ジャズが流れる落ち着いた雰囲気でウイスキーやワインとともに葉巻を楽しめる。カウンター中心の小規模店。",
              "note": "木曜定休。営業時間18:30～。",
              "status": "営業",
              "sources": [
                "食べログ (グルメサイト) https://tabelog.com/en/gifu/A2101/A210101/21018632/",
                "楽天ぐるなび (グルメサイト) https://r.gnavi.co.jp/pkuv820t0000/",
                "SUNTORY BAR-NAVI (バー情報) https://bar-navi.suntory.co.jp/shop/0584751705/"
              ]
            },
            {
              "name": "世界のたばこ・アート書房（Sekaino Tabacco / Art Shobou）",
              "type": "専門店",
              "area": "岐阜市・清本町",
              "desc": "喫煙具を含め1000種類以上を扱うたばこ専門店。手巻きたばこ・紙巻き・リトルシガー・葉巻・パイプなど世界各国のたばこを販売し、書籍やコーヒー豆も扱う。知識豊富なスタッフが葉巻初心者にも丁寧にアドバイスしてくれる。",
              "note": "販売店（喫煙スペースの有無は要確認）。",
              "status": "営業",
              "sources": [
                "世界のたばこ.アート書房 公式サイト (店舗公式) https://www.sekaino-tabacco.com/",
                "エキテン (店舗情報) https://www.ekiten.jp/shop_6009804/"
              ]
            },
            {
              "name": "ベベル タバコ店（Bevel）",
              "type": "専門店",
              "area": "岐阜市・柳ケ瀬通",
              "desc": "柳ケ瀬エリアのたばこ店。葉巻（シガー）、手巻きたばこ、喫煙具、電子たばこなどを幅広く扱うとされる。",
              "note": "店舗情報サイトの掲載を基に確認。品揃え・葉巻在庫の詳細は要確認。",
              "status": "要確認",
              "sources": [
                "エキテン byGMO (店舗情報) https://www.ekiten.jp/shop_1438337/"
              ]
            },
            {
              "name": "PURPLE PLUS（パープルプラス）",
              "type": "バー（葉巻あり）",
              "area": "高山市・天満町",
              "desc": "陶器店（太田茶碗店）のマスターが営む小さなバーで、ウイスキー・シガー・コーヒーに精通。壁一面にウイスキーボトルが並び、カウンター7～8席の落ち着いた空間。初心者向けのキューバ産シガーも用意され、葉巻を吸える。",
              "note": "カウンター中心の小規模店。",
              "status": "営業",
              "sources": [
                "食べログ (グルメサイト) https://tabelog.com/gifu/A2104/A210401/21019254/",
                "anoina NEWS (地域メディア) https://anoina.jp/kitamura-recommend-bar/"
              ]
            },
            {
              "name": "KAMA・G（カマジー）",
              "type": "バー（葉巻あり）",
              "area": "高山市・花里町（高山駅近く）",
              "desc": "一枚板の木製カウンターが落ち着いた雰囲気を生むオーセンティックなショットバー。マスターに相談しながら葉巻（シガー）やブランデーを味わえる、ダンディズムを楽しめる店。高山駅から徒歩約10分。",
              "note": "",
              "status": "営業",
              "sources": [
                "KAMA・G 公式ページ (店舗公式) http://j47.jp/kama-g/",
                "食べログ (グルメサイト) https://tabelog.com/en/gifu/A2104/A210401/21008469/"
              ]
            }
          ],
          "sources": [
            "シガーバーリスト 中部一覧 (葉巻情報サイト) http://cigarbarlist.gourmet.coocan.jp/chuubu.html",
            "chankaz.net 岐阜県のシガーショップ (葉巻情報サイト) http://chankaz.net/cigarshop/gifu",
            "食べログ (グルメサイト) https://tabelog.com/",
            "世界のたばこ.アート書房 公式サイト https://www.sekaino-tabacco.com/"
          ]
        },
        {
          "code": "shizuoka",
          "pref": "静岡県",
          "pref_en": "Shizuoka",
          "region": "中部",
          "prefNote": "静岡県では葉巻の物販は静岡市・浜松市・沼津市・島田市のたばこ専門店（やしま、タバック モチヅキ、杉山たばこ店、寿屋杉本商店、ケアレーベル島田店）が中心で、複数がヒュミドールでプレミアムシガーを扱う。専業のシガーバーは掛川の林檎館などごく少数で、浜松のBar Savignyなど葉巻を置くバーが点在する。静岡駅周辺にはシガー・シーシャを出すカジュアルバーもあるが正式店名を出典から確定できず本一覧には載せていない。",
          "shops": [
            {
              "name": "浜松たばこセンター やしま（葉巻倶楽部 / Yashima）",
              "type": "専門店",
              "area": "浜松市中央区・鍛冶町",
              "desc": "世界のたばこ・喫煙具を扱う老舗たばこ店で、葉巻に特に力を入れている。複数のヒュミドールを備え、キューバ産・ドミニカ産・ニカラグア産などのプレミアムシガーを保管・販売する。『葉巻倶楽部』の名で通販サイト（yashima-hamaki.com）も運営。",
              "note": "旧・浜松市中区表記の資料もあり。物販中心。",
              "status": "営業",
              "sources": [
                "Smith Corporation/浜松たばこセンターやしま (取扱店紹介) https://smithcorp.jp/introduce-store/2015/08/7001/",
                "葉巻倶楽部/やしま (公式通販) https://www.yashima-hamaki.com/"
              ]
            },
            {
              "name": "タバック モチヅキ（Tabak Mochizuki）",
              "type": "専門店",
              "area": "静岡市葵区・松富",
              "desc": "大型のヒュミドールキャビネットを完備し、プレミアムシガーを多数取り揃えるたばこ専門店。手巻きたばこ・葉巻・パイプ・ドライシガーなど取扱銘柄が非常に多く、珍しい海外たばこの展示もある。",
              "note": "",
              "status": "営業",
              "sources": [
                "Smith Corporation/タバック モチヅキ (取扱店紹介) https://smithcorp.jp/introduce-store/2015/08/6997/"
              ]
            },
            {
              "name": "杉山たばこ店（Sugiyama Tobacco）",
              "type": "専門店",
              "area": "静岡市駿河区・中吉田（国道1号沿い）",
              "desc": "国道1号線・中吉田交差点脇にあるたばこ店。葉巻・パイプ・手巻きたばこ・シガレットを幅広く扱い、プレミアムシガーはヒュミドールで管理。試喫コーナーも設けられている。",
              "note": "",
              "status": "営業",
              "sources": [
                "Smith Corporation/杉山たばこ店 (取扱店紹介) https://smithcorp.jp/introduce-store/2015/08/7003/",
                "有限会社 杉山たばこ店 (公式サイト) http://www.sugiyama-tabacco.jp/"
              ]
            },
            {
              "name": "寿屋杉本商店（ことぶきや / Kotobukiya Sugimoto）",
              "type": "専門店",
              "area": "沼津市・上土町",
              "desc": "昭和24年創業のたばこ・宝くじ・酒販店。手巻きたばこやレアな外国たばこに加え、葉巻（シガー）も扱い、葉巻専用の通販サイトも運営している。和のテイストの店構えが特徴。",
              "note": "葉巻通販: kotobukiyanumazu.com。品揃えは要確認。",
              "status": "営業",
              "sources": [
                "Smith Corporation/寿屋杉本商店 (取扱店紹介) https://smithcorp.jp/introduce-store/2015/08/6999/",
                "寿屋杉本商店 (公式サイト) https://kotobukiya-sugimoto.com/"
              ]
            },
            {
              "name": "cigar bar ケアレーベル島田店（Care Label Shimada）",
              "type": "専門店（バー併設）",
              "area": "島田市",
              "desc": "美容室CARELABEL島田店内にシガーの物販スペースとスモーキングルーム（バルコニーでの喫煙も可）を併設。キューバ葉巻をはじめ各国プレミアムシガー、ドライシガー、シガリロ、リトルシガー、刻み・シャグ等を扱い、シガーコンシェルジュが常駐する。",
              "note": "美容室・バーバー・キッズルーム等の複合施設内。藤枝店（バーバー）も同系列。",
              "status": "営業",
              "sources": [
                "cigar bar ケアレーベル島田店 (公式ペライチ) https://cigarshizuoka.hp.peraichi.com/0546366057/"
              ]
            },
            {
              "name": "Cigar Bar 林檎館（RINGOKAN）",
              "type": "シガーバー",
              "area": "掛川市・谷の口町（JR掛川駅周辺）",
              "desc": "アンティーク家具を配したクラシカルな雰囲気のシガーバー。カルヴァドスやウイスキーの品揃えが豊富で、キューバ葉巻を含むシガーを楽しめる。地元フルーツを使ったカクテルや自家栽培ハーブの料理も提供。",
              "note": "",
              "status": "営業",
              "sources": [
                "サントリー BAR-NAVI/Cigar Bar RINGOKAN 林檎館 (店舗情報) https://bar-navi.suntory.co.jp/shop/0537231129/"
              ]
            },
            {
              "name": "Bar Savigny（バー サヴィニー）",
              "type": "バー（葉巻あり）",
              "area": "浜松市中央区・田町",
              "desc": "シングルモルトを主軸に、スタンダードカクテル・ワイン・シガーを揃える落ち着いた大人のオーセンティックバー。マスターが酒の知識を丁寧に教えてくれる静かな空間。",
              "note": "旧・浜松市中区表記の資料もあり。",
              "status": "営業",
              "sources": [
                "サントリー BAR-NAVI/Bar Savigny (店舗情報) https://bar-navi.suntory.co.jp/shop/0X00316319/",
                "Retty/Bar Savigny (店舗情報) https://retty.me/area/PRE22/ARE337/SUB33704/100001258429/"
              ]
            },
            {
              "name": "シガーバー（静岡市葵区両替町・黒川ビル／店名未確認）",
              "type": "シガーバー",
              "area": "静岡市葵区・両替町",
              "desc": "静岡市中心部・両替町の黒川ビル内にある、初心者歓迎・おひとり様可のシガーバーとして葉巻検索サイトに掲載されている。詳細（正式店名・品揃え）は公開情報からは特定できていない。",
              "note": "正式な店名を出典から確定できず。実在・詳細は要確認。",
              "status": "要確認",
              "sources": [
                "葉巻スイタイ/静岡県のシガーバー一覧 (検索サイト) https://ha-maki.com/shizuoka/cigar-bar"
              ]
            }
          ],
          "sources": [
            "Smith Corporation/静岡県のたばこ店紹介 https://smithcorp.jp/introduce-store/2016/10/10592/",
            "葉巻スイタイ/静岡県のシガーバー一覧 https://ha-maki.com/shizuoka/cigar-bar",
            "サントリー BAR-NAVI/静岡県のシガーが充実したバー https://bar-navi.suntory.co.jp/search/f__22/p__520/",
            "cigar bar ケアレーベル島田店 https://cigarshizuoka.hp.peraichi.com/0546366057/"
          ]
        },
        {
          "code": "aichi",
          "pref": "愛知県",
          "pref_en": "Aichi",
          "region": "中部",
          "prefNote": "名古屋（栄・錦・伏見）に葉巻専門店とシガーバーが集中する。老舗のシガークラブ加納やスピリッツ、パイプ&葉巻専門のフナハシ、旧BON後継のAntoinette、Climb Up等が中心で、豊田市など郊外にも葉巻を置くバーが点在する。都市圏として全国的にも比較的層が厚い。",
          "shops": [
            {
              "name": "シガークラブ加納（Cigar Club KANOU）",
              "type": "専門店（バー併設）",
              "area": "名古屋市中区・栄",
              "desc": "1953年創業の老舗で、名古屋で初めてウォークイン・ヒュミドールを導入したとされるシガーショップ兼シガーバー。キューバ産をはじめプレミアムシガーを豊富に揃え、加熱式たばこや水たばこも扱う。昼はカフェ、夜はバーとして葉巻と酒を楽しめる。",
              "note": "栄1丁目（モンテシャリーヌ1F）。JAZZライブ等のイベントも。",
              "status": "営業",
              "sources": [
                "シガークラブ加納 公式サイト (店舗) https://www.cigarclub-kanou.com/",
                "食べログ (口コミ) https://tabelog.com/en/aichi/A2301/A230102/23002561/"
              ]
            },
            {
              "name": "Bar Climb Up（バー クライムアップ）",
              "type": "シガーバー",
              "area": "名古屋市中区・栄",
              "desc": "ラム酒を主役に据えた栄のシガーバー。キューバ・ドミニカ・ニカラグア産シガーを豊富に取り揃え、300種以上のラムやモヒート、キューバサンドを提供。初心者にも吸い方やマナーを丁寧に教えてくれる。",
              "note": "月〜土19:00〜翌3:00、日曜定休。",
              "status": "営業",
              "sources": [
                "Bar Climb Up 公式サイト (店舗) https://www.bar-climbup.com/cigar/",
                "BAR-NAVI (店舗情報) https://bar-navi.suntory.co.jp/shop/S000010950/"
              ]
            },
            {
              "name": "CIGAR BAR SPIRITS（シガーバー スピリッツ）",
              "type": "シガーバー",
              "area": "名古屋市中区・栄",
              "desc": "栄のオー・ド・ヴィー栄ビル7Fにあるシガー愛好者向けのバー。プリンセスガーデンホテル東隣。同ビル1Fのたばこ専門店『スピリッツ』系列と見られる、夜遅くまで営業のシガーバー。",
              "note": "21:00〜翌5:00、不定休。店名の表記ゆれあり。詳細は要確認。",
              "status": "要確認",
              "sources": [
                "d-u-p (紹介記事) https://d-u-p.jp/article/cigar-bar-nagoya.html",
                "スピリッツ 公式 (店舗) https://www.e-tabako.com/店舗案内/"
              ]
            },
            {
              "name": "Wine&Cigar Amphi（ワイン アンド シガー アンフィー）",
              "type": "シガーバー",
              "area": "名古屋市中区・錦三",
              "desc": "錦三エリアで葉巻とワインを合わせて楽しめるバー。16時開店と比較的早く、食事の前後どちらでも利用しやすい。",
              "note": "錦3丁目（第四錦ビル2F）。月〜土16:00〜翌1:00、日祝定休。",
              "status": "要確認",
              "sources": [
                "d-u-p (紹介記事) https://d-u-p.jp/article/cigar-bar-nagoya.html"
              ]
            },
            {
              "name": "BAR URBAN COWBOY（バー アーバンカウボーイ）",
              "type": "シガーバー",
              "area": "名古屋市東区・東桜",
              "desc": "木のぬくもりある空間で初心者でも入りやすいシガーバー。日替わりのシガーリストが魅力で、初めての人にも丁寧にレクチャーしてくれる。",
              "note": "東桜2丁目（落合ビルB1F）。日曜定休。",
              "status": "要確認",
              "sources": [
                "d-u-p (紹介記事) https://d-u-p.jp/article/cigar-bar-nagoya.html"
              ]
            },
            {
              "name": "Bar Ankh（バー アンク）",
              "type": "バー（葉巻あり）",
              "area": "豊田市・元城町",
              "desc": "豊田市駅から徒歩約7分のオーセンティックバー。シングルモルトを中心とした希少なウイスキーや季節のカクテルとともに、キューバ産などの葉巻を楽しめる。一人でも入りやすい落ち着いた雰囲気。",
              "note": "18:00〜翌3:00、月曜定休。",
              "status": "営業",
              "sources": [
                "Bar Ankh 公式サイト (店舗) https://bar-ankh.com/",
                "食べログ (店舗) https://tabelog.com/en/aichi/A2305/A230501/23032474/"
              ]
            },
            {
              "name": "エストマーレ（Estomare）／名古屋マリオットアソシアホテル",
              "type": "ホテルラウンジ",
              "area": "名古屋市中村区・名古屋駅",
              "desc": "名古屋駅直上のマリオットアソシアホテル15Fのメインバー。落ち着いた上質な空間で、スピリッツやカクテルとともに葉巻を用意しているとの利用者情報がある。",
              "note": "葉巻の常時取扱・銘柄はホテルへ要確認。",
              "status": "要確認",
              "sources": [
                "食べログ (口コミ) https://tabelog.com/aichi/A2301/A230101/23000328/dtlrvwlst/B111381936/",
                "名古屋マリオットアソシアホテル 公式 (レストラン&バー) https://www.associa.com/nma/restaurant/"
              ]
            },
            {
              "name": "Antoinette Cigar Café（アントワネット シガーカフェ）",
              "type": "専門店（バー併設）",
              "area": "名古屋市北区",
              "desc": "キューバ産プレミアムからドライシガー・シガリロまで約300種を扱う葉巻専門店。ウォークインヒュミドールで温湿度管理し、カフェを併設。旧・葉巻専門店『BON』が移転してカフェ併設でオープンした店。",
              "note": "旧店名BONの後継。神戸の炭火焙煎コーヒーやクラシック・オペラのBGMが特徴。",
              "status": "営業",
              "sources": [
                "Antoinette Cigar Café 公式 (店舗紹介) https://antoinette.jp/about/",
                "Antoinette Cigar Café 公式 (葉巻) https://antoinette.jp/cigar/"
              ]
            },
            {
              "name": "世界の銘酒&たばこ専門店 スピリッツ（本店）",
              "type": "専門店",
              "area": "名古屋市中区・栄",
              "desc": "栄3丁目の酒・たばこ専門店。ヒュミドールで管理したプレミアムシガーやドライシガー・シガリロ、パイプ、手巻き（シャグ）、水パイプまで幅広く扱う。ジン・ラム等スピリッツ類の品揃えも豊富。広小路伏見店もある。",
              "note": "本店（栄3-13-6）12:00〜21:00、日曜定休。広小路伏見店は栄2丁目。",
              "status": "営業",
              "sources": [
                "スピリッツ 公式 (店舗案内) https://www.e-tabako.com/店舗案内/",
                "Smith Corporation (取扱店) https://smithcorp.jp/introduce-store/2015/08/6989/"
              ]
            },
            {
              "name": "スモーキングショップ フナハシ（有限会社フナハシ）",
              "type": "専門店",
              "area": "名古屋市西区・菊井",
              "desc": "全国的にも知られるパイプ＆葉巻の専門店。大きなヒュミドールに各国のシガーを50種以上陳列し、パイプ・喫煙具・ライター類も扱う。",
              "note": "菊井1丁目。08:00〜18:00、日曜定休（正月三賀日を除く）。",
              "status": "営業",
              "sources": [
                "Smith Corporation (取扱店) https://smithcorp.jp/introduce-store/2015/08/6987/",
                "日本パイプクラブ連盟 (店舗紹介) https://www.pipeclub-jpn.org/shop/shop_funahashi.html"
              ]
            },
            {
              "name": "丸已商会（まるみしょうかい）",
              "type": "専門店",
              "area": "名古屋市瑞穂区",
              "desc": "1955年創業のたばこ＆喫煙具専門店。手巻きタバコ、パイプ葉、シガー、携帯灰皿など喫煙具を扱う。葉巻は温湿度管理した専用ヒュミドールで保管し、店頭は見本のみ、希望に応じて提供する形。",
              "note": "新開町。木曜・第2日曜定休。パイプの吸い方指南もあり。",
              "status": "営業",
              "sources": [
                "丸已商会 公式 (店舗案内) https://www.marumi-tobacco.com/about-c1ger",
                "丸已商会 公式 (シガー) https://www.marumi-tobacco.com/cigar"
              ]
            },
            {
              "name": "橘屋（たちばなや）",
              "type": "専門店",
              "area": "あま市",
              "desc": "1924年創業、1997年にワイン＆たばこ専門店としてリニューアルした店。手巻きたばこを中心に、葉巻（シガー）・シガリロ・リトルシガー・パイプ葉・煙管葉など多彩に扱う。特殊品が多く、名古屋市や三重県から訪れる客も。",
              "note": "在庫は事前確認推奨。店頭に喫煙所あり。",
              "status": "営業",
              "sources": [
                "橘屋 公式 (葉巻・たばこ紹介) https://www.tachibanaya-jp.net/product/category.php?id=6",
                "橘屋 公式 (トップ) https://www.tachibanaya-jp.net/"
              ]
            }
          ],
          "sources": [
            "d-u-p 名古屋シガーバーおすすめ https://d-u-p.jp/article/cigar-bar-nagoya.html",
            "BAR-NAVI 愛知シガー充実バー https://bar-navi.suntory.co.jp/search/f__23/p__520/",
            "Smith Corporation 取扱店 https://smithcorp.jp/introduce-store/2016/10/10598/",
            "シガーバーリスト愛知 http://cigarbarlist.gourmet.coocan.jp/aichi.html"
          ]
        }
      ]
    },
    {
      "region": "近畿",
      "prefectures": [
        {
          "code": "mie",
          "pref": "三重県",
          "pref_en": "Mie",
          "region": "近畿",
          "prefNote": "三重県で葉巻を購入できる中心は四日市市の専門店「田中リビング」で、プレミアムシガーを100銘柄超そろえる県内屈指の店。バーとしては四日市のBar Rangeが葉巻の品揃えで知られ、津のJO'S BARや松阪のALCOHALLもリスト上は葉巻を扱う。ハバノス正規店（カサ・デル・ハバノ等）は県内に確認できず、専門店・バーとも数は限られる。",
          "shops": [
            {
              "name": "田中リビング（Tanaka Living）",
              "type": "専門店",
              "area": "四日市市・青葉町",
              "desc": "東海地区最大級の品揃えを誇るたばこ専門店。ヒュミドールで管理されたプレミアムシガー約115銘柄、ドライシガー約44銘柄、リトルシガー約18銘柄など葉巻全体で170銘柄超を常時在庫。ヒュミドール・カッター・ライターなど喫煙具も充実し、店主は喫煙具アドバイザー資格を持つ。通販も対応。",
              "note": "近鉄湯の山線・伊勢松本駅から徒歩圏。三重県内で葉巻を実際に購入できる中心的な店。",
              "status": "営業",
              "sources": [
                "Smith Corporation（取扱店紹介） https://smithcorp.jp/introduce-store/2015/09/7183/",
                "田中リビング（公式サイト） https://www.tanaka-living.com/",
                "日本パイプクラブ連盟（店舗紹介） https://www.pipeclub-jpn.org/shop/shop_tanaka.html"
              ]
            },
            {
              "name": "Bar Range（バー レンジ）",
              "type": "バー（葉巻あり）",
              "area": "四日市市・近鉄四日市駅周辺（西浦）",
              "desc": "「四日市で一番葉巻のラインナップが多いBar」を掲げるオーセンティックバー。ボックス席あり、葉巻を取り扱う。営業は概ね20:00〜24:00（金土は26:00頃まで）、火曜定休。近鉄四日市駅から徒歩約5分。",
              "note": "四日市市内で葉巻が楽しめるバーとして知られる。",
              "status": "営業",
              "sources": [
                "食べログ（Bar Range 近鉄四日市） https://tabelog.com/mie/A2402/A240201/24016742/",
                "サントリー BAR-NAVI https://bar-navi.suntory.co.jp/shop/S000009271/",
                "Instagram（@yokkaichi_bar.range） https://www.instagram.com/yokkaichi_bar.range/"
              ]
            },
            {
              "name": "JO'S BAR（ジョーズ バー）",
              "type": "バー（葉巻あり）",
              "area": "津市・羽所町（津駅東口）",
              "desc": "津駅東口から徒歩約2分のショットバー。スコッチ・ウイスキー・バーボンやカクテルが豊富で、天井にギターや小物を飾った個性的な雰囲気。シガーバーリスト等では葉巻を扱う店として掲載されている。営業は19:00〜翌2:00、無休。",
              "note": "葉巻の常時取扱状況はやや古い情報源（シガーバーリスト）に基づくため、来店前に葉巻の有無を要確認。店自体は営業中と見られる。",
              "status": "営業",
              "sources": [
                "食べログ（ジョーズ バー 津） https://tabelog.com/en/mie/A2401/A240101/24002202/",
                "シガーバーリスト（近畿一覧） http://cigarbarlist.gourmet.coocan.jp/kinki.html"
              ]
            },
            {
              "name": "ALCOHALL（アルコホール）",
              "type": "バー（葉巻あり）",
              "area": "松阪市・駅部田町",
              "desc": "松阪市のダイニングバー。カウンターに多数の酒が並び、テーブル席もあるグループ利用も可能な店。シガーバーリストでは葉巻を扱う店として掲載されている。",
              "note": "掲載情報がやや古く、現在の営業状況・葉巻取扱の継続は確認できなかったため要確認。",
              "status": "要確認",
              "sources": [
                "食べログ（アルコホール 東松阪） https://tabelog.com/en/mie/A2401/A240102/24008455/",
                "シガーバーリスト（近畿一覧） http://cigarbarlist.gourmet.coocan.jp/kinki.html"
              ]
            }
          ],
          "sources": [
            "シガーショップの住所録（三重県） http://chankaz.net/cigarshop/mie",
            "シガーバーリスト（近畿一覧） http://cigarbarlist.gourmet.coocan.jp/kinki.html",
            "Smith Corporation（田中リビング紹介） https://smithcorp.jp/introduce-store/2015/09/7183/",
            "食べログ（Bar Range） https://tabelog.com/mie/A2402/A240201/24016742/"
          ]
        },
        {
          "code": "shiga",
          "pref": "滋賀県",
          "pref_en": "Shiga",
          "region": "近畿",
          "prefNote": "滋賀県は葉巻専門店・シガーバーが非常に少ない。確実に葉巻を楽しめる/購入できるのは彦根のSalon Bar Thistle（バー）と草津の崎村商店（酒・たばこ専門店）が中心。大津のシガーバー系店舗はディレクトリ掲載のみで現況の確認が必要。",
          "shops": [
            {
              "name": "Salon Bar Thistle（サロンバー・シスル）",
              "type": "シガーバー",
              "area": "彦根市・彦根駅西口（ホテルサンルート彦根1F）",
              "desc": "彦根駅西口から徒歩約3分、ホテルサンルート彦根内にあるシガーバー。ウイスキーなど洋酒や地元武将をイメージしたオリジナルカクテルとともに葉巻を楽しめ、スタッフが選び方や扱い方を教えてくれるため初心者でも入りやすい。滋賀県内で葉巻と酒をゆっくり味わえる数少ない店として知られる。",
              "note": "店名はスコットランドの国花シスル（アザミ）に由来。ランチ営業も行うが、バーは通年営業。",
              "status": "営業",
              "sources": [
                "Salon Bar Thistle 公式サイト (シガーバー) http://www.bar-thistle.jp/cigar.html",
                "ヒトサラ Salon Bar Thistle (紹介ページ) https://hitosara.com/0006011826/"
              ]
            },
            {
              "name": "Liquor & Cigar SAKIMURA（崎村商店）",
              "type": "専門店",
              "area": "草津市草津（国道1号沿い）",
              "desc": "国道1号沿いにある酒・たばこの専門店で、世界各国の葉巻・シガー、手巻きたばこ、地域限定たばこなどを幅広く扱う。オリジナルの草津ブランド地酒・ワインなども販売。実店舗のほかオンラインストアでも葉巻を購入できる。",
              "note": "全国タバコショップリーダースクラブ(TLC)加盟店。営業時間の目安10:00〜20:00、水曜定休（変更の可能性あり要確認）。",
              "status": "営業",
              "sources": [
                "崎村商店 公式オンラインストア (葉巻カテゴリ) https://www.932.co.jp/ec/products/list?category_id=4",
                "TLC 全国タバコショップリーダースクラブ Liquor&Cigar SAKIMURA (加盟店ページ) https://www.tlc-net.co.jp/shop/5315/"
              ]
            },
            {
              "name": "シガーバー オヤジ（Cigar Bar oyaji）",
              "type": "シガーバー",
              "area": "大津市大萱",
              "desc": "大津市大萱エリアにあるとされるシガーバー。葉巻を扱うバーとしてシガーバー系の店舗ディレクトリに掲載されている。品揃えや雰囲気の詳細な公開情報は乏しい。",
              "note": "公式サイトや最新の営業情報が確認できず、ディレクトリ掲載情報のみのため現況は要確認。",
              "status": "要確認",
              "sources": [
                "シガーバーリスト近畿一覧 (店舗ディレクトリ) http://cigarbarlist.gourmet.coocan.jp/kinki.html"
              ]
            }
          ],
          "sources": [
            "食べログ 滋賀 シガーバー検索 https://tabelog.com/keywords/%E3%82%B7%E3%82%AC%E3%83%BC%E3%83%90%E3%83%BC/shiga/kwdLst/bar/",
            "シガーバーリスト近畿一覧 http://cigarbarlist.gourmet.coocan.jp/kinki.html",
            "崎村商店 公式サイト https://www.932.co.jp/home/",
            "Salon Bar Thistle 公式サイト http://www.bar-thistle.jp/"
          ]
        },
        {
          "code": "kyoto",
          "pref": "京都府",
          "pref_en": "Kyoto",
          "region": "近畿",
          "prefNote": "京都府の葉巻拠点は京都市内に集中する。キューバ葉巻専門店「点 葉巻室」（会員制）を筆頭に、祇園のシガーバーSUI、二条の樹sBAR、木屋町のCordon Noir、ホテルバーのBAR ANCHORなど、専門店とシガーを扱うバーが揃う。祇園エリアにはHabanos Specialist（正規取扱店）の所在も海外シガー情報サイトで報告されている。",
          "shops": [
            {
              "name": "点 葉巻室（Ten / 点 喫茶室 葉巻部）",
              "type": "専門店（バー併設）",
              "area": "京都市上京区・神宮丸太町",
              "desc": "珈琲や紅茶とともに葉巻を味わえるキューバ葉巻専門店。喫茶室と葉巻室を備えた落ち着いた空間で、キューバ産シガーを中心に扱う。原則として現会員の紹介が必要な会員制で、京都御所・西陣エリアの大人の隠れ家として知られる。",
              "note": "会員制（紹介制）。営業時間13:00〜21:00程度。",
              "status": "営業",
              "sources": [
                "点 葉巻室 公式サイト (専門店) https://ten.kyoto.jp/",
                "食べログ 点 葉巻室（神宮丸太町/バー） https://tabelog.com/en/kyoto/A2601/A260302/26038832/"
              ]
            },
            {
              "name": "シガーバー SUI（粋 / Cigar Bar SUI Gion）",
              "type": "シガーバー",
              "area": "京都市東山区・祇園",
              "desc": "2022年秋に祇園に誕生した、割烹「粋」に併設のシガーバー。ハバノスを含む厳選された葉巻と銘酒・ワイン・シャンパンを、古都の風情ある空間で楽しめる。2026年1月のリニューアルで1階は禁煙バー、2階をシガーバーとして営業。",
              "note": "祇園エリアはHabanos Specialist（正規取扱）とされるシガー店の所在も報告されており、SUIもハバノスを扱う。",
              "status": "営業",
              "sources": [
                "京都祇園 シガーバー SUI 公式サイト (シガーバー) https://gion-sui.com/cigar_bar/",
                "Instagram Cigar Bar SUI Gion https://www.instagram.com/bar_sui__gion_kyoto/"
              ]
            },
            {
              "name": "樹sBAR（ITSUKI's Bar）",
              "type": "バー（葉巻あり）",
              "area": "京都市中京区・二条城前／二条駅",
              "desc": "二条駅・二条城前からすぐの葉巻を楽しめるオーセンティックバー。SANCHO PANZA、JOSE L PIEDRA、VEGAFINAなどの葉巻を揃え、ウイスキー・ビール・カクテルとともに味わえる。14年以上続く地元で定着した店。",
              "note": "",
              "status": "営業",
              "sources": [
                "ITSUKI'sBar 公式サイト シガーメニュー (バー) https://itsukisbar.xyz/cigar-menu/",
                "食べログ 樹's bar（二条城前/バー） https://tabelog.com/en/kyoto/A2601/A260203/26025409/"
              ]
            },
            {
              "name": "Bar Cordon Noir（バー コルドンノワール）",
              "type": "バー（葉巻あり）",
              "area": "京都市中京区・木屋町／先斗町（三条）",
              "desc": "先斗町と木屋町の間にあるウイスキーバー。ボトル1000本以上を揃え、キューバ産シガーも用意する。ウイスキーを中心に据えた大人向けの空間。営業19:00〜翌3:00頃、水曜定休。",
              "note": "",
              "status": "営業",
              "sources": [
                "サントリー BAR-NAVI Bar Cordon Noir (バー) https://bar-navi.suntory.co.jp/shop/0752123288/",
                "食べログ Cordon Noir（三条/バー） https://tabelog.com/en/kyoto/A2601/A260202/26004606/"
              ]
            },
            {
              "name": "BAR ANCHOR（バー アンカー）",
              "type": "ホテルラウンジ",
              "area": "京都市下京区・四条烏丸（からすま京都ホテル）",
              "desc": "からすま京都ホテル直営のオーセンティックバー。シングルモルトを中心とした充実の品揃えに加え、シガーも用意する。四条駅・烏丸駅から徒歩1分の落ち着いた大人の空間。",
              "note": "",
              "status": "営業",
              "sources": [
                "からすま京都ホテル 公式サイト バー アンカー (ホテルバー) https://www.hotel.kyoto/karasuma/restaurant/anchor/",
                "一休.comレストラン BAR ANCHOR https://restaurant.ikyu.com/104601"
              ]
            },
            {
              "name": "angelini（アンジェリーニ）",
              "type": "バー（葉巻あり）",
              "area": "京都市東山区・祇園四条",
              "desc": "祇園四条エリアのバーで、シガーバーとして紹介される喫煙可の店。葉巻を楽しめるバーとして各種バーリストに掲載されている。詳細な品揃え・雰囲気は公開情報が限られる。",
              "note": "公開情報が少なく、最新の営業実態・葉巻の取扱内容は要確認。",
              "status": "要確認",
              "sources": [
                "食べログ angelini（祇園四条/バー） https://tabelog.com/en/kyoto/A2601/A260301/26026126/"
              ]
            }
          ],
          "sources": [
            "食べログ 京都のシガーバー一覧 https://tabelog.com/keywords/%E3%82%B7%E3%82%AC%E3%83%BC%E3%83%90%E3%83%BC/kyoto/kwdLst/BC01/",
            "サントリー BAR-NAVI 京都府シガーが充実のバー https://bar-navi.suntory.co.jp/search/f__26/p__520/",
            "シガーショップの住所録 京都府 http://chankaz.net/cigarshop/kyoto",
            "Habano Mag Kyoto cigar shops https://habanomag.com/cigar-shop-location/kyoto/"
          ]
        },
        {
          "code": "osaka",
          "pref": "大阪府",
          "pref_en": "Osaka",
          "region": "近畿",
          "prefNote": "大阪は東京に次ぐシガー激戦区。北新地・梅田・淀屋橋・心斎橋にシガーバーとハバノス取扱店が集中し（スーペルノーバ、エドモンダンテス、洋煙、シガークラブ等）、豊中・高槻など郊外には葉巻を扱う大型たばこ専門店（シリウスタバコ、阪口商店）がある。かつてはホテルバーでも葉巻を楽しめたが、リッツ・カールトン大阪のように葉巻の提供を終了した施設もある。バー併設・商業施設内テナントは時期により営業状況が変わるため、来店前の確認を推奨。",
          "shops": [
            {
              "name": "シガーネスト（Cigar Nest）",
              "type": "シガーバー",
              "area": "大阪市中央区・道頓堀（ミナミ）",
              "desc": "道頓堀・宗右衛門町エリアのシガーバー／シガーカフェ。昼過ぎから営業し、コーヒーやカクテル・ラムとともに葉巻をゆっくり味わえる隠れ家的な一軒。2020年12月開業。",
              "note": "紙巻きも可だが葉巻を優先。火曜定休（営業時間・定休は変動しうるため要確認）。",
              "status": "営業",
              "sources": [
                "Cigar nest (Retty) https://retty.me/area/PRE27/ARE94/SUB9502/100001562004/",
                "Cigar nest（シガーネスト）(ホットペッパー) https://www.hotpepper.jp/strJ004136161/",
                "シガーネスト 公式Facebook https://www.facebook.com/cigarnest/"
              ]
            },
            {
              "name": "シガーバー スーペルノーバ 北新地店（Cigar Bar Super Nova Kitashinchi）",
              "type": "シガーバー",
              "area": "大阪市北区・北新地",
              "desc": "西日本を代表するシガーバーのひとつ。約100種類・2000本以上のキューバ産（ハバノス）シガーを西日本最大級のカスタムメイド・ヒュミドールで管理する。シガーマネージャーが好みに合わせて一本を提案し、モヒートなどキューバカクテルやラムも揃う。",
              "note": "系列に淀屋橋店・東京銀座店（2022年開業）がある。",
              "status": "営業",
              "sources": [
                "大阪シガーバー北新地 スーペルノーバ (公式) https://bar.cuba-cigar.jp/",
                "食べログ (店舗情報) https://tabelog.com/en/osaka/A2701/A270101/27066542/"
              ]
            },
            {
              "name": "シガーバー スーペルノーバ 淀屋橋店（Cigar Bar Super Nova）",
              "type": "シガーバー",
              "area": "大阪市中央区・淀屋橋",
              "desc": "スーペルノーバの1号店で、もとはミナミで開業し淀屋橋へ移転した店舗。キューバ産シガーを豊富に揃え、専任スタッフが葉巻選びから火の付け方まで案内する隠れ家的なシガーバー。",
              "note": "1号店はミナミから淀屋橋へ移転した経緯がある。",
              "status": "営業",
              "sources": [
                "シガーバー スーペルノーバ淀屋橋店 (公式) https://www.cigarbar.jp/",
                "食べログ (店舗情報) https://tabelog.com/en/osaka/A2701/A270102/27001747/"
              ]
            },
            {
              "name": "葉巻喫茶 洋煙 -ヨウエン-（Cigar Youen）",
              "type": "シガーラウンジ",
              "area": "大阪市中央区・北浜／高麗橋",
              "desc": "2023年8月開業。熟練職人が手巻きした高品質なキューバ産シガーのみを提供する葉巻喫茶。喫煙はキューバ産シガーに限られ（紙巻・電子・パイプは不可）、席料は500円。持込は1本1000円のシガーチャージ（非キューバ産の持込は不可）。営業12:00〜24:00、水曜定休。",
              "note": "",
              "status": "営業",
              "sources": [
                "葉巻喫茶 洋煙 (公式) https://youen-cigar.jp/",
                "Instagram (公式) https://www.instagram.com/youen_cigar/"
              ]
            },
            {
              "name": "シガーバー エドモンダンテス（cigar Bar Edmundo Dantes）",
              "type": "シガーバー",
              "area": "大阪市中央区・心斎橋",
              "desc": "心斎橋筋にあるシガーバー。パルタガス、ポル・ラライニャ、オヨ・デ・モンテレイ、ラモン・アロネスなどキューバンシガーを豊富に揃え、葉巻のプロが要望に合わせて一本を選んでくれる。営業19:00〜翌4:00、日曜定休。",
              "note": "",
              "status": "営業",
              "sources": [
                "BAR-NAVI (サントリー) https://bar-navi.suntory.co.jp/shop/0X00070098/",
                "食べログ (店舗情報) https://tabelog.com/en/osaka/A2701/A270201/27074228/"
              ]
            },
            {
              "name": "シガークラブ（Cigar Club）",
              "type": "専門店",
              "area": "大阪市北区・梅田（ハービス）",
              "desc": "1999年開業の関西初のシガー専門店とされる。落ち着いた店内に約180種類のハバナシガーをはじめ、シガーカッターやヒュミドール、プライベートロッカーなどを揃え、専門知識を持つスタッフが対応する。所在地はハービス大阪梅田内。",
              "note": "商業施設内テナントのため、最新の営業状況は要確認。",
              "status": "営業",
              "sources": [
                "HERBIS ハービス (公式 店舗紹介) https://www.herbis.jp/shop/detail/4"
              ]
            },
            {
              "name": "たばこ専門店 さくらんぼ",
              "type": "専門店",
              "area": "大阪市北区・梅田／東通り（堂山町）",
              "desc": "梅田・東通商店街のたばこ専門店。紙巻・手巻き・パイプに加え葉巻（シガー）も取り扱い、約600種類のたばこ製品を揃える。実店舗のほか通販も行う。営業は22時頃まで。",
              "note": "",
              "status": "営業",
              "sources": [
                "たばこ専門店 さくらんぼ (公式) https://www.tabako-sakuranbo.co.jp/",
                "葉巻の通販・販売 (公式) https://tabako-sakuranbo.co.jp/goods/c03.php"
              ]
            },
            {
              "name": "たばこ専門店 阪口商店",
              "type": "専門店",
              "area": "高槻市・芥川町",
              "desc": "高槻市のたばこ専門店で、市内最大級の品揃え。葉巻（シガー）を多数取り扱うほか、手巻きたばこ・パイプたばこも豊富に揃える。",
              "note": "",
              "status": "営業",
              "sources": [
                "たばこ専門店 阪口商店 (公式) http://www.tabako-sakaguchi.jp/",
                "Smith Corporation (取扱店紹介) https://smithcorp.jp/introduce-store/2015/08/7042/"
              ]
            },
            {
              "name": "シリウスタバコ（庄内店）",
              "type": "専門店",
              "area": "豊中市・庄内西町",
              "desc": "国内最大級の品揃えを掲げる大型たばこ＆喫煙具専門店。紙巻・手巻き・パイプ・煙管に加え、プレミアムシガーをウォークインヒュミドールで管理し、ハバナを含む葉巻を取り扱う。庄内WEST商店街内。",
              "note": "",
              "status": "営業",
              "sources": [
                "シリウスタバコ (公式) https://www.tabako.co.jp/",
                "Smith Corporation (取扱店紹介) https://smithcorp.jp/introduce-store/2015/08/6917/"
              ]
            },
            {
              "name": "ザ・バー／ザ・リッツ・カールトン大阪（The Bar, The Ritz-Carlton Osaka）",
              "type": "ホテルラウンジ",
              "area": "大阪市北区・梅田／北新地",
              "desc": "ザ・リッツ・カールトン大阪のメインバー。モルトウイスキーやマティーニなど計460種類の酒を揃え、ジャズの生演奏が流れる重厚な空間。かつては16種類のシガーを揃え葉巻を楽しめたが、現在は葉巻の提供・喫煙を終了している。",
              "note": "以前はシガーを楽しめるホテルバーとして知られたが、現在は葉巻の提供・館内での喫煙を終了したとされる（2026年時点）。バー自体は営業。",
              "status": "葉巻提供終了（2026年）",
              "sources": [
                "ザ・バー ザ・リッツ・カールトン大阪 (公式) https://thebar.ritzcarltonosaka.com/"
              ]
            },
            {
              "name": "ブルーバー（Blue Bar）／ウェスティンホテル大阪",
              "type": "ホテルラウンジ",
              "area": "大阪市北区・新梅田シティ",
              "desc": "ウェスティンホテル大阪内のバーで、葉巻を楽しめるホテルバーとして紹介されている。品揃えや喫煙可否の詳細は公開情報が限られる。",
              "note": "ホテルバーでのシガー提供に関する二次情報が中心のため、最新の取扱状況は要確認。",
              "status": "要確認",
              "sources": [
                "だれどこ (紹介記事) https://travel.gpoint.co.jp/daredoko/t9299/"
              ]
            },
            {
              "name": "ARTEMIS（アルテミス）",
              "type": "バー（葉巻あり）",
              "area": "大阪市北区・梅田／茶屋町",
              "desc": "梅田・茶屋町のバーで、シガーが充実した店として複数のバー案内で紹介されている。専門店ではなくシガーも楽しめるオーセンティックバーの位置づけ。",
              "note": "シガー専門ではなくバーでの取扱。最新の営業・取扱状況は要確認。",
              "status": "要確認",
              "sources": [
                "シガーバーリスト大阪一覧 (まとめ) http://cigarbarlist.gourmet.coocan.jp/oosaka.html"
              ]
            }
          ],
          "sources": [
            "シガーバーリスト大阪一覧 http://cigarbarlist.gourmet.coocan.jp/oosaka.html",
            "BAR-NAVI (サントリー) 大阪府シガー充実店 https://bar-navi.suntory.co.jp/search/f__27/c__505/p__520/",
            "食べログ 大阪 シガーバー https://tabelog.com/keywords/%E3%82%B7%E3%82%AC%E3%83%BC%E3%83%90%E3%83%BC/osaka/kwdLst/",
            "Smith Corporation 大阪市内たばこ店紹介 https://smithcorp.jp/introduce-store/2016/10/10526/"
          ]
        },
        {
          "code": "hyogo",
          "pref": "兵庫県",
          "pref_en": "Hyogo",
          "region": "近畿",
          "prefNote": "兵庫県の葉巻拠点は神戸市（中央区の元町・三宮・北野、灘区の六甲道）にほぼ集中する。元町の老舗専門店「杉本酒販（葉巻の世界）」が県内最大級の品揃えで販売の中心を担い、三宮周辺には安藤忠雄設計のLAGUNA THE BAR、キューバ葉巻を揃えるGRAND BAR、県初のシガーアドバイザーが営むPaPa Hemingway、BAR ASHIBEなどシガーを扱うバーが集まる。姫路駅周辺にもシガーを置くオーセンティックバーがBAR-NAVI等に掲載されるが、確たる名の専門店・シガーバーは公開情報では特定できず要確認。",
          "shops": [
            {
              "name": "杉本酒販株式会社（葉巻の世界 / Sugimoto）",
              "type": "専門店",
              "area": "神戸市中央区・元町（元町1番街）",
              "desc": "創業70年超の酒・たばこの老舗で、県内最大級の品揃えを誇る葉巻専門売り場「葉巻の世界」を展開。手頃なシガリロやドライシガーから、ホンジュラス・ドミニカ・ジャマイカ産、そして最高級のキューバ葉巻まで約700種を扱い、灘の地酒や神戸ブランデーも並ぶ。ヴィンテージのコニャックやラム、シェリーと葉巻を合わせる楽しみ方を提案している。",
              "note": "営業時間の目安は10:00〜19:00（日祝は12:00〜）。第3水曜・盆・年末年始が休み。",
              "status": "営業",
              "sources": [
                "杉本酒販 葉巻の世界 公式サイト (専門店) https://www.cigar.co.jp/",
                "神戸元町商店街 杉本酒販（株） (店舗紹介) https://www.kobe-motomachi.or.jp/shop-search/33"
              ]
            },
            {
              "name": "LAGUNA THE BAR（ラグナ ザ バー）",
              "type": "シガーバー",
              "area": "神戸市中央区・北野／ハンター坂（三宮）",
              "desc": "建築家・安藤忠雄が設計したコンクリート打ち放しの建物2階にある神戸を代表するオーセンティックバー。高い天井と一枚板のロングカウンター、壁の丸い穴から漏れる間接照明が幻想的な大人の空間を作る。食べログのシガーバーとしても掲載され、葉巻を楽しめる名店として知られる。",
              "note": "食べログ バー百名店に選出歴あり。営業19:00〜翌2:30頃。",
              "status": "営業",
              "sources": [
                "食べログ LAGUNA THE BAR（三宮/バー） https://tabelog.com/hyogo/A2801/A280101/28005558/",
                "食べログ 神戸市のシガーバー一覧 https://tabelog.com/keywords/%E3%82%B7%E3%82%AC%E3%83%BC%E3%83%90%E3%83%BC/hyogo/C28100/kwdLst/BC01/"
              ]
            },
            {
              "name": "GRAND BAR（グランド・バー）",
              "type": "シガーバー",
              "area": "神戸市中央区・下山手通（三宮）",
              "desc": "三宮駅から徒歩5分、生田社会館ビル3階にあるシガーバー。幅1mのカウンターや半個室のソファ席を備え、ホテルラウンジのような洗練された雰囲気。キューバ産を中心とした約50種のプレミアムシガーを良好なコンディションで揃え、シャンパンや上質なワインとのペアリングを楽しめる。",
              "note": "",
              "status": "営業",
              "sources": [
                "GRAND BAR 公式サイト (シガーバー) https://grandbar.jp/",
                "シガーコネクション GRAND BAR 紹介 https://www.cigar-connection.net/contents/bar001",
                "食べログ GRAND BAR（三宮/バー） https://tabelog.com/hyogo/A2801/A280101/28003268/"
              ]
            },
            {
              "name": "PaPa Hemingway（パパ ヘミングウェイ）",
              "type": "バー（葉巻あり）",
              "area": "神戸市中央区・中山手通（三宮）",
              "desc": "「葉巻のあるオーセンティックバー」を掲げる三宮のバー。オーナーの福冨淳也氏は国際バーテンダーであり兵庫県初のシガーアドバイザーで、パルタガスなどの葉巻をカクテルやスコッチ・バーボンとともに楽しめる。14脚のロングカウンターを備え、全席喫煙可。",
              "note": "営業18:00〜翌2:00頃（日祝は〜24:00）。",
              "status": "営業",
              "sources": [
                "PaPa Hemingway 公式サイト (バー) https://papa-hemingway.studio.site/",
                "サントリー BAR-NAVI PaPa Hemingway https://bar-navi.suntory.co.jp/shop/0783912838/",
                "食べログ Papa Hemingway（三宮/バー） https://tabelog.com/en/hyogo/A2801/A280101/28023033/"
              ]
            },
            {
              "name": "BAR ASHIBE（バー アシベ）",
              "type": "バー（葉巻あり）",
              "area": "神戸市中央区・下山手通（三宮）",
              "desc": "三宮駅から徒歩5分、生田社会館ビルにある落ち着いた雰囲気のバー。薄暗い照明とカウンター奥に並ぶ酒瓶が印象的で、葉巻を店内で吸えるほか店頭販売も行っている。フローズンカクテルやフードも揃い、明朗会計で入りやすい老舗。",
              "note": "営業19:00〜翌4:00頃、年中無休。",
              "status": "営業",
              "sources": [
                "サントリー BAR-NAVI BAR ASHIBE https://bar-navi.suntory.co.jp/shop/0783912039/",
                "食べログ BAR ashibe（三宮/バー） https://tabelog.com/en/hyogo/A2801/A280101/28001034/"
              ]
            },
            {
              "name": "Bar Sanctuary（バー サンクチュアリ）",
              "type": "シガーバー",
              "area": "神戸市灘区・六甲道",
              "desc": "2021年12月に六甲道にオープンしたシガーバー。葉巻好きの神戸大学の学生4人が「あなたにとっての聖域」をコンセプトに創業した。定番の葉巻に加え入手困難な限定品や、葉巻入門者向けのシガリロも用意し、換気・消臭に配慮。ノンアルコールカクテルもあり葉巻の好みを問わず楽しめる。",
              "note": "2021年12月開業。",
              "status": "営業",
              "sources": [
                "MotionGallery Bar Sanctuary 開業プロジェクト (クラウドファンディング) https://motion-gallery.net/projects/sanctuary",
                "食べログ Bar Sanctuary（六甲道/バー） https://tabelog.com/hyogo/A2801/A280108/28063160/"
              ]
            }
          ],
          "sources": [
            "食べログ 神戸市のシガーバー一覧 https://tabelog.com/keywords/%E3%82%B7%E3%82%AC%E3%83%BC%E3%83%90%E3%83%BC/hyogo/C28100/kwdLst/BC01/",
            "サントリー BAR-NAVI 兵庫県シガーが充実のバー https://bar-navi.suntory.co.jp/search/f__28/p__520/",
            "シガーバーリスト 近畿一覧 http://cigarbarlist.gourmet.coocan.jp/kinki.html",
            "杉本酒販 葉巻の世界 公式サイト https://www.cigar.co.jp/"
          ]
        },
        {
          "code": "nara",
          "pref": "奈良県",
          "pref_en": "Nara",
          "region": "近畿",
          "prefNote": "奈良県は葉巻専門店・シガーバーの数は多くないが、御所市の『たばこセンター米田』は海外にもファンを持つ本格的な葉巻専門店として突出した存在。物販は御所・生駒・奈良市に点在し、喫煙して楽しめる場は奈良ホテルのバーが中心。プレミアムハバノスの常設在庫は米田・奈良ホテルに集中し、その他はシガリロ・リトルシガー中心の傾向。",
          "shops": [
            {
              "name": "たばこセンター米田（Tobacco Center Komeda）",
              "type": "専門店",
              "area": "御所市・大広町（近鉄御所駅すぐ）",
              "desc": "海外にも熱狂的なファンがいる葉巻・パイプの老舗専門店。ウォークインヒュミドールを備え、プレミアムシガーの品揃えが豊富。パイプ、シガーカッター、ヒュミドール、世界のたばこ、ZIPPO等も扱い、店主が海外で直接買い付ける。葉巻の吸い方のアドバイスも受けられる。",
              "note": "奈良県で最も本格的な葉巻取扱店の一つとして知られる。",
              "status": "営業",
              "sources": [
                "たばこセンター米田 公式サイト (店舗) https://tobacco-center.jp/",
                "日本パイプクラブ連盟 (紹介記事) http://www.pipeclub-jpn.org/shop/shop_komeda.html",
                "Smith Corporation (取扱店紹介) https://smithcorp.jp/introduce-store/2015/08/7087/"
              ]
            },
            {
              "name": "ブルーレース（Blue Race）",
              "type": "専門店",
              "area": "生駒市・生駒駅前",
              "desc": "創業25年超のたばこ・喫煙具・宝くじ専門店。葉巻はシガリロ・リトルシガーを中心に各種銘柄を取り揃え、手巻きたばこ（シャグ）の取り扱いに特に力を入れている。オンラインでも葉巻を含む商品を扱い、取り寄せ相談も可。",
              "note": "プレミアムシガーよりシガリロ・リトルシガー中心。",
              "status": "営業",
              "sources": [
                "ブルーレース 公式サイト 葉巻・シガー (店舗) https://nara-tobacco.com/menu/c1036700",
                "Smith Corporation (取扱店紹介) https://smithcorp.jp/introduce-store/2015/08/7081/"
              ]
            },
            {
              "name": "FUMARE（フマーレ）",
              "type": "専門店",
              "area": "奈良市・東登美ヶ丘",
              "desc": "手巻きタバコを中心に、レアな紙巻きタバコ、ドライシガーやリトルシガーなどを扱うたばこ店。喫煙具やアクセサリーも取り扱う。",
              "note": "SNS（X @fumare_nara）で商品情報を発信。プレミアムハバノスの常設在庫は要確認。",
              "status": "営業",
              "sources": [
                "Smith Corporation (取扱店紹介) https://smithcorp.jp/introduce-store/2016/10/10614/",
                "FUMARE @たばこ屋 (公式X) https://x.com/fumare_nara"
              ]
            },
            {
              "name": "緑屋",
              "type": "専門店",
              "area": "奈良市・右京",
              "desc": "インドネシア産タバコの取扱店として紹介されており、葉巻や手巻きタバコを販売しているとされるたばこ店。品揃えの詳細は公開情報が限られる。",
              "note": "葉巻の常設取扱範囲は公開情報が少なく要確認。",
              "status": "要確認",
              "sources": [
                "Smith Corporation (取扱店紹介) https://smithcorp.jp/introduce-store/2015/08/7085/"
              ]
            },
            {
              "name": "奈良ホテル ザ・バー（THE BAR）",
              "type": "ホテルラウンジ",
              "area": "奈良市・高畑町（奈良ホテル）",
              "desc": "明治創業の奈良ホテル本館1Fにあるクラシックなオーセンティックバー。カウンターとソファ席を備え、世界のスピリッツやオリジナルカクテルとともに葉巻（シガー）の品揃えが充実しており、葉巻を楽しむ客も多い。全席喫煙可の空間。",
              "note": "シガーマップ等の葉巻対応店リストにも掲載。",
              "status": "営業",
              "sources": [
                "奈良ホテル 公式サイト バー「ザ・バー」 (店舗) https://www.narahotel.co.jp/restaurant/bar_the_bar/",
                "CigarMap ザ・バー (葉巻対応店) https://www.cigarmap.info/venue.php?id=838",
                "食べログ 奈良ホテル ザ・バー (口コミ) https://tabelog.com/en/nara/A2901/A290101/29000989/"
              ]
            },
            {
              "name": "THE BAR（登大路ホテル）",
              "type": "シガーバー",
              "area": "奈良市・登大路町（登大路ホテル）",
              "desc": "シガーコネクションのシガーバー紹介ページに掲載されている、奈良市登大路町の登大路ホテル内のバー。葉巻を楽しめる店として案内されている。",
              "note": "上記の奈良ホテル『ザ・バー』とは別施設。詳細・現況は公開情報が限られるため要確認。",
              "status": "要確認",
              "sources": [
                "シガーコネクション THE BAR (シガーバー紹介) https://www.cigar-connection.net/contents/bar013"
              ]
            }
          ],
          "sources": [
            "シガーショップの住所録 奈良県 http://chankaz.net/cigarshop/nara",
            "Smith Corporation 奈良県・三重県のタバコ店紹介 https://smithcorp.jp/introduce-store/2016/10/10614/",
            "たばこセンター米田 公式 https://tobacco-center.jp/",
            "ブルーレース 公式 https://nara-tobacco.com/",
            "奈良ホテル ザ・バー 公式 https://www.narahotel.co.jp/restaurant/bar_the_bar/"
          ]
        },
        {
          "code": "wakayama",
          "pref": "和歌山県",
          "pref_en": "Wakayama",
          "region": "近畿",
          "prefNote": "和歌山県には葉巻専門店やハバノス正規取扱を明確に確認できるシガーバー・シガーラウンジは公開情報上ほとんど見当たらない（2026-07-16時点）。和歌山市のオーセンティックバー『BAR DEN』が葉巻を楽しめる店として案内される程度で、葉巻愛好家は大阪市内の専門店・シガーバーを利用する傾向とみられる。なお検索で和歌山関連として挙がる『世界のたばこHAMAYA』は大阪府堺市（北野田）、『田辺商店』は大分県の店で、いずれも和歌山県内店ではない点に注意。",
          "shops": [
            {
              "name": "BAR DEN（バー デン）",
              "type": "バー（葉巻あり）",
              "area": "和歌山市・岡山丁（けやき大通り／JR和歌山駅周辺）",
              "desc": "「男の書斎」をイメージした落ち着いたオーセンティックバー。経験30年超のマスターが立ち、100種類以上のウイスキーとカクテルを揃える。カウンター7席・テーブル7席の小規模店で、サントリーBAR-NAVIの『葉巻・シガー』フリーワード検索に含まれるなど葉巻を楽しめる店として案内されている。",
              "note": "葉巻（シガー）の常備・銘柄については公開情報で明確な記載が乏しく要確認。バー自体は営業中（2023年頃に開店10周年を迎えた旨の地元記事あり）。",
              "status": "営業",
              "sources": [
                "食べログ BAR DEN (バー) https://tabelog.com/wakayama/A3001/A300101/30004192/",
                "和歌山経済新聞『和歌山駅近くのバー「DEN」が10周年』(ニュース) https://wakayama.keizai.biz/headline/361/",
                "サントリー BAR-NAVI 葉巻・シガー フリーワード検索 (バー検索) https://bar-navi.suntory.co.jp/search/freeword/query___97t_8A_AA+_83V_83K_81_5B/"
              ]
            }
          ],
          "sources": [
            "食べログ BAR DEN https://tabelog.com/wakayama/A3001/A300101/30004192/",
            "和歌山経済新聞 https://wakayama.keizai.biz/headline/361/",
            "サントリー BAR-NAVI 和歌山県 https://bar-navi.suntory.co.jp/search/f__30/",
            "シガーバーリスト 近畿一覧 http://cigarbarlist.gourmet.coocan.jp/kinki.html"
          ]
        }
      ]
    },
    {
      "region": "中国",
      "prefectures": [
        {
          "code": "tottori",
          "pref": "鳥取県",
          "pref_en": "Tottori",
          "region": "中国",
          "prefNote": "鳥取県には葉巻専門店やハバノス正規取扱を明示するシガーバーは公開情報上ほぼ確認できず、実態は米子市のたばこ専門店（葉巻も扱う）と、鳥取市のワインバー（葉巻提供あり）が中心。プレミアムシガー中心の本格的なシガーバー・ラウンジは2026-07-16時点で確認できなかった。",
          "shops": [
            {
              "name": "米子東タバコセンター（東タバコセンター）",
              "type": "専門店",
              "area": "米子市・熊党",
              "desc": "山陰で品揃え随一とされるたばこ専門店で、手巻きタバコやパイプ煙草に加え、葉巻（シガー）やシガリロを取り扱う。知識豊富な店主が銘柄選びの相談に応じてくれる点で評価されている。",
              "note": "地域メディア（鳥取マガジン）が『品揃え山陰で一番』と紹介。プレミアムシガーの常時在庫状況は要確認。",
              "status": "営業",
              "sources": [
                "鳥取マガジン (地域メディア/店舗紹介) https://tottorimagazine.com/sichouson/yonagoshi/tabacco/",
                "マピオン電話帳 (店舗情報) https://www.mapion.co.jp/phonebook/M02031/31202/23130033194/"
              ]
            },
            {
              "name": "ラ・コルク（La Koruku、旧ワイン ダイニング コルク）",
              "type": "バー（葉巻あり）",
              "area": "鳥取市・末広温泉町（鳥取駅周辺）",
              "desc": "鳥取駅から徒歩約5分のワイン・ダイニングバー。500種前後の酒類を揃え、鳥取和牛やのどぐろなどの地元食材料理を出す。口コミでは『鳥取では数少ない葉巻が楽しめる店』とされ、シガーの提供がある。",
              "note": "旧店名『ワイン ダイニング コルク』が移転・改称して現在の『ラ・コルク』となった。葉巻の常時提供・銘柄は要確認。",
              "status": "営業",
              "sources": [
                "食べログ (グルメ情報/ラ・コルク) https://tabelog.com/tottori/A3101/A310101/31006476/",
                "食べログ (口コミ/ワイン ダイニング コルク・葉巻の記載) https://tabelog.com/tottori/A3101/A310101/31002445/dtlrvwlst/B117361275/"
              ]
            }
          ],
          "sources": [
            "鳥取マガジン https://tottorimagazine.com/sichouson/yonagoshi/tabacco/",
            "食べログ（ラ・コルク） https://tabelog.com/tottori/A3101/A310101/31006476/",
            "BAR-NAVI 鳥取県シガー充実バー https://bar-navi.suntory.co.jp/search/f__31/p__520/",
            "シガーショップ住所録（鳥取県） http://chankaz.net/cigarshop/tottori"
          ]
        },
        {
          "code": "shimane",
          "pref": "島根県",
          "pref_en": "Shimane",
          "region": "中国",
          "prefNote": "島根県で葉巻を扱う店は少数。出雲市の酒・タバコ専門店『西屋』が実店舗として葉巻・パイプを含む豊富な品揃えを持ち、松江市の『Bar Negras』がラムと葉巻を楽しめるシガーバーとして確認できる。両市以外では公開情報で葉巻専門店・シガーバーを確認できなかった（2026-07-16時点）。",
          "shops": [
            {
              "name": "西屋（Nishiya／酒とタバコの専門店 西屋）",
              "type": "専門店",
              "area": "出雲市矢野町",
              "desc": "出雲市の酒とタバコの専門店。世界各国の紙巻・手巻き（シャグ）に加え、葉巻（シガー）、パイプたばこを幅広く扱い、専用の「葉巻・キセル・パイプ」商品カテゴリーを設ける。ライターやシガーアクセサリー等の喫煙具も充実し、中国地方でも屈指の品揃えとされる。",
              "note": "実店舗＋通販あり。初心者の相談にも対応。ハバノス（キューバ産）取扱の有無は公開情報からは特定できず要確認。",
              "status": "営業",
              "sources": [
                "西屋 公式サイト（酒・タバコ専門店）https://saketabaco-nishiya.com/",
                "西屋 葉巻・キセル・パイプ 商品ページ https://saketabaco-nishiya.com/products/tobaccoitem/hamaki"
              ]
            },
            {
              "name": "Bar Negras（バー ネグラス）",
              "type": "シガーバー",
              "area": "松江市伊勢宮町（松江駅北口 徒歩約6分）",
              "desc": "ラムとシガー（葉巻）を主軸とするスピリッツバー。世界各地の希少ラムを多数揃え、季節のフレッシュフルーツカクテルも提供する。薄暗く落ち着いた大人の雰囲気で全席喫煙可、カウンター中心の小規模店。18時開店。",
              "note": "食べログ・BAR-NAVI等でシガー取扱を確認。葉巻の銘柄・ハバノス取扱の詳細は要確認。",
              "status": "営業",
              "sources": [
                "食べログ Bar Negras（松江/バー）https://tabelog.com/shimane/A3201/A320101/32007797/",
                "サントリー BAR-NAVI Bar Negras https://bar-navi.suntory.co.jp/shop/S000011366/"
              ]
            }
          ],
          "sources": [
            "西屋 公式サイト https://saketabaco-nishiya.com/",
            "西屋 葉巻・キセル・パイプ https://saketabaco-nishiya.com/products/tobaccoitem/hamaki",
            "食べログ Bar Negras https://tabelog.com/shimane/A3201/A320101/32007797/",
            "サントリー BAR-NAVI Bar Negras https://bar-navi.suntory.co.jp/shop/S000011366/"
          ]
        },
        {
          "code": "okayama",
          "pref": "岡山県",
          "pref_en": "Okayama",
          "region": "中国",
          "prefNote": "葉巻を吸えるシガーバーは岡山市中心部（北区・西川緑道公園／西川沿い）に集中し、老舗の『パラディ』と2022年開店の『CigarBar Kennedy』が代表格。小売は倉敷市児島の老舗たばこ店『たばこ屋しみず』と岡山市南区の輸入店『インポートショップ トレンド』がヒュミドール管理のプレミアムシガーを扱う。倉敷・県南部に葉巻専業のシガーバーは公開情報では確認できなかった（2026-07-16時点）。",
          "shops": [
            {
              "name": "パラディ（Paradis / Paradis cigar wine jazz bar）",
              "type": "シガーバー",
              "area": "岡山市北区・幸町（西川緑道公園沿い）",
              "desc": "岡山の中心街・西川緑道沿いにある岡山最古参とされるシガーバー。県内では珍しいシガー専用スペース（フロア）を備え、ヒュミドール管理のシガーを楽しめる。厳選ワインやフルーツカクテル、週末のライブジャズも特徴。ビギナーから愛好家まで対応。",
              "note": "「岡山でシガー専用スペースを持つのは当店のみ」と自称。総席数は約46席（メインバー＋シガーフロア）。",
              "status": "営業",
              "sources": [
                "パラディ公式サイト (店舗公式) https://www.paradisokayama.com/",
                "食べログ パラディ (グルメサイト) https://tabelog.com/en/okayama/A3301/A330101/33001131/"
              ]
            },
            {
              "name": "シガーバー ケネディ（CigarBar Kennedy）",
              "type": "シガーバー",
              "area": "岡山市北区・錦町（西川沿い）",
              "desc": "2022年1月に岡山市北区錦町にグランドオープンした、葉巻に特化したオーセンティックバー。ビル5階から西川の夜景を眺めながら、シガーとウイスキーやカクテルを楽しめる。株式会社日笠が運営。",
              "note": "運営：株式会社日笠。日曜定休。",
              "status": "営業",
              "sources": [
                "CigarBar Kennedy 公式サイト (店舗公式) https://hikasa-fb.com/",
                "株式会社日笠 グランドオープン告知 (運営会社) https://hikasa-kobe.com/2022/01/11/cigarbar-kennedy%E3%80%80%E5%B2%A1%E5%B1%B1%E5%B8%82%E5%8C%97%E5%8C%BA%E9%8C%A6%E7%94%BA%E3%81%AB%E3%82%B0%E3%83%A9%E3%83%B3%E3%83%89%E3%82%AA%E3%83%BC%E3%83%97%E3%83%B3/",
                "食べログ CigarBar Kennedy (グルメサイト) https://tabelog.com/en/okayama/A3301/A330101/33018495/"
              ]
            },
            {
              "name": "Yショップ 暮らしの店 しみず（たばこ屋しみず）",
              "type": "専門店",
              "area": "倉敷市・児島",
              "desc": "明治15年（1883年）創業、現在5代目という老舗のたばこ店。2004年よりヒュミドール（フォルスター・ジャパンLongFresh）を導入し、プレミアムシガーやドライシガー・シガリロ、パイプたばこ、珍しい世界のたばこを常時取り扱う。ネット通販（世界のたばこ たばこ屋しみず）も展開。",
              "note": "ヤマザキショップ併設。日曜定休（祝日は営業）。児島から全国へ通販対応。",
              "status": "営業",
              "sources": [
                "世界のたばこ たばこ屋しみず 公式通販 (店舗公式) https://www.yshop-kura-shimizu.jp/",
                "Smith Corporation 店舗紹介 (取扱店紹介) https://smithcorp.jp/introduce-store/2015/08/6950/"
              ]
            },
            {
              "name": "インポートショップ トレンド（Import Shop Trend）岡山店",
              "type": "専門店",
              "area": "岡山市南区（山陽自動車道・早島IC近く）",
              "desc": "1988年開業の輸入食品・雑貨の専門店で、本格的なヒュミドールで管理されたプレミアムシガーやドライシガー・シガリロ、手巻きたばこ等を販売。海外ブランドのシガレット・シガー・リトルシガー・シガリロ・シャグ・かぎたばこを合わせ約520種類取り扱う。駐車場60台。",
              "note": "たばこは店内の一部門で、専業のシガー専門店ではない。輸入雑貨店内で葉巻を扱う形態。",
              "status": "営業",
              "sources": [
                "インポートショップトレンド 公式サイト (店舗公式) https://e-trend.jp/",
                "Smith Corporation 店舗紹介 (取扱店紹介) https://smithcorp.jp/introduce-store/2015/08/7027/"
              ]
            }
          ],
          "sources": [
            "パラディ公式サイト https://www.paradisokayama.com/",
            "CigarBar Kennedy 公式サイト https://hikasa-fb.com/",
            "世界のたばこ たばこ屋しみず https://www.yshop-kura-shimizu.jp/",
            "インポートショップトレンド https://e-trend.jp/",
            "Smith Corporation 岡山・倉敷たばこ店紹介 https://smithcorp.jp/introduce-store/2016/10/10633/",
            "BAR-NAVI 岡山県シガー充実バー https://bar-navi.suntory.co.jp/search/f__33/p__520/"
          ]
        },
        {
          "code": "hiroshima",
          "pref": "広島県",
          "pref_en": "Hiroshima",
          "region": "中国",
          "prefNote": "広島県は広島市中心部（中区・南区）に葉巻取扱店とシガーバーが集中する。専門店では「たばこのなかみち 分家」がプレミアムシガーを含む圧倒的な品揃えで県内随一。福山市にも手巻きたばこ中心ながら葉巻を扱う店がある。LA CASA DEL HABANO（ハバノス直営）の広島県内店舗は確認できなかった。",
          "shops": [
            {
              "name": "たばこのなかみち 分家（Tabako no Nakamichi Bunke）",
              "type": "専門店",
              "area": "広島市中区・千田町",
              "desc": "広島随一の品揃えを誇るたばこ・葉巻・パイプの専門店。ヒュミドールで保管されたプレミアムシガーのほか、ドライシガー・シガリロ・パイプたばこ・手巻きたばこまで、国内流通品のほぼ全てを扱う。約900銘柄を取り扱い、店内に喫煙スペースを備える。",
              "note": "2014年1月に旧店舗（本店）から移転・拡張する形でオープンした2号店。",
              "status": "営業",
              "sources": [
                "広島経済新聞 (ニュース) https://hiroshima.keizai.biz/headline/1782/",
                "Smith Corporation (店舗紹介) https://smithcorp.jp/introduce-store/2016/10/10643/",
                "たばこのなかみち (公式) https://npro-tobacco.com/"
              ]
            },
            {
              "name": "京橋堂タバコセンター（Kyobashido Tobacco Center）",
              "type": "専門店",
              "area": "広島市南区・広島駅南口周辺",
              "desc": "JR広島駅南口から徒歩約3分のたばこ専門店。プレミアムシガー、ドライシガー、シガリロ、手巻きたばこ（シャグ）など多彩なたばこを取り扱う。インドネシア産たばこの取扱店としても紹介されている。",
              "note": "",
              "status": "営業",
              "sources": [
                "Smith Corporation (店舗紹介) https://smithcorp.jp/introduce-store/2015/08/7023/",
                "Smith Corporation (店舗紹介) https://smithcorp.jp/introduce-store/2016/10/10643/"
              ]
            },
            {
              "name": "BAR ISHIMOTO CIGAR ＆ WHISKY",
              "type": "シガーバー",
              "area": "広島市中区・銀山町",
              "desc": "銀山町のウイスキー＆シガーバー。ウイスキーと葉巻を中心に楽しめる大人向けの一軒。広電銀山町電停・胡町電停から徒歩数分の繁華街に位置する。",
              "note": "",
              "status": "営業",
              "sources": [
                "BAR ISHIMOTO CIGAR & WHISKY (公式) https://ya1n400.gorp.jp/",
                "楽天ぐるなび (店舗情報) https://r.gnavi.co.jp/nkwr8v5r0000/"
              ]
            },
            {
              "name": "BAR CEDAR（シガーバー シダー / cigar bar cedar hiroshima）",
              "type": "シガーバー",
              "area": "広島市中区・袋町（八丁堀・上八丁堀周辺）",
              "desc": "葉巻・ウイスキー・ラム・カクテルを揃えるシガーバー。カウンター、半個室、ソファー席の3つの空間を持ち、オーク樽での自家熟成ウイスキーも名物。広電上八丁堀電停から徒歩約5分。",
              "note": "月曜定休。営業は夜間中心。",
              "status": "営業",
              "sources": [
                "サントリー BAR-NAVI (店舗情報) https://bar-navi.suntory.co.jp/shop/0X00271117/",
                "食べログ (店舗情報) https://tabelog.com/hiroshima/A3401/A340114/34017260/dtlphotolst/smp2/",
                "cigar bar cedar hiroshima (Threads公式) https://www.threads.com/@cigarbarcedar"
              ]
            },
            {
              "name": "doga（ドア）",
              "type": "専門店",
              "area": "福山市・沖野上町",
              "desc": "福山市の手巻きタバコ（シャグ）専門店。常時170種類以上のシャグを揃えるほか、葉巻・キセルたばこ・ペーパー・フィルターなど関連商品も扱う。海外トップブランドやマニアックな商品も取り揃える。",
              "note": "手巻きたばこが中心の店で、葉巻の品揃え規模は要確認。",
              "status": "営業",
              "sources": [
                "doga (公式) https://tabako-fukuyama.com/",
                "Smith Corporation (店舗紹介) https://smithcorp.jp/introduce-store/2016/10/10643/"
              ]
            }
          ],
          "sources": [
            "広島経済新聞 https://hiroshima.keizai.biz/headline/1782/",
            "Smith Corporation https://smithcorp.jp/introduce-store/2016/10/10643/",
            "サントリー BAR-NAVI https://bar-navi.suntory.co.jp/search/f__34/p__520/",
            "食べログ シガーバー(広島) https://tabelog.com/keywords/%E3%82%B7%E3%82%AC%E3%83%BC%E3%83%90%E3%83%BC/hiroshima/kwdLst/"
          ]
        },
        {
          "code": "yamaguchi",
          "pref": "山口県",
          "pref_en": "Yamaguchi",
          "region": "中国",
          "prefNote": "公開情報で確認できた葉巻取扱店は少数。山口市の老舗たばこ専門店（河村商店）が葉巻の販売を、下関市長府のシガーバー（and cigarettes）が喫煙可能な場を提供している。ハバノス正規取扱を明示する店は確認できなかった（2026-07-16時点）。",
          "shops": [
            {
              "name": "河村商店（Kawamura Shoten）",
              "type": "専門店",
              "area": "山口市・中心商店街",
              "desc": "創業約60年の老舗たばこ専門店。紙巻き約300種のほか、葉巻・手巻きも各種取り扱う。手軽なシガリロやフレーバー系葉巻に加え、キューバ産・ドミニカ産などの本格派ドライシガーも扱う。",
              "note": "たばこ専門店で葉巻の品揃えあり。ハバノス正規取扱の明記は確認できず、店舗確認推奨。",
              "status": "営業",
              "sources": [
                "河村商店 公式サイト (店舗) https://kawamura-store.com/",
                "河村商店 ドライシガー (店舗) https://kawamura-store.com/products/cigar/dry/",
                "山口街中 商店街紹介 (地域サイト) https://www.yamaguchi-machinaka.com/shop/kawamura/"
              ]
            },
            {
              "name": "CigarBar and cigarettes（アンドシガレッツ）",
              "type": "シガーバー",
              "area": "下関市・長府（城下町長府商店街）",
              "desc": "城下町・長府にあるシガーバー。プレミアムシガアとスコッチを中心に提供する。店主がカット・着火など吸い始めの準備をしてくれ、初心者にも吸い方を丁寧に教えてくれる。カクテルもあり葉巻を吸わない客も歓迎。",
              "note": "月・火定休。長府商店街の比較的新しい店として紹介されている。",
              "status": "営業",
              "sources": [
                "食べログ (グルメサイト) https://tabelog.com/yamaguchi/A3502/A350201/35012999/",
                "城下町長府商店街 店舗紹介 (地域サイト) https://chofushoutengai.com/restaurant/944/",
                "城下町長府商店街 新店舗紹介 (地域サイト) https://chofushoutengai.com/info/947/"
              ]
            }
          ],
          "sources": [
            "食べログ 下関/長府 バー (グルメサイト) https://tabelog.com/yamaguchi/A3502/A350201/35012999/",
            "城下町長府商店街 (地域サイト) https://chofushoutengai.com/restaurant/944/",
            "河村商店 公式サイト (店舗) https://kawamura-store.com/"
          ]
        }
      ]
    },
    {
      "region": "四国",
      "prefectures": [
        {
          "code": "tokushima",
          "pref": "徳島県",
          "pref_en": "Tokushima",
          "region": "四国",
          "prefNote": "徳島県で葉巻を確実に購入できる店として確認できたのは、北島町の「徳島たばこセンター」（キューバ産シガーをヒュミドール管理で販売）のみ。徳島市秋田町周辺はオーセンティックバーの集積地として知られ、葉巻を扱う店が存在する可能性はあるが、2026-07-16時点の公開情報では店名まで裏付けの取れるシガーバー・シガーラウンジを特定できなかった。葉巻の取扱・持込可否は各店へ要確認。",
          "shops": [
            {
              "name": "徳島たばこセンター（Tokushima Tabaco Center）",
              "type": "専門店",
              "area": "板野郡北島町",
              "desc": "「世界のたばこが揃う店」を掲げる、たばこ・喫煙具の専門店。国産・外国産の紙巻たばこや手巻きたばこに加え、世界各地の葉巻（シガー）・パイプたばこ・喫煙具を幅広く扱う。キューバ産などのプレミアムシガーは専用の保管庫（ヒュミドール）で管理されており、県外からも顧客が訪れる。",
              "note": "販売店であり喫煙・バー営業ではない。ハバノス正規取扱かどうかは公開情報で断定できないため、具体的な取扱銘柄は要確認。",
              "status": "営業",
              "sources": [
                "徳島たばこセンター 公式サイト（店舗） https://www.tokushima-tabaco-center.com/",
                "徳島たばこセンター 公式サイト（取扱商品） https://www.tokushima-tabaco-center.com/services",
                "北島町商工会 会員企業ページ https://www.kitajima-shokokai.org/member/tokusima-tabaco-center/"
              ]
            }
          ],
          "sources": [
            "徳島たばこセンター 公式サイト https://www.tokushima-tabaco-center.com/",
            "北島町商工会 会員企業ページ https://www.kitajima-shokokai.org/member/tokusima-tabaco-center/",
            "イーストとくしま観光推進機構 特集『オーセンティックバーの宝庫 徳島バーホッピング』 https://www.east-tokushima.jp/feature/detail.php?id=282",
            "食べログ 徳島市秋田町 バー一覧 https://tabelog.com/tokushima/C36201/C99981/rstLst/bar/"
          ]
        },
        {
          "code": "kagawa",
          "pref": "香川県",
          "pref_en": "Kagawa",
          "region": "四国",
          "prefNote": "香川県では高松市に葉巻関連の店が集中する。繁華街の瓦町エリアにシガーバー兼ショップ「真也探偵社」があり、加えて古馬場町・片原町の商店街のたばこ専門店（太田たばこ店・岡田たばこ店）で葉巻や喫煙具を扱う。専門のシガーラウンジは公開情報では確認できず、選択肢は限られる。",
          "shops": [
            {
              "name": "真也探偵社（Shinya Tantei-sha）",
              "type": "シガーバー",
              "area": "高松市・瓦町",
              "desc": "高松の繁華街・瓦町エリアにあるシガーバー兼ショップ。キューバ産葉巻をはじめ葉巻とラム酒など洋酒の品揃えが豊富で、葉巻は2,600円ほどから購入できるとされる。カウンター中心で一人や少人数でゆっくり葉巻と酒を楽しめる隠れ家的な店。",
              "note": "一見での入店が難しい場合があるとの情報あり。SNS（Instagram）でも「#瓦町 #ラム酒 #葉巻」として紹介されている。",
              "status": "営業",
              "sources": [
                "葉巻スイタイ 真也探偵社 (紹介記事) https://ha-maki.com/shops/%E7%9C%9F%E4%B9%9F%E6%8E%A2%E5%81%B5%E7%A4%BE",
                "Instagram 投稿（#高松市 #瓦町 #真也探偵社） https://www.instagram.com/p/DEcu8mHz78o/"
              ]
            },
            {
              "name": "太田たばこ店（太田タバコ店 / Ota Tabako-ten）",
              "type": "専門店",
              "area": "高松市・古馬場町（ライオン通り商店街）",
              "desc": "高松の繁華街ライオン通り商店街にあるたばこ専門店。葉巻・パイプ煙草を多数品揃えし、深夜まで営業している。瓦町駅から徒歩数分でアクセスしやすい。",
              "note": "商店街公式やエキテン・地図情報で葉巻・パイプの取扱が確認できる。品揃えの詳細（ハバノス取扱の有無等）は要確認。",
              "status": "営業",
              "sources": [
                "高松ライオン通商店街 太田たばこ店 (店舗紹介) http://www.lion-douri-shoutengai.com/life/442/",
                "エキテン 太田タバコ店（高松市古馬場町） (店舗情報) https://www.ekiten.jp/shop_2725479/"
              ]
            },
            {
              "name": "岡田たばこ店（Okada Tabako-ten）",
              "type": "専門店",
              "area": "高松市・片原町（片原町西部商店街）",
              "desc": "片原町の商店街にある小規模（約1.5坪）なたばこ専門店。約150種、取り寄せを含めると約300種のたばこを扱い、店主が地域の話をしながら対面販売する昔ながらの店。",
              "note": "紙巻・輸入たばこが中心とみられ、葉巻（プレミアムシガー）の取扱・品揃えは公開情報では明確でないため要確認。",
              "status": "要確認",
              "sources": [
                "高松片原町西部商店街 岡田たばこ店 (店舗紹介) https://www.kataharamachi.com/shop/okada.html"
              ]
            }
          ],
          "sources": [
            "葉巻スイタイ（香川県のシガーバー紹介） https://ha-maki.com/shops/%E7%9C%9F%E4%B9%9F%E6%8E%A2%E5%81%B5%E7%A4%BE",
            "高松ライオン通商店街（太田たばこ店） http://www.lion-douri-shoutengai.com/life/442/",
            "高松片原町西部商店街（岡田たばこ店） https://www.kataharamachi.com/shop/okada.html",
            "食べログ 高松市 シガーバー一覧 https://tabelog.com/keywords/%E3%82%B7%E3%82%AC%E3%83%BC%E3%83%90%E3%83%BC/kagawa/C37201/kwdLst/BC01/"
          ]
        },
        {
          "code": "ehime",
          "pref": "愛媛県",
          "pref_en": "Ehime",
          "region": "四国",
          "prefNote": "愛媛県はシガー専門店・シガーバーが非常に少なく、松山市中心部（大街道・二番町）にシガーを扱うバー（LE CLUB）と、いよてつ髙島屋のたばこ売場、四国中央市の老舗たばこ専門店で葉巻を購入できる程度。ハバノス正規取扱の明確な専門店は公開情報では確認できず、四国中央・松山以外の今治・新居浜・宇和島等では葉巻取扱店・シガーバーを確認できなかった（2026-07-16時点）。",
          "shops": [
            {
              "name": "LE CLUB（ル・クラブ）",
              "type": "バー（葉巻あり）",
              "area": "松山市・大街道／二番町",
              "desc": "松山中心部・大街道の繁華街にある中世ヨーロッパの古城をイメージした重厚なオーセンティックバー。フレッシュフルーツのカクテルやハードリカー、ワインに加えてシガーも楽しめ、カット・着火などはスタッフが対応する。全席喫煙可・個室あり。",
              "note": "シガー専門店ではなくシガーを扱うバー。銘柄の品揃えは要確認。",
              "status": "営業",
              "sources": [
                "Cigar Map／ル・クラブ (シガーバー) https://www.cigarmap.info/venue.php?id=542",
                "食べログ／ル・クラブ (バー) https://tabelog.com/ehime/A3801/A380101/38000143/",
                "楽天ぐるなび／LE CLUB (バー) https://r.gnavi.co.jp/c9bfk0vt0000/"
              ]
            },
            {
              "name": "とよたシガレッツ（いよてつ髙島屋内 たばこ売場）",
              "type": "百貨店売り場",
              "area": "松山市・湊町（いよてつ髙島屋本館1F）",
              "desc": "松山市駅前・いよてつ髙島屋本館1Fのたばこ売場。手巻きたばこ・パイプ・シーシャ・喫煙具などと並びシガー（葉巻）も取り扱う百貨店内のたばこ販売コーナー。",
              "note": "百貨店内の売り場のため営業時間・在庫は髙島屋に準ずる。葉巻の常時在庫内容は要確認。",
              "status": "営業",
              "sources": [
                "TLC 全国タバコショップリーダースクラブ／とよたシガレッツいよてつ高島屋内 たばこ売場 https://www.tlc-net.co.jp/shop/5356/"
              ]
            },
            {
              "name": "蝶野陶器たばこ専門店",
              "type": "専門店",
              "area": "四国中央市・三島中央（伊予三島駅近くの商店街）",
              "desc": "明治17年創業の老舗たばこ専門店。外国たばこ・パイプ・手巻きたばこ・シガリロなどを幅広く扱い、シガー（葉巻）も取り扱う。伊予三島駅近くの商店街に立地。",
              "note": "陶器店を併営する地元の老舗たばこ店。葉巻の品揃え規模は要確認。",
              "status": "営業",
              "sources": [
                "蝶野陶器たばこ専門店 公式サイト http://chouno.com/",
                "Yahoo!マップ／蝶野陶器たばこ専門店（たばこ店） https://map.yahoo.co.jp/v3/place/F8CqG8qOQSs/review"
              ]
            }
          ],
          "sources": [
            "Cigar Map（シガーマップ）https://www.cigarmap.info/",
            "食べログ 松山市シガーバー https://tabelog.com/keywords/シガーバー/ehime/C38201/kwdLst/BC01/",
            "TLC 全国タバコショップリーダースクラブ https://www.tlc-net.co.jp/shop/5356/",
            "蝶野陶器たばこ専門店 http://chouno.com/"
          ]
        },
        {
          "code": "kochi",
          "pref": "高知県",
          "pref_en": "Kochi",
          "region": "四国",
          "prefNote": "高知県では、葉巻専門店（プレミアムシガー取扱の専門店）や葉巻を主目的とした専業シガーバー／シガーラウンジは、公開情報では確認できなかった（2026-07-16時点）。葉巻を実際に楽しめる場所として確認できたのは、高知市街のオーセンティックなウイスキーバー『bar 樹香』が葉巻を少量在庫しているケースのみ。市内のたばこ店でのプレミアムシガー取扱は今回の調査では確認できず、要確認。",
          "shops": [
            {
              "name": "bar 樹香（じゅか / bar Ju-ka）",
              "type": "バー（葉巻あり）",
              "area": "高知市・廿代町（追手筋・帯屋町エリア／高知駅から徒歩圏）",
              "desc": "モルトウイスキーを主軸としたオーセンティックなバーで、プレミアムテキーラ・ラム・ブランデー・シャンパンに加え、葉巻（シガー）も少量ながら在庫している。X（旧Twitter, @jyuka_osakeyou）では #cigar #葉巻 のハッシュタグ付きでシガーやウイスキーの入荷情報を発信しており、ウイスキーと葉巻を合わせて楽しめる。とさでん「堀詰」「蓮池町通」電停から徒歩約7分。",
              "note": "葉巻専門店ではなく、あくまでウイスキーバーが葉巻を少量置いているスタイル。品揃え・在庫は時期により変動するため来店前に確認推奨。",
              "status": "営業",
              "sources": [
                "サントリー BAR-NAVI「bar 樹香（バージュカ）高知市」(バー紹介) https://bar-navi.suntory.co.jp/shop/S000006438/",
                "bar 樹香 公式X @jyuka_osakeyou（#cigar #葉巻 入荷・営業情報） https://x.com/jyuka_osakeyou"
              ]
            }
          ],
          "sources": [
            "サントリー BAR-NAVI 高知県バー一覧 https://bar-navi.suntory.co.jp/search/f__39/",
            "サントリー BAR-NAVI「bar 樹香」 https://bar-navi.suntory.co.jp/shop/S000006438/",
            "bar 樹香 公式X https://x.com/jyuka_osakeyou"
          ]
        }
      ]
    },
    {
      "region": "九州・沖縄",
      "prefectures": [
        {
          "code": "fukuoka",
          "pref": "福岡県",
          "pref_en": "Fukuoka",
          "region": "九州・沖縄",
          "prefNote": "福岡市（中央区の天神・大名・西中洲・春吉、博多区）と北九州市（小倉）に葉巻取扱店・シガーバーが集中。喫煙具専門店（AUN Smoke、きたはら）とキューバ産中心の専門店・バー（CubanCigar、Bar HORIE等）が揃い、九州の中では最も層が厚い。中洲・小倉の歓楽街には葉巻を置くバーが多数あるが、専業シガーバーかどうか不確かな店も多いため、確度の高い店を中心に掲載した。",
          "shops": [
            {
              "name": "AUN Smoke 天神大名店（アウンスモーク）",
              "type": "専門店",
              "area": "福岡市中央区・大名（天神）",
              "desc": "喫煙具メーカー・フカシロ系列の喫煙具総合専門店で、九州最大級の品揃え。紙巻・手巻き・パイプ・水タバコに加え、キューバ産（コイーバ、モンテクリスト、ロメオ等）、ドミニカ産（ダビドフ、アルトゥーロ・フエンテ等）、ニカラグア・ホンジュラス産のプレミアムシガーを幅広く扱う。試喫用の喫煙室・ワインセラーも備える。",
              "note": "2023年7月開業。",
              "status": "営業",
              "sources": [
                "株式会社フカシロ (公式) https://fukashiro.com/company-profile/outline/aun-smoke-tenjindaimyo.html",
                "AUN SMOKE (公式) https://aun-smoke.com/"
              ]
            },
            {
              "name": "シガーショップきたはら",
              "type": "専門店",
              "area": "春日市・下白水",
              "desc": "春日市で20年ほど営業するたばこ専門店。紙巻・手巻きタバコ、パイプ、水タバコに加え、プレミアムシガーやドライシガー、リトルシガーを取り扱う。手巻きタバコは西日本最大級の品揃えを謳う。通販サイトも運営。",
              "note": "",
              "status": "営業",
              "sources": [
                "シガーショップきたはら (公式) http://cgshop-kitahara.main.jp/top.html",
                "シガーショップきたはら 通販 (公式) https://cgshop-kitahara.store/"
              ]
            },
            {
              "name": "キューバ産葉巻専門店 CubanCigar（キューバンシガー）",
              "type": "専門店（バー併設）",
              "area": "北九州市小倉北区・清水",
              "desc": "「葉巻・シガー用品販売」「バー＆カフェ」「スモーキングラウンジ」の3エリアで構成。ウォークインヒュミドールで湿度69％管理のキューバ産プレミアムシガーのみ100種類以上・5000本超を常時ストック。ラム酒やコーヒーとともに屋内外（屋上オープンエアラウンジ）で楽しめる。通販も運営。",
              "note": "定休日は水曜。",
              "status": "営業",
              "sources": [
                "CubanCigar.jp (公式ブログ・実店舗紹介) https://cubancigar.jp/blog/archives/1387",
                "北九州市観光ガイド (自治体) https://kitakyushucity.guide/gourmets/detail/4d2d5e82-6153-45fe-939b-1c1f61a128c0"
              ]
            },
            {
              "name": "Bar HORIE（バー ホリエ）",
              "type": "シガーバー",
              "area": "福岡市中央区・春吉",
              "desc": "カンデオホテルズ ザ博多テラス1Fの川沿いにあるシガーバー。福岡では珍しいウォークインヒュミドール（シガーセラー）を併設し、キューバ産・ドミニカ産の葉巻を200種類以上そろえる。店主は日本キューバ・シガー教育協会認定のシガーマネージャー。テラス席あり。",
              "note": "",
              "status": "営業",
              "sources": [
                "シガーコネクション (専門メディア・店舗紹介) https://www.cigar-connection.net/barinfo/bar016.php"
              ]
            },
            {
              "name": "Bar FURUKAWA（バー古川）",
              "type": "シガーバー",
              "area": "福岡市中央区・西中洲",
              "desc": "2019年9月オープンのオーセンティックなシガーバー。一枚板のカウンターと書院造りの和の空間。シングルモルトやカルバドス等のハードリカーを中心に、キューバ・ドミニカ産を中心とした葉巻を常時40〜50種そろえる。カウンター席とソファー席（最大10名）あり。",
              "note": "",
              "status": "営業",
              "sources": [
                "Bar FURUKAWA (公式) https://barfurukawa.foodre.jp/",
                "ふくおかナビ (メディア) https://www.fukuoka-navi.jp/174646"
              ]
            },
            {
              "name": "THE CIGARS（ザ・シガーズ）",
              "type": "シガーバー",
              "area": "福岡市中央区・西中洲",
              "desc": "西中洲の石畳の街に位置するモダンなシガーバー。リバーサイドの開放的な空間が特徴で、キューバ産を中心に約50種の葉巻をそろえる。会員制だが来店客の約9割は葉巻初心者で、マスターが選定を手伝う。",
              "note": "会員制（男女ともに年齢基準あり）。",
              "status": "営業",
              "sources": [
                "THE CIGARS (公式) https://thecigars.jp/",
                "ステータスマガジン FIRST.L (メディア) https://www.firstl.jp/column/2024011109149.html"
              ]
            },
            {
              "name": "住吉シガー倶楽部 NOB'S BAR（Sumiyoshi Cigar Club）",
              "type": "シガーバー",
              "area": "福岡市博多区・住吉",
              "desc": "博多駅から徒歩圏、住吉エリアにある隠れ家的な葉巻バー。葉巻愛好家向けのバーとして知られ、英語ページも用意。",
              "note": "",
              "status": "営業",
              "sources": [
                "住吉シガー倶楽部 NOB'S BAR (公式) https://sumiyoshi-cigarclub.com/"
              ]
            },
            {
              "name": "Cigar & Bar（with Bunny）",
              "type": "シガーバー",
              "area": "北九州市小倉北区・鍛冶町",
              "desc": "小倉の歓楽街のランドマーク・南国ビル1Fにあるシガーバー。キューバ産のハンドメイド葉巻を扱う。女性オーナー・スタッフによる運営とされる。",
              "note": "詳細情報が少なく、最新の営業状況は要確認。",
              "status": "要確認",
              "sources": [
                "Yahoo!マップ (地図) https://map.yahoo.co.jp/v3/place/Ub-4ERHoR22",
                "小倉経済新聞 (メディア) https://kokura.keizai.biz/headline/58/"
              ]
            }
          ],
          "sources": [
            "葉巻スイタイ 福岡県シガーバー一覧 https://ha-maki.com/fukuoka/cigar-bar",
            "食べログ 福岡市 シガーバー https://tabelog.com/keywords/%E3%82%B7%E3%82%AC%E3%83%BC%E3%83%90%E3%83%BC/fukuoka/C40130/kwdLst/BC01/",
            "BAR-NAVI（サントリー）福岡県シガー充実バー https://bar-navi.suntory.co.jp/search/f__40/p__520/",
            "小倉経済新聞 https://kokura.keizai.biz/headline/58/"
          ]
        },
        {
          "code": "saga",
          "pref": "佐賀県",
          "pref_en": "Saga",
          "region": "九州・沖縄",
          "prefNote": "佐賀県で公開情報から確認できる葉巻関連店は少数。中心は佐賀市中央本町（佐賀駅周辺）のバーで、葉巻を楽しめる酔美（SUIVIE）やシガーバーリスト掲載のバー プエルトがある。物販では多久市のほかお酒店がドライシガー・シガリロ等を扱う。専門的なプレミアムシガー（ハバノス）専門店は確認できなかった（2026-07-16時点）。",
          "shops": [
            {
              "name": "酔美（SUIVIE）",
              "type": "バー（葉巻あり）",
              "area": "佐賀市中央本町・愛敬町（佐賀駅周辺）",
              "desc": "カクテルやウイスキーを中心とするレストランバーで、大人の嗜みとして葉巻（シガー）も楽しめる。キューバ産・ドミニカ産のブランドを取り揃え、初心者にも丁寧に説明してくれるという。1988年に白山で創業し、2023年に中央本町のAIビル1階へ移転。",
              "note": "移転済み（2023年に白山から現在地へ）。葉巻はバー内で楽しむ形。",
              "status": "営業",
              "sources": [
                "酔美 SUIVIE 公式サイト (店公式) https://www.suivie.jp/",
                "サントリー BAR-NAVI 佐賀 レストランバー SUIVIE 酔美 (バー情報) https://bar-navi.suntory.co.jp/shop/0952264688/",
                "食べログ 酔美（SUIVIE） (グルメ) https://tabelog.com/saga/A4101/A410101/41008074/"
              ]
            },
            {
              "name": "バー プエルト（Bar Puerto）",
              "type": "シガーバー",
              "area": "佐賀市中央本町（佐賀駅周辺）",
              "desc": "佐賀駅南口から徒歩圏、中央本町のアルファ318ビルにあるオーセンティックバー。フレッシュフルーツのカクテルやウイスキーが充実し、クラシカルで落ち着いた大人の雰囲気。シガーバーリストに佐賀県内の店として掲載されている。",
              "note": "食べログ等ではカクテル・ウイスキー中心の紹介で、葉巻の常時取扱いは要確認。シガーバーリスト掲載を根拠に掲載。",
              "status": "営業",
              "sources": [
                "食べログ バー プエルト（Bar Puerto） (グルメ) https://tabelog.com/saga/A4101/A410101/41003331/",
                "シガーバーリスト 九州沖縄一覧 (シガーバー情報) http://cigarbarlist.gourmet.coocan.jp/kyuushuuokinawa.html"
              ]
            },
            {
              "name": "ほかお酒店",
              "type": "専門店",
              "area": "多久市北多久町",
              "desc": "酒とたばこ・喫煙具を扱う店で「たばこの品揃えは佐賀県一」を掲げ、遠方からの来店も多い。ドライシガーやシガリロなどの葉巻、手巻きタバコ（シャグ）を幅広く扱い、店内に試喫コーナーもある。知識豊富な店主に相談しながら銘柄を選べる。",
              "note": "プレミアム（ハバノス）というよりドライシガー・シガリロ・手巻き中心の品揃え。",
              "status": "営業",
              "sources": [
                "ほかお酒店 公式サイト (店公式) https://hokaoshop.wixsite.com/index",
                "Smith Corporation 取扱店紹介 ほかお酒店（佐賀県多久市） (取扱店情報) https://smithcorp.jp/introduce-store/2015/12/8156/"
              ]
            }
          ],
          "sources": [
            "シガーバーリスト 九州沖縄一覧 http://cigarbarlist.gourmet.coocan.jp/kyuushuuokinawa.html",
            "酔美 SUIVIE 公式サイト https://www.suivie.jp/",
            "サントリー BAR-NAVI 佐賀 レストランバー SUIVIE 酔美 https://bar-navi.suntory.co.jp/shop/0952264688/",
            "Smith Corporation 取扱店紹介 ほかお酒店（佐賀県多久市） https://smithcorp.jp/introduce-store/2015/12/8156/",
            "ほかお酒店 公式サイト https://hokaoshop.wixsite.com/index"
          ]
        },
        {
          "code": "nagasaki",
          "pref": "長崎県",
          "pref_en": "Nagasaki",
          "region": "九州・沖縄",
          "prefNote": "長崎県では葉巻を主役にしたシガーバーが長崎市の思案橋エリアに集中し、CIGAR BAR ディオディオが代表格。ほかに浜町のBar 三や佐世保のジガーバー ナッシュビルなど葉巻を楽しめるバーがある。ハバノス正規取扱を明示する葉巻専門店・専門リテールは、公開情報では確認できなかった（2026-07-16時点）。",
          "shops": [
            {
              "name": "CIGAR BAR ディオディオ（Cigar Bar Dio Dio）",
              "type": "シガーバー",
              "area": "長崎市・思案橋（船大工町）",
              "desc": "長崎市随一の繁華街・思案橋エリアにある葉巻を主役にしたシガーバー。シングルモルトやウイスキーと合わせてキューバ産葉巻などを楽しめる。店名に「CIGAR BAR」を掲げる長崎市内では数少ない葉巻主体の店。",
              "note": "食べログ・ホットペッパー・ヒトサラ・Yahoo!マップ等に現行掲載あり。営業実態の最終確認は各媒体の最新情報を推奨。",
              "status": "営業",
              "sources": [
                "食べログ CIGAR BAR ディオディオ (グルメサイト) https://tabelog.com/nagasaki/A4201/A420101/42004673/",
                "ホットペッパーグルメ CIGAR BAR ディオディオ (グルメサイト) https://www.hotpepper.jp/strJ000883341/",
                "ヒトサラ CIGAR BAR ディオディオ (グルメサイト) https://hitosara.com/0031462897/"
              ]
            },
            {
              "name": "Bar 三（バー トロワ／Bar Trois）",
              "type": "バー（葉巻あり）",
              "area": "長崎市・浜町／思案橋",
              "desc": "思案橋電停すぐ、浜町エリアにあるバー。ジャズが流れ路面電車を眺められる落ち着いた雰囲気で、掘りごたつ式のカウンターが特徴。おすすめの酒とともに葉巻を楽しめると口コミにあり、九州のシガーバーリストにも掲載されている。",
              "note": "葉巻専門店ではなく葉巻を楽しめるバー。取扱銘柄・在庫は要確認。",
              "status": "営業",
              "sources": [
                "食べログ Bar 三（トロワ） (グルメサイト) https://tabelog.com/nagasaki/A4201/A420101/42013543/",
                "粋工舎 Bar 三 施工事例 (店舗紹介) https://suikosha-u.com/pages/35/"
              ]
            },
            {
              "name": "サントリージガーバー ナッシュビル（Suntory Jigger Bar Nashville）",
              "type": "バー（葉巻あり）",
              "area": "佐世保市・本島町",
              "desc": "佐世保市中心部の老舗系ジガーバー。シングルモルトなどの品揃えが豊富で、葉巻（シガー）も楽しめる。カクテルやウイスキー、薄焼きピザなども提供し、ゆったり過ごせる雰囲気。",
              "note": "葉巻専門店ではなくシガーを扱うバー。サントリーBAR-NAVIおよび九州のシガーバーリストに掲載。",
              "status": "営業",
              "sources": [
                "サントリー BAR-NAVI サントリージガーバー ナッシュビル (バー検索) https://bar-navi.suntory.co.jp/shop/0956258665/",
                "SASEBO99 サントリージガーバー ナッシュビル (地域情報) https://www.sasebo99.com/restaurant/61615/",
                "Tripadvisor Suntory Jigger Bar Nashville (口コミ) https://www.tripadvisor.com/ShowUserReviews-g298217-d7472087-r266213679-Suntory_Jigger_Bar_Nashville-Sasebo_Nagasaki_Prefecture_Kyushu.html"
              ]
            }
          ],
          "sources": [
            "シガーバーリスト 九州沖縄一覧 (専門リスト) http://cigarbarlist.gourmet.coocan.jp/kyuushuuokinawa.html",
            "食べログ CIGAR BAR ディオディオ (グルメサイト) https://tabelog.com/nagasaki/A4201/A420101/42004673/",
            "サントリー BAR-NAVI 長崎県 (バー検索) https://bar-navi.suntory.co.jp/search/f__42/"
          ]
        },
        {
          "code": "kumamoto",
          "pref": "熊本県",
          "pref_en": "Kumamoto",
          "region": "九州・沖縄",
          "prefNote": "葉巻を楽しめる店は熊本市中央区（花畑町・銀杏通り・下通など繁華街）のオーセンティックバー／シガーバーに集中しており、RICORDI・The Bar Amber・Whiskey CAT・CLARET などが葉巻を扱う。ハバノス正規取扱の葉巻専門店や百貨店の葉巻売り場は公開情報では明確に確認できず、葉巻の購入は主にたばこ店やこれらのバー経由となる（2026-07-16時点）。",
          "shops": [
            {
              "name": "BAR RICORDI（バー リコルディ）",
              "type": "シガーバー",
              "area": "熊本市中央区・花畑町（銀杏通り）",
              "desc": "花畑町の銀杏通りにあるモルト・カクテル・シガーを楽しめるオーセンティックバー。シングルモルトウイスキーやワインの品揃えが豊富で、葉巻（シガー）も用意されている。店内喫煙可で、女性一人でも入りやすい落ち着いた雰囲気。",
              "note": "個室あり。1名から利用可。",
              "status": "営業",
              "sources": [
                "BAR-NAVI(サントリー) バー リコルディ https://bar-navi.suntory.co.jp/shop/0X00080846/",
                "食べログ バー リコルディ https://tabelog.com/kumamoto/A4301/A430101/43005735/"
              ]
            },
            {
              "name": "The Bar Amber（ザ バー アンバー）",
              "type": "バー（葉巻あり）",
              "area": "熊本市中央区・花畑町（銀杏通り）",
              "desc": "銀杏通りにあるオーセンティックバー。ウイスキー約300種にラム・テキーラ・シェリーなど世界の酒を揃え、ニカラグア産の葉巻（コク深くマイルドと評される）も楽しめる。オーナーはシェリーソムリエ／テキーラマエストロの資格を持つ。",
              "note": "",
              "status": "営業",
              "sources": [
                "BAR-NAVI(サントリー) The Bar Amber https://bar-navi.suntory.co.jp/shop/0X00331301/",
                "食べログ The Bar Amber https://tabelog.com/en/kumamoto/A4301/A430101/43010291/"
              ]
            },
            {
              "name": "Whiskey CAT（ウイスキーキャット）",
              "type": "バー（葉巻あり）",
              "area": "熊本市中央区・花畑町",
              "desc": "スコッチを中心に約400本のボトルが並ぶオーセンティックなカウンターバー。樽詰めした5種のシングルモルトも提供。猫の看板が目印で店内喫煙可、シガー愛好家にも対応しシガーバーとして紹介されている。",
              "note": "",
              "status": "営業",
              "sources": [
                "BAR-NAVI(サントリー) ウイスキーキャット https://bar-navi.suntory.co.jp/shop/0963562818/",
                "食べログ Whiskey CAT https://tabelog.com/en/kumamoto/A4301/A430101/43005831/"
              ]
            },
            {
              "name": "CLARET（クラレット）",
              "type": "バー（葉巻あり）",
              "area": "熊本市中央区・下通",
              "desc": "フランスワインを中心に、チーズ20〜30種や上質なチョコレートを揃えるバー。葉巻（シガー）を約50本ストックし、一人でも入りやすい雰囲気。市電・辛島町／通町筋周辺から徒歩数分。",
              "note": "",
              "status": "営業",
              "sources": [
                "BAR-NAVI(サントリー) CLARET https://bar-navi.suntory.co.jp/shop/0X00002008/",
                "食べログ クラレット https://tabelog.com/en/kumamoto/A4301/A430101/43007453/"
              ]
            },
            {
              "name": "Bar HORIE（バー ホリエ）",
              "type": "シガーバー",
              "area": "熊本市中央区",
              "desc": "シガー専門情報サイト『シガーコネクション』にシガーバーとして掲載されている店。葉巻好きのマスターがおり、シガーに関心のある人向けと紹介されている。",
              "note": "掲載情報が中心で最新の営業状況・詳細住所は未確認。",
              "status": "要確認",
              "sources": [
                "シガーコネクション Bar HORIE https://www.cigar-connection.net/contents/bar016"
              ]
            },
            {
              "name": "Basque（バスク）",
              "type": "バー（葉巻あり）",
              "area": "熊本市中央区・下通／唐人町周辺",
              "desc": "シガーバーの住所録・シガーバーリスト（九州沖縄）に葉巻を扱う店として掲載されているバー。下通〜唐人町エリアとされる。",
              "note": "掲載情報が中心で、葉巻取扱の現況・営業状況とも未確認。同名・類似名（BASK等）との区別も要確認。",
              "status": "要確認",
              "sources": [
                "シガーバーリスト 九州沖縄一覧 http://cigarbarlist.gourmet.coocan.jp/kyuushuuokinawa.html",
                "シガーバーの住所録 熊本県 http://chankaz.net/cigarbar/kumamoto"
              ]
            }
          ],
          "sources": [
            "BAR-NAVI(サントリー) 熊本県 シガーが充実しているおすすめバー https://bar-navi.suntory.co.jp/search/f__43/p__520/",
            "シガーバーリスト 九州沖縄一覧 http://cigarbarlist.gourmet.coocan.jp/kyuushuuokinawa.html",
            "シガーバーの住所録 熊本県 http://chankaz.net/cigarbar/kumamoto",
            "シガーコネクション https://www.cigar-connection.net/"
          ]
        },
        {
          "code": "oita",
          "pref": "大分県",
          "pref_en": "Oita",
          "region": "九州・沖縄",
          "prefNote": "大分県で公開情報から確認できる葉巻関連の中心は大分市都町・中央町（大分駅周辺の繁華街）のバーで、葉巻を主役にしたBAR VISIONEのほか、Criadera・Bar CLANNADなどでシガーを楽しめる。湯布院には旅館併設のBar Barolo（御宿 二本の葦束）がある。プレミアムシガー（ハバノス）を扱う葉巻専門店や百貨店の常設売り場は公開情報では確認できなかった（2026-07-16時点）。",
          "shops": [
            {
              "name": "BAR VISIONE（バール ビジオーネ）",
              "type": "シガーバー",
              "area": "大分市都町（大分駅周辺の繁華街）",
              "desc": "都町の白銀ビルにある、シガーとウイスキーが香るオーセンティックバー。カウンター・テラス・サロンルームの3空間があり、全席で葉巻（シガー）を楽しめる。シガーコレクションが充実し、ロンドンのホテルバーのような落ち着いた雰囲気。カクテル・スコッチ・ブランデーも揃う。",
              "note": "サロンルームはチャージ1,000円。日曜・祝日休。葉巻を主役に据えた県内でも数少ないシガーバー。",
              "status": "営業",
              "sources": [
                "BAR VISIONE 公式サイト (店公式) https://www.barvisione.com/",
                "食べログ バール ビジオーネ（BAR Visione） (グルメ) https://tabelog.com/oita/A4401/A440101/44011089/"
              ]
            },
            {
              "name": "Criadera（クリアデラ）",
              "type": "バー（葉巻あり）",
              "area": "大分市都町（大分駅周辺）",
              "desc": "都町の親和ビル3Fにある隠れ家的なオーセンティックバー。ボトラーズのシングルモルトを豊富に揃え、ラムやアルマニャックのヴィンテージも並ぶ。落ち着いたカウンター中心の空間で葉巻（シガー）も楽しめる。看板がなく外観からは見つけづらい。",
              "note": "サントリー BAR-NAVI・食べログ等でシガー可の店として紹介。品揃えの中心は洋酒で、葉巻はバー内で楽しむ形。",
              "status": "営業",
              "sources": [
                "サントリー BAR-NAVI Criadera クリアデラ 大分 (バー情報) https://bar-navi.suntory.co.jp/shop/0975136510/",
                "食べログ Criadera（クリアデラ） (グルメ) https://tabelog.com/oita/A4401/A440101/44004916/"
              ]
            },
            {
              "name": "Bar CLANNAD（クラナド）",
              "type": "バー（葉巻あり）",
              "area": "大分市中央町（大分駅から徒歩約10分）",
              "desc": "中央町の第二小松塚ビル3Fにあるバーで、若草公園を望む落ち着いた空間。大分県産食材を使った手作りのつまみに、ウイスキーなど各種スピリッツを揃える。葉巻（シガー）も扱い、ゆったりと楽しめる。",
              "note": "サントリー BAR-NAVI・食べログに掲載。葉巻はバー内で楽しむスタイル。",
              "status": "営業",
              "sources": [
                "サントリー BAR-NAVI Bar CLANNAD バー クラナド 大分 (バー情報) https://bar-navi.suntory.co.jp/shop/0X00075981/",
                "食べログ クラナド（CLANNAD） (グルメ) https://tabelog.com/oita/A4401/A440101/44005735/"
              ]
            },
            {
              "name": "Bar Barolo（バー バローロ）",
              "type": "ホテルラウンジ",
              "area": "由布市湯布院町川北（湯布院・御宿 二本の葦束 内）",
              "desc": "湯布院の旅館「御宿 二本の葦束」内にあるオーセンティックバー。ワインの王と称される「バローロ」を店名に冠し、専用ワインセラーを備える。森に囲まれた大きな窓の静かな空間で、ソムリエのサービスとともに葉巻（シガー）も楽しめる。冬は暖炉が灯る。",
              "note": "宿泊者以外も利用可（節度ある利用が条件）。旅館併設のためアクセス・営業は事前確認が望ましい。",
              "status": "営業",
              "sources": [
                "Bar Barolo 公式（御宿 二本の葦束） (店公式) https://www.2hon-no-ashitaba.co.jp/bar/bar.html",
                "食べログ BAR BAROLO（バー・バローロ） (グルメ) https://tabelog.com/oita/A4402/A440201/44000586/"
              ]
            },
            {
              "name": "BAR BROWN（バー ブラウン）",
              "type": "バー（葉巻あり）",
              "area": "大分市都町（大分駅周辺）",
              "desc": "都町の川辺ビルにあるバー。フレッシュフルーツのカクテルや和素材を使ったオリジナルカクテル、生の黒ビール、世界のウイスキーなどを揃える大人の空間。シガーバーリストに大分県内の葉巻を扱う店として掲載されている。",
              "note": "シガーバーリスト掲載を根拠に掲載。店側の紹介はカクテル・ウイスキー中心で、葉巻の常時取扱いは要確認。食べログには旧店舗の【移転】表記もあり現所在地は都町3丁目。",
              "status": "要確認",
              "sources": [
                "サントリー BAR-NAVI BAR BROWN バー ブラウン 大分 (バー情報) https://bar-navi.suntory.co.jp/shop/0975331318/",
                "シガーバーリスト 九州沖縄一覧 (シガーバー情報) http://cigarbarlist.gourmet.coocan.jp/kyuushuuokinawa.html"
              ]
            },
            {
              "name": "wine & dining cave.（カーブ）",
              "type": "バー（葉巻あり）",
              "area": "大分市都町（大分駅周辺）",
              "desc": "都町の双葉ビル1Fにひっそりと佇む隠れ家的なワインダイニングバー。こだわりの料理とワインを中心に楽しめる。シガーバーリストに大分県内の葉巻を扱う店として掲載されている。",
              "note": "シガーバーリスト掲載を根拠に掲載。店側の紹介はワイン・料理中心で、葉巻の常時取扱いは要確認。",
              "status": "要確認",
              "sources": [
                "wine & dining cave. 公式サイト (店公式) https://cholon.xsrv.jp/cave/",
                "シガーバーリスト 九州沖縄一覧 (シガーバー情報) http://cigarbarlist.gourmet.coocan.jp/kyuushuuokinawa.html"
              ]
            }
          ],
          "sources": [
            "シガーバーリスト 九州沖縄一覧 http://cigarbarlist.gourmet.coocan.jp/kyuushuuokinawa.html",
            "BAR VISIONE 公式サイト https://www.barvisione.com/",
            "サントリー BAR-NAVI Criadera クリアデラ 大分 https://bar-navi.suntory.co.jp/shop/0975136510/",
            "サントリー BAR-NAVI Bar CLANNAD 大分 https://bar-navi.suntory.co.jp/shop/0X00075981/",
            "Bar Barolo 公式（御宿 二本の葦束） https://www.2hon-no-ashitaba.co.jp/bar/bar.html"
          ]
        },
        {
          "code": "miyazaki",
          "pref": "宮崎県",
          "pref_en": "Miyazaki",
          "region": "九州・沖縄",
          "prefNote": "宮崎県の葉巻関連は宮崎市中心部（宮崎駅周辺・ニシタチ繁華街）に集中し、実質的な中心は東京・五反田『野村たばこ店』出身の店主が営むシガーバー『シガーハウス』。同店主は昼に『小田煙草店』で葉巻の小売も行うとされる。プレミアムシガー（ハバノス）を専門に扱う葉巻専門店や、百貨店の常設シガー売り場は公開情報では確認できなかった（2026-07-16時点）。",
          "shops": [
            {
              "name": "シガーハウス（Cigar House）",
              "type": "シガーバー",
              "area": "宮崎市中心部（宮崎駅周辺・ニシタチ繁華街エリア）",
              "desc": "「宮崎でシガーバーといえばシガーハウス」と紹介される、県内では貴重な葉巻専門のシガーバー。店主は東京・五反田の老舗『野村たばこ店』出身の葉巻スペシャリストで、初心者から愛好家まで気取らず楽しめる雰囲気。シガーセットは3,000〜4,000円とリーズナブルで、葉巻の種類・価格帯とも幅広く揃え、ウイスキーのオールドボトルも手頃に楽しめる。",
              "note": "食べログ等に掲載。不定休。営業状況・時間は変動しうるため来店前に確認が望ましい。",
              "status": "営業",
              "sources": [
                "食べログ Cigar House（シガーハウス）宮崎/バー (グルメ) https://tabelog.com/en/miyazaki/A4501/A450101/45007301/",
                "食べログ 口コミ『東京五反田野村たばこ店の卒業生の営む宮崎に貴重なシガーハウス』 (口コミ) https://tabelog.com/miyazaki/A4501/A450101/45007301/dtlrvwlst/B111966100/"
              ]
            },
            {
              "name": "小田煙草店（Oda Tobacco Shop）",
              "type": "専門店（たばこ店・葉巻取扱）",
              "area": "宮崎市中心部（歯科医師会館付近）",
              "desc": "シガーハウスの店主が昼間に営むたばこ店で、葉巻（シガー）を購入できる。夜のシガーバー（シガーハウス）と同じ店主が運営し、葉巻を実際に手に取って買える県内でも数少ない小売の場とされる。",
              "note": "食べログのシガーハウス口コミ内で『From小田煙草店』として言及されたのが主な根拠。独立した公開情報が乏しく、所在地の詳細・営業状況は要確認。",
              "status": "要確認",
              "sources": [
                "食べログ 口コミ『東京五反田野村たばこ店の卒業生の営む宮崎に貴重なシガーハウス From小田煙草店』 (口コミ) https://tabelog.com/miyazaki/A4501/A450101/45007301/dtlrvwlst/B111966100/"
              ]
            }
          ],
          "sources": [
            "食べログ Cigar House（シガーハウス）宮崎 https://tabelog.com/en/miyazaki/A4501/A450101/45007301/",
            "日本シガーバー協会 会員リスト[宮崎県] https://www.cigarbar.or.jp/member/?p=%E5%AE%AE%E5%B4%8E%E7%9C%8C",
            "ヒトサラ 一人シガーバー 宮崎県 https://hitosara.com/TC6/miyazaki/GB8/GC0807/",
            "シガーショップの住所録 宮崎県 http://chankaz.net/cigarshop/miyazaki"
          ]
        },
        {
          "code": "kagoshima",
          "pref": "鹿児島県",
          "pref_en": "Kagoshima",
          "region": "九州・沖縄",
          "prefNote": "鹿児島県では葉巻の専門店（ハバノス正規取扱の販売店）は公開情報で確認できず、葉巻を楽しめる場は鹿児島市の繁華街・天文館周辺のバー数店に限られる。多くはウイスキー／カクテルが主体で、シガーの常時在庫や銘柄は店により変動するため事前確認を推奨。",
          "shops": [
            {
              "name": "Cocktail Cre8 ゆらぎ",
              "type": "バー（葉巻あり）",
              "area": "鹿児島市・天文館（千日町）",
              "desc": "天文館の地蔵角交番近くにあるオーセンティックなショットバー。ウイスキー・ブランデー・ラムなどと合わせて楽しめるようシガーを用意している。季節のフルーツカクテルや希少モルトも豊富。",
              "note": "シガーの銘柄・在庫は時期により変動するため来店前に要確認。",
              "status": "営業",
              "sources": [
                "鹿児島よかなび（公式観光サイト） https://www.kagoshima-yokanavi.jp/gourmet/20320",
                "BAR-NAVI（サントリー） https://bar-navi.suntory.co.jp/shop/0992229639/",
                "食べログ https://tabelog.com/kagoshima/A4601/A460101/46006415/"
              ]
            },
            {
              "name": "BAR Satin Doll（サテンドール）",
              "type": "バー（葉巻あり）",
              "area": "鹿児島市・天文館（文化通り／千日町）",
              "desc": "天文館エリアのカクテル＆スピリッツバー。シングルモルトやフルーツカクテルとともにシガーを提供しているとされる。喫煙可。",
              "note": "同名店（サテンドール Jazz Restaurant）も近隣にあり紛らわしい。葉巻取扱の詳細は要確認。",
              "status": "要確認",
              "sources": [
                "食べログ https://tabelog.com/kagoshima/A4601/A460101/46006389/"
              ]
            },
            {
              "name": "Whisky House DUFFTOWN（ダフタウン）",
              "type": "バー（葉巻あり）",
              "area": "鹿児島市・天文館（千日町）",
              "desc": "天文館地蔵角交番近くのビル上階にある大人の隠れ家的ウイスキーバー。山崎ほかスコッチ・アイリッシュ・アメリカン等を豊富に揃え、カウンター20席。シガーバーリスト等で葉巻OKの店として紹介されている。",
              "note": "主体はウイスキーバー。葉巻は持込可否含め来店前に要確認。",
              "status": "営業",
              "sources": [
                "BAR-NAVI（サントリー） https://bar-navi.suntory.co.jp/shop/0992259928/",
                "ホットペッパーグルメ https://www.hotpepper.jp/strJ000799509/"
              ]
            },
            {
              "name": "B.B.13 BAR（ビービーサーティーンバー）",
              "type": "バー（葉巻あり）",
              "area": "鹿児島市・泉町（朝日通）",
              "desc": "大正5年築の石造洋館2階にある老舗バー。数百種の洋酒と本格フレンチを提供するアンティークな空間で、喫煙可。シガーバー系の住所録に葉巻を楽しめる店として掲載されている。",
              "note": "フレンチ主体のバーで、シガーの常時取扱・銘柄は要確認。",
              "status": "要確認",
              "sources": [
                "B.B.13 BAR 公式サイト https://bb13bar.jp/",
                "食べログ https://tabelog.com/kagoshima/A4601/A460101/46009132/"
              ]
            }
          ],
          "sources": [
            "BAR-NAVI 鹿児島県 シガーが充実しているバー https://bar-navi.suntory.co.jp/search/f__46/p__520/",
            "シガーバーリスト 九州沖縄 http://cigarbarlist.gourmet.coocan.jp/kyuushuuokinawa.html",
            "鹿児島よかなび https://www.kagoshima-yokanavi.jp/gourmet/20320"
          ]
        },
        {
          "code": "okinawa",
          "pref": "沖縄県",
          "pref_en": "Okinawa",
          "region": "九州・沖縄",
          "prefNote": "葉巻の中心は那覇市（特におもろまち・新都心エリア）で、専門店のけむり屋沖縄、シガーラウンジのフィンカビヒア沖縄、県内最大級のBar&Cafe 7Cが集まる。沖縄市（Hallelujah）や北谷町（THE VERONA）にも葉巻を楽しめる店があり、離島（石垣・宮古）では専門店・シガーバーは公開情報では確認できなかった（2026-07-16時点）。",
          "shops": [
            {
              "name": "たばこショップ けむり屋沖縄（Kemuriya Okinawa）",
              "type": "専門店",
              "area": "那覇市曙・新都心エリア",
              "desc": "有限会社クラヨシが運営するたばこ専門店。キューバ産・ドミニカ産などのプレミアムシガーに加え、パイプたばこ、国内外の紙巻たばこ、シガーカッター等の喫煙具を幅広く扱う。ウォークインタイプのヒュミドールルームを備え、県内では葉巻の品揃えが充実した数少ない専門店。",
              "note": "かつて那覇・西町にも店舗展開の報道あり。現在の主要店舗は那覇市曙（新都心）。Instagram @kemuriya_okinawa で情報発信あり。",
              "status": "営業",
              "sources": [
                "那覇経済新聞 (ニュース) https://naha.keizai.biz/headline/212/",
                "有限会社クラヨシ (公式) https://kurayoshi.co.jp/",
                "エキテン (店舗情報) https://www.ekiten.jp/shop_2480256/"
              ]
            },
            {
              "name": "フィンカビヒア沖縄（FINCA LA VIGIA OKINAWA）",
              "type": "シガーラウンジ",
              "area": "那覇市おもろまち",
              "desc": "東京・西麻布のCOHIBA ATMOSPHERE TOKYOの姉妹店で、県内では珍しい喫煙ラウンジを備えたカフェ＆バー。キューバ産シガーを中心に取り扱い、モヒートなどキューバを代表するカクテルやラム、シングルモルトを提供。テラス席もある。",
              "note": "2020年11月に国際通り（美栄橋）付近からおもろまちへ移転。移転のため旧所在地の情報は要注意。",
              "status": "営業",
              "sources": [
                "COHIBA ATMOSPHERE TOKYO (公式ブログ) https://cohiba-atmosphere.jp/2021/01/13/%E6%96%B0%E5%BA%97%E8%88%97%EF%BC%88finca-la-vigia-okinawa%EF%BC%89%E3%81%AE%E3%81%94%E7%B4%B9%E4%BB%8B/",
                "食べログ (店舗情報) https://tabelog.com/en/okinawa/A4701/A470103/47027282/"
              ]
            },
            {
              "name": "Bar&Cafe 7C（セブンシー）",
              "type": "シガーバー",
              "area": "那覇市おもろまち",
              "desc": "沖縄県最大級を掲げるシガーバー。1,000種類以上の酒類と130種類以上の葉巻を揃え、シガーアドバイザーが対応する。シガー・ウイスキー初心者でも入りやすい雰囲気で、葉巻の持ち帰り購入も可能。喫煙用の換気設備を備える。",
              "note": "",
              "status": "営業",
              "sources": [
                "Bar&Cafe 7C (公式) https://bar-7c.okinawa/",
                "食べログ (店舗情報) https://tabelog.com/en/okinawa/A4701/A470103/47007102/"
              ]
            },
            {
              "name": "Rum and Cigar Bar Hallelujah（ハレルヤ）",
              "type": "シガーバー",
              "area": "沖縄市上地・中の町",
              "desc": "ラム酒と葉巻を主役にしたバー。キューバ産をはじめとするプレミアムシガーを取り扱い、各国のラムや旬のフルーツを使ったオリジナルカクテルを提供。ラムコンシェルジュ資格を持つスタッフが在籍する。",
              "note": "定休日は水曜。プレミアムシガー入荷情報を公式ブログで随時発信。",
              "status": "営業",
              "sources": [
                "Rum and Cigar Bar Hallelujah (公式) https://www.bar-hallelujah.com/",
                "食べログ (店舗情報) https://tabelog.com/en/okinawa/A4703/A470301/47023844/"
              ]
            },
            {
              "name": "Dining and Cigar THE VERONA（ザ・ベローナ）",
              "type": "バー（葉巻あり）",
              "area": "中頭郡北谷町美浜",
              "desc": "アメリカンビレッジを一望できるビル最上階のダイニング＆シガーバー。厳選した約30種のプレミアムシガーを揃え、ラテン音楽と豊富なドリンクを楽しめる。海・夕陽・夜景・花火を望むロケーションが特徴。",
              "note": "食事メインのダイニングバーで、葉巻を吸える店。",
              "status": "営業",
              "sources": [
                "Dining and Cigar THE VERONA (公式) https://the-verona.com/",
                "ホットペッパーグルメ (店舗情報) https://www.hotpepper.jp/strJ001267366/"
              ]
            },
            {
              "name": "たばこ屋本舗 外間（ほかま）",
              "type": "専門店",
              "area": "那覇市小禄／糸満市（2店舗）",
              "desc": "国産・外国産の紙巻たばこや加熱式に加え、葉巻（シガー）、パイプたばこ、手巻きたばこ等を扱うたばこ販売店。小禄店・糸満店の2店舗を展開。糸満店は小規模で品揃えが限られるため事前注文が推奨されている。",
              "note": "バー併設ではなく物販中心のたばこ店。日曜・年末年始・旧盆・GW休。",
              "status": "営業",
              "sources": [
                "たばこ屋本舗 外間 (公式) https://hokama-tabacco.com/",
                "たばこ屋本舗 外間 小禄店 (公式) https://hokama-tabacco.com/shop01"
              ]
            }
          ],
          "sources": [
            "BAR-NAVI サントリー (沖縄県シガー充実バー) https://bar-navi.suntory.co.jp/search/f__47/p__520/",
            "食べログ (沖縄 シガーバー一覧) https://tabelog.com/keywords/%E3%82%B7%E3%82%AC%E3%83%BC%E3%83%90%E3%83%BC/okinawa/kwdLst/BC01/",
            "那覇経済新聞 (けむり屋沖縄) https://naha.keizai.biz/headline/212/"
          ]
        }
      ]
    }
  ]
};
