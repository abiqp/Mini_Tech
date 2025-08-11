// src/app/modules/orders/pages/order-confirmation-page/order-confirmation-page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Order } from '../../../../shared/models/order';
import { OrderService } from '../../../auth/services/order.service';

@Component({
  selector: 'app-order-confirmation-page',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe, DatePipe],
  templateUrl: './order-confirmation-page.html',
})
export class OrderConfirmationPageComponent implements OnInit {
  order: Order | undefined;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.order = this.orderService.getOrderById(orderId);
    }
  }
}