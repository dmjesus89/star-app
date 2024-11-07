import { UserPreferences } from "./user-preferences";

// src/app/models/user.model.ts
export interface User {
    id: string;
    fullname: string;
    email: string;
    password: string;
    phone: string;
    dateOfBirth: string; 
    role: string;
    preferences: UserPreferences;
    createdAt: string;
    updatedAt: string;
    excludedAt: string | null;
}