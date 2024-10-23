// src/app/components/user-settings/user-settings.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  settingsForm: FormGroup;
  passwordForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationService
  ) {
    this.settingsForm = this.fb.group({
      emailNotifications: this.fb.group({
        orderUpdates: [true],
        promotions: [true],
        newsletter: [true],
        productUpdates: [true]
      }),
      pushNotifications: this.fb.group({
        orderUpdates: [true],
        promotions: [false],
        recommendations: [true]
      }),
      privacySettings: this.fb.group({
        profileVisibility: ['public'],
        activityTracking: [true],
        dataSharingThirdParty: [false]
      })
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      ]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.loadUserSettings();
  }

  loadUserSettings(): void {
    this.loading = true;
    this.userService.getUserSettings().subscribe({
      next: (settings) => {
        this.settingsForm.patchValue(settings);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading settings:', error);
        this.loading = false;
      }
    });
  }

  onSettingsSubmit(): void {
    if (this.settingsForm.valid) {
      this.loading = true;
      this.userService.updateUserSettings(this.settingsForm.value).subscribe({
        next: () => {
          this.notificationService.success('Settings updated successfully');
          this.loading = false;
        },
        error: (error) => {
          console.error('Error updating settings:', error);
          this.notificationService.error('Failed to update settings');
          this.loading = false;
        }
      });
    }
  }

  onPasswordSubmit(): void {
    if (this.passwordForm.valid) {
      this.loading = true;
      this.userService.updatePassword(this.passwordForm.value).subscribe({
        next: () => {
          this.notificationService.success('Password updated successfully');
          this.passwordForm.reset();
          this.loading = false;
        },
        error: (error) => {
          console.error('Error updating password:', error);
          this.notificationService.error('Failed to update password');
          this.loading = false;
        }
      });
    }
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword')?.value === g.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }
}