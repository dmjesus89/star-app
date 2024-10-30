import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Subject, takeUntil } from 'rxjs';import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { UtilitiesComponent } from '../utilities/utilities.component';
import { LogoComponent } from '../logo/logo.component';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [  CommonModule,
    RouterModule,
    LogoComponent,
    SearchBarComponent,
    UtilitiesComponent,
    NavigationComponent],
  standalone: true
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartCount = 0;
  private destroy$ = new Subject<void>();

  constructor(private cartService: CartService) {}

  toggleMenu() {
  }

  ngOnInit() {
    this.cartService.cartItems$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.cartCount = this.cartService.getCartCount();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleCart(): void {
    this.cartService.toggleCart();
  }

}