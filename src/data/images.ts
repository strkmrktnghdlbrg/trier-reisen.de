/**
 * Image Registry — trier-reisen.de
 * --------------------------------
 * Bildschluessel -> ImageEntry mit src/alt/credit.
 * Astro 5 verwendet astro:assets — Bilder werden von Vite zu WebP/AVIF
 * konvertiert und in responsiven Varianten ausgespielt.
 *
 * Lizenz-Disziplin: alle Bilder hier sind Wikimedia Commons mit
 * CC-BY / CC-BY-SA / Public Domain. Credit erscheint im <figcaption>.
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

function entry(
  folder: "sights" | "districts",
  slug: string,
  alt: string,
  credit?: Credit,
): ImageEntry | null {
  const src = asset(folder, slug);
  if (!src) return null;
  return { src, alt, source: "wikimedia", credit };
}

// Wiederverwendete Credits (gleicher Autor mehrfach)
const THWOLF_3DE: Omit<Credit, "sourceUrl"> = {
  author: "Thomas Wolf, www.foto-tw.de",
  license: "CC BY-SA 3.0 DE",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/de/deed.en",
};
const BWERNER_4: Omit<Credit, "sourceUrl"> = {
  author: "Berthold Werner",
  license: "CC BY-SA 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
};
const GOLIK_4: Omit<Credit, "sourceUrl"> = {
  author: "Krzysztof Golik",
  license: "CC BY-SA 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
};
const FRDR_4: Omit<Credit, "sourceUrl"> = {
  author: "FrDr",
  license: "CC BY-SA 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
};
const P170_4: Omit<Credit, "sourceUrl"> = {
  author: "P170",
  license: "CC BY-SA 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
};

function buildRegistry(): Record<string, ImageEntry> {
  const out: Record<string, ImageEntry> = {};
  const add = (key: string, e: ImageEntry | null) => {
    if (e) out[key] = e;
  };

  // === SIGHTS ===
  add("sight:porta-nigra", entry("sights", "porta-nigra",
    "Porta Nigra in Trier im Morgenlicht",
    { ...THWOLF_3DE, sourceUrl: "https://commons.wikimedia.org/wiki/File:Porta_Nigra_morgens.jpg" }));
  add("sight:trierer-dom", entry("sights", "trierer-dom",
    "Westfassade des Trierer Doms St. Peter",
    { ...GOLIK_4, sourceUrl: "https://commons.wikimedia.org/wiki/File:West_facade_of_the_Trier_cathedral.jpg" }));
  add("sight:liebfrauenkirche", entry("sights", "liebfrauenkirche",
    "Trierer Dom und Liebfrauenkirche aus der Vogelperspektive",
    { ...BWERNER_4, sourceUrl: "https://commons.wikimedia.org/wiki/File:Trier_Dom_und_Liebfrauen_BW_2019-08-31_13-21-08.jpg" }));
  add("sight:konstantinbasilika", entry("sights", "konstantinbasilika",
    "Konstantinbasilika (Aula Palatina) in Trier",
    { author: "Dietmar Rabich", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Trier,_Konstantinbasilika_--_2015_--_7529.jpg" }));
  add("sight:kaiserthermen", entry("sights", "kaiserthermen",
    "Doppelbogen der Kaiserthermen in Trier",
    { author: "Virtual-Pano", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Germany_Rhineland-Palatinate_Trier_Kaiserthermen_double_arches.jpg" }));
  add("sight:barbarathermen", entry("sights", "barbarathermen",
    "Ruinen der Barbarathermen in Trier",
    { ...BWERNER_4, sourceUrl: "https://commons.wikimedia.org/wiki/File:Trier_Barbarathermen_BW_2019-07-02_11-18-54.jpg" }));
  add("sight:amphitheater", entry("sights", "amphitheater",
    "Roemisches Amphitheater Trier mit Arena",
    { ...FRDR_4, sourceUrl: "https://commons.wikimedia.org/wiki/File:Amphitheater_Trier_05.jpg" }));
  add("sight:roemerbruecke", entry("sights", "roemerbruecke",
    "Roemerbruecke ueber die Mosel in Trier",
    { ...FRDR_4, sourceUrl: "https://commons.wikimedia.org/wiki/File:R%C3%B6merbr%C3%BCcke_Trier_01.jpg" }));
  add("sight:igeler-saeule", entry("sights", "igeler-saeule",
    "Igeler Saeule, roemisches Grabmal bei Trier",
    { ...FRDR_4, sourceUrl: "https://commons.wikimedia.org/wiki/File:Igeler_S%C3%A4ule_03.jpg" }));
  add("sight:hauptmarkt", entry("sights", "hauptmarkt",
    "Hauptmarkt in Trier mit historischen Buergerhaeusern",
    { ...GOLIK_4, sourceUrl: "https://commons.wikimedia.org/wiki/File:Hauptmarkt_in_Trier_01.jpg" }));
  add("sight:kurfuerstliches-palais", entry("sights", "kurfuerstliches-palais",
    "Rokoko-Fassade des Kurfuerstlichen Palais in Trier",
    { ...THWOLF_3DE, sourceUrl: "https://commons.wikimedia.org/wiki/File:Kurf%C3%BCrstliches_Palais.jpg" }));
  add("sight:rheinisches-landesmuseum", entry("sights", "rheinisches-landesmuseum",
    "Rheinisches Landesmuseum Trier",
    { ...FRDR_4, sourceUrl: "https://commons.wikimedia.org/wiki/File:Rheinisches_Landesmuseum_Trier_02.jpg" }));
  add("sight:karl-marx-haus", entry("sights", "karl-marx-haus",
    "Karl-Marx-Haus in Trier, Geburtshaus von Karl Marx",
    { ...FRDR_4, sourceUrl: "https://commons.wikimedia.org/wiki/File:Karl-Marx-Haus_Trier_01.jpg" }));
  add("sight:mariensaeule", entry("sights", "mariensaeule",
    "Mariensaeule und Kaiser-Wilhelm-Bruecke in Trier",
    { author: "Felix Koenig", license: "CC BY 3.0", licenseUrl: "https://creativecommons.org/licenses/by/3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Kaiser-Wilhelm-Br%C3%BCcke_Mariens%C3%A4ule_Trier_August_2024.JPG" }));
  add("sight:mosel-promenade", entry("sights", "mosel-promenade",
    "Promenade am Moselufer in Trier",
    { ...P170_4, sourceUrl: "https://commons.wikimedia.org/wiki/File:Trier,_Promenade_am_Moselufer_H%C3%B6he_Jugendherberge_20230811.jpg" }));
  add("sight:st-matthias", entry("sights", "st-matthias",
    "Fassade der Basilika St. Matthias in Trier",
    { author: "Zairon", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Trier_Basilika_St._Matthias_1.JPG" }));
  add("sight:st-paulin", entry("sights", "st-paulin",
    "Kirche St. Paulin in Trier von Suedosten",
    { author: "Berthold Werner", license: "Public Domain",
      licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Trier_Sankt_Paulin_BW_9.jpg" }));

  // === DISTRICTS ===
  add("district:innenstadt", entry("districts", "innenstadt",
    "Hauptmarkt in der Trierer Innenstadt mit St. Gangolf",
    { ...BWERNER_4, sourceUrl: "https://commons.wikimedia.org/wiki/File:Trier_BW_2022-06-22_07-30-13.jpg" }));
  add("district:olewig", entry("districts", "olewig",
    "Weinort Trier-Olewig mit umliegenden Weinbergen",
    { author: "Jeff Croise", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Trier-Olewig.jpg" }));
  add("district:trier-sued", entry("districts", "trier-sued",
    "Kaiserthermen mit Palastgarten in Trier-Sued",
    { author: "Gerd Eichmann", license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Trier-Kaiserthermen-02-Palastgarten-2013-gje.jpg" }));
  add("district:trier-nord", entry("districts", "trier-nord",
    "Moselufer in Trier-Nord mit Blick auf Mariensaeule",
    { ...P170_4, sourceUrl: "https://commons.wikimedia.org/wiki/File:Trier,_Weg_am_Moselufer_in_Trier-Nord_mit_Blick_nach_Pallien_20190131.jpg" }));
  add("district:trier-west-pallien", entry("districts", "trier-west-pallien",
    "Stadtteil Pallien an der Mosel in Trier-West",
    { author: "Palauenc05", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Trier_Pallien.jpg" }));
  add("district:kuerenz", entry("districts", "kuerenz",
    "Blick vom Petrisberg auf Trier",
    { author: "Agnes Monkelbaan", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Trier,_08-12-2023_(actm.)_04.jpg" }));
  add("district:ruwer-eitelsbach", entry("districts", "ruwer-eitelsbach",
    "Ruwertal mit Weinbergen bei Trier-Ruwer/Eitelsbach",
    { author: "Wikipedia/Trier-ruwer-rwz-lhg", license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Trier-ruwer-rwz-lhg.jpg" }));
  add("district:pfalzel", entry("districts", "pfalzel",
    "Kirche St. Maria und St. Martin in Trier-Pfalzel",
    { ...P170_4, sourceUrl: "https://commons.wikimedia.org/wiki/File:Trier-Pfalzel,_Kirche_St._Maria_und_St._Martin_20230917.jpg" }));

  return out;
}

export const images: Record<string, ImageEntry> = buildRegistry();

export const getImage = (key?: string): ImageEntry | undefined =>
  key ? images[key] : undefined;
