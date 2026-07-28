export type District = {
  slug: string;
  name: string;
  shortDesc: string;
  longDesc: string;
  hue: number; // 1-5
  imageKey?: string;
  coordinates: [number, number];
  characterTags: string[];
};

export const districts: District[] = [
  {
    slug: "innenstadt",
    name: "Innenstadt",
    imageKey: "district:innenstadt",
    shortDesc:
      "Das antike Herz Triers zwischen Porta Nigra, Hauptmarkt und Dom. UNESCO-Welterbe Schritt für Schritt.",
    longDesc:
      "Die Trierer Innenstadt ist gleichzeitig Wahrzeichen-Verdichtung und gelebte Fussgaengerzone. Vom Roemertor Porta Nigra über die Simeonstrasse zum Hauptmarkt, von dort zum Dom St. Peter und zur Liebfrauenkirche. Brunnen, Patrizierhaeuser, Strassencafes und vier UNESCO-Stätten auf wenigen hundert Metern.",
    hue: 1,
    coordinates: [49.7567, 6.6414],
    characterTags: ["UNESCO", "Roemer", "Fussgaengerzone"],
  },
  {
    slug: "olewig",
    name: "Olewig",
    imageKey: "district:olewig",
    shortDesc:
      "Weinort innerhalb der Stadtgrenzen. Winzerhoefe, Weinkulturpfad, Tor zur Mosel-Region.",
    longDesc:
      "Olewig liegt im Südosten Triers und ist offiziell Stadtteil, traditionell aber Weinort. Hier drängen sich Winzerhoefe um den Olewiger Strassenkern, der Weinkulturpfad führt durch die Hangweinberge, und Anfang August feiert das Olewiger Weinfest die Riesling- und Elbling-Ernte.",
    hue: 3,
    coordinates: [49.7427, 6.6705],
    characterTags: ["Wein", "Weingüter", "Riesling"],
  },
  {
    slug: "trier-sued",
    name: "Trier-Süd",
    imageKey: "district:trier-sued",
    shortDesc:
      "Südlich der Innenstadt. Kaiserthermen, Barbarathermen, St. Matthias-Basilika.",
    longDesc:
      "Trier-Süd ist die Roemer-Achse: hier liegen die monumentalen Kaiserthermen, etwas weiter die älteren Barbarathermen und am südlichen Ende St. Matthias mit dem einzigen Apostelgrab nördlich der Alpen. Wohnviertel mischen sich mit antiker Topografie.",
    hue: 1,
    coordinates: [49.7434, 6.6396],
    characterTags: ["UNESCO", "Thermen", "Pilgern"],
  },
  {
    slug: "trier-nord",
    name: "Trier-Nord",
    imageKey: "district:trier-nord",
    shortDesc:
      "Wohnbezirk nördlich der Porta Nigra. Hafen, Bahnhof, Nordallee.",
    longDesc:
      "Trier-Nord schliesst nördlich an die Innenstadt an, beginnt direkt hinter der Porta Nigra und führt zum Trierer Hafen sowie zum Hauptbahnhof. Gründerzeit-Strassenzuege, gemischtes Viertel mit Studierenden und Familien.",
    hue: 4,
    coordinates: [49.7642, 6.6428],
    characterTags: ["Wohnen", "Bahnhof", "Hafen"],
  },
  {
    slug: "trier-west-pallien",
    name: "Trier-West / Pallien",
    imageKey: "district:trier-west-pallien",
    shortDesc:
      "Linksseitig der Mosel. Mariensaeule, Markusberg, Aussicht über die Altstadt.",
    longDesc:
      "Trier-West liegt jenseits der Mosel und bietet vom Markusberg mit der Mariensaeule den besten Blick auf die Altstadt-Silhouette. Pallien ist der nordwestliche Wohnbezirk mit Weinhaengen und stillen Wohnstrassen.",
    hue: 2,
    coordinates: [49.7561, 6.6213],
    characterTags: ["Aussicht", "Mosel", "Wohnen"],
  },
  {
    slug: "trier-ost",
    name: "Trier-Ost",
    imageKey: "district:trier-ost",
    shortDesc:
      "Gartenfeld, Heiligkreuz. Wohnbezirke östlich der Innenstadt.",
    longDesc:
      "Trier-Ost umfasst Gartenfeld und Heiligkreuz und reicht bis zum Höhenzug Richtung Petrisberg. Familienquartiere, gewachsene Nachbarschaften, kurze Wege ins UNESCO-Zentrum.",
    hue: 4,
    coordinates: [49.7501, 6.6573],
    characterTags: ["Familie", "Wohnen", "Gartenfeld"],
  },
  {
    slug: "mariahof",
    name: "Mariahof",
    imageKey: "district:mariahof",
    shortDesc:
      "Plateau-Wohnbezirk mit weitem Blick und naher Naherholung.",
    longDesc:
      "Mariahof liegt südlich auf der Hochflaeche oberhalb der Stadt. Geplantes Wohnquartier mit Schulen und Familienstrukturen, Spazierwege Richtung Petrisberg und Olewig.",
    hue: 4,
    coordinates: [49.7325, 6.6492],
    characterTags: ["Wohnen", "Plateau", "Familie"],
  },
  {
    slug: "kuerenz",
    name: "Kuerenz",
    imageKey: "district:kuerenz",
    shortDesc:
      "Universitäts-Viertel mit Petrisberg, Tarforster Höhe und Studierendenleben.",
    longDesc:
      "Kuerenz ist Triers Uni-Bezirk. Die Universität Trier liegt auf dem Tarforster Plateau, der Petrisberg bietet Wandergebiet und Aussicht. Studentisch geprägt, gemischte Wohnstrukturen, viele Cafés und WG-Adressen.",
    hue: 2,
    coordinates: [49.7475, 6.6841],
    characterTags: ["Universität", "Studierende", "Petrisberg"],
  },
  {
    slug: "euren",
    name: "Euren",
    imageKey: "district:euren",
    shortDesc:
      "Suedwestlich an der Mosel. Familienbezirk mit Moselbruecke und Igeler Säule in der Nähe.",
    longDesc:
      "Euren liegt suedwestlich am Moselufer und ist ein ruhiges Wohnviertel. Von hier sind es nur wenige Minuten zur UNESCO-Igeler-Säule, die noch in Trier-Reichweite liegt.",
    hue: 2,
    coordinates: [49.7264, 6.6132],
    characterTags: ["Mosel", "Wohnen", "Familie"],
  },
  {
    slug: "biewer",
    name: "Biewer",
    imageKey: "district:biewer",
    shortDesc:
      "Nördlicher Mosel-Stadtteil mit Hafennaehe und Wein-Tradition.",
    longDesc:
      "Biewer ist Triers noerdlichster Mosel-Stadtteil. Stilles Ortsbild, Winzerhof-Reste und direkter Zugang zum Mosel-Radweg in Richtung Schweich und Bernkastel.",
    hue: 3,
    coordinates: [49.7842, 6.6193],
    characterTags: ["Mosel", "Wein", "Radweg"],
  },
  {
    slug: "ruwer-eitelsbach",
    name: "Ruwer-Eitelsbach",
    imageKey: "district:ruwer-eitelsbach",
    shortDesc:
      "Ostverlauf Triers im Ruwertal. Weinort mit berühmten Steillagen.",
    longDesc:
      "Ruwer-Eitelsbach liegt im engen Ruwertal östlich der Innenstadt. Berühmte Riesling-Steillagen wie Eitelsbacher Karthaeuserhofberg und Maximin Gruenhaeuser Abtsberg liegen vor der Tür. Stiller Weinort mit grossen Namen.",
    hue: 3,
    coordinates: [49.7752, 6.7271],
    characterTags: ["Wein", "Riesling", "Steillagen"],
  },
  {
    slug: "pfalzel",
    name: "Pfalzel",
    imageKey: "district:pfalzel",
    shortDesc:
      "Historischer Ortsteil mit Resten der spaetantiken Koenigspfalz an der Mosel.",
    longDesc:
      "Pfalzel überrascht: in diesem unscheinbaren Ortsteil nördlich liegen Mauern und Türme einer römischen Koenigspfalz aus dem 4. Jahrhundert, eingebaut in spätere Kirchenbauten. Stille Mosel-Lage, kurze Distanz zum Flughafen Trier.",
    hue: 4,
    coordinates: [49.8014, 6.6661],
    characterTags: ["Geschichte", "Mosel", "Pfalz"],
  },
];

export const getDistrict = (slug: string) =>
  districts.find((d) => d.slug === slug);
