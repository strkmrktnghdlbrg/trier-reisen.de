export type Sight = {
  slug: string;
  name: string;
  district: string;
  type: "Wahrzeichen" | "Museum" | "Kirche" | "Park" | "Markt" | "Modern" | "Aussicht" | "Antike" | "Pilgerort";
  priceFrom: number | null; // null = kostenlos
  shortDesc: string;
  longDesc: string;
  imageHue: number;
  imageKey?: string;
  categories: string[];
  coordinates: [number, number];
  openingHours?: string;
  websiteUrl?: string;
  /** Optional: GetYourGuide-Activity-ID(s) fuer Direkt-Buchungs-Widget. */
  gygActivityId?: string;
  unesco?: boolean;
};

export const sights: Sight[] = [
  // === INNENSTADT — UNESCO-Kern ===
  {
    slug: "porta-nigra",
    imageKey: "sight:porta-nigra",
    name: "Porta Nigra",
    categories: ["unesco-welterbe", "roemisches-erbe"],
    district: "innenstadt",
    type: "Antike",
    priceFrom: 4,
    unesco: true,
    shortDesc:
      "Das schwarze Tor — Triers Wahrzeichen. Das besterhaltene roemische Stadttor noerdlich der Alpen.",
    longDesc:
      "Die Porta Nigra entstand um 170 n. Chr. als Nordtor der roemischen Stadt Augusta Treverorum. Aus rund 7200 Sandsteinquadern errichtet, im Mittelalter zur Doppelkirche umgebaut und unter Napoleon wieder freigelegt. Begehbar in zwei Stockwerken, mit Aussicht auf die Simeonstrasse.",
    imageHue: 1,
    coordinates: [49.7597, 6.6440],
    openingHours: "Apr-Sep 9-18, Mar/Okt 9-17, Nov-Feb 9-16",
    websiteUrl: "https://www.zentrum-der-antike.de/porta-nigra",
  },
  {
    slug: "trierer-dom",
    imageKey: "sight:trierer-dom",
    name: "Trierer Dom St. Peter",
    categories: ["unesco-welterbe", "religioese-staetten"],
    district: "innenstadt",
    type: "Kirche",
    priceFrom: null,
    unesco: true,
    shortDesc:
      "Aelteste Bischofskirche Deutschlands. Heiliger Rock, Domschatz, romanische Wucht direkt am Hauptmarkt.",
    longDesc:
      "Der Trierer Dom geht in seinen Kernmauern auf den konstantinischen Kirchenbau des 4. Jahrhunderts zurueck. Romanische Doppelturmfassade, gotischer Heiltumsumgang und barocke Kapelle des Heiligen Rocks. Die Reliquie wird nur bei seltenen Wallfahrten ausgestellt — die letzte zog 2012 ueber eine halbe Million Pilger an.",
    imageHue: 1,
    coordinates: [49.7556, 6.6435],
    openingHours: "Apr-Okt 6:30-18, Nov-Mar 6:30-17:30",
    websiteUrl: "https://www.dominformation.de",
  },
  {
    slug: "liebfrauenkirche",
    imageKey: "sight:liebfrauenkirche",
    name: "Liebfrauenkirche",
    categories: ["unesco-welterbe", "religioese-staetten"],
    district: "innenstadt",
    type: "Kirche",
    priceFrom: null,
    unesco: true,
    shortDesc:
      "Eine der aeltesten gotischen Kirchen Deutschlands, direkt neben dem Dom.",
    longDesc:
      "Die Liebfrauenkirche entstand 1227-1260 nach franzoesischem Vorbild und gilt als eine der fruehesten gotischen Kirchen auf deutschem Boden. Zentralbau auf einem zwoelfblaettrigen Grundriss, gemeinsam mit dem Dom UNESCO-Welterbe.",
    imageHue: 1,
    coordinates: [49.7551, 6.6433],
  },
  {
    slug: "konstantinbasilika",
    imageKey: "sight:konstantinbasilika",
    name: "Konstantinbasilika",
    categories: ["roemisches-erbe", "unesco-welterbe", "religioese-staetten"],
    district: "innenstadt",
    type: "Antike",
    priceFrom: null,
    unesco: true,
    shortDesc:
      "Antiker Thronsaal Kaiser Konstantins, heute evangelische Hauptkirche. 27 m hoher Saal ohne Stuetzen.",
    longDesc:
      "Die Aula Palatina war Thronsaal des spaetroemischen Kaisers Konstantin. Mit 67 m Laenge, 27 m Breite und 33 m Hoehe einer der groessten erhaltenen Saalbauten der Antike. Heute evangelische Erloeserkirche, jeden Sonntag Gottesdienst im antiken Raum.",
    imageHue: 1,
    coordinates: [49.7531, 6.6448],
    openingHours: "Apr-Okt Mo-Sa 10-18, So 13-18; Nov-Mar verkuerzt",
  },
  {
    slug: "kaiserthermen",
    imageKey: "sight:kaiserthermen",
    name: "Kaiserthermen",
    categories: ["unesco-welterbe", "roemisches-erbe"],
    district: "trier-sued",
    type: "Antike",
    priceFrom: 4,
    unesco: true,
    shortDesc:
      "Monumentale roemische Thermenruine. Apsiden, Heizkanaele, unterirdische Bediengaenge begehbar.",
    longDesc:
      "Die Kaiserthermen entstanden im 4. Jahrhundert als Repraesentations-Thermen der Kaiserresidenz. Nie als Badebetrieb vollendet, spaeter Kaserne und Stadtmauer-Festung. Heute UNESCO-Welterbe, die unterirdischen Servicegaenge sind komplett begehbar.",
    imageHue: 1,
    coordinates: [49.7497, 6.6437],
    openingHours: "Apr-Sep 9-18, Mar/Okt 9-17, Nov-Feb 9-16",
  },
  {
    slug: "barbarathermen",
    imageKey: "sight:barbarathermen",
    name: "Barbarathermen",
    categories: ["unesco-welterbe", "roemisches-erbe"],
    district: "trier-sued",
    type: "Antike",
    priceFrom: null,
    unesco: true,
    shortDesc:
      "Aeltere und groessere Schwester der Kaiserthermen. Ruinenfeld unter freiem Himmel.",
    longDesc:
      "Die Barbarathermen wurden im 2. Jahrhundert errichtet und zaehlten zu den groessten Thermen des Roemischen Reichs. Heute sind weite Teile der Substruktion zu sehen, der Rundgang ist frei zugaenglich. Weniger touristisch als die Kaiserthermen — und beeindruckender in der Flaeche.",
    imageHue: 1,
    coordinates: [49.7464, 6.6354],
  },
  {
    slug: "amphitheater",
    imageKey: "sight:amphitheater",
    name: "Amphitheater Trier",
    categories: ["unesco-welterbe", "roemisches-erbe"],
    district: "trier-sued",
    type: "Antike",
    priceFrom: 4,
    unesco: true,
    shortDesc:
      "UNESCO-Amphitheater mit Keller-Hebebuehnen. Im Sommer Buehne der Antikenfestspiele.",
    longDesc:
      "Das Trierer Amphitheater entstand um 100 n. Chr. fuer rund 20.000 Zuschauer. Erhalten sind die Tribuenenboeschungen und die unterirdischen Keller mit Hebebuehnen, durch die Gladiatoren und Tiere in die Arena gelangten. Jeden Sommer Spielort der Antikenfestspiele.",
    imageHue: 1,
    coordinates: [49.7464, 6.6479],
    openingHours: "Apr-Sep 9-18, Mar/Okt 9-17, Nov-Feb 9-16",
  },
  {
    slug: "roemerbruecke",
    imageKey: "sight:roemerbruecke",
    name: "Roemerbruecke",
    categories: ["unesco-welterbe", "roemisches-erbe"],
    district: "innenstadt",
    type: "Antike",
    priceFrom: null,
    unesco: true,
    shortDesc:
      "Aelteste Bruecke Deutschlands noerdlich der Alpen. Roemische Pfeiler von 144 n. Chr.",
    longDesc:
      "Die Roemerbruecke ist die aelteste noch in Funktion befindliche Bruecke Deutschlands. Die fuenf basaltenen Brueckenpfeiler stammen aus dem 2. Jahrhundert n. Chr., der Brueckenbelag wurde mehrfach erneuert. UNESCO-Welterbe, taeglich befahren.",
    imageHue: 1,
    coordinates: [49.7522, 6.6273],
  },
  {
    slug: "igeler-saeule",
    imageKey: "sight:igeler-saeule",
    name: "Igeler Saeule",
    categories: ["unesco-welterbe", "roemisches-erbe"],
    district: "euren",
    type: "Antike",
    priceFrom: null,
    unesco: true,
    shortDesc:
      "Roemische Grabsaeule im Trierer Ortsteil Igel. 23 m hoch, reich verziert.",
    longDesc:
      "Die Igeler Saeule ist ein roemisches Grabmal aus dem 3. Jahrhundert, errichtet von der Familie Secundinii. 23 m hoch, vollstaendig erhalten und mit detailliertem Reliefdekor — ein einzigartiges Zeugnis roemischer Grabarchitektur, UNESCO-Welterbe.",
    imageHue: 1,
    coordinates: [49.7016, 6.5519],
  },
  // === Innenstadt — Markt & Buergerstadt ===
  {
    slug: "hauptmarkt",
    imageKey: "sight:hauptmarkt",
    name: "Hauptmarkt mit Marktkreuz",
    categories: ["roemisches-erbe", "shopping"],
    district: "innenstadt",
    type: "Markt",
    priceFrom: null,
    shortDesc:
      "Triers Marktplatz seit 958. Steipe, Petrusbrunnen, Marktkreuz, Roetelhausen.",
    longDesc:
      "Der Trierer Hauptmarkt ist einer der schoensten Marktplaetze Deutschlands. Das Marktkreuz von 958 markiert den juristischen Mittelpunkt der Stadt, die Steipe diente als Festhaus, der Petrusbrunnen ist Trierer Renaissancearbeit. Heute Buehne fuer Wochenmarkt und Weihnachtsmarkt.",
    imageHue: 4,
    coordinates: [49.7559, 6.6420],
  },
  {
    slug: "kurfuerstliches-palais",
    imageKey: "sight:kurfuerstliches-palais",
    name: "Kurfuerstliches Palais",
    categories: ["museen"],
    district: "innenstadt",
    type: "Wahrzeichen",
    priceFrom: null,
    shortDesc:
      "Rosa Rokoko-Palais zwischen Konstantinbasilika und Palastgarten. Eines der schoensten Rokokoschloesser Deutschlands.",
    longDesc:
      "Das Kurfuerstliche Palais geht auf einen Renaissance-Kurfuerstenbau zurueck, der im 18. Jahrhundert von Johannes Seiz im Rokokostil umgestaltet wurde. Heute Behoerdensitz, der Palastgarten ist oeffentlich begehbar und im Sommer Schauplatz von Open-Air-Konzerten.",
    imageHue: 4,
    coordinates: [49.7536, 6.6452],
  },
  {
    slug: "dreikoenigenhaus",
    imageKey: "sight:dreikoenigenhaus",
    name: "Dreikoenigenhaus",
    categories: ["roemisches-erbe"],
    district: "innenstadt",
    type: "Wahrzeichen",
    priceFrom: null,
    shortDesc:
      "Mittelalterlicher Wohnturm in der Simeonstrasse. Eingang im ersten Stock — typisch Wehrhaus.",
    longDesc:
      "Das Dreikoenigenhaus von 1230 ist eines der besterhaltenen romanischen Patrizierwohntuerme in Deutschland. Eingang im ersten Obergeschoss, urspruenglich nur ueber eine Hochzieh-Treppe erreichbar. Heute Café im Erdgeschoss, Fassade ein Foto-Hotspot.",
    imageHue: 4,
    coordinates: [49.7580, 6.6428],
  },
  // === Museen ===
  {
    slug: "rheinisches-landesmuseum",
    imageKey: "sight:rheinisches-landesmuseum",
    name: "Rheinisches Landesmuseum",
    categories: ["museen", "roemisches-erbe"],
    district: "innenstadt",
    type: "Museum",
    priceFrom: 8,
    shortDesc:
      "Eines der wichtigsten Antikenmuseen Europas. Mosaike, Goldmuenzen, Trierer Stadtmodell.",
    longDesc:
      "Das Rheinisches Landesmuseum am Palastgarten besitzt eine der bedeutendsten Sammlungen roemischer Funde noerdlich der Alpen. Hoehepunkte: das Neumagener Schiff, das beruehmte Neumagener Weinschiff-Grabmal, riesige Mosaikboeden und der Goldmuenzenschatz von 1993.",
    imageHue: 4,
    coordinates: [49.7530, 6.6464],
    openingHours: "Di-So 10-17, Mo geschlossen",
    websiteUrl: "https://www.landesmuseum-trier.de",
  },
  {
    slug: "stadtmuseum-simeonstift",
    imageKey: "sight:stadtmuseum-simeonstift",
    name: "Stadtmuseum Simeonstift",
    categories: ["museen"],
    district: "innenstadt",
    type: "Museum",
    priceFrom: 5,
    shortDesc:
      "Stadtgeschichte direkt an der Porta Nigra. Romanischer Kreuzgang inklusive.",
    longDesc:
      "Das Simeonstift wurde im 11. Jahrhundert von Erzbischof Poppo gegruendet und an die Porta Nigra angebaut, die zu jener Zeit als Doppelkirche diente. Heute beherbergt es das Stadtmuseum mit Sammlungen vom Mittelalter bis ins 20. Jahrhundert. Romanischer Kreuzgang als Innenhof.",
    imageHue: 4,
    coordinates: [49.7593, 6.6432],
    openingHours: "Di-So 10-17",
  },
  {
    slug: "museum-am-dom",
    imageKey: "sight:museum-am-dom",
    name: "Museum am Dom",
    categories: ["museen", "religioese-staetten"],
    district: "innenstadt",
    type: "Museum",
    priceFrom: 3.5,
    shortDesc:
      "Domschatz, fruehchristliche Funde, kuratorisch ruhige Inszenierung neben dem Dom.",
    longDesc:
      "Das Museum am Dom zeigt den Domschatz mit Reliquiaren, liturgischen Geraeten und Manuskripten. Dazu fruehchristliche Funde aus den Grabungen unter dem Dom — Trier ist die aelteste Bischofsstadt noerdlich der Alpen. Ruhige Atmosphaere, ideale Ergaenzung zum Dombesuch.",
    imageHue: 4,
    coordinates: [49.7560, 6.6444],
    openingHours: "Mo-Sa 9-17, So 13-17",
  },
  {
    slug: "karl-marx-haus",
    imageKey: "sight:karl-marx-haus",
    name: "Karl-Marx-Haus",
    categories: ["museen"],
    district: "innenstadt",
    type: "Museum",
    priceFrom: 5,
    shortDesc:
      "Geburtshaus von Karl Marx (1818). Dauerausstellung zu Leben, Werk und Wirkung.",
    longDesc:
      "Karl Marx wurde 1818 in der Brueckenstrasse 10 geboren. Das spaetbarocke Wohnhaus ist heute Museum mit Dauerausstellung der Friedrich-Ebert-Stiftung. 2018 zum 200. Geburtstag komplett ueberarbeitet — moderne Inszenierung statt Reliquien-Schaukasten.",
    imageHue: 4,
    coordinates: [49.7506, 6.6342],
    openingHours: "Apr-Okt taegl. 10-18, Nov-Mar Di-So 11-17",
    websiteUrl: "https://www.fes.de/karl-marx-haus",
  },
  {
    slug: "spielzeugmuseum",
    imageKey: "sight:spielzeugmuseum",
    name: "Spielzeugmuseum Trier",
    categories: ["museen", "familie"],
    district: "innenstadt",
    type: "Museum",
    priceFrom: 5,
    shortDesc:
      "Drei Etagen Spielzeug von 1900 bis heute. Familien-Favorit mitten am Hauptmarkt.",
    longDesc:
      "Das Spielzeugmuseum direkt am Hauptmarkt ist Triers Familien-Hit. Drei Etagen mit Puppenstuben, Eisenbahnen, Plueschtieren, Kaufladen und Computerspielen. Vom Jugendstil bis Game Boy — auch fuer Eltern ein nostalgisches Spaziergang.",
    imageHue: 2,
    coordinates: [49.7559, 6.6411],
    openingHours: "Mo-Sa 11-17, So 11-17",
  },
  // === Kirchen & Pilgerorte ===
  {
    slug: "st-matthias",
    imageKey: "sight:st-matthias",
    name: "St. Matthias-Basilika",
    categories: ["religioese-staetten"],
    district: "trier-sued",
    type: "Pilgerort",
    priceFrom: null,
    shortDesc:
      "Einziges Apostelgrab noerdlich der Alpen. Aktive Benediktinerabtei mit romanischer Basilika.",
    longDesc:
      "St. Matthias birgt das einzige Apostelgrab noerdlich der Alpen — der Sage nach wurden die Reliquien des Apostels Matthias durch Kaiserin Helena hierher gebracht. Romanische Basilika, aktive Benediktiner-Abtei, beliebter Etappenort des Jakobswegs.",
    imageHue: 1,
    coordinates: [49.7385, 6.6365],
  },
  {
    slug: "st-paulin",
    imageKey: "sight:st-paulin",
    name: "St. Paulin",
    categories: ["religioese-staetten"],
    district: "trier-nord",
    type: "Kirche",
    priceFrom: null,
    shortDesc:
      "Balthasar-Neumann-Rokokokirche von 1734-54. Eine der schoensten Barockkirchen am Mittelrhein.",
    longDesc:
      "St. Paulin entstand 1734-54 nach Plaenen Balthasar Neumanns. Stuckierte Hochaltarapsis, Deckengemaelde Christoph Thomas Schefflers, Heiligenschrein des Stadtpatrons Paulinus. Etwas abseits, daher ohne Touristenandrang — ein Geheimtipp.",
    imageHue: 1,
    coordinates: [49.7641, 6.6429],
  },
  // === Aussicht & Wandern ===
  {
    slug: "mariensaeule",
    imageKey: "sight:mariensaeule",
    name: "Mariensaeule auf dem Markusberg",
    categories: ["aussicht-wandern"],
    district: "trier-west-pallien",
    type: "Aussicht",
    priceFrom: null,
    shortDesc:
      "40 m hohe Saeule mit Marienfigur. Vom Plateau bester Blick auf die Trierer Silhouette.",
    longDesc:
      "Die Mariensaeule auf dem Markusberg wurde 1859-66 als Dank fuer die Befreiung der Stadt von den Franzosen errichtet. 40 m hoch, in Sichtweite ueber der Mosel. Vom Pumpwerk-Plateau hat man den Postkarten-Blick auf Dom, Liebfrauenkirche und Roemerbruecke.",
    imageHue: 2,
    coordinates: [49.7575, 6.6168],
  },
  {
    slug: "petrisberg",
    imageKey: "sight:petrisberg",
    name: "Petrisberg",
    categories: ["aussicht-wandern", "familie"],
    district: "kuerenz",
    type: "Aussicht",
    priceFrom: null,
    shortDesc:
      "Hoehenzug oestlich der Stadt. Aussichtspunkt, Spielplatz, Wandergebiet auf alten Landesgartenschau-Flaechen.",
    longDesc:
      "Der Petrisberg liegt oestlich der Innenstadt und war 2004 Standort der Landesgartenschau. Heute Aussichtsplattform mit Blick auf Trier, grosser Familienspielplatz, Skulpturenweg und Wanderwege Richtung Olewig. Mit dem Aufzug ab Karl-Marx-Strasse erreichbar.",
    imageHue: 2,
    coordinates: [49.7551, 6.6649],
  },
  {
    slug: "weinkulturpfad-olewig",
    imageKey: "sight:weinkulturpfad-olewig",
    name: "Weinkulturpfad Olewig",
    categories: ["wein", "aussicht-wandern"],
    district: "olewig",
    type: "Park",
    priceFrom: null,
    shortDesc:
      "Lehrpfad durch die Olewiger Weinberge. 5 km, 14 Stationen, Rastplaetze mit Mosel-Blick.",
    longDesc:
      "Der Olewiger Weinkulturpfad ist ein 5 km langer Rundweg durch die Steillagen oberhalb des Weinortes. 14 Stationen erklaeren Rebsorten, Bodenarten und Trier-Weinbaugeschichte. Rastplaetze, Schutzhuetten und ein Aussichtspunkt mit Blick auf Innenstadt und Moseltal.",
    imageHue: 3,
    coordinates: [49.7411, 6.6720],
  },
  {
    slug: "mosel-promenade",
    imageKey: "sight:mosel-promenade",
    name: "Mosel-Promenade",
    categories: ["mosel-aktivitaeten", "aussicht-wandern"],
    district: "innenstadt",
    type: "Park",
    priceFrom: null,
    shortDesc:
      "Uferweg zwischen Zurlauben und Roemerbruecke. Beste Spaziermeile, Schiffsanleger, Restaurants.",
    longDesc:
      "Die Mosel-Promenade verbindet das ehemalige Fischerviertel Zurlauben mit der Roemerbruecke. Spaziermeile, Bauernmarkt, Schiffsanleger der Personenschifffahrt, eine Reihe von Mosel-Restaurants. Bei Sommerabenden Triers gemuetlichste Adresse.",
    imageHue: 2,
    coordinates: [49.7593, 6.6261],
  },
];

export const getSight = (slug: string) =>
  sights.find((s) => s.slug === slug);

export const sightsByDistrict = (districtSlug: string) =>
  sights.filter((s) => s.district === districtSlug);

export const sightsByCategory = (categorySlug: string) =>
  sights.filter((s) => s.categories.includes(categorySlug));
