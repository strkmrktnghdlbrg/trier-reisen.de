# Offene Punkte — trier-reisen.de

**Stand: 2026-08-06.** Teil der Bestandsdaten-Verifikation über alle 20 Stadtportale.
Gesamtüberblick: `../STATUS-Stadtportale.md` · Verfahren: `../City-Portal-Playbook.md` Part D.

| | |
|---|---|
| **D1 Belegfeld** | nur Restaurants |
| **D2 bookingUrl** | Property ok |
| **Einträge ohne OSM-Treffer** | 19 |
| **Nächster Schritt** | D1 fuer Hotels |

## Am 2026-08-06 erledigt

- Branchenverzeichnis (`/branchenverzeichnis/`) in die Hauptnavigation aufgenommen — stand vorher nur im Footer.

## Prüfliste — Einträge ohne OSM-Treffer

> **Kein Urteil, ein Rechercheauftrag.** Der Abgleich akzeptiert nur harte Treffer.
> Ein Nicht-Treffer heißt oft nur, dass OSM den Betrieb nicht kennt — die Trefferquote
> misst OSM-Abdeckung, nicht Datenqualität. Vorgehen: Betreiber-Website oder
> Property-Seite suchen. Gefunden → `source` eintragen. Nichts gefunden → nach D4
> zurückziehen, **nicht** mit erfundenen Koordinaten reparieren.

**Restaurants** (14 von 20 offen · OSM-Referenz für Trier: 450 POIs)

- [ ] Zum Domstein
- [ ] Kartoffelkiste
- [ ] Pfeffermuehle
- [ ] Bei Joh und Otto
- [ ] Weingut Reverchon
- [ ] Ristorante L'Osteria
- [ ] Ristorante La Bottega
- [ ] Pizzeria Donna Margherita
- [ ] Vapiano Trier
- [ ] Akito Sushi
- [ ] Bambus
- [ ] Lieblingsstube
- [ ] Burgerlich
- [ ] Tabula Rasa

**Hotels** (5 von 15 offen · OSM-Referenz: 83 POIs)

- [ ] Best Western Plus Hotel Trier City
- [ ] Domhotel Trier
- [ ] Hotel Roemischer Kaiser
- [ ] Ibis Trier
- [ ] Hotel-Weinhaus Haag

## Offene Entscheidung (gilt für alle Portale)

Wie hart der D1-Maßstab? **Streng** (`coordinates` + `source` + `checkedAt` sofort
Pflicht — hat ev-duisburg von 30 auf 10 veröffentlichte Einträge gekürzt) oder
**gestaffelt** (Koordinaten sofort, `source` mit Frist). Ohne diese Ansage nicht
mit der Umstellung anfangen.
