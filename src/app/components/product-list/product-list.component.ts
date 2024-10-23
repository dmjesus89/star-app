import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  @Input() products: Product[] = [];
  @Input() categories: string[] = [];
  @Input() title: string = '';

  selectedCategory: string | null = null;

  get filteredProducts(): Product[] {
    if (!this.selectedCategory) {
      return this.products;
    }
    return this.products.filter(product => 
      product.category.toUpperCase() === this.selectedCategory
    );
  }

  selectCategory(category: string | null): void {
    this.selectedCategory = category;
  }
}