// src/app/components/product-card/product-card.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="product-card">
      <div class="product-card__image">
        <img 
          [src]="getDefaultImage()" 
          [alt]="product.name"
          class="product-image"
        >
        <div class="product-card__overlay">
          <button 
            class="add-to-cart-btn"
            (click)="addToCart()"
            [disabled]="!isInStock()"
          >
            {{ isInStock() ? 'Add to Cart' : 'Out of Stock' }}
          </button>
        </div>
      </div>
      
      <div class="product-card__info">
        <h3>{{ product.name }}</h3>
        <div class="price-container">
          <p class="price">{{ product.price.toFixed(2) }}</p>
          <p class="compare-price" *ngIf="product.compareAtPrice">
            {{ product.compareAtPrice.toFixed(2) }}
          </p>
        </div>
        
        <div class="variants" *ngIf="product.variants.length > 0">
          <!-- Colors -->
          <div class="colors" *ngIf="hasColors()">
            <span 
              *ngFor="let variant of getUniqueColors()"
              [style.backgroundColor]="variant"
              class="color-dot"
              [title]="variant"
            ></span>
          </div>

          <!-- Sizes -->
          <div class="sizes" *ngIf="hasSizes()">
            <span 
              *ngFor="let size of getUniqueSizes()"
              class="size-badge"
            >
              {{ size }}
            </span>
          </div>
        </div>

        <!-- Rating -->
        <div class="rating" *ngIf="product.averageRating > 0">
          <span class="stars">★★★★★</span>
          <span class="rating-value">{{ product.averageRating.toFixed(1) }}</span>
          <span class="rating-count">({{ product.ratings.length }})</span>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(private cartService: CartService) {}

  getDefaultImage(): string {
    const defaultImage = this.product.images.find(img => img.isDefault);
    return defaultImage ? defaultImage.url : this.product.images[0]?.url || 'assets/placeholder.jpg';
  }

  isInStock(): boolean {
    return this.product.inventory.available > 0;
  }

  hasColors(): boolean {
    return this.product.variants.some(variant => variant.color);
  }

  hasSizes(): boolean {
    return this.product.variants.some(variant => variant.size);
  }

  getUniqueColors(): string[] {
    return Array.from(new Set(
      this.product.variants
        .map(variant => variant.color)
        .filter((color): color is string => !!color)
    ));
  }

  getUniqueSizes(): string[] {
    return Array.from(new Set(
      this.product.variants
        .map(variant => variant.size)
        .filter((size): size is string => !!size)
    ));
  }

  addToCart(): void {
    if (this.isInStock()) {
      this.cartService.addToCart({
        productId: this.product.id,
        quantity: 1
      });
    }
  }
}