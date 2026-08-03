/**
 * Sperrliste fuer OSM-Eintraege (Loeschwunsch dauerhaft wirksam).
 *
 * Betriebe aus OpenStreetMap sind ohne ihr Zutun im Verzeichnis gelandet.
 * Wer die Loeschung verlangt, wird hier eingetragen. Ein einzelnes Loeschen in
 * partners.osm.json waere wirkungslos, weil der naechste Lauf von
 * scripts/fetch-osm-partners.mjs den Datensatz aus OSM zurueckholen wuerde.
 *
 * Datei: src/data/osm-blocklist.json - ein JSON-ARRAY, standardmaessig leer.
 * Niemals Beispiel- oder Testeintraege committen.
 *
 * Eintrags-Schema (alle Felder optional, aber siehe Trefferregel):
 *   {
 *     "osmId":  "node/123456789",   // Typ/ID aus OSM (node|way|relation)
 *     "name":   "Muster GmbH",      // Firmenname wie im Verzeichnis
 *     "street": "Musterweg 3",      // Strasse inkl. Hausnummer
 *     "reason": "Loeschwunsch per E-Mail",
 *     "date":   "2026-08-02"        // Eingang des Wunsches, ISO-Datum
 *   }
 *
 * Trefferregel: gesperrt ist ein Datensatz, wenn
 *   a) die osmId uebereinstimmt, ODER
 *   b) normalisierter Name UND normalisierte Strasse beide uebereinstimmen.
 * Normalisiert heisst: klein geschrieben, ohne Satz- und Leerzeichen.
 * Ein Eintrag ohne osmId braucht also zwingend name UND street.
 *
 * Die Sperre greift doppelt (Defence in Depth):
 *   1. im Importskript, bevor partners.osm.json geschrieben wird,
 *   2. hier in der Datenschicht, damit auch eine veraltete partners.osm.json
 *      keinen gesperrten Betrieb mehr ausgibt.
 */
import blocklistRaw from "./osm-blocklist.json";

export type OsmBlocklistEntry = {
  osmId?: string;
  name?: string;
  street?: string;
  reason?: string;
  date?: string;
};

export const osmBlocklist: OsmBlocklistEntry[] = blocklistRaw as OsmBlocklistEntry[];

/** klein schreiben, Satz- und Leerzeichen entfernen */
export const normBlock = (v?: string) =>
  (v || "").toLowerCase().replace(/[^a-z0-9äöüß]/g, "");

export function isOsmBlocked(rec: {
  osmId?: string;
  name?: string;
  street?: string;
}): boolean {
  if (!osmBlocklist.length) return false;
  const id = (rec.osmId || "").trim().toLowerCase();
  const name = normBlock(rec.name);
  const street = normBlock(rec.street);
  return osmBlocklist.some((b) => {
    if (b.osmId && id && b.osmId.trim().toLowerCase() === id) return true;
    if (b.name && b.street && name && street) {
      return normBlock(b.name) === name && normBlock(b.street) === street;
    }
    return false;
  });
}
