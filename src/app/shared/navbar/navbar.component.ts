import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  hasCheckedLogin = false; // 👈 Nos indica si ya terminó de verificar
  menuOpen = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.isLoggedIn = !!user;
      this.hasCheckedLogin = true;
    });
  }

  logout(): void {
    this.authService.logout();
    this.menuOpen = false;
  }
  
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}
