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

  getUserInfo(userId: number): Observable<UserProfile> {
    const token = localStorage.getItem('jwt') || '';
    if (!token) return throwError(() => new Error('No JWT token found'));
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    return this.http.get<UserProfile>(`${this.apiUrl}/${userId}`, { headers });
  }

  getUserPostInfo(userId: number): Observable<UserPost[]> {
    const token = localStorage.getItem('jwt') || '';
    if (!token) return throwError(() => new Error('No JWT token found'));

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.get<UserPost[]>(`${this.apiUrl}/post/${userId}`, { headers });
  }
}
