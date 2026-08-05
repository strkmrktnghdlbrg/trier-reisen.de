import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@tailwindcss/vite";

import outboundGate from './integrations/outbound-gate.mjs';
import { unverifiedRestaurantSlugs } from "./src/data/restaurants.ts";

/**
 * Zurueckgezogene Betriebe gehoeren nicht in die Sitemap. Die Detailseite
 * traegt bereits noindex; die Sitemap wuerde Google sonst weiter aktiv auf
 * sie hinweisen. DE- und EN-Pfad teilen sich hier denselben Slug.
 */
const withdrawnPaths = new Set(
  [...unverifiedRestaurantSlugs].flatMap((slug) => [
    `/restaurants/${slug}/`,
    `/en/restaurants/${slug}/`,
  ]),
);

const isWithdrawn = (page) => withdrawnPaths.has(new URL(page).pathname);

export default defineConfig({
  site: "https://trier-reisen.de",
  output: "static",
  integrations: [outboundGate(), 
    sitemap({
      filter: (page) =>
        !isWithdrawn(page) &&
        !page.includes("/impressum") &&
        !page.includes("/datenschutz") &&
        !page.includes("/404"),
    }),
  ],
  vite: {
    plugins: [tailwind()],
  },
});
