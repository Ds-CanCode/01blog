import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LikeInfo {
    likesCount: number;
    userLiked: boolean;
}

@Injectable({
    providedIn: 'root'
})

export class LikeService {
    private apiUrl = 'http://localhost:8080/api/likes';

    constructor(private http: HttpClient) { }

    addLike(postId: number): Observable<any> {
        const token = localStorage.getItem('jwt');
        console.log(token);

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        return this.http.post(`${this.apiUrl}/${postId}`, {}, { headers });
    }

    getLikeInfo(postId: number): Observable<LikeInfo> {
        const token = localStorage.getItem('jwt');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        return this.http.get<LikeInfo>(`${this.apiUrl}/like-info/${postId}`, { headers });
    }
}
