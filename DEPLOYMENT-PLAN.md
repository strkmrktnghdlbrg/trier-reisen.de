# trier-reisen.de — Deployment-Plan

End-to-End-Checkliste fuer den Go-Live. Aktueller Stand: **Astro-Build lokal sauber, noch nicht deployed.**

---

## 1. Aktueller Stand (lokal)

- Astro 5 Static-Build laeuft sauber (`npm run build` → 107 Seiten in ~1.8s)
- Sights (24, davon 8 UNESCO), Hotels (17), Restaurants (25), Bezirke (12),
  Kategorien (10), Events (7), Reiseplaner (3 Guides), Impressum, Datenschutz live
- News-Feature **deaktiviert** (Trier ist Reise-Magazin, keine Lokalpresse)
- Werben/Branchen **deaktiviert** (Phase 2)
- Stay22 (lmaID `687913400d1617d25ef77427`), GTM (`GTM-PM6JDSW4`),
  AdSense (`ca-pub-7432388986384363`), GetYourGuide (`1UPZQQB`) eingebaut + aktiviert

## 2. Was VOR dem Deployment fertig sein muss

### 2.1 Impressum-Platzhalter ausfuellen

`src/data/legal.ts` enthaelt noch Platzhalter. Vor Go-Live ausfuellen:

```ts
operator: {
  name: "Stark Marketing",
  person: "Joshua Stark",
  street: "<echte Strasse>",
  zip: "<PLZ>",
  city: "<Ort>",
  country: "Deutschland",
  email: "kontakt@trier-reisen.de",
  phone: "<optional>",
  ustId: "<optional>",
}
```

### 2.2 Domain-DNS klaeren

- `trier-reisen.de` Registrar identifizieren
- Aktuell evtl. WordPress, Parking oder unkonfiguriert
- DNS-Records vorbereiten (siehe 3.2)
- Eine Uebergangs-Subdomain testen, z. B. `staging.trier-reisen.de`, bevor die
  Live-Domain umgezogen wird

### 2.3 Search Console verifizieren

- Domain in Google Search Console anlegen
- Verifizierungs-Methode waehlen (DNS-TXT oder HTML-Meta-Tag)
- Sitemap-URL einreichen: `https://trier-reisen.de/sitemap-index.xml`

---

## 3. Cloudflare-Setup

### 3.1 GitHub-Repo

```bash
# Im Projekt-Ordner trier-reisen.de
git init
git branch -M main
git add .
git commit -m "Initial commit — Phase 1 build"
gh repo create strkmrktng/trier-reisen.de --private --source=. --remote=origin --push
```

### 3.2 Cloudflare Pages-Projekt anlegen

Im Cloudflare-Dashboard:
1. **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
2. Repo `strkmrktng/trier-reisen.de` verbinden, Branch `main`
3. Build-Settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output: `dist`
   - Node-Version: 20 (Environment Variable `NODE_VERSION=20`)
4. Erstes Deployment starten → Vorschau-URL `<projekt>.pages.dev` pruefen

### 3.3 DNS umstellen

- DNS-Provider von `trier-reisen.de` oeffnen
- CNAME `@` und `www` auf `<projekt>.pages.dev` setzen (oder im CF-Dashboard
  via "Use Cloudflare for this domain" komplett uebernehmen)
- TTL kurzhalten (300 s) fuer ersten Wechsel, spaeter erhoehen

### 3.4 Custom Domain in Pages-Projekt

- Pages-Projekt → **Custom domains** → `trier-reisen.de` und `www.trier-reisen.de` hinzufuegen
- Cloudflare verifiziert automatisch via DNS
- TLS-Zertifikat wird auto-generated
- Redirect `www → root` einstellen (Page Rule oder Bulk Redirect)

---

## 4. Tracking-Verifikationen (nach Deployment)

### 4.1 GTM (Container `GTM-PM6JDSW4`)

- `view-source:https://trier-reisen.de/` oeffnen
- Nach `googletagmanager.com/gtm.js?id=GTM-PM6JDSW4` suchen → muss da sein
- Im GTM-Dashboard "Preview"-Modus oeffnen, URL eingeben, Verbindung pruefen

### 4.2 AdSense (Publisher `ca-pub-7432388986384363`)

- AdSense-Dashboard → Websites → `trier-reisen.de` hinzufuegen falls nicht vorhanden
- "Site verifizieren" → laeuft automatisch ueber das `<script>`-Tag im `<head>`
- `https://trier-reisen.de/ads.txt` → muss `google.com, pub-7432388986384363, DIRECT, f08c47fec0942fa0` zeigen
- Auto Ads aktivieren wenn gewuenscht (kontextuelle Display-Ads)

### 4.3 Stay22 (lmaID `687913400d1617d25ef77427`)

- Eine Hotel-Detail-Page laden, z. B. `/hotels/park-plaza-trier/`
- Browser DevTools → Network → `scripts.stay22.com/letmeallez.js` muss geladen werden
- "Auf Booking.com pruefen"-Button klicken → URL muss zur Affiliate-Domain rewritet werden

### 4.4 GetYourGuide (Partner-ID `1UPZQQB`)

- Startseite und Sight-Detail laden
- Browser DevTools → Network → `widget.getyourguide.com` muss laden
- GYG-Dashboard → Statistiken → erste Impressions sollten nach ~30 Min auftauchen

---

## 5. Performance + SEO-Check

- [ ] **Sitemap erreichbar**: `https://trier-reisen.de/sitemap-index.xml`
- [ ] **robots.txt erreichbar**: zeigt Sitemap-URL
- [ ] **ads.txt erreichbar**: zeigt AdSense-DIRECT-Zeile
- [ ] **Lighthouse-Score** ≥ 90 in Performance, A11y, SEO
- [ ] **Web-Vitals** im akzeptablen Bereich (LCP < 2.5 s, CLS < 0.1)
- [ ] **Mobile-Test** auf realem Device (iOS Safari, Android Chrome)
- [ ] **Canonical-Tag** auf jeder Page korrekt (eigene Domain, nicht `pages.dev`)
- [ ] **Bilder geladen** (kein 404 in DevTools, Wikimedia-Bilder eingebunden)

---

## 6. Domain-Umzug (falls die Domain bereits live ist)

### 6.1 Vorher

- **Bestands-URLs pruefen**: hat die Domain Rankings? Search Console oder Sistrix abfragen.
- **Falls vorhandene WordPress-Seite**: alle Top-URLs als Astro-Redirects abbilden
  (`astro.config.mjs` → `redirects: { ... }`)

### 6.2 Waehrend

- DNS-TTL kurzfristig auf 300 s → schnellere Rollback-Option
- Beide Versionen kurz parallel laufen lassen (alter Host als Backup)

### 6.3 Nachher

- Search Console: Sitemap der neuen Site einreichen
- 24–48 h beobachten ob Crawl-Errors auftreten
- Wenn nach 7 Tagen stabil: alten Host kuendigen

---

## 7. Rollback-Plan

Falls am Deployment-Tag etwas grundlegend schief geht:

1. DNS zurueck auf alten Host (TTL 300 s = max 5 Min Sichtbarkeit)
2. Cloudflare-Pages-Projekt deaktivieren (Pause)
3. Im Repo Branch zuruecksetzen (oder PR mergen der den Fix bringt)
4. Erneuter Build + Deploy

Dauer: realistisch 15–30 Min wenn DNS-TTL kurz war.

---

## 8. Geht aktuell NICHT live

Folgende Features sind eingebaut, aber bewusst deaktiviert (Feature-Flag auf
`false` in `src/data/features.ts`):

- **News-Pipeline** — Trier ist Reise-Magazin, kein Lokalpresse-Aggregator
- **Werben/Branchen-Verzeichnis** — Phase 2 (Premium-Listings 49 / 149 EUR via Stripe)

Aktivierung jeweils via Flag-Flip in `src/data/features.ts` und entsprechende
Cloudflare-Konfig (Stripe-Webhooks, D1 fuer Listings).

---

## 9. Letzter Sanity-Check vor "Domain umschalten"

- [ ] `src/data/legal.ts` enthaelt keine Platzhalter-Werte mehr
- [ ] `src/data/affiliate.ts` Stay22 lmaID = `687913400d1617d25ef77427`
- [ ] `src/data/analytics.ts` GTM-ID = `GTM-PM6JDSW4`, `enabled: true`
- [ ] `src/data/adsense.ts` Publisher = `ca-pub-7432388986384363`, `enabled: true`
- [ ] `public/ads.txt` vorhanden mit DIRECT-Zeile
- [ ] `astro.config.mjs` `site: "https://trier-reisen.de"`
- [ ] Cloudflare Pages Build erfolgreich
- [ ] `https://trier-reisen.de/sitemap-index.xml` 200 OK
- [ ] `https://trier-reisen.de/robots.txt` 200 OK
- [ ] DNS-TTL fuer Rollback kurz gestellt
- [ ] Search Console verifiziert

---

## 10. Phase-2-Roadmap (nach Go-Live)

- **Bilder**: weitere Wikimedia-Bilder fuer alle Sights/Bezirke ziehen
- **Reiseplaner**: erweitern (Trier-1-Tag, Mosel-Wein-Tour, Karl-Marx-Spaziergang)
- **GEO-AI-Search-Optimierung**: jeder Sight bekommt strukturierte Daten (JSON-LD `TouristAttraction`)
- **Backlink-Aufbau**: Olewig-Weingueter-Pipeline (Premium-Listings 49 EUR/Monat)
- **Werben-Modul + Branchen-Verzeichnis**: Stripe-Checkout + D1
- **A/B-Tests**: Hero-Hook auf Homepage, Affiliate-CTAs
