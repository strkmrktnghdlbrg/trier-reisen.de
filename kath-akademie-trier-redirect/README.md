# Redirect: kath-akademie-trier.de → trier-reisen.de

Die alte Domain **kath-akademie-trier.de** wird komplett (301, catch-all) auf den
neuen Artikel auf trier-reisen.de umgeleitet:

**Ziel:** `https://trier-reisen.de/fachtagung-diversity-management-antidiskriminierung/`

## Warum catch-all auf eine Seite?
Der alte Content ist hinfällig. Die eingehenden Backlinks zeigen fast alle auf die
Domain-Root bzw. auf irrelevante Alt-Pfade (`/excel-summe-berechnen/`,
`/excel-zellbezuege-aus-einem-anderen-tabellenblatt/`). Der stärkste Link
(diversity-gesellschaft.de, Trust Flow 30) trägt den Anchor
**„Fachtagung Diversity Management und Antidiskriminierung"** — exakt das Thema der
Zielseite. Eine gebündelte 301-Weiterleitung aller Pfade auf diesen Artikel
maximiert die thematische Relevanz und den Link-Juice.

## Einsatz
1. `kath-akademie-trier.de` als Addon-/Parked-Domain im (cPanel-)Hosting anlegen.
2. Die Datei `.htaccess` aus diesem Ordner in das **Document-Root der Domain
   kath-akademie-trier.de** legen (NICHT in das trier-reisen.de-Verzeichnis).
3. SSL/TLS-Zertifikat für kath-akademie-trier.de + www aktivieren (AutoSSL), damit
   auch die https-Weiterleitung greift und keine Zertifikatswarnung erscheint.

## Test nach dem Aufsetzen
```
curl -sI https://kath-akademie-trier.de/                       # -> 301, Location: .../fachtagung-...
curl -sI https://www.kath-akademie-trier.de/excel-summe-berechnen/   # -> 301, gleiches Ziel
curl -sI http://kath-akademie-trier.de/irgendein-alt-pfad.html # -> 301, gleiches Ziel
```
Erwartet: `HTTP/…​ 301` mit
`Location: https://trier-reisen.de/fachtagung-diversity-management-antidiskriminierung/`
