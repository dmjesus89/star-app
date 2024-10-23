// src/app/pages/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  template: `
    <section class="hero">
      <div class="hero__content">
        <h1>Summer Collection 2024</h1>
        <p>Discover the latest trends in beachwear</p>
        <button routerLink="/new-arrivals" class="btn-primary">
          Shop Now
        </button>
      </div>
    </section>

    <section class="categories">
      <div class="container">
        <h2>Shop by Category</h2>
        <div class="categories__grid">
          <div class="category-card" routerLink="/men">
            <img src="assets/men.jpg" alt="Men's Collection">
            <h3>Men</h3>
          </div>
          <div class="category-card" routerLink="/women">
            <img src="assets/women.jpg" alt="Women's Collection">
            <h3>Women</h3>
          </div>
          <div class="category-card" routerLink="/accessories">
            <img src="assets/accessories.jpg" alt="Accessories">
            <h3>Accessories</h3>
          </div>
        </div>
      </div>
    </section>

    <section class="featured-products">
      <div class="container">
        <h2>Featured Products</h2>
        <div class="products-grid">
          <app-product-card
            *ngFor="let product of featuredProducts"
            [product]="product"
          ></app-product-card>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getFeaturedProducts()
      .subscribe(products => this.featuredProducts = products);
  }
}