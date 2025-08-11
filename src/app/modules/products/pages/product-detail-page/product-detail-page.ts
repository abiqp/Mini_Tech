// src/app/modules/products/pages/product-detail-page/product-detail-page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../../../../shared/models/product';
import { ProductsService } from '../../../auth/services/products.service';
import { CartService } from '../../../auth/services/cart.service';

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe],
  templateUrl: './product-detail-page.html',
})
export class ProductDetailPageComponent implements OnInit {
  product$: Observable<Product | null> | undefined;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    // Obtenemos el ID del producto de los parámetros de la ruta
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.product$ = this.productsService.getProductById(productId);
      this.product$.subscribe(() => this.loading = false);
    } else {
      this.loading = false;
      // Manejar caso de ID nulo si es necesario
    }
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    alert(`${product.name} ha sido añadido al carrito.`);
  }
}