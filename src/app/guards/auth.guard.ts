import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';

@Injectable({ providedIn: 'root' })
export class LoginPageGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = localStorage.getItem('user');
    if (user) {
      if (user === 'student') {
        this.router.navigate(['/graduate-profile']);
      } else if (user === 'company') {
        this.router.navigate(['/companypreview']);
      } 
      return false;
    }

    return true;
  }
}
