import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';
import { BlogPost } from '../components/home/home.component';



@Injectable({ providedIn: 'root' })

export class PostService {
    private apiUrl = 'http://localhost:8080/api/posts';

    constructor(private http: HttpClient) { }



    getAllPosts(): Observable<BlogPost[]> {
        return this.http.get<BlogPost[]>(`${this.apiUrl}/getAllPosts`);
    }

    getPost(id: Number): Observable<BlogPost> {
        return this.http.get<BlogPost>(`${this.apiUrl}/getPost/${id}`);
    }

    addPost(formData: any) {
        const token = localStorage.getItem('jwt') || '';
        if (!token) return throwError(() => new Error('No JWT token found'));
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
        return this.http.post(`${this.apiUrl}/create`, formData, { headers });
    }

    editPost(formData: any, postId: number) {
        const token = localStorage.getItem('jwt') || '';
        if (!token) return throwError(() => new Error('No JWT token found'));
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
        return this.http.put(`${this.apiUrl}/edit/${postId}`, formData, { headers });
    }
}