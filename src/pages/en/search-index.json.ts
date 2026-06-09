import type { APIRoute } from "astro";
import { sights } from "../../data/sights";
import { hotels } from "../../data/hotels";
import { restaurants } from "../../data/restaurants";
import { districts } from "../../data/districts";
import { categories } from "../../data/categories";
import { guides } from "../../data/guides";
import { realEvents } from "../../data/events";
import enArticles from "../../data/i18n/en/articles.json";
import { localize, detailPath, articlePath } from "../../lib/i18n";

type Entry = { title: string; url: string; type: string; excerpt: string };
const lang = "en" as const;

const entries: Entry[] = [
  ...sights.map((s) => {
    const x = localize("sights", s, lang);
    return { title: x.name, url: detailPath(lang, "sights", s.slug), type: "Sight", excerpt: x.shortDesc ?? "" };
  }),
  ...hotels.map((h) => {
    const x = localize("hotels", h, lang);
    return { title: x.name, url: detailPath(lang, "hotels", h.slug), type: "Hotel", excerpt: x.shortDesc ?? "" };
  }),
  ...restaurants.map((r) => {
    const x = localize("restaurants", r, lang);
    return { title: x.name, url: detailPath(lang, "restaurants", r.slug), type: "Restaurant", excerpt: x.shortDesc ?? "" };
  }),
  ...districts.map((d) => {
    const x = localize("districts", d, lang);
    return { title: x.name, url: detailPath(lang, "districts", d.slug), type: "District", excerpt: x.shortDesc ?? "" };
  }),
  ...categories.map((c) => {
    const x = localize("categories", c, lang);
    return { title: x.name, url: detailPath(lang, "categories", c.slug), type: "Theme", excerpt: x.shortDesc ?? "" };
  }),
  ...guides.map((g) => {
    const x = localize("guides", g as any, lang) as any;
    return { title: x.title, url: detailPath(lang, "travelPlanner", g.slug), type: "Travel planner", excerpt: x.description ?? "" };
  }),
  ...realEvents.map((e) => {
    const x = localize("events", e as any, lang) as any;
    return { title: x.title, url: detailPath(lang, "events", e.slug), type: "Event", excerpt: x.intro ?? x.description ?? "" };
  }),
  ...(enArticles as any[]).map((a) => ({
    title: a.title,
    url: articlePath(lang, a.slug),
    type: "Magazine",
    excerpt: a.description ?? "",
  })),
];

export const GET: APIRoute = () =>
  new Response(JSON.stringify(entries), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
