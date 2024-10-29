import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CartComponent } from './pages/cart/cart.component';
import { UtilitiesComponent } from './components/utilities/utilities.component';
import { LogoComponent } from './components/logo/logo.component';
import { ProductListingComponent } from './pages/product-listing/product-listing.component';
import { CartSidebarComponent } from './components/cart-sidebar/cart-sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    FooterComponent,
    ProductListingComponent,
    CartComponent,
    SearchBarComponent,
    NavigationComponent,
    UtilitiesComponent,
    LogoComponent,
    CartSidebarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {
  }
}