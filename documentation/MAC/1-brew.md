🍺 Instalación de Homebrew en macOS

Homebrew es un gestor de paquetes para macOS que permite instalar fácilmente software de línea de comandos y herramientas de desarrollo.

⸻

📦 Paso 1: Ejecutar el script de instalación

Abre la Terminal y ejecuta el siguiente comando:

/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"


⸻

⚙️ Paso 2: Configurar el entorno (Zsh)

Agrega Homebrew al PATH si usas Zsh:

echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"


⸻

✅ Paso 3: Verificar instalación

Para verificar que Homebrew se instaló correctamente:

brew doctor

Deberías ver el mensaje:

Your system is ready to brew.


⸻

🔄 Actualizar Homebrew (opcional)

Para mantener Homebrew actualizado:

brew update


⸻

🧹 Desinstalar Homebrew (opcional)

Si necesitas desinstalarlo:

/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/uninstall.sh)"


⸻

📝 Nota: Asegúrate de tener instalada la herramienta de desarrolladores de Xcode. Puedes instalarla con:

xcode-select --install