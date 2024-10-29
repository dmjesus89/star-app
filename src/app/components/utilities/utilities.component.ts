import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';
import { CartComponent } from '../../pages/cart/cart.component';
import { CartSidebarComponent } from '../cart-sidebar/cart-sidebar.component';

interface ContactInfo {
  whatsapp: {
    number: string;
    formattedNumber: string;
  };
  email: {
    address: string;
  };
}

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

@Component({
  selector: 'app-utilities',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule,CartSidebarComponent],
  templateUrl: './utilities.component.html',
  styleUrl: './utilities.component.scss'
})
export class UtilitiesComponent implements OnInit, OnDestroy {
  showSupport = false;
  showAccount = false;
  cartCount = 0;
  private unlistenClick: (() => void) | null = null;
  private cartSubscription!: Subscription;
  showCart$ = false;

  contactInfo: ContactInfo = {
    whatsapp: {
      number: '+351965476825',
      formattedNumber: '+351965476825'
    },
    email: {
      address: 'marketing@teste.com'
    }
  };

  constructor(
    private renderer: Renderer2,
    private cartService: CartService
  ) {
    this.cartSubscription = this.cartService.cartItems$.subscribe(() => {
      this.cartCount = this.cartService.getCartCount();
    });
  }

  
  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.unlistenClick = this.renderer.listen('document', 'click', (event) => {
        const target = event.target as HTMLElement;
        if (!target.closest('.utility-item')) {
          this.showSupport = false;
          this.showAccount = false;
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.unlistenClick) {
      this.unlistenClick();
    }
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  getWhatsAppLink(): string {
    return `https://wa.me/${this.contactInfo.whatsapp.number}`;
  }

  getEmailLink(): string {
    return `mailto:${this.contactInfo.email.address}`;
  }

  toggleSupport(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.showSupport = !this.showSupport;
    this.showAccount = false;
  }

  toggleAccount(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.showAccount = !this.showAccount;
    this.showSupport = false;
  }

  toggleCart(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.toggleCart();
  }
}