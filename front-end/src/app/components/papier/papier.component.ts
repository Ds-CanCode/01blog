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
  medias: { base64: string, type: string }[] = [];

  constructor(private http: HttpClient) { }

  async onFileSelected(event: any) {
    const files: FileList = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const base64 = await this.toBase64(file);
      const type = file.type.startsWith('image') ? 'IMAGE' : 'VIDEO';
      this.medias.push({ base64, type });
    }
  }

  toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = error => reject(error);
    });
  }

  createPost() {
    const postDTO = {
      content: this.content,
      medias: this.medias
    };

    const token = localStorage.getItem('jwt');
    if (!token) {
      console.error("Token JWT manquant côté front");
      return;
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    this.http.post('http://localhost:8080/api/post/create', postDTO, { headers })
      .subscribe({
        next: res => console.log('Post créé ✅', res),
        error: err => console.error('Erreur ❌', err)
      });
  }
}