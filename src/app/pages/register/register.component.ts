import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup; // Using definite assignment assertion
  maxDate: string;
  isLoading = false;
  errorMessage: string | null = null;
  private destroy$ = new Subject<void>();

  private countryCodes = {
    PT: '+351', // Portugal
    BE: '+32',  // Belgium
    BR: '+55',  // Brazil
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.maxDate = this.calculate18YearsAgo();
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.registerForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]],
      phone: ['', [
        Validators.required, 
        Validators.pattern(/^\+(?:[0-9] ?){6,14}[0-9]$/)
      ]],
      birthDate: ['', [Validators.required, this.ageValidator]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  onPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Keep plus sign and numbers only
    value = value.replace(/[^\d+]/g, '');

    // Ensure it starts with a plus
    if (!value.startsWith('+')) {
      value = '+' + value;
    }

    // Format the number based on country code
    let formattedValue = this.formatInternationalNumber(value);

    // Update input value and form control
    input.value = formattedValue;
    this.registerForm.patchValue({ phone: formattedValue }, { emitEvent: false });
  }

  private formatInternationalNumber(value: string): string {
    // Remove all non-digits and plus sign
    const digitsOnly = value.replace(/[^\d+]/g, '');
    
    // If it's just a plus sign, return it
    if (digitsOnly === '+') {
      return '+';
    }

    // Get the country code part (first 2-3 digits after plus)
    const match = digitsOnly.match(/^\+(\d{2,3})/);
    
    if (!match) {
      return digitsOnly;
    }
    

    const countryCodePart = match[0];
    const restOfNumber = digitsOnly.slice(countryCodePart.length);

    // Format based on specific country codes
    switch (countryCodePart) {
      case this.countryCodes.PT: // Portugal
        return this.formatPortugalNumber(countryCodePart, restOfNumber);
      case this.countryCodes.BE: // Belgium
        return this.formatBelgiumNumber(countryCodePart, restOfNumber);
      case this.countryCodes.BR: // Brazil
        return this.formatBrazilNumber(countryCodePart, restOfNumber);
      default:
        // Generic formatting for other countries
        return this.formatGenericInternational(countryCodePart, restOfNumber);
    }
  }

  private formatPortugalNumber(countryCode: string, number: string): string {
    // Portugal format: +351 XXX XXX XXX
    const groups = number.match(/(\d{3})(\d{3})?(\d{3})?/);
    if (!groups) return countryCode;

    let formatted = countryCode + ' ';
    if (groups[1]) formatted += groups[1];
    if (groups[2]) formatted += ' ' + groups[2];
    if (groups[3]) formatted += ' ' + groups[3];
    return formatted;
  }

  private formatBelgiumNumber(countryCode: string, number: string): string {
    // Belgium format: +32 XXX XX XX XX
    const groups = number.match(/(\d{3})(\d{2})?(\d{2})?(\d{2})?/);
    if (!groups) return countryCode;

    let formatted = countryCode + ' ';
    if (groups[1]) formatted += groups[1];
    if (groups[2]) formatted += ' ' + groups[2];
    if (groups[3]) formatted += ' ' + groups[3];
    if (groups[4]) formatted += ' ' + groups[4];

    return formatted;
  }

  private formatBrazilNumber(countryCode: string, number: string): string {
    // Brazil format: +55 (XX) XXXXX-XXXX
    const groups = number.match(/(\d{2})(\d{5})?(\d{4})?/);
    if (!groups) return countryCode;

    let formatted = countryCode + ' ';
    if (groups[1]) formatted += '(' + groups[1] + ')';
    if (groups[2]) formatted += ' ' + groups[2];
    if (groups[3]) formatted += '-' + groups[3];

    return formatted;
  }

  private formatGenericInternational(countryCode: string, number: string): string {
    return number ? countryCode + ' ' + number.match(/.{1,3}/g)?.join(' ') : countryCode;
  }

  private calculate18YearsAgo(): string {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    return date.toISOString().split('T')[0];
  }

  private static calculateAge(birthDate: Date): number {
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    const months = today.getMonth() - birthDate.getMonth();
    const days = today.getDate() - birthDate.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
      years--;
    }

    return years;
  }

  ageValidator(control: any) {
    if (!control.value) {
      return null;
    }

    const birthDate = new Date(control.value);
    const age = RegisterComponent.calculateAge(birthDate);
    
    return age >= 18 ? null : { underage: true };
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    return null;
  }

  private cleanPhoneNumber(phone: string): string {
    return phone.replace(/[\s()-]/g, '');
  }

  onSubmit() {
    if (this.registerForm.valid && !this.isLoading) {
      this.isLoading = true;
      this.errorMessage = null;

      const userData = {
        fullname: this.registerForm.get('name')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
        phone: this.cleanPhoneNumber(this.registerForm.get('phone')?.value),
        dateOfBirth: this.registerForm.get('birthDate')?.value
      };

      this.authService.register(userData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.router.navigate(['/account/login'], {
              queryParams: { 
                message: 'Registro realizado com sucesso! Por favor, verifique seu email para confirmar sua conta.' 
              }
            });
          },
          error: (error) => {
            this.isLoading = false;
            this.errorMessage = error.message; // Just use the error message from the service
          }
        });
    } else {
      this.markFormGroupTouched(this.registerForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}