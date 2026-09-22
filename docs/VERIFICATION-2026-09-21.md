# Migración y verificación funcional — 21 de septiembre de 2026

## Firebase

Proyecto: `smartfoodie-dda27`, base `(default)`.

- `cloth-store`: 20 documentos antes de la migración; 0 al terminar.
- `product-store`: 20 servicios reales al terminar. Se conservaron IDs, campos,
  tipos, precios y descripciones, incluyendo las modificaciones hechas en Firebase.
- El documento de prueba `product-store/producto` contenía únicamente `{ "d": "" }`.
  Se respaldó y retiró porque no era un producto válido.
- Cada eliminación del origen comprobó en una transacción que el documento
  de destino seguía coincidiendo con el origen.
- El único usuario existente tenía `displayName` vacío. Se actualizó a `Andres`.
- Reglas desplegadas: lectura del catálogo permitida; escrituras del cliente
  y acceso a las demás colecciones denegados.
- Se restauró `roles/firebaserules.system` para el agente estándar
  `service-626578601404@firebase-rules.iam.gserviceaccount.com`. Este vínculo
  faltaba en IAM y las lecturas de clientes fallaban aunque las reglas las permitían.

### Respaldos locales

Dentro de `tmp/` (excluido de Git):

- `cloth-store-backup-1790047002021.json`: documentos originales con tipos etiquetados.
- `product-store-placeholder-backup.json`: documento de prueba vacío.
- `iam-before-rules-repair-*.json`: política IAM anterior a la reparación.

`scripts/migrate-product-store.js` permite inspeccionar, copiar y verificar antes
de eliminar el origen; no modifica datos si se ejecuta sin opciones.

## Problemas corregidos en la aplicación

- AngularFire 19 convertía el constructor de persistencia en un callback al usar
  su `setPersistence`, causando `cls is not a constructor`. Se utiliza esa llamada
  desde `firebase/auth` y se espera su resolución antes de login/registro.
- Firebase Auth es la fuente del nombre y del estado de sesión; se retiró el
  estado duplicado en `localStorage.user` y el cierre de sesión forzado al inicio.
- Lectura de `product-store` en contexto de inyección y con el ID documental
  como `Product.id`.
- El skeleton termina ante datos, error o espera agotada (15 segundos).
- Añadir al carrito modifica realmente el carrito. Deshacer conserva las
  cantidades previas gracias a snapshots independientes.
- Los pagos permanecen desactivados y el SDK PayPal no se carga.

## Comprobaciones ejecutadas

| Comprobación | Resultado |
| --- | --- |
| `npm test -- --watch=false --browsers=ChromeHeadless` | 35/35 aprobadas |
| `npm run android:sync` | Build de producción y sync correctos |
| `android/gradlew.bat -p android assembleDebug --stacktrace` | BUILD SUCCESSFUL |
| APK instalada con `adb install -r` en Pixel_10_Pro | Correcto |
| Registro web, cierre de sesión y login con contraseña | Correcto |
| Sesión web tras recarga | Correcto |
| 20 tarjetas, desaparición del skeleton y filtros de las 6 categorías | Correcto |
| Productos distintos, cantidades, totales y deshacer | Correcto en web y APK |
| Perfil real `Andres` y diseño móvil | Correcto en Chrome y APK |
| Sesión Android tras detener y abrir el proceso | Conservada |
| Checkout oculto y solicitudes a PayPal | Oculto; 0 solicitudes |
| Errores/avisos JavaScript durante recorridos funcionales | 0 |
| Logcat de consola Capacitor y AndroidRuntime al finalizar | Sin errores |

Las cuentas temporales de las pruebas se eliminaron. La comprobación del perfil
real usó un token temporal de Firebase Admin sin cambiar la contraseña del usuario.
Las credenciales de prueba no se guardaron en archivos del proyecto.

El servidor de desarrollo se inició en `http://127.0.0.1:4200` y el emulador quedó
abierto en el catálogo actualizado. APK: `android/app/build/outputs/apk/debug/app-debug.apk`.

## Mantenimiento detectado

- `npm audit --omit=dev` informa 17 hallazgos en el árbol de dependencias:
  9 moderados, 6 altos y 2 críticos. Parte de las correcciones propuestas requieren
  cambios de versión mayor de Angular/AngularFire. La comprobación funcional
  aprobada no equivale a una auditoría de seguridad aprobada.
- Gradle compila con avisos sobre opciones de compatibilidad obsoletas de AGP.
- El carrito actual es de sesión en memoria; conserva su contenido al navegar,
  pero se vacía al recargar el proceso o cerrar sesión.
- Checkout y envío de pedidos requieren la futura activación/configuración del
  proveedor de pagos.
