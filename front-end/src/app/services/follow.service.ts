import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Following } from '../components/users/users.component';


@Injectable({
    providedIn: 'root'
})

export class FollowService {
    private apiUrl = 'http://localhost:8080/api/follow';

    constructor(private http: HttpClient) { }

    follow(userId: number): Observable<any> {
        const token = localStorage.getItem('jwt');
        console.log(token);

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        return this.http.post(`${this.apiUrl}/${userId}`, {}, { headers });
    }

    isfollow(userId: number): Observable<any> {
        const token = localStorage.getItem('jwt');
        console.log(token);

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        return this.http.get(`${this.apiUrl}/check/${userId}`, { headers });
    }

    getAllFollowing(): Observable<Following[]> {
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Following[]>(`${this.apiUrl}/allfollowing`, { headers });
  }
}
