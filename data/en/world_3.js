/* ============================================================
   Cigar Cafe — 世界編の英語本文 3/6（実践レビュー・その他の葉巻）。
   英語版でだけ読み込まれ、WORLD_DATA の該当項目を英語文に置き換える。
   日本語版はこのファイルを読まない。元データ: data/world.js, data/world_deep.js
   ============================================================ */
(function () {
  if (typeof WORLD_DATA === "undefined") return;
  var W = WORLD_DATA;

  var RV = [
    {
      cigar: "Partagás Serie D No. 4",
      origin: "Cuba",
      wrapper: "Habano Colorado",
      size: "Robusto (124×50)",
      strength: "Full",
      price: "¥3,500–4,500",
      first: "The flavour erupts from the very first puff. Around the sourdough note so typical of Partagás — that toastiness of tangy, fermented bread — layer roasted hazelnuts, leather, minerals, wood and green bell pepper. Dense earthiness and thick nuttiness flood the tongue at once, and the sheer weight of body tells you instantly: this is Cuban full-bodied smoking.",
      middle: "Pepper spice rises distinctly, cinnamon's sweet prickle entwining with the earthy flavours. Orange peel and vanilla sweetness peek through as the complexity builds on a foundation of mineral, wood and leather. It never tips into roughness — the poised stand-off between power and sweetness is the true genius of this marque.",
      final: "Chocolate creaminess and espresso bitterness come to the fore. The long-lingering depth of roasted nuts and minerality carries the finish, and the aftertaste persists remarkably. The strength holds high right to the end.",
      construction: "Solidly rolled; the draw is on the firm side but steady. It burns straight and leaves a tight white ash. Even current production shows little variation, and Cigar Aficionado rates the robusto at 92 points. As one of the world's best-selling Cuban cigars, both output and quality are stable.",
      pairing: "Espresso, Cuban rum (añejo), Islay single malt, port.",
      summary: "The benchmark and royal road of the Cuban full body. A staple robusto for intermediate to advanced smokers who want depth of earth, nuts, pepper and minerals. Worth keeping one to hand as your yardstick for Cuban 'intensity'."
    },
    {
      cigar: "Montecristo No. 2",
      origin: "Cuba",
      wrapper: "Habano",
      size: "Pirámide (156×52)",
      strength: "Medium to full",
      price: "¥4,000–5,500",
      first: "Creamy cedar, roasted almonds and white pepper, with dark honey sweetness and the warm spice of cinnamon and nutmeg. Opening on an aroma of well-aged leather is the mark of the better recent batches — a refined introduction.",
      middle: "Dark espresso, toasted cedar, dried fig, leather and jasmine florals unfold in layers. Leather, then espresso, then the sweet spice of cinnamon and nutmeg, then almond, white and black pepper, then oak — this complexity, with the flavours in constant dance, is the great charm of the Monte 2.",
      final: "Sweetness and creaminess hold as it settles into a tangy — faintly sour-edged — afterglow of wood and leather, finishing on dry, keen cedar. The strength climbs quietly but never roughly; it closes with poise.",
      construction: "Rolled with a steadiness that belies the difficulty of the pirámide (torpedo). Draw and burn are both good. Delicious young, yet possessed of that rare pedigree which rewards 10–50 years of long ageing, deepening the longer it rests. The world's definitive torpedo.",
      pairing: "VSOP cognac, medium-roast coffee, sherry (oloroso).",
      summary: "The world's most famous Cuban pirámide. For intermediate smokers and above who want the balance of elegance and power, and a complexity that never stops shifting. The emblematic size of a brand founded in 1935."
    },
    {
      cigar: "Cohiba Siglo VI",
      origin: "Cuba",
      wrapper: "Habano",
      size: "Cañonazo (150×52)",
      strength: "Medium",
      price: "¥8,000–12,000",
      first: "A light pepper quickly recedes, giving way to cedar, vanilla, citrus, pecan, light earth and florals. A sweet aftertaste lingering on the cheeks is delightful, with cream and cedar stepping up as the leads.",
      middle: "Around a core of cedar and vanilla come spice, florals, earth, leather and a pleasing saltiness. The wood flavours mature powerfully while nutty toastiness adds body. The ring gauge is thick, but with only about half a leaf of ligero in the blend, the design is exquisitely judged — plenty of body without ever becoming overpowering.",
      final: "Coffee stands out, and dark chocolate, caramel and brown-sugar sweetness build. From nuances of dried berries into a rich chocolate finish, with peppery complexity lingering on the retrohale.",
      construction: "Exactingly made, most of them rolled at El Laguito, Cohiba's mother factory. Draw and burn are impeccable and the smoke abundant. 93 points from Cigar Aficionado. In short supply ever since its 2002 debut — the flagship size.",
      pairing: "Champagne, fine white rum, aged tequila.",
      summary: "The flagship of Cuba's summit brand. A luxurious smoke of refinement and easy assurance — a flowing progression of cedar, vanilla, nuts and chocolate. For intermediate to advanced smokers with room in the budget."
    },
    {
      cigar: "Hoyo de Monterrey Epicure No. 2",
      origin: "Cuba",
      wrapper: "Habano",
      size: "Robusto (124×50)",
      strength: "Mild to medium",
      price: "¥3,000–4,000",
      first: "Creamy cedar, roasted almonds, soft florals. Sandalwood, honey, gentle black pepper. A sweetness of flowers and grass recalling jasmine and hay intertwines — an unmistakably Cuban, delicate opening.",
      middle: "The florals retreat and a richer, more complex character emerges. Roast coffee, dark honey, leather and the dark fruit of dried figs and raisins layer beautifully over a persistent creaminess.",
      final: "The pepper heat rises a touch as coffee and leather deepen. The midsection's sweetness lingers into the finish, and it never loses its poise. The strength stays light to medium — thoroughly approachable.",
      construction: "Elegant, faultless work; even burn and a comfortable draw. Around 91 points from Cigar Aficionado and others. In balance and polish it is rated among the very finest robustos Cuba produces.",
      pairing: "A latte, a lighter blended Scotch, white wine.",
      summary: "An introduction to Cubans and a masterpiece in its own right. Light, beautifully proportioned — a flowing interplay of flowers, honey and nuts. An all-round robusto to be loved by beginner and veteran alike."
    },
    {
      cigar: "Bolívar Belicosos Finos",
      origin: "Cuba",
      wrapper: "Habano Colorado",
      size: "Belicoso (140×52)",
      strength: "Full",
      price: "¥3,800–5,000",
      first: "Earth, wood, and the toastiness of baked goods and coffee. A faintly spicy prickle bites the tongue, underpinned by a sweet base recalling peach tea, vanilla and maple candy. A powerful, dense opening.",
      middle: "Earth, cocoa, coffee and leather come to the fore, the spice gradually settles, and a hint of fruitiness peeks through. Bolívar's particular delight is how Cuba's 'dark side' of flavours unfolds elegantly, without a trace of coarseness.",
      final: "Sweet wood and roasted coffee intensify; hazelnut and a touch of citrus sit over the base of earth, cocoa and leather. A creamy sweetness softens the rich close. Smoking time 60–75 minutes.",
      construction: "Sturdily rolled; the draw is slightly snug but the burn slow and even. The glossy, oil-rich colorado wrapper is a beauty. A belicoso of real substance, with a 2017 Top 25 placing (94 points) to its name.",
      pairing: "Strong espresso, dark rum, port, red Bordeaux.",
      summary: "Full, yet smooth and elegant. A masterpiece belicoso for experienced smokers after a rich Cuban — the poised balance of earthy, cocoa and coffee depth against sweetness."
    },
    {
      cigar: "Ramón Allones Specially Selected",
      origin: "Cuba",
      wrapper: "Habano",
      size: "Robusto (124×50)",
      strength: "Medium to full",
      price: "¥3,200–4,200",
      first: "Fresh cedar, earth, and a rock-salt salinity that stays on the tongue. Bold pepper asserts itself at the outset, joined by alternating waves of honeyed sweetness, creaminess and a sharp cayenne bite — a powerful way in.",
      middle: "The pepper withdraws into remarkably rich, dense tones of earth and nuts. Leather and earth deepen; refined marzipan (the almond confection), black cherry and an elegant citrus sweetness appear. Florals, cocoa powder and spicy ginger join in, and the marque's 'polished side' shows its face.",
      final: "Pepper and spice persist, with the toastiness of espresso bean and a chocolate-like finish at the core. Powerful yet complex, with earth and nuts lingering long in the aftertaste.",
      construction: "Excellent work from the Partagás factory: a good draw and an even burn. A celebrated cigar — No. 2 in Cigar Aficionado's Top 25 for 2015, with 96 points. The concentration is striking.",
      pairing: "Cuban coffee, red Bordeaux, dark rum.",
      summary: "Concentration and complexity in one — among the best-value Cubans a full-body lover can reach for. The house's signature robusto, strongly recommended to intermediate and advanced smokers with a taste for intensity."
    },
    {
      cigar: "Romeo y Julieta Wide Churchill",
      origin: "Cuba",
      wrapper: "Habano",
      size: "Wide Churchill (130×55)",
      strength: "Medium",
      price: "¥3,500–4,500",
      first: "Cedar and toasty notes, light nuts and cream. The gentle, approachable sweetness so typical of Romeo rises up, a floral nuance lending elegance.",
      middle: "Coffee, toast, a little earth and spice join in, building a well-balanced body. The generous smoke of the 55 ring gauge envelops the mellow, medium flavour.",
      final: "Leather and wood flavours build, rounded off with a hint of pepper. Smooth and free of edges to the last, with a polished afterglow.",
      construction: "An even burn and a comfortable draw despite the thick ring. Among the robusto formats one of the steadier current productions, firmly established as Romeo y Julieta's modern standard.",
      pairing: "Medium-roast coffee, a lighter single malt, cognac.",
      summary: "A refined, easy-drinking Cuban medium. With the generous smoke and mellowness its wide ring brings, it lets beginners and intermediates enjoy 'Cuban character' without strain."
    },
    {
      cigar: "H. Upmann Magnum 46",
      origin: "Cuba",
      wrapper: "Habano",
      size: "Corona Gorda (143×46)",
      strength: "Medium",
      price: "¥3,200–4,200",
      first: "Cedar, toast, light nuts, and the coffee-and-cream sweetness typical of Upmann. A calm, polished introduction — a gentle, rounded way in.",
      middle: "A milky, cappuccino-like coffee note grows, harmonising with wood, earth and a little spice. Nothing flashy — its virtue is a balance you never tire of.",
      final: "Depth of leather and cacao joins, closed off with just enough pepper. It settles into the aftertaste with its elegant balance intact.",
      construction: "Known as a marque that comes into its own with maturity — a few years' rest brings out extra milky sweetness and richness. A good draw and an even burn.",
      pairing: "Caffè latte, brandy, white rum.",
      summary: "The standard-bearer of the coffee-and-cream style. Mellow, and never wearying. Ideal for beginners to intermediates who favour the middle path, with the pleasures of ageing besides."
    },
    {
      cigar: "Trinidad Reyes",
      origin: "Cuba",
      wrapper: "Habano",
      size: "Petit Corona (110×40)",
      strength: "Medium",
      price: "¥2,800–3,800",
      first: "Airy cedar and cream, citrus, florals. Trinidad's delicate, refined sweetness rises with real presence despite the slim format.",
      middle: "Nuts, coffee and a hint of spice join, showing a concentrated complexity you would hardly guess from the size. Trinidad's characteristic flower-like grace hangs over it throughout.",
      final: "It rounds off with wood, leather and a touch of pepper, reaching a deeply satisfying close within a brief 30–40 minutes.",
      construction: "Stable burn and draw despite the small ring. Built for a short smoke — an easy way to experience Trinidad's elegance.",
      pairing: "Espresso, champagne, a digestif.",
      summary: "A top-flight Cuban in 30–40 minutes. A delicate, elegant short smoke — for the aficionado pressed for time, the after-dinner puff, or a first taste of Trinidad."
    },
    {
      cigar: "Punch Punch",
      origin: "Cuba",
      wrapper: "Habano",
      size: "Corona Gorda (143×46)",
      strength: "Medium",
      price: "¥3,000–4,000",
      first: "Earth, wood and roasted nuts with the sweet toastiness typical of Punch. Firm yet friendly — an opening with the warmth of the traditional Cuban style.",
      middle: "Coffee, cocoa, leather, and gentle pepper and spice harmonise and gain body. A classic, unadorned midsection packed with savour.",
      final: "Earth and leather deepen, closed with dark-chocolate sweetness. Steady satisfaction all the way down.",
      construction: "Solid work, an even burn, a good draw. It keeps the traditional, dependable quality you would expect of a house founded in the 19th century.",
      pairing: "Dark rum, strong coffee, porter.",
      summary: "A classic Cuban with an excellent balance of richness and sweetness. A staple corona gorda for the intermediate smoker who wants honest, unadorned savour."
    },
    {
      cigar: "El Rey del Mundo Choix Suprême",
      origin: "Cuba",
      wrapper: "Habano",
      size: "Robusto Extra (130×48)",
      strength: "Mild to medium",
      price: "¥3,000–4,000",
      first: "Airy cedar, cream and honeyed sweetness. Florals and gentle spice. An exceptionally refined, delicate start — conspicuously gentle even among Cubans.",
      middle: "Nuts, light coffee and wood flavours join, the complexity building softly. A midsection that shuns aggression and commits itself wholly to smoothness.",
      final: "It stays mild while rounding off with leather and a hint of pepper. No edges to the last, subsiding quietly into the afterglow.",
      construction: "Neat work, an even burn, a comfortable draw. Despite the brand name ('King of the World'), a delicate marque ranked among the mildest Cuba makes.",
      pairing: "A lighter coffee, white wine, champagne.",
      summary: "A gem from among the mildest of Cubans. Calm and elegant — for a morning smoke, or for the beginner wanting a Cuban introduction with the edges taken off."
    },
    {
      cigar: "Cohiba Robustos",
      origin: "Cuba",
      wrapper: "Habano",
      size: "Robusto (124×50)",
      strength: "Medium to full",
      price: "¥6,000–9,000",
      first: "Cohiba's distinctive grassy sweetness — that herbal greenness — with cedar, vanilla and cream. A polished opening carrying a hint of pepper, the brand's personality rising at once.",
      middle: "Coffee, nuts, leather and florals unfold in layers as Cohiba's complexity and body build. Its hallmark is the smoothness and depth that come of triple-fermented selected leaf.",
      final: "Espresso, dark chocolate and woody depth to the fore, closing powerfully on a peppery bite. Stronger than the Siglo line — one of the more assertive smokes in the range.",
      construction: "The exacting construction one expects of Cohiba: an even burn and generous smoke. A high level of finish underpinned by the El Laguito school of craft — satisfaction to match the price.",
      pairing: "Cognac, Speyside single malt, fine rum.",
      summary: "A great robusto that distils Cohiba's essence, uniting the grassy sweetness with real power. An indulgence for intermediate to advanced smokers with the budget for it."
    },
    {
      cigar: "San Cristóbal El Príncipe",
      origin: "Cuba",
      wrapper: "Habano",
      size: "Petit Corona (110×42)",
      strength: "Mild",
      price: "¥2,500–3,500",
      first: "Creamy cedar, light nuts, honeyed sweetness. A soft, approachable start — the delicacy that comes with the small ring gauge is pleasing in itself.",
      middle: "Light coffee, toast and wood flavours join in. Mild, but with agreeable body — even at this short length it never feels wanting.",
      final: "It rounds off with leather and a hint of pepper. Light-footed to the end, a fresh, clean close that does not cling.",
      construction: "Stable burn and draw despite the small format. Affordable and easy to handle, well suited to a casual daytime smoke. A relatively young brand (1999), named after the patron saint of Old Havana.",
      pairing: "Café au lait, a light tea, or as a morning smoke.",
      summary: "A mild Cuban to enjoy light and short. A small vitola ideal for beginners or an easy daytime puff — and an excellent doorway into Cubans besides."
    },
    {
      cigar: "Juan López Selección No. 2",
      origin: "Cuba",
      wrapper: "Habano",
      size: "Robusto (124×50)",
      strength: "Medium",
      price: "¥2,800–3,800",
      first: "Cedar and earth, roasted nuts, a hint of sweetness. Gentle but with a firm core — an opening that hints at ability far beyond its modest price.",
      middle: "Coffee, leather, wood and light spice in harmony, showing complexity above its station. Nothing showy, but a midsection of real density.",
      final: "Cacao and earth deepen, closed with a hint of pepper. A well-knit aftertaste that lingers long.",
      construction: "Solid work, an even burn, a comfortable draw. Prized by the connoisseurs as a 'sleeper' — a hidden gem — and excellent value for money.",
      pairing: "Coffee, blended Scotch, a medium rum.",
      summary: "A high-value Cuban robusto for those in the know. A dependable, densely flavoured everyday cigar for the intermediate smoker."
    },
    {
      cigar: "Padrón 1964 Anniversary Series Exclusivo (Maduro)",
      origin: "Nicaragua",
      wrapper: "Nicaraguan Maduro",
      size: "Robusto (140×50)",
      strength: "Full",
      price: "¥3,500–5,000",
      first: "Smooth, sweet cedar, earth and leather with a pleasing peppery bite. Over a base of aged tobacco, black cherry, dark chocolate, black pepper and espresso rise up in dense array. A polished opening.",
      middle: "Dark chocolate and espresso settle in as the leads, joined by new layers of sweet cedar, roasted nuts and hazelnut. The maduro wrapper's sweetness and the Nicaraguan fillers' spice sit in superb equilibrium — a smooth sweetness like fine confectionery.",
      final: "Espresso and dark chocolate concentrate further, closing deep with coffee, earth and gentle black pepper on the retrohale. A rich, long finish.",
      construction: "Construction of the flawless kind only Padrón achieves. Draw and burn are beyond reproach, the ash tight. Box-pressed. Top 25 in 2011, at 95 points.",
      pairing: "Bourbon, Nicaraguan rum (añejo), strong espresso.",
      summary: "A monument of the New World full body. Cocoa-and-coffee bliss, and perfect construction. The dream cigar for intermediate to advanced smokers seeking rich, smooth flavour."
    },
    {
      cigar: "Padrón 1926 Serie No. 9 (Maduro)",
      origin: "Nicaragua",
      wrapper: "Nicaraguan Maduro",
      size: "Robusto (133×56)",
      strength: "Full",
      price: "¥4,500–6,500",
      first: "Dense espresso, dark cocoa, roasted almonds. Creamy sweetness and the faintest peppery prickle on the retrohale, cedar hanging quietly behind. It opens with a concentration that outdoes even the 1964.",
      middle: "Leather, molasses and black cherry deepen, the smoke turning silkier. Spice and oak are beautifully woven through, while cocoa, caramel and nuts form the summit of its rich, luscious complexity.",
      final: "Coffee, mocha and earth fill the tongue, cedar and pepper on the retrohale. The depth of bitter chocolate leaves a powerful, long finish.",
      construction: "Padrón's finest work. Perfect draw and burn, a tight ash. A box-pressed 5.25×56. A faultless finish worthy of the flagship. The maduro version scores around 91 in Cigar Aficionado, and the 1926 line itself took Cigar of the Year 2007 (the No. 9 Natural, at 97 points).",
      pairing: "Aged bourbon, añejo rum, dark chocolate.",
      summary: "Padrón's flagship. The very summit of density and refinement, unfolding full body by beautifully judged degrees. The ultimate cigar for the seasoned lover of full-bodied smoking."
    },
    {
      cigar: "Fuente Hemingway Signature",
      origin: "Dominican Republic",
      wrapper: "Cameroon",
      size: "Perfecto (152×47)",
      strength: "Mild to medium",
      price: "¥2,000–3,000",
      first: "It opens on dry woodiness and a striking sweetness. Sweet chocolate, cream, cashew, cedar, vanilla, nutmeg, and nuances of cherry and molasses. A light white pepper to finish the puff.",
      middle: "Nuts, sweet tobacco and cedar in harmony, with the refined spice (cinnamon) typical of a Cameroon wrapper and a sweetness of baked apple and raisin showing through. Creamy, and exceptionally easy to smoke.",
      final: "Espresso arrives, moving towards a slightly drier close of dark cocoa, leather and gentle pepper. A tangy, woody aftertaste lingers pleasantly. From light-up to the nub, the flavour is astonishingly consistent.",
      construction: "Despite the perfecto shape (tapered at both ends), the burn is even and the draw smooth. The ash holds well and stick-to-stick consistency is high. Fuente craftsmanship on full display.",
      pairing: "Medium-roast coffee, a lighter rum, red wine.",
      summary: "A graceful cigar that embodies the charm of the Cameroon wrapper. Sweet, smooth and universally likeable. A staple for beginners and intermediates — and one that veterans still reach for now and again."
    },
    {
      cigar: "Fuente Fuente OpusX",
      origin: "Dominican Republic",
      wrapper: "Dominican shade-grown (Rosado)",
      size: "Robusto (140×47)",
      strength: "Full",
      price: "¥4,500–7,000",
      first: "Cedar, leather, black pepper, red chilli, dried fig, florals, then minerals and a hint of charred cherry. A showy, powerful opening layered with white pepper on the retrohale.",
      middle: "Espresso, oak and dried fruit deepen, joined by nutmeg, vanilla and the boozy, cherry-cordial sweetness of luxurious baked confectionery. Cocoa and cherry leap into the lead as earth and minerals retire behind them.",
      final: "Dark chocolate, leather and pepper concentrate towards a sweet close recalling a rum barrel. Complex, rich, long. In the master blender's words, 'a complex powerhouse — full-bodied with leather and earth, carrying the sweetness essential to a strong cigar'.",
      construction: "Exacting work befitting its rarity; good burn and draw. A revolutionary cigar — a puro completed with a Dominican-grown shade wrapper — whose production is limited and which is hard to come by.",
      pairing: "Cognac, bourbon, strong espresso.",
      summary: "The legendary full-bodied Dominican puro. A complex powerhouse of swirling spice and sweetness. For the experienced smoker or collector who wants to taste an elusive treasure."
    },
    {
      cigar: "Oliva Serie V Melanio",
      origin: "Nicaragua",
      wrapper: "Ecuadorian Sumatra",
      size: "Robusto (127×52, box-pressed)",
      strength: "Full",
      price: "¥2,200–3,200",
      first: "A creamy introduction with the warm black pepper of Nicaraguan leaf. Sweet-and-salty nuts, toast and cedar. It opens on a superb contrast of delicacy and power.",
      middle: "Standout nutty toastiness and salinity, layered over with cocoa, creaminess, bread and earthiness. The early pepper softens here, and the pairing of leather and coffee is what sets this cigar apart from the rest. Full weight and sweetness held in tension.",
      final: "Leather, espresso, toffee sweetness and baking spice, all concentrated. Silky and sweet, at times intense with toast and cedar. A dense, deeply satisfying close.",
      construction: "Excellent work, as ever with Oliva. A box-pressed 5×52 with an even burn and a comfortable draw. An Ecuadorian Sumatra wrapper over Nicaraguan leaf. A celebrated line whose figurado version took Cigar of the Year 2014 (96 points).",
      pairing: "Bourbon, Nicaraguan rum, strong coffee.",
      summary: "A serious full body at a high-value price. Nut and salt, leather and coffee — real personality. For intermediate to advanced smokers who want intensity without the outlay."
    },
    {
      cigar: "My Father Le Bijou 1922",
      origin: "Nicaragua",
      wrapper: "Nicaraguan Oscuro (Habano-seed)",
      size: "Robusto (139×54)",
      strength: "Full",
      price: "¥2,500–3,500",
      first: "A core of hickory wood and black coffee with nutmeg and cherry sweetness. Savoury flavours of meat, dried tomato, red pepper and leather rise up like a T-bone on the barbecue.",
      middle: "The pepper settles into a rich sweetness of milky vanilla and tiramisu, dark cocoa, espresso and cedar. A bittersweetness recalling dark-chocolate-covered raisins layers with nuances of earth.",
      final: "The strength climbs in earnest — a creamy mouthfeel and a coffee afterglow. A smoky, powerful close, yet it never runs as wild as you expect, and a sweet-salty finish lingers long on the tongue. A 90–100 minute smoke.",
      construction: "The flawless work of the García family (of Don Pepín lineage): a razor-sharp burn line and thick, fragrant smoke. An all-Nicaraguan puro. Cigar of the Year 2015 (97 points).",
      pairing: "Aged bourbon, port, espresso.",
      summary: "A rich, complex masterpiece of the Nicaraguan full body, swinging dramatically from savoury to sweet. Strongly recommended to intermediate and advanced smokers who like their flavours with punch."
    },
    {
      cigar: "Liga Privada No. 9",
      origin: "Nicaragua/Honduras (Drew Estate)",
      wrapper: "Connecticut Broadleaf Maduro (No. 1 Dark)",
      size: "Robusto (127×54)",
      strength: "Full",
      price: "¥2,800–4,000",
      first: "The smooth sweetness of aged tobacco and chocolate, a spicy red-pepper retrohale, and a sweet, earthy coffee finish. Not a trace of harshness: creamy milk chocolate and coffee take the lead, earth held in reserve. Cocoa powder on the finish.",
      middle: "The body swells and the cocoa turns sweeter and more chocolatey. A charcoal note recalling the char on a flame-grilled steak, and pepper that sits on the tongue, emerge as its signatures. A perique-like sweetness and a tar-edged aftertaste deepen the complexity.",
      final: "Leather and coffee deepen towards a luxurious close of cedar, granola and raw sugar. Sweetness and pepper reach perfect equilibrium, the coffee tones staying dark to the last.",
      construction: "The abundant smoke and excellent construction one expects of Drew Estate; an even burn. A famous cigar rated 94 points by Cigar Aficionado, praised for 'a complex array of strong, earthy flavours and a sweet, tarry finish'. A popular stick whose restocks are eagerly awaited.",
      pairing: "Stout, bourbon, strong coffee.",
      summary: "Rich, but never rough — a full body of the highest finish. Chocolate-and-coffee sweetness with charcoal toastiness. An aficionado's darling, beloved of intermediate and advanced smokers with dark tastes."
    },
    {
      cigar: "Davidoff Signature No. 2",
      origin: "Dominican Republic",
      wrapper: "Ecuadorian Connecticut",
      size: "Panetela (152×38)",
      strength: "Mild",
      price: "¥3,000–4,500",
      first: "Sweet, bready notes recalling saffron and almond, with a brioche-like refinement. White pepper, then tree bark and spice. Sugary sweetness, cream and butter — the mellow Davidoff way in.",
      middle: "Cedar to the fore, with herbal nuance and the faintest vanilla sweetness. A delicate, polished development, like a fine black tea with a splash of milk. A tangy note of orange peel as the accent.",
      final: "An elegant afterglow of toast, cream, florals, earth and raw sugar cane. A creamy cappuccino finish, light-footed to the very end.",
      construction: "Davidoff precision. Even at a slender ring of 38, the panetela burns evenly with a faultless draw. An Ecuadorian Connecticut wrapper, a Connecticut/Habano hybrid seco binder, Dominican fillers. Mild, yet rich in flavour.",
      pairing: "A lighter coffee or tea, champagne.",
      summary: "One of the summits of the mild style. The delicacy of the slim format and a refined taste of bread and tea. For the well-funded beginner or intermediate — or a morning smoke over which to savour the aromas with care."
    },
    {
      cigar: "Macanudo Café Hyde Park",
      origin: "Dominican Republic",
      wrapper: "Connecticut Shade",
      size: "Robusto (140×49)",
      strength: "Mild",
      price: "¥1,500–2,200",
      first: "Almond, cashew and fresh herbs, with cedar and pine folded into a creamy base. Calm and creamy, with faint vanilla and buttery sweetness. A very light way in.",
      middle: "The creamy sweetness holds as cedar and almond join, and from around the halfway mark a whisper of white pepper appears. A blend of Dominican piloto cubano and Mexican fillers with a Mexican San Andrés binder.",
      final: "Mild throughout. Smooth, free of bitterness, closing as gently as it began. About 50 minutes' smoking.",
      construction: "Half a century as the recommended 'first cigar' — supremely dependable. No uneven burn, no bitterness. 90 points from Cigar Aficionado. Remarkably little variation between sticks.",
      pairing: "A mild coffee, milky tea, or a morning smoke.",
      summary: "The definitive beginner's cigar. Smooth, foolproof mildness. If ever in doubt about what to recommend first, start with this one."
    },
    {
      cigar: "A.J. Fernandez New World Puro Especial",
      origin: "Nicaragua",
      wrapper: "Nicaraguan Habano Oscuro",
      size: "Robusto (127×52)",
      strength: "Medium to medium-full",
      price: "¥1,200–2,000",
      first: "A vivid first impression of cocoa, earth and pepper. Spicy cedar, dry nuts, sweet bread, cinnamon, espresso bean. Strong black pepper on the retrohale, with a lightly sweet cocoa powder laying the base.",
      middle: "The pepper settles as nuts and dark cocoa powder come forward. Almond, dried fruit, cinnamon and espresso depth join in. Medium-plus in body, with a steady supply of earth and sweet cocoa.",
      final: "Sweet caramel, nuts and dark sweetness close in harmony. The spice quietens and nuts and dark cocoa come into focus — a well-balanced ending.",
      construction: "A puro made solely from leaf grown on Fernández's own farms in Estelí (aged 3–5 years). Every sample showed the excellent draw and even burn that are AJ's hallmarks. Extraordinary polish for under ten dollars — Top 25 in 2017 (93 points).",
      pairing: "Bourbon, rum, coffee.",
      summary: "A Nicaraguan puro of overwhelming value. Nutty, sweet, agreeably spiced intensity. Ideal for beginners and intermediates hunting a daily smoke."
    },
    {
      cigar: "Plasencia Alma Fuerte (Nestor IV)",
      origin: "Nicaragua",
      wrapper: "Nicaraguan Criollo '98",
      size: "Toro (159×54, box-pressed)",
      strength: "Medium to full",
      price: "¥2,800–4,000",
      first: "From the oily wrapper, aromas of natural tobacco, cedar, chocolate and earth. Strong earth with a faint sweetness of plum and cocoa, creaminess and white pepper. The plum sweetness rides the front of the draw.",
      middle: "Earth takes over from cedar at the front while dark cocoa raises the intensity. Cinnamon and chocolate on the retrohale, with a vivid, pepper-like prickle — and yet the smoke stays silk-smooth. A magnificent contrast.",
      final: "It turns bold and dark: a medley of dark chocolate, espresso bean, liquorice and rich earth. In the last inch, sweet fruit of plum and apricot rises through the afterglow.",
      construction: "Outstanding box-pressed work from the Plasencia family, a dynasty of tobacco growers five generations deep. The body runs medium, rising to medium-full in the later stages. The Nestor IV scores around 91 in Cigar Aficionado, with a 2017 Top 25 rating of 93 as well.",
      pairing: "Nicaraguan rum, bourbon, strong espresso.",
      summary: "A dense Nicaraguan puro worthy of its name ('strong soul'). Complexity woven of earth, plum and cocoa, and smoke like silk. For intermediate to advanced smokers in search of complex intensity."
    },
    {
      cigar: "Rocky Patel Vintage 1990",
      origin: "Honduras/Nicaragua",
      wrapper: "1990-vintage aged Ecuadorian Connecticut",
      size: "Robusto (140×50)",
      strength: "Medium",
      price: "¥1,800–2,600",
      first: "Cedar, nuts, light cocoa and sweet tobacco, as befits the aged wrapper. A smooth, mellow opening with the rounded edges only matured leaf provides.",
      middle: "Coffee, leather and caramel sweetness join, showing agreeable body and complexity. A midsection that wins you over with mellowness rather than fireworks.",
      final: "Espresso and woody depth build, closed with a hint of pepper. A well-balanced afterglow carries on.",
      construction: "The smooth smoke of matured leaf. An even burn and a comfortable draw. As a series crowned with a long-aged wrapper, it delivers dependable value.",
      pairing: "Coffee, a medium-bodied rum or bourbon.",
      summary: "The mellow maturity of an aged wrapper at a friendly price. A daily medium for beginners and intermediates who favour smooth, rounded flavours."
    },
    {
      cigar: "Undercrown Maduro",
      origin: "Nicaragua/Honduras (Drew Estate)",
      wrapper: "Mexican San Andrés Maduro",
      size: "Robusto (127×54)",
      strength: "Medium to full",
      price: "¥1,800–2,600",
      first: "Dark chocolate, coffee, cedar, gentle pepper and baking spice, with sweetness of sugar cane and vanilla bean besides. A dense opening worthy of Liga Privada's younger sibling — thick, creative smoke from the first light.",
      middle: "Cocoa and espresso deepen as leather, earth and raw-sugar sweetness join. The rich, smooth volume of smoke from the Brazilian and Nicaraguan fillers is a spectacle in itself.",
      final: "Dark chocolate, coffee and pepper concentrate into a powerful close. The body climbs steadily from medium, nearing 8/10 at its strongest. A well-knit afterglow.",
      construction: "It shares much of its leaf with Liga Privada, dressed in a thick, oil-rich San Andrés maduro. Drew Estate's excellent construction and phenomenal smoke output. Top 25 in 2017 (91 points). Great value.",
      pairing: "Stout, porter, bourbon, strong coffee.",
      summary: "The Liga Privada appeal at an approachable price. A rich maduro and prodigious smoke. Ideal for the intermediate smoker who wants something dark on a daily basis."
    },
    {
      cigar: "Ashton Classic",
      origin: "Dominican Republic",
      wrapper: "Connecticut Shade",
      size: "Robusto (124×50)",
      strength: "Mild",
      price: "¥1,800–2,600",
      first: "From a golden, silk-like Connecticut Shade leaf: cream, cedar, cashew, almond and a refined buttery sweetness. Nuances of buttered toast, citrus, honey and vanilla. A smooth, polished mild introduction.",
      middle: "Toast, wood, roasted tree nuts and a faint coffee join in. The 3–5-year-aged Dominican binder and fillers deliver a development that is mild yet balanced and complex.",
      final: "It keeps its creaminess, closing gently on a hint of pepper, leather and toasted tannin. A velvet smoothness that lasts to the very end.",
      construction: "Excellent work, as you would expect of Fuente manufacture (Ashton is produced at the Fuente factory): an even burn, a smooth draw, superb consistency. 90 points from Cigar Aficionado. A beginners' staple since its 1985 debut.",
      pairing: "A mild coffee, a light white wine, tea.",
      summary: "The standard-bearer of fine, smooth Connecticut mildness. A staple to recommend to beginners and intermediates wanting a step up from Macanudo in delicacy and complexity."
    },
    {
      cigar: "Montecristo White (Dominican)",
      origin: "Dominican Republic",
      wrapper: "Ecuadorian Connecticut",
      size: "Robusto (124×50)",
      strength: "Mild to medium",
      price: "¥1,800–2,600",
      first: "Cream, cedar, almond, faint vanilla and spice. A smooth, sweet, approachable opening — a soft way in, quite distinct from the Cuban version.",
      middle: "Coffee, nuts and wood flavours join, with an agreeable balance of body and sweetness. Mild-leaning, but with just enough complexity never to bore.",
      final: "It rounds off with leather, cacao and a hint of pepper. Smooth and easy-drinking to the close.",
      construction: "An even burn and a comfortable draw. Reliably made and easy to handle, well suited to everyday smoking. The signature mild-to-medium of Altadis's Dominican production.",
      pairing: "Caffè latte, coffee, a lighter rum.",
      summary: "A smooth Dominican that is quite another thing from the Cuban. Mild-leaning and easy-drinking — an approachable everyday cigar for beginners and intermediates."
    },
    {
      cigar: "Perdomo 10th Anniversary Champagne",
      origin: "Nicaragua",
      wrapper: "Aged Ecuadorian Connecticut",
      size: "Robusto (127×54)",
      strength: "Medium",
      price: "¥1,800–2,600",
      first: "Cream, cedar, nuts, buttery sweetness. The smooth, refined opening of aged Connecticut, with a light white pepper. You can feel the care lavished on this tribute marking Perdomo's tenth anniversary.",
      middle: "Coffee, caramel and wood flavours deepen, with agreeable body and complexity. For a mild-leaning Connecticut, a medium of real substance and spine.",
      final: "It closes on espresso, leather and a hint of pepper. A well-knit afterglow carries on.",
      construction: "Perdomo's customary excellent construction, with a smoothness owed to aged, barrel-fermented leaf. An even burn and a good draw. Consistent quality at high value.",
      pairing: "Coffee, champagne, a lighter bourbon.",
      summary: "The mellow maturity of aged Connecticut at a friendly price. A high-value pick for beginners and intermediates who like their medium smooth but with a firm core."
    },
    {
      cigar: "Cohiba Behike BHK 52",
      origin: "Cuba",
      wrapper: "Habano",
      size: "Laguito No. 4 (119×52)",
      strength: "Medium to full",
      price: "¥20,000–35,000",
      first: "Earth and wood at the core, with a pinch of spice. A balanced, composed opening, carrying the quiet authority of Cohiba's summit line.",
      middle: "Here the blend — which includes the rare medio tiempo leaf, the handful of sun-soaked leaves that grow only at the very top of the tobacco plant — releases its depths of creamy cocoa and leather. Creamy coffee and earthiness unfold in complexity, underpinned by a power that even ten years of ageing does not diminish.",
      final: "The spice returns, melting into coffee and roasted nuts for a rich close. Well balanced even young, with the pedigree to grow further as it rests.",
      construction: "Perfect construction, most of them rolled at El Laguito. Superbly balanced from youth, carrying the air of the great Cuban cigars of old. In Cigar Insider's vertical tasting it scored 94, topping the BHK 54 and 56 — the pick of the line.",
      pairing: "Aged cognac, a fine single malt, champagne.",
      summary: "The summit of modern Cuban cigar-making, charged with the complexity and power that medio tiempo brings. A point of arrival for the collector or seasoned smoker who spares no budget."
    },
    {
      cigar: "Arturo Fuente Añejo No. 77 (The Shark)",
      origin: "Dominican Republic",
      wrapper: "Connecticut Broadleaf Maduro (cognac-barrel aged, 5 years)",
      size: "Box-pressed torpedo (150×64)",
      strength: "Medium to full",
      price: "¥5,000–9,000",
      first: "Sweet caramel, cashew, cocoa, then salt and pepper. At the outset a mild sweetness entwines with wood and chocolate, and a refined richness owed to the cognac-barrel-aged leaf hangs over it all.",
      middle: "The spice builds and a nuance of cinnamon appears. Connecticut Broadleaf rested in cognac barrels lends a lustrous black-cherry sweetness and body, creating a complexity that sets it apart from the other Añejos.",
      final: "Into an espresso finish. Full-flavoured and approaching full-bodied, yet this is not a cigar that overwhelms through sheer tobacco strength — it closes on sweetness and savour. About 1 hour 20 minutes' smoking.",
      construction: "The distinctive box-pressed torpedo whose foot is squared off (hence 'the Shark'). Smoke so dense, smooth and laden with flavour it all but fogs the room. Released only twice a year, at Christmas and Father's Day — the hardest to find and most coveted of the Añejo line.",
      pairing: "Cognac, aged rum, espresso.",
      summary: "A limited-release jewel steeped in the luscious richness of cognac-barrel-aged maduro. A cigar to dream of for the seasoned smoker or collector who wants to taste its layers of caramel, cocoa and cherry."
    }
  ];

  if (W.reviews.length === RV.length) W.reviews.forEach(function (o, i) { Object.assign(o, RV[i]); });

  var OC = [
    {
      type: "Little cigars",
      price: "Japan: approx. ¥450–600 for a pack of 20 (guide)",
      time: "About 5–10 minutes",
      desc: "Almost identical to cigarettes in length and slimness, most of them filtered. The decisive difference lies in the wrap: instead of paper they use a tobacco-derived sheet (reconstituted leaf), which classifies them in law as 'cigars'. In Japan they expanded rapidly because the old cigar tax formula (one gram of leaf counted as one cigarette) once worked in their favour and made them cheaper than cigarettes, but the two-stage tax rises of October 2020 and October 2021 all but erased the price gap. Being dry-cured they need no humidor or humidity control, and can be carried about as they are once opened. In the United States, too, they circulate in volume as small, cheap 'little filtered cigars' (LFCs), and statistically their patterns of use — daily smoking and inhaling into the lungs — are said to stand out as close to cigarettes. Many brands come flavoured with menthol or fruit, and they have won a steady following as a refuge for cigarette smokers."
    },
    {
      type: "Cigarillos",
      price: "Japan: approx. ¥540 to over ¥2,200 for 10 (guide)",
      time: "About 10–20 minutes",
      desc: "Small cigars sitting between premium cigars and little cigars in size, generally 3–5 inches (roughly 7.5–13 cm) long and slim in ring gauge. Most are machine-made: dry-cured short filler (chopped short leaf) rolled in reconstituted-leaf sheet or natural leaf. Fatter than a cigarette, their calling card is delivering cigar-like richness and aroma in a short sitting, and the range is broad — filtered or unfiltered, natural-leaf or HTL wrappers. Café Crème of the Netherlands, Villiger of Switzerland and Dannemann's 'Moods' of Germany are the standard-bearers, and a culture of pairing them with coffee or an after-dinner moment is well rooted in Europe. Being dry-cured they tend to burn fast and hot rather than dry and cool, designed to be enjoyed in one sweep from light-up to ash — a point on which they differ from premiums."
    },
    {
      type: "Dry cigars (dry-cured cigars)",
      price: "Japan: approx. ¥540–2,200 for 10 (guide)",
      time: "5–25 minutes per stick",
      desc: "The general term for cigars whose leaf has been dried (dry-cured) so that they keep long-term at room temperature and low humidity — colloquially the 'Dutch type'. Their greatest asset: no humidor is needed, the taste holds up after opening, and they can be carried casually in their tin or box. The manufacturing philosophy stands in contrast to the humidity-sensitive Cuban-style premiums; with less moisture they tend to burn faster and hotter. The culture grew up chiefly in Europe — Switzerland, the Netherlands, Germany, Denmark — as the smoke for the gaps in a busy day. Sizes run from mini cigarillos to the half-corona class, and because they are hard to get wrong even without any knowledge of humidity management, they are often recommended to beginners as a doorway into cigars."
    },
    {
      type: "Flavoured cigars",
      price: "Japan: approx. ¥540–900 for 10 (guide)",
      time: "About 10–30 minutes",
      desc: "The general term for cigars whose leaf or tip carries added flavourings — vanilla, cherry, rum, cognac, chocolate, honey-berry and so on. Many have a sweetened mouthpiece (sweet tip), and with the tobacco's bitterness softened they are an easy entry for beginners. In the West they enjoy enormous popularity, above all with younger smokers: Swisher Sweets and Backwoods in the US, Al Capone and Handelsgold in Germany are the flag-bearers. In recent years, concern that they encourage youth smoking has kept regulation on the agenda — in the US, restrictions on non-menthol cigarette flavours and a continuing debate over flavoured cigars — so product ranges differ greatly by region. The fun of choosing by aroma is real; equally, devotees who prize the leaf's own natural flavour can dismiss them as heresy, and opinion splits down the middle."
    },
    {
      type: "Machine-made",
      price: "From tens to a few hundred yen per stick (guide)",
      time: "5–30 minutes per stick",
      desc: "As against the fully hand-made cigar (totalmente a mano), the general term for cigars formed by machine. They commonly use chopped short filler, and homogenised tobacco leaf (HTL) — scrap leaf bound with cellulose-based adhesive into sheets — for binder or wrapper. HTL was born in the 1950s as a cost-saving measure: it does not tear and is uniform in thickness, suiting high-speed rolling machines and delivering mass production, low prices and consistent quality. Cuba, too, has machine-made, short-filler budget lines — José L. Piedra, Guantanamera, the Cohiba and Montecristo Minis and Clubs — capturing value-minded newcomers. As industrial products they show little stick-to-stick variation, and their dependable lighting and draw are practical strengths."
    },
    {
      type: "Kretek (clove cigars)",
      price: "Overseas: from a few hundred yen for 10–20 (guide)",
      time: "About 5–15 minutes",
      desc: "An Indonesian creation: tobacco blended with cloves for a distinctive sweet, spicy aroma. Originally a cigarette (the kretek), but after the US banned cigarette flavours other than menthol in 2009, clove products switched to being wrapped in tobacco-leaf paper and sold as 'cigars'. Djarum Black is known the world over, and the name comes from the crackle of the cloves as they burn. Highly idiosyncratic — a niche that divides opinion sharply, but one with a devoted following. In Indonesia the kretek forms a huge market as a national tobacco culture, and within the cigar category it stands as an independent character all its own."
    },
    {
      type: "Wood-tip / pipe-tobacco cigars",
      price: "Overseas: from a few hundred yen for 5 (guide)",
      time: "About 20–40 minutes",
      desc: "American-style machine-made cigars fitted with a wooden or plastic mouthpiece (tip). Some, like Black & Mild, are filled not with cigar leaf but with pipe tobacco, giving a sweet, mellow aroma close to a pipe's. The tip has practical roles: it sits comfortably in the hand and keeps saliva from dampening the leaf. Hav-A-Tampa's 'Jewels' pioneered the wooden-tip cigar, and in the US the category has long been cherished less as a connoisseur's pleasure than as the easy everyday smoke of the mass market. Needing none of the premium cigar's rituals or tools — no cutting, just light it and go — it is a fixture for casual smokers."
    }
  ];
  if (W.otherCategories.length === OC.length) W.otherCategories.forEach(function (o, i) { Object.assign(o, OC[i]); });

  var OB = [
    {
      name: "Villiger",
      country: "Switzerland",
      type: "Dry / cigarillos",
      desc: "A distinguished house founded in 1888 by Jean Villiger in Pfeffikon, Switzerland. The world's leading name in dry-cured machine-made cigars and a major player in the trade, producing over a billion sticks a year with a workforce of around 1,200 (turnover in recent years is put at roughly CHF 140 million). Its flagships are the square-pressed 'Export' (a small 4×37 with a Sumatra or Brazil wrapper and Cuban-seed leaf at its core) and the 'Kiel', which since 1907 has carried a mouthpiece modelled on a goose-quill. No humidity control needed — ideal for smoking out and about. Heinrich Villiger, the patriarch who led the group for decades, died in 2025 at the age of 95, but the business carries on as a family firm."
    },
    {
      name: "Ritmeester",
      country: "Netherlands",
      type: "Dry / cigarillos",
      desc: "Traces its origins to a factory founded in 1887 by the Van Schuppen brothers in Veenendaal in the Netherlands, renamed Ritmeester in 1915; today it is manufactured by Dannemann. Its flagship, the 'Royal Dutch Half Corona', is a small dry cigar of about 95 mm and roughly 15 minutes' smoking, mild to medium in flavour and ready to enjoy straight from the box — no cutting, no humidity control. Sold in packs of five and the like, it is a familiar dry-cigar staple, easy to find in Japan's tobacconists and convenience stores."
    },
    {
      name: "Café Crème",
      country: "Netherlands",
      type: "Cigarillos",
      desc: "Launched in 1963 by the Dutch firm Henri Wintermans, and one of the world's best-selling cigarillos. The flat tin with its coffee-cup design is iconic, and true to the name it is a mild smoke that goes beautifully with coffee. A duty-free staple that spread across the world, holding a leading position in the UK's imported cigar market in the 1970s and 80s. Under Britain's BAT from 1966 and the Scandinavian Tobacco Group since 1996, its distribution network has widened. It comes in several variants such as Blue and Arôme; in Japan around ¥540 for ten is the going rate."
    },
    {
      name: "Dannemann",
      country: "Germany/Brazil",
      type: "Cigarillos / dry",
      desc: "Founded in 1873 by Bremen-born Geraldo Dannemann in São Félix, Brazil, with six employees — a self-made man who also served as mayor there in Bahia, and who died in Hamburg in 1921. In 1988 Switzerland's Burger Group acquired the German trademark rights, and the head office today is in Lübbecke, Germany. 'Moods', launched in 1994, claimed to be the world's first aromatic (flavoured) cigarillo — a smart little cigar of Virginia, Oriental and other leaf rolled in Brazilian wrapper — and the company remains one of the driving forces of the European cigarillo market."
    },
    {
      name: "Al Capone",
      country: "Germany",
      type: "Flavoured cigarillos",
      desc: "A flavoured mini-cigarillo made by Dannemann. Its flagship is the 'Sweets' series, dipped in cognac or rum for a sweet aroma, with filtered versions also offered. Java wrappers from the company's own farms are combined with Virginia, Burley and Oriental leaf plus Nicaraguan and Brazilian tobaccos for a medium body. Sold in tins and boxes of ten, its sweet tip, easy availability and Prohibition-era gangster branding make it a popular, approachable choice for beginners and younger smokers."
    },
    {
      name: "Handelsgold",
      country: "Germany",
      type: "Flavoured cigarillos",
      desc: "A German standard that built its mass-market popularity across Europe on flavoured cigarillos — vanilla, cherry, chocolate and more — and on 'sweet cigarillos' with sweetened tips. With friendly prices and a broad palette of aromas, it circulates widely in many countries as the entry brand for flavoured cigars, and is often the one chosen as a very first stick."
    },
    {
      name: "Davidoff",
      country: "Switzerland",
      type: "Premium cigarillos",
      desc: "The small-format line of the luxury house. Its 'Mini Cigarillos' sit at the fine, higher-priced end of the dry-cigar world. Sold in tins — Gold, Silver, Escurio, Brilliant Blue and others — its signature is a refined aroma and a poised, mild flavour. In Japan around ¥2,200 for ten is the guide; it serves the market for gifts and the 'slightly better smoke', and is recognised as the quality-minded benchmark within the cigarillo category."
    },
    {
      name: "Nobel Petit",
      country: "Denmark",
      type: "Dry / cigarillos",
      desc: "Made by Denmark's Nobel, and the standard-bearer of Nordic dry cigars. Known for a mild, well-balanced flavour, it has long been a familiar fixture of Europe's duty-free shops. Small, easy to handle and needing no humidity control, it suits a smoke while travelling or out and about. Nothing flashy — a refined taste with few rough edges that also makes it an easy first step into dry cigars."
    },
    {
      name: "Agio / Panter",
      country: "Netherlands",
      type: "Cigarillos / dry",
      desc: "Built on Royal Agio, the independent family firm founded by Jacques Wintermans in 1904, supplying more than 100 countries from one of Europe's largest factories at Duizel in the Netherlands; on its centenary it received the honour of a Dutch royal warrant. Its range spans the everyday small cigars 'Panter' and 'Mehari's' and the premium long cigar 'Balmoral'. In 2020 the Scandinavian Tobacco Group acquired it for about $235 million. With mild dry cigarillos in Ecuadorian-leaf wrappers and more, it is a core manufacturer sustaining Europe's everyday cigarillo market."
    },
    {
      name: "Backwoods",
      country: "USA",
      type: "Flavoured cigarillos",
      desc: "Appeared in the 1970s (around 1973) and spread across the US around 1981. Its look is rustic and untamed — a twisted, artless shape, a frayed tip and a natural-leaf (Connecticut Broadleaf) wrapper — under the banner 'wild yet mild'. Machine-made, but keeping a hand-rolled appearance. Aged Dominican leaf carries the sweet aromas, and the flagship 'Honey Berry' has been the line's best-seller and a long-running favourite for over a quarter of a century. Sold in packs of five, it enjoys enormous popularity with the young."
    },
    {
      name: "Swisher Sweets",
      country: "USA",
      type: "Flavoured cigarillos",
      desc: "The flagship of Swisher, a venerable firm whose roots go back to a cigar business in Newark, Ohio in 1861. It arrived in 1958 as the company's sweet machine-made flagship, adding little cigars in 1985. With a wealth of flavours — grape, strawberry, peach, tropical — low prices and overwhelming availability, it holds a leading share of the US machine-made market. The company is reckoned to produce on the order of a billion sticks a year, and has grown into a giant whose product range runs from blunt wraps to premium hand-mades."
    },
    {
      name: "Black & Mild",
      country: "USA",
      type: "Pipe-tobacco cigars",
      desc: "Launched in 1980 by John Middleton Co., a Philadelphia firm founded in 1856 — a sweet-scented cigar filled with pipe tobacco. Fitted with a plastic or wooden tip, it aims for the smoke closest to a pipe's. It ranks around second in sales among large machine-made cigars in the US, with annual sales put at somewhere in the low billions of sticks. Alongside the original, wine, apple and other flavours are offered; needing no cut and easy to enjoy, it has been loved for years as a staple brand of the mass market."
    },
    {
      name: "Dutch Masters",
      country: "USA",
      type: "Flavoured cigarillos",
      desc: "An American mass-market stalwart on sale since 1912. The packaging bears Rembrandt's 1662 painting 'Syndics of the Drapers' Guild', and in the 1950s and 60s the brand raised its profile sponsoring the shows of comedian Ernie Kovacs. It became the mainstay of the Consolidated Cigar company in 1921 and now sits in the Altadis fold. Fruit flavours are the pillar of its sales, and it is also widely known in blunt culture — the cigar unrolled and re-rolled by hand."
    },
    {
      name: "White Owl",
      country: "USA",
      type: "Flavoured cigarillos",
      desc: "A historic brand founded in the 1800s, today part of the Swisher family. Its appeal lies in a broad range of flavours — white grape, peach, silver, mango — together with uniform quality and low prices. A quintessential everyday machine-made cigarillo, distributed widely through America's convenience stores and petrol stations, and cherished as a daily standby for its affordability and consistent draw."
    },
    {
      name: "Hav-a-Tampa",
      country: "USA",
      type: "Wood-tip cigars",
      desc: "Founded in 1901 in Ybor City, Tampa, Florida. Its 'Jewels', made since 1931, pioneered the wooden-tip cigar and are held to be the best-selling wooden-tip machine-made cigar in the world. The tip gives a smooth grip and keeps saliva from dampening the leaf. The Tampa factory closed in 2009 amid indoor-smoking bans and recession, but Altadis continues production in Puerto Rico and elsewhere, and the brand still circulates as one of America's traditional everyman's cigars."
    },
    {
      name: "Djarum",
      country: "Indonesia",
      type: "Kretek (clove) cigars",
      desc: "A major tobacco company founded in 1951 by Oei Wie Gwan in Kudus, Indonesia (the name means 'needle'). Famous for its clove-laced 'kretek'; 'Djarum Black' is known for its sweet, spicy aroma and the crackle of its burn. In the US, following the 2009 restrictions on cigarette flavours, it switched to a 'cigar' format wrapped in tobacco-leaf paper. The company ranks around third among Indonesia's corporate giants, and its products are exported widely across the world — a marque of strong, distinctive character."
    },
    {
      name: "José L. Piedra",
      country: "Cuba",
      type: "Budget Cuban cigars",
      desc: "Founded in the 1880s by the Piedra family in the Remedios region of central Cuba. Discontinued for a time after the Revolution, it was revived in 1996 as a budget brand. Its hallmark is short filler from Vuelta Arriba — not the supreme growing region of Vuelta Abajo — finished 'totalmente a mano, tripa corta' (hand-made, short filler). Medium to full in body, sold as a rule in boxes of 25. Positioned among Habanos's volume brands, it is known as the cheapest way to taste a genuine Cuban cigar."
    },
    {
      name: "Guantanamera",
      country: "Cuba",
      type: "Budget Cuban cigars",
      desc: "A budget Habanos line unveiled in September 2002 at the Intertabak fair in Dortmund, Germany (the name comes from the folk song 'Guajira Guantanamera'). It is machine-made by ICT, using short filler from Vuelta Arriba. With a pre-cut head and a mild flavour, it suits newcomers to Cuban cigars. An everyday product covering the Cuban value segment, with overseas prices typically put at around £2.50–4."
    },
    {
      name: "Cohiba / Montecristo (Cuban Minis / Clubs)",
      country: "Cuba",
      type: "Machine-made minis",
      desc: "The small-format lines of the famous premium brands, machine-made in Cuba under Habanos licence — Minis in tins of 20 and Clubs in packs of 10 as the standard formats. The Montecristo Mini is a 20 ring gauge at about 83 mm, and the Club smokes about twice as long as the Mini. Using leaf of the same lineage as hand-made Havanas but finished conveniently in short filler, they need no cutting and deliver the scent of Cuba in a short sitting. Distributed worldwide as an affordable way into the dream brands."
    },
    {
      name: "Tabacalera",
      country: "Philippines",
      type: "Small cigars",
      desc: "The marque of the Philippines' Tabacalera Incorporada, which traces its origins to Asia's first cigar factory, founded in 1881. Leaf from Isabela province and elsewhere is finished 'totalmente hecho a mano' (fully hand-made). The small 'Half Corona' is known in Japan as an affordable stick that can be bought even at convenience stores for around ¥300 (guide), and its easy, dry-leaning taste makes it popular with beginners too. The company, which also owns Alhambra, Calixto Lopez and others, is the grand old house of Philippine cigars."
    }
  ];
  if (W.otherBrands.length === OB.length) W.otherBrands.forEach(function (o, i) { Object.assign(o, OB[i]); });

  W.otherJapan = "【Where to buy】In Japan, little cigars and dry cigars can be bought at convenience stores (FamilyMart in particular is active in selling cigars singly), tobacconists, Don Quijote and online. Stock varies greatly from shop to shop — some are said to carry a wide range, others only a handful of brands.\n【Little-cigar taxation and prices】Cigarette-like in form, sold in packs of 20. Once among the cheapest at ¥350–460 a pack, but after the review that taxes lightweight cigars on a par with cigarettes — implemented in two stages in October 2020 and October 2021 — the guide price now sits in the ¥450–600 range.\n【Background to the tax classification】Cigars were traditionally taxed on the basis of one gram of leaf = one cigarette, so lightweight little cigars carried a light tax burden and were cheap. That loophole has been closed and the price gap with cigarettes has narrowed sharply, though a fair number of smokers are said still to choose them.\n【Transitional measures】From October 2020 the system moved to counting one lightweight cigar as one cigarette, with a transitional measure until the end of September 2021 treating sticks under 0.7 grams as 0.7 of a cigarette to soften the blow. The staged increases avoided a sudden leap in prices.\n【Flavours and menthol】Little cigars come in many flavoured versions — menthol, cherry, vanilla and so on. Brands include Forte, Camel cigars and Lucky Strike derivatives among others, and being able to choose by price and aroma is said to be part of the appeal.\n【Dry-cigar and cigarillo staples】Convenience stores carry a selection (half coronas, mini cigarillos). The staples are the 'Tabacalera Half Corona' (around ¥300 as a guide), the Ritmeester Half Corona, the Dutch-made Café Crème range, Villiger, and Davidoff Mini Cigarillos.\n【The half corona as a doorway】The half corona is a small dry cigar of about 95 mm, ready to smoke with no cutting and no humidity control. Startable from the ¥300–400 range and combining ease with genuinely cigar-like satisfaction, it is often recommended as a first stick.\n【Cuban minis available too】Specialist shops and online retailers also stock the small Cuban machine-made tins — the Cohiba and Montecristo Minis and Clubs. Offering the scent of the dream brands cheaply and in a short sitting, they are popular as a bridge towards premium cigars.\n【Storage and ease of handling】Dry cigars and little cigars are all dry-cured and need no humidity control. They keep at room temperature in their tin or box and can be carried after opening. With no humidor required, they are held to be markedly easier for beginners and casual smokers to manage.\n【A note on how to smoke】The proper cigar is savoured in the mouth, its smoke never taken into the lungs; but little cigars resemble cigarettes and many people do inhale. Inhaling is held to bring the health risks closer to a cigarette's — if it is flavour you are after, mouth smoking remains the rule.\n【How to choose】For a first attempt, a lighter dry cigar or a sweet-tipped cigarillo is the easiest way in. The usual advice runs: use a specialist shop, or a convenience store that sells singles, to try one stick first, then narrow down what suits you by aroma, strength and smoking time.\n【Making use of shops and bars】When in doubt over brands, the shortest route is to ask at a cigar bar or specialist tobacconist. With singles and staff advice you can try in small quantities, making it easier to avoid the misstep of buying a whole box only to find it is not to your taste.";

  W.otherVsPremium = "【Convenience and storage】A premium hand-made is a luxury kept at around 70% humidity in a humidor to mature, and smoked over anywhere from 30 minutes to 2 hours. This category, by contrast, is dry-cured — no humidity control needed, carried in its tin or box, and finished in 5–25 minutes: the 'everyday smoke'.\n【Manufacture】The premium standard is long filler (whole long leaves) and a natural-leaf wrapper, fully hand-rolled by artisans (totalmente a mano). Here the mainstay is machine manufacture, forming chopped short filler by machine, with mass production delivering low prices and uniform quality.\n【The filler difference】Premium long filler — single leaves folded lengthwise — gives an ordered passage for the smoke and a slow, even burn. The dry and machine-made styles mostly use short filler of chopped offcuts: quicker-burning, but with the advantage of mass-producing a consistent draw at low cost.\n【Wrappers and HTL】For a premium, the natural wrapper — chosen by origin and leaf position — is everything. The machine-made styles often use homogenised tobacco leaf (HTL), scrap leaf bound with cellulose into sheet form, for binder or wrapper. HTL does not tear, is uniform in thickness, suits high-speed rolling machines and keeps costs down.\n【Price】Premiums run from ¥1,000 to several thousand yen a stick, some past ¥10,000. Dry cigars, little cigars and cigarillos centre on tens to a few hundred yen per stick — a price range for casual experiment. Suiting bulk buying and daily use, that is the great practical difference.\n【Flavour and smoking time】A premium keeps its moisture and burns cool and slow, unfolding complex shifts of aroma over a long sitting. The dry styles, with less moisture, burn faster and hotter — designed, it is said, to deliver richness and aroma straight and undiluted in a short time.\n【To age or not】A premium mellows with box ageing, its flavour growing with the years — part of the pleasure. The dry styles assume dry storage and as a rule do not aim at ageing: what you buy is the finished article. Made for brisk consumption rather than long keeping — a clear contrast.\n【Japanese taxation】Little cigars, near-cigarettes in form, were once taxed lightly as 'cigars' and so were cheap. The two-stage tax rises of October 2020 and October 2021 corrected this to cigarette-level taxation, and their price advantage within the cigar family, premiums included, has shrunk.\n【Health and the smoke】The cigar is by design tasted in the mouth, not inhaled. Little cigars, though, resemble cigarettes and are readily inhaled — in which case the risks are held to approach a cigarette's. Research likewise reports that little filtered cigars are often smoked daily and inhaled.\n【Philosophies of origin】The premium follows the humidity-keeping 'Cuban type' philosophy, lavishing effort on ageing and storage. The dry styles follow the dry-storage 'Dutch type', putting convenience first. Both are cigars, yet their designs for storage and taste could be said to differ at the root.\n【Position and division of labour】The premium is the 'hobby and ritual, to be savoured at leisure'; the dry cigar, little cigar and cigarillo are the 'practical article — easy, cheap and brief'. Where the former stages a special hour, the latter stand clearly apart as the entry point for newcomers and the casual smoker's choice.";
})();
