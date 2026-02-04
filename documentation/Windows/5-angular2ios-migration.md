# Guía de migración de Angular a iOS con Capacitor

1. Instala la interfaz de línea de comandos de Capacitor de forma global para poder usar sus comandos en cualquier proyecto:
```sh
npm install --global @capacitor/cli
```

2. Instala el núcleo de Capacitor globalmente, aunque normalmente se instala localmente en el proyecto, esto puede ser útil para herramientas globales:
```sh
npm install --global @capacitor/core
```

3. Compila tu aplicación Angular en modo producción para generar los archivos listos para desplegar:
```sh
ng build --configuration=production
```

4. Inicializa Capacitor en tu proyecto, lo que creará los archivos de configuración necesarios:
```sh
npx cap init
```

5. Instala el paquete de iOS de Capacitor globalmente para poder crear y gestionar el proyecto iOS:
```sh
npm install --global @capacitor/ios
```

6. Abre el proyecto iOS generado en Xcode para poder compilarlo y ejecutarlo en un dispositivo o simulador:
```sh
npx cap open ios
```
