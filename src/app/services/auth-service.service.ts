// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8000/api'; // Update to your Laravel backend URL

  constructor(private http: HttpClient) {}

  // Student Registration
  registerStudent(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/student/register`, data);
  }
  

  // Company Registration
  registerCompany(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/company/register`, data);
  }

  studentLogin(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/student/login`, credentials);
  }

  // Company Login
  // companyLogin(credentials: any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/company/login`, credentials);
  // }

  // Logout
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // Store token & user info
  storeUserSession(data: any): void {
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }

  // Get current user
  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Get token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Check login status
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  
}
