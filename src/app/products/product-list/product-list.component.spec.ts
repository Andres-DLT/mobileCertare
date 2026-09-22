import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BehaviorSubject, NEVER, of, throwError } from 'rxjs';
import { User } from '@angular/fire/auth';
import { ProductListComponent } from './product-list.component';
import { ProductService, Product } from '../product-services';
import { CartService } from '../../sales/cart.service';
import { AuthService } from '../../auth/auth.service';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let user: BehaviorSubject<User | null>;
  const product: Product = {
    id: '1', title: 'API Testing', description: 'Contract tests', price: 100,
    category: 'api', 'image-front': '', 'image-back': ''
  };

  beforeEach(async () => {
    user = new BehaviorSubject<User | null>(null);
    productService = jasmine.createSpyObj('ProductService', ['getProducts']);
    productService.getProducts.and.returnValue(of([product]));
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

  it('replaces the skeleton with Firestore services', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.skeleton')).toBeNull();
    expect(fixture.nativeElement.querySelector('.service-info h4').textContent).toContain('API Testing');
  });

  it('shows a permissions error and recovers when retry succeeds', () => {
    spyOn(console, 'error');
    productService.getProducts.and.returnValue(throwError(() => ({ code: 'permission-denied' })));
    fixture.detectChanges();
    expect(component.loading).toBeFalse();
    expect(fixture.nativeElement.querySelector('[role="alert"]')).not.toBeNull();
    productService.getProducts.and.returnValue(of([product]));
    fixture.nativeElement.querySelector('[role="alert"] button').click();
    fixture.detectChanges();
    expect(component.loadError).toBe('');
    expect(component.products).toEqual([product]);
  });

  it('stops the skeleton if the backend never responds', fakeAsync(() => {
    spyOn(console, 'error');
    productService.getProducts.and.returnValue(NEVER);
    fixture.detectChanges();
    tick(15000);
    fixture.detectChanges();
    expect(component.loading).toBeFalse();
    expect(component.loadError).toContain('tardó demasiado');
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
    component.onAddToCart(product);
    component.onAddToCart(product);
    expect(cart.getTotalUnits()).toBe(2);
    component.undoLast();
    expect(cart.getTotalUnits()).toBe(1);
    expect(cart.getTotalCost()).toBe(100);
  });
});
