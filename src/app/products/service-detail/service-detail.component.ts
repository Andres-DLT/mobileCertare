import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription, timeout } from 'rxjs';
import { CatalogItem, ProductService } from '../product-services';
import { COLLECTIONS } from '../../collections/collection-config';
import { CxCardComponent } from '../../shared/ui/cx-card.component';
import { CartService } from '../../sales/cart.service';
import { SeoService } from '../../shared/seo.service';

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, CxCardComponent],
  templateUrl: './service-detail.component.html',
  styleUrl: './service-detail.component.css',
})
export class ServiceDetailComponent implements OnInit, OnDestroy {
  service?: CatalogItem;
  related: CatalogItem[] = [];
  loading = true;
  error = '';
  added = false;
  private sub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private products: ProductService,
    private cart: CartService,
    private seo: SeoService,
  ) {}

  ngOnInit(): void {
    const sector = this.route.snapshot.paramMap.get('sector');
    const id = this.route.snapshot.paramMap.get('id');
    if (!COLLECTIONS.some(c => c.key === sector) || !id) {
      this.loading = false;
      this.error = 'This service does not exist.';
      return;
    }
    this.sub = this.products.getService(sector as CatalogItem['sector'], id).pipe(timeout({ first: 15000 })).subscribe({
      next: service => {
        this.service = service ?? undefined;
        this.loading = false;
        if (this.service) {
          this.seo.setPage({
            title: this.service.title,
            description: this.service.description,
            path: `/products/${sector}/${encodeURIComponent(id)}`,
          });
        } else {
          this.error = 'This service is no longer in the catalog.';
        }
      },
      error: () => {
        this.loading = false;
        this.error = 'Could not load this service. Please try again later.';
      },
    });
    this.sub.add(this.products.getCollection(sector as CatalogItem['sector']).subscribe({
      next: items => this.related = items.filter(item => item.id !== id).slice(0, 3),
      error: () => this.related = [],
    }));
  }

  ngOnDestroy(): void { this.sub?.unsubscribe(); }

  get practiceIntro(): string {
    return COLLECTIONS.find(c => c.key === this.service?.sector)?.intro ?? '';
  }

  get priceLabel(): string {
    return this.service?.price == null ? 'Scoped to your project' : `From $${this.service.price.toLocaleString('en-US')} MXN`;
  }

  shortlist(): void {
    if (!this.service) return;
    this.cart.addToCart(this.service);
    this.added = true;
  }

  serviceLink(item: CatalogItem): string {
    return `/products/${item.sector}/${encodeURIComponent(item.id)}`;
  }
}
