import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
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
      imports: [ProductListComponent],
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
    expect(fixture.nativeElement.querySelector('.service-info h4').textContent).toContain('API Testing');
  });

  it('filters by sector and then by group', () => {
    fixture.detectChanges();
    component.setSector('mobile');
    fixture.detectChanges();
    expect(component.filteredProducts).toEqual([mobileItem]);
    expect(fixture.nativeElement.querySelector('.service-info h4').textContent).toContain('iOS Development');
    component.setSector('all');
    component.setFilter('api');
    expect(component.filteredProducts).toEqual([testingItem]);
  });

  it('shows a permissions error and recovers when retry succeeds', () => {
    spyOn(console, 'error');
    productService.getCatalog.and.returnValue(throwError(() => ({ code: 'permission-denied' })));
    fixture.detectChanges();
    expect(component.loading).toBeFalse();
    expect(fixture.nativeElement.querySelector('[role="alert"]')).not.toBeNull();
    productService.getCatalog.and.returnValue(of([testingItem]));
    fixture.nativeElement.querySelector('[role="alert"] button').click();
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

  it('reacts to the actual profile name and never derives it from email', () => {
    fixture.detectChanges();
    user.next({ displayName: 'Andres', email: 'a.dlt.g@example.com' } as User);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.user-header h1').textContent).toBe('Andres');
    user.next({ displayName: null, email: 'a.dlt.g@example.com' } as User);
    expect(component.userLabel).toBe('');
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
