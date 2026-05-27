# ElevenLabs Design System – Stadtportal Trier

> Architect's Blueprint auf warmem Vellum. Type-first, fast streng, mit subtiler Wärme.
> Quelle: https://styles.refero.design/style/031056ff-7af1-46db-8daa-115f731c5d26

## 1. Farb-Palette

| Name | Hex | Rolle |
|---|---|---|
| Obsidian | `#000000` | Primary Text, CTA-Fill |
| Cinder | `#575350` | Mid-Tone Text, Sub-Headings (FIX: Original 5-stellig fehlerhaft) |
| Gravel | `#777169` | Secondary Body, warmer Stein-Unterton |
| Slate | `#a59f97` | Tertiary Text, Icon-Strokes |
| Fog | `#b1b0b0` | Disabled, Grayscale |
| Chalk | `#e5e5e5` | Borders, Dividers |
| Powder | `#f5f3f1` | Secondary Surface, Hover |
| **Eggshell** | `#fdfcfc` | **Page-Background** (nie reines Weiß) |
| Signal Blue | `#0447ff` | Mikro-Indikator (Avatar-Dot) |
| Ember | `#ff4704` | Mikro-Indikator (Avatar-Dot) |

**Trier-Akzent:** Signal Blue als Primary-Akzent für Mosel/Wasser-Bezug ODER Ember für römische Sandstein-Wärme — Entscheidung: **Ember `#ff4704`** als Mosel-untergeordneter Römer-Glanz.

## 2. Typografie

- **Display**: Waldenburg 300 → Fallback **Cormorant Garamond 300** oder Libre Baskerville 300
- **Product Labels**: WaldenburgFH 700 → Fallback **Inter 700** (14px only)
- **UI/Body**: **Inter** 400/500 (Google Fonts)
- **Mono**: Geist Mono 400 → Fallback JetBrains Mono (nur technische Annotations)

Type Scale:
| Role | Size | Weight | LH | Tracking |
|---|---|---|---|---|
| caption | 10 | 400 | 1.20 | — |
| body | 14 | 500 | 1.43 | — |
| body-lg | 16 | 400 | 1.50 | — |
| subheading | 18 | 400 | 1.44 | — |
| heading-sm | 20 | 400 | 1.40 | — |
| heading | 32 | 300 | 1.17 | -0.64px |
| heading-lg | 36 | 300 | 1.13 | -0.72px |
| display | 48 | 300 | 1.08 | -0.96px |

**Regel:** Waldenburg max Weight 300 für Display. Weight 700 nur WaldenburgFH bei 14px.

## 3. Spacing & Radius

- Base 4px, Section-Gap 80–120px, Card-Padding 16–24px, Element-Gap 8–12px
- Max-Width 1200px
- Radius: Inputs **0** / Badges 12 / Cards 16 / Panels 20 / Modals 24 / Buttons 9999 / Tags 9999

## 4. Shadows (Hairline Only)

```css
--shadow-card: rgba(0,0,0,0.4) 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 4px;
--shadow-inset: rgba(0,0,0,0.075) 0px 0px 0px 0.5px inset;
```

## 5. Buttons

### Primary Pill (Filled)
- BG `#000`, Text `#fdfcfc`, Radius 9999, Padding `0 16`, Inter 500/14

### Secondary/Ghost Pill
- BG `#fff`, Text `#000`, Border `1px #e5e5e5`, Radius 9999, Padding `0 12`

### Compact Action
- Transparent, Border `1px #e5e5e5`, Radius 12, Padding `8 12`, Inter 400/14

### Product Tab (WaldenburgFH-Label)
- Border `1px #e5e5e5`, Radius 18, WaldenburgFH 700/14/0.05em
- Active → upgrade zu Filled Pill

## 6. Cards

- **Product Demo Card**: BG `#fff`, Radius 16, Shadow hairline, Padding 16–24
- **Feature Platform Card (Ghost)**: transparent, Text Inter 500/16 `#000` + 400/14 `#777169`, 8px farbiger Dot davor

## 7. Hero-Pattern (Homepage)

- Two-Column 60/40 auf `#fdfcfc`
- Left: Waldenburg 300/48 `#000` -0.96px / 1.08 → 16px Gap → Inter 400/16 `#777169` → 24px Gap → 2 Pills
- Right: Decorative Space oder Landscape-Bild (Porta Nigra Vellum-Tönung)

## 8. Navigation

- Höhe 36, BG `#fdfcfc`, Border-Bottom `1px #e5e5e5` on scroll, sticky
- Links: Logomark + WaldenburgFH 700/14 Wordmark
- Center: Inter 400/14 Nav-Links, 16px Gap
- Rechts: Login Ghost Pill + Sign-Up Filled Pill

## 9. Inputs

- **Editorial Transparent**: Border 1px bottom only, Radius 0, Padding `12 20`, Inter 400/14
- **Contained**: BG `#fff`, Border `1px #e5e5e5`, Radius 0, Inset-Shadow

## 10. Tone & Voice

- **"Authority through Restraint"** — Light-Weight Serif Headlines tragen Gewicht
- Achromatische Disziplin: Farbe nur als Mikro-Indikator
- Für Trier-Reisen: **antike Würde**, Stein-Wärme, ohne Pomp
- Reise-Magazin-Charakter: 60% Landschafts-/Architektur-Foto, 40% Text

## 11. Do's & Don'ts

✓ Waldenburg/Cormorant 300 -0.02em für alle Headings 32px+
✓ Inset-Shadow statt Borders auf weißen Surfaces
✓ Section-Gaps 80–120px, Element-Gaps 8–12px
✗ Niemals Weight > 300 für Display
✗ Niemals saturierte Farbe für Text/Background/Button
✗ Niemals reines Weiß für Page-Surface
✗ Niemals Border-Radius auf Inputs

## 12. brand.css (Skeleton)

```css
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Inter:wght@400;500;700&family=JetBrains+Mono&display=swap");

@theme {
  --color-accent: #ff4704;          /* Ember — Trier-Römer-Glanz */
  --color-accent-hover: #d93b03;
  --color-accent-tint: #fff1ec;
  --color-accent-contrast: #ffffff;

  --color-text: #000000;
  --color-text-body: #575350;
  --color-text-muted: #777169;
  --color-bg: #fdfcfc;
  --color-surface: #f5f3f1;
  --color-border: #e5e5e5;

  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Cormorant Garamond", "Waldenburg", ui-serif, serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  /* Stadtteil-Hues (Trier-Sandstein + Mosel-Wasser) */
  --hue-1: linear-gradient(135deg, #fff1ec 0%, #ffbb9c 50%, #ff4704 100%);
  --hue-2: linear-gradient(135deg, #f0f9ff 0%, #7dd3fc 50%, #0447ff 100%);
  --hue-3: linear-gradient(135deg, #fef3c7 0%, #fbbf24 50%, #b45309 100%);
  --hue-4: linear-gradient(135deg, #f5f5f4 0%, #a59f97 50%, #575350 100%);
  --hue-5: linear-gradient(135deg, #faf5ff 0%, #c084fc 50%, #7e22ce 100%);
}
```
