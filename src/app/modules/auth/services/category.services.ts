import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Category } from '../../../shared/models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'https://dummyjson.com/products/categories';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    // La API devuelve un array de strings, lo mapeamos a nuestro modelo Category
    return this.http.get<any[]>(this.apiUrl);
  }

  // DummyJSON también nos da los nombres de las categorías en una ruta aparte
  getCategoryList(): Observable<string[]> {
      return this.http.get<string[]>(`${this.apiUrl}`);
  }
}