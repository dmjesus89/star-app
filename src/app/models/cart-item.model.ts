export interface CartItem {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
    originalPrice?: number;
    quantity: number;
    size?: string;
    discount?: number;
    variant?: string;
    maxQuantity?: number;
  }