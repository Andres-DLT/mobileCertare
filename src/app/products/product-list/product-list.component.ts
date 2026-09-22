import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Subscription, timeout, TimeoutError } from 'rxjs';
import { CatalogItem, CatalogSector, CATALOG_SECTORS, ProductService } from '../product-services';
import { CartService, CartItem } from '../../sales/cart.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: CatalogItem[] = [];
  loading = true;
  loadError = '';
  userLabel = '';
  sector: CatalogSector | 'all' = 'all';
  filter = 'all';
  sectors = CATALOG_SECTORS;
  private lastSnapshot: CartItem[] = [];
  private subs = new Subscription();
  private productsSubscription?: Subscription;

  snackbarMessage = '';
  snackbarVisible = false;
  private snackbarTimer: number | undefined;
  private undoCallback: (() => void) | undefined;

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
    this.productsSubscription = this.productService.getCatalog()
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
            this.loadError = 'Loading took too long. Check your connection and retry.';
          } else if (e?.code === 'permission-denied' || e?.message?.includes('permissions')) {
            this.loadError =
              'Could not access the catalog. Try again later.';
          } else if (e?.code === 'unavailable' || e?.message?.includes('offline')) {
            this.loadError = 'No connection to Firestore. Check your network and retry.';
          } else {
            this.loadError = `Could not load the catalog (${e?.code || e?.message || 'unknown error'}).`;
          }
          console.error('[ProductList] loadProducts failed:', err);
        },
      });
  }

  retry() {
    this.loadProducts();
  }

  /** Items in the selected sector (or everything). */
  get sectorProducts(): CatalogItem[] {
    if (this.sector === 'all') return this.products;
    return this.products.filter((p) => p.sector === this.sector);
  }

  /** Category/phase chips available in the selected sector. */
  get categories(): { key: string; label: string }[] {
    const groups = [...new Set(this.sectorProducts.map((p) => p.group))].sort();
    return [{ key: 'all', label: 'All' }, ...groups.map((g) => ({ key: g, label: g }))];
  }

  get filteredProducts(): CatalogItem[] {
    if (this.filter === 'all') return this.sectorProducts;
    return this.sectorProducts.filter((p) => p.group === this.filter);
  }

  categoryLabel(p: CatalogItem): string {
    return p.group || 'Service';
  }

  priceLabel(p: CatalogItem): string {
    return p.price == null ? 'Custom quote' : `$${p.price.toLocaleString()} MXN`;
  }

  onAddToCart(p: CatalogItem): void {
    if (Capacitor.isNativePlatform()) {
      Haptics.impact({ style: ImpactStyle.Medium }).catch(() => { /* Optional feedback. */ });
    }

    // Snapshot for Undo, then actually add to the interest list.
    this.lastSnapshot = this.cartService.snapshot();
    this.cartService.addToCart(p);

    this.showSnackbar(
      `${p.title} · ${this.priceLabel(p)} added`,
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

  setSector(key: CatalogSector | 'all') {
    this.sector = key;
    this.filter = 'all';
  }

  setFilter(key: string) {
    this.filter = key;
  }
}
