# Configuración de GitHub

Esta es una guía de referencia con los comandos más comunes de Git y GitHub que necesitarás para trabajar en el proyecto. Estos comandos te ayudarán a versionar tu código, colaborar con otros desarrolladores y mantener tu proyecto sincronizado con el repositorio remoto.

No necesitas completar toda la guia de github porque aqui tambien te explico como cargar automáticamente las llaves para hacer despliegues de pipeline automatizados, entonces eso no es parte del curso, es un contenido adicional que te servirá si lo quieres practicar.

---

## Configurar tu Aplicación como Proyecto de Github

### Paso 1: Crear el repositorio en GitHub

1. Ve a [GitHub](https://github.com)
2. Haz clic en el botón **"New"** (Nuevo) o en el ícono **"+"** → **"New repository"**
3. Dale un nombre a tu repositorio (ejemplo: "phoneDevelopers")
4. Selecciona si será público o privado
5. **NO** inicialices con README, .gitignore o licencia (ya que clonarás un proyecto existente)
6. Haz clic en **"Create repository"**

### Paso 2: Navegar a la carpeta de tu aplicación y conectarla con GitHub

```sh
# Navega a la carpeta de tu proyecto
cd C:\Users\Documents\phoneDevelopers

# Inicializa Git en el proyecto (si no está inicializado)
git init

# Verifica las conexiones remotas actuales
git remote -v

# Si te aparece mi cuenta, entonces primero desvinculate
git remote remove origin

# Agrega tu repositorio de GitHub como remoto
git remote add origin https://github.com/tu-usuario/phoneDevelopers.git

# Agrega todos los archivos al área de preparación
git add .

# Crea tu primer commit
git commit -m "First commit"

# Sube los cambios a GitHub
git push -u origin master
```

---

## Comandos Básicos de Git (Los Más Comunes)

### Verificar el estado de tus archivos

```sh
# Ver qué archivos han cambiado
git status
```

### Agregar cambios al área de preparación

```sh
# Agregar un archivo específico
git add nombre-archivo.ts

# Agregar todos los archivos modificados
git add .

# Agregar todos los archivos de una carpeta
git add src/
```

### Crear un commit (guardar cambios)

```sh
# Commit con mensaje descriptivo
git commit -m "Descripción de los cambios"

# Commit agregando todos los archivos modificados
git commit -am "Mensaje del commit"
```

### Subir cambios a GitHub

```sh
# Subir cambios de la rama actual
git push

# Subir cambios y establecer rama remota
git push -u origin nombre-rama
```

### Descargar cambios de GitHub

```sh
# Descargar cambios del repositorio remoto
git pull

# Descargar cambios de una rama específica
git pull origin master
```

### Trabajar con ramas

```sh
# Ver todas las ramas
git branch

# Crear una nueva rama
git branch nombre-rama

# Cambiar a una rama
git checkout nombre-rama

# Crear y cambiar a una nueva rama en un solo comando
git checkout -b nombre-rama

# Eliminar una rama local
git branch -d nombre-rama
```

### Ver el historial de commits

```sh
# Ver historial completo
git log

# Ver historial resumido
git log --oneline

# Ver últimos 5 commits
git log -5
```

### Descartar cambios

```sh
# Descartar cambios en un archivo específico
git checkout -- nombre-archivo.ts

# Descartar todos los cambios no guardados
git reset --hard

# Quitar archivos del área de preparación
git reset
```

---

## Configuración de Usuario en Git

Es importante configurar tu nombre y email para que tus commits estén asociados a tu cuenta:

```sh
# Configurar nombre de usuario
git config user.name "Tu Nombre"

# Configurar email
git config user.email "tuemail@example.com"

# Ver configuración actual
git config --list
```

### Agregar directorio seguro (si es necesario)

```sh
# Si Git te da errores de permisos, agrega el directorio como seguro
git config --global --add safe.directory /ruta/a/tu/proyecto
```

---

## Automatizaciones de Github (Avanzado)

Esta sección es para configuración avanzada de CI/CD con GitHub Actions. Si estás empezando, puedes saltarte esta parte.

### Instalar WSL (Windows Subsystem for Linux)

```sh
# Documentación oficial
https://docs.microsoft.com/windows/wsl/install

# Instalar WSL
wsl --install
```

Abre la nueva instalación de Ubuntu presionando **WIN + R**, escribe `wsl` y presiona Enter.

### Ejemplo de Log de Instalación

```sh
    Provisioning the new WSL instance Ubuntu
    This might take a while...
    Create a default Unix user account: jackson
    New password:
    Retype new password:
    passwd: password updated successfully
    To run a command as administrator (user "root"), use "sudo <command>".
    See "man sudo_root" for details.

    Welcome to Ubuntu 24.04.2 LTS (GNU/Linux 5.15.167.4-microsoft-standard-WSL2 x86_64)

    * Documentation:  https://help.ubuntu.com
    * Management:     https://landscape.canonical.com
    * Support:        https://ubuntu.com/pro

    System information as of Sun May 18 14:54:54 CST 2025

    System load:  0.14                Processes:             32
    Usage of /:   0.1% of 1006.85GB   Users logged in:       0
    Memory usage: 3%                  IPv4 address for eth0: 172.24.163.136
    Swap usage:   0%


    This message is shown once a day. To disable it please create the
    /home/jackson/.hushlogin file.
    jackson@Jackson-Grim-gamer-pc:~$
```

### Instalar GitHub CLI en tu entorno WSL

```sh
# 1. Agregar la clave del repositorio oficial
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg \
| sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg

sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] \
https://cli.github.com/packages stable main" \
| sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null

# 2. Actualizar e instalar
sudo apt update
sudo apt install gh -y

# 3. Verificar instalación
gh --version
```

### Iniciar sesión en GitHub 

```sh
    jackson@Jackson-Grim-gamer-pc:/mnt/c/Users/User/OneDrive/Documents/github/marketplace/.github/automations$ gh auth login
    ? Where do you use GitHub? GitHub.com
    ? What is your preferred protocol for Git operations on this host? HTTPS
    ? Authenticate Git with your GitHub credentials? Yes
    ? How would you like to authenticate GitHub CLI? Login with a web browser

    ! First copy your one-time code: 3AE1-EFD7
    Press Enter to open https://github.com/login/device in your browser...
    ! Failed opening a web browser at https://github.com/login/device
    exec: "xdg-open,x-www-browser,www-browser,wslview": executable file not found in $PATH
    Please try entering the URL in your browser manually
    ✓ Authentication complete.
    - gh config set -h github.com git_protocol https
    ✓ Configured git protocol
    ! Authentication credentials saved in plain text
    ✓ Logged in as jacksongrimmx
    jackson@Jackson-Grim-gamer-pc:/mnt/c/Users/User/OneDrive/Documents/github/marketplace/.github/automations$
```

Set ownership confidence

### Configurar directorio seguro

```sh
git config --global --add safe.directory /mnt/c/Users/User/OneDrive/Documents/github/marketplace
```

### Ejecutar el script bash

```sh
cd /mnt/c/Users/Documents/github/marketplace/.github/automations
bash environment-variables-deployments.sh
```

### Log de confirmación de GitHub

```sh
✓ Set Actions secret FIREBASE_API_KEY for jacksongrimmx/marketplace
✓ Set Actions secret FIREBASE_AUTH_DOMAIN for jacksongrimmx/marketplace
✓ Set Actions secret FIREBASE_PROJECT_ID for jacksongrimmx/marketplace
✓ Set Actions secret FIREBASE_STORAGE_BUCKET for jacksongrimmx/marketplace
✓ Set Actions secret FIREBASE_MESSAGING_SENDER_ID for jacksongrimmx/marketplace
✓ Set Actions secret FIREBASE_APP_ID for jacksongrimmx/marketplace
✓ Set Actions secret FIREBASE_MEASUREMENT_ID for jacksongrimmx/marketplace
✓ Set Actions secret FIREBASE_SERVICE_ACCOUNT_MARKETPLACE_A9AB1 for jacksongrimmx/marketplace
```

### Crear variable de entorno de Firebase Token

```sh
FIREBASE_TOKEN
```

### Crear un Token

```sh
firebase login:ci     
```

### Log de confirmación de Firebase

```sh
!  Authenticating with a `login:ci` token is deprecated and will be removed in a future major version of `firebase-tools`. Instead, use a service account key with `GOOGLE_APPLICATION_CREDENTIALS`: https://cloud.google.com/docs/authentication/getting-started

Visit this URL on this device to log in:
https://accounts.google.com/o/oauth2/auth?client_id=563584335869-fgrhgmd47bqnekij5i8b5pr03ho849e6.apps.googleusercontent.com&scope=email%20openid%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcloudplatformprojects.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Ffirebase%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcloud-platform&response_type=code&state=988460991&redirect_uri=http%3A%2F%2Flocalhost%3A9005

Waiting for authentication...

+  Success! Use this token to login on a CI server:

ESTE ES EL TOKEN, COPIÁLO Y PÉGALO EN GITHUB SECRETS

Ejemplo: firebase deploy --token "$FIREBASE_TOKEN"

PS C:\Users\User\OneDrive\Documents\github\marketplace> 
```

---

## 🚫 Importante: Activar Reglas de Protección de Ramas

Ve a GitHub → **Settings** → **Branches** y:

1. Agrega una **Branch Protection Rule** para `master`
2. Activa:
   - ✅ **Require pull request before merging** (Requerir pull request antes de fusionar)
   - ✅ **Require status checks to pass before merging** (Requerir que pasen las verificaciones)
   - Marca **Firebase Hosting Preview on PR** (cuando se ejecute por primera vez)
   - ✅ **Require approvals** (mínimo 1 aprobación)
   - ✅ **Block force pushes** (Bloquear push forzados)
