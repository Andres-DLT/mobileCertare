# BRAND — Certare

## Visual direction: "Evidencia"

Certare promises software delivery with the risks in plain sight, so the
interface reads like an engineering report: paper background, ink text,
data in a monospace face and a single action colour (signal orange).

## Logo

The Certare mark is a rounded ink square (`#15181e`) with a white "C" in
Space Grotesk Bold and a small signal-orange square (`#c23d15`) in the top
right corner. The full lockup adds the wordmark "CERTARE" in spaced capitals
(ink on light backgrounds).

Files in `src/assets/images/brand/`:

| File | Use |
|---|---|
| `logo-certare.svg` | Full lockup (docs, sharing, light backgrounds) |
| `logo-mark.svg` | Standalone mark (favicon, app icon source, avatars) |

`public/favicon.ico` is a 48×48 PNG-in-ICO export of `logo-mark.svg`.

The in-app navbar "C" badge is pure CSS (`--mark-bg`, `--mark-fg`,
`--signal`) and mirrors this geometry. In dark mode the badge inverts to a
light square with an ink "C".

## Colour

| Role | Light | Dark |
|---|---|---|
| Paper (background) | `#f5f3ee` | `#101215` |
| Ink (text) | `#15181e` | `#eeebe4` |
| Signal (primary action, focus, active) | `#c23d15` | `#ff6a3d` |

Signal is the only action colour. Never use it for decoration, headings or
large fills other than the primary button.

## Rules

- Minimum size: 24 px for the mark, 96 px wide for the full lockup.
- Clear space: at least the height of the "C" on all sides.
- Do not stretch, recolour, rotate or add shadows or gradients.
- Backgrounds: paper `#f5f3ee` (primary), `#101215` for dark contexts.
- `theme-color`: `#f5f3ee` (light) and `#101215` (dark), set per
  `prefers-color-scheme` in `src/index.html`; the Android status bar follows
  the same values in `AppComponent`.

## Pending (before public launch)

1. Export `apple-touch-icon.png` (180×180) and `og-cover.png` (1200×630)
   from `logo-certare.svg`, then wire them in `src/index.html`.
2. Regenerate Android/iOS launcher icons from `logo-mark.svg`
   (`npx capacitor-assets`).
