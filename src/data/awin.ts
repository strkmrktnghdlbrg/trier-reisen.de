/**
 * AWIN-Affiliate-Konfiguration trier-reisen.de
 * ============================================================
 *
 * SO AKTIVIERST DU AWIN (zwei Schritte):
 *
 *  1) Publisher-ID eintragen:  awin.publisherId = "DEINE_AWIN_AFFID"
 *     (zu finden im AWIN-Dashboard unter Account -> Publisher-ID / "awinaffid").
 *     Solange leer, geben alle Helfer den unveraenderten Ziel-Link zurueck
 *     (Links funktionieren also schon vor der Annahme, tracken nur noch nicht).
 *
 *  2) Pro Merchant, bei dem du ANGENOMMEN wurdest: `active: true` setzen.
 *     Die Merchant-IDs (awinmid) sind bereits vorausgefuellt - sie entsprechen
 *     der Nummer in der AWIN-Merchant-Profil-URL (ui.awin.com/merchant-profile/<ID>).
 *     Bitte im Dashboard gegenpruefen, falls AWIN eine ID aendert.
 *
 * Deeplink-Format (Helper in src/lib/awin.ts):
 *   https://www.awin1.com/cread.php?awinmid=<MID>&awinaffid=<AFFID>&ued=<ZIEL-URL>&clickref=<REF>
 */

export type AwinMerchant = {
  /** Anzeigename. */
  name: string;
  /** AWIN-Advertiser-ID (awinmid). Aus der Merchant-Profil-URL. */
  mid: string;
  /** Merchant-Startseite (Default-Deeplink-Ziel, falls kein url uebergeben wird). */
  homepage: string;
  /** Reise-Intent / Kategorie auf der Seite. */
  intent:
    | "anreise"
    | "mietwagen"
    | "wein"
    | "tickets"
    | "ferienunterkunft"
    | "pauschal"
    | "versicherung";
  /** Erst auf true setzen, wenn das Programm dich angenommen hat. */
  active: boolean;
  /** Provisions-Notiz (Stand Recherche, im Dashboard verbindlich). */
  commission: string;
  /** Relevanz fuer ein Trier/Mosel-Portal. */
  relevance: "high" | "medium" | "low";
  /** AWIN-Profil zum Bewerben. */
  applyUrl: string;
};

export const awin = {
  /** AWIN-Publisher-ID (awinaffid). Einmal eintragen, dann tracken alle Links. */
  publisherId: "",
  /** Master-Schalter. */
  enabled: true,
  /** Standard-clickref fuer Sub-Tracking (pro Platzierung ueberschreibbar). */
  defaultClickref: "trier-reisen",

  /**
   * Recherchierte, auf AWIN bestaetigte Programme. MID = AWIN-Advertiser-ID.
   * Alle vorerst active:false - nach Annahme einzeln auf true stellen.
   */
  merchants: {
    // === ANREISE / TRANSPORT ===
    "deutsche-bahn": {
      name: "Deutsche Bahn (bahn.de)",
      mid: "14964",
      homepage: "https://www.bahn.de/",
      intent: "anreise",
      active: false,
      commission: "Provision auf Ticketwert (Dashboard)",
      relevance: "high",
      applyUrl: "https://ui.awin.com/merchant-profile/14964",
    },
    "bahncard": {
      name: "BahnCard",
      mid: "13853",
      homepage: "https://www.bahn.de/angebot/bahncard",
      intent: "anreise",
      active: false,
      commission: "ca. 4% auf BahnCard-Buchung",
      relevance: "medium",
      applyUrl: "https://ui.awin.com/merchant-profile/13853",
    },
    "flixbus": {
      name: "FlixBus & FlixTrain DE",
      mid: "13945",
      homepage: "https://www.flixbus.de/",
      intent: "anreise",
      active: false,
      commission: "Provision pro Buchung (Dashboard)",
      relevance: "high",
      applyUrl: "https://ui.awin.com/merchant-profile/13945",
    },

    // === MOSEL-WEIN ===
    "hawesko": {
      name: "Hawesko",
      mid: "14179",
      homepage: "https://www.hawesko.de/",
      intent: "wein",
      active: false,
      commission: "bis ca. 8-12% pro Sale",
      relevance: "high",
      applyUrl: "https://ui.awin.com/merchant-profile/14179",
    },
    "vinos": {
      name: "Wein & Vinos",
      mid: "14587",
      homepage: "https://www.vinos.de/",
      intent: "wein",
      active: false,
      commission: "8-12% gestaffelt + 5 EUR Neukunde",
      relevance: "medium",
      applyUrl: "https://ui.awin.com/merchant-profile-terms/14587",
    },

    // === TICKETS / ERLEBNISSE ===
    "tiqets": {
      name: "Tiqets",
      mid: "8616",
      homepage: "https://www.tiqets.com/de/",
      intent: "tickets",
      active: false,
      commission: "Provision auf Ticketwert (Dashboard)",
      relevance: "high",
      applyUrl: "https://ui.awin.com/merchant-profile-terms/8616",
    },
    "getyourguide": {
      name: "GetYourGuide (AWIN)",
      mid: "18925",
      homepage: "https://www.getyourguide.de/",
      intent: "tickets",
      active: false,
      commission: "Provision auf Buchung (Dashboard)",
      relevance: "medium",
      applyUrl: "https://ui.awin.com/merchant-profile/18925",
    },

    // === FERIENUNTERKUENFTE ===
    "hometogo": {
      name: "HomeToGo DE/AT",
      mid: "27944",
      homepage: "https://www.hometogo.de/",
      intent: "ferienunterkunft",
      active: false,
      commission: "Provision pro Buchung (Dashboard)",
      relevance: "high",
      applyUrl: "https://ui.awin.com/merchant-profile/27944",
    },
    "e-domizil": {
      name: "e-domizil",
      mid: "9160",
      homepage: "https://www.e-domizil.de/",
      intent: "ferienunterkunft",
      active: false,
      commission: "Provision pro Buchung (Dashboard)",
      relevance: "medium",
      applyUrl: "https://ui.awin.com/merchant-profile/9160",
    },

    // === PAUSCHAL / BAHN+HOTEL ===
    "ameropa": {
      name: "Ameropa-Reisen (Bahn + Hotel)",
      mid: "69168",
      homepage: "https://www.ameropa.de/",
      intent: "pauschal",
      active: false,
      commission: "Provision auf Reisewert (Dashboard)",
      relevance: "medium",
      applyUrl: "https://ui.awin.com/merchant-profile/69168",
    },
    "ab-in-den-urlaub": {
      name: "ab-in-den-urlaub.de",
      mid: "9369",
      homepage: "https://www.ab-in-den-urlaub.de/",
      intent: "pauschal",
      active: false,
      commission: "Provision pro Buchung (Dashboard)",
      relevance: "low",
      applyUrl: "https://ui.awin.com/merchant-profile/9369",
    },

    // === REISEVERSICHERUNG ===
    "hansemerkur": {
      name: "HanseMerkur Reiseversicherung",
      mid: "11705",
      homepage: "https://www.hmrv.de/",
      intent: "versicherung",
      active: false,
      commission: "12-15% CPO (bis ca. 75 EUR/Sale)",
      relevance: "medium",
      applyUrl: "https://ui.awin.com/merchant-profile/11705",
    },
  } satisfies Record<string, AwinMerchant>,
};

export type AwinMerchantKey = keyof typeof awin.merchants;
