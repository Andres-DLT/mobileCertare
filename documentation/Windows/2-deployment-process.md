# Diseño de Aplicación

Lo que verás a continuación es simplemente un ejercicio de cómo hacer una aplicación de ángular desde cero, tú te puedes saltar este paso si ya no quieres intentar la aplicación desde cero.

## Crear Espacio de Trabajo de Angular

```sh
# Crea un nuevo proyecto de Angular
ng new appDevelopers
```

## Crear Módulos de la Aplicación

```sh
# Generación del Módulo Auth
ng g module auth --routing
```

```sh
# Generación del Módulo Products
ng g module products --routing
```

```sh
# Generación del Módulo Sales
ng g module sales --routing
```

```sh
# Generación del Módulo Shared
# Recurso compartido en cada Módulo y Componente
ng g module shared
```

### Crear componentes dentro de cada módulo

```sh
#
# Generación de Componentes de Autenticación dentro del Módulo Auth
# auth -> login
# auth -> register
# 
ng g component auth/login
ng g component auth/register
```

```sh
#
# Generación de Componentes de Productos dentro del Módulo Products
# products -> product-list
# products -> product-form
# 
ng g component products/product-list
ng g component products/product-form
```

```sh
#
# Generación de Componentes de Ventas dentro del Módulo Sales
# sales -> cart
# sales -> sales-history
# 
ng g component sales/cart
ng g component sales/sales-history
```

```sh
#
# Generación de componentes compartidos dentro del Módulo Shared
# shared -> auth
# shared -> auth -> login
# shared -> auth -> register
# shared -> products
# shared -> products -> product-list
# shared -> products -> product-form
# shared -> sales
# shared -> sales -> cart
# shared -> sales -> sales-history
# 
ng g component shared/navbar
```

## Configurar las Rutas

Las rutas deben ser configuradas porque sino, no se va a hacer la paginación, paginación quiere decir que la pantalla se cambia cuando cambias de página, si no las configuras, se van a quedar en la pantalla principal

```typescript
// Inside app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
    { 
        path: '', redirectTo: 'auth/login', pathMatch: 'full' 
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES)
    },
    {
        path: 'products',
        loadChildren: () => import('./products/products.routes').then(m => m.PRODUCTS_ROUTES)
    },
    {
        path: 'sales',
        loadChildren: () => import('./sales/sales.routes').then(m => m.SALES_ROUTES)
    },
];
```

---

## Limpiar el Contenido Automático de Angular

Cuando creas una nueva aplicación de Angular con `ng new`, Angular genera automáticamente contenido de ejemplo en el archivo `app.component.html`. Este archivo contiene todo el texto y HTML predeterminado que ves cuando ejecutas la aplicación por primera vez.

Para personalizar tu aplicación, necesitas editar este archivo:

1. **Ubicación del archivo**: `src/app/app.component.html`

2. **Qué hacer**: 
   - Abre el archivo `app.component.html`
   - Elimina todo el contenido generado automáticamente
   - Reemplázalo con tu propio código HTML

3. **Contenido básico recomendado**:

```html
<!-- src/app/app.component.html -->
<router-outlet></router-outlet>
```

El elemento `<router-outlet>` es esencial porque permite que las rutas que configuraste anteriormente funcionen correctamente. Este componente actúa como un marcador de posición donde Angular carga dinámicamente los componentes según la ruta activa.

> [!TIP]
> Si deseas agregar un navbar o elementos que aparezcan en todas las páginas, agrégalos antes o después del `<router-outlet>`:
> ```html
> <app-navbar></app-navbar>
> <router-outlet></router-outlet>
> ```

---

## Estructura de Angular

Angular organiza el código en una estructura modular que facilita el desarrollo y mantenimiento de aplicaciones. Aquí te explicamos cómo funciona usando este proyecto como ejemplo.

### Estilos Globales

El archivo `src/styles.css` contiene los estilos que se aplican a **toda la aplicación**. Cualquier CSS que escribas aquí afectará todos los componentes y páginas de tu proyecto. Es útil para:
- Fuentes globales
- Variables CSS
- Estilos de reset o normalización
- Clases utilitarias que uses en múltiples lugares

```css
/* Ejemplo en styles.css */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  background-color: #f5f5f5;
}
```

### Módulos y Componentes

Angular organiza la aplicación en **módulos** y **componentes**:

#### Módulos
Los módulos son contenedores que agrupan componentes relacionados. En este proyecto tenemos:
- **auth** - Todo lo relacionado con autenticación (login, registro)
- **products** - Gestión de productos (lista, formularios)
- **sales** - Ventas (carrito, historial)
- **shared** - Componentes compartidos (navbar, footer)

#### Componentes
Cada componente es una pieza independiente de la interfaz. Por ejemplo, en el módulo `auth` tenemos:
- `login` - Pantalla de inicio de sesión
- `register` - Pantalla de registro

### Estructura de Archivos de un Componente

Cada componente en Angular está compuesto por **4 archivos**:

```
product-list/
  ├── product-list.component.ts      # Lógica del componente (TypeScript)
  ├── product-list.component.html    # Estructura visual (HTML)
  ├── product-list.component.css     # Estilos específicos (CSS)
  └── product-list.component.spec.ts # Pruebas unitarias (Testing)
```

#### 1. `.ts` - Archivo TypeScript (Lógica)
Este es el **cerebro** del componente. Aquí defines:
- Variables y propiedades
- Métodos y funciones
- Lógica de negocio
- Llamadas a servicios

```typescript
// product-list.component.ts
export class ProductListComponent {
  products: any[] = [];
  
  constructor(private productService: ProductService) {}
  
  loadProducts() {
    this.products = this.productService.getAll();
  }
}
```

#### 2. `.html` - Archivo HTML (Estructura)
Define la **estructura visual** del componente. Aquí escribes el HTML que se mostrará en pantalla.

```html
<!-- product-list.component.html -->
<div class="product-container">
  <h1>Lista de Productos</h1>
  <div *ngFor="let product of products">
    <p>{{ product.name }}</p>
  </div>
</div>
```

#### 3. `.css` - Archivo CSS (Estilos)
Contiene los **estilos específicos** de este componente. A diferencia de `styles.css`, estos estilos solo afectan a este componente.

```css
/* product-list.component.css */
.product-container {
  padding: 20px;
  background: white;
  border-radius: 8px;
}

h1 {
  color: #333;
  font-size: 24px;
}
```

#### 4. `.spec.ts` - Archivo de Testing (NO se edita normalmente)
Este archivo es para **pruebas unitarias**. Solo lo editarás si estás escribiendo tests para tu aplicación. Para el desarrollo normal de la aplicación, **puedes ignorar este archivo**.

```typescript
// product-list.component.spec.ts
// Este archivo NO se edita en desarrollo normal
// Solo se usa para testing automatizado
```

### Flujo de Trabajo

Cuando trabajas en un componente, típicamente:

1. **Editas `.ts`** - Agregas la lógica y funcionalidad
2. **Editas `.html`** - Diseñas la estructura visual
3. **Editas `.css`** - Aplicas estilos al componente
4. **Ignoras `.spec.ts`** - A menos que estés escribiendo pruebas

### Secciones del Proyecto

Este proyecto está organizado en las siguientes secciones:

- **`src/app/auth/`** - Autenticación de usuarios
  - `login/` - Componente de inicio de sesión
  - `register/` - Componente de registro

- **`src/app/products/`** - Gestión de productos
  - `product-list/` - Lista de productos disponibles

- **`src/app/sales/`** - Gestión de ventas
  - `cart/` - Carrito de compras
  - `sales-history/` - Historial de ventas

- **`src/app/shared/`** - Componentes compartidos
  - `navbar/` - Barra de navegación

> [!NOTE]
> Cada carpeta de componente sigue la misma estructura de 4 archivos (.ts, .html, .css, .spec.ts), lo que hace que el proyecto sea consistente y fácil de navegar.
