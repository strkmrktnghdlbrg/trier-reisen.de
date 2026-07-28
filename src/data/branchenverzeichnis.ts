/**
 * Branchenverzeichnis Trier - Datenmodell fuer /branchenverzeichnis/ und /werben/.
 *
 * Zwei Stufen:
 *   1. Kostenloser Eintrag  - aus vorhandenen redaktionellen Inhalten erzeugt
 *      (Restaurants, Hotels, Apotheken, Banken). Rein alphabetisch, ohne Logo,
 *      ohne Beschreibung, ohne Link. "Angaben ohne Gewaehr".
 *   2. Premium-Partner      - kostenpflichtig (199 EUR/Jahr netto, B2B).
 *      Steht in seiner Kategorie ganz oben, mit Logo-Initialen, Beschreibung,
 *      Website-/E-Mail-Button und DOFOLLOW-Backlink.
 *
 * Redaktionsregeln:
 *   - Nur reale, bereits im Portal belegte Betriebe. Keine erfundenen Firmen.
 *   - Keine erfundenen Bewertungen, keine Test-/Testsieger-Claims (§ 5a UWG).
 *   - Restaurants und Hotels bekommen KEINE zweite Detailseite, sondern
 *     verlinken auf ihre bestehende Seite (kein Duplicate Content).
 */
import { restaurants } from "./restaurants";
import { hotels } from "./hotels";
import { getDistrict } from "./districts";

export type BranchenCategory = {
  slug: string;
  name: string;
  description: string;
};

export type Listing = {
  slug: string;
  name: string;
  category: string;
  address?: string;
  district?: string;
  districtLabel?: string;
  phone?: string;
  website?: string;
  email?: string;
  description?: string;
  href?: string;
  premium?: boolean;
  source?: string;
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
  { slug: "loewen-apotheke-trier", name: "Löwen-Apotheke", category: "apotheken", address: "Hauptmarkt 6, 54290 Trier", districtLabel: "Innenstadt", source: "/apotheken-trier/" },
  { slug: "viehmarkt-apotheke", name: "Viehmarkt-Apotheke", category: "apotheken", address: "Viehmarktplatz, 54290 Trier", districtLabel: "Innenstadt", source: "/apotheken-trier/" },

  // === Banken (Quelle: /banken-in-trier/) ===
  { slug: "sparkasse-trier", name: "Sparkasse Trier", category: "banken", address: "Theodor-Heuss-Allee 1, 54292 Trier", districtLabel: "Trier-Nord", source: "/banken-in-trier/" },
  { slug: "volksbank-trier-eifel", name: "Volksbank Trier Eifel", category: "banken", address: "Viehmarktplatz 7, 54290 Trier", districtLabel: "Innenstadt", source: "/banken-in-trier/" },
  { slug: "deutsche-bank-trier", name: "Deutsche Bank", category: "banken", address: "Hosenstraße 20, 54290 Trier", districtLabel: "Innenstadt", source: "/banken-in-trier/" },
  { slug: "commerzbank-trier", name: "Commerzbank", category: "banken", address: "Brotstraße 24, 54290 Trier", districtLabel: "Innenstadt", source: "/banken-in-trier/" },
  { slug: "postbank-trier", name: "Postbank", category: "banken", address: "Simeonstraße 11, 54290 Trier", districtLabel: "Innenstadt", source: "/banken-in-trier/" },
  { slug: "targobank-trier", name: "Targobank", category: "banken", address: "Grabenstraße 12, 54290 Trier", districtLabel: "Innenstadt", source: "/banken-in-trier/" },
  { slug: "hypovereinsbank-trier", name: "HypoVereinsbank", category: "banken", address: "Sichelstraße 2A, 54290 Trier", districtLabel: "Innenstadt", source: "/banken-in-trier/" },
  { slug: "santander-trier", name: "Santander", category: "banken", address: "Konstantinstraße 8-10, 54290 Trier", districtLabel: "Innenstadt", source: "/banken-in-trier/" },
];

const ausRestaurants = (): Listing[] =>
  restaurants.map((r) => ({
    slug: `restaurant-${r.slug}`,
    name: r.name,
    category: "gastronomie",
    district: r.district,
    districtLabel: getDistrict(r.district)?.name,
    href: `/restaurants/${r.slug}/`,
    source: "/restaurants/",
  }));

const ausHotels = (): Listing[] =>
  hotels.map((h) => ({
    slug: `hotel-${h.slug}`,
    name: h.name,
    category: "hotels",
    district: h.district,
    districtLabel: getDistrict(h.district)?.name,
    href: `/hotels/${h.slug}/`,
    source: "/hotels/",
  }));

const collator = new Intl.Collator("de", { sensitivity: "base" });

export const allListings = (): Listing[] => {
  const frei = [...kuratiert, ...ausRestaurants(), ...ausHotels()].sort((a, b) =>
    collator.compare(a.name, b.name)
  );
  return [...premiumPartners, ...frei];
};

export const listingsByCategory = (category: string): Listing[] => {
  const alle = allListings().filter((l) => l.category === category);
  return [...alle.filter((l) => l.premium), ...alle.filter((l) => !l.premium)];
};

export const categoryCount = (category: string) =>
  allListings().filter((l) => l.category === category).length;

export const totalListings = () => allListings().length;
