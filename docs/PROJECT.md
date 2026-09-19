# Projecto Certare (phoneDevelopers)

## Visión general

Aplicación web progresiva de comercio de servicios de desarrollo móvil
("Certare" / `com.certare.app`). Desarrollada con **Angular 19** (componentes
standalone), **Capacitor 7** para empaquetado móvil (Android/iOS) y
**Firebase** (Authentication + Firestore + Cloud Functions + Hosting) como
backend.

Modelo comercial simplificado (refactor aprobado): cada servicio tiene **un
único precio en MXN** — se eliminaron los tiers (Basic/Standard/Pro) y las
tallas (S/M/L) del flujo completo (catálogo → carrito → email de pedido).

## Stack

| Capa      | Tecnología                                              |
|-----------|---------------------------------------------------------|
| Frontend  | Angular 19 (standalone) + RxJS + AngularFire (`@angular/fire`) |
| Móvil     | Capacitor 7 (android/ios) + `@capacitor/haptics`, `@capacitor/status-bar` |
| Backend   | Firebase Authentication, Cloud Firestore, Cloud Functions |
| Pagos     | PayPal (botones + captura)                              |
| Envío     | Cloud Function `sendOrderEmail` (nodemailer)            |
| Tests     | Jasmine/Karma (Angular), Jest (funciones)               |

## Estructura del proyecto

```
phoneDevelopers/
├── src/
│   ├── app/
│   │   ├── auth/            # auth.module: login, register, AuthService
│   │   ├── products/        # products.module: product-list, ProductService
│   │   ├── sales/           # sales.module: cart, sales-history, CartService,
│   │   │                    #   OrderEmailService, PaypalService
│   │   ├── shared/          # navbar
│   │   └── testing/         # helpers de testing/firebase-testing
│   └── environments/        # config de Firebase por entorno
├── functions/               # Cloud Functions + nodemailer (Node/TS)
│   └── src/__tests__/       # jest: sendOrderEmail.test.ts (21/21 PASS)
└── scripts/seed-services.js # siembra del catálogo (20 servicios MXN)
```

## Comandos

```powershell
# Desarrollo
ng serve

# Build de producción (Angular)
ng build

# Tests Angular (Karma/Chrome Headless)
ng test --watch=false --browsers=ChromeHeadless

# Typecheck estricto de la suite de tests Angular
npx tsc -p tsconfig.spec.json --noEmit

# Test de Cloud Functions (jest)
cd functions
npx jest
```

## Modelo de datos

`Product` (catálogo en Firestore, colección `cloth-store`):

```ts
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;          // único, MXN
  'image-front': string;
  'image-back': string;
  category: string;
  tags?: string[];
}
```

`CartItem` (en `cart.service.ts`) = `Product` + `units: number` (sin `size`).

## Testing

- **Functions**: `functions/src/__tests__/sendOrderEmail.test.ts` — 21 tests
  PASS (mock de nodemailer, envío exitoso y errores).
- **Angular**: specs por componente. Nota de referencia: los specs de
  componentes que inyectan `AuthService`/`CartService`/Firestore **reales**
  pueden disparar `NG0205: Injector has already been destroyed` en Karma
  cuando el listener de Firebase sobrevive al teardown del `TestBed`; la
  estrategia correcta es proveer spies (`jasmine.createSpyObj`) o mocks
  locales en cada spec (mismo patrón que `product-list`).
