# 🧠 Instalación de Node.js con NVM (Node Version Manager)

## 📌 Requisitos previos

Asegúrate de tener `curl`, `bash`, y `git` instalados en tu sistema.

## 1. 🔽 Instalar NVM (Node Version Manager)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

> Nota: Cambia la versión `v0.39.7` si hay una más nueva en el [repo oficial](https://github.com/nvm-sh/nvm).

### 🔁 Reinicia tu terminal o ejecuta manualmente:

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

> Esto hace que `nvm` esté disponible en tu terminal.

---

## 2. ✅ Verifica que `nvm` se instaló correctamente

```bash
nvm --version
```

---

## 3. 📅 Instalar la versión LTS de Node.js

```bash
nvm install --lts
```

> También puedes instalar una versión específica:

```bash
nvm install 18.20.2
```

---

## 4. 📌 Establecer una versión por defecto

```bash
nvm use 18.20.2
nvm alias default 18.20.2
```

---

## 5. 🧼 Ver versiones instaladas

```bash
nvm ls
```

---

## 6. 🗑️ Desinstalar una versión (opcional)

```bash
nvm uninstall 21.7.2
```

---

## 7. 🧪 Verifica que Node y NPM funcionan

```bash
node -v
npm -v
```

---

## 🧠 Tip extra

Si instalaste Node.js previamente con otra herramienta como `n`, `brew`, o desde el sitio oficial, conviene **desinstalar esas versiones** para evitar conflictos:

```bash
which node
which npm
```

Si no apuntan a `~/.nvm`, puedes quitarlos o priorizar `nvm` en tu `PATH`.

---

¡Listo! 🚀 Ahora puedes usar distintas versiones de Node.js con total control usando `nvm`.
