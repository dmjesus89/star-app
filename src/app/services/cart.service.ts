// services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = { items: [], total: 0 };
  private cartSubject = new BehaviorSubject<Cart>(this.cart);
  cart$ = this.cartSubject.asObservable();

  addToCart(item: CartItem): void {
    const existingItem = this.cart.items.find(i => i.productId === item.productId);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cart.items.push(item);
    }
    this.updateCart();
  }

  removeFromCart(productId: number): void {
    this.cart.items = this.cart.items.filter(item => item.productId !== productId);
    this.updateCart();
  }

  private updateCart(): void {
    // Update total and emit new value
    this.cartSubject.next({...this.cart});
  }
}