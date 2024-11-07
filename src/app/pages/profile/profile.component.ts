// profile.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { UserPreferences } from '../../models/user-preferences';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  personalDataForm!: FormGroup;
  addressForm!: FormGroup;
  passwordForm!: FormGroup;
  preferencesForm!: FormGroup;
  
  activeSection: 'personal' | 'address' | 'password' | 'preferences' = 'personal';
  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.initializeForms();
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  private initializeForms(): void {
    this.personalDataForm = this.fb.group({
      fullname: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+(?:[0-9] ?){6,14}[0-9]$/)]],
      dateOfBirth: ['', Validators.required]
    });

    this.addressForm = this.fb.group({
      street: ['', Validators.required],
      number: ['', Validators.required],
      complement: [''],
      neighborhood: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });

    this.preferencesForm = this.fb.group({
      newsletter: [false],
      smsNotifications: [false],
      emailNotifications: [false],
      orderUpdates: [false],
      promotions: [false],
      recommendations: [false]
    });
  }

  private loadUserData(): void {
    // Simulate API call to get user data
    this.isLoading = true;
    // Replace with actual API call
    setTimeout(() => {
      const userData = {
        fullname: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        dateOfBirth: '1990-01-01',
        address: {
          street: 'Main St',
          number: '123',
          complement: 'Apt 4B',
          neighborhood: 'Downtown',
          city: 'New York',
          state: 'NY',
          postalCode: '10001'
        },
        preferences: {
          newsletter: true,
          smsNotifications: false,
          emailNotifications: true,
          orderUpdates: true,
          promotions: false,
          recommendations: true
        }
      };

      this.personalDataForm.patchValue(userData);
      this.addressForm.patchValue(userData.address);
      this.preferencesForm.patchValue(userData.preferences);
      this.isLoading = false;
    }, 1000);
  }

  setActiveSection(section: 'personal' | 'address' | 'password' | 'preferences'): void {
    this.activeSection = section;
    this.clearMessages();
  }

  onSavePersonalData(): void {
    if (this.personalDataForm.valid) {
      this.isLoading = true;
      // Replace with actual API call
      setTimeout(() => {
        this.showSuccess('Dados pessoais atualizados com sucesso!');
        this.isLoading = false;
      }, 1000);
    }
  }

  onSaveAddress(): void {
    if (this.addressForm.valid) {
      this.isLoading = true;
      setTimeout(() => {
        this.showSuccess('Endereço atualizado com sucesso!');
        this.isLoading = false;
      }, 1000);
    }
  }

  onChangePassword(): void {
    if (this.passwordForm.valid) {
      this.isLoading = true;
      setTimeout(() => {
        this.showSuccess('Senha atualizada com sucesso!');
        this.isLoading = false;
        this.passwordForm.reset();
      }, 1000);
    }
  }

  onSavePreferences(): void {
    if (this.preferencesForm.valid) {
      this.isLoading = true;
      setTimeout(() => {
        this.showSuccess('Preferências atualizadas com sucesso!');
        this.isLoading = false;
      }, 1000);
    }
  }

  private passwordMatchValidator(group: FormGroup): null | object {
    const password = group.get('newPassword');
    const confirmPassword = group.get('confirmPassword');
    
    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  private showSuccess(message: string): void {
    this.successMessage = message;
    this.errorMessage = null;
    setTimeout(() => this.clearMessages(), 3000);
  }

  private showError(message: string): void {
    this.errorMessage = message;
    this.successMessage = null;
    setTimeout(() => this.clearMessages(), 3000);
  }

  private clearMessages(): void {
    this.successMessage = null;
    this.errorMessage = null;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}