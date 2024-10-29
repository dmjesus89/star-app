import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
  installments: ProductInstallment;
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

  formatPrice(price: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  }

  onBuyClick(): void {
    this.buy.emit(this.product);
  }

  onQuickViewClick(): void {
    this.quickView.emit(this.product);
  }
}