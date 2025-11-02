import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService, Product } from '../product-services';
import { CartService } from '../../sales/cart.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit  {
  products: Product[] = [];
  selectedSizes: { [productId: string]: string } = {}; // Size Mapping
  cartCount$!: Observable<number>;    

  // Toast Message and Flag
  toastMessage = '';
  showToast = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
    this.cartCount$ = this.cartService
    .getCartItems()
    .pipe(map(items => items.reduce((acc, i) => acc + i.units, 0)));
  }

  onAddToCart(product: Product, size: string): void {
    this.cartService.addToCart(product, size);
    // opcional: mostrar un toast o console.log
    this.toast(`✓ ${product.title} (talla ${size}) añadido al carrito`);
    console.log(`Añadido al carrito:`, product.title, `talla`, size);
  }

  // Toast Notification Method
  private toast(msg: string) {
    this.toastMessage = msg;
    this.showToast = true;
    setTimeout(() => this.showToast = false, 3000);
  }
}
