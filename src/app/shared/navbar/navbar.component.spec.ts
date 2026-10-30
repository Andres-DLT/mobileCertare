import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { NavbarComponent } from './navbar.component';
import { testProviders } from '../../testing/firebase-testing';
import { AuthService } from '../../auth/auth.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'register', 'getCurrentUser']);
    authServiceSpy.getCurrentUser.and.returnValue(of(null));

    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        ...testProviders,
        { provide: AuthService, useValue: authServiceSpy }
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

  it('keeps the public navigation available without an account', () => {
    const brand: HTMLAnchorElement = fixture.nativeElement.querySelector('.navbar-brand');
    expect(brand.getAttribute('href')).toBe('/');
    const routes = [...fixture.nativeElement.querySelectorAll('#primary-navigation a')]
      .map((link: HTMLAnchorElement) => link.getAttribute('href'));
    expect(routes).toContain('/products/list');
    expect(routes).toContain('/agency/schedule');
    expect(routes).not.toContain('/sales/history');
    const allRoutes = [...fixture.nativeElement.querySelectorAll('a')].map((link: HTMLAnchorElement) => link.getAttribute('href'));
    expect(allRoutes).not.toContain('/sales/cart');
  });

  it('offers a single mobile navigation with a path to contact', () => {
    expect(fixture.nativeElement.querySelector('.public-menu-trigger')).toBeNull();
    const bottomRoutes = [...fixture.nativeElement.querySelectorAll('.bottom-nav a')]
      .map((link: HTMLAnchorElement) => link.getAttribute('href'));
    expect(bottomRoutes).toEqual(['/', '/products/list', '/agency/about', '/agency/schedule']);
    expect(fixture.nativeElement.querySelectorAll('.nav-cta').length).toBe(1);
  });
});
