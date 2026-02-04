# Configuración de Firebase

En tu proyecto encontrarás 3 archivos de ejemplo que necesitas configurar con los datos de tu cuenta de Firebase.

Estos archivos llevan el sufijo de .example, para que los puedas editar y que la configuración quede registrada, debes de eliminar la palabra example de los 3 archivos y sustituiras la información con unos archivos de configuración que se descargan directo de la cuenta de Firebase.

 A continuación te explicamos paso a paso cómo obtener cada una de estas configuraciones.

## Crear un Proyecto en Firebase

Antes de obtener las configuraciones, necesitas crear un proyecto en Firebase:

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en **"Agregar proyecto"** o **"Add project"**
3. Ingresa el nombre de tu proyecto (ejemplo: "phoneDevelopers")
4. (Opcional) Configura Google Analytics si lo deseas
5. Haz clic en **"Crear proyecto"**
6. Espera a que Firebase termine de crear tu proyecto

---

## Archivo 1: Configuración de la App Web (firebase-config.ts)

Este archivo contiene las credenciales para conectar tu aplicación Angular con Firebase.

### Paso 1: Registrar tu Aplicación Web

1. Dentro de tu proyecto en Firebase Console, haz clic en el ícono de **engranaje ⚙️** en la parte superior izquierda
2. Selecciona **"Configuración del proyecto"** o **"Project settings"**
3. Desplázate hacia abajo hasta la sección **"Tus aplicaciones"** o **"Your apps"**
4. Haz clic en el ícono **</>** (Web) para registrar una aplicación web
5. Ingresa un nombre para tu app (ejemplo: "phoneDevelopers Web")
6. **NO** marques la opción de Firebase Hosting por ahora
7. Haz clic en **"Registrar app"**

### Paso 2: Copiar la Configuración

Después de registrar tu app, Firebase te mostrará un bloque de código con tu configuración. Copia estos valores:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

### Paso 3: Actualizar tu Archivo

1. Abre el archivo `src/environments/firebase-config.ts`
2. Reemplaza los valores de ejemplo con tus datos reales:

```typescript
// src/environments/firebase-config.ts
export const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID",
};
```

> [!TIP]
> Si cerraste la ventana con la configuración, puedes volver a verla en:
> **Configuración del proyecto** → **Tus aplicaciones** → Selecciona tu app web → **Configuración del SDK**

---

## Archivo 2: Cuenta de Servicio (serviceAccountKey.json)

Este archivo es necesario para que los scripts del lado del servidor puedan acceder a Firebase (como los scripts de seed de productos).

### Paso 1: Acceder a Cuentas de Servicio

1. En Firebase Console, haz clic en el ícono de **engranaje ⚙️**
2. Selecciona **"Configuración del proyecto"** o **"Project settings"**
3. Ve a la pestaña **"Cuentas de servicio"** o **"Service accounts"**

### Paso 2: Generar Nueva Clave Privada

1. En la sección **"SDK de Firebase Admin"**, encontrarás el lenguaje seleccionado en **Node.js**
2. Haz clic en el botón **"Generar nueva clave privada"** o **"Generate new private key"**
3. Aparecerá un mensaje de advertencia - haz clic en **"Generar clave"**
4. Se descargará automáticamente un archivo JSON con un nombre largo (ejemplo: `tu-proyecto-firebase-adminsdk-xxxxx.json`)

### Paso 3: Configurar el Archivo

1. Renombra el archivo descargado a `serviceAccountKey.json`
2. Mueve el archivo a la raíz de tu proyecto (donde está el `package.json`)

```
phoneDevelopers/
├── serviceAccountKey.json  ← Aquí debe estar
├── package.json
├── src/
└── ...
```

> [!WARNING]
> **¡MUY IMPORTANTE!** Este archivo contiene credenciales sensibles. **NUNCA** lo subas a GitHub.
> - Asegúrate de que `serviceAccountKey.json` está en tu `.gitignore`
> - El proyecto ya incluye un `serviceAccountKey.example.json` como referencia

---

## Archivo 3: Variables de Entorno (.env)

Este archivo almacena variables de entorno para tu proyecto local.

### Paso 1: Crear el Archivo .env

1. En la raíz de tu proyecto, crea un archivo llamado `.env` (si no existe)
2. Agrega la ruta a tu archivo de cuenta de servicio:

```env
GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json
```

### Paso 2: Instalar Dependencias Necesarias

```sh
npm install dotenv
```
---

## Trigger Seed Product Generation

Para hacer una carga automática de base de datos en firebase yo he preparado este archivo, tan solo corre la sentencia y verás que se actualizan los datos de la base de datos de firebase en la sección Firestore Database. Si el comando falla, entonces tu no actualizaste correctamente las credenciales de los archivos anteriormente configurados.

```sh
node scripts/seed-products.js
```

---

## Despliegue de la Aplicación a Firebase Hosting

Una vez que has configurado todo y tu aplicación está lista, es momento de desplegarla a la nube para que esté disponible en internet.

### Paso 1: Inicializar Firebase Hosting (Solo la primera vez)

Si es la primera vez que despliegas tu proyecto, necesitas inicializar Firebase Hosting:

```sh
firebase init hosting
```

Durante la inicialización, Firebase te hará varias preguntas:

1. **"What do you want to use as your public directory?"**
   - Responde: `dist/app-developers/browser` (o el nombre de tu carpeta de build)

2. **"Configure as a single-page app (rewrite all urls to /index.html)?"**
   - Responde: `Yes`

3. **"Set up automatic builds and deploys with GitHub?"**
   - Responde: `No` (por ahora)

4. **"File dist/index.html already exists. Overwrite?"**
   - Responde: `No`

> [!NOTE]
> Solo necesitas hacer `firebase init hosting` **una vez por proyecto**. Las siguientes veces solo ejecutarás los comandos de build y deploy.

---

### Paso 2: Construir la Aplicación para Producción

Antes de desplegar, necesitas compilar tu aplicación Angular en su versión optimizada para producción:

```sh
# Compila la aplicación Angular en modo producción
ng build
```

Este comando:
- Compila todo tu código TypeScript a JavaScript
- Optimiza y minifica los archivos
- Crea una carpeta `dist/` con todos los archivos listos para producción
- Puede tardar 1-2 minutos dependiendo del tamaño de tu proyecto

> [!TIP]
> Si quieres ver estadísticas detalladas del build, usa:
> ```sh
> ng build --configuration production
> ```

---

### Paso 3: Desplegar a Firebase

Una vez que el build se completó exitosamente, despliega tu aplicación:

```sh
# Despliega la aplicación a Firebase Hosting
firebase deploy
```

Este comando:
- Sube todos los archivos de la carpeta `dist/` a Firebase Hosting
- Configura automáticamente el servidor
- Te proporciona una URL pública donde tu app estará disponible

Después del despliegue, verás un mensaje similar a:

```
✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/tu-proyecto/overview
Hosting URL: https://tu-proyecto.web.app
```

¡Tu aplicación ya está en la nube! 🎉

---

### Probar Antes del Despliegue (Opcional)

Si quieres probar cómo se verá tu aplicación en producción **sin** desplegarla a la nube:

```sh
# Sirve la aplicación localmente como si estuviera en Firebase
firebase serve --only hosting
```

Esto iniciará un servidor local en `http://localhost:5000` donde podrás probar tu aplicación.

---

### Flujo Completo de Despliegue

Cada vez que hagas cambios y quieras actualizar tu aplicación en producción:

```sh
# 1. Compila la aplicación
ng build

# 2. Despliega a Firebase
firebase deploy
```

> [!IMPORTANT]
> Siempre debes hacer `ng build` antes de `firebase deploy`. Si haces cambios en tu código y solo ejecutas `firebase deploy` sin hacer build primero, **los cambios NO se verán reflejados** en la nube.

---

### Solución de Problemas Comunes

**Error: "No project active"**
```sh
# Asegúrate de haber hecho login
firebase login

# Verifica que estás en el proyecto correcto
firebase use --add
```

**Error durante el build**
```sh
# Limpia la caché y vuelve a instalar
rm -rf node_modules
npm install
ng build
```

**Los cambios no se ven en la web**
- Asegúrate de haber hecho `ng build` antes de `firebase deploy`
- Limpia la caché de tu navegador (Ctrl + Shift + R o Cmd + Shift + R)
- Espera 1-2 minutos, a veces los cambios tardan en propagarse

