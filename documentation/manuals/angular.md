# Teoría completa de Angular

## ¿Qué es Angular?

Un framework y plataforma de Google para construir SPAs (Single-Page Applications). Basado en TypeScript, con componentes, servicios, módulos y rutas predefinidos.

### Historia y versiones

- AngularJS (v1.x): JavaScript puro, MVC.
- Angular (v2+): reescrito en TypeScript desde 2016. Versiones semestrales hasta la actual v19+.

## Arquitectura básica

1. NgModule
    - Define declarations, imports, providers, bootstrap.
2.	Componentes (@Component)
    - Selector, plantilla (HTML) y estilos (CSS).
3.	Data Binding
    - Interpolación: {{ valor }}
    - Property binding: [src]="urlImagen"
    - Event binding: (click)="hacerAlgo()" 
    - Two-way binding: [(ngModel)]="campo"
4.	Directivas
    - Estructurales: *ngIf, *ngFor
    - Atributo: [ngClass], [ngStyle]
5. Pipes
    - Transforman datos: {{ fecha | date:'shortDate' }}, {{ precio | currency }}
6. Servicios (@Injectable) e Inyección de Dependencias
    - Lógica reusable, testable.

### Routing

- Configuras rutas con RouterModule.forRoot(routes).
- Soporta lazy loading de módulos para optimizar la carga inicial.

## Herramientas y flujo de trabajo

1. CLI (ng)
    - Crear proyecto: ng new mi-app
    - Generar componentes/servicios: ng g component nombre
    - Servir: ng serve
    - Build producción: ng build --configuration production
    - Tests: ng test / ng e2e
2. Estructura típica

```sh
src/
  app/
    components/
    services/
    app-routing.module.ts
    app.module.ts
    app.component.ts/.html/.css
  assets/
  environments/
  main.ts
  index.html
```

### ¿Para qué sirven los NgModules?

1. Modularizar tu app
    - Divides tu aplicación en piezas lógicas: módulo de usuarios, módulo de productos, módulo compartido, etc.
	- Facilita que cada equipo trabaje en su propio módulo sin pisarse mutuamente.
2. Controlar la visibilidad
	- Con la propiedad exports decides qué componentes/directivas/pipes de un módulo pueden usarse desde otros módulos.
3. Lazy loading
	- Cargas módulos bajo demanda (cuando el usuario navega a cierta ruta), lo que reduce el tamaño del bundle inicial.
4. Configurar providers
	- Defines servicios (providers) que son “singleton” dentro de ese módulo (o de toda la app si es el módulo raíz).

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }   from './app.component';
import { LoginComponent } from './login/login.component';
import { SharedModule }   from './shared/shared.module';
import { AuthService }    from './services/auth.service';

#### Estructura básica de un NgModule

```typescript
@NgModule({
  declarations: [
    AppComponent,        // componentes/directivas/pipes que pertenecen a este módulo
    LoginComponent
  ],
  imports: [
    BrowserModule,       // módulos cuyos exports necesitas aquí
    SharedModule
  ],
  providers: [
    AuthService          // servicios disponibles en este módulo
  ],
  bootstrap: [AppComponent]  // componente raíz que Angular “inserta” primero en index.html
})
export class AppModule { }
```

### Módulos Comunes en Angular
1. BrowserModule
    - Necesario en el módulo raíz para aplicaciones en navegador.
2. CommonModule
    - Incluye directivas básicas (ngIf, ngFor); se importa en módulos secundarios, no en el raíz.
3. FormsModule / ReactiveFormsModule
    - Para formularios template-driven o reactivos.
4. HttpClientModule
    - Para hacer peticiones HTTP con HttpClient.

#### Bootstrap en un NgModule 

“bootstrap” no tiene nada que ver con la librería Bootstrap de estilos CSS. Son dos cosas distintas:

Dentro de tu @NgModule({ … }), la propiedad

```typescript
bootstrap: [AppComponent]
```

Le dice a Angular qué componente arrancar primero cuando carga la aplicación. Es decir:
- declarations declara qué componentes/directivas/pipes hay en ese módulo. (Estos ya existen en las librerías de angular)
- imports trae otros módulos cuyos exports necesites. (Estos los creamos con ng generate module mi-modulo)
- bootstrap indica el componente raíz que Angular inserta en el index.html para iniciar el renderizado.

```typescript
@NgModule({
  declarations: [AppComponent, HomeComponent, LoginComponent],
  imports:      [BrowserModule],
  providers:    [AuthService],
  bootstrap:    [AppComponent]   // <-- aquí
})
export class AppModule { }
```

## Directivas estructurales

En Angular las dos directivas estructurales más comunes para control de flujo en las plantillas son *ngIf (para condicionales) y *ngFor (para bucles).

1. *ngIf (condicional)

Sirve para insertar o eliminar un fragmento de tu template según una expresión booleana.

Sintaxis básica

```html
<!--  Si condición es true, renderiza <p>; si false, no aparece -->
<p *ngIf="condición">Este párrafo solo se ve cuando condición es true.</p>
```

Usando un “else”

Puedes manejar un bloque alternativo con la sintaxis ; else y un <ng-template>:

```html
<div *ngIf="isLoggedIn; else loginTemplate">
  ¡Bienvenido, usuario!
</div>

<ng-template #loginTemplate>
  <button (click)="login()">Iniciar sesión</button>
</ng-template>
```

- isLoggedIn: cualquier expresión booleana que tengas en tu componente.
- #loginTemplate: referencia al <ng-template> que se renderiza cuando isLoggedIn es false.

2. *ngFor (iteración)

Se usa para recorrer arrays (o iterables) y renderizar un bloque por cada elemento.

Sintaxis básica

```html
<ul>
  <li *ngFor="let item of items">
    {{ item.nombre }}
  </li>
</ul>
```

- items: un array definido en tu componente, por ejemplo items = [{ nombre: 'A' }, { nombre: 'B' }].
- let item of items: declara la variable local item para cada iteración.

Variables contextuales

Angular te da varias variables útiles dentro de *ngFor:

```html
<ul>
  <li *ngFor="let item of items; let i = index; let eImpar = odd">
    {{ i + 1 }}. {{ item.nombre }}
    <span *ngIf="eImpar">(posición impar)</span>
  </li>
</ul>
```

index: posición del elemento (0-based).
- first / last: booleanos que indican si es el primer o último elemento.
- even / odd: booleanos según la paridad del índice.

Ejemplo combinado

```html
<div *ngIf="items.length; else noItems">
  <ul>
    <li *ngFor="let item of items; let idx = index">
      {{ idx + 1 }} - {{ item }}
    </li>
  </ul>
</div>

<ng-template #noItems>
  <p>No hay elementos que mostrar.</p>
</ng-template>
```

1. Si items.length > 0, muestra la lista.
2. Si está vacío, renderiza el template #noItems.

Con *ngIf controlas si ves algo, y con *ngFor controlas cuántas veces aparece algo, iterando sobre tus datos. Son la base para manejar dinámicamente tus vistas en Angular.

## Atributos Dinámicos

Los atributos [ngClass] y [ngStyle] son directivas de atributo en Angular que te permiten aplicar clases CSS y estilos de forma dinámica según la lógica de tu componente.

### [ngClass]
- ¿Qué hace?
Aplica o quita clases CSS basándose en una expresión que puede ser:
- Un string con nombres de clase separados por espacios.
- Un array de nombres de clase.
- Un objeto cuyas claves son nombres de clase y cuyos valores (true/false) indican si la clase se debe aplicar.

1. activeClass es un string con las clases que siempre quieres aplicar.
2. isHighlighted e isEnabled son booleanos que controlan, vía objeto, si cada clase debe aparecer o no.

#### Utilidad

Cuando quieras (des)activar clases completas, aprovechando tus estilos CSS ya definidos en archivos .css o .scss.

### [ngStyle]
- ¿Qué hace?
Aplica estilos CSS en línea (style="…") dinámicamente, usando un objeto cuyas claves son propiedades CSS en camelCase y cuyos valores son los valores de estilo.

#### Utilidad

Cuando necesites aplicar estilos inline concretos que varían en tiempo de ejecución (por ejemplo, tamaños dinámicos, colores calculados, márgenes variables…).

