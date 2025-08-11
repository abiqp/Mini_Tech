// src/app/modules/auth/components/logout-button/logout-button.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.services';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button [class]="buttonClass" (click)="logout()">
      Salir
    </button>
  `,
})
export class LogoutButtonComponent {
  // Para poder personalizar las clases del botón desde fuera
  @Input() buttonClass = 'btn btn-outline-secondary btn-sm';

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}