import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product, DummyProductsResponse } from '../../../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) { }

  private mapProduct(dummyProduct: any): Product {
    return {
      id: String(dummyProduct.id),
      name: dummyProduct.title,
      description: dummyProduct.description,
      price: dummyProduct.price,
      brand: dummyProduct.brand,
      category: dummyProduct.category,
      thumbnail: dummyProduct.thumbnail,
      images: dummyProduct.images,
      rating: dummyProduct.rating,
      stock: dummyProduct.stock,
    };
  }

  getProducts(filters: { q?: string; minPrice?: number; maxPrice?: number; page?: number, pageSize?: number }): Observable<DummyProductsResponse> {
    let params = new HttpParams().set('limit', '200');
    let url = this.apiUrl;
    if (filters.q) {
      url = `${this.apiUrl}/search`;
      params = params.set('q', filters.q);
    }

    return this.http.get<any>(url, { params }).pipe(
      map(response => {
        let products = response.products.map(this.mapProduct);

        if (filters.minPrice) {
          products = products.filter((p: Product) => p.price >= filters.minPrice!);
        }
        if (filters.maxPrice) {
          products = products.filter((p: Product) => p.price <= filters.maxPrice!);
        }

        const total = products.length;
        const page = filters.page ?? 1;
        const pageSize = filters.pageSize ?? 12;
        const skip = (page - 1) * pageSize;
        const paginatedItems = products.slice(skip, skip + pageSize);

        return { products: paginatedItems, total: total, skip: skip, limit: pageSize };
      })
    );
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(map(this.mapProduct));
  }

  getProductsByCategory(categorySlug: string): Observable<DummyProductsResponse> {
    return this.http.get<any>(`${this.apiUrl}/category/${categorySlug}`).pipe(
      map(response => ({
        products: response.products.map(this.mapProduct),
        total: response.total,
        skip: response.skip,
        limit: response.limit
      }))
    );
  }
}