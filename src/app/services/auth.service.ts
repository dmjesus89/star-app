// src/app/services/auth.service.ts
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationResponse } from '../models/authentication-response';
import { AuthenticationRequest } from '../models/authentication-request';
import { UserCreate } from '../models/user-create';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost/api';
  private currentUserSubject: BehaviorSubject<AuthenticationResponse | null>;
  public currentUser$: Observable<AuthenticationResponse | null>;
  private tokenKey = 'auth_token';
  private userKey = 'user';
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.currentUserSubject = new BehaviorSubject<AuthenticationResponse | null>(
      this.getUserFromStorage()
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  private getUserFromStorage(): AuthenticationResponse | null {
    if (!this.isBrowser) {
      return null;
    }
    const token = localStorage.getItem(this.tokenKey);
    const user = localStorage.getItem(this.userKey);
    return token && user ? JSON.parse(user) : null;
  }

  public get currentUserValue(): AuthenticationResponse | null {
    return this.currentUserSubject.value;
  }

  login(credentials: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(response => this.handleAuthentication(response)),
        catchError(this.handleError)
      );
  }

  register(userData: UserCreate): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/users`, userData)
      .pipe(
        tap(response => this.handleAuthentication(response)),
        catchError(this.handleError)
      );
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/forgot-password`, { email })
      .pipe(catchError(this.handleError));
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.userKey);
    }
    this.currentUserSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  getToken(): string | null {
    return this.isBrowser ? localStorage.getItem(this.tokenKey) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private handleAuthentication(response: AuthenticationResponse): void {
    if (this.isBrowser && response.token) {
      localStorage.setItem(this.tokenKey, response.token);
      localStorage.setItem(this.userKey, JSON.stringify(response));
    }
    this.currentUserSubject.next(response);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      errorMessage = error.error.message;

    }

    return throwError(() => new Error(errorMessage));
  }
}