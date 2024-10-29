import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  searchQuery = '';
  suggestions: string[] = [];

  constructor(
    private router: Router,
  ) {}

  onSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/product-listing'], {
        queryParams: { search: this.searchQuery.trim() }
      });
    }
  }
}