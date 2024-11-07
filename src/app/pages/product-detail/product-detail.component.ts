// product-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../services/product.service';
import { Subject, takeUntil } from 'rxjs'
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';


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
  isProductAvailable = false;
  private readonly CART_NOTIFICATION_DURATION = 3000; 
  loading = true;
  error: string | null = null;


  private destroy$ = new Subject<void>();


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = Number(params['id']);
      this.productService.getProductBySlug(productId).subscribe(
        product => {
          if (product) {
            this.product = product;
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

  get cartCount(): number {
    return this.cartService.getCartCount();
  }

  get cartTotal(): number {
    return this.cartService.getSubtotal();
  }

  addToCart(): void {
     if (!this.product || !this.isProductAvailable || !this.selectedSize) {
     console.log('Please select a size before adding to cart');
      return;
    }

    const cartItem : CartItem = {
      id: this.product.id,
      name: this.product.name,
      imageUrl: this.product.imageUrl,
      price: this.product.currentPrice,
      originalPrice: this.product.originalPrice || this.product.currentPrice,
      quantity: this.quantity,
      size: this.selectedSize,
    };

    console.log('Adding to cart:', cartItem);

      this.cartService.addToCart(cartItem);
      this.showCartSuccess();
 
  }

  private showCartSuccess(): void {
    this.showCartNotification = true;
    setTimeout(() => {
      this.showCartNotification = false;
    }, this.CART_NOTIFICATION_DURATION);
  }




}