import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AdminDTO } from '../components/admin/admin.component';


@Injectable({
    providedIn: 'root'
})

export class AdminService {
    private apiUrl = 'http://localhost:8080/api/admin';

    constructor(private http: HttpClient) { }

    getAllUsers(): Observable<AdminDTO[]> {
        const token = localStorage.getItem('jwt');
        if (!token) return throwError(() => new Error('No JWT token found'));

        const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
        
        return this.http.get<AdminDTO[]>(`${this.apiUrl}/allusers`, { headers });
    }

    deletePost(postId: number): Observable<any> {
        const token = localStorage.getItem('jwt') || '';
        if (!token) return throwError(() => new Error('No JWT token found'));
    
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    
        return this.http.delete(`${this.apiUrl}/delete/${postId}`, { headers });
    }

    banUser(userId: number): Observable<any> {
        const token = localStorage.getItem('jwt') || '';
        if (!token) return throwError(() => new Error('No JWT token found'));
    
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    
        return this.http.post(`${this.apiUrl}/ban/${userId}`, {}, { headers });
    }
}