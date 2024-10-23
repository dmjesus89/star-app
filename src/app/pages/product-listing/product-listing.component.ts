  import { Component, OnInit } from '@angular/core';
  import { ActivatedRoute, RouterModule } from '@angular/router';
  import { CommonModule } from '@angular/common';
  
  interface ProductInstallments {
    number: number;
    value: number;
  }
  
  interface Product {
    id: number;
    name: string;
    imageUrl: string;
    originalPrice: number;
    currentPrice: number;
    discount?: number;
    installments: ProductInstallments;
    category: string;
    subcategory?: string;
  }
  
  @Component({
    selector: 'app-product-listing',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './product-listing.component.html',
    styleUrls: ['./product-listing.component.scss']
  })
  export class ProductListingComponent implements OnInit { 
    // Navigation parameters
    category: string = '';
    subcategory: string = '';
  
    // Filter parameters
    minPrice: number = 0;
    maxPrice: number = 1000;
    currentSort: string = 'bestsellers';
  
    // Product data
    products: Product[] = [];
    filteredProducts: Product[] = [];
  
    constructor(private route: ActivatedRoute) {}
  
    ngOnInit(): void {
      // Subscribe to route parameters
      this.route.params.subscribe(params => {
        this.category = params['category'] || '';
        this.subcategory = params['subcategory'] || '';
        this.loadProducts();
      });
  
      // Initialize with mock data - replace with your API call
      this.loadProducts();
    }
  
    loadProducts(): void {
      // Mock data - replace with your API call
      this.products = [
        {
          id: 1,
          name: "Men's Tank Top | Performance | Green",
          imageUrl: 'assets/images/men-tank-green.svg',
          originalPrice: 99.90,
          currentPrice: 59.00,
          discount: 41,
          installments: {
            number: 2,
            value: 29.50
          },
          category: 'men'
        },
        {
          id: 2,
          name: "Men's Tank Top | Performance | Blue",
          imageUrl: 'assets/images/men-tank-blue.svg',
          originalPrice: 99.90,
          currentPrice: 59.00,
          discount: 41,
          installments: {
            number: 2,
            value: 29.50
          },
          category: 'men'
        },
        {
          id: 3,
          name: "Men's Swim Trunks | Pro | Black",
          imageUrl: 'assets/images/men-swim-black.svg',
          originalPrice: 149.90,
          currentPrice: 89.90,
          discount: 40,
          installments: {
            number: 2,
            value: 44.95
          },
          category: 'men'
        },
          {
            id: 4,
            name: 'Women\'s Tank Top | Essential | White',
            category: 'women',
            subcategory: 'tank-top',
            imageUrl: 'assets/images/women-tank-white.svg',
            originalPrice: 89.90,
            currentPrice: 59.90,
            discount: 33,
            installments: { number: 2, value: 29.95 }
          },
          {
            id: 5,
            name: 'Women\'s Leggings | Pro | Black',
            category: 'women',
            subcategory: 'leggings',
            imageUrl: 'assets/images/women-leggings-black.svg',
            originalPrice: 179.90,
            currentPrice: 119.90,
            discount: 33,
            installments: { number: 3, value: 39.97 }
          },
          {
            id: 6,
            name: "Men's Tank Top | Performance | Green",
            imageUrl: 'assets/images/men-tank-green.svg',
            originalPrice: 99.90,
            currentPrice: 59.00,
            discount: 41,
            installments: {
              number: 2,
              value: 29.50
            },
            category: 'men'
          },
      ];
  
      this.applyFilters();
    }
  
    // Filter and sort methods
    applyFilters(): void {
      this.filteredProducts = this.products
        .filter(product => {
          // Category filter
          if (this.category && product.category !== this.category) {
            return false;
          }
  
          // Subcategory filter
          if (this.subcategory && product.subcategory !== this.subcategory) {
            return false;
          }
  
          // Price filter
          if (product.currentPrice < this.minPrice || product.currentPrice > this.maxPrice) {
            return false;
          }
  
          return true;
        });
  
      this.applySorting();
    }
  
    applySorting(): void {
      switch (this.currentSort) {
        case 'price-asc':
          this.filteredProducts.sort((a, b) => a.currentPrice - b.currentPrice);
          break;
        case 'price-desc':
          this.filteredProducts.sort((a, b) => b.currentPrice - a.currentPrice);
          break;
        case 'newest':
          // Assuming products array is already sorted by date
          // If not, you'll need to add a date field to the Product interface
          break;
        default: // 'bestsellers'
          // Implement your bestsellers logic here
          break;
      }
    }
  
    // Event handlers
    updateMinPrice(event: Event): void {
      const input = event.target as HTMLInputElement;
      this.minPrice = Number(input.value);
      this.applyFilters();
    }
  
    updateMaxPrice(event: Event): void {
      const input = event.target as HTMLInputElement;
      this.maxPrice = Number(input.value);
      this.applyFilters();
    }
  
    onSortChange(event: Event): void {
      const select = event.target as HTMLSelectElement;
      this.currentSort = select.value;
      this.applySorting();
    }
  
    // Utility methods
    formatBreadcrumb(text: string): string {
      return text
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
  
    // Optional: Method to format currency (can be replaced with a pipe)
    formatCurrency(value: number): string {
      return value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      });
    }
  }
  
  
  
  