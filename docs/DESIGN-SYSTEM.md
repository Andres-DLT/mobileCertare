# Certare Design Decisions (living log)

Consult this file before creating or modifying any UI component.

## Tokens (`theme.css`) — "Evidencia"
- Direction: paper, ink and one signal colour. The page reads like an engineering report; data (counts, categories, deliverables, step numbers) is set in JetBrains Mono.
- Colours: `--paper/--bg`, `--surface`, `--surface-2` (sunken), `--surface-3`, `--border`, `--border-strong` (ink rule), `--ink/--text`, `--text-muted`, `--signal`, `--signal-soft`, `--on-signal`, `--danger/success/warning`. Legacy names (`--accent`, `--accent-action`, `--accent-2`, `--accent-soft`) stay mapped so older components follow the palette.
- Contrast: ink on paper 16:1, muted text 6.8:1, white on signal `#c23d15` 5.3:1. The proposal's `#d9461b` was rejected because white text on it is 4.3:1.
- Signal is reserved for the primary action, focus rings and the active indicator. Selected chips and choices use ink, not signal.
- Practice markers: `--p-testing/mobile/web/ai/training`, used only as a dot or a 3px rule, never as a background.
- Dark mode follows `prefers-color-scheme` by redefining the same tokens; components must not hard-code colours.
- Type scale: `--text-xs(12)/sm(14)/md(16)/lg(18)/xl(20)/2xl(22)/3xl(28)/4xl(40)/display(clamp 40–72)`. Body is 16px. Space Grotesk 600 for headings, Inter for text, `--font-mono` for data. Avoid uppercase eyebrows; use sentence case in mono.
- Spacing: `--space-1..8` (4/8/12/16/24/32/48/72). No new magic numbers.
- Radius: sm 6 / 10 / lg 14 / full. Shadows `--shadow-1/2` only for overlays.
- Structure: prefer open sections separated by a 2px ink rule over boxes inside boxes. Lists of things (practices, services, steps) are rows, not card grids.
- Motion: `--motion-fast/base`; global `prefers-reduced-motion` kill-switch in `styles.css`. Microinteractions only for feedback.
- Touch targets: `--touch-min` 44px minimum; primary buttons 48–52px.
- Breakpoints: 600px (single column), 768px (nav: top links → one bottom nav), 900px (two-column layouts collapse).

## Shared UI (`src/app/shared/ui/`, standalone, `@Input` variants)
- `CxHeroComponent`: `eyebrow/title/subtitle/primaryLabel/primaryLink/secondaryLabel/secondaryLink/stats[{value,label}]`. Selector `cx-hero`.
- `CxCardComponent`: `variant: service|stage|insight|capability|featured`, inputs `sector/eyebrow/badge/title/description/tags/priceLabel/actionLabel/detailLink`. The service variant carries a 3px practice rule; no letter avatars. Selector `cx-card`, output `action`.
- `CxFilterBarComponent`: primary search + practice chips (with practice dots and mono counts), results and desktop sort; advanced stage and mobile sorting live in a native `<dialog>` (`showModal`, Escape, focus restore). Selector `cx-filter-bar`.
- `CxEmptyStateComponent`: `title/message/actionLabel`, output `action`, `role="status"`. Selector `cx-empty-state`.
- `CxCtaSectionComponent`: `title/message/primaryLabel/primaryLink/secondaryLabel/secondaryLink`. Selector `cx-cta-section`.
- Page-specific editorial compositions (public home, service detail and insight reader) may have their own layouts; service cards and filters use shared UI. Never make the five practices look like separate brands.

## Collection Standard v1
- Data: `CollectionConfig` (`src/app/collections/collection-config.ts`): key, Firestore collection, label, intro, route, groupBy. New collection = data + config + content, never a new page.
- Catalog row grammar: practice rule + mono meta (practice · category) → title → description → mono deliverables → one "Details" action. The catalog page renders rows directly; `cx-card` is used for related services and insights.
- Filters: search + all five practices in one row, horizontally scrollable on mobile; stage and mobile sort behind `Filters (n)` in a native modal dialog; selection model `Record<groupKey, optionKey>`; Clear resets all.
- The landing page (`/`) introduces the work and starts discovery. `/products/list` is the directory; `/products/:sector/:id` resolves one document with one Firestore read and only its sector for related links.
- `/agency/insights/:id` turns sourced summaries into a full reader. No fabricated client metrics, team biographies or contact details appear publicly.
- Public visitors can browse and submit a discovery request in three steps (You → Your project → Review); membership-only pages require a server-backed allowlist of existing Auth UIDs.
- Navigation: desktop top bar with one signal CTA; below 768px a single bottom nav (Home, Services, About, Contact) and no header CTA or menu button.
- Copy: problem → proposition, never empty claims. Placeholders carry `data-placeholder` and are inventoried per release.

## Discarded
- Dark navy + indigo/cyan neon palette, gradient brand mark and glow shadows — replaced by "Evidencia" (2026-10-29).
- Mobile "Menu" button and header CTA alongside the bottom nav — one navigation per breakpoint.
- Letter avatars on service cards — they carried no information.
- Per-page hero/card/chip CSS (duplication) — replaced by shared components.
- `SharedModule` (empty) — deleted; standalone imports only.
- `AppRoutingModule` (dead, standalone bootstrap) — deleted.
- Dual filter rows always visible — replaced by progressive disclosure.
- `100% SLA coverage` hero stat — unverifiable, replaced by live counts.
