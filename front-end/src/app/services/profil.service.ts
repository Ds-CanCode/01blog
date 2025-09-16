import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MediaDTO } from '../components/home/home.component';
import { UserPost, UserProfile } from '../components/profil/profil.component';





@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:8080/api/profile';

  constructor(private http: HttpClient) {}

  getUserInfo(userId: number | null): Observable<UserProfile> {
    const token = localStorage.getItem('jwt') || '';
    if (!token) return throwError(() => new Error('No JWT token found'));
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    return  userId != null ? this.http.get<UserProfile>(`${this.apiUrl}/${userId}`, { headers }) :this.http.get<UserProfile>(`${this.apiUrl}/me`, { headers });
  }

  getUserPostInfo(userId: number | null): Observable<UserPost[]> {
    const token = localStorage.getItem('jwt') || '';
    if (!token) return throwError(() => new Error('No JWT token found'));

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return userId != null ? this.http.get<UserPost[]>(`${this.apiUrl}/post/${userId}`, { headers }) : this.http.get<UserPost[]>(`${this.apiUrl}/post/me`, { headers });
  }
}
