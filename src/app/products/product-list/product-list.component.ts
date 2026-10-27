import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, timeout, TimeoutError } from 'rxjs';
import { CatalogItem, CatalogSector, ProductService } from '../product-services';
import { AuthService } from '../../auth/auth.service';
import { SeoService } from '../../shared/seo.service';
import { CxHeroComponent } from '../../shared/ui/cx-hero.component';
import { CxCardComponent } from '../../shared/ui/cx-card.component';
import { CxFilterBarComponent } from '../../shared/ui/cx-filter-bar.component';
import { CxEmptyStateComponent } from '../../shared/ui/cx-empty-state.component';
import { CxCtaSectionComponent } from '../../shared/ui/cx-cta-section.component';
import { COLLECTIONS } from '../../collections/collection-config';

type SortKey = 'relevance' | 'title';

const SORT_OPTIONS = [
  { key: 'relevance', label: 'Sort: relevance' },
  { key: 'title', label: 'Title: A to Z' },
];

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    CxHeroComponent,
    CxCardComponent,
    CxFilterBarComponent,
    CxEmptyStateComponent,
    CxCtaSectionComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: CatalogItem[] = [];
  loading = true;
  loadError = '';
  userLabel = '';
  selection: Record<string, string> = { sector: 'all', group: 'all' };
  search = '';
  sort: SortKey = 'relevance';
  sortOptions = SORT_OPTIONS;
  private subs = new Subscription();
  private productsSubscription?: Subscription;

  readonly skeletonItems = [0, 1, 2, 3, 4, 5];

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private seo: SeoService
  ) {}

  ngOnInit() {
    this.seo.setPage({
      title: 'Services',
      description: 'Browse 60 services across testing, mobile, web, AI and training. Explore the scope and discuss your project with us.',
      path: '/products/list',
    });
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

  get sector(): CatalogSector | 'all' {
    return (this.selection['sector'] as CatalogSector | 'all') ?? 'all';
  }

  get sectorCounts(): Record<string, number> {
    const counts: Record<string, number> = { all: this.products.length };
    for (const item of this.products) counts[item.sector] = (counts[item.sector] ?? 0) + 1;
    return counts;
  }

  get sectorGroups(): { key: string; label: string; options: { key: string; label: string; count: number }[] }[] {
    const defs = [{ key: 'all', label: 'All' }, ...COLLECTIONS.map(({ key, label }) => ({ key, label }))];
    return [
      {
        key: 'sector',
        label: 'Practice',
        options: defs.map((d) => ({
          ...d,
          count: d.key === 'all' ? this.products.length : this.sectorCounts[d.key] ?? 0,
        })),
      },
    ];
  }

  get advancedGroups(): { key: string; label: string; options: { key: string; label: string; count: number }[] }[] {
    const inSector =
      this.sector === 'all' ? this.products : this.products.filter((p) => p.sector === this.sector);
    const groups = [...new Set(inSector.map((p) => p.group))].sort();
    return [
      {
        key: 'group',
        label: this.sector === 'all' ? 'Category' : 'Stage',
        options: [
          { key: 'all', label: 'All', count: inSector.length },
          ...groups.map((g) => ({
            key: g,
            label: g,
            count: inSector.filter((p) => p.group === g).length,
          })),
        ],
      },
    ];
  }

  get filteredProducts(): CatalogItem[] {
    const query = this.search.trim().toLowerCase();
    let items = this.products;
    if (this.sector !== 'all') items = items.filter((p) => p.sector === this.sector);
    const group = this.selection['group'] ?? 'all';
    if (group !== 'all') items = items.filter((p) => p.group === group);
    if (query) {
      items = items.filter((p) =>
        [p.title, p.description, p.group, p.sectorLabel, ...(p.tags ?? [])]
          .join(' ')
          .toLowerCase()
          .includes(query)
      );
    }
    const sorted = [...items];
    if (this.sort === 'title') sorted.sort((a, b) => a.title.localeCompare(b.title));
    return sorted;
  }

  get heroStats(): { value: string; label: string }[] {
    return [
      { value: this.loading ? '…' : String(this.products.length), label: 'Services' },
      { value: String(COLLECTIONS.length), label: 'Practices' },
    ];
  }

  onSelectionChange(selection: Record<string, string>): void {
    const previousSector = this.selection['sector'];
    this.selection = selection;
    if (selection['sector'] !== previousSector) {
      this.selection = { ...selection, group: 'all' };
    }
  }

  clearFilters(): void {
    this.selection = { sector: 'all', group: 'all' };
    this.search = '';
    this.sort = 'relevance';
  }

  serviceLink(item: CatalogItem): string {
    return `/products/${item.sector}/${encodeURIComponent(item.id)}`;
  }

  onSort(value: string): void {
    if (value === 'title' || value === 'relevance') {
      this.sort = value;
    }
  }

}
