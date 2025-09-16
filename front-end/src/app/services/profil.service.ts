import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UserInfo } from '../components/profil/profil.component';

// export interface UserInfo {
//   id: number;
//   username: string;
//   email: string;
//   createdAt: string;
//   profileImage?: string; 
//   coverImage?: string;
//   followersCount: number;
//   followingCount: number;
//   // posts?: Post[];
// }

// export interface Post {
//   id: number;
//   title: string;
//   description: string;
//   medias?: string[];
//   createdAt: string;
// }

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:8080/api/profile';

  constructor(private http: HttpClient) {}

  getUserInfo(userId: number): Observable<UserInfo> {
    const token = localStorage.getItem('jwt') || '';
    if (!token) return throwError(() => new Error('No JWT token found'));
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    return this.http.get<UserInfo>(`${this.apiUrl}/${userId}`, { headers });
  }
}
