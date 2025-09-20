import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface CommentDTO {
  id: number;
  content: string;
  postId: number;
  userId: number;
  username: string;
  avatar?: string;
  createDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:8080/api/comments';

  constructor(private http: HttpClient) { }

  addComment(postId: number, content: string): Observable<CommentDTO> {
    const token = localStorage.getItem('jwt') || '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body = { content };
    return this.http.post<CommentDTO>(`${this.apiUrl}/${postId}`, body, { headers });
  }

  getComments(postId: number, page: number, size: number): Observable<CommentDTO[]> {
    return this.http.get<CommentDTO[]>(`${this.apiUrl}/post/${postId}?page=${page}&size=${size}`);
  }
}
