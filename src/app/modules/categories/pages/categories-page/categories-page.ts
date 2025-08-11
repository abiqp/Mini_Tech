import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../../auth/services/category.services';
import { Category } from '../../../../shared/models/category'; // <-- Importa el modelo

@Component({
  selector: 'app-categories-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './categories-page.html',
})
export class CategoriesPageComponent implements OnInit {
  categories: Category[] = []; // <-- Ahora es un array de Category
  loading = true;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    // Llama al método corregido del servicio
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
      this.loading = false;
    });
  }
}