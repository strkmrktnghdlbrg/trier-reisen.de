/**
 * Trier-Event-Kalender + SEO-Landings.
 * Jedes Event traegt einen Slug und kann optional eine Hotel-Stay22-Landing bekommen.
 */

export interface CityEvent {
  slug: string;
  title: string;
  intro: string;
  eyebrow: string;
  checkin: string; // YYYY-MM-DD
  checkout: string;
  description: string;
  address: string;
  lat?: number;
  lng?: number;
  radius?: number;
  maxPricePerNight?: number;
  limit?: number;
  /** Zusaetzlicher Lang-Text fuer die Event-Detail-Page. */
  longDesc?: string;
  /** Optional GetYourGuide Tour-ID(s). */
  gygActivityId?: string;
}

export const events: CityEvent[] = [
  {
    slug: "antikenfestspiele",
    title: "Trierer Antikenfestspiele 2026",
    eyebrow: "Sommerfestival",
    intro:
      "Die Antikenfestspiele machen das roemische Amphitheater jeden Sommer zur groessten Antike-Buehne Deutschlands. Inszenierungen mit Live-Musik, Reiterei und Tausenden Zuschauern unter freiem Himmel.",
    description:
      "Trierer Antikenfestspiele 2026 — Termine, Programm, Hotel-Verfuegbarkeit. Inszenierungen im roemischen Amphitheater, Tickets, Hotels in der Naehe.",
    longDesc:
      "Die Trierer Antikenfestspiele sind das groesste Antike-Festival Deutschlands. Seit 1998 wird jeden Sommer das roemische Amphitheater zur Open-Air-Buehne fuer Tragoedien, Komoedien und Konzert-Inszenierungen. Tickets ab ca. 25 Euro, Hauptauffuehrungen im Juli und August.",
    checkin: "2026-07-10",
    checkout: "2026-07-12",
    address: "Amphitheater Trier",
    lat: 49.7464,
    lng: 6.6479,
    radius: 1500,
    maxPricePerNight: 250,
  },
  {
    slug: "olewiger-weinfest",
    title: "Olewiger Weinfest 2026",
    eyebrow: "1. Augustwochenende",
    intro:
      "Das groesste Weinfest der Region. Sieben Tage Riesling und Elbling, Winzerhoefe, Festumzug am Sonntag und das Kroenung der Trierer Weinkoenigin.",
    description:
      "Olewiger Weinfest 2026 — Termine, Programm, Hotel-Verfuegbarkeit in Olewig und Innenstadt. Festumzug am Sonntag, Weinkoenigin-Kroenung.",
    longDesc:
      "Das Olewiger Weinfest ist das groesste Weinfest des Trierer Landes. Eine Woche lang stehen die Winzerhoefe offen, am ersten Sonntag im August zieht der grosse Festumzug durch Olewig, und die Trierer Weinkoenigin wird gekroent. Tausende Besucher trinken sich durch die Olewiger Riesling-Lagen.",
    checkin: "2026-08-07",
    checkout: "2026-08-10",
    address: "Olewig, Trier",
    lat: 49.7427,
    lng: 6.6705,
    radius: 2500,
    maxPricePerNight: 220,
  },
  {
    slug: "trierer-weihnachtsmarkt",
    title: "Trierer Weihnachtsmarkt 2026",
    eyebrow: "Advent",
    intro:
      "Einer der schoensten Weihnachtsmaerkte Deutschlands. Buden auf dem Hauptmarkt und vor dem Dom, mittelalterliche Kulisse, Gluehwein und roemische Weihnachts-Atmosphaere.",
    description:
      "Trierer Weihnachtsmarkt 2026 — Termine, Programm, Hotels in der Innenstadt. Die schoenste Adventskulisse zwischen Dom und Hauptmarkt.",
    longDesc:
      "Der Trierer Weihnachtsmarkt verteilt sich zwischen Hauptmarkt und Domfreihof — zwischen Marktkreuz und romanischer Domfassade. Rund 95 Buden, Kunsthandwerk, Trierer Spezialitaeten, Mosel-Gluehwein. Geoeffnet Ende November bis kurz vor Weihnachten.",
    checkin: "2026-12-04",
    checkout: "2026-12-07",
    address: "Hauptmarkt, Trier",
    lat: 49.7559,
    lng: 6.6420,
    radius: 1200,
    maxPricePerNight: 220,
  },
  {
    slug: "altstadtfest",
    title: "Trierer Altstadtfest 2026",
    eyebrow: "Juni",
    intro:
      "Drei Tage Stadtfest mit Buehnen auf Hauptmarkt, Kornmarkt und am Dom. Live-Musik, Kulinarik, Stadtfuehrungen umsonst.",
    description:
      "Trierer Altstadtfest 2026 — Programm, Termine, Hotels in Trier. Drei Tage Open-Air-Stadtfest in der UNESCO-Innenstadt.",
    longDesc:
      "Das Trierer Altstadtfest ist das groesste innerstaedtische Stadtfest des Jahres: drei Tage Buehnen-Programm, kostenlose Konzerte, regionale Kulinarik und Sonderfuehrungen durch UNESCO-Staetten.",
    checkin: "2026-06-26",
    checkout: "2026-06-29",
    address: "Hauptmarkt, Trier",
    lat: 49.7559,
    lng: 6.6420,
    radius: 1500,
  },
  {
    slug: "brot-und-spiele",
    title: "Brot und Spiele — Roemerfest 2026",
    eyebrow: "August",
    intro:
      "Trier wird fuer ein Wochenende roemisch. Gladiatoren-Kaempfe im Amphitheater, Legionaerslager, antikes Handwerk, Mode-Schau.",
    description:
      "Brot und Spiele — Trierer Roemerfest 2026. Gladiatoren-Show im Amphitheater, antikes Strassenfest, Hotel-Tipps.",
    longDesc:
      "Brot und Spiele ist Triers groesstes Roemerfest. Das Amphitheater wird zur Buehne fuer Gladiatorenkaempfe und Reitershows, in der Innenstadt zelten Legionaere, antike Maerkte und Handwerker.",
    checkin: "2026-08-14",
    checkout: "2026-08-16",
    address: "Amphitheater Trier",
    lat: 49.7464,
    lng: 6.6479,
    radius: 2000,
  },
  {
    slug: "mosel-wein-nachts-bummel",
    title: "Mosel-Wein-Nachts-Bummel 2026",
    eyebrow: "September",
    intro:
      "Eine Sommernacht entlang der Trierer Mosel-Promenade. Weinstaende der Region, Live-Musik, Lichtkunst entlang der Promenade.",
    description:
      "Trierer Mosel-Wein-Nachts-Bummel 2026 — Termin, Programm, Hotels nahe Mosel.",
    longDesc:
      "Der Mosel-Wein-Nachts-Bummel verwandelt die Trierer Mosel-Promenade in eine Sommernacht-Weinmeile. Weingueter der Region praesentieren sich an offenen Staenden, Live-Musik begleitet bis Mitternacht.",
    checkin: "2026-09-04",
    checkout: "2026-09-06",
    address: "Mosel-Promenade, Trier",
    lat: 49.7593,
    lng: 6.6261,
    radius: 1500,
  },
  {
    slug: "stadtmuseen-lange-nacht",
    title: "Trierer Lange Nacht der Museen 2026",
    eyebrow: "Oktober",
    intro:
      "Eine Nacht — alle Museen offen. Vom Rheinischen Landesmuseum ueber das Karl-Marx-Haus bis zum Spielzeugmuseum. Mit Shuttle-Bus.",
    description:
      "Trierer Lange Nacht der Museen 2026 — Programm, Tickets, alle Museen mit Shuttle-Bus.",
    longDesc:
      "Die Lange Nacht der Trierer Museen oeffnet alle staedtischen und kirchlichen Museen mit einem Kombi-Ticket. Sonderfuehrungen, Live-Programm, Shuttle-Service zwischen den Haeusern.",
    checkin: "2026-10-10",
    checkout: "2026-10-11",
    address: "Innenstadt Trier",
    lat: 49.7556,
    lng: 6.6435,
    radius: 2500,
  },
];

export const getEvent = (slug: string) =>
  events.find((e) => e.slug === slug);

export const isUpcoming = (event: CityEvent) =>
  new Date(event.checkout) >= new Date();
