import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions, withRouterConfig,withInMemoryScrolling } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient,withFetch } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';


import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
      withViewTransitions()
     ), 
     provideClientHydration(), 
     provideHttpClient(withFetch()),
    provideAnimations(),
    provideHttpClient(), provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
};