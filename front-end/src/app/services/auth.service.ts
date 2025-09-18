import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { JwtUtils } from '../utils/jwt.utils';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';


  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user: any) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  loginUser(user: any): Observable<{ token: string, id: number }> {
    return this.http.post<{ token: string; id: number }>(`${this.apiUrl}/login`, user)
      .pipe(
        tap(response => {
          localStorage.setItem('jwt', response.token);
          localStorage.setItem('userId', response.id.toString())
        })
      );
  }

  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('userId')
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt');
  }

  getRole(): string | null {
    const token = localStorage.getItem('jwt');
    return token ? JwtUtils.getRoleFromToken(token) : null;
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }
}
