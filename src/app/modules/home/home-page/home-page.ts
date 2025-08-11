import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../../shared/models/product';
import { ProductsService } from '../../auth/services/products.service';
import { ProductCardComponent } from '../../products/components/product-card/product-card';

@Component({
  selector: 'app-home-page',
  standalone: true,
  // Importa ProductCardComponent para poder usarlo en el template
  imports: [CommonModule, RouterModule, ProductCardComponent],
  templateUrl: './home-page.html',
})
export class HomePageComponent implements OnInit {
  featuredProducts: Product[] = [];
  loading = true;

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.productsService.getProducts({ pageSize: 4 }).subscribe({
      next: (response) => {
        this.featuredProducts = response.products;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
}