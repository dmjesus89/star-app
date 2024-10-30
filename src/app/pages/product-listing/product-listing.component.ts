import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductCardComponent, ProductCard } from '../product-card/product-card.component';
import { ProductService, Product } from '../../services/product.service';


@Component({
  selector: 'app-product-listing',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent],
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent implements OnInit {
  category: string = '';
  subcategory: string = '';
  searchQuery: string = '';


  minPrice: number = 0;
  maxPrice: number = 1000;
  currentSort: string = 'bestsellers';

  products: Product[] = [];
  filteredProducts: ProductCard[] = []; // Changed type to ProductCard

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.category = params['category'] || '';
      this.subcategory = params['subcategory'] || '';
      this.loadProducts();
    });

    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';
      if (this.searchQuery) {
        this.searchProducts();
      }
    });
  }

  mapProductToCard(product: Product): ProductCard {
    return {
      id: product.id,
      name: product.name,
      price: product.currentPrice,
      oldPrice: product.originalPrice,
      imageUrl: product.imageUrl,
      link: `/produtos/${product.category}/${product.id}`,
      discount: product.discount,
      installments: {
        quantity: product.installments.number,
        value: product.installments.value
      },
      sizes: product.sizes,
    };
  }

  loadProducts(): void {
    if (this.category) {
      this.productService.getProductsByCategory(this.category).subscribe(products => {
        this.products = products;
        this.applyFilters();
      });
    } else {
      this.productService.getAllProducts().subscribe(products => {
        this.products = products;
        this.applyFilters();
      });
    }
  }

  searchProducts(): void {
    this.productService.searchProducts(this.searchQuery).subscribe(products => {
      this.products = products;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    const filteredBaseProducts = this.products.filter(product => {
      if (this.category && product.category !== this.category) {
        return false;
      }

      if (this.subcategory && product.subcategory !== this.subcategory) {
        return false;
      }

      if (product.currentPrice < this.minPrice || product.currentPrice > this.maxPrice) {
        return false;
      }

      return true;
    });

    // Transform filtered products to ProductCard type
    this.filteredProducts = filteredBaseProducts.map(this.mapProductToCard);
    this.applySorting();
  }

  applySorting(): void {
    switch (this.currentSort) {
      case 'price-asc':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // Implement newest sorting logic
        break;
      default: // 'bestsellers'
        // Implement bestsellers logic
        break;
    }
  }

  // Event handlers remain the same
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

  formatBreadcrumb(text: string): string {
    return text
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  addToCart(product: ProductCard): void {
    console.log('Adding to cart:', product);
  }

  quickView(product: ProductCard): void {
    console.log('Quick view:', product);
  }
}