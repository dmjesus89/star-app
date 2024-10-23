// src/app/components/header/header.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  template: `
    <header class="header">
      <nav class="nav">
        <div class="nav__logo">
          <a routerLink="/">
            <img src="assets/logo.png" alt="Star Beachwear" />
          </a>
        </div>
        
        <div class="nav__menu">
          <a routerLink="/men" routerLinkActive="active">MEN</a>
          <a routerLink="/women" routerLinkActive="active">WOMEN</a>
          <a routerLink="/accessories" routerLinkActive="active">ACCESSORIES</a>
        </div>
        
        <div class="nav__actions">
          <div class="search">
            <input type="search" placeholder="Search..." />
          </div>
          
          <a routerLink="/cart" class="cart-icon">
            <i class="fas fa-shopping-cart"></i>
            <span class="cart-count" *ngIf="cartItemCount$ | async as count">
              {{ count }}
            </span>
          </a>
          
          <ng-container *ngIf="isLoggedIn$ | async; else loginButton">
            <button class="account-btn" [matMenuTriggerFor]="menu">
              <i class="fas fa-user"></i>
            </button>
            <mat-menu #menu="matMenu">
              <button mat-menu-item routerLink="/profile">Profile</button>
              <button mat-menu-item routerLink="/orders">Orders</button>
              <button mat-menu-item (click)="logout()">Logout</button>
            </mat-menu>
          </ng-container>
          
          <ng-template #loginButton>
            <a routerLink="/login" class="login-btn">Login</a>
          </ng-template>
        </div>
      </nav>
    </header>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  cartItemCount$ = this.cartService.cartItemCount$;
  isLoggedIn$ = this.authService.isLoggedIn$;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  logout(): void {
    this.authService.logout();
  }
}