# Offene Punkte — trier-reisen.de (Audit 2026-07-29)

Audit gegen die Familien-Checkliste. **Nichts umgesetzt.**
Repo-Stand: **0 uncommitted, 1 Commit noch nicht gepusht.** Dev-Server: Port 4413.
Astro 5.18.2, Boot 879 ms, keine 500er über 286 gecrawlte Seiten.

🚨 **VOR DEM PUSH:** Der unveröffentlichte Commit **bringt zwei Defekte mit**
(undefinierter CSS-Token + 4 leere indexierbare Kategorieseiten) — siehe unten.

Routen: flache Artikel-Routen im Root (`/[artikel].astro`, 25 Posts), `/bezirke/`,
`/kategorien/`, `/reiseplaner/`, `/magazin/`, `/branchenverzeichnis/`, `/werben/*`,
`/hotels-trier-[event]`, 7 Service-Seiten, vollständiger `/en/*`-Baum (21 Seiten).
**Kein `src/content/`, kein `content.config.ts`** — alles plain TS in `src/data/`.

---

## ❌ P1 — Die großen Brocken

### 1. 🔥 Der Font-Bug ist HIER am sichtbarsten — Headlines sind Times New Roman
- `src/styles/brand.css:8` lädt **Cormorant Garamond + Inter + JetBrains Mono** per
  CSS-`@import`; weil `global.css:1-2` zuerst `tailwindcss` importiert, landet der
  Font-`@import` mitten in der Datei → Build-Warning
  `[vite:css][postcss] @import must precede all other statements` (3×, Zeile 959).
- Live verifiziert: `document.fonts.size === **0**`, `[...document.fonts]` leer,
  **null Requests** an fonts.googleapis/gstatic, **kein `<link>`** zu einem Font-Host.
- 🔑 **Breiten-Probe beweist es:** `"Cormorant Garamond"` = `"Inter"` = `serif` =
  **457px** (identisch, also alle unaufgelöst) vs. `system-ui` 485px.
- ❗ **`h1`/`h2` rendern in der Browser-Standard-Serife — auf Windows Times New Roman** —
  bei 48px/36px, Weight 300. **Die Display-Serif-Designabsicht ist komplett verloren.**
  Body verliert Inter an system-ui.
- ⚠️ `document.fonts.check()` liefert hier `true` und ist **irreführend** — ignorieren.
- → Von allen 6 geprüften Sites ist Trier der **visuell schlimmste** Fall. Self-Host
  wird hier den größten sichtbaren Unterschied machen (zum Guten).

### 2. 🔥 `STAY22_API_KEY` wird nie an den Prod-Build übergeben
- `.github/workflows/deploy.yml` setzt **nur `NODE_ENV`** → der Key fehlt im Build.
- ❗ **Live-Hotel-Blöcke sind also auch in Produktion leer**, nicht nur lokal.
  Gleiches Problem wie Hamburg; **anders** als Köln/Heidelberg (dort ist der Key in der CI).
- ✅ Sonst korrekt: `lmaId: "687913400d1617d25ef77427"` ist ein **echter committeter
  Wert** (`src/data/affiliate.ts:8`); `mapEmbedId: ""` ist leer, **aber bewusst und
  abgefangen** — `Stay22Map.astro:36-38` fällt auf `/embed/gm?aid=…` zurück
  → **kein Prod-Bug**; kein `_TOKEN`-Mismatch (`src/lib/stay22.ts:124-125,185`);
  degradiert still (`Stay22TopHotels.astro:60`).

### 3. ⚖️ Datenschutzerklärung behauptet eine Einwilligung, die es NICHT gibt
- `src/pages/datenschutz.astro` schreibt: *"Bei aktiviertem Tracking-Pixel (Google Tag
  Manager) wird vorher eine Einwilligung gemäß § 25 TTDSG / DSGVO eingeholt"* —
  **es wird keine eingeholt.**
- GTM `GTM-PM6JDSW4`, GA4 `G-HGVKGWF37N`, AdSense `ca-pub-7432388986384363`, Stay22 und
  GetYourGuide feuern **alle unbedingt beim Load** (`BaseLayout.astro:98,102-117`);
  **null** Cookie-/Consent-DOM-Elemente gefunden.
- ❗ Das ist **schlimmer als Berlin**: dort fehlt eine versprochene UI. Hier steht eine
  **aktiv falsche Tatsachenbehauptung** in der Datenschutzerklärung.
- ❌ Zweitens: `datenschutz.astro` erwähnt **AdSense/Google Ads gar nicht**, obwohl
  AdSense installiert ist und feuert — und `en/privacy.astro` **erwähnt es**.
  → **DE und EN widersprechen sich.** (Genau umgekehrt zu Berlin.)
- ✅ Keine versprochene Cookie-Einstellungs-UI (Berlins zweiter Bug fehlt).
- ℓ Das *fehlende Consent-Gate selbst* ist laut Memory `no-custom-cookie-banner`
  gewollt (Googles CMP) → **in PROD verifizieren**. Aber **die Texte müssen stimmen.**

### 4. ⚖️ § 5a UWG: "Testsieger 2026" 14× — gegen die EIGENE Regel im Repo
- `src/pages/online-apotheke-trier.astro`: **14×** (h1:9, Lead:10, Badge:32,
  Tabelle:77, CTA:126, FAQ + **JSON-LD** :3,227,237), mit selbst erklärtem Score
  ("DocMorris 9,4/10") und **ohne genannte Methodik**.
  `apotheken-trier.astro:62` verlinkt darauf als "mit Testsieger".
- 🔑 **Das Repo widerspricht sich selbst:** `src/data/branchenverzeichnis.ts:14`
  dokumentiert als Regel *"Keine Test-/Testsieger-Claims (§ 5a UWG)"*.
- → Memory `no-test-claims`. **JSON-LD mitfixen.**
- ✅ Keine veralteten Jahreszahlen (alle "2023"-Treffer sind der Hex-Wert `#20233a`;
  das 2025 im Kuba-Artikel ist ein legitimes Publish-Datum).

### 5. ⚖️ Bildnachweise sind `sr-only` — unsichtbar UND unverlinkt
- ✅ Credit-Daten sind reich und werden **nicht gestrippt** (plain-TS-`Credit`-Typ,
  `images.ts:19-24`; 78× `author`/`license`/`licenseUrl` + 93× `sourceUrl`) —
  **kein zod**, also fehlt Berlins Schema-Bug.
- ❌ Aber `src/components/ContentImage.astro:37-41` rendert nur
  `Foto: {author}, {license}` in einer **`<figcaption class="sr-only">`** —
  für Nutzer **visuell versteckt** — und `licenseUrl`/`sourceUrl` werden in
  **null** Templates benutzt.
- ❗ Bei den römischen Monumenten (Wikimedia/CC BY-SA) ist die Attribution damit
  **unsichtbar und unverlinkt** → **Ergebnis schlechter als Berlin**, nur über einen
  anderen Mechanismus.
- 🏆 **Vorbild für den Fix: Hamburg + Karlsruhe** rendern Autor + Lizenz als
  funktionierende `<a>`-Links.

### 6. 92 dünne indexierbare Seiten, keine Policy
- ⚠️ **92 Seiten unter ~900 Zeichen Haupttext, keine mit `noindex`.**
  Schlimmste: `/bezirke/biewer/` **332**, `/bezirke/mariahof/` **351**,
  `/bezirke/trier-ost/` **359**; 4 leere Verzeichnis-Kategorien ~331–414
  (`/branchenverzeichnis/kategorie/{handwerk,einzelhandel,weingueter,dienstleistung}/`
  zeigen "Noch kein Eintrag in dieser Branche"); ~30 EN-Restaurant-/Hotel-Detailseiten
  390–700.
- ✅ `/suche/` + `/en/search/` korrekt `noindex`.
- ❌ **Keine Indexierungs-Policy** — `astro.config.mjs:11-15` filtert nur
  impressum/datenschutz/404. → Kölns `strassen-policy.mjs`-Prinzip anwenden.
- ✅ **Kein Straßenverzeichnis** → dieser Check entfällt für Trier.

---

## ⚠️ P2 — Mittel

### 7. "Acht UNESCO-Stätten" — es sind NEUN
- `src/pages/index.astro:73` "**Acht** UNESCO-Stätten";
  `src/data/categories.ts:14` "Die **acht** UNESCO-Stätten";
  `categories.ts:17` "**Acht** Einzelmonumente".
- Die Daten haben **9** Sights mit `unesco: true`, und
  `/kategorien/unesco-welterbe/` **rendert 9 Karten auf derselben Seite wie das
  "acht"-Copy**. Direkt sichtbarer Widerspruch.
- ⚠️ `src/data/city.ts:19-23` `stats`: sights 24 (echt 23), restaurants 25 (echt 24) —
  falsch, aber **`city.stats` wird nirgends referenziert** → tote Daten, nicht sichtbar.

### 8. Hotels & Restaurants ohne eigene Bilder — 8-Bild-Pool im Round-Robin
- Registry-Namespaces: `hero:`(1) `sight:`(23) `district:`(12) `category:`(10)
  `article:`(25) `hotel:`(8) `restaurant:`(8).
- **0/17 Hotels und 0/24 Restaurants** haben einen eigenen `imageKey` — sie werden
  **round-robin aus einem generischen 8-Bild-Stimmungspool** zugewiesen
  (`images.ts:462-473`) → `/hotels/` und `/restaurants/` zeigen **dieselben 8 Fotos
  wiederholt**.
- 🔑 Deshalb zeigen `/hotels/hostel-hille/` und `/hotels/hotel-deutscher-hof/`
  **dasselbe Bild zweimal** — eine **Pool-Kollision** (17 Hotels ÷ 8 Bilder,
  `images.ts:462`), **kein Layout-Bug**.
- ✅ Besser als die Schwestern: **kein** Borrowing von `sight:`/`district:` (Heidelberg)
  und **nicht** null (Köln). Echte `<img>` via `astro:assets` (20 auf der Startseite,
  alle `loading="lazy"`), **keine bildlose Seite** → Berlins Problem fehlt.
- ⚠️ Aber **`srcset` = 0** — `ContentImage.astro:29` übergibt keine
  `widths`/`densities` → keine responsiven Kandidaten. (Performance/WhitePress.)

### 9. Leere Bezirke
- Von 12 Bezirken: **0 Sights** bei trier-ost, mariahof, biewer, ruwer-eitelsbach,
  pfalzel (**5**). **0 Hotels** bei denselben 5 + trier-west-pallien (**6**).
  ❌ **0 Restaurants bei 10 von 12** (nur innenstadt und olewig haben welche).
- ✅ Die Startseiten-Karten (`slice(0,4)`: innenstadt/olewig/trier-sued/trier-nord)
  sind alle **nicht** leer.
- ⚠️ Aber der **Footer** verlinkt `/bezirke/trier-ost/` (0/0/0).

### 10. Kontrast: Akzent auf Hell fällt durch AA
- ✅ Buttons sind top: `.btn-primary` `#000` auf `#fdfcfc` = **20,5:1**,
  `.btn-outline` **21:1**. Keine leeren/unsichtbaren Buttons.
- ❌ `.eyebrow` + `.link-accent` `#ff4704` auf `#fdfcfc` = **3,33:1**
  (12–14px Normaltext, nötig 4,5) · `.pill-accent` `#ff4704` auf `#fff1ec` = **3,09:1**.
- Betrifft **site-weit**: jedes Eyebrow, jedes "Alle … →", jedes UNESCO-Badge.
  (Gleiches Problem wie Berlin.)

### 11. `.werben-avatar` ist transparent — zwei undefinierte Tokens
- `src/styles/werben.css:113`:
  `background: var(--color-surface-elevated, var(--color-border-subtle))` —
  **keiner der beiden Tokens ist definiert** → computed `rgba(0,0,0,0)`,
  Avatar-Kachel **unsichtbar** auf `/werben/premium-partner/`.
- ✅ `--color-emerald` (:92) und `--color-surface-input` (:197) haben funktionierende
  Fallbacks.
- 🚨 **Diese Datei kommt mit dem unveröffentlichten Commit.**
- 🔑 **Muster-Alarm:** Hamburg hat denselben Klassen-Fehler in *seiner* `werben.css`
  (`--color-text-subtle`, nirgends definiert). → **Die Playbook-`werben.css`-Vorlage
  referenziert Tokens, die es in den Ziel-Repos nicht gibt. Auf ALLEN Portalen prüfen.**

### 12. Kein TOC
- **Keine** `ArticleToc`-artige Komponente in `src/components/` — nie gebaut.
- Fehlt auf den längsten Seiten: `/bezirke/innenstadt/` (8.100 Zeichen),
  `/sehenswuerdigkeiten/porta-nigra/` (4.200).

### 13. Keine "neuesten Artikel" auf der Startseite
- `getCollection` wird nirgends importiert; `src/pages/index.astro` und
  `src/pages/en/index.astro` enthalten **null** Referenzen auf Artikel/Magazin.
- 25 DE + 15 EN Posts existieren, erscheinen **nur** über `/magazin/` bzw.
  `/en/magazine/` (beide aus der Header-Nav auf 157 Seiten verlinkt).

### 14. Zwei tote Outbound-*Pfade* (Domains leben)
- ❌ `src/data/sights.ts:373` → `https://www.fes.de/karl-marx-haus` = **404**
- ❌ `src/data/sights.ts:40` → `https://www.zentrum-der-antike.de/porta-nigra` = **404**
  (Eltern-Domains liefern 200 → **toter Pfad, nicht tote Domain**)
- ✅ Bot-Blocks, leben: `restaurants.ts:95` domstein.de (403),
  `awin.ts:96` hawesko.de (403), alle 17 booking.com-URLs (202). Alle übrigen 200.
- 🔑 **Sauberer als Heidelberg (7) / Köln (2)** — aber nur, weil kaum Links da sind:
  nur **4/24 Restaurants, 5/23 Sights und 0/17 Hotels** haben überhaupt eine
  `websiteUrl`. → Eher eine **Daten-Lücke** als ein Qualitätssieg.

### 15. `city.ts` untertreibt bei den Sprachen
- `src/data/city.ts:9` → `languages: ["de"] as const`, obwohl ein **21-seitiger
  EN-Baum** ausgeliefert wird und hreflang auf `/en/` zeigt.
- ✅ EN ist **echt übersetzt** (`src/data/i18n/en/*.json`), volle Parität für
  sights/districts/restaurants/hotels/events/themes/travel-planner/search/about/
  imprint/privacy.
- ⚠️ Fehlt in EN (überwiegend DE-lokale Service-/Monetarisierungs-Seiten,
  **verteidigbar**): `/kontakt/`, `/werben/*`, `/branchenverzeichnis/*`, apotheken/
  banken/hoerakustiker/online-apotheke/parken/promis, `404`, und **10 von 25**
  Magazin-Artikeln.
- ✅ hreflang lässt `en` bei den 10 unübersetzten DE-Artikeln **korrekt weg**,
  `/en/magazine/` listet exakt die 15 übersetzten Slugs. **Sauber gemacht.**

### 16. `dist/` wird nach `main` committet
- `deploy.yml:47-53` committet den Build ins Repo. Bekanntes Muster (vgl.
  Memory `top10-heidelberg-project`) — nur wissen, nicht "aufräumen".

---

## 📋 Fakten-Check nötig (nur Liste)

`/apotheken-trier/`, `/banken-in-trier/`, `/online-apotheke-trier/` ⚠️ (Testsieger, #4),
`/hoerakustiker-trier/`, `/parken-in-trier/`, `/parken-flughafen-frankfurt-hahn/`,
`/promis-in-trier/`, `/branchenverzeichnis/kategorie/{apotheken,banken}/`

---

## ✅ Schwester-Defekte, die Trier NICHT hat — nicht anfassen

1. ✅ **Nicht** der `.card-hover`-Bug — Startseiten-Kacheln nutzen `.card` **plus**
   `.pill`/`.pill-accent`/`.eyebrow`, alle definiert (`global.css:89-104`).
   Computed: `bg rgb(255,255,255)`, `border 1px rgb(229,229,229)`, Shadow vorhanden,
   `radius 16px`.
2. ✅ **Nicht** der Heidelberg-Hero-only-Sidebar-Bug — **alle 6** Detail-Templates haben
   ein gefülltes `<aside class="lg:col-span-2">` mit echter "Praktisches"-`<dl>`
   (Bezirk/Eintritt/Öffnungszeiten/Website/Koordinaten). **Vorbild in der Familie.**
3. ✅ **Kein doppeltes Hero-Bild** aus dem Template (die 2 Fälle sind Pool-Kollisionen, #8).
4. ✅ **Kein** Berlin-Zero-`<img>`.
5. ✅ **Nicht** der Berlin-zod-Bug (aber siehe #5 — `sr-only` ist ein anderer Weg zum
   gleichen Schaden).
6. ✅ **Kein** user-sichtbarer Dev-Platzhalter — alle Treffer sind Code-Kommentare
   (`eintrag-beanspruchen.astro:16` `TODO: Turnstile`, `Stay22TopHotels.astro:5`,
   `guides.ts:10`). Berlins 15-Seiten-Leak fehlt.
7. ✅ **0 kaputte interne Links** — 286 Seiten gecrawlt, 5.821 Links / 297 unique
   Ziele, 319/320 Routen 200, nur `/404` gibt 404 (korrekt). Die 9 fehlschlagenden
   `/r/*` sind **alle** in `public/_redirects` (Cloudflare) → Dev-Artefakt.
   **Kein Slug-Mismatch.**
8. ✅ **Keine Schwester-Stadt-Reste** — alle 5 Treffer legitim:
   `parken-flughafen-frankfurt-hahn.astro` + `Footer.astro:45` = Flughafen
   Frankfurt-**Hahn** (Triers nächster Flughafen!), `events.ts:189` "Alternative zu
   Koeln oder Berlin" = bewusster redaktioneller Vergleich, `images.ts:322`
   "Hartmut Schmidt **Heidelberg**" = Name eines Wikimedia-Fotografen.
9. ✅ **Keine Router-Kollisions-Warnings** (Berlins 20 fehlen).
10. ✅ **Keine leeren Collections / kein `[glob-loader]`-Warning** — es gibt keine.
11. ✅ **Keine gestrandeten Blöcke** — Stay22/GYG sitzen zwischen Grid-Ende und den
    schließenden `<section>`s, jeweils mit eigenem Eyebrow + `<h2>`.
12. ✅ **Kein** leerer/fehlender `lmaId`, **kein** `_TOKEN`-Mismatch.

---

## 🚨 Unveröffentlichter Commit (1) — ERST FIXEN, DANN PUSHEN

`392c4e0` — *"City-Portal-Playbook: Werben-Funnel, Branchenverzeichnis, Platzhalter-
und Mailto-Fixes"*. `main` ist **1 vor** `origin/main`, Working Tree clean.
**20 Dateien, +1.555/−14.** Was live geht:

- **Neuer Monetarisierungs-Funnel:** `/werben/`-Hub + `premium-partner`,
  `gesponserte-artikel`, `newsletter` (4 Seiten), `/kontakt/`, und
  `src/styles/werben.css` (208 Zeilen).
- **Neues `/branchenverzeichnis/`:** index, `kategorie/[slug]`, `eintrag-beanspruchen`
  + `src/data/branchenverzeichnis.ts` (163 Zeilen, 8 Kategorien, 10 Free-Einträge;
  Premium-Liste bewusst leer).
- **Echte Bugfixes:** `ContentImage.astro` — der Platzhalter brach per
  `absolute inset-0` aus seinem Container aus und **überlagerte die nächste Section**,
  fließt jetzt inline (das ist der Overlap-Bug aus dem Playbook);
  `reiseplaner/*` + `en/travel-planner/*` rendern `ContentImage` statt rohem
  `HueGradient`; `guides.ts` bekommt optionalen `imageKey`.
- **Legal:** `impressum`, `datenschutz`, `en/imprint` — `mailto:` und Klartext-`@` weg.
- **Flags:** `features.werben` und `features.branchen` an (`src/data/features.ts`).
- ⚠️ **Bringt mit:** den `werben.css:113`-Token-Bug (#11) und die
  **4 leeren, indexierbaren, nicht-noindexten** Verzeichnis-Kategorieseiten (#6).
