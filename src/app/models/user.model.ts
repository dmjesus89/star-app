export interface User {
    id: string;
    name: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    dateOfBirth?: Date;
    avatar?: string;
    role: 'user' | 'admin';
    preferences: UserPreferences;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface UserPreferences {
    newsletter: boolean;
    smsNotifications: boolean;
    emailNotifications: EmailNotificationSettings;
    pushNotifications: PushNotificationSettings;
    privacySettings: PrivacySettings;
  }
  
  export interface EmailNotificationSettings {
    orderUpdates: boolean;
    promotions: boolean;
    newsletter: boolean;
    productUpdates: boolean;
  }
  
  export interface PushNotificationSettings {
    orderUpdates: boolean;
    promotions: boolean;
    recommendations: boolean;
  }
  
  export interface PrivacySettings {
    profileVisibility: 'public' | 'private' | 'friends';
    activityTracking: boolean;
    dataSharingThirdParty: boolean;
  }