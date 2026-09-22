# QUALITY — Certare code standards

## Conventions

- Standalone Angular components; lazy-loaded feature modules
  (`auth`, `products`, `sales`, `agency`).
- Firebase calls run inside `runInInjectionContext` (AngularFire 19 wraps
  arguments otherwise — see the fixed `cls is not a constructor` bug).
- All user-facing copy in English. Code comments in English.
- Errors always resolve loading states: every subscription has an error
  path with a retry action (15 s timeout on catalog reads).
- Placeholder/demo content is marked `data-placeholder` and inventoried
  per release — never shipped as fact.

## Removed legacy (2026-09-22 cleanup)

- `src/assets/images/clothes/*` (store-template leftovers, unused).
- `public/index.html` (Firebase welcome page — risked overwriting the app
  `index.html` in `dist` via the `public/**/*` asset glob).
- `scripts/seed-products.js` (obsolete clothing products with sizes).
- `scripts/phoneDevelopers.code-workspace` moved to repo root.
- Dead `planPrice` parameter in `CartService.addToCart`.
- Dead `AppRoutingModule` (standalone bootstrap uses `appConfig` only).
- `.firebase/` cache added to `.gitignore`.

## Open improvements (not yet done)

- Type the remaining `any` in `paypal.service.ts` and
  `order-email.service.ts`; replace `container.innerHTML = ''` with safe DOM clearing.
- Centralize logging in an injectable `Logger` (levels per environment).
- Add specs for `PillarComponent` routing data and `DiscoveryService`
  (rules covered via emulator when the suite grows).
- Upgrade path Angular 19 → 22 and `npm audit` remediation as a release
  of its own with full regression (web + APK).
