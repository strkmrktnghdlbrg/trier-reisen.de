/**
 * i18n-Helfer trier-reisen.de
 * ============================================================
 * Zwei Sprachen: 'de' (default, ohne URL-Praefix) und 'en' (/en/...).
 * Englische Inhalte werden aus src/data/i18n/en/*.json gezogen und
 * fallen pro Feld auf den deutschen Wert zurueck, falls die Uebersetzung
 * (noch) fehlt.
 */

import enSights from "../data/i18n/en/sights.json";
import enHotels from "../data/i18n/en/hotels.json";
import enRestaurants from "../data/i18n/en/restaurants.json";
import enDistricts from "../data/i18n/en/districts.json";
import enCategories from "../data/i18n/en/categories.json";
import enEvents from "../data/i18n/en/events.json";
import enGuides from "../data/i18n/en/guides.json";
import enArticles from "../data/i18n/en/articles.json";
import enEnrichments from "../data/i18n/en/sight-enrichments.json";
import enUi from "../data/i18n/en/ui.json";
import deUi from "../data/i18n/de.json";

export const LANGS = ["de", "en"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "de";

/** URL-Praefix pro Sprache (de = "", en = "/en"). */
export const langPrefix = (lang: Lang) => (lang === "de" ? "" : `/${lang}`);

/** Pfad-Segmente pro Sprache: /sehenswuerdigkeiten/ (de) vs /sights/ (en). */
export const seg = {
  sights:        { de: "sehenswuerdigkeiten", en: "sights" },
  hotels:        { de: "hotels",              en: "hotels" },
  restaurants:   { de: "restaurants",         en: "restaurants" },
  districts:     { de: "bezirke",             en: "districts" },
  categories:    { de: "kategorien",          en: "themes" },
  events:        { de: "events",              en: "events" },
  travelPlanner: { de: "reiseplaner",         en: "travel-planner" },
  magazine:      { de: "magazin",             en: "magazine" },
  search:        { de: "suche",               en: "search" },
  about:         { de: "ueber-uns",           en: "about" },
  imprint:       { de: "impressum",           en: "imprint" },
  privacy:       { de: "datenschutz",         en: "privacy" },
} as const;

export type SegKey = keyof typeof seg;

/** Vollstaendigen Sprach-Pfad fuer eine Sektion bauen, z. B. ("en","sights") -> "/en/sights/". */
export const sectionPath = (lang: Lang, key: SegKey) =>
  `${langPrefix(lang)}/${seg[key][lang]}/`;

/** Detail-Pfad bauen, z. B. ("en","sights","porta-nigra") -> "/en/sights/porta-nigra/". */
export const detailPath = (lang: Lang, key: SegKey, slug: string) =>
  `${sectionPath(lang, key)}${slug}/`;

/** Magazin-Artikel-Pfad. DE: /<slug>/, EN: /en/magazine/<slug>/. */
export const articlePath = (lang: Lang, slug: string) =>
  lang === "de" ? `/${slug}/` : `/en/magazine/${slug}/`;

/** UI-Strings holen (verschachtelte Keys per Punkt-Pfad: t("en","nav.sights")). */
const UI = { de: deUi as any, en: enUi as any };
export function t(lang: Lang, path: string): string {
  const segments = path.split(".");
  let cur: any = UI[lang];
  for (const s of segments) {
    if (cur == null) return path;
    cur = cur[s];
  }
  if (typeof cur !== "string") {
    // Fallback auf Deutsch
    let de: any = UI.de;
    for (const s of segments) {
      if (de == null) return path;
      de = de[s];
    }
    return typeof de === "string" ? de : path;
  }
  return cur;
}

// === Per-Entity-Getter mit Fallback auf das deutsche Quellobjekt ===

type Translations = Record<string, Record<string, any>>;

const EN: Record<string, Translations> = {
  sights: enSights as any,
  hotels: enHotels as any,
  restaurants: enRestaurants as any,
  districts: enDistricts as any,
  categories: enCategories as any,
  events: enEvents as any,
  guides: enGuides as any,
};

/** Felder eines Entity-Eintrags fuer eine Sprache ueberlagern. */
export function localize<T extends { slug: string }>(
  type: keyof typeof EN,
  item: T,
  lang: Lang,
): T {
  if (lang === "de") return item;
  const tr = EN[type]?.[item.slug];
  if (!tr) return item;
  return { ...item, ...tr };
}

/** Englische Sight-Enrichments holen (Map slug -> string[]). */
export const sightEnrichmentsByLang = (lang: Lang) =>
  (lang === "en" ? enEnrichments : null) as Record<string, string[]> | null;

/** Englischen Artikel holen (nur Wein-Cluster ist uebersetzt). */
export const getEnArticle = (slug: string) =>
  (enArticles as any[]).find((a) => a.slug === slug) || null;

/** Slugs aller englischen Artikel. */
export const enArticleSlugs = (enArticles as any[]).map((a) => a.slug);

/** hreflang-Alternates fuer die aktuelle Seite bauen. */
export function hreflangs(currentPath: string, lang: Lang): { lang: string; href: string }[] {
  const otherLang: Lang = lang === "de" ? "en" : "de";
  return [
    { lang: lang === "de" ? "de" : "en", href: currentPath },
    // Der jeweils andere Pfad wird vom Aufrufer geliefert, da slug-Mapping seitenspezifisch sein kann.
    { lang: otherLang, href: currentPath },
  ];
}
