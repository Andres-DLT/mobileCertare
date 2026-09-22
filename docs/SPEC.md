# SPEC — Certare (aplicación de servicios móviles)

Documento de especificación funcional y técnica. Estado: **post-refactor de
precios** (se eliminaron tiers y tallas; precio único en MXN).

## 1. Propósito

Certare es un catálogo móvil de servicios de desarrollo para dispositivos
móviles (phone developers) con carrito y checkout. El cliente elige
servicios y los agrega al carrito. El checkout está temporalmente oculto
(`paymentsEnabled: false`); la integración PayPal y el correo de pedido se
conservan para una futura activación.

## 2. Modelo de negocio (REFACTOR APLICADO)

- Catálogos en Firestore (60 documentos): `product-store` (20 servicios QA),
  `mobile-services` (10 etapas), `web-services` (10), `ai-services` (10),
  `training-services` (10). Seeds: `seed-services.js`, `seed-dev-services.js`,
  `seed-ai-training-services.js`.
- **Precio único en MXN** por servicio. Se eliminaron: tiers (Basic /
  Standard / Pro), tallas (S / M / L) y los campos `price_s/price_m/price_l`,
  `size_s/size_m/size_l` y `size`.
- La columna de talla / plan del correo de pedido se eliminó; el modelo solo
  muestra precio y cantidad.

### 2.1 Entidades

```ts
// Catálogo (product-services.ts)
interface Product {
  id: string;
  title: string;
  description: string;
  price: number;              // único, MXN
  'image-front': string;
  'image-back': string;
  category: string;
}
```
