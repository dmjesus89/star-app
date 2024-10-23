export interface Address {
    id: string;
    userId: string;
    fullName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
    isDefault: boolean;
    createdAt: Date;
    updatedAt: Date;
  }