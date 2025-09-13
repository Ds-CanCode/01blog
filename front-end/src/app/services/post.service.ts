import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface Author {
  name: string;
  avatar: string;
}

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  image: string;
  isVideo: boolean;
  author: Author;
  publishDate: string;
}


@Injectable({ providedIn: 'root' })

export class PostService {
    private apiUrl = 'http://localhost:8080/api/post';

    constructor(private http: HttpClient) {}

    

    getAllPosts(): Observable<BlogPost[]> {
        return this.http.get<BlogPost[]>(`${this.apiUrl}/getAllPosts`);
    }

    getArticle(): Observable<BlogPost[]> {
        return this.http.get<BlogPost[]>(`${this.apiUrl}/getArticle`);
    }

    addPost(formData: any, headers: HttpHeaders){
        return this.http.post(`${this.apiUrl}/create`, formData, { headers });
    }
}