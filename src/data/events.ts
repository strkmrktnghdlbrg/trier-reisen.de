/**
 * Trier-Event-Kalender + Saison-Hotel-Landings.
 *
 * Zwei Sorten:
 *  - events[]: Originale Trier-Events (Festspiele, Weinfest, Weihnachtsmarkt …)
 *  - seasonalStays[]: Saison-Landings ohne festes Event (Silvester, Pfingsten,
 *    Brueckentage). Werden auf den gleichen [slug]-Routen ausgeliefert.
 *
 * Routing:
 *  - /events/<slug>/                    → Event-Detail mit Beschreibung + Live-Hotels
 *  - /hotels-trier-<slug>/              → Reine Hotel-Landing mit Datums-Anchor
 *
 * Live-Hotels via lib/stay22.ts mit checkin/checkout. Cron-Rebuild alle 6h.
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
  longDesc?: string;
  gygActivityId?: string;
  /** "event" = echtes Trier-Event mit Programm; "season" = Saison-Anchor ohne Programm. */
  kind?: "event" | "season";
  /** Wo erscheint die Karte im Hauptmenue? */
  category?: "kultur" | "wein" | "weihnachten" | "antike" | "saison" | "messe";
}

export const events: CityEvent[] = [
  // === ECHTE EVENTS ===
  {
    slug: "antikenfestspiele-2026",
    title: "Trierer Antikenfestspiele 2026",
    eyebrow: "Sommerfestival",
    kind: "event",
    category: "antike",
    intro:
      "Die Antikenfestspiele machen das roemische Amphitheater jeden Sommer zur groessten Antike-Buehne Deutschlands. Inszenierungen mit Live-Musik, Reiterei und Tausenden Zuschauern unter freiem Himmel.",
    description:
      "Trierer Antikenfestspiele 2026 - Termine, Programm, Hotel-Verfuegbarkeit. Inszenierungen im roemischen Amphitheater, Tickets, Hotels in der Naehe.",
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
    slug: "olewiger-weinfest-2026",
    title: "Olewiger Weinfest 2026",
    eyebrow: "1. Augustwochenende",
    kind: "event",
    category: "wein",
    intro:
      "Das groesste Weinfest der Region. Sieben Tage Riesling und Elbling, Winzerhoefe, Festumzug am Sonntag und das Kroenung der Trierer Weinkoenigin.",
    description:
      "Olewiger Weinfest 2026 - Termine, Programm, Hotel-Verfuegbarkeit in Olewig und Innenstadt. Festumzug am Sonntag, Weinkoenigin-Kroenung.",
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
    slug: "weihnachtsmarkt-2026",
    title: "Trierer Weihnachtsmarkt 2026",
    eyebrow: "Advent",
    kind: "event",
    category: "weihnachten",
    intro:
      "Einer der schoensten Weihnachtsmaerkte Deutschlands. Buden auf dem Hauptmarkt und vor dem Dom, mittelalterliche Kulisse, Gluehwein und roemische Weihnachts-Atmosphaere.",
    description:
      "Trierer Weihnachtsmarkt 2026 - Termine, Programm, Hotels in der Innenstadt. Die schoenste Adventskulisse zwischen Dom und Hauptmarkt.",
    longDesc:
      "Der Trierer Weihnachtsmarkt verteilt sich zwischen Hauptmarkt und Domfreihof - zwischen Marktkreuz und romanischer Domfassade. Rund 95 Buden, Kunsthandwerk, Trierer Spezialitaeten, Mosel-Gluehwein. Geoeffnet Ende November bis kurz vor Weihnachten.",
    checkin: "2026-12-04",
    checkout: "2026-12-07",
    address: "Hauptmarkt, Trier",
    lat: 49.7559,
    lng: 6.6420,
    radius: 1200,
    maxPricePerNight: 220,
  },
  {
    slug: "altstadtfest-2026",
    title: "Trierer Altstadtfest 2026",
    eyebrow: "Juni",
    kind: "event",
    category: "kultur",
    intro:
      "Drei Tage Stadtfest mit Buehnen auf Hauptmarkt, Kornmarkt und am Dom. Live-Musik, Kulinarik, Stadtfuehrungen umsonst.",
    description:
      "Trierer Altstadtfest 2026 - Programm, Termine, Hotels in Trier. Drei Tage Open-Air-Stadtfest in der UNESCO-Innenstadt.",
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
    slug: "brot-und-spiele-2026",
    title: "Brot und Spiele - Roemerfest 2026",
    eyebrow: "August",
    kind: "event",
    category: "antike",
    intro:
      "Trier wird fuer ein Wochenende roemisch. Gladiatoren-Kaempfe im Amphitheater, Legionaerslager, antikes Handwerk, Mode-Schau.",
    description:
      "Brot und Spiele - Trierer Roemerfest 2026. Gladiatoren-Show im Amphitheater, antikes Strassenfest, Hotel-Tipps.",
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
    slug: "mosel-wein-nachts-bummel-2026",
    title: "Mosel-Wein-Nachts-Bummel 2026",
    eyebrow: "September",
    kind: "event",
    category: "wein",
    intro:
      "Eine Sommernacht entlang der Trierer Mosel-Promenade. Weinstaende der Region, Live-Musik, Lichtkunst entlang der Promenade.",
    description:
      "Trierer Mosel-Wein-Nachts-Bummel 2026 - Termin, Programm, Hotels nahe Mosel.",
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
    slug: "stadtmuseen-lange-nacht-2026",
    title: "Trierer Lange Nacht der Museen 2026",
    eyebrow: "Oktober",
    kind: "event",
    category: "kultur",
    intro:
      "Eine Nacht - alle Museen offen. Vom Rheinischen Landesmuseum ueber das Karl-Marx-Haus bis zum Spielzeugmuseum. Mit Shuttle-Bus.",
    description:
      "Trierer Lange Nacht der Museen 2026 - Programm, Tickets, alle Museen mit Shuttle-Bus.",
    longDesc:
      "Die Lange Nacht der Trierer Museen oeffnet alle staedtischen und kirchlichen Museen mit einem Kombi-Ticket. Sonderfuehrungen, Live-Programm, Shuttle-Service zwischen den Haeusern.",
    checkin: "2026-10-10",
    checkout: "2026-10-11",
    address: "Innenstadt Trier",
    lat: 49.7556,
    lng: 6.6435,
    radius: 2500,
  },

  // === SAISON-/BRUECKENTAG-LANDINGS (kind: "season") ===
  {
    slug: "silvester-2026",
    title: "Hotels in Trier zu Silvester 2026/27",
    eyebrow: "Silvester 2026",
    kind: "season",
    category: "saison",
    intro:
      "Silvester zwischen Porta Nigra und Mosel - Trier mit antiker Kulisse, Feuerwerk am Hauptmarkt und Late-Night-Weinstuben. Aktuelle Hotel-Preise und Verfuegbarkeit fuer die Jahreswende.",
    description:
      "Silvester in Trier 2026/27 - Live-Hotelpreise zwischen Porta Nigra und Mosel. Antike Kulisse, Weihnachtsmarkt bis 28. Dezember, Silvesterparty in Brauhaeusern und Weinstuben.",
    longDesc:
      "Trier zu Silvester ist eine ruhige Alternative zu Koeln oder Berlin: kein Massentourismus, dafuer Mosel-Wein, Weinstuben und antike Kulisse. Der Weihnachtsmarkt schliesst um den 28. Dezember, danach ist die Innenstadt noch festlich beleuchtet. Silvester selbst tobt am Hauptmarkt mit Live-Musik und Feuerwerk ueber der Konstantinbasilika.",
    checkin: "2026-12-30",
    checkout: "2027-01-02",
    address: "Hauptmarkt, Trier",
    lat: 49.7559,
    lng: 6.6420,
    radius: 2000,
    maxPricePerNight: 280,
  },
  {
    slug: "pfingsten-2026",
    title: "Hotels in Trier zu Pfingsten 2026",
    eyebrow: "Pfingstwochenende",
    kind: "season",
    category: "saison",
    intro:
      "Pfingsten in Trier - drei Tage Brueckentag mit perfekter Witterung fuer UNESCO-Sightseeing und Mosel-Radweg. Live-Hotelpreise fuer das verlaengerte Wochenende.",
    description:
      "Hotels in Trier zu Pfingsten 2026 - drei Tage Brueckenwochenende mit Mosel-Radweg, Antikenfestspielen-Vorlauf und UNESCO-Welterbe. Live-Preise.",
    longDesc:
      "Pfingsten ist Triers wettersichere Wochenend-Saison. Mosel-Radweg, Olewig-Weinwanderung und das vollstaendige UNESCO-Welterbe in drei Tagen - ohne Antikenfestspiel-Trubel. Pfingstmontag oft Stadtfuehrungen kostenlos.",
    checkin: "2026-05-23",
    checkout: "2026-05-25",
    address: "Trier",
    lat: 49.7567,
    lng: 6.6414,
    radius: 3000,
    maxPricePerNight: 220,
  },
  {
    slug: "himmelfahrt-2026",
    title: "Hotels in Trier zu Christi Himmelfahrt 2026",
    eyebrow: "Brueckentag Mai",
    kind: "season",
    category: "saison",
    intro:
      "Himmelfahrt-Brueckentag in Trier - vier Tage Mosel-Radweg, UNESCO-Welterbe und fruehe Weinprobe in Olewig. Live-Hotelpreise.",
    description:
      "Christi Himmelfahrt 2026 in Trier - vier Tage am Stueck dank Brueckenfreitag. Live-Hotelpreise und Reisetipps fuer den Mai-Brueckentag.",
    longDesc:
      "Christi Himmelfahrt bietet mit dem Brueckenfreitag vier Tage durchgehend. Der Mai ist die wettersicherste Saison fuer Mosel-Radweg-Touren und Olewig-Weinwanderungen - die Riesling-Pflanzen sind frisch ausgetrieben, die Lagen begehbar.",
    checkin: "2026-05-13",
    checkout: "2026-05-17",
    address: "Trier",
    lat: 49.7567,
    lng: 6.6414,
    radius: 3000,
    maxPricePerNight: 220,
  },
  {
    slug: "fronleichnam-2026",
    title: "Hotels in Trier zu Fronleichnam 2026",
    eyebrow: "Brueckentag Juni",
    kind: "season",
    category: "saison",
    intro:
      "Fronleichnam in Trier - vier Tage Brueckenwochenende mit Bischofsstadt-Programm, Altstadtfest-Vorlauf und Mosel-Promenade.",
    description:
      "Fronleichnam 2026 in Trier - Hotels fuer das katholische Brueckenwochenende. Bischofsstadt mit Prozession, Mosel-Promenade, fruehsommerliche Weinstuben.",
    longDesc:
      "Trier ist Bischofsstadt - Fronleichnam ist hier ein wirklicher Festtag mit Prozession durch die Innenstadt. Im Anschluss laeuft oft das Trierer Altstadtfest auf den Buehnen am Hauptmarkt. Vier Tage durchgehend, ideales Wetter.",
    checkin: "2026-06-04",
    checkout: "2026-06-07",
    address: "Trier Dom",
    lat: 49.7556,
    lng: 6.6435,
    radius: 2500,
    maxPricePerNight: 220,
  },
  {
    slug: "tag-der-deutschen-einheit-2026",
    title: "Hotels in Trier zum Tag der Deutschen Einheit 2026",
    eyebrow: "Brueckentag Oktober",
    kind: "season",
    category: "saison",
    intro:
      "3. Oktober in Trier - gold-warmer Mosel-Herbst, Weinlese in Olewig, Lange Nacht der Museen am 10. Oktober im Anschluss.",
    description:
      "Tag der Deutschen Einheit 2026 in Trier - Hotels fuer das Brueckenwochenende mit Olewiger Weinlese und Goldenem Oktober an der Mosel.",
    longDesc:
      "Der 3. Oktober faellt 2026 auf einen Samstag - perfekt fuer einen Mosel-Trip ohne Brueckentag-Planung. Die Olewiger Weinlese laeuft, das Wetter ist haeufig goldbrau, und am 10. Oktober folgt die Lange Nacht der Museen.",
    checkin: "2026-10-02",
    checkout: "2026-10-04",
    address: "Trier",
    lat: 49.7567,
    lng: 6.6414,
    radius: 3000,
    maxPricePerNight: 200,
  },
  {
    slug: "ostern-2026",
    title: "Hotels in Trier zu Ostern 2026",
    eyebrow: "Osterwochenende",
    kind: "season",
    category: "saison",
    intro:
      "Ostern in Trier - vier Tage Bischofsstadt-Programm, Osterprozession im Dom, fruehe Weinstuben in Olewig.",
    description:
      "Ostern 2026 in Trier - Hotels fuer das Vier-Tage-Brueckenwochenende. Karfreitag im Dom, Osterprozession, fruehe Mosel-Saison.",
    longDesc:
      "Trier ist Bischofsstadt - die Karfreitags-Liturgie und Oster-Prozession im Dom sind besondere Erlebnisse. Olewig oeffnet die Weinstuben in dieser Woche meist erstmals nach der Winterpause.",
    checkin: "2026-04-03",
    checkout: "2026-04-06",
    address: "Trier Dom",
    lat: 49.7556,
    lng: 6.6435,
    radius: 2500,
    maxPricePerNight: 220,
  },
  {
    slug: "wochenende",
    title: "Hotels fuer ein Wochenende in Trier",
    eyebrow: "Wochenendreise",
    kind: "season",
    category: "saison",
    intro:
      "Naechstes Wochenende Trier? Hier sind die aktuellen Live-Preise fuer ein klassisches Zwei-Naechte-Programm zwischen Porta Nigra und Mosel.",
    description:
      "Hotels in Trier fuers Wochenende - Live-Preise. UNESCO-Pflicht, Mosel-Promenade, Olewig in zwei Naechten.",
    longDesc:
      "Das klassische Trier-Wochenende: Anreise Freitagabend, Samstag UNESCO-Tour, Sonntag Olewig oder Mosel-Radweg, Abreise Sonntagnachmittag. Hier siehst du Preise und Verfuegbarkeit fuer das naechste verfuegbare Wochenende.",
    checkin: nextWeekend().checkin,
    checkout: nextWeekend().checkout,
    address: "Trier",
    lat: 49.7567,
    lng: 6.6414,
    radius: 2500,
    maxPricePerNight: 220,
  },
];

/**
 * Liefert das naechste Freitag-Sonntag-Wochenende relativ zu heute.
 * Wird beim Build evaluiert - Cron-Rebuild haelt das frisch.
 */
function nextWeekend(): { checkin: string; checkout: string } {
  const today = new Date();
  const day = today.getDay(); // 0=So, 5=Fr
  const daysUntilFriday = day <= 5 ? 5 - day : 6;
  const friday = new Date(today);
  friday.setDate(today.getDate() + daysUntilFriday);
  const sunday = new Date(friday);
  sunday.setDate(friday.getDate() + 2);
  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  return { checkin: fmt(friday), checkout: fmt(sunday) };
}

export const getEvent = (slug: string) =>
  events.find((e) => e.slug === slug);

export const isUpcoming = (event: CityEvent) =>
  new Date(event.checkout) >= new Date();

export const realEvents = events.filter((e) => (e.kind ?? "event") === "event");
export const seasonalStays = events.filter((e) => e.kind === "season");
