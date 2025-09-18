import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notif } from '../components/notification/notification.component';





@Injectable({
    providedIn: 'root'
})

export class NotifService {
    private apiUrl = 'http://localhost:8080/api/notif';

    constructor(private http: HttpClient) { }


    getNotif(): Observable<Notif[]> {
        const token = localStorage.getItem('jwt');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        return this.http.get<Notif[]>(`${this.apiUrl}`, { headers });
    }

    markAsRead(postId: number): Observable<any> {
        const token = localStorage.getItem('jwt');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.post(`${this.apiUrl}/read/${postId}`, {}, { headers });
    }

    markAllAsRead(): Observable<void> {
        const token = localStorage.getItem('jwt');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.post<void>(`${this.apiUrl}/readall`, null, { headers });
    }

}
