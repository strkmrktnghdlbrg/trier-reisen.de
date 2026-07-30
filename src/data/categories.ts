export type Category = {
  slug: string;
  name: string;
  shortDesc: string;
  longDesc: string;
  icon: string; // Lucide-Name, optional ergaenzbar
  hue: number;
};

export const categories: Category[] = [
  {
    slug: "unesco-welterbe",
    name: "UNESCO-Welterbe",
    shortDesc:
      "Die acht UNESCO-Stätten von Trier: römische Baudenkmaeler, Dom und Liebfrauenkirche.",
    longDesc:
      "Seit 1986 stehen Triers römische Baudenkmaeler, der Dom St. Peter und die Liebfrauenkirche als Ensemble auf der UNESCO-Welterbe-Liste. Acht Einzelmonumente verteilen sich auf wenige Quadratkilometer - eine Dichte, die in Europa selten ist.",
    icon: "landmark",
    hue: 1,
  },
  {
    slug: "roemisches-erbe",
    name: "Römisches Erbe",
    shortDesc:
      "Porta Nigra, Kaiserthermen, Amphitheater, Römerbrücke - die alte Augusta Treverorum.",
    longDesc:
      "Trier ist das römische Kaiserresidenz-Erbe nördlich der Alpen. Gegründet als Augusta Treverorum 17/16 v. Chr., war die Stadt im 4. Jahrhundert eine der wichtigsten Residenzen des Römischen Reiches. Heute ist das Stadtbild geradezu durchwirkt von antiken Bauten in beeindruckendem Erhaltungszustand.",
    icon: "columns",
    hue: 1,
  },
  {
    slug: "wein",
    name: "Wein & Mosel",
    shortDesc:
      "Olewig, Ruwer und Mosel - Weingüter, Weinwanderungen, Weinfeste.",
    longDesc:
      "Trier ist Wein-Stadt. Im Stadtgebiet liegen Olewig und Ruwer mit erstklassigen Riesling-Lagen, die Mosel beginnt direkt vor der Tür. Weingüter wie Bischoefliche Weingüter, Reverchon, von Schubert oder Karthaeuserhof haben Weltformat. Olewiger Weinfest, Mosel-Wein-Nachts-Bummel.",
    icon: "wine",
    hue: 3,
  },
  {
    slug: "museen",
    name: "Museen",
    shortDesc:
      "Rheinisches Landesmuseum, Stadtmuseum Simeonstift, Karl-Marx-Haus.",
    longDesc:
      "Triers Museen erzählen 2000 Jahre. Das Rheinisches Landesmuseum gilt als eines der wichtigsten Antikenmuseen Europas, das Stadtmuseum Simeonstift residiert direkt an der Porta Nigra, das Museum am Dom huetet den Domschatz, und im Karl-Marx-Haus lässt sich das 19. Jahrhundert von 1818 an verfolgen.",
    icon: "building-2",
    hue: 4,
  },
  {
    slug: "religioese-staetten",
    name: "Kirchen & Pilgerorte",
    shortDesc:
      "Dom, Liebfrauenkirche, Konstantinbasilika, St. Matthias, St. Paulin.",
    longDesc:
      "Trier ist Bischofsstadt und seit dem 4. Jahrhundert christliches Zentrum. Der Dom huetet den Heiligen Rock, St. Matthias-Basilika das einzige Apostelgrab nördlich der Alpen, St. Paulin ist Balthasar-Neumann-Rokoko vom Feinsten, und die Konstantinbasilika dient heute als evangelische Hauptkirche.",
    icon: "church",
    hue: 1,
  },
  {
    slug: "familie",
    name: "Trier mit Kindern",
    shortDesc:
      "Amphitheater-Führung, Spielzeugmuseum, Roemerbus, Petrisberg.",
    longDesc:
      "Trier ist familienfreundlicher als gedacht. Die Gladiatoren-Führung im Amphitheater fesselt Schulkinder, das Spielzeugmuseum direkt am Hauptmarkt funktioniert ab Krabbelalter, der Roemer-Erlebnisbus rollt durch die Innenstadt und der Petrisberg-Spielplatz hat die beste Aussicht der Stadt.",
    icon: "users",
    hue: 2,
  },
  {
    slug: "kulinarik",
    name: "Kulinarik",
    shortDesc:
      "Moselwein-Stuben, Sterneküche, Weinhaus-Restaurants in Olewig.",
    longDesc:
      "Kulinarisch wandert Trier zwischen moselländischer Tradition und gehobener Moderne. Weinstuben in Olewig, Sterne bei Becker's, römische Themenmenüs Zum Domstein, mediterrane Schlemmereule im Domkeller - die Bandbreite ist groesser als die Stadtgroesse vermuten lässt.",
    icon: "utensils",
    hue: 3,
  },
  {
    slug: "aussicht-wandern",
    name: "Aussicht & Wandern",
    shortDesc:
      "Mariensäule, Petrisberg, Weinkulturpfad Olewig, Mosel-Promenade.",
    longDesc:
      "Trier liegt im Moseltal mit Höhenrücken auf beiden Seiten. Die Mariensäule auf dem Markusberg ist DER Aussichtspunkt, der Petrisberg bietet Wanderwege oberhalb der Universität, und der Olewiger Weinkulturpfad führt durch die Riesling-Steillagen.",
    icon: "mountain",
    hue: 2,
  },
  {
    slug: "mosel-aktivitaeten",
    name: "Mosel-Aktivitäten",
    shortDesc:
      "Mosel-Radweg, Schiffsrundfahrten, Personenschifffahrt nach Bernkastel.",
    longDesc:
      "Trier ist Startpunkt vieler Mosel-Aktivitäten. Der Mosel-Radweg führt von hier 248 km nach Koblenz, Personenschiffe starten an der Römerbrücke Richtung Schweich und Bernkastel-Kues, und Kanu-Anbieter vermieten direkt am Ufer.",
    icon: "ship",
    hue: 2,
  },
  {
    slug: "shopping",
    name: "Shopping",
    shortDesc:
      "Simeonstrasse, Fleischstrasse, Brotstrasse - Triers Fussgaengerzone.",
    longDesc:
      "Triers Fussgaengerzone bildet ein T zwischen Porta Nigra, Hauptmarkt und Domfreihof. Filialisten in der Simeonstrasse, kleinere Läden in den Seitenstrassen, Weinhandlungen rund um den Liebfrauenplatz, Wochenmarkt auf dem Viehmarkt.",
    icon: "shopping-bag",
    hue: 4,
  },
];

export const getCategory = (slug: string) =>
  categories.find((c) => c.slug === slug);
