import { Component, HostListener } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { UtilitiesComponent } from '../utilities/utilities.component';

interface MenuItem {
  label: string;
  link: string;
  hasDropdown?: boolean;
  children?: MenuItem[];
}

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [UtilitiesComponent, SearchBarComponent, RouterModule, CommonModule, MatIconModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  activeItem: MenuItem | null = null;

  constructor(private router: Router) {}
  
  menuItems: MenuItem[] = [
    {
      label: 'Masculino',
      link: 'men',
      hasDropdown: true,
      children: [
        { label: 'CAMISETA', link: 'tank-top' },
        { label: 'TÉRMICA', link: 'short' },
        { label: 'REGATA', link: 'regata' },
        { label: 'TOP', link: 'top' },
        { label: 'LEGGING/CALÇA', link: 'legging' },
        { label: 'JAQUETA/BLUSA', link: 'blusa' },
      ]
    },
    {
      label: 'Women',
      link: 'women',
      hasDropdown: true,
      children: [
        { label: 'CAMISETA', link: 'tank-top' },
        { label: 'TÉRMICA', link: 'short' },
        { label: 'REGATA', link: 'regata' },
        { label: 'TOP', link: 'top' },
        { label: 'LEGGING/CALÇA', link: 'legging' },
        { label: 'JAQUETA/BLUSA', link: 'blusa' },
      ]
    },
    { label: 'Accessories', link: 'accessories',
      hasDropdown: false,
     },
  ];

  onMenuClick(item: MenuItem) {
    if (!item.hasDropdown) {
      this.closeDropdown();
    }
  }

  onSubcategoryClick(category: string, subcategory: string) {
    this.router.navigate(['/product-listing', category, subcategory]);
    this.closeDropdown();
  }

  closeDropdown() {
    this.activeItem = null;
  }

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.menu-item-wrapper')) {
      this.closeDropdown();
    }
  }
}