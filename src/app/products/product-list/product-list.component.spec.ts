import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { ProductListComponent } from './product-list.component';
import { ProductService, Product } from '../product-services';
import { CartService, CartItem } from '../../sales/cart.service';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productsSubject: BehaviorSubject<Product[]>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;

  beforeEach(async () => {
    productsSubject = new BehaviorSubject<Product[]>([]);

    productServiceSpy = jasmine.createSpyObj('ProductService', ['getProducts']);
    productServiceSpy.getProducts.and.returnValue(productsSubject.asObservable());

    cartServiceSpy = jasmine.createSpyObj('CartService', [
      'add', 'restore'
    ]);
    cartServiceSpy.restore.and.returnValue(undefined);

    await TestBed.configureTestingModule({
      imports: [ProductListComponent],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: CartService, useValue: cartServiceSpy },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
