export type Guide = {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  description: string;
  /** Markdown-light: Liste von Abschnitten. */
  sections: { heading: string; body: string }[];
  hue: number;
};

export const guides: Guide[] = [
  {
    slug: "3-tage-trier",
    title: "3 Tage Trier - der UNESCO-Reiseplaner",
    eyebrow: "Wochenende",
    intro:
      "Drei Tage reichen, um Triers UNESCO-Pflicht zu schaffen, ohne die Stadt zu hetzen. Mit Olewig am Abend.",
    description:
      "Reiseplaner: 3 Tage in Trier mit UNESCO-Welterbe, Mosel-Promenade, Olewig und Praktischem.",
    hue: 1,
    sections: [
      {
        heading: "Tag 1 - Antike",
        body:
          "Porta Nigra (1 h, inkl. Aufstieg). Simeonstrasse hinunter zum Hauptmarkt - Marktkreuz, Petrusbrunnen, Steipe. Mittag in der Weinstube Kesselstatt am Liebfrauenplatz. Nachmittag Dom + Liebfrauenkirche (1,5 h, inkl. Domschatz). Abend Spaziergang auf der Mosel-Promenade, Dinner Pfeffermuehle.",
      },
      {
        heading: "Tag 2 - Kaiserzeit",
        body:
          "Kaiserthermen, dann zu Fuss zum Amphitheater (jeweils 1 h). Mittag Zum Domstein mit roemischem Themenmenue. Nachmittag Rheinisches Landesmuseum (2 h, das beste Antikenmuseum Europas). Abend Konstantinbasilika, Dinner in der Schlemmereule.",
      },
      {
        heading: "Tag 3 - Olewig & Mosel",
        body:
          "Bus 6 nach Olewig. Weinkulturpfad (5 km, 2 h) durch die Steillagen. Mittag im Weingut Reverchon oder bei Becker's. Nachmittag zurueck zur Roemerbruecke, Mariensaeule (Bus 8) fuer den Postkartenblick auf die Stadt. Abschluss-Dinner in Becker's.",
      },
    ],
  },
  {
    slug: "trier-mit-kindern",
    title: "Trier mit Kindern",
    eyebrow: "Familie",
    intro:
      "Wie Trier mit Schulkindern und Jugendlichen funktioniert, ohne sie an Reliefs zu verlieren.",
    description:
      "Reiseplaner: Trier mit Kindern. Amphitheater-Gladiatoren-Tour, Spielzeugmuseum, Petrisberg, Bus-Tour, Eis am Hauptmarkt.",
    hue: 2,
    sections: [
      {
        heading: "Gladiatoren-Fuehrung im Amphitheater",
        body:
          "Die Roemer-Erlebnistour mit verkleideter Fuehrung ist Triers Familien-Hit. Buchung ueber Trier-Tourist-Info. Funktioniert ab Grundschulalter, fesselt auch Teenager.",
      },
      {
        heading: "Spielzeugmuseum am Hauptmarkt",
        body:
          "Drei Etagen, Puppenstuben, Eisenbahnen, Game Boy. Funktioniert ab Kindergartenalter, fuer Eltern ein nostalgischer Spaziergang. Direkt am Hauptmarkt, kombinierbar mit Eis.",
      },
      {
        heading: "Petrisberg-Aufzug + Spielplatz",
        body:
          "Vom Sicht-Aufzug an der Karl-Marx-Strasse auf den Petrisberg - Aussicht ueber Mosel, Stadt, Hunsrueck. Riesenspielplatz, Wassergaerten, Picknickwiesen.",
      },
      {
        heading: "Roemer-Erlebnisbus",
        body:
          "Im Sommer ein offener Doppeldecker mit Roemer-Show-Guide. Fahrt zu Porta, Amphitheater, Kaiserthermen und Roemerbruecke. Buchung am Tourist-Info-Stand neben der Porta Nigra.",
      },
    ],
  },
  {
    slug: "trier-bei-regen",
    title: "Trier bei Regen",
    eyebrow: "Wetter-Plan",
    intro:
      "Wenn das Wetter nicht mitmacht: ein Trier-Plan komplett unter Dach, ohne Verzicht auf UNESCO.",
    description:
      "Reiseplaner: Trier bei Regen. UNESCO-Pflicht in Hallen, drei Museen, Café-Stopps, Weinstuben.",
    hue: 4,
    sections: [
      {
        heading: "Vormittag - Museen-Achse",
        body:
          "Rheinisches Landesmuseum (2 h) als Hauptgang. Dann Museum am Dom mit Domschatz, kurzer Weg, beides indoor.",
      },
      {
        heading: "Mittag - Schlemmereule oder Domstein",
        body:
          "Beide direkt in der Innenstadt, ueberdachte Wege, schoene Atmosphaere mit Tageslicht ueber Glasdaechern.",
      },
      {
        heading: "Nachmittag - Konstantinbasilika + Liebfrauen",
        body:
          "Konstantinbasilika (riesiger Saal, fast leer im Regen - Akustik-Erlebnis). Dann durch den ueberdachten Domkreuzgang in die Liebfrauenkirche. Anschliessend Kaffee im Café am Dom.",
      },
      {
        heading: "Abend - Weinstube",
        body:
          "Wenn der Abend kommt: Weinstube Kesselstatt oder eine Olewiger Strausswirtschaft. Beide indoor, beide ausserordentlich Mosel.",
      },
    ],
  },
];

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
