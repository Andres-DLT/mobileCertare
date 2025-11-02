import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  surname = '';
  email = '';
  password = '';
  passwordConfirmation = '';
  errorMessage = '';
  successMessage = ''; 

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.email || !this.password || !this.passwordConfirmation) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    if (this.password !== this.passwordConfirmation) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    this.authService.register(this.email, this.password)
    .then(() => {
      this.successMessage = 'Successfully registered!';
      setTimeout(() => {
        this.router.navigate(['/auth/login']);
      }, 1500);
    })
    .catch((error) => {
      this.errorMessage = error.message || 'An error occurred during registration.';
    });
  }
}