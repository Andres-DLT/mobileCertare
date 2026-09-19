import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { testProviders } from './testing/firebase-testing';
import { AuthService } from './auth/auth.service';
import { CartService } from './sales/cart.service';
import { Auth } from '@angular/fire/auth';

describe('AppComponent', () => {
  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'register', 'getCurrentUser', 'logout']);
    authServiceSpy.getCurrentUser.and.returnValue(of(null));

    const cartServiceSpy = jasmine.createSpyObj('CartService', ['getCartItems']);
    cartServiceSpy.getCartItems.and.returnValue(of([]));

    const authSpy = jasmine.createSpyObj('Auth', ['signOut']);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        ...testProviders,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: CartService, useValue: cartServiceSpy },
        { provide: Auth, useValue: authSpy }
      ]
    })
    .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'certare' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('certare');
  });

  it('should render the navbar', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-navbar')).toBeTruthy();
  });
});