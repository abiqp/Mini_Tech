// src/app/modules/orders/services/order.service.ts
import { Injectable } from '@angular/core';
import { Cart } from '../../../shared/models/cart';
import { Order } from '../../../shared/models/order'; // Crearemos este modelo
import { User } from '../../../shared/models/user';
import { CartService } from '../../auth/services/cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly ORDERS_KEY = 'orders:v1';

  constructor(private cartService: CartService) {}

  // Crea una orden a partir del estado actual del carrito
  createOrderFromCart(cart: Cart, user: User): Order {
    const newOrder: Order = {
      id: `o-${Date.now()}`,
      userId: user.id,
      items: cart.items,
      subtotal: this.cartService.getSubtotal(),
      taxes: this.cartService.getTaxes(),
      total: this.cartService.getTotal(),
      createdAt: new Date().toISOString(),
      status: 'paid'
    };
    return newOrder;
  }

  // Guarda la orden en localStorage
  saveOrder(order: Order): void {
    const allOrders = this.listOrders();
    allOrders.unshift(order); // Añade la nueva orden al principio
    localStorage.setItem(this.ORDERS_KEY, JSON.stringify(allOrders));
  }

  // Obtiene todas las órdenes guardadas
  listOrders(): Order[] {
    const ordersJson = localStorage.getItem(this.ORDERS_KEY);
    return ordersJson ? JSON.parse(ordersJson) : [];
  }

  // Busca una orden por su ID
  getOrderById(id: string): Order | undefined {
    return this.listOrders().find(o => o.id === id);
  }
}