/**
 * fetch-osm-partners.mjs - echte Trierer Betriebe aus OpenStreetMap.
 *
 * Quelle: Overpass API. Die Daten stehen unter der ODbL, die Namensnennung
 * ((c) OpenStreetMap-Mitwirkende) ist Pflicht und laeuft im Portal ueber
 * src/components/OsmAttribution.astro - auf der Verzeichnis-Startseite und auf
 * jeder Kategorie-Seite, die OSM-Daten zeigt.
 *
 *   node scripts/fetch-osm-partners.mjs            # DRY: nur Statistik
 *   node scripts/fetch-osm-partners.mjs --write    # schreibt src/data/partners.osm.json
 *   node scripts/fetch-osm-partners.mjs --refresh  # Cache ignorieren, neu laden
 *
 * Portiert von koeln-interaktiv.de / komma-mannheim.de (Blueprint:
 * heidelberg-guide.com). Besonderheiten in diesem Repo:
 *
 * GEBIETSFILTER - am 2026-08-02 per Probe geprueft:
 *   rel["name"="Trier"]["boundary"="administrative"] liefert weltweit genau
 *   einen Treffer: Relation 172679, admin_level=6, wikidata=Q3138,
 *   de:place=city - die kreisfreie Stadt Trier. (Zum Vergleich im selben
 *   Probelauf: rel 721776 "Trier-Land" admin_level=7 ist die Verbandsgemeinde
 *   im Landkreis Trier-Saarburg, rel 1255905 "Trierweiler" admin_level=8 eine
 *   eigene Gemeinde. Beide heissen anders und werden vom Filter nicht
 *   getroffen.) Das Skript gibt die tatsaechlich getroffene Area aus und
 *   bricht ab, wenn ein spaeterer Lauf auf einer anderen Relation landet.
 *
 * TAXONOMIE - fest vorgegeben durch branchenCategories in
 *   src/data/branchenverzeichnis.ts. OSM-Betriebe werden auf diese
 *   Kategorie-Slugs abgebildet und tragen zusaetzlich ein feines Label
 *   ("Baeckerei", "Weingut"), nach dem die Kategorie-Seite gruppiert. Es wird
 *   KEINE zweite Taxonomie erzeugt, damit keine bestehende Kategorie-URL
 *   verwaist.
 *
 * HAUSREGELN:
 *   - Keine E-Mail-Adressen in die JSON (nirgends Klartext-Adressen).
 *   - OSM-Eintraege sind reine Listings: keine Detailseite, kein Detail-Link.
 *   - Freie Eintraege bekommen keinen ausgehenden Website-Link.
 */
import { writeFileSync, existsSync, readFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";

const WRITE = process.argv.includes("--write");
const REFRESH = process.argv.includes("--refresh");
const OUT = "src/data/partners.osm.json";
const CACHE = join(process.env.TEMP || "/tmp", "osm-raw-trier.json");

/** Erwartete OSM-Relation der kreisfreien Stadt Trier (Probe 2026-08-02). */
const EXPECTED_REL = 172679;

/** Ab dieser Menge wird zusaetzlich Telefon ODER Website verlangt (Scale Control). */
const SCALE_LIMIT = 10000;

/** Beschreibender User-Agent - generische Browser-UAs werden gedrosselt. */
const UA =
  "trier-reisen.de-directory/1.0 (Branchenverzeichnis-Import; Kontakt: info(at)webmagics.net)";

const ENDPOINTS = [
  "https://overpass.kumi.systems/api/interpreter",
  "https://overpass-api.de/api/interpreter",
  "https://overpass.private.coffee/api/interpreter",
  "https://maps.mail.ru/osm/tools/overpass/api/interpreter",
];

const QUERY = `[out:json][timeout:240];
area["name"="Trier"]["admin_level"="6"]["boundary"="administrative"]->.a;
.a out ids tags;
(
  nwr["shop"]["name"](area.a);
  nwr["amenity"~"^(restaurant|cafe|bar|pub|fast_food|ice_cream|biergarten|pharmacy|dentist|doctors|clinic|veterinary|driving_school|fuel|car_wash|car_rental|bank|nightclub|cinema|theatre)$"]["name"](area.a);
  nwr["craft"]["name"](area.a);
  nwr["office"]["name"](area.a);
  nwr["healthcare"]["name"](area.a);
  nwr["leisure"~"^(fitness_centre|sports_centre|dance|bowling_alley|escape_game)$"]["name"](area.a);
  nwr["tourism"~"^(hotel|guest_house|hostel|apartment|motel)$"]["name"](area.a);
);
out center tags;`;

// --- OSM-Tags -> [feines Label, Kategorie-Slug] ------------------------------
// Kategorie-Slugs = branchenCategories in src/data/branchenverzeichnis.ts.
const CAT = {
  GASTRO: "gastronomie",
  HOTEL: "hotels",
  HEALTH: "apotheken",
  BANK: "banken",
  WINE: "weingueter",
  CRAFT: "handwerk",
  SERVICE: "dienstleistung",
  RETAIL: "einzelhandel",
  LEISURE: "freizeit",
};

function classify(tags) {
  const s = tags.shop,
    a = tags.amenity,
    c = tags.craft,
    o = tags.office,
    h = tags.healthcare,
    l = tags.leisure,
    tm = tags.tourism;

  // --- Weingueter & Weinhandel (Mosel, Saar, Ruwer) ---
  // Steht bewusst vor der Gastronomie: ein Weingut mit Strausswirtschaft ist
  // in Trier zuerst ein Weingut.
  if (c === "winery" || s === "winery") return ["Weingut", CAT.WINE];
  if (s === "wine") return ["Weinhandlung", CAT.WINE];

  // --- Gastronomie ---
  if (a === "restaurant") return ["Restaurant", CAT.GASTRO];
  if (a === "cafe") return ["Café", CAT.GASTRO];
  if (a === "fast_food") return ["Imbiss", CAT.GASTRO];
  if (a === "bar" || a === "pub" || a === "biergarten") return ["Bar & Kneipe", CAT.GASTRO];
  if (a === "ice_cream") return ["Eisdiele", CAT.GASTRO];
  if (s === "bakery") return ["Bäckerei", CAT.GASTRO];
  if (s === "butcher") return ["Metzgerei", CAT.GASTRO];
  if (s === "confectionery" || s === "pastry") return ["Konditorei", CAT.GASTRO];
  if (s === "beverages" || s === "alcohol") return ["Getränke & Spirituosen", CAT.GASTRO];
  if (s === "greengrocer" || s === "deli" || s === "cheese" || s === "seafood")
    return ["Feinkost", CAT.GASTRO];
  if (s === "coffee" || s === "tea") return ["Kaffee & Tee", CAT.GASTRO];

  // --- Apotheken & Gesundheit ---
  if (a === "pharmacy") return ["Apotheke", CAT.HEALTH];
  if (a === "dentist" || h === "dentist") return ["Zahnarzt", CAT.HEALTH];
  if (a === "doctors" || a === "clinic" || h === "doctor" || h === "clinic" || h === "hospital")
    return ["Arztpraxis & Klinik", CAT.HEALTH];
  if (a === "veterinary" || h === "veterinary") return ["Tierarzt", CAT.HEALTH];
  if (s === "hairdresser") return ["Friseur", CAT.HEALTH];
  if (s === "beauty" || s === "cosmetics" || s === "perfumery") return ["Kosmetik", CAT.HEALTH];
  if (s === "massage" || h === "physiotherapist") return ["Physio & Massage", CAT.HEALTH];
  if (s === "optician") return ["Optiker", CAT.HEALTH];
  if (s === "hearing_aids") return ["Hörakustiker", CAT.HEALTH];
  if (s === "medical_supply" || s === "herbalist") return ["Sanitätshaus", CAT.HEALTH];
  if (s === "chemist") return ["Drogerie", CAT.HEALTH];
  if (h) return ["Gesundheit & Therapie", CAT.HEALTH];

  // --- Behoerden, Vereine, nicht-kommerzielle Einrichtungen: verwerfen ---
  const dropOffice = new Set([
    "government", "administrative", "diplomatic", "political_party", "ngo",
    "association", "research", "educational_institution", "foundation",
    "religion", "guild", "quango", "charity", "union",
  ]);
  if (a === "government" || (o && dropOffice.has(o))) return ["", ""];

  // --- Handwerk & Bau ---
  if (c) {
    const craftMap = {
      electrician: "Elektriker",
      plumber: "Sanitär & Heizung",
      hvac: "Sanitär & Heizung",
      carpenter: "Schreiner",
      joiner: "Schreiner",
      painter: "Maler & Lackierer",
      gardener: "Garten & Landschaftsbau",
      roofer: "Dachdecker",
      tiler: "Fliesenleger",
      locksmith: "Schlosser",
      metal_construction: "Metallbau",
      shoemaker: "Schuhmacher",
      tailor: "Schneiderei",
      dressmaker: "Schneiderei",
      photographer: "Fotograf",
      caterer: "Catering",
      sweep: "Schornsteinfeger",
      chimney_sweeper: "Schornsteinfeger",
      plasterer: "Stuckateur",
      glaziery: "Glaserei",
      window_construction: "Fensterbau",
      scaffolder: "Gerüstbau",
      stonemason: "Steinmetz",
      upholsterer: "Polsterei",
      builder: "Bauunternehmen",
      bricklayer: "Bauunternehmen",
      insulation: "Bauunternehmen",
      floorer: "Bodenleger",
      key_cutter: "Schlüsseldienst",
      confectionery: "Konditorei",
      brewery: "Brauerei",
      jeweller: "Goldschmied",
      goldsmith: "Goldschmied",
      watchmaker: "Uhrmacher",
      electronics_repair: "Elektronik-Reparatur",
      car_repair: "Kfz-Werkstatt",
      signmaker: "Werbetechnik",
      printer: "Druckerei",
      bookbinder: "Buchbinderei",
      organ_builder: "Orgelbau",
      piano_tuner: "Klavierbau",
      handicraft: "Handwerk",
    };
    return [craftMap[c] || "Handwerk", CAT.CRAFT];
  }
  if (s === "hardware" || s === "doityourself" || s === "trade" || s === "building_materials")
    return ["Baumarkt & Baustoffe", CAT.CRAFT];

  // --- Banken & Finanzen ---
  if (a === "bank") return ["Bank & Sparkasse", CAT.BANK];
  if (o === "insurance") return ["Versicherung", CAT.BANK];
  if (o === "financial" || o === "financial_advisor") return ["Finanzberatung", CAT.BANK];
  if (o === "tax_advisor" || o === "accountant") return ["Steuerberatung", CAT.BANK];

  // --- Dienstleistung & Beratung ---
  if (s === "car" || s === "car_repair" || s === "motorcycle") return ["Autohaus & Kfz", CAT.SERVICE];
  if (a === "car_wash") return ["Autowäsche", CAT.SERVICE];
  if (a === "car_rental") return ["Autovermietung", CAT.SERVICE];
  if (a === "fuel") return ["Tankstelle", CAT.SERVICE];
  if (a === "driving_school") return ["Fahrschule", CAT.SERVICE];
  if (s === "laundry" || s === "dry_cleaning") return ["Reinigung & Wäscherei", CAT.SERVICE];
  if (s === "funeral_directors") return ["Bestattungen", CAT.SERVICE];
  if (s === "travel_agency") return ["Reisebüro", CAT.SERVICE];
  if (s === "copyshop") return ["Copyshop & Druck", CAT.SERVICE];
  if (s === "estate_agent") return ["Immobilien", CAT.SERVICE];
  if (o) {
    const offMap = {
      lawyer: "Rechtsanwalt",
      notary: "Notar",
      estate_agent: "Immobilien",
      it: "IT-Dienstleister",
      telecommunication: "IT & Telekom",
      architect: "Architekturbüro",
      engineer: "Ingenieurbüro",
      surveyor: "Vermessungsbüro",
      employment_agency: "Personalvermittlung",
      advertising_agency: "Werbeagentur",
      newspaper: "Verlag & Medien",
      publisher: "Verlag & Medien",
      travel_agent: "Reisebüro",
      coworking: "Coworking",
      logistics: "Logistik",
      moving_company: "Umzugsunternehmen",
      energy_supplier: "Energieversorger",
      water_utility: "Energieversorger",
      property_management: "Hausverwaltung",
      security: "Sicherheitsdienst",
      consulting: "Unternehmensberatung",
      therapist: "Therapie & Beratung",
      insurance: "Versicherung",
      company: "Unternehmen",
      yes: "Unternehmen",
    };
    return [offMap[o] || "Büro & Dienstleistung", CAT.SERVICE];
  }

  // --- Freizeit & Sport ---
  if (a === "nightclub") return ["Club & Nightlife", CAT.LEISURE];
  if (a === "cinema") return ["Kino", CAT.LEISURE];
  if (a === "theatre") return ["Theater & Bühne", CAT.LEISURE];
  if (l === "dance") return ["Tanzschule", CAT.LEISURE];
  if (l === "fitness_centre") return ["Fitnessstudio", CAT.LEISURE];
  if (l === "sports_centre") return ["Sport & Freizeitanlage", CAT.LEISURE];
  if (l === "bowling_alley") return ["Bowling & Kegeln", CAT.LEISURE];
  if (l === "escape_game") return ["Escape Room", CAT.LEISURE];

  // --- Hotels & Uebernachtung ---
  if (tm) {
    const tmMap = {
      hotel: "Hotel",
      motel: "Motel",
      guest_house: "Pension",
      hostel: "Hostel",
      apartment: "Ferienwohnung",
    };
    return [tmMap[tm] || "Unterkunft", CAT.HOTEL];
  }

  // --- Einzelhandel & Shopping ---
  if (s) {
    const shopMap = {
      supermarket: "Supermarkt",
      organic: "Bioladen",
      convenience: "Kiosk & Nahversorger",
      kiosk: "Kiosk & Nahversorger",
      clothes: "Mode & Bekleidung",
      boutique: "Mode & Bekleidung",
      fabric: "Stoffe & Kurzwaren",
      shoes: "Schuhe",
      bag: "Taschen & Koffer",
      jewelry: "Schmuck & Uhren",
      watches: "Schmuck & Uhren",
      books: "Buchhandlung",
      newsagent: "Zeitschriften & Presse",
      stationery: "Schreibwaren",
      furniture: "Möbel & Einrichtung",
      interior_decoration: "Möbel & Einrichtung",
      houseware: "Haushaltswaren",
      kitchen: "Küchenstudio",
      bed: "Betten & Matratzen",
      curtain: "Gardinen & Sonnenschutz",
      carpet: "Teppiche & Böden",
      flooring: "Teppiche & Böden",
      lighting: "Leuchten",
      bicycle: "Fahrrad",
      outdoor: "Outdoor & Camping",
      sports: "Sportgeschäft",
      mobile_phone: "Handy & Telekom",
      computer: "Computer & Elektronik",
      electronics: "Computer & Elektronik",
      hifi: "HiFi & Audio",
      camera: "Foto & Kamera",
      photo: "Foto & Kamera",
      video_games: "Games",
      music: "Musik & Platten",
      musical_instrument: "Musikinstrumente",
      tobacco: "Tabakwaren",
      e_cigarette: "E-Zigaretten",
      toys: "Spielwaren",
      baby_goods: "Babyausstattung",
      childcare: "Babyausstattung",
      car_parts: "Kfz-Teile",
      tyres: "Reifen",
      motorcycle_repair: "Kfz-Werkstatt",
      pet: "Zoohandlung",
      pet_grooming: "Hundesalon",
      agrarian: "Agrarhandel",
      garden_centre: "Gartencenter",
      florist: "Blumen & Floristik",
      gift: "Geschenke",
      second_hand: "Secondhand",
      charity: "Secondhand",
      antiques: "Antiquitäten",
      art: "Kunst & Galerie",
      frame: "Rahmen & Kunst",
      craft: "Bastelbedarf",
      variety_store: "Kaufhaus",
      department_store: "Kaufhaus",
      wholesale: "Großhandel",
      hairdresser_supply: "Friseurbedarf",
      erotic: "Erotik",
      lottery: "Lotto & Toto",
      bookmaker: "Wettbüro",
      pawnbroker: "Pfandhaus",
      money_lender: "Finanzdienst",
      locksmith: "Schlüsseldienst",
      appliance: "Haushaltsgeräte",
      electrical: "Elektrofachhandel",
      paint: "Farben & Lacke",
      swimming_pool: "Pool & Sauna",
      weapons: "Waffen & Jagd",
      fishing: "Angelbedarf",
      model: "Modellbau",
      collector: "Sammlerbedarf",
      games: "Spiele & Hobby",
      candles: "Kerzen & Deko",
      party: "Partybedarf",
      nutrition_supplements: "Nahrungsergänzung",
      health_food: "Reformhaus",
      farm: "Hofladen",
      dairy: "Hofladen",
      rental: "Vermietung",
      storage_rental: "Lagerraum",
      printing: "Druckerei",
      sewing: "Nähbedarf",
      leather: "Lederwaren",
      furniture_repair: "Möbelservice",
    };
    return [shopMap[s] || "Fachhandel", CAT.RETAIL];
  }
  return ["Fachhandel", CAT.RETAIL];
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function fetchOverpass() {
  if (existsSync(CACHE) && !REFRESH) {
    console.error("(nutze Cache " + CACHE + ", --refresh laedt neu)");
    return JSON.parse(readFileSync(CACHE, "utf8"));
  }
  const errors = [];
  for (const ep of ENDPOINTS) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        console.error(`Overpass: ${ep} (Versuch ${attempt}) ...`);
        const res = await fetch(ep, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": UA,
          },
          body: "data=" + encodeURIComponent(QUERY),
        });
        if (!res.ok) {
          errors.push(`${ep}: HTTP ${res.status}`);
          const busy = res.status === 429 || res.status === 504;
          console.error("  HTTP " + res.status + (busy ? " (ausgelastet, naechster Endpunkt)" : ""));
          if (busy) break;
          continue;
        }
        const json = await res.json();
        if (!json || !Array.isArray(json.elements)) {
          errors.push(`${ep}: Antwort ohne elements-Array`);
          continue;
        }
        writeFileSync(CACHE, JSON.stringify(json), "utf8");
        return json;
      } catch (e) {
        errors.push(`${ep}: ${e.message}`);
        console.error("  Fehler: " + e.message);
      }
    }
  }
  throw new Error(
    "Kein Overpass-Endpunkt erreichbar. Versuche:\n  - " + errors.join("\n  - ")
  );
}

const data = await fetchOverpass();

// --- Gebiet verifizieren, nicht annehmen -----------------------------------
const areaEl = data.elements.find((e) => e.type === "area");
if (!areaEl) {
  throw new Error(
    "Overpass hat keine Area zurueckgegeben. Gebietsfilter pruefen: " +
      'area["name"="Trier"]["admin_level"="6"]["boundary"="administrative"].'
  );
}
const areaRel = areaEl.id - 3600000000;
console.log(
  "Gebiet: area " + areaEl.id + " (Relation " + areaRel + ") = " + areaEl.tags.name +
    ", admin_level=" + areaEl.tags.admin_level +
    ", wikidata=" + (areaEl.tags.wikidata || "-")
);
if (areaRel !== EXPECTED_REL) {
  throw new Error(
    "Unerwartetes Gebiet: Relation " + areaRel + " statt " + EXPECTED_REL +
      " (kreisfreie Stadt Trier, wikidata Q3138). Abbruch - bitte neu proben."
  );
}

const rawElements = data.elements.filter((e) => e.type !== "area");
console.log("OSM-Elemente roh:            " + rawElements.length);
if (rawElements.length === 0) {
  throw new Error("Overpass lieferte 0 Betriebs-Elemente. Query pruefen.");
}

const seen = new Map();
const partners = [];
const catCount = {}, labelCount = {};
let withStreet = 0, withPhone = 0, withWeb = 0, withEmail = 0;
let droppedArea = 0, droppedKind = 0, droppedDupe = 0;

for (const el of rawElements) {
  const t = el.tags || {};
  const name = (t.name || "").trim();
  if (!name || name.length > 90) continue;

  const street = [t["addr:street"], t["addr:housenumber"]].filter(Boolean).join(" ");
  const zip = t["addr:postcode"] || "";
  const cityName = t["addr:city"] || "Trier";
  const phone = (t.phone || t["contact:phone"] || "").trim();
  const website = (t.website || t["contact:website"] || "").trim();
  const email = (t.email || t["contact:email"] || "").trim();

  // Falsch getaggte Fremdadressen aussortieren. Trier hat 54290 bis 54296,
  // das Umland (Konz 54329, Schweich 54338) faellt damit raus.
  if (zip && !/^5429[0-6]$/.test(zip)) { droppedArea++; continue; }
  if (t["addr:city"] && !/trier/i.test(t["addr:city"])) { droppedArea++; continue; }

  const [label, category] = classify(t);
  if (!label) { droppedKind++; continue; } // Behoerden / Nicht-Betriebe

  const key = name.toLowerCase() + "|" + (zip || street || el.id);
  if (seen.has(key)) { droppedDupe++; continue; }
  seen.set(key, true);

  if (street) withStreet++;
  if (phone) withPhone++;
  if (website) withWeb++;
  if (email) withEmail++;
  catCount[category] = (catCount[category] || 0) + 1;
  labelCount[label] = (labelCount[label] || 0) + 1;

  partners.push({
    name,
    slug: "osm-" + slugify(name).slice(0, 60) + "-" + el.id,
    category,
    label,
    street,
    zip,
    city: cityName,
    phone,
    website,
    osmId: `${el.type}/${el.id}`,
  });
  // E-Mail wird bewusst NICHT gespeichert: Hausregel "keine Klartext-Adressen".
}

console.log("Verworfen (Gebiet/PLZ):      " + droppedArea);
console.log("Verworfen (Behoerden u.ae.): " + droppedKind);
console.log("Verworfen (Duplikate):       " + droppedDupe);
console.log("Mit Name, dedupliziert:      " + partners.length);
console.log("  mit Strasse/Adresse:       " + withStreet);
console.log("  mit Telefon:               " + withPhone);
console.log("  mit Website:               " + withWeb);
console.log("  mit E-Mail (nicht gespeichert): " + withEmail);
console.log("");
console.log("Nach Kategorie:", catCount);
console.log("");
console.log("Top-Labels:");
Object.entries(labelCount)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 40)
  .forEach(([k, v]) => console.log("  " + String(v).padStart(5) + "  " + k));

// ---------------------------------------------------------------------------
// Verzeichnis-Qualitaet: Name + Strasse, dedupliziert gegen die bestehenden
// Eintraege des Verzeichnisses (kuratierte Liste in branchenverzeichnis.ts
// sowie restaurants.ts und hotels.ts).
// ---------------------------------------------------------------------------
const norm = (x) => (x || "").toLowerCase().replace(/[^a-z0-9äöüß]/g, "");

const existingKeys = new Set();
for (const file of [
  "src/data/branchenverzeichnis.ts",
  "src/data/restaurants.ts",
  "src/data/hotels.ts",
]) {
  if (!existsSync(file)) continue;
  const src = readFileSync(file, "utf8");
  for (const m of src.matchAll(/\bname:\s*"([^"]+)"/g)) existingKeys.add(norm(m[1]));
}
console.log("");
console.log("Dedup-Basis (vorhandene Verzeichnis-Eintraege): " + existingKeys.size);

let quality = partners
  .filter((p) => p.street)
  .filter((p) => !existingKeys.has(norm(p.name)));

console.log("Qualitaet (Name + Strasse, dedupliziert): " + quality.length);

// --- Scale Control ---------------------------------------------------------
const strict = quality.filter((p) => p.phone || p.website);
console.log("Davon mit Telefon ODER Website:          " + strict.length);

if (quality.length > SCALE_LIMIT) {
  console.log("");
  console.log("!!! ueber " + SCALE_LIMIT + " Eintraege - Scale Control greift.");
  console.log("!!! Zusaetzliche Pflicht: Telefon ODER Website. Ausgabe: " + strict.length);
  quality = strict;
} else {
  console.log("(unter " + SCALE_LIMIT + ", keine zusaetzliche Kontakt-Pflicht)");
}

const qualityByCat = {};
for (const p of quality) qualityByCat[p.category] = (qualityByCat[p.category] || 0) + 1;
console.log("");
console.log("Ausgabe nach Kategorie:", qualityByCat);

if (WRITE) {
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify(quality, null, 2) + "\n", "utf8");
  console.log("");
  console.log("Geschrieben: " + quality.length + " Betriebe -> " + OUT);
} else {
  console.log("");
  console.log("DRY RUN - nichts geschrieben. Mit --write ausfuehren.");
}
