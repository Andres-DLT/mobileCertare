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
  private routerSub: Subscription | undefined;

  constructor(
    private router: Router,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.onAuth = this.router.url.startsWith('/auth');
    this.routerSub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        this.onAuth = e.urlAfterRedirects.startsWith('/auth');
      });

    this.authService.getCurrentUser().subscribe(user => {
      this.isLoggedIn = !!user;
      this.hasCheckedLogin = true;
    });

    this.cartService.getCartItems().subscribe(items => {
      this.cartCount = items.reduce((acc, i) => acc + i.units, 0);
    });

    this.initials = this.computeInitials();
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  private computeInitials(): string {
    try {
      const raw = localStorage.getItem('user');
      if (!raw) return 'S';
      const parsed = JSON.parse(raw);
      const fullName = parsed?.displayName as string | undefined;
      if (fullName && fullName.trim()) {
        const nameParts = fullName.trim().split(/\s+/).filter(Boolean);
        if (nameParts.length >= 2) {
          return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
        }
        return nameParts[0]?.charAt(0).toUpperCase() || 'S';
      }
      const email = parsed?.email as string | undefined;
      if (!email) return 'S';
      const local = email.split('@')[0];
      const parts = local.split(/[._-]+/).filter(Boolean);
      if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return parts[0]?.charAt(0).toUpperCase() || 'S';
    } catch {
      return 'S';
    }
  }

  logout(): void {
    this.authService.logout();
    this.menuOpen = false;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}