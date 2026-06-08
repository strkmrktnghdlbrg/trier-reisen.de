/**
 * Feature-Flags fuer trier-reisen.de
 * Off = Nav blendet aus, Pages werden ausgespart, Sitemap-Filter greift.
 */

export const features = {
  /** News-Pipeline. Off - Trier ist Reise-Magazin, keine Lokalpresse. */
  news: {
    enabled: false,
  },
  /** Reiseplaner-Guides - primaerer Top-Funnel fuer Trier. */
  reiseplaner: {
    enabled: true,
  },
  /** Werbung & Listings-Marktplatz. Off bis Stripe-Integration steht. */
  werben: {
    enabled: false,
  },
  /** Branchen-Verzeichnis (Phase 2 - Premium-Listings 49/149). */
  branchen: {
    enabled: false,
  },
  /** Events-Hub. On - Antikenfestspiele, Olewiger Weinfest, Weihnachtsmarkt. */
  events: {
    enabled: true,
  },
};
