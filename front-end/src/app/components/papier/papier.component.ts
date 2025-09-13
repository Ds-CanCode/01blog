import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { PostService } from '../../services/post.service';
import { MatDialogModule } from '@angular/material/dialog';



@Component({
  selector: 'app-papier',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, NavbarComponent],
  templateUrl: './papier.component.html',
  styleUrls: ['./papier.component.css']
})


export class PapierComponent {
  title: string = '';
  content: string = '';
  tags: string = '';
  medias: { file: File, type: 'IMAGE' | 'VIDEO', preview: string }[] = [];
  loading: boolean = false;
  titleCount: number = 0;
  contentCount: number = 0;

  constructor(private router: Router, private postService: PostService) { }

  updateTitleCounter() {
    this.titleCount = this.title.length;
  }


  updateContentCounter() {
    this.contentCount = this.content.length;
  }


  isFormValid(): boolean {
    return this.title.trim().length > 0 && this.content.trim().length > 0;
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const type: 'IMAGE' | 'VIDEO' = file.type.startsWith('image') ? 'IMAGE' : 'VIDEO';
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.medias.push({ file, type, preview: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }


  trackByMedia(index: number, media: any): any {
    return media.file.name + media.file.size;
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  removeMedia(media: any) {
    this.medias = this.medias.filter(m => m !== media);
  }

  async createPost() {
    this.loading = true;
    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('content', this.content);
    formData.append('tags', this.tags);

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

    this.postService.addPost(formData,  headers)
      .subscribe({
        next: (res) => {
          this.loading = false;
          this.router.navigate(['/home'])
        },
        error: (err) => console.error('Erreur ❌', err)
      });

    // this.http.post('http://localhost:8080/api/post/create', formData, { headers })
    //   .subscribe({
    //     next: (res) => {
    //       this.loading = false;
    //       this.router.navigate(['/home'])
    //     },
    //     error: (err) => console.error('Erreur ❌', err)
    //   });
  }
}