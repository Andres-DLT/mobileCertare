import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Subscription, timeout, TimeoutError } from 'rxjs';
import { Product, ProductService } from '../product-services';
import { CartService, CartItem } from '../../sales/cart.service';
import { AuthService } from '../../auth/auth.service';

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
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  loading = true;
  loadError = '';
  userLabel = '';
  filter = 'all';
  private lastSnapshot: CartItem[] = [];
  private subs = new Subscription();
  private productsSubscription?: Subscription;

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
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadProducts();

    this.subs.add(
      this.authService.getCurrentUser().subscribe((user) => {
        this.userLabel = user?.displayName?.trim() || '';
      })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    this.productsSubscription?.unsubscribe();
    if (this.snackbarTimer) clearTimeout(this.snackbarTimer);
  }

  loadProducts() {
    this.productsSubscription?.unsubscribe();
    this.loading = true;
    this.loadError = '';
    this.productsSubscription = this.productService.getProducts()
      .pipe(timeout({ first: 15000 }))
      .subscribe({
        next: (data) => {
          this.products = data ?? [];
          this.loading = false;
        },
        error: (err: unknown) => {
          this.products = [];
          this.loading = false;
          const e = err as { code?: string; message?: string };
          if (err instanceof TimeoutError) {
            this.loadError = 'La carga tardó demasiado. Revisa tu conexión e inténtalo de nuevo.';
          } else if (e?.code === 'permission-denied' || e?.message?.includes('permissions')) {
            this.loadError =
              'No se pudo acceder al catálogo. Inténtalo de nuevo más tarde.';
          } else if (e?.code === 'unavailable' || e?.message?.includes('offline')) {
            this.loadError = 'Sin conexión con Firestore. Revisa tu red e inténtalo de nuevo.';
          } else {
            this.loadError = `No se pudieron cargar los productos (${e?.code || e?.message || 'error desconocido'}).`;
          }
          console.error('[ProductList] loadProducts falló:', err);
        },
      });
  }

  retry() {
    this.loadProducts();
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
      Haptics.impact({ style: ImpactStyle.Medium }).catch(() => { /* Optional feedback. */ });
    }

    // Guardar snapshot para Undo y agregar de verdad al carrito
    this.lastSnapshot = this.cartService.snapshot();
    this.cartService.addToCart(p);

    this.showSnackbar(
      `${p.title} · $${p.price.toLocaleString()} MXN added`,
      () => this.cartService.restore(this.lastSnapshot)
    );
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
