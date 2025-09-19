import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminDTO } from '../components/admin/admin.component';


@Injectable({
    providedIn: 'root'
})

export class ReportService {
    private apiUrl = 'http://localhost:8080/api/reports';
    private apiUrlUser = 'http://localhost:8080/api/admin';

    constructor(private http: HttpClient) { }

    addReport(userId: number, reason: FormData): Observable<any> {
        const token = localStorage.getItem('jwt');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.post(`${this.apiUrl}/${userId}`, reason, { headers });
    }

    getReport(): Observable<any> {
        const token = localStorage.getItem('jwt');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.get(`${this.apiUrl}/all`, { headers });
    }

    getAllUsers(): Observable<AdminDTO[]> {
        const token = localStorage.getItem('jwt');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.get<AdminDTO[]>(`${this.apiUrlUser}/allusers`, { headers });
    }
}