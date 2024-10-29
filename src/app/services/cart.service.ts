import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  originalPrice: number;
  quantity: number;
  discount: number;
  size?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems = new BehaviorSubject<CartItem[]>([]);
  private showCart = new BehaviorSubject<boolean>(false);

  cartItems$ = this.cartItems.asObservable();
  showCart$ = this.showCart.asObservable();

  addToCart(item: CartItem) {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(
      i => i.id === item.id && i.size === item.size
    );

    if (existingItem) {
      existingItem.quantity += item.quantity;
      this.cartItems.next([...currentItems]);
    } else {
      this.cartItems.next([...currentItems, item]);
    }
  }

  removeFromCart(itemId: number, size?: string) {
    const currentItems = this.cartItems.value;
    this.cartItems.next(
      currentItems.filter(i => !(i.id === itemId && i.size === size))
    );
  }

  updateQuantity(itemId: number, quantity: number, size?: string) {
    const currentItems = this.cartItems.value;
    const item = currentItems.find(
      i => i.id === itemId && i.size === size
    );
    if (item) {
      item.quantity = quantity;
      this.cartItems.next([...currentItems]);
    }
  }

  getCartCount(): number {
    return this.cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
  }

  getSubtotal(): number {
    return this.cartItems.value.reduce(
      (sum, item) => sum + (item.price * item.quantity), 
      0
    );
  }

  toggleCart() {
    this.showCart.next(!this.showCart.value);
  }

  clearCart() {
    this.cartItems.next([]);
  }
}
