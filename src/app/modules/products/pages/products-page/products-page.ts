// src/app/modules/products/pages/products-page/products-page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Product } from '../../../../shared/models/product';
import { ProductsService } from '../../../auth/services/products.service';
import { ProductCardComponent } from '../../components/product-card/product-card';
import { FiltersComponent, ProductFilters } from '../../components/filters/filters';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent, FiltersComponent],
  templateUrl: './products-page.html',
})
export class ProductsPageComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  totalProducts = 0;
  currentPage = 1;
  pageSize = 12;
  totalPages = 1;

  currentFilters: ProductFilters = {};

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.currentPage = params['page'] ? Number(params['page']) : 1;
      this.currentFilters = {
        q: params['q'],
        minPrice: params['minPrice'] ? Number(params['minPrice']) : undefined,
        maxPrice: params['maxPrice'] ? Number(params['maxPrice']) : undefined,
      };
      this.loadProducts();
    });
  }

  loadProducts() {
    this.loading = true;
    const filtersToApply = {
      ...this.currentFilters,
      page: this.currentPage,
      pageSize: this.pageSize
    };

    this.productsService.getProducts(filtersToApply).subscribe({
      next: (response) => {
        this.products = response.products;
        this.totalProducts = response.total;
        this.totalPages = Math.ceil(this.totalProducts / this.pageSize);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.loading = false;
      }
    });
  }

  onFilterChange(filters: ProductFilters) {
    // Navegamos a la misma ruta pero con nuevos query params
    // Esto resetea la página a 1 y dispara el ngOnInit para recargar los productos
    this.router.navigate(['/productos'], { 
      queryParams: { ...filters, page: 1 }
    });
  }

  changePage(newPage: number) {
    if (newPage > 0 && newPage <= this.totalPages) {
      this.router.navigate(['/productos'], { 
        queryParams: { ...this.currentFilters, page: newPage }
      });
    }
  }
}