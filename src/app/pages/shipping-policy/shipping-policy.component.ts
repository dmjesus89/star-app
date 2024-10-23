import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shipping',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './shipping-policy.component.html',
  styleUrls: ['./shipping-policy.component.scss']
})
export class ShippingPolicyComponent {
  deliveryTimes = [
    {
      region: 'Europe & Surrounding Countries',
      time: '7-14 days'
    },
    {
      region: 'Other International Orders',
      time: '7-14 Days'
    },
    {
      region: 'Australia & New Zealand',
      time: '7-14 days'
    },
    {
      region: 'Canada',
      time: '7-14 days'
    },
    {
      region: 'U.K',
      time: '7-14 days'
    },
    {
      region: 'US',
      time: '7-14 business days via Express USPS'
    }
  ];
}