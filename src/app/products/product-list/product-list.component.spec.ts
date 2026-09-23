import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, NEVER, of, throwError } from 'rxjs';
import { User } from '@angular/fire/auth';
import { ProductListComponent } from './product-list.component';
import { ProductService, CatalogItem } from '../product-services';
import { CartService } from '../../sales/cart.service';
import { AuthService } from '../../auth/auth.service';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let user: BehaviorSubject<User | null>;
  const testingItem: CatalogItem = {
    id: '1', title: 'API Testing', description: 'Contract tests', price: 100,
    group: 'api', sector: 'testing', sectorLabel: 'Testing',
  };
  const mobileItem: CatalogItem = {
    id: '2', title: 'iOS Development', description: 'Native apps', price: 35000,
    group: 'Development', sector: 'mobile', sectorLabel: 'Mobile',
  };

  beforeEach(async () => {
    user = new BehaviorSubject<User | null>(null);
    productService = jasmine.createSpyObj('ProductService', ['getProducts', 'getCatalog']);
    productService.getCatalog.and.returnValue(of([testingItem, mobileItem]));
    await TestBed.configureTestingModule({
      imports: [ProductListComponent, RouterTestingModule],
      providers: [
        { provide: ProductService, useValue: productService },
        { provide: AuthService, useValue: { getCurrentUser: () => user.asObservable() } },
        CartService,
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  it('replaces the skeleton with the unified catalog', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.skeleton')).toBeNull();
    expect(fixture.nativeElement.textContent).toContain('API Testing');
    expect(fixture.nativeElement.textContent).toContain('iOS Development');
  });

  it('filters by sector, then group, then search', () => {
    fixture.detectChanges();
    component.onSelectionChange({ sector: 'mobile', group: 'all' });
    expect(component.filteredProducts).toEqual([mobileItem]);
    component.onSelectionChange({ sector: 'all', group: 'all' });
    component.onSelectionChange({ sector: 'all', group: 'api' });
    expect(component.filteredProducts).toEqual([testingItem]);
    component.onSelectionChange({ sector: 'all', group: 'all' });
    component.search = 'ios';
    expect(component.filteredProducts).toEqual([mobileItem]);
  });

  it('sorts by price without mutating the source order', () => {
    fixture.detectChanges();
    component.sort = 'price-desc';
    expect(component.filteredProducts.map((p) => p.id)).toEqual(['2', '1']);
    expect(component.products.map((p) => p.id)).toEqual(['1', '2']);
  });

  it('shows a permissions error and recovers when retry succeeds', () => {
    spyOn(console, 'error');
    productService.getCatalog.and.returnValue(throwError(() => ({ code: 'permission-denied' })));
    fixture.detectChanges();
    expect(component.loading).toBeFalse();
    expect(fixture.nativeElement.textContent).toContain('Could not access the catalog');
    productService.getCatalog.and.returnValue(of([testingItem]));
    fixture.nativeElement.querySelector('cx-empty-state button').click();
    fixture.detectChanges();
    expect(component.loadError).toBe('');
    expect(component.products).toEqual([testingItem]);
  });

  it('stops the skeleton if the backend never responds', fakeAsync(() => {
    spyOn(console, 'error');
    productService.getCatalog.and.returnValue(NEVER);
    fixture.detectChanges();
    tick(15000);
    fixture.detectChanges();
    expect(component.loading).toBeFalse();
    expect(component.loadError).toContain('took too long');
  }));

  it('reacts to the actual profile name', () => {
    fixture.detectChanges();
    user.next({ displayName: 'Andres', email: 'a.dlt.g@example.com' } as User);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.user-header h1').textContent).toBe('Andres');
  });

  it('undoes a repeated addition without corrupting previous quantities', () => {
    fixture.detectChanges();
    const cart = TestBed.inject(CartService);
    component.onAddToCart(testingItem);
    component.onAddToCart(testingItem);
    expect(cart.getTotalUnits()).toBe(2);
    component.undoLast();
    expect(cart.getTotalUnits()).toBe(1);
    expect(cart.getTotalCost()).toBe(100);
  });
});
