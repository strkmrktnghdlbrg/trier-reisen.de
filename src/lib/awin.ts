/**
 * AWIN-Deeplink-Helper trier-reisen.de
 * ============================================================
 *
 * `awinDeeplink()` baut einen getrackten AWIN-cread.php-Link. Solange die
 * Publisher-ID fehlt oder der Merchant nicht `active` ist, wird der ROHE
 * Ziel-Link zurueckgegeben - Links sind also nie kaputt, sie tracken vor der
 * Programm-Annahme nur noch nicht.
 *
 * Beispiel:
 *   import { awinDeeplink } from "../lib/awin";
 *   const href = awinDeeplink("hawesko", "https://www.hawesko.de/mosel-riesling");
 */

import { awin, type AwinMerchantKey } from "../data/awin";

const AWIN_BASE = "https://www.awin1.com/cread.php";

/** Ist AWIN global einsatzbereit (Publisher-ID gesetzt)? */
export const awinEnabled = awin.enabled && awin.publisherId.trim().length > 0;

/** Merchant-Eintrag holen (oder undefined). */
export const getAwinMerchant = (key: AwinMerchantKey) => awin.merchants[key];

/** Ist dieser Merchant getrackt nutzbar (global aktiv, Merchant aktiv, MID gesetzt)? */
export const isAwinMerchantActive = (key: AwinMerchantKey): boolean => {
  const m = awin.merchants[key];
  return awinEnabled && !!m && m.active && m.mid.trim().length > 0;
};

export type AwinLinkOptions = {
  /** Ziel-URL beim Merchant. Default: dessen Homepage. */
  url?: string;
  /** Sub-Tracking-Label. Default: awin.defaultClickref. */
  clickref?: string;
};

/**
 * Baut einen AWIN-Deeplink. Faellt auf die rohe Ziel-URL zurueck, wenn AWIN
 * (noch) nicht scharfgeschaltet ist - so funktioniert der Link immer.
 */
export function awinDeeplink(key: AwinMerchantKey, options: AwinLinkOptions = {}): string {
  const merchant = awin.merchants[key];
  const target = options.url ?? merchant?.homepage ?? "";

  // Fallback: roher Link, solange nicht getrackt nutzbar.
  if (!merchant || !isAwinMerchantActive(key)) {
    return target;
  }

  const params = new URLSearchParams({
    awinmid: merchant.mid,
    awinaffid: awin.publisherId,
    ued: target,
  });

  const clickref = (options.clickref ?? awin.defaultClickref).trim();
  if (clickref) params.set("clickref", clickref);

  return `${AWIN_BASE}?${params.toString()}`;
}

/** Alle Merchants eines Intents (z. B. "wein") als Array. */
export function awinMerchantsByIntent(intent: string) {
  return (Object.keys(awin.merchants) as AwinMerchantKey[])
    .map((key) => ({ key, ...awin.merchants[key] }))
    .filter((m) => m.intent === intent);
}
