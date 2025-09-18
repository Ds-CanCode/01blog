import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class ReportService {
    private apiUrl = 'http://localhost:8080/api/reports';

    constructor(private http: HttpClient) { }

    addReport(userId: number, reason: FormData): Observable<any> {
        const token = localStorage.getItem('jwt');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.post(`${this.apiUrl}/${userId}`, reason, { headers });
    }
}