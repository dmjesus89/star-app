// app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'men',
    loadComponent: () => 
      import('./pages/men/men.component').then(m => m.MenComponent)
  },
  {
    path: 'women',
    loadComponent: () => 
      import('./pages/women/women.component').then(m => m.WomenComponent)
  },
  {
    path: 'accessories',
    loadComponent: () => 
    import('./pages/accessories/accessories.component').then(m => m.AccessoriesComponent)
  },
  {
    path: 'login',
    loadComponent: () => 
      import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'signup',
    loadComponent: () => 
    import('./pages/signup/signup.component').then(m => m.SignupComponent)
  },
  {
    path: 'cart',
    loadComponent: () => 
      import('./pages/cart/cart.component').then(m => m.CartComponent)
  },
   {
    path: '**',
    loadComponent: () => 
      import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];