export interface CartItem {
    productId: number;
    quantity: number;
    size?: string;
    color?: string;
  }

export interface Cart {
    items: CartItem[];
    total: number;
  }