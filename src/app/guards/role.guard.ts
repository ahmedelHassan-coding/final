// role.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const allowedRoles = route.data['roles'] as string[];
    const userRole = this.authService.getUser();
    
    // Check if user is logged in and has the required role
    if (userRole && allowedRoles.includes(userRole)) {
      return true;
    }

    // If not logged in, redirect to login
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    // If logged in but wrong role, redirect to unauthorized
    this.router.navigate(['/unauthorized']);
    return false;
  }
}
