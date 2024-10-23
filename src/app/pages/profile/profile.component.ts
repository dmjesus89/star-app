// src/app/pages/profile/profile.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  profileForm: FormGroup;
  activeTab: 'profile' | 'orders' | 'addresses' | 'settings' = 'profile';
  isEditing = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      dateOfBirth: [''],
      preferences: this.fb.group({
        newsletter: [false],
        smsNotifications: [false]
      })
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
      this.profileForm.patchValue(user);
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.userService.updateProfile(this.profileForm.value).subscribe({
        next: (updatedUser) => {
          this.user = updatedUser;
          this.isEditing = false;
        },
        error: (error) => {
          console.error('Error updating profile:', error);
        }
      });
    }
  }

  setActiveTab(tab: 'profile' | 'orders' | 'addresses' | 'settings'): void {
    this.activeTab = tab;
  }
}