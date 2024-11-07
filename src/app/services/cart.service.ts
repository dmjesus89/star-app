import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item.model';



export interface ShippingInfo {
  cep?: string;
  address?: string;
  method: 'delivery' | 'pickup';
  price: number;
  estimatedDays?: number;
}

export interface InstallmentOption {
  quantity: number;
  value: number;
  totalValue: number;
  hasInterest: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  private showCart = new BehaviorSubject<boolean>(false);
  private isCartOpen = new BehaviorSubject<boolean>(false);
  private shippingInfo = new BehaviorSubject<ShippingInfo>({
    method: 'pickup',
    price: 0
  });

  cartItems$ = this.cartItems.asObservable();
  showCart$ = this.showCart.asObservable();
  isCartOpen$ = this.isCartOpen.asObservable();
  shippingInfo$ = this.shippingInfo.asObservable();

  private readonly FREE_SHIPPING_THRESHOLD = 300;
  private readonly MAX_INSTALLMENTS = 12;
  private readonly INTEREST_FREE_INSTALLMENTS = 3;


  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.loadCart();
      this.cartItems$.subscribe(() => {
        this.saveCart();
      });

      this.showCart$.subscribe(value => {
        this.isCartOpen.next(value);
      });
    }
  }

  private loadCart() {
    if (isPlatformBrowser(this.platformId)) {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          this.cartItems.next(JSON.parse(savedCart));
        } catch (e) {
          console.error('Error loading cart from localStorage:', e);
          this.cartItems.next([]);
        }
      }
    }
  }

  private saveCart() {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem('cart', JSON.stringify(this.cartItems.value));
      } catch (e) {
        console.error('Error saving cart to localStorage:', e);
      }
    }
  }

  addToCart(item: CartItem) {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(
      i => i.id === item.id && i.size === item.size
    );

    if (existingItem) {
      existingItem.quantity += item.quantity;
      this.cartItems.next([...currentItems]);
    } else {
      // Calculate discount if originalPrice is present
      if (item.originalPrice && item.originalPrice > item.price) {
        item.discount = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);
      }
      this.cartItems.next([...currentItems, item]);
    }
  }

  removeFromCart(itemId: number, size?: string) {
    const currentItems = this.cartItems.value;
    this.cartItems.next(
      currentItems.filter(i => !(i.id === itemId && i.size === size))
    );
  }

  updateQuantity(itemId: number, quantity: number, size?: string) {
    const currentItems = this.cartItems.value;
    const item = currentItems.find(
      i => i.id === itemId && i.size === size
    );
    if (item && quantity > 0) {
      item.quantity = quantity;
      this.cartItems.next([...currentItems]);
    } else if (item && quantity <= 0) {
      this.removeFromCart(itemId, size);
    }
  }

  getCartCount(): number {
    return this.cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
  }

  getSubtotal(): number {
    return this.cartItems.value.reduce(
      (sum, item) => sum + (item.price * item.quantity),
      0
    );
  }

  getTotal(): number {
    const subtotal = this.getSubtotal();
    const shipping = this.shippingInfo.value.price;
    return subtotal + shipping;
  }

  toggleCart() {
    const newValue = !this.showCart.value;
    this.showCart.next(newValue);
    this.isCartOpen.next(newValue);
  }

  clearCart() {
    this.cartItems.next([]);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('cart');
    }
  }

  updateShippingInfo(info: Partial<ShippingInfo>) {
    this.shippingInfo.next({
      ...this.shippingInfo.value,
      ...info
    });
  }

  async calculateShipping(cep: string): Promise<number> {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const subtotal = this.getSubtotal();
      if (subtotal >= this.FREE_SHIPPING_THRESHOLD) {
        this.updateShippingInfo({ price: 0, cep });
        return 0;
      }
      
      const shippingCost = Math.min(subtotal * 0.1, 50);
      this.updateShippingInfo({ price: shippingCost, cep });
      return shippingCost;
    } catch (error) {
      console.error('Error calculating shipping:', error);
      throw error;
    }
  }

  hasShippingDiscount(): boolean {
    return this.getSubtotal() >= this.FREE_SHIPPING_THRESHOLD;
  }

  getItemById(id: number, size?: string): CartItem | undefined {
    return this.cartItems.value.find(
      item => item.id === id && item.size === size
    );
  }

  isCartEmpty(): boolean {
    return this.cartItems.value.length === 0;
  }

  getInstallmentValue(numberOfInstallments: number = 3): number {
    return this.getTotal() / numberOfInstallments;
  }

  calculateInstallments(): InstallmentOption[] {
    const total = this.getTotal();
    const installments: InstallmentOption[] = [];

    for (let i = 1; i <= this.MAX_INSTALLMENTS; i++) {
      let installmentValue: number;
      let totalValue: number;
      const hasInterest = i > this.INTEREST_FREE_INSTALLMENTS;

      if (hasInterest) {
        const interest = 0.0199;
        totalValue = total * Math.pow(1 + interest, i);
        installmentValue = totalValue / i;
      } else {
        totalValue = total;
        installmentValue = total / i;
      }

      if (installmentValue >= 5) {
        installments.push({
          quantity: i,
          value: installmentValue,
          totalValue,
          hasInterest
        });
      }
    }

    return installments;
  }

  getMaxInstallments(): number {
    return this.calculateInstallments().length;
  }

  getInterestFreeInstallments(): number {
    return this.INTEREST_FREE_INSTALLMENTS;
  }

  validateStock(itemId: number, quantity: number, size?: string): boolean {
    const item = this.getItemById(itemId, size);
    return item ? (!item.maxQuantity || quantity <= item.maxQuantity) : false;
  }

  formatPrice(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  getTotalDiscount(): number {
    return this.cartItems.value.reduce((sum, item) => {
      if (item.originalPrice && item.price) {
        return sum + ((item.originalPrice - item.price) * item.quantity);
      }
      return sum;
    }, 0);
  }

  getTotalItems(): number {
    return this.cartItems.value.reduce((sum, item) => sum + 1, 0);
  }

  getFreeShippingThreshold(): number {
    return this.FREE_SHIPPING_THRESHOLD;
  }

  getRemainingForFreeShipping(): number {
    const subtotal = this.getSubtotal();
    return subtotal >= this.FREE_SHIPPING_THRESHOLD ? 0 : this.FREE_SHIPPING_THRESHOLD - subtotal;
  }

  updateItemSize(itemId: number, oldSize: string | undefined, newSize: string): void {
    const currentItems = this.cartItems.value;
    const itemIndex = currentItems.findIndex(i => i.id === itemId && i.size === oldSize);
    
    if (itemIndex !== -1) {
      const updatedItems = [...currentItems];
      const existingItemWithNewSize = currentItems.find(i => i.id === itemId && i.size === newSize);

      if (existingItemWithNewSize) {
        existingItemWithNewSize.quantity += currentItems[itemIndex].quantity;
        updatedItems.splice(itemIndex, 1);
      } else {
        updatedItems[itemIndex] = { ...updatedItems[itemIndex], size: newSize };
      }

      this.cartItems.next(updatedItems);
    }
  }

  hasItems(itemId: number, size?: string): boolean {
    return this.cartItems.value.some(i => i.id === itemId && i.size === size);
  }

  getItemQuantity(itemId: number, size?: string): number {
    const item = this.getItemById(itemId, size);
    return item ? item.quantity : 0;
  }

  isMaxQuantity(itemId: number, size?: string): boolean {
    const item = this.getItemById(itemId, size);
    return item ? (!!item.maxQuantity && item.quantity >= item.maxQuantity) : false;
  }

  canIncreaseQuantity(itemId: number, size?: string): boolean {
    const item = this.getItemById(itemId, size);
    return item ? (!item.maxQuantity || item.quantity < item.maxQuantity) : false;
  }

  getDiscountPercentage(itemId: number, size?: string): number {
    const item = this.getItemById(itemId, size);
    if (item?.originalPrice && item.price) {
      return Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);
    }
    return 0;
  }

  getShippingEstimate(): number | undefined {
    return this.shippingInfo.value.estimatedDays;
  }

  setShippingEstimate(days: number) {
    this.updateShippingInfo({ estimatedDays: days });
  }
}