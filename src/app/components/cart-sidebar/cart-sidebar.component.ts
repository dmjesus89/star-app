import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CartItem } from '../../models/cart-item.model';

@Component({
  selector: 'app-cart-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart-sidebar.component.html',
  styleUrls: ['./cart-sidebar.component.scss']
})
export class CartSidebarComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  isOpen = false;
  private subscriptions: Subscription[] = [];
  freeShippingRemaining: number = 0;

  constructor(public cartService: CartService) {
    this.subscriptions.push(
      this.cartService.cartItems$.subscribe(items => {
        this.cartItems = items;
        this.updateFreeShippingRemaining();
      }),
      this.cartService.showCart$.subscribe(show => {
        this.isOpen = show;
      })
    );
  }

  ngOnInit() {
    this.updateFreeShippingRemaining();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  closeCart() {
    this.cartService.toggleCart();
  }

  removeItem(item: CartItem) {
    this.cartService.removeFromCart(item.id, item.size);
  }

  increaseQuantity(item: CartItem) {
    if (this.cartService.canIncreaseQuantity(item.id, item.size)) {
      this.cartService.updateQuantity(item.id, item.quantity + 1, item.size);
    }
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.id, item.quantity - 1, item.size);
    }
  }

  getSubtotal(): number {
    return this.cartService.getSubtotal();
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  getFreeShippingThreshold(): number {
    return this.cartService.getFreeShippingThreshold();
  }

  getInterestFreeInstallments(): number {
    return this.cartService.getInterestFreeInstallments();
  }

  getInstallmentValue(): number {
    return this.cartService.getInstallmentValue();
  }

  updateFreeShippingRemaining() {
    this.freeShippingRemaining = this.cartService.getRemainingForFreeShipping();
  }

  initiateCheckout() {
    console.log('Starting checkout process...');
  }
}