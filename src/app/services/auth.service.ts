// services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<User> {
    // Implement login logic
    return this.http.post<User>('/api/auth/login', { email, password });
  }

  logout(): void {
    this.currentUserSubject.next(null);
    // Additional logout logic
  }

  signup(userData: Partial<User>): Observable<User> {
    return this.http.post<User>('/api/auth/signup', userData);
  }
}

