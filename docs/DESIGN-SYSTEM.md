# Certare Design Decisions (living log)

Consult this file before creating or modifying any UI component.

## Tokens (`theme.css`)
- Colors: `--bg/surface(-2/-3)/border/text(-muted)/accent(-2/-soft/-glow)/danger/success/warning`. Accent gradient indigo→cyan reserved for actions and data, never decorative backgrounds.
- Type scale: `--text-xs(11)/sm(13)/md(14)/lg(15)/xl(17)/2xl(20)/3xl(24)/4xl(32)/display(clamp)`. Display font Space Grotesk for H1/H2 only; Inter elsewhere.
- Spacing: `--space-1..7` (4/8/12/16/24/32/48). No new magic numbers.
- Radius: sm 8 / 16 / lg 24 / full. Shadows `--shadow-1/2/glow`.
- Motion: `--motion-fast/base`; global `prefers-reduced-motion` kill-switch in `styles.css`. Microinteractions only for feedback (hover/active/focus/loading/selected/disabled).
- Touch targets: `--touch-min` 44px minimum for all interactive elements.
- Breakpoints: 600px (cards/grids), 768px (nav), 820px (auth). Single-column below 600px.

## Shared UI (`src/app/shared/ui/`, standalone, `@Input` variants)
- `CxHeroComponent`: `eyebrow/title/subtitle/primaryLabel/primaryLink/secondaryLabel/secondaryLink/stats[{value,label}]`. Selector `cx-hero`.
- `CxCardComponent`: `variant: service|stage|insight|capability|featured`, inputs `eyebrow/badge/title/description/tags/priceLabel/actionLabel`. Selector `cx-card`, output `action`.
- `CxFilterBarComponent`: `groups[{key,label,options[{key,label,count?} ], collapsible}]`, two-way `selection: Record<string,string>`, output `selectionChange`, `clearLabel`. Chips are real `<button>` with `aria-pressed`, `role="group"` + `aria-label` per group. Selector `cx-filter-bar`.
- `CxEmptyStateComponent`: `title/message/actionLabel`, output `action`, `role="status"`. Selector `cx-empty-state`.
- `CxCtaSectionComponent`: `title/message/primaryLabel/primaryLink/secondaryLabel/secondaryLink`. Selector `cx-cta-section`.
- Rule: no page-level CSS may redefine hero/card/chip/empty-state. Page CSS only for layout composition.

## Collection Standard v1
- Data: `CollectionConfig` (`src/app/collections/collection-config.ts`): key, Firestore collection, label, intro, route, groupBy. New collection = data + config + content, never a new page.
- Card grammar: eyebrow (group) → badge (sector) → title → max 2-line description → tags → metadata (price) → one action.
- Filters: search + top sectors visible; everything else behind `Filters (n)` progressive disclosure; selection model `Record<groupKey, optionKey>`; `all` default; counts shown when cheap.
- Copy: problem → proposition, never empty claims. Placeholders carry `data-placeholder` and are inventoried per release.

## Discarded
- Per-page hero/card/chip CSS (duplication) — replaced by shared components.
- `SharedModule` (empty) — deleted; standalone imports only.
- `AppRoutingModule` (dead, standalone bootstrap) — deleted.
- Dual filter rows always visible — replaced by progressive disclosure.
- `100% SLA coverage` hero stat — unverifiable, replaced by live counts.
