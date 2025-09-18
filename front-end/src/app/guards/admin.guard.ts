import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { JwtUtils } from '../utils/jwt.utils';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (!this.authService.isLoggedIn()) {
      return this.router.createUrlTree(['/']);
    }

    const token = localStorage.getItem('jwt');
    if (token) {
        const role = JwtUtils.getRoleFromToken(token);
        return role === 'ADMIN' ? true : this.router.createUrlTree(['/']);
    }
    return this.router.createUrlTree(['/']);
  }
}
