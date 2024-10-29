import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { ProductSectionsComponent } from '../product-sections/product-sections.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductSectionsComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
}