# BRAND — Certare

## Logo

The Certare mark is a rounded square with an indigo-to-cyan gradient
(`#6366f1` → `#22d3ee`) and a white "C" in Space Grotesk Bold. The full
lockup adds the wordmark "CERTARE" in spaced capitals.

Files in `src/assets/images/brand/`:

| File | Use |
|---|---|
| `logo-certare.svg` | Full lockup (web header, docs, sharing) |
| `logo-mark.svg` | Standalone "C" mark (favicon, app icon source, avatars) |

The in-app navbar/login "C" badge is pure CSS and mirrors this geometry so
the brand renders even if assets fail to load.

## Rules

- Minimum size: 24 px for the mark, 96 px wide for the full lockup.
- Clear space: at least the height of the "C" on all sides.
- Do not stretch, recolor, rotate, add shadows, or place on low-contrast
  backgrounds. A monochrome white version is allowed on dark photography.
- Backgrounds: `#0b1220` (primary dark), white for print/light contexts.

## Pending (before public launch)

1. Export `apple-touch-icon.png` (180×180) and `og-cover.png` (1200×630)
   from `logo-certare.svg`, then wire them in `src/index.html`
   (favicon SVG + `favicon.ico` already wired).
2. Regenerate Android/iOS launcher icons from `logo-mark.svg`
   (`npx capacitor-assets`).
3. Replace the `theme-color` only if the palette changes (currently `#0b1220`).
