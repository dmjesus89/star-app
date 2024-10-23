// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`);
  }

  updateProfile(userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/me`, userData);
  }

  getUserSettings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me/settings`);
  }

  updateUserSettings(settings: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/me/settings`, settings);
  }

  updatePassword(passwordData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/me/password`, passwordData);
  }

  deleteAccount(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/me`);
  }
}