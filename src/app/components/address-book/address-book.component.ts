// src/app/components/address-book/address-book.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService } from '../../services/address.service';
import { Address } from '../../models/address.model';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss']
})
export class AddressBookComponent implements OnInit {
  addresses: Address[] = [];
  showAddForm = false;
  addressForm: FormGroup;
  editingAddressId: string | null = null;

  constructor(
    private addressService: AddressService,
    private fb: FormBuilder
  ) {
    this.addressForm = this.createAddressForm();
  }

  ngOnInit(): void {
    this.loadAddresses();
  }

  createAddressForm(): FormGroup {
    return this.fb.group({
      fullName: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['', Validators.required],
      phone: ['', Validators.required],
      isDefault: [false]
    });
  }

  loadAddresses(): void {
    this.addressService.getAddresses().subscribe(addresses => {
      this.addresses = addresses;
    });
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      const addressData = this.addressForm.value;
      
      if (this.editingAddressId) {
        this.addressService.updateAddress(this.editingAddressId, addressData)
          .subscribe({
            next: () => this.handleAddressSuccess(),
            error: (error) => console.error('Error updating address:', error)
          });
      } else {
        this.addressService.addAddress(addressData)
          .subscribe({
            next: () => this.handleAddressSuccess(),
            error: (error) => console.error('Error adding address:', error)
          });
      }
    }
  }

  editAddress(address: Address): void {
    this.editingAddressId = address.id;
    this.addressForm.patchValue(address);
    this.showAddForm = true;
  }

  deleteAddress(addressId: string): void {
    if (confirm('Are you sure you want to delete this address?')) {
      this.addressService.deleteAddress(addressId)
        .subscribe({
          next: () => {
            this.addresses = this.addresses.filter(a => a.id !== addressId);
          },
          error: (error) => console.error('Error deleting address:', error)
        });
    }
  }

  setDefaultAddress(addressId: string): void {
    this.addressService.setDefaultAddress(addressId)
      .subscribe({
        next: () => {
          this.loadAddresses();
        },
        error: (error) => console.error('Error setting default address:', error)
      });
  }

  private handleAddressSuccess(): void {
    this.loadAddresses();
    this.showAddForm = false;
    this.editingAddressId = null;
    this.addressForm.reset();
  }
}