/**
 * Affiliate-Konfiguration trier-reisen.de
 */

export const affiliate = {
  stay22: {
    /** Stay22 lmaID — trier-reisen.de */
    lmaId: "687913400d1617d25ef77427",
    enabled: true,
    /** Optional vorkonfiguriertes Stay22-Map-Embed (Dashboard-ID). */
    mapEmbedId: "",
  },
  getYourGuide: {
    partnerId: "1UPZQQB", // Stark Marketing Partner-ID
    locale: "de-DE",
    enabled: true,
    cityQuery: "Trier",
  },
};

export const stay22Enabled =
  affiliate.stay22.enabled && affiliate.stay22.lmaId.length > 0;

export const gygEnabled =
  affiliate.getYourGuide.enabled && affiliate.getYourGuide.partnerId.length > 0;
