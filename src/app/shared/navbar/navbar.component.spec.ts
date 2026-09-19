import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { NavbarComponent } from './navbar.component';
import { testProviders } from '../../testing/firebase-testing';
import { AuthService } from '../../auth/auth.service';
import { CartService } from '../../sales/cart.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'register', 'getCurrentUser']);
    authServiceSpy.getCurrentUser.and.returnValue(of(null));

    const cartServiceSpy = jasmine.createSpyObj('CartService', ['getCartItems', 'getTotalUnits']);
    cartServiceSpy.getCartItems.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        ...testProviders,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: CartService, useValue: cartServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
