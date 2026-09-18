import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name = '';
  surname = '';
  email = '';
  password = '';
  passwordConfirmation = '';
  errorMessage = '';
  successMessage = '';
  isLoading = false;
  showPassword = false;

  constructor(private authService: AuthService, private router: Router) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  register() {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.name || !this.surname || !this.email || !this.password || !this.passwordConfirmation) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    if (this.password !== this.passwordConfirmation) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    this.isLoading = true;
    this.authService.register(this.email, this.password, `${this.name} ${this.surname}`.trim())
      .then(() => {
        this.successMessage = 'Successfully registered!';
        setTimeout(() => {
          this.router.navigate(['/products']);
        }, 1500);
      })
      .catch((error) => {
        this.errorMessage = error.message || 'An error occurred during registration.';
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}