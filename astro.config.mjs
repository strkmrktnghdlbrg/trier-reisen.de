import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@tailwindcss/vite";

import outboundGate from './integrations/outbound-gate.mjs';
export default defineConfig({
  site: "https://trier-reisen.de",
  output: "static",
  integrations: [outboundGate(), 
    sitemap({
      filter: (page) =>
        !page.includes("/impressum") &&
        !page.includes("/datenschutz") &&
        !page.includes("/404"),
    }),
  ],
  vite: {
    plugins: [tailwind()],
  },
});
