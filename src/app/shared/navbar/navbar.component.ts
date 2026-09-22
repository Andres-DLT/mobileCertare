import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule, RouterLinkActive, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import { CartService } from '../../sales/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  hasCheckedLogin = false;
  menuOpen = false;
  initials = 'S';
  cartCount = 0;
  onAuth = false;
  private subs = new Subscription();

  constructor(
    private router: Router,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.onAuth = this.router.url.startsWith('/auth');
    this.subs.add(this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        this.onAuth = e.urlAfterRedirects.startsWith('/auth');
      }));

    this.subs.add(this.authService.getCurrentUser().subscribe(user => {
      this.isLoggedIn = !!user;
      this.hasCheckedLogin = true;
      this.initials = this.computeInitials(user?.displayName);
    }));

    this.subs.add(this.cartService.getCartItems().subscribe(items => {
      this.cartCount = items.reduce((acc, i) => acc + i.units, 0);
    }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private computeInitials(displayName?: string | null): string {
    const parts = displayName?.trim().split(/\s+/).filter(Boolean) ?? [];
    if (!parts.length) return 'C';
    return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
  }

  logout(): void {
    this.authService.logout();
    this.menuOpen = false;
  }

  /** Brand logo always lands somewhere useful, even if a routerLink misfires. */
  goHome(): void {
    this.menuOpen = false;
    const target = this.isLoggedIn ? '/products/list' : '/auth/login';
    this.router.navigate([target]).catch(() => {
      window.location.assign(target);
    });
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}
