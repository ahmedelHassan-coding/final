// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = 'http://localhost:8000/api'; 

  constructor(private http: HttpClient) {}

  // Student Registration
  registerStudent(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/student/register`, data);
  }
  

  // Company Registration
  registerCompany(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/company/register`, data);
  }

  // Login
  studentLogin(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/student/login`, credentials);
  }

 
  // Logout
  logout(): Observable<any> {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return this.http.post(`${this.baseUrl}/student/logout`, {});
  }

  storeUserSession(data: any): void {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', data.user); 
  }

  // Get current user
  getUser(): string | null {
    return localStorage.getItem('user');
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
