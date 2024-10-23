export interface Order {
    id: string;
    userId: string;
    items: OrderItem[];
    status: OrderStatus;
    shipping: ShippingDetails;
    payment: PaymentDetails;
    subtotal: number;
    tax: number;
    shippingCost: number;
    total: number;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface OrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    size?: string;
    color?: string;
    imageUrl: string;
  }
  
  export type OrderStatus = 
    | 'pending'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled';
  
  export interface ShippingDetails {
    address: Address;
    method: ShippingMethod;
    trackingNumber?: string;
    estimatedDelivery?: Date;
  }
  
  export interface ShippingMethod {
    id: string;
    name: string;
    price: number;
    estimatedDays: number;
  }
  
  export interface PaymentDetails {
    method: 'credit_card' | 'paypal';
    status: 'pending' | 'completed' | 'failed';
    transactionId?: string;
    last4?: string;
  }