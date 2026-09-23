import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ServiceDetailComponent } from './service-detail.component';
import { CatalogItem, ProductService } from '../product-services';
import { CartService } from '../../sales/cart.service';

describe('Service detail', () => {
  const service: CatalogItem = {
    id: 'ios-development', title: 'iOS Development', description: 'Native applications.',
    sector: 'mobile', sectorLabel: 'Mobile', group: 'Development', price: 35000,
    deliverables: ['Code repository'],
  };

  it('resolves a service by sector and document id and preserves the shortlist flow', async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceDetailComponent, RouterTestingModule],
      providers: [
        { provide: ProductService, useValue: { getService: () => of(service), getCollection: () => of([service]) } },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ sector: 'mobile', id: 'ios-development' }) } } },
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(ServiceDetailComponent);
    fixture.detectChanges();
    const root: HTMLElement = fixture.nativeElement;
    expect(root.querySelector('h1')?.textContent).toBe('iOS Development');
    expect(root.textContent).toContain('Code repository');
    expect(root.textContent).toContain('From $35,000 MXN');
    (root.querySelector('.detail-add') as HTMLButtonElement).click();
    expect(TestBed.inject(CartService).getTotalUnits()).toBe(1);
  });
});
