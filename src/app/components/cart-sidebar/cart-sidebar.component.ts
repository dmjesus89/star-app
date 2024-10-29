import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface CartItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  originalPrice: number;
  quantity: number;
  discount: number;
}

@Component({
  selector: 'app-cart-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cart-sidebar.component.html',
  styleUrl: './cart-sidebar.component.scss'
})
export class CartSidebarComponent {
  @Output() close = new EventEmitter<void>();
  
  cartItems: CartItem[] = [
    {
      id: 1,
      name: 'Regata Masculina | Movimento | Verde Neon (M)',
      imageUrl: 'path-to-image',
      price: 59.00,
      originalPrice: 99.00,
      quantity: 1,
      discount: 41
    },
    // Add more items as needed
  ];

  cep: string = '';
  freeShippingThreshold = 350;

  updateQuantity(item: CartItem, change: number): void {
    const newQuantity = item.quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      item.quantity = newQuantity;
    }
  }

  removeItem(item: CartItem): void {
    this.cartItems = this.cartItems.filter(i => i.id !== item.id);
  }

  getSubtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getTotal(): number {
    // Add shipping cost if needed
    return this.getSubtotal();
  }

  getRemainingForFreeShipping(): number {
    const subtotal = this.getSubtotal();
    return subtotal >= this.freeShippingThreshold ? 0 : this.freeShippingThreshold - subtotal;
  }

  calculateShipping(): void {
    if (this.cep.length === 8) {
      // Implement shipping calculation
      console.log('Calculating shipping for:', this.cep);
    }
  }

  checkout(): void {
    // Implement checkout logic
    console.log('Proceeding to checkout');
  }
}