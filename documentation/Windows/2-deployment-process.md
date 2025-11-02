# App Design

## Create Angular Workspace

```sh
ng new marketplace
```

## Create App Modules

```sh
# Module Auth Generation
ng g module auth --routing
```

```sh
# Module Products Generation
ng g module products --routing
```

```sh
# Module Sales Generation
ng g module sales --routing
```

```sh
# Module Shared Generation
# Shared resource in every Module and Component
ng g module shared
```

### Create components inner every module

```sh
#
# Authentication Components generation inner Auth Module
# auth -> login
# auth -> register
# 
ng g component auth/login
ng g component auth/register
```

```sh
#
# Products Components generation inner Products Module
# products -> product-list
# products -> product-form
# 
ng g component products/product-list
ng g component products/product-form
```

```sh
#
# Sales Components generation inner Sales Module
# sales -> cart
# sales -> sales-history
# 
ng g component sales/cart
ng g component sales/sales-history
```

```sh
#
# Authentication components generation inner Auth Module
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

## Configure the Routes

```typescript
// Inside app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [

    { 
        path: '', redirectTo: 'auth/login', pathMatch: 'full' 
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'products',
        loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
    },
    {
        path: 'sales',
        loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule)
    },
];
```
