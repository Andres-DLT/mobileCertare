import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Product, ProductService } from '../product-services';
import { CartService, CartItem } from '../../sales/cart.service';

interface Category {
  key: string;
  label: string;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  userLabel = '';
  filter = 'all';
  private lastSnapshot: CartItem[] = [];

  snackbarMessage = '';
  snackbarVisible = false;
  private snackbarTimer: number | undefined;
  private undoCallback: (() => void) | undefined;

  categories: Category[] = [
    { key: 'all', label: 'All' },
    { key: 'manual', label: 'Manual' },
    { key: 'automation', label: 'Automation' },
    { key: 'api', label: 'API' },
    { key: 'performance', label: 'Performance' },
    { key: 'cicd', label: 'CI/CD' },
    { key: 'consulting', label: 'Consulting' },
  ];

  readonly skeletonItems = [0, 1, 2, 3, 4, 5];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.loading = false;
    });

    try {
      const raw = localStorage.getItem('user');
      if (raw) {
        const parsed = JSON.parse(raw);
        const name = parsed?.displayName || parsed?.email?.split('@')[0] || '';
        this.userLabel = name
          .replace(/[._-]+/g, ' ')
          .replace(/\b\w/g, (c: string) => c.toUpperCase());
      }
    } catch {
      this.userLabel = '';
    }
  }

  get filteredProducts(): Product[] {
    if (this.filter === 'all') return this.products;
    return this.products.filter(p => p.category === this.filter);
  }

  categoryLabel(p: Product): string {
    const cat = this.categories.find(c => c.key === p.category);
    return cat?.label ?? 'Service';
  }

  onAddToCart(p: Product): void {
    if (Capacitor.isNativePlatform()) {
      Haptics.impact({ style: ImpactStyle.Medium });
    }

    this.snackbarMessage = `${p.title} Â· $${p.price.toLocaleString()} MXN added`;
    this.snackbarVisible = true;
    this.undoCallback = () => this.cartService.restore(this.lastSnapshot);
  }

  private showSnackbar(message: string, onUndo: () => void): void {
    this.snackbarMessage = message;
    this.snackbarVisible = true;
    this.undoCallback = onUndo;

    if (this.snackbarTimer) clearTimeout(this.snackbarTimer);
    this.snackbarTimer = window.setTimeout(() => this.hideSnackbar(), 4000);
  }

  undoLast(): void {
    if (this.undoCallback) this.undoCallback();
    this.hideSnackbar();
  }

  private hideSnackbar(): void {
    this.snackbarVisible = false;
    this.undoCallback = undefined;
    if (this.snackbarTimer) {
      clearTimeout(this.snackbarTimer);
      this.snackbarTimer = undefined;
    }
  }

  setFilter(key: string) {
    this.filter = key;
  }
}
