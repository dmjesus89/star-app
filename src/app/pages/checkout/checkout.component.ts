// src/app/pages/checkout/checkout.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckoutService } from '../../services/checkout.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  cart$ = this.cartService.cart$;
  loading = false;
  
  constructor(
    private fb: FormBuilder,
    private checkoutService: CheckoutService,
    private cartService: CartService
  ) {
    this.checkoutForm = this.fb.group({
      shipping: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        address: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', Validators.required],
        phone: ['', Validators.required]
      }),
      payment: this.fb.group({
        cardNumber: ['', Validators.required],
        expiryDate: ['', Validators.required],
        cvv: ['', Validators.required]
      })
    });
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      this.loading = true;
      this.checkoutService.processOrder({
        ...this.checkoutForm.value,
        cart: this.cartService.getCurrentCart()
      }).subscribe({
        next: (response) => {
          // Handle successful order
          this.cartService.clearCart();
          // Navigate to success page
        },
        error: (error) => {
          // Handle error
          this.loading = false;
        }
      });
    }
  }
}