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
  /** Optional: GetYourGuide-Activity-ID(s) für Direkt-Buchungs-Widget. */
  gygActivityId?: string;
  unesco?: boolean;
  /** Optionale FAQ (Frage/Antwort) für Besucher, rendert Sektion + FAQPage-Schema. */
  faq?: { q: string; a: string }[];
};

export const sights: Sight[] = [
  // === INNENSTADT - UNESCO-Kern ===
  {
    slug: "porta-nigra",
    imageKey: "sight:porta-nigra",
    name: "Porta Nigra",
    categories: ["unesco-welterbe", "roemisches-erbe"],
    district: "innenstadt",
    type: "Antike",
    priceFrom: 6,
    unesco: true,
    shortDesc:
      "Das schwarze Tor - Triers Wahrzeichen. Das besterhaltene römische Stadttor nördlich der Alpen.",
    longDesc:
      "Die Porta Nigra entstand um 170 n. Chr. als Nordtor der römischen Stadt Augusta Treverorum. Aus rund 7200 Sandsteinquadern errichtet, im Mittelalter zur Doppelkirche umgebaut und unter Napoleon wieder freigelegt. Begehbar in zwei Stockwerken, mit Aussicht auf die Simeonstraße.",
    imageHue: 1,
    coordinates: [49.7597, 6.6440],
    openingHours: "Apr-Sep 9-18, Mar/Okt 9-17, Nov-Feb 9-16",
    // Unterseite lief auf 404 - auf die gepruefte Startseite zurueckgestuft (2026-08-03).
    websiteUrl: "https://www.zentrum-der-antike.de/",
    faq: [
      {
        q: "Was kostet der Eintritt zur Porta Nigra?",
        a: "Der Innenbesuch mit Aufstieg über zwei Stockwerke kostet für Erwachsene 6 Euro (ermäßigt 5 Euro, Kinder und Jugendliche von 6 bis 18 Jahren 3 Euro). Von außen ist das Wahrzeichen jederzeit kostenlos zu sehen. Wer mehrere römische Baudenkmäler besichtigen möchte, fährt mit der AntikenCard günstiger: Die Basic-Karte (18 Euro) umfasst zwei Römerbauten plus das Rheinische Landesmuseum, die Premium-Karte (28 Euro) alle vier Römerbauten und das Museum.",
      },
      {
        q: "Wann hat die Porta Nigra geöffnet?",
        a: "Die Porta Nigra ist ganzjährig geöffnet: von April bis September täglich 9 bis 18 Uhr, im März und Oktober bis 17 Uhr, von November bis Februar bis 16 Uhr. Die aktuellen Zeiten stehen auf der offiziellen Seite.",
      },
      {
        q: "Warum heißt das Bauwerk Porta Nigra?",
        a: "Porta Nigra ist Latein für schwarzes Tor und geht auf die dunkle Verwitterung des Sandsteins zurück. Errichtet wurde das Tor um 170 n. Chr. als Nordtor der römischen Stadt Augusta Treverorum aus rund 7200 Steinquadern.",
      },
      {
        q: "Ist die Porta Nigra ein UNESCO-Welterbe?",
        a: "Ja. Die Porta Nigra gehört seit 1986 zum UNESCO-Welterbe der römischen Baudenkmäler von Trier und gilt als das besterhaltene römische Stadttor nördlich der Alpen. Nur wenige Gehminuten entfernt liegen die <a href=\"/sehenswuerdigkeiten/kaiserthermen/\">Kaiserthermen</a> und das <a href=\"/sehenswuerdigkeiten/amphitheater/\">Amphitheater</a>.",
      },
    ],
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
      "Älteste Bischofskirche Deutschlands. Heiliger Rock, Domschatz, romanische Wucht direkt am Hauptmarkt.",
    longDesc:
      "Der Trierer Dom geht in seinen Kernmauern auf den konstantinischen Kirchenbau des 4. Jahrhunderts zurück. Romanische Doppelturmfassade, gotischer Heiltumsumgang und barocke Kapelle des Heiligen Rocks. Die Reliquie wird nur bei seltenen Wallfahrten ausgestellt - die letzte zog 2012 über eine halbe Million Pilger an.",
    imageHue: 1,
    coordinates: [49.7556, 6.6435],
    openingHours: "Apr-Okt 6:30-18, Nov-Mar 6:30-17:30",
    websiteUrl: "https://www.dominformation.de",
    faq: [
      {
        q: "Kostet der Besuch des Trierer Doms Eintritt?",
        a: "Der Trierer Dom St. Peter ist frei zugänglich, der Eintritt ist kostenlos. Für den Domschatz kann ein separates Eintrittsgeld anfallen. Um Rücksicht auf Gottesdienste wird gebeten.",
      },
      {
        q: "Wann hat der Trierer Dom geöffnet?",
        a: "Der Dom ist von April bis Oktober täglich von 6:30 bis 18 Uhr geöffnet, in den Wintermonaten von 6:30 bis 17:30 Uhr. Während der Gottesdienste ist eine Besichtigung nur eingeschränkt möglich.",
      },
      {
        q: "Was ist der Heilige Rock im Trierer Dom?",
        a: "Der Heilige Rock gilt als das Gewand Christi und ist die bedeutendste Reliquie des Doms. Er wird nur bei seltenen Wallfahrten öffentlich gezeigt; die letzte im Jahr 2012 zog über eine halbe Million Pilger nach Trier.",
      },
      {
        q: "Ist der Trierer Dom ein UNESCO-Welterbe?",
        a: "Ja. Der Dom St. Peter zählt seit 1986 zum UNESCO-Welterbe von Trier und ist die älteste Bischofskirche Deutschlands. Direkt daneben steht die frühgotische <a href=\"/sehenswuerdigkeiten/liebfrauenkirche/\">Liebfrauenkirche</a>.",
      },
    ],
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
      "Eine der ältesten gotischen Kirchen Deutschlands, direkt neben dem Dom.",
    longDesc:
      "Die Liebfrauenkirche entstand 1227-1260 nach französischem Vorbild und gilt als eine der frühesten gotischen Kirchen auf deutschem Boden. Zentralbau auf einem zwölfblättrigen Grundriss, gemeinsam mit dem Dom UNESCO-Welterbe.",
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
      "Antiker Thronsaal Kaiser Konstantins, heute evangelische Hauptkirche. 27 m hoher Saal ohne Stützen.",
    longDesc:
      "Die Aula Palatina war Thronsaal des spätrömischen Kaisers Konstantin. Mit 67 m Länge, 27 m Breite und 33 m Höhe einer der größten erhaltenen Saalbauten der Antike. Heute evangelische Erlöserkirche, jeden Sonntag Gottesdienst im antiken Raum.",
    imageHue: 1,
    coordinates: [49.7531, 6.6448],
    openingHours: "Apr-Okt Mo-Sa 10-18, So 13-18; Nov-Mar verkürzt",
  },
  {
    slug: "kaiserthermen",
    imageKey: "sight:kaiserthermen",
    name: "Kaiserthermen",
    categories: ["unesco-welterbe", "roemisches-erbe"],
    district: "trier-sued",
    type: "Antike",
    priceFrom: 6,
    unesco: true,
    shortDesc:
      "Monumentale römische Thermenruine. Apsiden, Heizkanäle, unterirdische Bediengänge begehbar.",
    longDesc:
      "Die Kaiserthermen entstanden im 4. Jahrhundert als Repräsentations-Thermen der Kaiserresidenz. Nie als Badebetrieb vollendet, später Kaserne und Stadtmauer-Festung. Heute UNESCO-Welterbe, die unterirdischen Servicegänge sind komplett begehbar.",
    imageHue: 1,
    coordinates: [49.7497, 6.6437],
    openingHours: "Apr-Sep 9-18, Mar/Okt 9-17, Nov-Feb 9-16",
    faq: [
      {
        q: "Was kosten die Kaiserthermen in Trier?",
        a: "Der Eintritt zu den Kaiserthermen kostet für Erwachsene 6 Euro (ermäßigt 5 Euro, Kinder und Jugendliche 3 Euro). Für mehrere römische Stätten lohnt die AntikenCard: Basic (18 Euro) für zwei Römerbauten plus Rheinisches Landesmuseum, Premium (28 Euro) für alle vier Römerbauten und das Museum.",
      },
      {
        q: "Wann sind die Kaiserthermen geöffnet?",
        a: "Die Kaiserthermen sind von April bis September täglich 9 bis 18 Uhr geöffnet, im März und Oktober bis 17 Uhr und von November bis Februar bis 16 Uhr.",
      },
      {
        q: "Was gibt es in den Kaiserthermen zu sehen?",
        a: "Zu sehen sind die mächtigen Apsiden der Repräsentationsthermen aus dem 4. Jahrhundert sowie die vollständig begehbaren unterirdischen Servicegänge. Die Anlage wurde nie als Badebetrieb vollendet und diente später als Kaserne und Festung. Weniger besucht, aber flächenmäßig beeindruckend sind die nahen <a href=\"/sehenswuerdigkeiten/barbarathermen/\">Barbarathermen</a>.",
      },
      {
        q: "Sind die Kaiserthermen UNESCO-Welterbe?",
        a: "Ja. Die Kaiserthermen gehören seit 1986 zum UNESCO-Welterbe der römischen Baudenkmäler von Trier.",
      },
    ],
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
      "Ältere und größere Schwester der Kaiserthermen. Ruinenfeld unter freiem Himmel.",
    longDesc:
      "Die Barbarathermen wurden im 2. Jahrhundert errichtet und zählten zu den größten Thermen des Römischen Reichs. Heute sind weite Teile der Substruktion zu sehen, ein Besuchersteg führt in neun Stationen über die Anlage. Weniger touristisch als die Kaiserthermen - und beeindruckender in der Fläche.",
    imageHue: 1,
    coordinates: [49.7464, 6.6354],
    openingHours: "Apr-Sep 9-18, Mar/Okt 9-17, Nov-Feb 9-16",
    faq: [
      {
        q: "Kosten die Barbarathermen Eintritt?",
        a: "Nein. Der Besuchersteg über die Barbarathermen ist während der Öffnungszeiten kostenfrei zugänglich. In neun Stationen erklärt er Architektur, Ausstattung und den römischen Badebetrieb. Die Anlage liegt in der Südallee, wenige Gehminuten von den <a href=\"/sehenswuerdigkeiten/kaiserthermen/\">Kaiserthermen</a> entfernt.",
      },
      {
        q: "Wann sind die Barbarathermen geöffnet?",
        a: "Die Barbarathermen sind von April bis September täglich 9 bis 18 Uhr geöffnet, im März und Oktober bis 17 Uhr und von November bis Februar bis 16 Uhr. Der letzte Einlass ist jeweils 30 Minuten vor Schließung.",
      },
      {
        q: "Was ist der Unterschied zwischen Barbarathermen und Kaiserthermen?",
        a: "Die Barbarathermen sind die ältere und flächenmäßig größere Anlage aus dem 2. Jahrhundert und heute ein frei zugängliches Ruinenfeld. Die <a href=\"/sehenswuerdigkeiten/kaiserthermen/\">Kaiserthermen</a> stammen aus dem 4. Jahrhundert, sind besser erhalten und kostenpflichtig. Beide gehören seit 1986 zum UNESCO-Welterbe der römischen Baudenkmäler von Trier.",
      },
    ],
  },
  {
    slug: "amphitheater",
    imageKey: "sight:amphitheater",
    name: "Amphitheater Trier",
    categories: ["unesco-welterbe", "roemisches-erbe"],
    district: "trier-sued",
    type: "Antike",
    priceFrom: 6,
    unesco: true,
    shortDesc:
      "UNESCO-Amphitheater mit Keller-Hebebühnen. Im Sommer Bühne der Antikenfestspiele.",
    longDesc:
      "Das Trierer Amphitheater entstand um 100 n. Chr. für rund 20.000 Zuschauer. Erhalten sind die Tribünenböschungen und die unterirdischen Keller mit Hebebühnen, durch die Gladiatoren und Tiere in die Arena gelangten. Jeden Sommer Spielort der Antikenfestspiele.",
    imageHue: 1,
    coordinates: [49.7464, 6.6479],
    openingHours: "Apr-Sep 9-18, Mar/Okt 9-17, Nov-Feb 9-16",
    faq: [
      {
        q: "Was kostet der Eintritt ins Amphitheater Trier?",
        a: "Der Eintritt ins römische Amphitheater kostet für Erwachsene 6 Euro (ermäßigt 5 Euro, Kinder und Jugendliche 3 Euro). Die AntikenCard senkt den Preis pro Sehenswürdigkeit: Basic (18 Euro) für zwei Römerbauten plus Rheinisches Landesmuseum, Premium (28 Euro) für alle vier Römerbauten und das Museum. Im Sommer 2026 haben Kinder und Jugendliche unter 18 Jahren vom 26. Juni bis 9. August freien Eintritt.",
      },
      {
        q: "Wann ist das Amphitheater Trier geöffnet?",
        a: "Das Amphitheater ist von April bis September täglich 9 bis 18 Uhr geöffnet, im März und Oktober bis 17 Uhr und von November bis Februar bis 16 Uhr.",
      },
      {
        q: "Für wie viele Zuschauer wurde das Amphitheater gebaut?",
        a: "Das um 100 n. Chr. errichtete Amphitheater bot rund 20.000 Zuschauern Platz. Erhalten sind die Tribünenböschungen und die unterirdischen Keller mit Hebebühnen, über die Gladiatoren und Tiere in die Arena gelangten.",
      },
      {
        q: "Finden im Amphitheater Veranstaltungen statt?",
        a: "Ja. Jeden Sommer ist das Amphitheater Spielort der Antikenfestspiele Trier. Es zählt seit 1986 zum UNESCO-Welterbe der römischen Baudenkmäler von Trier.",
      },
    ],
  },
  {
    slug: "roemerbruecke",
    imageKey: "sight:roemerbruecke",
    name: "Römerbrücke",
    categories: ["unesco-welterbe", "roemisches-erbe"],
    district: "innenstadt",
    type: "Antike",
    priceFrom: null,
    unesco: true,
    shortDesc:
      "Älteste Brücke Deutschlands nördlich der Alpen. Römische Pfeiler von 144 n. Chr.",
    longDesc:
      "Die Römerbrücke ist die älteste noch in Funktion befindliche Brücke Deutschlands. Die fünf basaltenen Brückenpfeiler stammen aus dem 2. Jahrhundert n. Chr., der Brückenbelag wurde mehrfach erneuert. UNESCO-Welterbe, täglich befahren.",
    imageHue: 1,
    coordinates: [49.7522, 6.6273],
  },
  {
    slug: "igeler-saeule",
    imageKey: "sight:igeler-saeule",
    name: "Igeler Säule",
    categories: ["unesco-welterbe", "roemisches-erbe"],
    district: "euren",
    type: "Antike",
    priceFrom: null,
    unesco: true,
    shortDesc:
      "Römische Grabsäule im Trierer Ortsteil Igel. 23 m hoch, reich verziert.",
    longDesc:
      "Die Igeler Säule ist ein römisches Grabmal aus dem 3. Jahrhundert, errichtet von der Familie Secundinii. 23 m hoch, vollständig erhalten und mit detailliertem Reliefdekor - ein einzigartiges Zeugnis römischer Grabarchitektur, UNESCO-Welterbe.",
    imageHue: 1,
    coordinates: [49.7016, 6.5519],
  },
  // === Innenstadt - Markt & Buergerstadt ===
  {
    slug: "hauptmarkt",
    imageKey: "sight:hauptmarkt",
    name: "Hauptmarkt mit Marktkreuz",
    categories: ["roemisches-erbe", "shopping"],
    district: "innenstadt",
    type: "Markt",
    priceFrom: null,
    shortDesc:
      "Triers Marktplatz seit 958. Steipe, Petrusbrunnen, Marktkreuz, Rotes Haus.",
    longDesc:
      "Der Trierer Hauptmarkt ist einer der schönsten Marktplätze Deutschlands. Das Marktkreuz von 958 markiert den juristischen Mittelpunkt der Stadt, die Steipe diente als Festhaus, der Petrusbrunnen ist Trierer Renaissancearbeit. Heute Bühne für Wochenmarkt und Weihnachtsmarkt.",
    imageHue: 4,
    coordinates: [49.7559, 6.6420],
  },
  {
    slug: "kurfuerstliches-palais",
    imageKey: "sight:kurfuerstliches-palais",
    name: "Kurfürstliches Palais",
    categories: ["museen"],
    district: "innenstadt",
    type: "Wahrzeichen",
    priceFrom: null,
    shortDesc:
      "Rosa Rokoko-Palais zwischen Konstantinbasilika und Palastgarten. Eines der schönsten Rokokoschlösser Deutschlands.",
    longDesc:
      "Das Kurfürstliche Palais geht auf einen Renaissance-Kurfürstenbau zurück, der im 18. Jahrhundert von Johannes Seiz im Rokokostil umgestaltet wurde. Heute Behördensitz, der Palastgarten ist öffentlich begehbar und im Sommer Schauplatz von Open-Air-Konzerten.",
    imageHue: 4,
    coordinates: [49.7536, 6.6452],
  },
  {
    slug: "dreikoenigenhaus",
    imageKey: "sight:dreikoenigenhaus",
    name: "Dreikönigenhaus",
    categories: ["roemisches-erbe"],
    district: "innenstadt",
    type: "Wahrzeichen",
    priceFrom: null,
    shortDesc:
      "Mittelalterlicher Wohnturm in der Simeonstraße. Eingang im ersten Stock - typisch Wehrhaus.",
    longDesc:
      "Das Dreikönigenhaus von 1230 ist eines der besterhaltenen romanischen Patrizierwohntürme in Deutschland. Eingang im ersten Obergeschoss, ursprünglich nur über eine Hochzieh-Treppe erreichbar. Heute Café im Erdgeschoss, Fassade ein Foto-Hotspot.",
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
    priceFrom: 10,
    shortDesc:
      "Eines der wichtigsten Antikenmuseen Europas. Mosaike, Goldmünzen, Trierer Stadtmodell.",
    longDesc:
      "Das Rheinische Landesmuseum am Palastgarten besitzt eine der bedeutendsten Sammlungen römischer Funde nördlich der Alpen. Höhepunkte: das Neumagener Schiff, das berühmte Neumagener Weinschiff-Grabmal, riesige Mosaikböden und der Goldmünzenschatz von 1993.",
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
      "Das Simeonstift wurde im 11. Jahrhundert von Erzbischof Poppo gegründet und an die Porta Nigra angebaut, die zu jener Zeit als Doppelkirche diente. Heute beherbergt es das Stadtmuseum mit Sammlungen vom Mittelalter bis ins 20. Jahrhundert. Romanischer Kreuzgang als Innenhof.",
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
      "Das Museum am Dom zeigt den Domschatz mit Reliquiaren, liturgischen Geräten und Manuskripten. Dazu fruehchristliche Funde aus den Grabungen unter dem Dom - Trier ist die älteste Bischofsstadt nördlich der Alpen. Ruhige Atmosphäre, ideale Ergänzung zum Dombesuch.",
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
      "Karl Marx wurde 1818 in der Brückenstraße 10 geboren. Das spätbarocke Wohnhaus ist heute Museum mit Dauerausstellung der Friedrich-Ebert-Stiftung. 2018 zum 200. Geburtstag komplett überarbeitet - moderne Inszenierung statt Reliquien-Schaukasten.",
    imageHue: 4,
    coordinates: [49.7506, 6.6342],
    openingHours: "Apr-Okt tägl. 10-18, Nov-Mar Di-So 11-17",
    // Unterseite lief auf 404 - auf die gepruefte Startseite zurueckgestuft (2026-08-03).
    websiteUrl: "https://www.fes.de/",
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
      "Das Spielzeugmuseum direkt am Hauptmarkt ist Triers Familien-Hit. Drei Etagen mit Puppenstuben, Eisenbahnen, Plüschtieren, Kaufladen und Computerspielen. Vom Jugendstil bis Game Boy - auch für Eltern ein nostalgischer Spaziergang.",
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
      "Einziges Apostelgrab nördlich der Alpen. Aktive Benediktinerabtei mit romanischer Basilika.",
    longDesc:
      "St. Matthias birgt das einzige Apostelgrab nördlich der Alpen - der Sage nach wurden die Reliquien des Apostels Matthias durch Kaiserin Helena hierher gebracht. Romanische Basilika, aktive Benediktiner-Abtei, beliebter Etappenort des Jakobswegs.",
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
      "Balthasar-Neumann-Rokokokirche von 1734-54. Eine der schönsten Barockkirchen am Mittelrhein.",
    longDesc:
      "St. Paulin entstand 1734-54 nach Plänen Balthasar Neumanns. Stuckierte Hochaltarapsis, Deckengemaelde Christoph Thomas Schefflers, Heiligenschrein des Stadtpatrons Paulinus. Etwas abseits, daher ohne Touristenandrang - ein Geheimtipp.",
    imageHue: 1,
    coordinates: [49.7641, 6.6429],
  },
  // === Aussicht & Wandern ===
  {
    slug: "mariensaeule",
    imageKey: "sight:mariensaeule",
    name: "Mariensäule auf dem Markusberg",
    categories: ["aussicht-wandern"],
    district: "trier-west-pallien",
    type: "Aussicht",
    priceFrom: null,
    shortDesc:
      "40 m hohe Säule mit Marienfigur. Vom Plateau bester Blick auf die Trierer Silhouette.",
    longDesc:
      "Die Mariensäule auf dem Markusberg wurde 1859-66 als Dank für die Befreiung der Stadt von den Franzosen errichtet. 40 m hoch, in Sichtweite über der Mosel. Vom Pumpwerk-Plateau hat man den Postkarten-Blick auf Dom, Liebfrauenkirche und Römerbrücke.",
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
      "Höhenzug östlich der Stadt. Aussichtspunkt, Spielplatz, Wandergebiet auf alten Landesgartenschau-Flächen.",
    longDesc:
      "Der Petrisberg liegt östlich der Innenstadt und war 2004 Standort der Landesgartenschau. Heute Aussichtsplattform mit Blick auf Trier, großer Familienspielplatz, Skulpturenweg und Wanderwege Richtung Olewig. Mit dem Aufzug ab Karl-Marx-Straße erreichbar.",
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
      "Lehrpfad durch die Olewiger Weinberge. 5 km, 14 Stationen, Rastplätze mit Mosel-Blick.",
    longDesc:
      "Der Olewiger Weinkulturpfad ist ein 5 km langer Rundweg durch die Steillagen oberhalb des Weinortes. 14 Stationen erklären Rebsorten, Bodenarten und Trier-Weinbaugeschichte. Rastplätze, Schutzhütten und ein Aussichtspunkt mit Blick auf Innenstadt und Moseltal.",
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
      "Uferweg zwischen Zurlauben und Römerbrücke. Beste Spaziermeile, Schiffsanleger, Restaurants.",
    longDesc:
      "Die Mosel-Promenade verbindet das ehemalige Fischerviertel Zurlauben mit der Römerbrücke. Spaziermeile, Bauernmarkt, Schiffsanleger der Personenschifffahrt, eine Reihe von Mosel-Restaurants. Bei Sommerabenden Triers gemütlichste Adresse.",
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
