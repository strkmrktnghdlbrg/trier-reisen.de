/**
 * Branchenverzeichnis Trier - Datenmodell fuer /branchenverzeichnis/ und /werben/.
 *
 * Drei Quellen, eine Taxonomie:
 *   1. PORTAL   - kostenloser Eintrag aus vorhandenen redaktionellen Inhalten
 *      (Restaurants, Hotels, Apotheken, Banken). Rein alphabetisch, ohne Logo,
 *      ohne Beschreibung. Verlinkt auf die bestehende Detailseite.
 *   2. OSM      - OpenStreetMap ueber die Overpass API (partners.osm.json).
 *      Datenpflege: node scripts/fetch-osm-partners.mjs --write
 *      Die Daten stehen unter der ODbL, die Namensnennung ist Pflicht und
 *      laeuft ueber src/components/OsmAttribution.astro. OSM-Eintraege sind
 *      reine Listings auf den Kategorie-Seiten: KEINE eigene Detailseite,
 *      KEIN Detail-Link, KEIN ausgehender Website-Link.
 *   3. PREMIUM  - kostenpflichtig (199 EUR/Jahr netto, B2B). Steht in seiner
 *      Kategorie ganz oben, mit Logo-Initialen, Beschreibung, Kontakt-Buttons
 *      und DOFOLLOW-Backlink. Bleibt leer, bis wirklich jemand bucht.
 *
 * Redaktionsregeln:
 *   - Nur reale Betriebe aus belegten Quellen. Keine erfundenen Firmen.
 *   - Keine erfundenen Bewertungen, keine Test-/Testsieger-Claims (§ 5a UWG).
 *   - Restaurants und Hotels bekommen KEINE zweite Detailseite, sondern
 *     verlinken auf ihre bestehende Seite (kein Duplicate Content).
 *   - Keine E-Mail-Adressen im Klartext.
 */
import { publishedRestaurants as restaurants } from "./restaurants";
import { hotels } from "./hotels";
import { getDistrict } from "./districts";
import osmRaw from "./partners.osm.json";
import { isOsmBlocked } from "./osm-blocklist";

export type BranchenCategory = {
  slug: string;
  name: string;
  description: string;
};

export type ListingSource = "portal" | "osm" | "premium";

export type Listing = {
  slug: string;
  name: string;
  /** Kategorie-Slug aus branchenCategories. */
  category: string;
  /** Feines Branchen-Label innerhalb der Kategorie, z. B. "Baeckerei". */
  label?: string;
  address?: string;
  district?: string;
  districtLabel?: string;
  phone?: string;
  /** Externe Website. Frei = kein Link. Premium = dofollow. */
  website?: string;
  email?: string;
  description?: string;
  /** Interne Detailseite, falls der Betrieb bereits eine hat. OSM: nie. */
  href?: string;
  premium?: boolean;
  plan?: "free" | "premium";
  /** true = vom Betrieb bestaetigt. Portal- und OSM-Eintraege: false. */
  verified?: boolean;
  source?: ListingSource;
  /** Beitrag dieses Portals, aus dem der Eintrag stammt. */
  sourcePath?: string;
};

export const branchenCategories: BranchenCategory[] = [
  {
    slug: "gastronomie",
    name: "Gastronomie",
    description:
      "Restaurants, Weinstuben und Cafés in Trier - von der Sterneküche bis zur Straußwirtschaft in Olewig.",
  },
  {
    slug: "hotels",
    name: "Hotels & Übernachtung",
    description:
      "Hotels, Gästehäuser und Apartments in Trier, von der Innenstadt bis ins Moseltal.",
  },
  {
    slug: "apotheken",
    name: "Apotheken & Gesundheit",
    description:
      "Apotheken, Praxen und Gesundheitsdienstleister in den Trierer Stadtteilen.",
  },
  {
    slug: "banken",
    name: "Banken & Finanzen",
    description:
      "Filialbanken, Sparkassen und Finanzdienstleister zwischen Hauptmarkt und Trier-Nord.",
  },
  {
    slug: "weingueter",
    name: "Weingüter & Weinhandel",
    description:
      "Weingüter, Straußwirtschaften und Weinhandlungen an Mosel, Saar und Ruwer.",
  },
  {
    slug: "handwerk",
    name: "Handwerk & Bau",
    description:
      "Handwerksbetriebe aus Trier: Elektro, Sanitär, Heizung, Maler und Bauunternehmen.",
  },
  {
    slug: "dienstleistung",
    name: "Dienstleistung & Beratung",
    description:
      "Agenturen, Kanzleien und Beratungsunternehmen aus Trier und der Region Trier-Saarburg.",
  },
  {
    slug: "einzelhandel",
    name: "Einzelhandel & Shopping",
    description:
      "Inhabergeführte Geschäfte, Fachhandel und Boutiquen in der Fußgängerzone und den Stadtteilen.",
  },
  {
    slug: "freizeit",
    name: "Freizeit & Sport",
    description:
      "Fitnessstudios, Tanzschulen, Kinos, Bühnen und Sportanlagen in Trier und den Stadtteilen.",
  },
];

export const getBranchenCategory = (slug: string) =>
  branchenCategories.find((c) => c.slug === slug);

/**
 * Premium-Partner. Bewusst leer, solange kein Partner gebucht hat - es werden
 * keine Beispiel-Firmen als echte Eintraege ausgegeben.
 */
export const premiumPartners: Listing[] = [];

/**
 * Kuratierte kostenlose Eintraege aus vorhandenen Ratgebern dieses Portals.
 * Adressen wortgleich aus dem jeweiligen Beitrag, Angaben ohne Gewaehr.
 */
const kuratiert: Listing[] = [
  // === Apotheken (Quelle: /apotheken-trier/) ===
  { slug: "loewen-apotheke-trier", name: "Löwen-Apotheke", category: "apotheken", label: "Apotheke", address: "Hauptmarkt 6, 54290 Trier", districtLabel: "Innenstadt", sourcePath: "/apotheken-trier/" },
  { slug: "viehmarkt-apotheke", name: "Viehmarkt-Apotheke", category: "apotheken", label: "Apotheke", address: "Viehmarktplatz, 54290 Trier", districtLabel: "Innenstadt", sourcePath: "/apotheken-trier/" },

  // === Banken (Quelle: /banken-in-trier/) ===
  { slug: "sparkasse-trier", name: "Sparkasse Trier", category: "banken", label: "Bank & Sparkasse", address: "Theodor-Heuss-Allee 1, 54292 Trier", districtLabel: "Trier-Nord", sourcePath: "/banken-in-trier/" },
  { slug: "volksbank-trier-eifel", name: "Volksbank Trier Eifel", category: "banken", label: "Bank & Sparkasse", address: "Viehmarktplatz 7, 54290 Trier", districtLabel: "Innenstadt", sourcePath: "/banken-in-trier/" },
  { slug: "deutsche-bank-trier", name: "Deutsche Bank", category: "banken", label: "Bank & Sparkasse", address: "Hosenstraße 20, 54290 Trier", districtLabel: "Innenstadt", sourcePath: "/banken-in-trier/" },
  { slug: "commerzbank-trier", name: "Commerzbank", category: "banken", label: "Bank & Sparkasse", address: "Brotstraße 24, 54290 Trier", districtLabel: "Innenstadt", sourcePath: "/banken-in-trier/" },
  { slug: "postbank-trier", name: "Postbank", category: "banken", label: "Bank & Sparkasse", address: "Simeonstraße 11, 54290 Trier", districtLabel: "Innenstadt", sourcePath: "/banken-in-trier/" },
  { slug: "targobank-trier", name: "Targobank", category: "banken", label: "Bank & Sparkasse", address: "Grabenstraße 12, 54290 Trier", districtLabel: "Innenstadt", sourcePath: "/banken-in-trier/" },
  { slug: "hypovereinsbank-trier", name: "HypoVereinsbank", category: "banken", label: "Bank & Sparkasse", address: "Sichelstraße 2A, 54290 Trier", districtLabel: "Innenstadt", sourcePath: "/banken-in-trier/" },
  { slug: "santander-trier", name: "Santander", category: "banken", label: "Bank & Sparkasse", address: "Konstantinstraße 8-10, 54290 Trier", districtLabel: "Innenstadt", sourcePath: "/banken-in-trier/" },
];

const ausRestaurants = (): Listing[] =>
  restaurants.map((r) => ({
    slug: `restaurant-${r.slug}`,
    name: r.name,
    category: "gastronomie",
    label: "Restaurant",
    district: r.district,
    districtLabel: getDistrict(r.district)?.name,
    href: `/restaurants/${r.slug}/`,
    sourcePath: "/restaurants/",
  }));

const ausHotels = (): Listing[] =>
  hotels.map((h) => ({
    slug: `hotel-${h.slug}`,
    name: h.name,
    category: "hotels",
    label: "Hotel",
    district: h.district,
    districtLabel: getDistrict(h.district)?.name,
    href: `/hotels/${h.slug}/`,
    sourcePath: "/hotels/",
  }));

/**
 * OpenStreetMap-Betriebe (ODbL). Erzeugt von scripts/fetch-osm-partners.mjs
 * aus der Relation 172679 (kreisfreie Stadt Trier). Reine Listings: kein href,
 * keine Detailseite, kein Website-Link, keine E-Mail. Die Attribution ist
 * Pflicht und steht auf der Verzeichnis-Startseite sowie auf jeder
 * Kategorie-Seite mit OSM-Daten.
 */
type OsmRaw = {
  name: string;
  slug: string;
  category: string;
  label: string;
  street?: string;
  zip?: string;
  city?: string;
  phone?: string;
  website?: string;
  osmId?: string;
};

/**
 * Sperrliste (src/data/osm-blocklist.json): Betriebe, die ihre Loeschung
 * verlangt haben, werden hier ein zweites Mal herausgefiltert - auch dann,
 * wenn partners.osm.json noch veraltet ist.
 */
export const osmPartners: Listing[] = (osmRaw as OsmRaw[])
  .filter((p) => !isOsmBlocked({ osmId: p.osmId, name: p.name, street: p.street }))
  .map((p) => ({
    slug: p.slug,
    name: p.name,
    category: p.category,
    label: p.label,
    address: [p.street, [p.zip, p.city || "Trier"].filter(Boolean).join(" ")]
      .filter(Boolean)
      .join(", "),
    phone: p.phone || undefined,
    website: p.website || undefined,
    plan: "free",
    verified: false,
    source: "osm",
  }));

const collator = new Intl.Collator("de", { sensitivity: "base" });

const portalListings = (): Listing[] =>
  [...kuratiert, ...ausRestaurants(), ...ausHotels()].map((l) => ({
    ...l,
    plan: "free" as const,
    verified: false,
    source: "portal" as const,
  }));

export const allListings = (): Listing[] => {
  const frei = [...portalListings(), ...osmPartners].sort((a, b) =>
    collator.compare(a.name, b.name)
  );
  return [...premiumPartners, ...frei];
};

export const listingsByCategory = (category: string): Listing[] => {
  const alle = allListings().filter((l) => l.category === category);
  return [...alle.filter((l) => l.premium), ...alle.filter((l) => !l.premium)];
};

/**
 * Mindestgroesse, ab der ein Branchen-Label eine eigene Rubrik auf der
 * Kategorie-Seite bekommt. Kleinere Labels laufen unter "Weitere Betriebe"
 * mit - so entstehen keine duennen Ein-Eintrag-Rubriken.
 */
export const GROUP_MIN = 5;

/** Freie Eintraege einer Kategorie nach Branchen-Label gebuendelt, groesste zuerst. */
export const listingGroups = (
  category: string
): { label: string; listings: Listing[] }[] => {
  const buckets = new Map<string, Listing[]>();
  for (const l of listingsByCategory(category)) {
    if (l.premium) continue;
    const key = l.label || "Weitere Betriebe";
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key)!.push(l);
  }

  const gross: { label: string; listings: Listing[] }[] = [];
  const rest: Listing[] = [];
  for (const [label, listings] of buckets) {
    if (label !== "Weitere Betriebe" && listings.length >= GROUP_MIN) {
      gross.push({ label, listings });
    } else {
      rest.push(...listings);
    }
  }
  gross.sort(
    (a, b) =>
      b.listings.length - a.listings.length || collator.compare(a.label, b.label)
  );
  if (rest.length > 0) {
    rest.sort((a, b) => collator.compare(a.name, b.name));
    gross.push({ label: "Weitere Betriebe", listings: rest });
  }
  return gross;
};

/** Zeigt diese Kategorie OSM-Daten? Dann ist die ODbL-Attribution Pflicht. */
export const categoryHasOsm = (category: string) =>
  osmPartners.some((l) => l.category === category);

export const categoryCount = (category: string) =>
  allListings().filter((l) => l.category === category).length;

export const totalListings = () => allListings().length;

export const osmCount = () => osmPartners.length;
