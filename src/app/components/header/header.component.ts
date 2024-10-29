import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { UtilitiesComponent } from '../utilities/utilities.component';
import { LogoComponent } from '../logo/logo.component';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [  CommonModule,
    RouterModule,
    LogoComponent,
    SearchBarComponent,
    UtilitiesComponent,
    NavigationComponent],
  standalone: true
})
export class HeaderComponent {
  toggleMenu() {
  }
}