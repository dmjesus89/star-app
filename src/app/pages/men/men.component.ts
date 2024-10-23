// src/app/pages/men/men.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.scss']
})
export class MenComponent implements OnInit {
  products: Product[] = [];
  categories = [
    'SHORT', 'TANK TOP', 'T-SHIRT', 'HOODIE', 
    'LEGGINGS', 'BASELAYER', 'SAND SOCKS'
  ];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts('men')
      .subscribe(products => this.products = products);
  }
}