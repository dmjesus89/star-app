import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CartService } from '../services/cart.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutGuard implements CanActivate {
  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.cartService.cart$.pipe(
      take(1),
      map(cart => {
        const hasItems = cart.items.length > 0;
        if (!hasItems) {
          this.router.navigate(['/cart']);
          return false;
        }
        return true;
      })
    );
  }
}