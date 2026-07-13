/**
 * Image Registry - trier-reisen.de
 * --------------------------------
 * Bildschluessel -> ImageEntry mit src/alt/credit.
 * Astro 5 verwendet astro:assets - Bilder werden von Vite zu WebP/AVIF
 * konvertiert und in responsiven Varianten ausgespielt.
 *
 * Lizenz-Disziplin: alle Bilder hier sind Wikimedia Commons mit
 * CC-BY / CC-BY-SA / Public Domain. Credit erscheint im <figcaption>.
 */

import type { ImageMetadata } from "astro";
import { hotels } from "./hotels";
import { restaurants } from "./restaurants";

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

type Folder =
  | "sights"
  | "districts"
  | "posts"
  | "categories"
  | "hero"
  | "hotels"
  | "restaurants";

const folderModules: Record<Folder, Record<string, { default: ImageMetadata }>> = {
  sights: import.meta.glob("/src/assets/images/sights/*.{jpg,JPG,jpeg,png,webp}", { eager: true }),
  districts: import.meta.glob("/src/assets/images/districts/*.{jpg,JPG,jpeg,png,webp}", { eager: true }),
  posts: import.meta.glob("/src/assets/images/posts/*.{jpg,JPG,jpeg,png,webp}", { eager: true }),
  categories: import.meta.glob("/src/assets/images/categories/*.{jpg,JPG,jpeg,png,webp}", { eager: true }),
  hero: import.meta.glob("/src/assets/images/hero/*.{jpg,JPG,jpeg,png,webp}", { eager: true }),
  hotels: import.meta.glob("/src/assets/images/hotels/*.{jpg,JPG,jpeg,png,webp}", { eager: true }),
  restaurants: import.meta.glob("/src/assets/images/restaurants/*.{jpg,JPG,jpeg,png,webp}", { eager: true }),
} as Record<Folder, Record<string, { default: ImageMetadata }>>;

function asset(folder: Folder, slug: string): ImageMetadata | null {
  const modules = folderModules[folder];
  const match = Object.entries(modules).find(([path]) =>
    path.match(new RegExp(`/${slug}\\.(jpg|JPG|jpeg|png|webp)$`)),
  );
  return match ? match[1].default : null;
}

function entry(
  folder: Folder,
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

  add("sight:dreikoenigenhaus", entry("sights", "dreikoenigenhaus",
    "Das gotische Dreikoenigenhaus in der Simeonstrasse in Trier",
    { author: "Lothar Spurzem", license: "CC BY-SA 2.0 DE",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/de/deed.en",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Trier,_Dreik%C3%B6nigenhaus_2_(2009-09-21_Sp).JPG" }));
  add("sight:stadtmuseum-simeonstift", entry("sights", "stadtmuseum-simeonstift",
    "Das Simeonstift in Trier, Sitz des Stadtmuseums",
    { author: "Palauenc05", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Trier_Simeonstift.jpg" }));
  add("sight:museum-am-dom", entry("sights", "museum-am-dom",
    "Das Museum am Dom in Trier, Backsteinbau von 1832/33",
    { author: "Palauenc05", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Trier_Di%C3%B6zesanmuseum_(1).jpg" }));
  add("sight:spielzeugmuseum", entry("sights", "spielzeugmuseum",
    "Spielzeugmuseum in der Dietrichstrasse in Trier",
    { author: "Andreas Praefcke", license: "CC BY 3.0", licenseUrl: "https://creativecommons.org/licenses/by/3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Trier_Spielzeugmuseum.jpg" }));
  add("sight:petrisberg", entry("sights", "petrisberg",
    "Panoramablick vom Petrisberg ueber die Stadt Trier",
    { author: "Agnes Monkelbaan", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Trier,_08-12-2023_(actm.)_01.jpg" }));
  add("sight:weinkulturpfad-olewig", entry("sights", "weinkulturpfad-olewig",
    "Historisches Weinbergshaeuschen in den Weinbergen von Trier-Olewig",
    { author: "Thomas Holbach", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Trier-Olewig_Weinbergshaeuschen.jpg" }));

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
  add("district:trier-ost", entry("districts", "trier-ost",
    "Fuss- und Radweg zwischen Palastgarten und Hermesstrasse in Trier-Ost",
    { author: "Ben Bender", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Trier_Ost,_Trier,_Germany_-_panoramio.jpg" }));
  add("district:mariahof", entry("districts", "mariahof",
    "Luftaufnahme des Trierer Stadtteils Mariahof",
    { author: "Wolkenkratzer", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Mariahof_002x.jpg" }));
  add("district:euren", entry("districts", "euren",
    "Blick vom Markusberg zur Kirche St. Helena im Trierer Stadtteil Euren",
    { author: "Dguendel", license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Markusberg_(Trier),_Blick_zur_Kirche_St._Helena.jpg" }));
  add("district:biewer", entry("districts", "biewer",
    "Luftaufnahme des Trierer Stadtteils Biewer an der Mosel",
    { author: "Kratzandreas", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Biewer.jpg" }));

  // === HERO ===
  add("hero:porta-nigra", entry("hero", "porta-nigra",
    "Die Porta Nigra in Trier am Abend, stimmungsvoll angestrahlt",
    { author: "Thomas Wolf, www.foto-tw.de", license: "CC BY-SA 3.0 DE",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/de/deed.en",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Porta_Nigra_abends.jpg" }));

  // === KATEGORIEN ===
  add("category:unesco-welterbe", entry("categories", "unesco-welterbe",
    "Die Porta Nigra in Trier, UNESCO-Weltkulturerbe aus dunklem Sandstein",
    { author: "Dietmar Rabich", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Trier,_Porta_Nigra_--_2015_--_6123.jpg" }));
  add("category:roemisches-erbe", entry("categories", "roemisches-erbe",
    "Die roemischen Kaiserthermen in Trier mit ihren markanten Mauerboegen",
    { author: "Gerd Eichmann", license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Trier-Kaiserthermen-06-2013-gje.jpg" }));
  add("category:wein", entry("categories", "wein",
    "Weinbergshaenge im Trierer Stadtteil Olewig, dem Weinort von Trier",
    { author: "Michael Fiegle", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Weinbergsbrache_Olewig.jpg" }));
  add("category:museen", entry("categories", "museen",
    "Ausstellungssaal im Rheinischen Landesmuseum Trier mit roemischen Fresken",
    { author: "Kleon3", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:2018_Rheinisches_Landesmuseum_Trier,_Fresken_%26_Skulpturen.jpg" }));
  add("category:religioese-staetten", entry("categories", "religioese-staetten",
    "Der Innenraum des Trierer Doms mit hohen Saeulen und barocker Ausstattung",
    { author: "Holger Uwe Schmitt", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Der_Innenraum_des_Trierer_Doms._02.jpg" }));
  add("category:familie", entry("categories", "familie",
    "Belebter Hauptmarkt in Trier mit bunten Buergerhaeusern und Menschen",
    { author: "Krzysztof Golik", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Hauptmarkt_in_Trier_01.jpg" }));
  add("category:kulinarik", entry("categories", "kulinarik",
    "Ein Glas Weisswein und ein Glas Rotwein nebeneinander auf einem Tisch",
    { author: "A. Savin", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Red_and_white_wine_12-2015.jpg" }));
  add("category:aussicht-wandern", entry("categories", "aussicht-wandern",
    "Panoramablick vom Petrisberg ueber die Stadt Trier und das Moseltal",
    { author: "Agnes Monkelbaan", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Trier,_08-12-2023_(actm.)_14.jpg" }));
  add("category:mosel-aktivitaeten", entry("categories", "mosel-aktivitaeten",
    "Ausflugsschiff auf der Mosel bei Trier mit Uferpromenade und Weinbergen",
    { author: "giggel", license: "CC BY 3.0", licenseUrl: "https://creativecommons.org/licenses/by/3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Trier-West-Pallien_-_panoramio.jpg" }));
  add("category:shopping", entry("categories", "shopping",
    "Die Simeonstrasse in Trier, belebte Einkaufsstrasse mit historischen Fassaden",
    { author: "Berthold Werner", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Trier_Simeonstrasse_BW_2018-05-12_18-07-42.jpg" }));

  // === MAGAZIN: HISTORIE-ARTIKEL (spezifische Trier-Motive) ===
  add("article:viehmarktthermen", entry("posts", "viehmarktthermen",
    "Freigelegte roemische Badeanlage der Viehmarktthermen in Trier unter Glas",
    { author: "Cobatfor", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Roman_baths_at_the_Viehmarkt_in_Trier_in_August_2016.jpg" }));
  add("article:judengasse-mittelalter-trier", entry("posts", "judengasse-mittelalter-trier",
    "Blick in die mittelalterliche Judengasse in Trier mit der historischen Judenpforte",
    { author: "Stefan Kuehn", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Trier_Judengasse_und_Judenpforte.jpg" }));
  add("article:st-gangolf-kirchenjuwel", entry("posts", "st-gangolf-kirchenjuwel",
    "Die Marktkirche St. Gangolf mit ihrem hohen Turm am Trierer Hauptmarkt",
    { author: "Berthold Werner", license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Trier_St._Gangolf_BW_2025-08-26_14-24-42.jpg" }));
  add("article:moselschleife", entry("posts", "moselschleife",
    "Weiter Blick ueber den Mosellauf bei Trier auf die noerdlichen Stadtteile",
    { author: "Franzfoto", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Trier_-_Sicht_%C3%BCber_die_Mosel_zum_n%C3%B6rdlichen_Stadtteil.jpg" }));
  add("article:mittelalterliche-stadtmauer", entry("posts", "mittelalterliche-stadtmauer",
    "Erhaltener Turm der mittelalterlichen Stadtbefestigung an der Bastion Suedallee in Trier",
    { author: "Helge Klaus Rieder", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:TrierSuedalleBastionH2c.jpg" }));
  add("article:augustinerhof", entry("posts", "augustinerhof",
    "Gebaeude des Augustinerhofs in Trier, heute Sitz der Stadtverwaltung",
    { author: "Berthold Werner", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Trier_Augustinerhof_BW_2019-07-02_10-55-06.jpg" }));
  add("article:fachtagung-diversity-management-antidiskriminierung", entry("posts", "fachtagung-diversity-management-antidiskriminierung",
    "Gebaeude der Katholischen Akademie Trier im Robert-Schuman-Haus",
    { author: "Helge Klaus Rieder", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:TrierKatholischeAkademieH2c_-_Kopie.jpg" }));

  // === MAGAZIN: WEIN-ARTIKEL (thematische Mosel/Wein-Motive) ===
  add("article:weinfeste", entry("posts", "weinfeste",
    "Froehliche Besucher feiern dicht gedraengt bei einem Weinfest",
    { author: "Bogossi Production", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Crazy_visitors_of_Yerevan_Wine_Days.jpg" }));
  add("article:riesling-routen-mosel", entry("posts", "riesling-routen-mosel",
    "Weinberge und Bahnstrecke entlang der Mosel bei Puenderich",
    { author: "Hartmut Schmidt Heidelberg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Vineyards_and_railway_track_aside_Mosel_river,_P%C3%BCnderich,_D.jpg" }));
  add("article:sektkellereien-erlebnisse", entry("posts", "sektkellereien-erlebnisse",
    "Grosses Cuveefass in einer Sektkellerei zur Herstellung von Schaumwein",
    { author: "Je-str", license: "CC BY 3.0", licenseUrl: "https://creativecommons.org/licenses/by/3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Cuv%C3%A9efass.jpg" }));
  add("article:besten-vinotheken", entry("posts", "besten-vinotheken",
    "Gut gefuellte Weinregale mit vielen Flaschen in einer Vinothek",
    { author: "WinzervonBaden", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Blick_ins_Weinregal_der_Vinothek.jpg" }));
  add("article:weinproben-historische-keller", entry("posts", "weinproben-historische-keller",
    "Alter Weinkeller mit grossen Holzfaessern zur Weinreifung",
    { author: "Cheeky76", license: "CC BY-SA 3.0 AT", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/at/deed.en",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:F%C3%A4sser_im_alten_Weinkeller.JPG" }));
  add("article:moselwein-touren", entry("posts", "moselwein-touren",
    "Blick auf die Moselschleife bei Bremm mit steilen Weinbergen im Abendlicht",
    { author: "Andreas Lippold", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Moselschleife_bei_Bremm_im_Abendlicht.jpg" }));
  add("article:weinstuben-beste-adressen", entry("posts", "weinstuben-beste-adressen",
    "Gemuetliche Weinstube mit gedeckten Tischen und historischem Gewoelbe",
    { author: "Carolus2018", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Viers%C3%A4ulensaal_Pf%C3%A4lzer_Residenz_Weinstube_M%C3%BCnchen.jpg" }));
  add("article:weintouren-fahrrad-mosel", entry("posts", "weintouren-fahrrad-mosel",
    "Tandem-Fahrrad auf einem Weg durch die Weinberge einer Weinregion",
    { author: "Cjp24", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Tandem_bicycle_near_Sancerre,_France.jpg" }));
  add("article:weinseminare", entry("posts", "weinseminare",
    "Mehrere gefuellte Weinglaeser nebeneinander bei einer Weinprobe",
    { author: "Amiga11235", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Gl%C3%A4ser_f%C3%BCr_Weinprobe.JPG" }));
  add("article:weintraditionen", entry("posts", "weintraditionen",
    "In einer Boettcherei entsteht ein neues Weinfass aus Eichenholz",
    { author: "BillBl", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Constructing_an_oak_wine_barrel_at_French_cooperage.jpg" }));
  add("article:weinhotels-weinbergen", entry("posts", "weinhotels-weinbergen",
    "Terrassierte Weinberge fallen in Stufen zum Ufer hin ab",
    { author: "JoachimKohler-HB", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Riex_%26_Epesses_in_den_Weinberg-Terrassen_des_Lavaux_(2015).jpg" }));
  add("article:weinwanderungen", entry("posts", "weinwanderungen",
    "Weinwanderweg fuehrt durch sonnige Weinberge am Hang",
    { author: "Geo-Loge", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Weinwanderweg_Pillnitz.jpg" }));
  add("article:weingutfuehrungen", entry("posts", "weingutfuehrungen",
    "Weinberge in leuchtenden Herbstfarben oberhalb der Ortschaft",
    { author: "Juergen Hamann", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Weinberg_im_Herbst_%C3%BCber_Heppenheim.jpg" }));
  add("article:bio-weingueter", entry("posts", "bio-weingueter",
    "Ordentliche Rebzeilen eines Weinbergs zur Erntezeit",
    { author: "W.carter", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Chateaux_Luna_vineyard_at_harvest_1.jpg" }));
  add("article:weingueter-uebersicht", entry("posts", "weingueter-uebersicht",
    "Reife weisse Weintrauben haengen dicht an der Rebe im Weinberg",
    { author: "Justus Hayes", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:St._Sadurni_d%27Anoia_-_white_grapes.jpg" }));

  // === MAGAZIN: REISE-RATGEBER (Versicherungs-Artikel) ===
  add("article:reisehaftpflicht-versicherung", entry("posts", "reisehaftpflicht-versicherung",
    "Reisende mit Koffer und Gepaeck kommen am Eingang eines Hotels an",
    { author: "Shixart1985", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Travelers_with_luggage_arrive_at_hotel_entrance_while_suitcase_waits_on_pavement.jpg" }));
  add("article:schuelerreisen-versicherung", entry("posts", "schuelerreisen-versicherung",
    "Menschen unterwegs in der historischen Altstadt einer europaeischen Stadt",
    { author: "AHeneen", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Versailles_Town_Center.JPG" }));
  add("article:gruppenreisen-versicherung", entry("posts", "gruppenreisen-versicherung",
    "Reisender entspannt entlang einer alten Stadtmauer bei einem Ausflug",
    { author: "Rudolph.A.furtado", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Tourist_relaxing_along_Fortified_walls..JPG" }));

  // === HOTEL-STIMMUNGSBILD-POOL (generische Hospitality-Motive, nicht der konkrete Betrieb) ===
  add("hotel:pool-01", entry("hotels", "pool-01", "Aufgeraeumtes Hotelzimmer mit gemachtem Doppelbett",
    { author: "Kurt Kaiser", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Bed_in_hotel_room_2.jpg" }));
  add("hotel:pool-02", entry("hotels", "pool-02", "Fassade eines historischen europaeischen Hotelgebaeudes",
    { author: "Dietmar Rabich", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Nottuln,_Hotel_Steverburg_--_2016_--_1486.jpg" }));
  add("hotel:pool-03", entry("hotels", "pool-03", "Empfangstresen in der Lobby eines Hotels",
    { author: "JIP", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Reception_desk_at_Hotel_Esplanade_in_Stockholm.jpg" }));
  add("hotel:pool-04", entry("hotels", "pool-04", "Fassade eines gemuetlichen laendlichen Gasthofs",
    { author: "Ironbernietyrol", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Gasthof_R%C3%B6ssl_-_Fassade.jpg" }));
  add("hotel:pool-05", entry("hotels", "pool-05", "Reich gedecktes Fruehstuecksbuffet in einem Hotel",
    { author: "Kim", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Breakfast_buffet_Marriott_Hotel_Lima_01.jpg" }));
  add("hotel:pool-06", entry("hotels", "pool-06", "Modern eingerichtetes Zimmer in einem Boutique-Hotel",
    { author: "FaceMePLS", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Room_Mate_Aitana_Hotel_-_IJdok_Amsterdam_(35843480273).jpg" }));
  add("hotel:pool-07", entry("hotels", "pool-07", "Hotelbalkon mit weitem Ausblick in die Landschaft",
    { author: "Michal Klajban", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Balcony_of_Hampden_Hotel,_Murchison,_New_Zealand.jpg" }));
  add("hotel:pool-08", entry("hotels", "pool-08", "Wellness- und Spa-Bereich eines Hotels mit Blick in den Garten",
    { author: "User:Mattes", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:GER_%E2%80%94_BY_%E2%80%94_Oberbayern" }));

  // === RESTAURANT-STIMMUNGSBILD-POOL (generische Gastronomie-Motive, nicht der konkrete Betrieb) ===
  add("restaurant:pool-01", entry("restaurants", "pool-01", "Eingedeckter Restauranttisch fuer vier Personen",
    { author: "George Ho", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Bistro_Nas_restaurant_one_dining_table_of_four.jpg" }));
  add("restaurant:pool-02", entry("restaurants", "pool-02", "Angerichteter Schweinebraten mit Kartoffelknoedeln auf dem Teller",
    { author: "Takeaway", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:2011_0628_Seefeld_Schweinsbraten_mit_Kartoffelkn%C3%B6del.jpg" }));
  add("restaurant:pool-03", entry("restaurants", "pool-03", "Gemuetlicher Innenraum eines kleinen Bistros",
    { author: "Travis Alber", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Cozy_bistro_in_Buenos_Aires.jpg" }));
  add("restaurant:pool-04", entry("restaurants", "pool-04", "Strassencafes auf einem Platz in einer historischen Altstadt",
    { author: "Franzfoto", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Bischofsplatz_3-9_Limburg_-_Altstadt_mit_Stra%C3%9Fencafes.jpg" }));
  add("restaurant:pool-05", entry("restaurants", "pool-05", "Restauranttisch mit Getraenk und Weinflaschen im Hintergrund",
    { author: "Shixart1985", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Man_sits_at_table_holding_a_glass_of_water_in_a_restaurant_with_wine_bottles_in_the_background.jpg" }));
  add("restaurant:pool-06", entry("restaurants", "pool-06", "Rustikale Weinstube mit Holzeinrichtung und gedeckten Tischen",
    { author: "Joerg Blobelt", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:20070803110DR_Mei%C3%9Fen_Oberspaar_Weinstube_Bauernh%C3%A4usl.jpg" }));
  add("restaurant:pool-07", entry("restaurants", "pool-07", "Koeche bei der Arbeit in einer Restaurantkueche",
    { author: "P1898", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Guevarra%E2%80%99s_restaurant_kitchen_San_Juan_Metro_Manila.jpg" }));
  add("restaurant:pool-08", entry("restaurants", "pool-08", "Nahaufnahme eines Desserts aus Brombeeren und Apfel",
    { author: "Acabashi", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Blackberry_and_apple_crumble_at_Black_Horse_Inn,_Nuthurst_West_Sussex_England_1.jpg" }));

  return out;
}

export const images: Record<string, ImageEntry> = buildRegistry();

export const getImage = (key?: string): ImageEntry | undefined =>
  key ? images[key] : undefined;

/**
 * Zuweisung eines Stimmungsbild-Pools (Hotels/Restaurants), fuer die es keine
 * lizenzfreien Betriebsfotos gibt. Round-Robin ueber die kanonische Listen-
 * reihenfolge verteilt die Pool-Bilder gleichmaessig und vermeidet Cluster.
 */
const HOTEL_POOL_SIZE = 8;
const RESTAURANT_POOL_SIZE = 8;

const pad2 = (n: number) => String((n % 8) + 1).padStart(2, "0");

const hotelPoolIndex: Record<string, number> = {};
hotels.forEach((h, i) => (hotelPoolIndex[h.slug] = i % HOTEL_POOL_SIZE));

const restaurantPoolIndex: Record<string, number> = {};
restaurants.forEach((r, i) => (restaurantPoolIndex[r.slug] = i % RESTAURANT_POOL_SIZE));

/** Key ins Hotel-Stimmungsbild-Pool (hotel:pool-0X), falls kein eigener imageKey. */
export const hotelPoolKey = (slug: string) =>
  `hotel:pool-${pad2(hotelPoolIndex[slug] ?? 0)}`;

/** Key ins Restaurant-Stimmungsbild-Pool (restaurant:pool-0X). */
export const restaurantPoolKey = (slug: string) =>
  `restaurant:pool-${pad2(restaurantPoolIndex[slug] ?? 0)}`;
