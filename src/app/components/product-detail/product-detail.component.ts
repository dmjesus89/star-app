import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../services/product.service';

interface BreadcrumbItem {
  label: string;
  url?: string;
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product?: Product;
  selectedSize: string = '';
  quantity: number = 1;
  showCartNotification = false;
  cep: string = '';
  breadcrumbs: BreadcrumbItem[] = [];
  isProductAvailable = false; // Initialize as false

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = Number(params['id']);
      this.productService.getProductBySlug(productId).subscribe(
        product => {
          if (product) {
            this.product = product;
            // Safely check if sizes exist and have length
            this.isProductAvailable = Array.isArray(product.sizes) && product.sizes.length > 0;
            this.selectedSize = this.isProductAvailable && product.sizes ? product.sizes[0] : '';
            this.updateBreadcrumbs(product);
          }
        }
      );
    });
  }

  updateBreadcrumbs(product: Product): void {
    this.breadcrumbs = [
      {
        label: 'Home',
        url: '/'
      }
    ];

    if (product.category) {
      this.breadcrumbs.push({
        label: this.formatBreadcrumbLabel(product.category),
        url: `/product-listing/${product.category.toLowerCase()}`
      });
    }

    if (product.subcategory) {
      this.breadcrumbs.push({
        label: this.formatBreadcrumbLabel(product.subcategory),
        url: `/product-listing/${product.category.toLowerCase()}/${product.subcategory.toLowerCase()}`
      });
    }

    this.breadcrumbs.push({
      label: product.name
    });
  }

  formatBreadcrumbLabel(text: string): string {
    return text
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  incrementQuantity(): void {
    if (this.quantity < 10) {
      this.quantity++;
    }
  }

  calculateShipping(): void {
    if (this.cep.length === 8) {
      console.log('Calculating shipping for CEP:', this.cep);
    }
  }

  addToCart(): void {
    if (!this.product || !this.isProductAvailable) return;

    const cartItem = {
      productId: this.product.id,
      quantity: this.quantity,
      size: this.selectedSize,
      price: this.product.currentPrice,
      name: this.product.name,
      image: this.product.imageUrl
    };

    console.log('Adding to cart:', cartItem);
    
    this.showCartNotification = true;
    setTimeout(() => {
      this.showCartNotification = false;
    }, 3000);
  }
}