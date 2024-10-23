import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, MatMenuModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  private cartItemsCountSubject = new BehaviorSubject<number>(3);
  cartItemCount$ = this.cartItemsCountSubject.asObservable();

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  activeMenu: string | null = null;
  
  menItems = [
    'Swim Trunks',
    'Short',
    'Tank Top',
    'T-Shirt',
    'Leggings',
    'Base Layer',
    'Sand Socks',
    'Hoodie'
  ];

  womenItems = [
    'Slip',
    'Top',
    'Short',
    'Tank Top',
    'T-Shirt',
    'Leggings',
    'Base Layer',
    'Sand Socks',
    'Hoodie'
  ];

  constructor(private router: Router) {}

  showMenu(menu: string): void {
    this.activeMenu = menu;
  }

  hideMenu(): void {
    this.activeMenu = null;
  }

  formatRoute(item: string): string {
    // Convert "Tank Top" to "tank-top", "T-Shirt" to "t-shirt", etc.
    return item.toLowerCase().replace(/\s+/g, '-');
  }

  navigateToCategory(category: string): void {
    this.router.navigate(['/products', category]);
  }

  navigateToSubcategory(category: string, subcategory: string): void {
    this.router.navigate(['/products', category, subcategory]);
  }

  logout(): void {
    this.isLoggedInSubject.next(false);
  }

  login(): void {
    this.isLoggedInSubject.next(true);
  }
}