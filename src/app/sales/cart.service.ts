import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CatalogItem } from '../products/product-services';

export interface CartItem extends CatalogItem {
  units: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private items$ = new BehaviorSubject<CartItem[]>([]);

  /** Observable to subscribe from components */
  getCartItems(): Observable<CartItem[]> {
    return this.items$.asObservable();
  }

  /** Adds a product to the interest list (same id sums units) */
  addToCart(p: CatalogItem) {
    const list = this.snapshot();
    const idx = list.findIndex(i => i.id === p.id);
    if (idx > -1) {
      list[idx].units += 1;
    } else {
      list.push({ ...p, units: 1 });
    }
    this.items$.next(list);
  }

  /** Current snapshot (for undo) */
  snapshot(): CartItem[] {
    return this.items$.value.map(item => ({ ...item }));
  }

  /** Restores a previous state (undo) */
  restore(list: CartItem[]) {
    this.items$.next(list.map(item => ({ ...item })));
  }

  /** Removes one unit (removes the item at 0) */
  removeUnit(item: CartItem) {
    const list = this.snapshot();
    const idx = list.findIndex(i => i.id === item.id);
    if (idx > -1) {
      list[idx].units -= 1;
      if (list[idx].units <= 0) {
        list.splice(idx, 1);
      }
      this.items$.next(list);
    }
  }

  /** Adds one extra unit */
  addUnit(item: CartItem) {
    const list = this.snapshot();
    const idx = list.findIndex(i => i.id === item.id);
    if (idx > -1) {
      list[idx].units += 1;
      this.items$.next(list);
    }
  }

  /** Clears the whole list */
  clearCart() {
    this.items$.next([]);
  }

  /** Totals */
  getTotalUnits(): number {
    return this.items$.value.reduce((sum, i) => sum + i.units, 0);
  }
  getTotalCost(): number {
    return this.items$.value.reduce((sum, i) => sum + i.units * (i.price ?? 0), 0);
  }
}
