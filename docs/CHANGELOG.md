# Changelog

Todas las versiones notables de este proyecto se documentan en este archivo.

## [Unreleased] - 2026-09-21

- Migración verificada de 20 documentos desde `cloth-store` a `product-store`,
  con respaldo local previo y eliminación de la colección anterior.
- Restaurado el permiso estándar del agente Firebase Rules, ausente en IAM,
  que impedía leer el catálogo incluso con reglas de lectura permitida.
- Corregido `cls is not a constructor`: `setPersistence` usa el SDK Firebase
  directamente para conservar el constructor de persistencia.
- Perfil real actualizado a `Andres`; saludo e iniciales reactivos a Firebase Auth.
- Carga de catálogo con estado de error, reintento y límite de espera; carrito
  conectado y snapshots independientes para deshacer cambios de cantidades.
- Checkout oculto y SDK PayPal sin cargas mientras los pagos están desactivados.
- CLI Capacitor local y comando `npm run android:sync`.
- 35 pruebas Angular aprobadas y recorridos funcionales reales en Chrome y en
  el emulador Android. Detalles en `VERIFICATION-2026-09-21.md`.

## [1.0.1] - 2026-09-18

### Added
- Refactor a precio único en MXN para el catálogo de servicios (sin tiers, tallas ni "Plan").
- 20 servicios QA en la colección `cloth-store`, todos con `price` único MXN.
- Email de pedido `sendOrderEmail` con `OrderEmailData` (sin campo `size`).

### Changed
- NG0205 resuelto en specs usando spies de AngularFire.
- Tests: Angular 28/28 SUCCESS · Functions 21/21 PASS · `tsc` 0 errores.
- Workflows CI apuntando al proyecto `smartfoodie-dda27`.

### Docs
- `PROJECT.md`, `SPEC.md`, `DEPLOY.md` (guía completa en `docs/`).
