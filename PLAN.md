# trier-reisen.de — Master-Plan

> **Stadtportal Trier mit Reise-Magazin-Charakter** (älteste Stadt Deutschlands, UNESCO, Mosel)
> Design: ElevenLabs (Architect's Blueprint Warm)
> Domain: trier-reisen.de
> Stand: 2026-05-26

## 1. Strategische Positionierung

**Hook im Namen:** "trier-reisen" = Reise-Versprechen. Top-Funnel via Tourismus/UNESCO/Mosel-Wein.

### 3-Layer-Strategie

1. **Tourist-Layer (Primary)** — UNESCO-Pflicht-Tour (Porta Nigra, Kaiserthermen, Dom, Amphitheater), Reise-Itineraries, Hotel-Affiliate.
2. **Wein-/Mosel-Layer** — Olewig-Weingüter, Mosel-Region, Weinwanderungen.
3. **Local-Authority-Layer** — Bezirks-Hubs, Kategorien, Praktisches (ÖPNV, Wetter).
4. **Business-Layer (Phase 2)** — Premium-Listings für Weingüter, Hotels, Restaurants.

### Monetarisierung

- **Affiliate**: Stay22 (Hotels), GetYourGuide (Antikenfestspiele, Stadtführungen, Mosel-Touren)
- **AdSense**: ca-pub-3946820918041547 (Webmagics)
- **Phase 2**: Premium-Listings 49€/149€

## 2. Design-Entscheidung

**Refero-Style: ElevenLabs** → siehe `DESIGN-elevenlabs.md`
- Akzent: Ember `#ff4704` (römischer Sandstein-Glanz)
- Page-BG: Eggshell `#fdfcfc` (nie reines Weiß)
- Display: Cormorant Garamond 300, Body: Inter
- **Trier-Twist**: Logo = Porta-Nigra-Silhouette in Ember; Display-Schrift Cormorant trägt antike Würde

## 3. Stadt-Recherche

Siehe `STADT-RECHERCHE.md` (MVP-v0, Erweiterung in Phase 1).

## 4. Datenmodell

```
src/data/
├── city.ts              # Trier-Metadaten (Lat/Lng 49.75/6.64, Sprache de)
├── districts.ts         # 12 Bezirke (innenstadt, olewig, etc.)
├── sights.ts            # ~24 Sights (UNESCO-Schwerpunkt)
├── hotels.ts            # ~16 Hotels
├── restaurants.ts       # ~25 Restaurants (mit Weinstuben-Olewig)
├── categories.ts        # ~10 Kategorien (roemisches-erbe, wein, unesco, etc.)
├── events.ts            # ~8 Events (Antikenfestspiele!)
├── news.ts              # Optional (kein primärer Fokus, niedrige Frequenz)
└── features.ts          # news: false, branchen: false
```

## 5. Seitenstruktur

Standard Sitemap + Wein-/Antike-Schwerpunkt:
- `/` Hero mit Porta-Nigra-Foto
- `/sehenswuerdigkeiten/` mit Filter "UNESCO-Welterbe"
- `/hotels/`, `/restaurants/` (mit Cuisine-Filter "Weinstube")
- `/bezirke/olewig/` als prominent verlinkter Wein-Hub
- `/kategorien/roemisches-erbe/`, `/kategorien/wein/`, `/kategorien/unesco/`
- `/reiseplaner/3-tage-trier/`, `/reiseplaner/trier-mit-kindern/`, `/reiseplaner/trier-bei-regen/`
- `/events/antikenfestspiele/`, `/events/olewiger-weinfest/`
- `/praktisches/oepnv/`, `/wetter/`
- `/impressum/`, `/datenschutz/`

## 6. Logo-Konzept

- **Bildmarke**: Porta-Nigra-Silhouette (2 Stockwerke + Bogen) als geometrische SVG in Ember.
- **Wordmark**: "Trier" in Cormorant Garamond 300 (große Letter-Spacing-negativ) + "REISEN" als WaldenburgFH-Style 700/14/0.05em Caption.

## 7. Hosting / Deployment

**Default**: Cloudflare Pages + Git-Connect.
- Repo: `strkmrktng/trier-reisen.de` (private)
- Alternative: All-Inkl/Hostinger via GitHub Actions SSH.

## 8. 12-Step-Workflow-Status

| # | Step | Status |
|---|---|---|
| 1 | Strategische Positionierung | ✅ |
| 2 | Design + brand.css | ✅ |
| 3 | Logo + Favicon | ✅ |
| 4 | Stadt-Recherche | ✅ |
| 5 | Datenmodell | ✅ |
| 6 | Astro-Bootstrap | ✅ |
| 7 | Detail-Page-Templates | ✅ |
| 8 | Bilder (Wikimedia: Porta, Dom, Amphitheater) | ⏳ Inputs ausstehend |
| 9 | Content (Reise-Guides, Itineraries) | ✅ 3 Guides, erweiterbar |
| 10 | SEO-Hygiene | ✅ Sitemap, Canonical, OG, robots.txt |
| 11 | DEPLOYMENT-PLAN.md | ⏳ vor Step 12 |
| 12 | Domain + Go-Live | ⏳ Inputs ausstehend |

## 9. Nächste 5 Aktionen

1. Astro-Bootstrap aus `koeln-interaktiv-astro/` adaptieren
2. `src/styles/brand.css` aus DESIGN-MD übernehmen
3. Wikimedia-Bilder ziehen (Porta Nigra, Kaiserthermen, Dom, Amphitheater, Konstantinbasilika)
4. Logo-SVG (Porta-Nigra)
5. `src/data/city.ts` + `districts.ts` Skelette

## 10. Pflicht-Referenzen

- City-Portal-Playbook + Memory-Feedbacks (no em-dashes, umlaute, mobile-menu, geo-ai-search)
- Trier-spezifisches Backlink-Potenzial: Weingüter Olewig (Premium-Listing-Pipeline)
