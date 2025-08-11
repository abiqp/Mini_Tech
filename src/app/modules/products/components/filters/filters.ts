import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ProductFilters {
  q?: string;
  minPrice?: number;
  maxPrice?: number;
}

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filters.html', // Asegúrate de que esta ruta sea correcta
})
export class FiltersComponent implements OnInit {
  @Input() initialFilters: ProductFilters = {};
  @Output() filterChange = new EventEmitter<ProductFilters>();

  filters: ProductFilters = {};

  ngOnInit() {
    this.filters = { ...this.initialFilters };
  }

  applyFilters() {
    const newFilters = { ...this.filters };
    newFilters.minPrice = newFilters.minPrice ? Number(newFilters.minPrice) : undefined;
    newFilters.maxPrice = newFilters.maxPrice ? Number(newFilters.maxPrice) : undefined;
    this.filterChange.emit(newFilters);
  }
}