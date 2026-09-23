import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { SeoService } from '../../shared/seo.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  rememberMe = true;
  errorMessage = '';
  isLoading = false;
  showPassword = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private seo: SeoService
  ) {
    this.rememberMe = this.authService.getRememberMe();
  }

  ngOnInit() {
    this.seo.setPage({
      title: 'Sign in',
      description: 'Sign in to Certare to browse services, shortlist them and schedule a discovery call.',
      path: '/auth/login',
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  async login() {
    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter your email and password.';
      return;
    }

    this.isLoading = true;
    try {
      await this.authService.login(this.email, this.password, this.rememberMe);
      await this.router.navigate(['/products']);
    } catch (err: any) {
      const message = err?.message || 'Unable to sign in.';
      this.errorMessage = message;
    } finally {
      this.isLoading = false;
    }
  }
}
