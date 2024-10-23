// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Components
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductCardComponent } from './components/product-card/product-card.component';

// Pages
import { HomeComponent } from './pages/home/home.component';
import { MenComponent } from './pages/men/men.component';
import { CartComponent } from './pages/cart/cart.component';
import { AccessoriesComponent } from './pages/accessories/accessories.component';
import { SignupComponent } from './pages/signup/signup.component';

// Services
import { ProductService } from './services/product.service';
import { CartService } from './services/cart.service';
import { AuthService } from './services/auth.service';

// Routes
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCardComponent,
    HomeComponent,
    MenComponent,
    CartComponent,
    AccessoriesComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [
    ProductService,
    CartService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }