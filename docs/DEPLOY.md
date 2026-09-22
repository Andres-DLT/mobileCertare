# DEPLOY — Certare (phoneDevelopers)

Guía de despliegue a producción (Firebase Hosting + Cloud Functions).

## Requisitos previos

- CLI Firebase instalado globalmente en esta máquina; verificar con `firebase --version`.
- Proyecto Firebase destino: **`smartfoodie-dda27`** (alias `phoneDevelopers`
  en `.firebaserc`). Verificar con `npx firebase projects:list`.
- Build Angular ya compilado: `dist/phoneDevelopers/browser` (index.html +
  main.*.js + assets) — confirmado en disco en el último build producción.
- Build functions ya compilado: `functions/` (jest 21/21 PASS + `tsc` 0 errores).

La sesión Firebase de esta máquina tiene acceso a `smartfoodie-dda27`.
Las reglas de `product-store` se desplegaron y verificaron durante la
[revisión funcional](VERIFICATION-2026-09-21.md).

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

Debe aparecer `smartfoodie-dda27`.

## Paso 1 — Deploy Cloud Functions (correo de pedido)

```
npx firebase deploy --only functions --project smartfoodie-dda27
```

- Compila `functions` (predeploy `npm run build`) y despliega
  `sendOrderEmail`.
- Confirma en consola: `✔  Deploy complete!` + `Function URL
  (sendOrderEmail)`.

## Paso 2 — Deploy Hosting (SPA)

```
npx firebase deploy --only hosting --project smartfoodie-dda27
```

- Sube `dist/phoneDevelopers/browser` (rewrite `**` → `index.html`).
- URLs: principal `https://certare.web.app`.
  El sitio legacy `smartfoodie-dda27.web.app` está deshabilitado
  (`firebase hosting:disable -s smartfoodie-dda27`); `firebase.json` solo
  despliega `certare` para no reactivarlo.

### Nota de dominio/identidad

Firebase Hosting usa `https://<proyectoID>.web.app` /
`https://<proyectoID>.firebaseapp.com`. La "identidad" del proyecto
(`mobileCertare`) es el **repositorio Git** (remoto ya apuntando a
`https://github.com/Andres-DLT/mobileCertare.git`); el branding en la app se
controla con el título (`certare`) y el logo, no con el subdominio de Hosting.
Si se desea un dominio de marca se configura en Firebase > Hosting > Add
custom domain.

## Paso 3 — Seed de catálogo en producción (opcional, una vez)

Con el service account de producción (`serviceAccountKey.json` en la raíz):

```
node scripts/seed-services.js
```

El script reemplaza el catálogo `product-store` con los datos de ejemplo.
La migración ya conservó los 20 documentos reales, incluidos precios y textos
editados en Firebase; no es necesario volver a sembrar el catálogo existente.

## Paso 4 — Verificación post-deploy

1. Abrir `https://smartfoodie-dda27.web.app` → redirige a `/auth/login`.
2. Crear cuenta → navbar muestra iniciales e inicia sesión.
3. Añadir servicios al carrito, cambiar cantidades y comprobar el total en MXN.
4. Con `paymentsEnabled: false`, el checkout está oculto y no se solicita el SDK PayPal.

## Android

```powershell
npm run android:sync
```

Este comando compila Angular y copia el resultado al módulo Android. Después
ejecutar `app` desde Android Studio o compilar con `android/gradlew.bat -p android assembleDebug`.

## Rollback

- Hosting: `npx firebase hosting:channel:deploy nombre-canal --expires 7d`
  (previsualizar) antes de tocar producción.
- Functions: desplegar un commit anterior en el mismo proyecto, o
  `npx firebase functions:delete sendOrderEmail --project smartfoodie-dda27`.
