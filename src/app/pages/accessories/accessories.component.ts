// src/app/pages/accessories/accessories.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.scss']
})
export class AccessoriesComponent implements OnInit {
  products: Product[] = [];
  categories = [
    'NETS',
    'VOLLEYBALLS',
    'BEACH TENNIS RACKETS',
    'BEACH TENNIS BALLS',
    'BAGS',
    'TOWELS',
    'UMBRELLAS',
    'CHAIRS',
    'SUNSCREEN',
    'OTHER'
  ];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts('accessories')
      .subscribe(products => this.products = products);
  }
}