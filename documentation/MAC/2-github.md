# Instalación de GitHub CLI y Git en macOS

Este documento explica paso a paso la instalación y configuración de GitHub CLI (`gh`) y Git en macOS usando Homebrew.

---

## 🔧 Requisitos Previos

* Tener instalado Homebrew. Si no lo tienes, consulta el documento de instalación de Homebrew.

---

## ✅ 1. Verificar o Instalar Git

Git es el sistema de control de versiones que permite trabajar con repositorios.

### Verificar si ya está instalado:

```bash
git --version
```

### Instalar Git con Homebrew (si no está instalado):

```bash
brew install git
```

---

## ⚖️ 2. Configurar Git con tus datos de GitHub

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tuemail@ejemplo.com"
```

### Verificar configuración:

```bash
git config --global --list
```

---

## 🚀 3. Instalar GitHub CLI (`gh`)

GitHub CLI te permite interactuar con GitHub desde la terminal.

### Instalar con Homebrew:

```bash
brew install gh
```

### Verificar instalación:

```bash
gh --version
```

---

## 🔑 4. Autenticarse en GitHub

Autenticarse permite ejecutar comandos que requieren permisos como crear repos, issues, PRs, etc.

```bash
gh auth login
```

Selecciona las siguientes opciones:

* GitHub.com
* HTTPS
* Autenticarse mediante navegador
* Copia el código que te proporciona y pégalo en el navegador

---

## 🌐 5. Comandos básicos para verificar funcionamiento

```bash
gh repo list
```

Muestra tus repositorios.

```bash
gh issue list
```

Muestra issues activos.

```bash
gh pr list
```

Muestra pull requests activos.

---

## 📄 Recursos

* [Documentación de GitHub CLI](https://cli.github.com/)
* [Documentación de Git](https://git-scm.com/doc)
