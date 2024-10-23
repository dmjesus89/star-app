export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    compareAtPrice?: number;
    category: string;
    section: 'men' | 'women' | 'accessories';
    images: ProductImage[];
    variants: ProductVariant[];
    tags: string[];
    ratings: Rating[];
    averageRating: number;
    inventory: Inventory;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface ProductImage {
    id: string;
    url: string;
    alt: string;
    isDefault: boolean;
  }
  
  export interface ProductVariant {
    id: string;
    size?: string;
    color?: string;
    sku: string;
    inventory: number;
  }
  
  export interface Rating {
    id: string;
    userId: string;
    rating: number;
    review?: string;
    createdAt: Date;
  }
  
  export interface Inventory {
    total: number;
    available: number;
    reserved: number;
  }