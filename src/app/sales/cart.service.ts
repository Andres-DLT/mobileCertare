import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../products/product-services';

export interface CartItem extends Product {
  units: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private items$ = new BehaviorSubject<CartItem[]>([]);

  /** Observable para suscribirse desde el componente */
  getCartItems(): Observable<CartItem[]> {
    return this.items$.asObservable();
  }

  /** Agrega un producto al carrito (si ya existe mismo id, suma unidades) */
  addToCart(p: Product, planPrice?: number) {
    const list = this.items$.value.slice();
    const idx = list.findIndex(i => i.id === p.id);
    if (idx > -1) {
      list[idx].units += 1;
      if (planPrice != null) list[idx].price = planPrice;
    } else {
      list.push({ ...p, units: 1, price: planPrice ?? p.price });
    }
    this.items$.next(list);
  }

  /** Snapshot actual del carrito (para undo) */
  snapshot(): CartItem[] {
    return this.items$.value.slice();
  }

  /** Restaura un estado anterior del carrito (undo) */
  restore(list: CartItem[]) {
    this.items$.next(list.slice());
  }

  /** Quita una unidad (si llega a 0, lo elimina) */
  removeUnit(item: CartItem) {
    const list = this.items$.value.slice();
    const idx = list.findIndex(i => i.id === item.id);
    if (idx > -1) {
      list[idx].units -= 1;
      if (list[idx].units <= 0) {
        list.splice(idx, 1);
      }
      this.items$.next(list);
    }
  }

  /** Agrega una unidad extra */
  addUnit(item: CartItem) {
    const list = this.items$.value.slice();
    const idx = list.findIndex(i => i.id === item.id);
    if (idx > -1) {
      list[idx].units += 1;
      this.items$.next(list);
    }
  }

  /** Borra todo el carrito */
  clearCart() {
    this.items$.next([]);
  }

  /** Calcula totales */
  getTotalUnits(): number {
    return this.items$.value.reduce((sum, i) => sum + i.units, 0);
  }
  getTotalCost(): number {
    return this.items$.value.reduce((sum, i) => sum + i.units * i.price, 0);
  }
}
