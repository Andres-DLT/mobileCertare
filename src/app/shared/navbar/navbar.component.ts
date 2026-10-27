import { TranslatePipe, LanguageService } from '../language.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule, RouterLinkActive, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [TranslatePipe, CommonModule, RouterModule, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  hasCheckedLogin = false;
  menuOpen = false;
  publicMenuOpen = false;
  initials = 'S';
  onAuth = false;
  private subs = new Subscription();

  constructor(
    private router: Router,
    private authService: AuthService,
    public language: LanguageService
  ) {}

  ngOnInit(): void {
    this.onAuth = this.router.url.startsWith('/auth');
    this.subs.add(this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        this.onAuth = e.urlAfterRedirects.startsWith('/auth');
        this.publicMenuOpen = false;
      }));

    this.subs.add(this.authService.getCurrentUser().subscribe(user => {
      this.isLoggedIn = !!user;
      this.hasCheckedLogin = true;
      this.initials = this.computeInitials(user?.displayName);
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

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}
