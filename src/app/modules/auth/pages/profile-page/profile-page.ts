// src/app/modules/auth/pages/profile-page/profile-page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.services';
import { User } from '../../../../shared/models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-page.html',
})
export class ProfilePageComponent {
  // Usamos el pipe async en la plantilla, por lo que solo necesitamos el Observable
  user$: Observable<User | null>;

  constructor(private authService: AuthService) {
    this.user$ = this.authService.currentUser$;
  }
}