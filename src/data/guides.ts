export type Guide = {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  description: string;
  /** Markdown-light: Liste von Abschnitten. */
  sections: { heading: string; body: string }[];
  hue: number;
  /** Optionaler Key aus images.ts. Fehlt er, zeigt ContentImage den Platzhalter. */
  imageKey?: string;
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
    imageKey: "sight:porta-nigra",
    sections: [
      {
        heading: "Tag 1 - Antike",
        body:
          "Porta Nigra (1 h, inkl. Aufstieg). Simeonstraße hinunter zum Hauptmarkt - Marktkreuz, Petrusbrunnen, Steipe. Mittag in der Weinstube Kesselstatt am Liebfrauenplatz. Nachmittag Dom + Liebfrauenkirche (1,5 h, inkl. Domschatz). Abend Spaziergang auf der Mosel-Promenade, Dinner Pfeffermühle.",
      },
      {
        heading: "Tag 2 - Kaiserzeit",
        body:
          "Kaiserthermen, dann zu Fuß zum Amphitheater (jeweils 1 h). Mittag Zum Domstein mit römischem Themenmenü. Nachmittag Rheinisches Landesmuseum (2 h, das beste Antikenmuseum Europas). Abend Konstantinbasilika, Dinner in der Schlemmereule.",
      },
      {
        heading: "Tag 3 - Olewig & Mosel",
        body:
          "Bus 6 nach Olewig. Weinkulturpfad (5 km, 2 h) durch die Steillagen. Mittag im Weingut Reverchon oder bei Becker's. Nachmittag zurück zur Römerbrücke, Mariensäule (Bus 8) für den Postkartenblick auf die Stadt. Abschluss-Dinner in Becker's.",
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
    imageKey: "sight:petrisberg",
    sections: [
      {
        heading: "Gladiatoren-Führung im Amphitheater",
        body:
          "Die Römer-Erlebnistour mit verkleideter Führung ist Triers Familien-Hit. Buchung über Trier-Tourist-Info. Funktioniert ab Grundschulalter, fesselt auch Teenager.",
      },
      {
        heading: "Spielzeugmuseum am Hauptmarkt",
        body:
          "Drei Etagen, Puppenstuben, Eisenbahnen, Game Boy. Funktioniert ab Kindergartenalter, für Eltern ein nostalgischer Spaziergang. Direkt am Hauptmarkt, kombinierbar mit Eis.",
      },
      {
        heading: "Petrisberg-Aufzug + Spielplatz",
        body:
          "Vom Sicht-Aufzug an der Karl-Marx-Straße auf den Petrisberg - Aussicht über Mosel, Stadt, Hunsrück. Riesenspielplatz, Wassergärten, Picknickwiesen.",
      },
      {
        heading: "Römer-Erlebnisbus",
        body:
          "Im Sommer ein offener Doppeldecker mit Römer-Show-Guide. Fahrt zu Porta, Amphitheater, Kaiserthermen und Römerbrücke. Buchung am Tourist-Info-Stand neben der Porta Nigra.",
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
    imageKey: "category:museen",
    sections: [
      {
        heading: "Vormittag - Museen-Achse",
        body:
          "Rheinisches Landesmuseum (2 h) als Hauptgang. Dann Museum am Dom mit Domschatz, kurzer Weg, beides indoor.",
      },
      {
        heading: "Mittag - Schlemmereule oder Domstein",
        body:
          "Beide direkt in der Innenstadt, überdachte Wege, schöne Atmosphäre mit Tageslicht über Glasdächern.",
      },
      {
        heading: "Nachmittag - Konstantinbasilika + Liebfrauen",
        body:
          "Konstantinbasilika (riesiger Saal, fast leer im Regen - Akustik-Erlebnis). Dann durch den überdachten Domkreuzgang in die Liebfrauenkirche. Anschließend Kaffee im Café am Dom.",
      },
      {
        heading: "Abend - Weinstube",
        body:
          "Wenn der Abend kommt: Weinstube Kesselstatt oder eine Olewiger Straußwirtschaft. Beide indoor, beide außerordentlich Mosel.",
      },
    ],
  },
];

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
