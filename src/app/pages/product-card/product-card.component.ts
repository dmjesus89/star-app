//product-card.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';

interface ProductInstallment {
  quantity: number;
  value: number;
}

export interface ProductCard {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  imageUrl: string;
  link: string;
  discount?: number;
  sizes?: string[];
}


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: ProductCard;
  @Output() buy = new EventEmitter<ProductCard>();
  @Output() quickView = new EventEmitter<ProductCard>();
  showSizeSelector = false;
  selectedSize: string = '';
  isProductAvailable = false;


  constructor(private cartService: CartService) {}

  toggleSizeSelector(): void {
    this.showSizeSelector = !this.showSizeSelector;
    if (!this.showSizeSelector) {
      this.selectedSize = '';
    }
  }

  selectSize(size: string): void {
    this.selectedSize = size;
  }

  addToCart(): void {
    if (!this.selectedSize) return;

    const cartItem : CartItem = {
      id: this.product.id,
      name: this.product.name,
      imageUrl: this.product.imageUrl,
      price: this.product.price,
      quantity: 1,
      size: this.selectedSize,
    };

    this.cartService.addToCart(cartItem);
    this.toggleSizeSelector();
  }

  formatPrice(price: number): string {
    return `R$ ${price.toFixed(2)}`;
  }

  onBuyClick(): void {
    this.buy.emit(this.product);
  }

  onQuickViewClick(): void {
    this.quickView.emit(this.product);
  }
}