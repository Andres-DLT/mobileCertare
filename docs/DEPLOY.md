# DEPLOY — Certare (phoneDevelopers)

Guía de despliegue a producción (Firebase Hosting + Cloud Functions).

## Requisitos previos

- CLI: ya instalado (`firebase-tools` 15.29.0 en `devDependencies` — usa `npx firebase`).
- Proyecto Firebase destino: **`phonedevelopers-ac8db`** (alias `phoneDevelopers`
  en `.firebaserc`). Verificar con `npx firebase projects:list`.
- Build Angular ya compilado: `dist/phoneDevelopers/browser` (index.html +
  main.*.js + assets) — confirmado en disco en el último build producción.
- Build functions ya compilado: `functions/` (jest 21/21 PASS + `tsc` 0 errores).

> ⚠️ IMPORTANTE: en esta máquina la sesión Firebase guardada **no tiene acceso
> al proyecto de producción** (`Failed to get Firebase project
> phonedevelopers-ac8db`). Es **obligatorio** iniciar sesión con la cuenta
> propietaria antes de cualquier deploy.

## Paso 0 — Autenticación (manual, una vez)

Desde `C:\Users\ADLTG\phoneDevelopers`:

```
firebase login
```

Sigue el flujo del navegador (consentimiento y refresh-token). Cuando termine
verás `✔  Successfully logged in`. Verifica con acceso al proyecto:

```
firebase projects:list
```

Debe aparecer `phonedevelopers-ac8db`.

## Paso 1 — Deploy Cloud Functions (correo de pedido)

```
npx firebase deploy --only functions --project phonedevelopers-ac8db
```

- Compila `functions` (predeploy `npm run build`) y despliega
  `sendOrderEmail`.
- Confirma en consola: `✔  Deploy complete!` + `Function URL
  (sendOrderEmail)`.

## Paso 2 — Deploy Hosting (SPA)

```
npx firebase deploy --only hosting --project phonedevelopers-ac8db
```

- Sube `dist/phoneDevelopers/browser` (rewrite `**` → `index.html`).
- Confirma: `✔  Deploy complete!` + `Hosting URL:
  https://phonedevelopers-ac8db.web.app` (o dominio custom).

### Nota de dominio/identidad

Firebase Hosting usa `https://<proyectoID>.web.app` /
`https://<proyectoID>.firebaseapp.com`. La "identidad" del proyecto
(`mobileCertare`) es el **repositorio Git** (remoto ya apuntando a
`https://github.com/Andres-DLT/mobileCertare.git`); el branding en la app se
controla con el título (`certare`) y el logo, no con el subdominio de Hosting.
Si se desea un dominio de marca se configura en Firebase > Hosting > Add
custom domain.

## Paso 3 — Seed de catálogo en producción (opcional, una vez)

Con el service account de producción (`functions/serviceAccountKey.json`):

```
npm run seed:services
```

Pobló Firestore `cloth-store` con los 20 servicios MXN (precio único, sin
tiers ni tallas). ⚠️ NO ejecutar contra el emulador si el objetivo es
producción (el script usa el Admin SDK con las credenciales reales).

## Paso 4 — Verificación post-deploy

1. Abrir `https://phonedevelopers-ac8db.web.app` → redirige a `/auth/login`.
2. Crear cuenta → navbar muestra iniciales e inicia sesión.
3. Añadir 2-3 servicios al carrito → checkout PayPal (sandbox) → correo de
   confirmación con tabla precio×cantidad en MXN (**sin** columna "Plan").

## Rollback

- Hosting: `npx firebase hosting:channel:deploy nombre-canal --expires 7d`
  (previsualizar) antes de tocar producción.
- Functions: desplegar un commit anterior en el mismo proyecto, o
  `npx firebase functions:delete sendOrderEmail --project phonedevelopers-ac8db`.
