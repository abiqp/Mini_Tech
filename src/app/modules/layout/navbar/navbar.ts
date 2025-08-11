import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../../auth/services/auth.services';
import { CartService } from '../../auth/services/cart.service';
import { ThemeService } from '../../auth/services/theme.service';
import { User } from '../../../shared/models/user';
import { Cart } from '../../../shared/models/cart';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class NavbarComponent implements OnDestroy {
  currentUser: User | null = null;
  cart: Cart = { items: [], currency: 'USD' };
  itemsCount = 0;
  
  private userSubscription: Subscription;
  private cartSubscription: Subscription;

  constructor(
    public authService: AuthService,
    private cartService: CartService,
    public themeService: ThemeService
  ) {
    this.userSubscription = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    this.cartSubscription = this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
      this.itemsCount = cart.items.reduce((sum, item) => sum + item.qty, 0);
    });
  }

  logout() {
    this.authService.logout();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.cartSubscription.unsubscribe();
  }
}