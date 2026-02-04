# Phone Developers

## 🔧 Prerequisitos

### Crear cuentas

Vas a tener que entrar a todos estos portales y hacer una cuenta en cada uno de ellos.

![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white) [Github](http://github.com)  
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black) [Firebase](http://firebase.google.com)  
![ChatGPT](https://img.shields.io/badge/ChatGPT-00A67E?style=for-the-badge&logo=openai&logoColor=white) [ChatGPT](http://chatgpt.com)  
![Canva](https://img.shields.io/badge/Canva-00C4CC?style=for-the-badge&logo=canva&logoColor=white) [Canva](www.canva.com)  
![Discord](https://img.shields.io/badge/Discord) [Discord](https://discord.com/download)  

### Download Tools

También se requiere tener instalados algunos productos dentro de tu computadora, descarga e instala estos softwares.

![Visual Studio](https://img.shields.io/badge/Visual_Studio-5C2D91?style=for-the-badge&logo=visual-studio&logoColor=white) [Visual Studio Code](https://code.visualstudio.com/Download)  
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) [NodeJS + NPM](https://nodejs.org/en)  
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white) [Git](https://git-scm.com/downloads)  
![Android Studio](https://img.shields.io/badge/Android_Studio-3DDC84?style=for-the-badge&logo=android-studio&logoColor=white) [Android Studio](https://developer.android.com/studio)  


## Descarga y Configura Proyecto Phone Developers

Primero abre el programa de Visual Studio Code y en la parte superior dirigente al menú y selecciona la opción de Terminal > Nueva Terminal

Una vez que se abra la terminal en la parte inferior de nuesto Editor de Texto, correras los siguientes comandos.

### Configuración de Github

Has una clonación de repo, eso quiere decir que vas a descargar mi proyecto completo en tu computadora

```sh
# Comando para descargar la carpeta de Github
git clone git@github.com:jacksongrimmx/phoneDevelopers.git
```

Ya has descargado la carpeta pero todavía no estas dentro del folder correcto, así es que entra al folder dando click en el menú superior de Visual Studio Code en Archivo > Abrir Folder y selecciona PhoneDevelopers

Cuando haces esto, la terminal se cierra, entonces es probabe que la tengas que volver a abrir.

> [!IMPORTANT]
> Es importante saber que si no has abierto la carpeta de phoneDevelopers, los comandos van a fallar. Siempre verifica que la carpeta en la que te encuentras esté abierta. Fíjate en la terminal cómo aparece la ruta así:
> ```
> PS C:\Users\phoneDevelopers>
> ```

Desvinculate de la cuenta asociada actualmente y configura la tuya.

```sh
# Utiliza los datos de la cuenta que diste de alta cuando creaste tu cuenta de Github
git config user.name "Tu Nombre"
git config user.email "tuemail@example.com"
```

### Verfica que hayas instalado el Package Manager

Cuando hiciste la instalación de NodeJS, e te instalaron los programas necesarios para hacer la administración de paquetes, en particular, la instalación que bajaste sin saberlo es NPM. 

Lanzando lo siguientes comandos, podrás corroborar que sí están instalados.

```sh
# Verifica si Node JS y NPM están instalados en tu sistema operativo
node -v
npm -v
```

Después de ejecutar los comandos, se te responderá con 2 versiones, la de Node y NPM, de éste modo, sabrás que ya los tienes instalados, en caso de que no se te muestre alguna de las 2, quiere decir que no has instalado alguno de ellos.

### Configuración de Ángular CLI

Hasta el momento no has instalado Ángular, solo sabemos que tienes instalado el NPM y Node JS, por lo que debes de correr el siguiente comando para hacer toda la instalación de paquetes automática.

```sh
# Ejecuta la instalación para todos los paquetes que se encuentran lsitados en el archivo package.json
npm install
```
Ahora toca ver si el CLI de ángular fué instalado o no, haciendo la instalación general de npm install, corre el siguiente comando para ver si te meustra la versión de Ángular que descargaste, en caso de que no te muestre nada ejecuta el siguiente comando disponible que te permite hacer la intalación específica de Ángular

```sh
# Verifica que Ángular está disponible en tu sistema operativo
ng version
```


```sh
# Instala ángular de manera global y verifica que sí está disponible en tu sistema operativo
npm install -g @angular/cli 
ng version
```

### Firebase CLI

Para poder desplegar tu aplicación a Firebase, necesitas instalar las herramientas de línea de comandos de Firebase y autenticarte.

```sh
# Instala Firebase CLI de manera global
npm install -g firebase-tools

# Verifica que Firebase CLI está instalado
firebase --version
```

Una vez instalado, debes iniciar sesión con tu cuenta de Firebase:

```sh
# Inicia sesión en Firebase
firebase login

# Verifica que estás autenticado
firebase projects:list
```

El comando `firebase login` abrirá tu navegador para que puedas autenticarte con tu cuenta de Google asociada a Firebase. Después de autenticarte exitosamente, podrás ver la lista de tus proyectos de Firebase con el comando `firebase projects:list`.
