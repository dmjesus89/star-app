import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface ProductSearchDTO {
  category?: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  page?: number;
  size?: number;
  query?: string;
  isBestSeller?: boolean;
  isNew?: boolean;
  hasDiscount?: boolean;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  originalPrice?: number;
  currentPrice: number;
  discount: number;
  category: string;
  subcategory?: string;
  isBestSeller?: boolean;
  isNew?: boolean;
  sizes?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: "tank top homen 1",
      description: "camisa masculina",
      imageUrl: 'https://images.tcdn.com.br/img/img_prod/1048809/kit_camisa_e_short_futevolei_sand_3381_1_c04261fce170de7ba07c5ddfb4084a96.png',
      originalPrice: 99.90,
      currentPrice: 59.00,
      discount: 15,
      category: 'men',
      subcategory: 'tank-top',
      isBestSeller: true,
      isNew: true,
      sizes: [],
    },
    {
      id: 2,
      name: "tank top homem 2",
      description: "camisa masculina",
      imageUrl: 'https://banzika.com.br/image/cache/catalog/data/produtos/Uniformes/eSport2/regata%20(1)-1100x1100w.png',
      currentPrice: 59.00,
      discount: 0,
      category: 'men',
      subcategory: 'tank-top',
      isBestSeller: true,
      isNew: true,
      sizes: ['P', 'M', 'G', 'GG'],
    },
    {
      id: 3,
      name: "jacketa homen 1",
      description: "camisa masculina",
      imageUrl: 'https://banzika.com.br/image/cache/catalog/data/produtos/Uniformes/eSport2/regata%20(1)-1100x1100w.png',
      originalPrice: 149.90,
      currentPrice: 89.90,
      discount: 5,
      category: 'men',
      subcategory: 'top',
      isBestSeller: true,
      isNew: true,
      sizes: ['P', 'M', 'G', 'GG'],
    },
    {
      id: 4,
      name: "tank top mulher 1",
      description: "camisa masculina",
      imageUrl: 'https://banzika.com.br/image/cache/catalog/data/produtos/Uniformes/eSport2/regata%20(1)-1100x1100w.png',
      originalPrice: 89.90,
      currentPrice: 59.90,
      discount: 3,
      category: 'women',
      subcategory: 'tank-top',
      isBestSeller: true,
      isNew: true,
      sizes: ['P', 'M', 'G', 'GG'],
    },
    {
      id: 5,
      name: "legging mulher 1",
      description: "camisa masculina",
      imageUrl: 'https://banzika.com.br/image/cache/catalog/data/produtos/Uniformes/eSport2/regata%20(1)-1100x1100w.png',
      originalPrice: 179.90,
      currentPrice: 119.90,
      discount: 4,
      category: 'women',
      subcategory: 'leggings',
      isBestSeller: true,
      isNew:false,
      sizes: ['P'],
    },
    {
      id: 6,
      name: "legging homem 1",
      description: "camisa masculina",
      imageUrl: 'https://banzika.com.br/image/cache/catalog/data/produtos/Uniformes/eSport2/regata%20(1)-1100x1100w.png',
      originalPrice: 99.90,
      currentPrice: 59.00,
      discount: 5,
      category: 'men',
      subcategory: 'leggings',
      isBestSeller: true,
      isNew:false,
      sizes: ['P', 'M', 'G', 'GG'],
    },
    {
      id: 6,
      name: 'legging homem 2',
      description: "camisa masculina",
      currentPrice: 216.60,
      originalPrice: 228.00,
      imageUrl: 'https://banzika.com.br/image/cache/catalog/data/produtos/placas/filmes-e-series/chetoat1-8d2f84f0f1b7aefcd714633341463811-1024-1024-1100x1100.jpg',
      discount: 5,
      category: 'men',
      subcategory: 'leggings',
      isBestSeller: false,
      isNew:false,
      sizes: ['P', 'M', 'G', 'GG'],
    },
    {
      id: 7,
      name: 'legging homem 3',
      description: "camisa masculina",
      originalPrice: 99.90,
      currentPrice: 59.00,
      imageUrl: 'https://banzika.com.br/image/cache/catalog/data/produtos/placas/filmes-e-series/chetoat1-8d2f84f0f1b7aefcd714633341463811-1024-1024-1100x1100.jpg',
      discount: 1,
      category: 'men',
      subcategory: 'leggings',
      isBestSeller: false,
      isNew:false,
      sizes: ['P', 'M', 'G', 'GG']
    }
  ];

  getAllProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getBestSellers(): Observable<Product[]> {
    return of(this.products.filter(product => product.isBestSeller));
  }

  getSaleProducts(): Observable<Product[]> {
    return of(this.products.filter(product => product.discount && product.discount > 0));
  }

  getNewReleases(): Observable<Product[]> {
    return of(this.products.filter(product => product.isNew));
  }

  searchProducts(query: string): Observable<Product[]> {
    const searchLower = query.toLowerCase();
    console.log(searchLower);
    const filteredProducts = this.products.filter(product => 
      product.name.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower) ||
      (product.subcategory && product.subcategory.toLowerCase().includes(searchLower))
    );
    return of(filteredProducts);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    const filteredProducts = this.products.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
    return of(filteredProducts);
  }

  getProductsByPriceRange(min: number, max: number): Observable<Product[]> {
    const filteredProducts = this.products.filter(product => 
      product.currentPrice >= min && product.currentPrice <= max
    );
    return of(filteredProducts);
  }

  getProductBySlug(id: number): Observable<Product | undefined> {
    console.log(id)
    return of(this.products.find(product => product.id === id
    ));
  }

  getRelatedProducts(category: string): Observable<Product[]> {
    const filteredProducts = this.products.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
    return of(filteredProducts);
  }


}