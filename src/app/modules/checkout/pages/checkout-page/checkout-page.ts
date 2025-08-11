import { Component, ViewChild } from '@angular/core'; // <-- Añade ViewChild
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../../auth/services/cart.service';
import { AuthService } from '../../../auth/services/auth.services';
import { OrderService } from '../../../auth/services/order.service';
// Importa el nuevo modal
import { CheckoutModalComponent } from '../../components/checkout-modal/checkout-modal';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe, CheckoutModalComponent], // <-- Añade el modal
  templateUrl: './checkout-page.html',
})
export class CheckoutPageComponent {
  // Obtiene una referencia al componente del modal en la plantilla
  @ViewChild(CheckoutModalComponent) checkoutModal!: CheckoutModalComponent;

  constructor(
    public cartService: CartService,
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router
  ) {}

  // Este método ahora solo inicia el modal
  startCheckoutProcess() {
    this.checkoutModal.startProcess();
  }

  // Este método se ejecuta cuando el modal confirma que el "pago" fue exitoso
  finalizeOrder() {
    const currentUser = this.authService.currentUserValue;
    const currentCart = this.cartService.cartValue;

    if (!currentUser || currentCart.items.length === 0) return;

    const order = this.orderService.createOrderFromCart(currentCart, currentUser);
    this.orderService.saveOrder(order);
    this.cartService.clearCart();
    
    // Redirige al inicio como pediste
    this.router.navigate(['/']);
  }
}