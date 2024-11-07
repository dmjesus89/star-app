// utilities.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { CartSidebarComponent } from '../cart-sidebar/cart-sidebar.component';
import { AuthenticationResponse } from '../../models/authentication-response';

@Component({
  selector: 'app-utilities',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, CartSidebarComponent],
  templateUrl: './utilities.component.html',
  styleUrl: './utilities.component.scss'
})
export class UtilitiesComponent implements OnInit, OnDestroy {
  showSupport = false;
  showAccount = false;
  cartCount = 0;
  showCart$ = false;
  currentUser: AuthenticationResponse | null = null;
  private unlistenClick: (() => void) | null = null;
  private cartSubscription!: Subscription;
  private authSubscription!: Subscription;

  contactInfo = {
    whatsapp: {
      number: '+351965476825',
      formattedNumber: '+351965476825'
    },
    email: {
      address: 'contact@digomais.com'
    }
  };

  constructor(
    private renderer: Renderer2,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {
    this.cartSubscription = this.cartService.cartItems$.subscribe(() => {
      this.cartCount = this.cartService.getCartCount();
    });

    this.authSubscription = this.authService.currentUser$.subscribe(
      user => this.currentUser = user
    );
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
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  logout(): void {
    this.authService.logout();
    this.showAccount = false;
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