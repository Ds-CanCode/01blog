import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { BlogPost } from '../components/home/home.component';



@Injectable({ providedIn: 'root' })

export class PostService {
    private apiUrl = 'http://localhost:8080/api/posts';

    constructor(private http: HttpClient) { }



    getAllPosts(page: number, size: number = 10): Observable<BlogPost[]> {
        const token = localStorage.getItem('jwt') || '';
        if (!token) return throwError(() => new Error('No JWT token found'));
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
        return this.http.get<BlogPost[]>(`${this.apiUrl}/getAllPosts?page=${page}&size=${size}`, { headers });
    }

    getPost(id: Number): Observable<BlogPost> {
        const token = localStorage.getItem('jwt') || '';
        if (!token) return throwError(() => new Error('No JWT token found'));
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
        return this.http.get<BlogPost>(`${this.apiUrl}/getPost/${id}`, { headers });
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