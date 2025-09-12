import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-papier',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './papier.component.html',
  styleUrls: ['./papier.component.css']
})


export class PapierComponent {
  content: string = '';
  medias: { file: File, type: 'IMAGE' | 'VIDEO' }[] = [];

  constructor(private http: HttpClient) { }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const type: 'IMAGE' | 'VIDEO' = file.type.startsWith('image') ? 'IMAGE' : 'VIDEO';
      this.medias.push({ file, type });
    }
  }


  async createPost() {
    const formData = new FormData();
    formData.append('content', this.content);

    this.medias.forEach((media, index) => {
      formData.append('files', media.file, media.file.name);
      formData.append(`types`, media.type);
    });

   
    const token = localStorage.getItem('jwt');
    if (!token) {
      console.error('Token JWT manquant côté front');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    this.http.post('http://localhost:8080/api/post/create', formData, { headers })
      .subscribe({
        next: (res) => console.log('Post créé ✅', res),
        error: (err) => console.error('Erreur ❌', err)
      });
  }
}