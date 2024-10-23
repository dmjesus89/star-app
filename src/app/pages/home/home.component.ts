import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface Slide {
  image: string;
  alt: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentSlide = 0;

  slides: Slide[] = [
    {
      image: 'assets/images/hero-image-1.svg',
      alt: 'Beach Sports Collection',
      title: 'Dive into our premiere STAR athleisure line',
      description: 'Crafted from premium fabrics, our collection seamlessly marries technical precision with beach sport elegance.'
    },
    // Add more slides as needed
  ];

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  setSlide(index: number): void {
    this.currentSlide = index;
  }

  isClient: boolean;
  slideInterval: any;
  
  newReleases: Product[] = [
    {
      id: 1,
      name: 'Térmica Manga Curta Athleta Base - Black/White',
      price: 160.00,
      image: 'assets/images/products/thermal-black-white.jpg'
    },
    // Add more products here
  ];

  featuredProducts: Product[] = [
    {
      id: 1,
      name: 'Short Praia Performance Athleta - Preto',
      price: 124.90,
      image: 'assets/images/products/shorts-black.jpg'
    },
    // Add more products here
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isClient = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isClient) {
      this.startSlideshow();
    }
  }

  ngOnDestroy(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  startSlideshow(): void {
    this.slideInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % 3;
    }, 5000);
  }
}