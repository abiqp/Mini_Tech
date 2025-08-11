// src/app/modules/auth/pages/login-page/login-page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necesario para ngModel
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.services';
import { DEMO_CREDENTIALS } from '../../../../shared/models/user';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importamos FormsModule
  templateUrl: './login-page.html',
})
export class LoginPageComponent implements OnInit {
  email = DEMO_CREDENTIALS.email;
  password = DEMO_CREDENTIALS.password;
  error: string | null = null;
  loading = false;

  public readonly DEMO_CREDENTIALS = DEMO_CREDENTIALS;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Si el usuario ya está autenticado, lo redirigimos a su perfil
    if (this.authService.isAuthenticated) {
      this.router.navigate(['/users/profile']);
    }
  }

  async onSubmit(): Promise<void> {
    this.loading = true;
    this.error = null;
    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/users/profile']); // Redirige al perfil tras el login
    } catch (err: any) {
      this.error = err.message || 'Ocurrió un error inesperado.';
    } finally {
      this.loading = false;
    }
  }
}