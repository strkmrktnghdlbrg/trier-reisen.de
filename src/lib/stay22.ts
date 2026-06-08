/**
 * Stay22 Direct Travel API - Helper für trier-reisen.de
 * ------------------------------------------------------
 * Build-Time-Fetch von Live-Hotel-Daten via /v1/accommodations.
 *
 * Patterns:
 *   - X-API-Key Header
 *   - 60min HTTP-Caching erlaubt (KEIN persistenter DB-Storage)
 *   - GitHub-Action-Cron alle 6h triggert Rebuild
 *
 * QUIRK: Die API antwortet HTTP 400 bei Umlauten in `address`.
 * Trier hat keine Umlaute - daher fuer Stadt-Searches "Trier, Germany"
 * direkt verwendbar. Bezirke wie "Trier-Süd" werden hier transparent
 * zu "Trier-Sued" gemappt.
 *
 * Env-Var: STAY22_API_KEY
 *   Wenn nicht gesetzt: Helper gibt null zurueck (graceful degradation).
 *
 * Schema-Normalisierung:
 *   Die Roh-Antwort hat verschachtelte Felder. Wir flachen das im Helper
 *   zu einer einheitlichen `Stay22Accommodation` ab.
 */

export interface Stay22Accommodation {
  id?: string;
  name: string;
  type?: string;
  image?: string;
  /** Vollstaendige Affiliate-URL inkl. lmaID. */
  link?: string;
  rating?: {
    /** 0-10. */
    score?: number;
    count?: number;
  };
  starRating?: number;
  price?: {
    total?: number;
    perNight?: number;
    currency?: string;
    formattedTotal?: string;
    formattedPerNight?: string;
  };
  address?: {
    full?: string;
    cityName?: string;
    areaName?: string;
  };
  distance?: number;
  geo?: { lat?: number; lng?: number };
  policies?: { freeCancellation?: boolean; instantBook?: boolean };
}

export interface Stay22SearchOptions {
  provider?: "booking" | "expedia" | "vrbo" | "hotelscom";
  address?: string;
  lat?: number;
  lng?: number;
  radius?: number;
  type?: string;
  minguestrating?: number;
  minstarrating?: number;
  min?: number;
  max?: number;
  limit?: number;
  currency?: string;
  lang?: string;
  checkin?: string;
  checkout?: string;
  adults?: number;
  children?: number;
  rooms?: number;
  campaign?: string;
  aid?: string;
}

const API_BASE = "https://api.stay22.com/v1";

/**
 * Build-Time-Cache + Throttle.
 * - Cache: gleicher URL = gleiche Antwort, kein Re-Fetch (Bezirke, Sights, Events teilen sich oft Geo-Koordinaten).
 * - Throttle: max 3 concurrent in-flight Requests, 250ms Spacing, exponential Backoff bei 429.
 */
const responseCache = new Map<string, Stay22Accommodation[] | null>();
const inFlight = new Map<string, Promise<Stay22Accommodation[] | null>>();

class Semaphore {
  private queue: (() => void)[] = [];
  private active = 0;
  constructor(private max: number) {}
  async acquire(): Promise<() => void> {
    if (this.active < this.max) {
      this.active++;
      return () => this.release();
    }
    return new Promise<() => void>((resolve) => {
      this.queue.push(() => {
        this.active++;
        resolve(() => this.release());
      });
    });
  }
  private release() {
    this.active--;
    const next = this.queue.shift();
    if (next) next();
  }
}
// Cloudflare 1015 Rate-Limit ist scharf - 1 Request sequenziell + langes Pacing.
const semaphore = new Semaphore(1);
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Rundet Lat/Lng auf 2 Dezimalen (~1 km Precision). Nahe beieinander liegende
 * Sights/Bezirke teilen sich dann denselben Cache-Eintrag. Bei einem 1500m-Radius
 * ist die Verlust an Genauigkeit irrelevant.
 */
function roundGeo(value: number | undefined): number | undefined {
  return value === undefined ? undefined : Math.round(value * 100) / 100;
}

function getApiKey(): string | null {
  // @ts-expect-error - import.meta.env existiert in Astro/Vite
  const viteKey = typeof import.meta !== "undefined" ? import.meta.env?.STAY22_API_KEY : undefined;
  const nodeKey = typeof process !== "undefined" ? process.env?.STAY22_API_KEY : undefined;
  const key = viteKey || nodeKey;
  return typeof key === "string" && key.length > 0 ? key : null;
}

function formatPrice(amount: number | undefined, currency: string = "EUR"): string | undefined {
  if (amount === undefined || amount === null || Number.isNaN(amount)) return undefined;
  const symbol = currency === "EUR" ? "€" : currency === "USD" ? "$" : currency;
  const rounded = Math.round(amount);
  return `${rounded.toLocaleString("de-DE")} ${symbol}`;
}

function normalize(
  raw: any,
  meta: { nights?: number; currency?: string } = {},
): Stay22Accommodation {
  const currency = meta.currency || raw?.price?.currency || "EUR";
  const total: number | undefined = raw?.price?.total;
  const perNight =
    total !== undefined && meta.nights && meta.nights > 0
      ? total / meta.nights
      : undefined;

  return {
    id: raw?.id ? String(raw.id) : undefined,
    name: raw?.name ?? "",
    type: raw?.type,
    image: raw?.media?.thumbnail,
    link: raw?.links?.url,
    rating: raw?.rating
      ? { score: raw.rating.value, count: raw.rating.count }
      : undefined,
    starRating: raw?.rating?.hotelStars,
    price: {
      total,
      perNight,
      currency,
      formattedTotal: formatPrice(total, currency),
      formattedPerNight: formatPrice(perNight, currency),
    },
    address: raw?.location
      ? {
          full: raw.location.address,
          cityName: raw.location.cityName,
          areaName: raw.location.areaName,
        }
      : undefined,
    distance: raw?.location?.distanceInMeters,
    geo: raw?.location?.coordinates
      ? { lat: raw.location.coordinates.lat, lng: raw.location.coordinates.lng }
      : undefined,
    policies: raw?.policies,
  };
}

export async function searchAccommodations(
  options: Stay22SearchOptions,
): Promise<Stay22Accommodation[] | null> {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn("[stay22] STAY22_API_KEY env var fehlt - Live-Hotels werden uebersprungen.");
    return null;
  }

  const minGuest = options.minguestrating;
  const minStar = options.minstarrating;
  const userLimit = options.limit ?? 10;

  const safeOptions: Stay22SearchOptions = { ...options };
  delete safeOptions.minguestrating;
  delete safeOptions.minstarrating;
  if (minGuest || minStar) {
    safeOptions.limit = Math.max(userLimit * 4, 40);
  }
  if (typeof safeOptions.address === "string") {
    safeOptions.address = safeOptions.address
      .replace(/ä/g, "ae")
      .replace(/ö/g, "oe")
      .replace(/ü/g, "ue")
      .replace(/Ä/g, "Ae")
      .replace(/Ö/g, "Oe")
      .replace(/Ü/g, "Ue")
      .replace(/ß/g, "ss");
  }
  // Geo rounden → bessere Cache-Hit-Quote
  safeOptions.lat = roundGeo(safeOptions.lat);
  safeOptions.lng = roundGeo(safeOptions.lng);

  const params = new URLSearchParams();
  Object.entries(safeOptions).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") {
      params.set(k, String(v));
    }
  });

  const url = `${API_BASE}/accommodations?${params.toString()}`;

  // Cache-Treffer: identische URL = identische Antwort
  if (responseCache.has(url)) {
    const cached = responseCache.get(url) ?? null;
    if (cached === null) return null;
    return applyFilters(cached, minGuest, minStar, userLimit);
  }
  // Deduplizierung: wenn dieselbe URL bereits in-flight ist, warte auf das Ergebnis
  if (inFlight.has(url)) {
    const shared = await inFlight.get(url)!;
    if (shared === null) return null;
    return applyFilters(shared, minGuest, minStar, userLimit);
  }

  const fetchPromise = (async (): Promise<Stay22Accommodation[] | null> => {
    const release = await semaphore.acquire();
    try {
      let attempt = 0;
      const maxAttempts = 4;
      while (attempt < maxAttempts) {
        attempt++;
        const res = await fetch(url, {
          headers: { "X-API-Key": apiKey, Accept: "application/json" },
        });

        if (res.status === 429) {
          // Cloudflare Rate Limit - exponential backoff
          const wait = 800 * Math.pow(2, attempt - 1);
          if (attempt < maxAttempts) {
            console.warn(`[stay22] 429 - Retry in ${wait}ms (Versuch ${attempt}/${maxAttempts})`);
            await sleep(wait);
            continue;
          }
          console.error(`[stay22] 429 nach ${maxAttempts} Versuchen - gebe auf fuer ${options.address ?? "lat/lng"}`);
          return null;
        }

        if (!res.ok) {
          const body = await res.text().catch(() => "");
          console.error(
            `[stay22] API ${res.status} fuer ${options.address ?? "lat/lng-search"}: ${body.slice(0, 200)}`,
          );
          return null;
        }

        const data = (await res.json()) as
          | { results?: any[]; meta?: { nights?: number; currency?: string } }
          | any[];
        const results = Array.isArray(data) ? data : data.results ?? [];
        const meta = !Array.isArray(data) ? data.meta : undefined;
        const normalized = results.map((r: any) => normalize(r, meta || {}));

        // 500 ms Pacing zwischen freigegebenen Requests
        await sleep(500);
        return normalized;
      }
      return null;
    } catch (err) {
      console.error("[stay22] Fetch fehlgeschlagen:", err);
      return null;
    } finally {
      release();
    }
  })();

  inFlight.set(url, fetchPromise);
  const raw = await fetchPromise;
  inFlight.delete(url);
  responseCache.set(url, raw);

  if (raw === null) return null;
  return applyFilters(raw, minGuest, minStar, userLimit);
}

function applyFilters(
  hotels: Stay22Accommodation[],
  minGuest: number | undefined,
  minStar: number | undefined,
  limit: number,
): Stay22Accommodation[] {
  let out = hotels;
  if (minGuest !== undefined) {
    out = out.filter((h) => (h.rating?.score ?? 0) >= minGuest);
  }
  if (minStar !== undefined) {
    out = out.filter((h) => (h.starRating ?? 0) >= minStar);
  }
  return out.slice(0, limit);
}

/**
 * Top-Hotels nach Adresse + Bewertung.
 */
export async function getTopHotels(
  address: string,
  lmaId: string,
  opts: Partial<Stay22SearchOptions> = {},
): Promise<Stay22Accommodation[] | null> {
  return searchAccommodations({
    provider: "booking",
    address,
    type: "hotel",
    minguestrating: 8.0,
    minstarrating: 3,
    limit: 12,
    currency: "EUR",
    lang: "de",
    aid: lmaId,
    campaign: lmaId,
    ...opts,
  });
}

/**
 * Nearby-Hotels per Lat/Lng - fuer Sight-/Bezirk-/Event-Detail-Pages.
 */
export async function getNearbyHotels(
  lat: number,
  lng: number,
  lmaId: string,
  opts: Partial<Stay22SearchOptions> = {},
): Promise<Stay22Accommodation[] | null> {
  return searchAccommodations({
    provider: "booking",
    lat,
    lng,
    radius: 1500,
    type: "hotel",
    minguestrating: 7.5,
    limit: 4,
    currency: "EUR",
    lang: "de",
    aid: lmaId,
    campaign: lmaId,
    ...opts,
  });
}
