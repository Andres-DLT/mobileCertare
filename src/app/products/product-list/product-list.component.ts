import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { ProductService, Product } from '../product-services';
import { CartService, CartItem } from '../../sales/cart.service';

interface Plan {
  label: string;
  price: number;
}

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

  selectedPlans: { [id: string]: string } = {};

  snackbarMessage = '';
  snackbarVisible = false;
  private snackbarTimer: number | undefined;
  private undoCallback: (() => void) | undefined;
  private lastSnapshot: CartItem[] = [];

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

  plansFor(p: Product): Plan[] {
    return [
      { label: p.size_s, price: p.price_s },
      { label: p.size_m, price: p.price_m },
      { label: p.size_l, price: p.price_l },
    ];
  }

  selectedPrice(p: Product): number {
    const label = this.selectedPlans[p.id];
    const plan = this.plansFor(p).find(pl => pl.label === label);
    return plan?.price ?? p.price;
  }

  categoryLabel(p: Product): string {
    const cat = this.categories.find(c => c.key === p.category);
    return cat?.label ?? 'Service';
  }

  selectPlan(p: Product, label: string) {
    this.selectedPlans[p.id] = label;
  }

  onAddToCart(p: Product): void {
    const plan = this.selectedPlans[p.id] || p.size_m || p.size_s;
    const price = this.selectedPrice(p);

    this.lastSnapshot = this.cartService.snapshot();
    this.cartService.addToCart(p, plan, price);

    if (Capacitor.isNativePlatform()) {
      Haptics.impact({ style: ImpactStyle.Medium });
    }

    this.showSnackbar(`${p.title} · ${plan} added`, () => {
      this.cartService.restore(this.lastSnapshot);
    });
  }

  setFilter(key: string) {
    this.filter = key;
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
}