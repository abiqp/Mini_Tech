import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product } from '../../../../shared/models/product';
import { ProductsService } from '../../../auth/services/products.service';
import { ProductCardComponent } from '../../components/product-card/product-card';

@Component({
  selector: 'app-category-products-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent],
  templateUrl: './category-products-page.html',
})
export class CategoryProductsPageComponent implements OnInit {
  products: Product[] = [];
  categoryName = '';
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const categorySlug = params.get('slug');
      if (categorySlug) {
        this.categoryName = categorySlug.replace('-', ' ');
        this.loading = true;
        this.productsService.getProductsByCategory(categorySlug).subscribe(response => {
          this.products = response.products;
          this.loading = false;
        });
      }
    });
  }
}