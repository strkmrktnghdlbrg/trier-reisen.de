/**
 * Magazin-Artikel trier-reisen.de
 * ============================================================
 *
 * Aus der alten WordPress-Seite zurueckgeholte, faktengepruefte und
 * angepasste Artikel. Jeder Artikel behaelt seine EXAKTE alte Root-URL
 * (z. B. /weinfeste/), damit die bestehenden Google-Rankings erhalten
 * bleiben. Gerendert von `src/pages/[artikel].astro`.
 *
 * Affiliate wird vom Template anhand der Felder injiziert:
 *   - gygQuery   -> GetYourGuide-Aktivitaeten-Widget
 *   - awinMerchants -> AWIN-Angebots-Buttons (HanseMerkur, Hawesko, ...)
 *
 * Interne Links stehen direkt als <a href="/..."> im Fliesstext (set:html).
 * Kein Em-Dash, echte Umlaute.
 */

import type { AwinMerchantKey } from "./awin";
import articleData from "./articles.data.json";

export type ArticleSection = {
  /** Optionale H2-Ueberschrift. */
  heading?: string;
  /** Absaetze als HTML-Strings (duerfen interne <a href="/..."> enthalten). */
  body: string[];
  /** Optionale Aufzaehlung. */
  list?: string[];
};

export type ArticleFaq = { q: string; a: string };

export type ArticleCategory = "wein" | "versicherung" | "historie";

export type Article = {
  /** Root-URL-Slug, exakt wie auf der alten Seite indexiert. */
  slug: string;
  title: string;
  /** Meta-Description. */
  description: string;
  category: ArticleCategory;
  /** ISO-Datum (uebernommen vom alten Beitrag, sonst Migrationsdatum). */
  publishDate: string;
  /** Hue fuer den HueGradient-Hero (0-360). */
  heroHue: number;
  /** Lead-Absatz (HTML erlaubt). */
  intro: string;
  sections: ArticleSection[];
  faq?: ArticleFaq[];

  // === Affiliate (optional, vom Template injiziert) ===
  /** GetYourGuide-Suchanfrage (data-gyg-q). */
  gygQuery?: string;
  gygHeading?: string;
  gygIntro?: string;
  /** AWIN-Merchant-Keys fuer Angebots-Buttons. */
  awinMerchants?: AwinMerchantKey[];
  awinHeading?: string;
  awinIntro?: string;

  /** Verwandte Beitraege / Seiten (Footer-Navigation). */
  related?: { href: string; label: string }[];
};

export const articles: Article[] = articleData as unknown as Article[];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

export const articlesByCategory = (category: ArticleCategory) =>
  articles.filter((a) => a.category === category);

export const articleCategories: { key: ArticleCategory; label: string }[] = [
  { key: "wein", label: "Wein & Mosel" },
  { key: "historie", label: "Geschichte & Stadt" },
  { key: "versicherung", label: "Reise-Ratgeber" },
];
