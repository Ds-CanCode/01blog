import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient,  private router: Router) {}

  registerUser(user: any) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  loginUser(user: any): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, user)
      .pipe(
        tap(response => {
          localStorage.setItem('jwt', response.token); 
        })
      );
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt');
  }
}
