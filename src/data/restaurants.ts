export type Restaurant = {
  slug: string;
  name: string;
  district: string;
  cuisine: string;
  priceLevel: "€" | "€€" | "€€€" | "€€€€";
  shortDesc: string;
  longDesc: string;
  imageHue: number;
  imageKey?: string;
  openingHours?: string;
  websiteUrl?: string;
  reservation?: boolean;
  categories: string[];
};

export const restaurants: Restaurant[] = [
  // === STERNEKUECHE / GEHOBEN ===
  {
    slug: "beckers-restaurant",
    name: "Becker's Restaurant",
    categories: ["kulinarik", "wein"],
    district: "olewig",
    cuisine: "Sterneküche",
    priceLevel: "€€€€",
    shortDesc:
      "Sterne-Restaurant der Familie Becker in Olewig. Moderne Küche, eigene Weine, weinaffine Pairings.",
    longDesc:
      "Becker's Restaurant gehört zur Spitze der deutschen Sterne-Gastronomie und residiert im Weinhaus Becker in Olewig. Wolfgang Becker komponiert moderne Geniesser-Menüs, die eng mit der Wein-Selektion des Hauses verzahnt sind. Reservierung Pflicht.",
    imageHue: 3,
    openingHours: "Di-Sa ab 18:30",
    websiteUrl: "https://www.beckers-trier.de",
    reservation: true,
  },
  {
    slug: "schlemmereule",
    name: "Schlemmereule",
    categories: ["kulinarik"],
    district: "innenstadt",
    cuisine: "Mediterran-regional",
    priceLevel: "€€€",
    shortDesc:
      "Im Domkeller in der Domfreihof. Mediterrane Akzente auf regionalem Fundament.",
    longDesc:
      "Die Schlemmereule liegt im historischen Gewölbekeller am Domfreihof. Petra und Hubert Scheid kochen mediterran-regional auf konstantem Niveau seit Jahrzehnten. Hervorragende Weinkarte mit Mosel-Schwerpunkt, ruhige Atmosphäre.",
    imageHue: 4,
    openingHours: "Di-Sa 12-14, 18-22",
    websiteUrl: "https://www.schlemmereule.de",
    reservation: true,
  },
  {
    slug: "bagatelle",
    name: "Bagatelle",
    categories: ["kulinarik"],
    district: "innenstadt",
    cuisine: "Bistro",
    priceLevel: "€€€",
    shortDesc:
      "Charmantes Bistro mit franzoesischem Einschlag in der Zuckerbergstrasse.",
    longDesc:
      "Die Bagatelle ist Triers Top-Adresse für Bistro-Küche: kleine Karte, sorgfältige Saucen, Wein-Empfehlung pro Gang. Schöne Sommer-Terrasse, intimer Innenraum. Reservierung empfohlen.",
    imageHue: 4,
    openingHours: "Di-Sa 18-23",
    reservation: true,
  },
  // === MOSELLAENDISCH / REGIONAL ===
  {
    slug: "weinstube-kesselstatt",
    name: "Weinstube Kesselstatt",
    categories: ["kulinarik", "wein"],
    district: "innenstadt",
    cuisine: "Regional / Weinstube",
    priceLevel: "€€",
    shortDesc:
      "Klassische Weinstube am Liebfrauenplatz. Regionale Küche, Mosel-Weine, herrliche Terrasse.",
    longDesc:
      "Die Weinstube Kesselstatt im Palais Kesselstatt am Liebfrauenplatz ist Trier pur: Innenhof-Terrasse mit Blick auf Dom und Liebfrauenkirche, regionale Karte mit moselländischen Klassikern, Weine von Reichsgraf Kesselstatt. Bei Sonne Triers schönste Adresse.",
    imageHue: 3,
    openingHours: "Taegl. 11-23",
    reservation: true,
  },
  {
    slug: "zum-domstein",
    name: "Zum Domstein",
    categories: ["kulinarik", "roemisches-erbe"],
    district: "innenstadt",
    cuisine: "Regional / Römisch",
    priceLevel: "€€",
    shortDesc:
      "Restaurant über einer römischen Kelterei. Regional plus historische Roemer-Menüs.",
    longDesc:
      "Zum Domstein steht über einer originalen römischen Kelterei aus dem 4. Jahrhundert - im Keller begehbar. Auf der Karte regionales und auf Wunsch ein historisches Roemer-Menü nach antiken Rezepten von Apicius. Touristisch, aber gut gemacht.",
    imageHue: 1,
    openingHours: "Taegl. 9-23",
    websiteUrl: "https://www.domstein.de",
    reservation: true,
  },
  {
    slug: "kartoffelkiste",
    name: "Kartoffelkiste",
    categories: ["kulinarik", "familie"],
    district: "innenstadt",
    cuisine: "Regional",
    priceLevel: "€€",
    shortDesc:
      "Trierer Klassiker mit Kartoffel-Themenkueche. Familienfreundlich, ueberportioniert, gemütlich.",
    longDesc:
      "Die Kartoffelkiste am Hauptmarkt ist ein Trierer Klassiker für alle, die Kartoffel in jeder Form mögen: vom Reibekuchen bis zur Folienkartoffel, mit moselländischen Beilagen. Familienfreundlich, faire Portionen.",
    imageHue: 4,
    openingHours: "Taegl. 11:30-23",
    reservation: false,
  },
  {
    slug: "pfeffermuehle",
    name: "Pfeffermuehle",
    categories: ["kulinarik"],
    district: "innenstadt",
    cuisine: "Regional-modern",
    priceLevel: "€€€",
    shortDesc:
      "Restaurant mit moderner Interpretation moselländischer Küche im Zurlaubener Fischerviertel.",
    longDesc:
      "Die Pfeffermuehle im Zurlaubener Ufer kombiniert die romantische Mosel-Lage mit moderner Regionalkueche. Schöne Terrasse direkt am Wasser, saisonale Karte, gehobene Weinkarte. Auch ein Kandidat für den Geburtstags-Tisch.",
    imageHue: 2,
    openingHours: "Di-So 12-14, 18-22",
    reservation: true,
  },
  {
    slug: "bei-joh-und-otto",
    name: "Bei Joh und Otto",
    categories: ["kulinarik"],
    district: "innenstadt",
    cuisine: "Modern",
    priceLevel: "€€€",
    shortDesc:
      "Junges Restaurant mit moderner Küche, kleine Karte, schöne Weinauswahl.",
    longDesc:
      "Bei Joh und Otto ist Triers junge Spitzenkueche: kleine, oft wechselnde Karte, modern interpretierte Klassiker, kuratierte Wein-Selektion. Wer Trier kulinarisch jenseits der Touristen-Achse erleben will, kommt hierher.",
    imageHue: 4,
    openingHours: "Mi-Sa 18-23",
    reservation: true,
  },
  // === OLEWIG-WEINSTUBEN ===
  {
    slug: "weingut-reverchon",
    name: "Weingut Reverchon",
    categories: ["wein", "kulinarik"],
    district: "olewig",
    cuisine: "Weingut / Weinstube",
    priceLevel: "€€",
    shortDesc:
      "Weingut mit Hof-Weinstube. Eigene Weine plus Mosel-Vesper, Flammkuchen, Winzer-Brot.",
    longDesc:
      "Das Weingut Reverchon in Olewig öffnet seine Hof-Weinstube für Gäste. Auf der Karte eigene Weine im Glas und in der Flasche, Mosel-Vesper, Flammkuchen, hausgemachte Winzer-Salate. Sommer-Terrasse, Wein-Verkauf.",
    imageHue: 3,
    openingHours: "Mi-So 16-23 (Saison)",
  },
  {
    slug: "weingut-rummel",
    name: "Weingut Rummel",
    categories: ["wein", "kulinarik"],
    district: "olewig",
    cuisine: "Weingut / Strausswirtschaft",
    priceLevel: "€",
    shortDesc:
      "Klassische Olewiger Strausswirtschaft. Eigener Wein, einfache Karte, lokale Atmosphäre.",
    longDesc:
      "Das Weingut Rummel ist Olewig in Reinform: Strausswirtschaft im Innenhof, eigene Riesling- und Elbling-Weine, Karte mit Vesper, Winzersuppe, Bratkartoffeln. Lokal, ehrlich, fairer Preis.",
    imageHue: 3,
    openingHours: "Strausswirtschafts-Saison Apr-Okt, Do-So 16-23",
  },
  {
    slug: "weinstube-palais-kesselstatt",
    name: "Weinstube Palais Kesselstatt (Olewig)",
    categories: ["wein"],
    district: "olewig",
    cuisine: "Weinstube",
    priceLevel: "€€",
    shortDesc:
      "Weinstube des Weingut Kesselstatt mit Verkostungen und kleiner Karte.",
    longDesc:
      "Das Weingut Reichsgraf Kesselstatt bietet in Olewig Verkostungen und Weinstuben-Service. Riesling von Spaetlese bis Trocken, Vesper, Käse-Auswahl, Wein-Verkauf. Stiller Geheimtipp.",
    imageHue: 3,
    openingHours: "Saison Mi-So 14-22",
  },
  {
    slug: "trierer-weinhaus",
    name: "Trierer Weinhaus",
    categories: ["wein"],
    district: "olewig",
    cuisine: "Weinhaus",
    priceLevel: "€€",
    shortDesc:
      "Lokal-Klassiker in Olewig. Gut sortierte Mosel-Karte, einfache regionale Speisen.",
    longDesc:
      "Das Trierer Weinhaus in Olewig ist eine der älteren Olewiger Adressen. Karte mit Vesper, Schnitzel, Forelle, dazu eine sehr gut sortierte Mosel-Weinkarte mit Winzern aus der Region. Klassisch, ehrlich.",
    imageHue: 3,
  },
  // === ITALIENISCH ===
  {
    slug: "ristorante-losteria",
    name: "Ristorante L'Osteria",
    categories: ["kulinarik", "familie"],
    district: "innenstadt",
    cuisine: "Italienisch",
    priceLevel: "€€",
    shortDesc:
      "Italienische Kette mit Riesen-Pizzen am Hauptmarkt. Verlaesslich, familienfreundlich.",
    longDesc:
      "L'Osteria am Trierer Hauptmarkt bedient verlässlich grosse Pizzen, Pasta-Klassiker und eine kleine Wein-Karte. Familienfreundlich, schnell, Reservierung am Wochenende sinnvoll.",
    imageHue: 4,
    openingHours: "Taegl. 11:30-23",
    reservation: true,
  },
  {
    slug: "ristorante-la-bottega",
    name: "Ristorante La Bottega",
    categories: ["kulinarik"],
    district: "innenstadt",
    cuisine: "Italienisch",
    priceLevel: "€€€",
    shortDesc:
      "Italiener mit Anspruch in der Glockenstrasse. Saisonale Karte, gute Weine.",
    longDesc:
      "La Bottega ist Triers ambitionierter Italiener. Hausgemachte Pasta, frische Antipasti, saisonale Spezialitäten und eine sehr respektable italienische Wein-Karte. Kleines Restaurant, Reservierung sinnvoll.",
    imageHue: 4,
    openingHours: "Mo-Sa 12-14, 18-23",
    reservation: true,
  },
  {
    slug: "pizzeria-donna-margherita",
    name: "Pizzeria Donna Margherita",
    categories: ["kulinarik", "familie"],
    district: "innenstadt",
    cuisine: "Italienisch",
    priceLevel: "€€",
    shortDesc:
      "Kleine Pizzeria in der Sichelstrasse. Holzofen, neapolitanische Pizzen, fair.",
    longDesc:
      "Die Donna Margherita backt neapolitanische Pizzen im Holzofen. Klein, oft voll, sehr fair im Preis. Klassiker statt Experiment.",
    imageHue: 4,
    openingHours: "Di-So 17-22",
  },
  {
    slug: "vapiano-trier",
    name: "Vapiano Trier",
    categories: ["kulinarik", "familie"],
    district: "innenstadt",
    cuisine: "Italienisch",
    priceLevel: "€€",
    shortDesc:
      "Italienische Kette mit Live-Cooking-Stationen am Viehmarkt.",
    longDesc:
      "Vapiano am Viehmarkt bietet das bekannte Konzept mit Live-Cooking-Stationen für Pasta, Pizza und Salat. Modernes Interieur, gut für schnelle Mittagspausen und Gruppen.",
    imageHue: 4,
    openingHours: "Taegl. 11-23",
  },
  // === ASIATISCH ===
  {
    slug: "akito-sushi",
    name: "Akito Sushi",
    categories: ["kulinarik"],
    district: "innenstadt",
    cuisine: "Japanisch / Sushi",
    priceLevel: "€€",
    shortDesc:
      "Sushi-Adresse in der Bruchhausenstrasse. Frische Ware, faire Preise, Lieferung möglich.",
    longDesc:
      "Akito Sushi ist Triers etablierte Sushi-Adresse. Klassische Maki, Nigiri und Bowls, Mittagsmenue gut kalkuliert, abends gut sortierte japanische Bier- und Sake-Auswahl.",
    imageHue: 4,
    openingHours: "Mo-Sa 12-14, 17:30-22",
  },
  {
    slug: "bambus-vietnamesisch",
    name: "Bambus",
    categories: ["kulinarik"],
    district: "innenstadt",
    cuisine: "Vietnamesisch",
    priceLevel: "€€",
    shortDesc:
      "Kleines vietnamesisches Restaurant. Pho, Bun Bo Nam Bo, Sommerrollen.",
    longDesc:
      "Bambus serviert vietnamesische Klassiker - Pho, Bun, Sommerrollen, gegrillte Spiesse - in entspannter Atmosphäre. Faire Preise, hausgemachte Saucen, sympathisch familiengefuehrt.",
    imageHue: 4,
    openingHours: "Di-So 11:30-22",
  },
  {
    slug: "saigon-thai",
    name: "Saigon",
    categories: ["kulinarik"],
    district: "innenstadt",
    cuisine: "Thai",
    priceLevel: "€€",
    shortDesc:
      "Thaikueche in der Brueckenstrasse. Currys, Glasnudeln, scharf nach Wunsch.",
    longDesc:
      "Saigon kocht thailaendisch klassisch: Rote und grüne Currys, Pad Thai, Glasnudelsalate. Schaerfegrad nach Wunsch, schöne Mittagskarte, gut gepflegtes Ambiente.",
    imageHue: 4,
    openingHours: "Mo-Sa 11:30-22",
  },
  // === INTERNATIONAL / MODERN ===
  {
    slug: "bistro-quo-vadis",
    name: "Bistro Quo Vadis",
    categories: ["kulinarik"],
    district: "innenstadt",
    cuisine: "Bistro",
    priceLevel: "€€",
    shortDesc:
      "Bistro mit wechselnder Tageskarte und solider Weinkarte am Stockplatz.",
    longDesc:
      "Quo Vadis ist eine ehrliche Bistro-Adresse für den Mittagstisch und entspannte Abende. Tageskarte mit drei bis vier Hauptgerichten, immer fair gepreist, solide Weinkarte.",
    imageHue: 4,
    openingHours: "Mo-Sa 11:30-22",
  },
  {
    slug: "lieblingsstube",
    name: "Lieblingsstube",
    categories: ["kulinarik", "familie"],
    district: "innenstadt",
    cuisine: "Café & Bistro",
    priceLevel: "€€",
    shortDesc:
      "Café-Bistro mit Frühstück den ganzen Tag. Hausgemachte Kuchen, kleine warme Karte.",
    longDesc:
      "Die Lieblingsstube ist Treffpunkt für Trierer, die ein gutes Frühstück über den Mittag hinaus mögen. Hausgemachte Kuchen, Sandwich-Karte, kleine warme Tageskarte, schöne Atmosphäre.",
    imageHue: 4,
    openingHours: "Taegl. 9-19",
  },
  {
    slug: "burgerlich",
    name: "Burgerlich",
    categories: ["kulinarik", "familie"],
    district: "innenstadt",
    cuisine: "Burger",
    priceLevel: "€€",
    shortDesc:
      "Burger-Adresse mit Patty in mehreren Varianten, Pommes-Auswahl, Craft-Bier.",
    longDesc:
      "Burgerlich serviert Burger jenseits der Kette: Beef-Patty, Pulled-Pork, vegetarische Patty mit Bohnen-Quinoa. Pommes in mehreren Varianten, Craft-Bier aus regionalen Brauereien.",
    imageHue: 4,
    openingHours: "Taegl. 12-22",
  },
  {
    slug: "tabula-rasa",
    name: "Tabula Rasa",
    categories: ["kulinarik"],
    district: "innenstadt",
    cuisine: "Modern",
    priceLevel: "€€€",
    shortDesc:
      "Junges modernes Restaurant mit wechselnden Menüs und mutiger Aromatik.",
    longDesc:
      "Tabula Rasa ist eines der jueneren Trierer Restaurants mit klarem modernem Profil: wechselndes 4- bis 6-Gang-Menue, mutige Aromen, schöne Naturwein-Karte. Reservierung empfohlen.",
    imageHue: 4,
    openingHours: "Mi-Sa 18:30-22:30",
    reservation: true,
  },
  {
    slug: "weinstube-fwg",
    name: "Weinstube Friedrich-Wilhelm-Gymnasium",
    categories: ["wein", "kulinarik"],
    district: "olewig",
    cuisine: "Weinstube",
    priceLevel: "€€",
    shortDesc:
      "Stiftungs-Weinstube des FWG. Weine eigener Lagen, klassische Trierer Stube.",
    longDesc:
      "Die FWG-Weinstube wird von der Stiftung des Friedrich-Wilhelm-Gymnasiums betrieben, die eigene Weinberge bewirtschaftet. Trockene Rieslinge, eine kleine Speisekarte, viel Olewiger Stammkundschaft.",
    imageHue: 3,
  },
];

/**
 * Zurueckgezogener Eintrag (Pruefung 2026-08-03).
 *
 * Eine "Weinstube Friedrich-Wilhelm-Gymnasium" gibt es nicht. In Trier
 * existieren das Weingut Friedrich-Wilhelm-Gymnasium (Stiftungsweingut seit
 * 1561) und, im alten Kelterhaus, die Weinwirtschaft Friedrich-Wilhelm - der
 * Eintrag mischt beides zu einem dritten, so nicht vorhandenen Betrieb und
 * setzt ihn nach Olewig. Gegengeprueft gegen OpenStreetMap (alle benannten
 * Gastro-POIs im Stadtgebiet) und die Seiten der beiden echten Betriebe.
 *
 * Nicht geloescht, sondern nicht mehr veroeffentlicht: raus aus allen Listen,
 * Bezirks- und Kategorieseiten, der Suche, dem Branchenverzeichnis und der
 * Sitemap. Die Detailseite bleibt unter ihrer URL erreichbar (kein 404 fuer
 * bestehende Links), traegt aber noindex und einen Hinweis statt Name, Text
 * und schema.org.
 */
export const unverifiedRestaurantSlugs = new Set<string>([
  "weinstube-fwg",
]);

export const isUnverifiedRestaurant = (slug: string) =>
  unverifiedRestaurantSlugs.has(slug);

/** Alles, was oeffentlich gelistet werden darf. Listen nutzen ausschliesslich das. */
export const publishedRestaurants = restaurants.filter(
  (r) => !isUnverifiedRestaurant(r.slug),
);

/** Ungefiltert - die Detailseite muss ihre URL weiter aufloesen koennen. */
export const getRestaurant = (slug: string) =>
  restaurants.find((r) => r.slug === slug);

export const restaurantsByDistrict = (districtSlug: string) =>
  publishedRestaurants.filter((r) => r.district === districtSlug);

export const restaurantsByCuisine = (cuisine: string) =>
  publishedRestaurants.filter((r) => r.cuisine.toLowerCase().includes(cuisine.toLowerCase()));
