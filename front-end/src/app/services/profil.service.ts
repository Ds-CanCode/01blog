import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserInfo {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  profileImage?: string; // Base64 ou URL
  coverImage?: string;   // Base64 ou URL
  followersCount: number;
  followingCount: number;
  posts?: Post[];        // optionnel si tu veux les posts
}

export interface Post {
  id: number;
  title: string;
  description: string;
  medias?: string[]; // tableau de medias
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:8080/api/profile';

  constructor(private http: HttpClient) {}

  getUserInfo(userId: number): Observable<UserInfo> {
    const token = localStorage.getItem('jwt') || '';
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    return this.http.get<UserInfo>(`${this.apiUrl}/${userId}`, { headers });
  }
}
