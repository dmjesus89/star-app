
// src/app/pages/signup/signup.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="signup-container">
      <div class="signup-card">
        <h2>Create Account</h2>
        <form (ngSubmit)="onSubmit()" #signupForm="ngForm">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              [(ngModel)]="name"
              required
            >
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              [(ngModel)]="email"
              required
              email
            >
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              [(ngModel)]="password"
              required
              minlength="8"
            >
          </div>

          <button type="submit" [disabled]="!signupForm.valid">
            Create Account
          </button>
        </form>

        <p class="login-link">
          Already have an account? 
          <a routerLink="/login">Sign in</a>
        </p>
      </div>
    </div>
  `,
  styles: [`
    .signup-container {
      min-height: calc(100vh - 160px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .signup-card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 400px;

      h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
    }

    .form-group {
      margin-bottom: 1rem;

      label {
        display: block;
        margin-bottom: 0.5rem;
      }

      input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 4px;
      }
    }

    button {
      width: 100%;
      padding: 0.75rem;
      background: #0066cc;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:disabled {
        background: #cccccc;
      }
    }

    .login-link {
      text-align: center;
      margin-top: 1rem;

      a {
        color: #0066cc;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  `]
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.authService.signup({
      name: this.name,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        // Handle successful signup
      },
      error: (error) => {
        // Handle signup error
        console.error('Signup failed:', error);
      }
    });
  }
}