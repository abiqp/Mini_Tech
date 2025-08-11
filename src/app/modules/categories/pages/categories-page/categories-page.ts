import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../../auth/services/category.services';

@Component({
  selector: 'app-categories-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './categories-page.html',
})
export class CategoriesPageComponent implements OnInit {
  categories: string[] = [];
  loading = true;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService.getCategoryList().subscribe(data => {
      this.categories = data;
      this.loading = false;
    });
  }
}