import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent implements OnInit {
  @Input() logoUrl: string = 'assets/images/logo.webp';
  @Input() title: string = 'Your Store Name';
  @Input() width: number = 1150;
  @Input() height: number = 460;
  @Input() enableTransition: boolean = true;

  ngOnInit() {
    // Any initialization logic can go here
  }
}