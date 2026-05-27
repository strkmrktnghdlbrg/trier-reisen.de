/**
 * Image Registry — trier-reisen.de
 * --------------------------------
 * Bildschluessel -> ImageEntry mit src/alt/credit.
 * Solange noch keine Wikimedia-Bilder geladen sind: leeres Registry,
 * Komponenten fallen auf HueGradient zurueck.
 *
 * Bilder ablegen unter:
 *   src/assets/images/sights/<slug>.jpg
 *   src/assets/images/districts/<slug>.jpg
 * Dann unten in registry-Object Eintrag mit asset("sights"|"districts", slug) ergaenzen.
 */

import type { ImageMetadata } from "astro";

export type ImageSource = "wikimedia" | "unsplash" | "pexels" | "own" | "manufacturer";

export type Credit = {
  author: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
};

export type ImageEntry = {
  src: ImageMetadata;
  alt: string;
  source: ImageSource;
  credit?: Credit;
};

// Tolerant: keine Exception wenn Asset fehlt — Component faellt auf Hue-Gradient zurueck.
const sightModules = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/images/sights/*.{jpg,JPG,jpeg,png,webp}",
  { eager: true },
);
const districtModules = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/images/districts/*.{jpg,JPG,jpeg,png,webp}",
  { eager: true },
);

function asset(folder: "sights" | "districts", slug: string): ImageMetadata | null {
  const modules = folder === "sights" ? sightModules : districtModules;
  const match = Object.entries(modules).find(([path]) =>
    path.match(new RegExp(`/${slug}\\.(jpg|JPG|jpeg|png|webp)$`)),
  );
  return match ? match[1].default : null;
}

/**
 * Helper: bauen Eintrag mit asset(), aber nur wenn Datei vorhanden ist.
 * Falls Datei fehlt -> kein Registry-Eintrag, getImage(key) liefert undefined.
 */
function entry(
  folder: "sights" | "districts",
  slug: string,
  alt: string,
  source: ImageSource,
  credit?: Credit,
): ImageEntry | null {
  const src = asset(folder, slug);
  if (!src) return null;
  return { src, alt, source, credit };
}

// Registry zusammenbauen — Eintraege ueberspringen wenn Datei (noch) fehlt
function buildRegistry(): Record<string, ImageEntry> {
  const out: Record<string, ImageEntry> = {};
  const add = (key: string, e: ImageEntry | null) => {
    if (e) out[key] = e;
  };

  // === SIGHTS ===
  // Sobald Wikimedia-Files unter src/assets/images/sights/<slug>.jpg liegen,
  // entsprechende Zeile aktivieren / ergaenzen.
  add(
    "sight:porta-nigra",
    entry("sights", "porta-nigra", "Porta Nigra in Trier, Ansicht vom Simeonplatz", "wikimedia", {
      author: "Berthold Werner",
      license: "Public Domain",
      licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Trier_Porta_Nigra_BW_1.JPG",
    }),
  );
  add(
    "sight:trierer-dom",
    entry("sights", "trierer-dom", "Trierer Dom St. Peter, romanische Doppelturmfassade", "wikimedia"),
  );
  add(
    "sight:amphitheater",
    entry("sights", "amphitheater", "Amphitheater Trier, antike Arena", "wikimedia"),
  );
  add(
    "sight:kaiserthermen",
    entry("sights", "kaiserthermen", "Kaiserthermen Trier, Apsidenwand", "wikimedia"),
  );
  add(
    "sight:konstantinbasilika",
    entry("sights", "konstantinbasilika", "Konstantinbasilika Trier, antiker Thronsaal", "wikimedia"),
  );

  // === DISTRICTS ===
  add(
    "district:innenstadt",
    entry("districts", "innenstadt", "Trierer Hauptmarkt mit Steipe und Marktkreuz", "wikimedia"),
  );
  add(
    "district:olewig",
    entry("districts", "olewig", "Olewig — Trierer Weinort mit Winzerhoefen", "wikimedia"),
  );

  return out;
}

export const images: Record<string, ImageEntry> = buildRegistry();

export const getImage = (key?: string): ImageEntry | undefined =>
  key ? images[key] : undefined;
