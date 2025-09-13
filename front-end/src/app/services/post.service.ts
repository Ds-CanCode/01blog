import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { BlogPost } from '../components/home/home.component';



@Injectable({ providedIn: 'root' })

export class PostService {
    private apiUrl = 'http://localhost:8080/api/posts';

    constructor(private http: HttpClient) {}

    

    getAllPosts(): Observable<BlogPost[]> {
        return this.http.get<BlogPost[]>(`${this.apiUrl}/getAllPosts`);
    }

    getPost(id: Number): Observable<BlogPost> {
        return this.http.get<BlogPost>(`${this.apiUrl}/getPost/${id}`);
    }

    addPost(formData: any, headers: HttpHeaders){
        return this.http.post(`${this.apiUrl}/create`, formData, { headers });
    }
}