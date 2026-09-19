# Changelog

Todas las versiones notables de este proyecto se documentan en este archivo.

## [1.0.1] - 2026-09-18

### Added
- Refactor a precio único en MXN para el catálogo de servicios (sin tiers, tallas ni "Plan").
- 20 servicios QA en la colección `cloth-store`, todos con `price` único MXN.
- Email de pedido `sendOrderEmail` con `OrderEmailData` (sin campo `size`).

### Changed
- NG0205 resuelto en specs usando spies de AngularFire.
- Tests: Angular 28/28 SUCCESS · Functions 21/21 PASS · `tsc` 0 errores.
- Workflows CI apuntando al proyecto `smartfoodie-dda14`.

### Docs
- `PROJECT.md`, `SPEC.md`, `DEPLOY.md` (guía completa en `docs/`).