/*
 * KEINE Gaeste-Bewertungen in dieser Datei.
 *
 * Bis 2026-08-03 trug jeder Eintrag ein handgepflegtes `rating`, `reviews`
 * und teils `guestFavorite: true`. Diese Zahlen hatten keine Quelle. Auf
 * bad-duerkheim-interaktiv.de wurden zwei davon gegen Booking.com geprueft:
 *   Mercure an den Salinen  -> Datei 8.6 / 1120,  real 7.9 / 1035
 *   Kurpark-Hotel           -> Datei 8.7 /  980,  real 7.8 / 1092
 * Beide zugunsten des Hauses geschoent, und sie gingen zusaetzlich als
 * schema.org/AggregateRating an Google (§ 5a UWG, Anhang Nr. 23b UWG).
 *
 * Der Live-Score der Stay22-v1-API taugt NICHT als Ersatz: er ist
 * ganzzahlig und schneidet ab statt zu runden (real 7.9 -> API 7).
 * Echte Bewertungen zeigt der Stay22-Block auf denselben Seiten.
 *
 * Wer hier wieder Bewertungen einbauen will: nur mit belegter Quelle UND
 * Stand-Datum.
 */
export type Hotel = {
  slug: string;
  name: string;
  district: string;
  stars: 2 | 3 | 4 | 5;
  priceFrom: number;
  shortDesc: string;
  longDesc: string;
  imageHue: number;
  imageKey?: string;
  bookingUrl: string;
  amenities: string[];
};

export const hotels: Hotel[] = [
  // === INNENSTADT ===
  {
    slug: "park-plaza-trier",
    name: "Park Plaza Trier",
    district: "innenstadt",
    stars: 4,
    priceFrom: 119,
    shortDesc:
      "Komfortables 4-Sterne-Hotel am Kornmarkt, drei Minuten zur Porta Nigra und zum Dom.",
    longDesc:
      "Das Park Plaza Trier liegt direkt am Kornmarkt mitten in der Fussgaengerzone. 150 Zimmer, Hallenbad und Sauna im Spa-Bereich, Restaurant Levanto. Klassische Business-Komfort-Mischung mit kurzem Weg zu allen UNESCO-Stätten.",
    imageHue: 4,
    bookingUrl: "https://www.booking.com/hotel/de/park-plaza-trier.de.html",
    amenities: ["Spa", "Hallenbad", "Restaurant", "Innenstadt"],
  },
  {
    slug: "mercure-trier-porta-nigra",
    name: "Mercure Hotel Trier Porta Nigra",
    district: "innenstadt",
    stars: 4,
    priceFrom: 109,
    shortDesc:
      "4-Sterne-Hotel direkt an der Porta Nigra. Lage genauso gut wie der Name verspricht.",
    longDesc:
      "Das Mercure Hotel Porta Nigra liegt direkt gegenüber dem schwarzen Tor. 105 Zimmer, einige mit Blick auf die antike Fassade, Roof-Top-Restaurant, Tiefgarage. Bestmoegliche Adresse für Sightseeing zu Fuss.",
    imageHue: 1,
    bookingUrl: "https://www.booking.com/hotel/de/mercure-trier-porta-nigra.de.html",
    amenities: ["Porta-Blick", "Restaurant", "Tiefgarage", "Bar"],
  },
  {
    slug: "hotel-villa-huegel",
    name: "Hotel Villa Hügel",
    district: "trier-sued",
    stars: 4,
    priceFrom: 165,
    shortDesc:
      "Boutique-Hotel in einer Jugendstilvilla oberhalb der Stadt. Spa, Sterne-Niveau, Aussicht.",
    longDesc:
      "Die Villa Hügel residiert in einer Jugendstil-Villa oberhalb der Trierer Südstadt. 32 individuell gestaltete Zimmer, Spa mit Pool, Restaurant unter Sternen-Beobachtung. Aussicht über die Stadt-Dächer inklusive.",
    imageHue: 4,
    bookingUrl: "https://www.booking.com/hotel/de/villa-hugel.de.html",
    amenities: ["Spa", "Pool", "Restaurant", "Aussicht"],
  },
  {
    slug: "best-western-plus-trier-city",
    name: "Best Western Plus Hotel Trier City",
    district: "innenstadt",
    stars: 4,
    priceFrom: 99,
    shortDesc:
      "Modernes 4-Sterne-Hotel am Rand der Innenstadt. Frische Zimmer, Frühstücksbuffet, Fitness.",
    longDesc:
      "Das Best Western Plus Trier City bietet 99 Zimmer in modernem Standard, ein gut beleumdetes Frühstücksbuffet, Fitnessraum und Tiefgarage. Lage etwas ausserhalb der Fussgaengerzone, aber gut angebunden.",
    imageHue: 4,
    bookingUrl: "https://www.booking.com/hotel/de/best-western-plus-trier-city.de.html",
    amenities: ["Fitness", "Frühstück", "Tiefgarage", "WLAN"],
  },
  {
    slug: "domhotel-trier",
    name: "Domhotel Trier",
    district: "innenstadt",
    stars: 4,
    priceFrom: 115,
    shortDesc:
      "Familiengefuehrtes 4-Sterne-Hotel direkt am Hauptmarkt. Klassischer Trierer Charme.",
    longDesc:
      "Das Domhotel ist eine Trierer Institution: familiengefuehrt, direkt am Hauptmarkt, mit Blick auf Steipe und Marktkreuz. 60 Zimmer in solidem 4-Sterne-Standard, Restaurant mit regionaler Küche.",
    imageHue: 4,
    bookingUrl: "https://www.booking.com/hotel/de/domhotel-trier.de.html",
    amenities: ["Hauptmarkt-Lage", "Restaurant", "Familiengefuehrt"],
  },
  {
    slug: "hotel-roemischer-kaiser",
    name: "Hotel Roemischer Kaiser",
    district: "innenstadt",
    stars: 4,
    priceFrom: 110,
    shortDesc:
      "Traditionshaus direkt an der Porta Nigra. Gemütlich, regional, ohne Schickimicki.",
    longDesc:
      "Das Hotel Roemischer Kaiser liegt direkt an der Porta Nigra und gehört zu Triers Traditionshaeusern. 43 Zimmer, hauseigenes Restaurant mit moselländischer Küche, gemütliche Bar. Perfekt für Sightseeing-Reisende.",
    imageHue: 1,
    bookingUrl: "https://www.booking.com/hotel/de/romischer-kaiser-trier.de.html",
    amenities: ["Porta-Lage", "Restaurant", "Bar"],
  },
  {
    slug: "hotel-zur-glocke",
    name: "Hotel zur Glocke",
    district: "innenstadt",
    stars: 3,
    priceFrom: 79,
    shortDesc:
      "Kleines Stadthotel in der Glockenstrasse. Persoenlich geführt, fairer Preis, Innenstadt-Lage.",
    longDesc:
      "Hotel zur Glocke ist Triers kleines Geheimnis: 18 Zimmer in einer ruhigen Seitenstrasse zwischen Hauptmarkt und Dom. Persönlicher Service, hausgemachtes Frühstück, faire Preise.",
    imageHue: 4,
    bookingUrl: "https://www.booking.com/hotel/de/zur-glocke-trier.de.html",
    amenities: ["Familiengefuehrt", "Frühstück", "Zentral"],
  },
  {
    slug: "aurelius-am-dom",
    name: "Aurelius am Dom",
    district: "innenstadt",
    stars: 3,
    priceFrom: 89,
    shortDesc:
      "Modernes Boutique-Hotel direkt hinter dem Dom. Klare Linien, fairer Preis, Top-Lage.",
    longDesc:
      "Das Aurelius am Dom kombiniert puristisches Design mit Top-Lage. 24 Zimmer in modernem Standard, direkt hinter dem Dom, Fruehstuecksraum mit Blick auf historische Mauer. Gut für Design-Reisende mit kleinem Budget.",
    imageHue: 4,
    bookingUrl: "https://www.booking.com/hotel/de/aurelius-am-dom.de.html",
    amenities: ["Boutique", "Dom-Lage", "Frühstück"],
  },
  {
    slug: "ibis-trier",
    name: "Ibis Trier",
    district: "trier-nord",
    stars: 3,
    priceFrom: 69,
    shortDesc:
      "Markenstandard mit fairen Preisen am Hauptbahnhof. Ankommen, einchecken, in die Stadt.",
    longDesc:
      "Das Ibis Trier liegt direkt am Hauptbahnhof - ideal für Bahnreisende. 100 Zimmer im typischen Ibis-Standard, 24/7 Snackbar, Tiefgarage. Zehn Gehminuten in die Innenstadt.",
    imageHue: 4,
    bookingUrl: "https://www.booking.com/hotel/de/ibis-trier.de.html",
    amenities: ["Bahnhof", "Tiefgarage", "Snackbar"],
  },
  {
    slug: "hostel-hille",
    name: "Hostel Hille",
    district: "innenstadt",
    stars: 2,
    priceFrom: 32,
    shortDesc:
      "Budget-Adresse mit Mehrbettzimmern und Privatzimmern, fünf Gehminuten zur Porta.",
    longDesc:
      "Das Hostel Hille ist Triers beliebte Backpacker-Adresse. Mehrbettzimmer und Privatzimmer, Gemeinschaftskueche, Wohnzimmer mit Klavier. Familiengefuehrt, fünf Gehminuten zur Porta Nigra.",
    imageHue: 4,
    bookingUrl: "https://www.booking.com/hotel/de/hostel-hille.de.html",
    amenities: ["Backpacker", "Küche", "Privatzimmer"],
  },
  // === MOSEL-UFER / AUSSEN ===
  {
    slug: "moselpark-trier",
    name: "Moselpark Trier",
    district: "trier-nord",
    stars: 4,
    priceFrom: 99,
    shortDesc:
      "Grosses 4-Sterne-Hotel am Mosel-Ufer. Pool, Spa, Konferenzräume, Familienzimmer.",
    longDesc:
      "Das Moselpark liegt am nördlichen Mosel-Ufer Triers und ist mit 144 Zimmern das Tagungs-Hotel der Stadt. Pool, Sauna, Restaurant mit Mosel-Terrasse, Familienzimmer und Tiefgarage.",
    imageHue: 2,
    bookingUrl: "https://www.booking.com/hotel/de/moselpark-trier.de.html",
    amenities: ["Pool", "Spa", "Mosel-Lage", "Konferenz"],
  },
  {
    slug: "hotel-deutscher-hof",
    name: "Hotel Deutscher Hof",
    district: "innenstadt",
    stars: 4,
    priceFrom: 95,
    shortDesc:
      "Traditionsadresse am Suedrand der Innenstadt. Solider 4-Sterne-Komfort, Restaurant, Bar.",
    longDesc:
      "Der Deutsche Hof ist seit Jahrzehnten eine feste Groesse in Trier. 105 Zimmer, Restaurant mit moselländischer Küche, Wellness-Bereich, Tiefgarage. Lage am Suedrand der Innenstadt, Fussweg zum Hauptmarkt 10 Minuten.",
    imageHue: 4,
    bookingUrl: "https://www.booking.com/hotel/de/deutscher-hof-trier.de.html",
    amenities: ["Restaurant", "Wellness", "Tiefgarage"],
  },
  {
    slug: "hotel-petrisberg",
    name: "Hotel Petrisberg",
    district: "kuerenz",
    stars: 4,
    priceFrom: 99,
    shortDesc:
      "Familiengefuehrtes 4-Sterne-Hotel mit Triers bester Aussicht. Hoch oben, ruhig, weinaffin.",
    longDesc:
      "Das Hotel Petrisberg liegt am Petrisberg oberhalb der Stadt - Aussicht über Moseltal und Innenstadt inklusive. 35 Zimmer, hauseigene Weinbar mit Familienweinen, ruhige Wohnlage. Familiengefuehrt seit drei Generationen.",
    imageHue: 2,
    bookingUrl: "https://www.booking.com/hotel/de/petrisberg-trier.de.html",
    amenities: ["Aussicht", "Familiengefuehrt", "Weinbar"],
  },
  {
    slug: "hotel-eurener-hof",
    name: "Hotel Eurener Hof",
    district: "euren",
    stars: 4,
    priceFrom: 105,
    shortDesc:
      "Ehrwuerdiger Gasthof in Euren. Wellness, Restaurant, Familienorientiert.",
    longDesc:
      "Der Eurener Hof in Triers suedwestlichem Stadtteil ist eine Traditionsadresse: 80 Zimmer, grosser Wellness-Bereich, Pool, Restaurant. Etwas ausserhalb, dafür mit Mosel-Nähe und Ruhe.",
    imageHue: 2,
    bookingUrl: "https://www.booking.com/hotel/de/eurener-hof.de.html",
    amenities: ["Wellness", "Pool", "Restaurant", "Familie"],
  },
  {
    slug: "hotel-casa-chiara",
    name: "Hotel Casa Chiara",
    district: "trier-nord",
    stars: 3,
    priceFrom: 79,
    shortDesc:
      "Kleines Hotel garni am Moselufer. Persoenlich, fair, frisches Frühstück.",
    longDesc:
      "Die Casa Chiara ist ein 20-Zimmer-Hotel garni am Trierer Mosel-Ufer. Familiengefuehrt, frisches Frühstück, fairer Preis. Sehr ruhig und doch nur zehn Gehminuten zur Porta Nigra.",
    imageHue: 2,
    bookingUrl: "https://www.booking.com/hotel/de/casa-chiara.de.html",
    amenities: ["Hotel garni", "Mosel-Lage", "Familiengefuehrt"],
  },
  // === OLEWIG (WEIN) ===
  {
    slug: "weinhaus-becker",
    name: "Weinhaus Becker",
    district: "olewig",
    stars: 4,
    priceFrom: 145,
    shortDesc:
      "Boutique-Weinhaus mit Sterne-Restaurant Becker's in Olewig. Kulinarik und Wein auf höchstem Niveau.",
    longDesc:
      "Das Weinhaus Becker in Olewig ist Wein-Reisenden ein Begriff: geführt von der Familie Becker, mit dem Sterne-Restaurant Becker's, weinaffiner Suite-Ausstattung und Blick in die Weinberge. Top-Adresse für Geniesser.",
    imageHue: 3,
    bookingUrl: "https://www.booking.com/hotel/de/weinhaus-becker.de.html",
    amenities: ["Sterneküche", "Wein", "Boutique", "Olewig"],
  },
  {
    slug: "hotel-weinhaus-haag",
    name: "Hotel-Weinhaus Haag",
    district: "olewig",
    stars: 3,
    priceFrom: 89,
    shortDesc:
      "Familiengefuehrtes Weinhaus mitten in Olewig. Eigene Weine, traditionelle Stube, kurze Wege.",
    longDesc:
      "Das Hotel-Weinhaus Haag ist klassisch Olewig: Familie, eigene Weinberge, Weinstube mit Stammgaesten, einfache aber gut gepflegte Zimmer. Ideal für Wein-Wanderer, die nach dem Riesling kurze Wege zum Bett wollen.",
    imageHue: 3,
    bookingUrl: "https://www.booking.com/hotel/de/weinhaus-haag-trier.de.html",
    amenities: ["Familiengefuehrt", "Eigene Weine", "Weinstube"],
  },
];

/**
 * Zurueckgezogene Eintraege (Pruefung 2026-08-03, zweite Runde 2026-08-05).
 *
 * Fuer diese Eintraege gab es drei unabhaengige Fehlanzeigen: kein Datensatz
 * in OpenStreetMap, keine erreichbare Website, kein Treffer bei gezielter
 * Suche auf unabhaengigen Quellen (Betreiber-Seiten, Booking/HRS-Property-
 * Seiten, Gastro-Verzeichnisse der Stadt). Vollstaendig ausgestaltete
 * Eintraege ohne Adresse - der Typ hat gar kein Adressfeld, deshalb faellt
 * beim Lesen nichts auf.
 *
 * "Aurelius am Dom" und "Hostel Hille" sind in Trier nirgends belegt.
 * Das Hotel Moselpark dagegen existiert (143 Zimmer) und bleibt drin.
 *
 * Nicht geloescht, sondern nicht mehr veroeffentlicht: raus aus allen Listen,
 * Bezirks- und Kategorieseiten, der Suche und der Sitemap. Die Detailseite
 * bleibt unter ihrer URL erreichbar (kein 404 fuer bestehende Links), traegt
 * aber noindex und einen Hinweis statt Name, Text und schema.org. Zum
 * Wiederherstellen genuegt es, den Slug hier aus der Menge zu nehmen.
 */
export const unverifiedHotelSlugs = new Set<string>([
  "aurelius-am-dom", // Aurelius am Dom
  "hostel-hille", // Hostel Hille
]);

export const isUnverifiedHotel = (slug: string) => unverifiedHotelSlugs.has(slug);

/** Alles, was oeffentlich gelistet werden darf. Listen nutzen ausschliesslich das. */
export const publishedHotels = hotels.filter((h) => !isUnverifiedHotel(h.slug));

/** Ungefiltert - die Detailseite muss ihre URL weiter aufloesen koennen. */
export const getHotel = (slug: string) =>
  hotels.find((h) => h.slug === slug);

export const hotelsByDistrict = (districtSlug: string) =>
  publishedHotels.filter((h) => h.district === districtSlug);
