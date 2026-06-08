import type { APIRoute } from "astro";
import { sights } from "../data/sights";
import { hotels } from "../data/hotels";
import { restaurants } from "../data/restaurants";
import { districts } from "../data/districts";
import { categories } from "../data/categories";
import { guides } from "../data/guides";
import { articles } from "../data/articles";
import { realEvents } from "../data/events";

type Entry = { title: string; url: string; type: string; excerpt: string };

const entries: Entry[] = [
  ...sights.map((s) => ({ title: s.name, url: `/sehenswuerdigkeiten/${s.slug}/`, type: "Sehenswürdigkeit", excerpt: s.shortDesc ?? "" })),
  ...hotels.map((h) => ({ title: h.name, url: `/hotels/${h.slug}/`, type: "Hotel", excerpt: h.shortDesc ?? "" })),
  ...restaurants.map((r) => ({ title: r.name, url: `/restaurants/${r.slug}/`, type: "Restaurant", excerpt: r.shortDesc ?? "" })),
  ...districts.map((d) => ({ title: d.name, url: `/bezirke/${d.slug}/`, type: "Bezirk", excerpt: d.shortDesc ?? "" })),
  ...categories.map((c) => ({ title: c.name, url: `/kategorien/${c.slug}/`, type: "Thema", excerpt: c.shortDesc ?? "" })),
  ...guides.map((g) => ({ title: g.title, url: `/reiseplaner/${g.slug}/`, type: "Reiseplaner", excerpt: g.description ?? "" })),
  ...realEvents.map((e) => ({ title: e.title, url: `/events/${e.slug}/`, type: "Event", excerpt: (e as any).intro ?? (e as any).description ?? "" })),
  ...articles.map((a) => ({ title: a.title, url: `/${a.slug}/`, type: "Magazin", excerpt: a.description ?? "" })),
];

export const GET: APIRoute = () =>
  new Response(JSON.stringify(entries), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
