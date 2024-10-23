// src/app/pages/women/women.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-women',
  standalone: true,
  imports: [CommonModule, ProductListComponent],
  template: `
    <div class="container">
      <h1>Women's Collection</h1>
      <app-product-list
        [products]="products"
        [categories]="categories"
      ></app-product-list>
    </div>
  `,
  styles: [`
    .container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    h1 {
      margin-bottom: 2rem;
    }
  `]
})
export class WomenComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = [
    'SLIP', 'TOP', 'TANK TOP', 'LEGGINGS', 'SHORT',
    'T SHIRT', 'HOODIE', 'BASELAYER', 'SAND SOCKS'
  ];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts('women')
      .subscribe(products => this.products = products);
  }
}