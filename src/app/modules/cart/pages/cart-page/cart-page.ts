// src/app/modules/cart/pages/cart-page/cart-page.ts
import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../auth/services/cart.service';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, CurrencyPipe],
  templateUrl: './cart-page.html',
})
export class CartPageComponent {
  constructor(public cartService: CartService) {}

  // Métodos para interactuar con el servicio
  setQty(productId: string, event: any) {
    const qty = Number(event.target.value);
    this.cartService.setQty(productId, qty > 0 ? qty : 1);
  }

  removeFromCart(productId: string) {
    if (confirm('¿Estás seguro de que quieres quitar este producto?')) {
      this.cartService.removeFromCart(productId);
    }
  }

  clearCart() {
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      this.cartService.clearCart();
    }
  }
}