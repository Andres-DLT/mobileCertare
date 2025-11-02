import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async login() {
    this.errorMessage = '';
    console.log('🔑 Intentando login con:', this.email);

    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, ingresa tu correo y contraseña.';
      return;
    }

    try {
      const userCred = await this.authService.login(this.email, this.password);
      console.log('✅ Login exitoso:', userCred);
      localStorage.setItem('user', JSON.stringify({ email: this.email }));
      this.router.navigate(['/products']);
    } catch (err: any) {
      // Loguea todo el objeto de error
      console.error('❌ Firebase Auth error object:', err);

      // Extrae y muestra código y mensaje si existen
      const code = err?.code || 'unknown-error';
      const message = err?.message || 'No hay mensaje de error.';
      console.error('Código de error:', code);
      console.error('Mensaje de error:', message);

      // Muestra algo en pantalla para debug
      this.errorMessage = `Error [${code}]: ${message}`;
    }
  }
}
