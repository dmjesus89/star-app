//product-sections.components.ts
import { Component, OnInit, PLATFORM_ID, Inject, OnDestroy, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import { ProductCardComponent, ProductCard } from '../product-card/product-card.component';
import { ProductService,Product } from '../../services/product.service';
import { forkJoin } from 'rxjs';

interface ProductSection {
  id: string;
  title: string;
  products: ProductCard[];
}

@Component({
  selector: 'app-product-sections',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent],
  templateUrl: './product-sections.component.html',
  styleUrls: ['./product-sections.component.scss']
})
export class ProductSectionsComponent implements OnInit, AfterViewInit, OnDestroy {
  sections: ProductSection[] = [
    {
      id: 'best-sellers',
      title: 'Best Sellers',
      products: []
    },
    {
      id: 'sales',
      title: 'Sales',
      products: []
    },
    {
      id: 'latest-releases',
      title: 'Latest Releases',
      products: []
    }
  ];

  selectedProduct: ProductCard | null = null;
  private swipers: Swiper[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.initSwipers();
      }, 0);
    }
  }

  ngOnDestroy() {
    if (this.swipers) {
      this.swipers.forEach(swiper => {
        if (swiper && typeof swiper.destroy === 'function') {
          swiper.destroy();
        }
      });
    }
  }

  private initSwipers() {
    try {
      this.sections.forEach(section => {
        const swiper = new Swiper(`#swiper-${section.id}`, {
          modules: [Navigation],
          slidesPerView: 4,
          spaceBetween: 40,
          navigation: {
            nextEl: `#next-${section.id}`,
            prevEl: `#prev-${section.id}`,
          },
          breakpoints: {
            320: {
              slidesPerView: 1,
              spaceBetween: 10
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 15
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 15
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 40
            }
          }
        });
        this.swipers.push(swiper);
      });
    } catch (error) {
      console.error('Error initializing Swiper:', error);
    }
  }

  private loadProducts() {
    forkJoin({
      bestSellers: this.productService.getBestSellers(),
      saleProducts: this.productService.getSaleProducts(),
      newReleases: this.productService.getNewReleases()
    }).subscribe(results => {
      this.sections[0].products = results.bestSellers.map(product => this.mapProductToCard(product));
      this.sections[1].products = results.saleProducts.map(product => this.mapProductToCard(product));
      this.sections[2].products = results.newReleases.map(product => this.mapProductToCard(product));
    });
  }

  private mapProductToCard(product: Product): ProductCard {
    return {
      id: product.id,
      name: product.name,
      price: product.currentPrice,
      oldPrice: product.originalPrice,
      imageUrl: product.imageUrl,
      link: `/produtos/${product.category}/${product.id}`,
      discount: product.discount,
      sizes: product.sizes,
    };
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  }

  calculateSavings(oldPrice: number, currentPrice: number): number {
    return oldPrice - currentPrice;
  }

  @HostListener('window:resize')
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.swipers.forEach(swiper => {
        if (swiper && typeof swiper.update === 'function') {
          swiper.update();
        }
      });
    }
  }

  addToCart(product: ProductCard): void {
    console.log('Adding to cart:', product);
    // Implement your cart logic here
  }

  quickView(product: ProductCard): void {
    console.log('Quick view:', product);
    // Implement your quick view logic here
  }
}