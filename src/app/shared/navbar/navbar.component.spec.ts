import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
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

  it('sends the logo home depending on session', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate').and.resolveTo(true);
    component.isLoggedIn = false;
    component.goHome();
    expect(navigateSpy).toHaveBeenCalledWith(['/auth/login']);
    component.isLoggedIn = true;
    component.menuOpen = true;
    component.goHome();
    expect(navigateSpy).toHaveBeenCalledWith(['/products/list']);
    expect(component.menuOpen).toBeFalse();
  });
});
