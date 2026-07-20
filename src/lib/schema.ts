/**
 * JSON-LD Schema-Helfer trier-reisen.de
 * ============================================================
 * Mappt unsere Datentypen (Sight/Hotel/Restaurant/Event/Article) auf
 * schema.org-Objekte. In BaseLayout per `schema`-Prop einspeisen.
 */

import type { Sight } from "../data/sights";
import type { Hotel } from "../data/hotels";
import type { Restaurant } from "../data/restaurants";
import type { CityEvent } from "../data/events";
import type { Article as MagazinArticle } from "../data/articles";
import type { District } from "../data/districts";
import type { Category } from "../data/categories";
import { city } from "../data/city";

const SITE = city.domain.replace(/\/$/, "");
const abs = (path: string) => (path.startsWith("http") ? path : `${SITE}${path}`);

/** Site-weite Organization + WebSite (auf der Startseite einbetten). */
export const orgSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: city.brandName,
  url: SITE,
  logo: abs("/favicon.svg"),
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: city.brandName,
  url: SITE,
  inLanguage: "de-DE",
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE}/suche/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
});

/** Touristisches Reiseziel - Startseite. */
export const touristDestinationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  name: city.name,
  description: city.description.long ?? city.description.short,
  url: SITE,
  touristType: ["Kulturreisende", "Weinliebhaber", "UNESCO-Welterbe", "Familie"],
});

export const sightSchema = (s: Sight) => ({
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  name: s.name,
  description: s.longDesc ?? s.shortDesc,
  url: abs(`/sehenswuerdigkeiten/${s.slug}/`),
  geo: s.coordinates
    ? { "@type": "GeoCoordinates", latitude: s.coordinates[0], longitude: s.coordinates[1] }
    : undefined,
  isAccessibleForFree: s.priceFrom === null ? true : undefined,
  ...(s.websiteUrl ? { sameAs: s.websiteUrl } : {}),
  ...(s.openingHours ? { openingHours: s.openingHours } : {}),
});

export const hotelSchema = (h: Hotel) => ({
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: h.name,
  description: h.longDesc ?? h.shortDesc,
  url: abs(`/hotels/${h.slug}/`),
  ...(h.stars
    ? { starRating: { "@type": "Rating", ratingValue: String(h.stars) } }
    : {}),
  ...(h.rating
    ? {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: String(h.rating),
          bestRating: "10",
          ratingCount: "1",
        },
      }
    : {}),
  ...(typeof h.priceFrom === "number"
    ? {
        priceRange: `ab ${h.priceFrom} EUR`,
        offers: {
          "@type": "Offer",
          priceCurrency: "EUR",
          price: String(h.priceFrom),
          availability: "https://schema.org/InStock",
        },
      }
    : {}),
  address: {
    "@type": "PostalAddress",
    addressLocality: city.name,
    addressRegion: "Rheinland-Pfalz",
    addressCountry: "DE",
  },
});

export const restaurantSchema = (r: Restaurant) => ({
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: r.name,
  description: r.longDesc ?? r.shortDesc,
  url: abs(`/restaurants/${r.slug}/`),
  ...((r as any).websiteUrl ? { sameAs: (r as any).websiteUrl } : {}),
  ...((r as any).priceRange ? { priceRange: (r as any).priceRange } : {}),
  acceptsReservations: (r as any).reservation === true,
  servesCuisine: r.categories,
  address: {
    "@type": "PostalAddress",
    addressLocality: city.name,
    addressRegion: "Rheinland-Pfalz",
    addressCountry: "DE",
  },
});

export const eventSchema = (e: CityEvent) => ({
  "@context": "https://schema.org",
  "@type": "Event",
  name: e.title,
  description: e.description,
  startDate: e.checkin,
  endDate: e.checkout,
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  url: abs(`/events/${e.slug}/`),
  location: {
    "@type": "Place",
    name: e.address ?? city.name,
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: "Rheinland-Pfalz",
      addressCountry: "DE",
    },
    ...(e.lat && e.lng
      ? { geo: { "@type": "GeoCoordinates", latitude: e.lat, longitude: e.lng } }
      : {}),
  },
  organizer: {
    "@type": "Organization",
    name: city.brandName,
    url: SITE,
  },
});

export const articleSchema = (a: MagazinArticle) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: a.title,
  description: a.description,
  url: abs(`/${a.slug}/`),
  inLanguage: "de-DE",
  datePublished: a.publishDate,
  dateModified: a.publishDate,
  author: { "@type": "Organization", name: city.brandName, url: SITE },
  publisher: {
    "@type": "Organization",
    name: city.brandName,
    url: SITE,
    logo: { "@type": "ImageObject", url: abs("/favicon.svg") },
  },
  mainEntityOfPage: abs(`/${a.slug}/`),
});

export const districtSchema = (d: District) => ({
  "@context": "https://schema.org",
  "@type": "Place",
  name: `${d.name}, ${city.name}`,
  description: d.longDesc ?? d.shortDesc,
  url: abs(`/bezirke/${d.slug}/`),
  containedInPlace: { "@type": "City", name: city.name },
  ...(d.coordinates
    ? { geo: { "@type": "GeoCoordinates", latitude: d.coordinates[0], longitude: d.coordinates[1] } }
    : {}),
});

export const categorySchema = (c: Category) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: `${c.name} in ${city.name}`,
  description: c.longDesc ?? c.shortDesc,
  url: abs(`/kategorien/${c.slug}/`),
  inLanguage: "de-DE",
});

/** FAQPage aus Frage/Antwort-Paaren. HTML in Antworten wird zu Klartext gestrippt. */
export const faqSchema = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim(),
    },
  })),
});

export const breadcrumbSchema = (items: { name: string; url?: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    ...(it.url ? { item: abs(it.url) } : {}),
  })),
});

/** Convenience: serialisiere ein einzelnes Schema oder Array fuer ein <script type="application/ld+json"> Tag. */
export const serializeSchema = (s: object | object[]) => JSON.stringify(s);
