import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./pages/home/home.component')
        .then(m => m.HomeComponent)
  },
  {
    path: 'refund-policy',
    loadComponent: () => 
      import('./pages/refund-policy/refund-policy.component')
        .then(m => m.RefundPolicyComponent)
  },
  {
    path: 'privacy-policy',
    loadComponent: () => 
      import('./pages/privacy-policy/privacy-policy.component')
        .then(m => m.PrivacyPolicyComponent)
  },
  {
    path: 'terms-of-service',
    loadComponent: () => 
      import('./pages/terms-of-service/terms-of-service.component')
        .then(m => m.TermsOfServiceComponent)
  },
  {
    path: 'shipping-policy',
    loadComponent: () => 
      import('./pages/shipping-policy/shipping-policy.component')
        .then(m => m.ShippingPolicyComponent)
  },
  { 
    path: 'products',
    children: [
      { 
        path: '',
        loadComponent: () => 
          import('./pages/product-listing/product-listing.component')
            .then(m => m.ProductListingComponent)
      },
      { 
        path: ':category',
        loadComponent: () => 
          import('./pages/product-listing/product-listing.component')
            .then(m => m.ProductListingComponent)
      },
      { 
        path: ':category/:subcategory',
        loadComponent: () => 
          import('./pages/product-listing/product-listing.component')
            .then(m => m.ProductListingComponent)
      }
    ]
  },
  {
    path: '**',
    loadComponent: () => 
      import('./pages/not-found/not-found.component')
        .then(m => m.NotFoundComponent)
  }
];