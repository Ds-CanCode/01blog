import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
  medias: { file: File | null, type: 'IMAGE' | 'VIDEO', preview: string }[] = [];
  loading: boolean = false;
  titleCount: number = 0;
  contentCount: number = 0;
  isEditMode: boolean = false;
  postId: number | null = null;
  mediasToRemove: string[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private postService: PostService) { }


  ngOnInit() {
    const postIdParam = this.route.snapshot.paramMap.get('id');
    if (postIdParam) {
      this.postId = +postIdParam;
      this.isEditMode = true;
      this.loadPost(this.postId);
    }
  }

  private loadPost(id: number) {
    this.postService.getPost(id).subscribe(post => {
      this.title = post.title;
      this.content = post.description;
      this.medias = post.medias.map((m: any) => ({
        file: null,
        type: m.type as 'IMAGE' | 'VIDEO',
        preview: m.url
      }));
    });
  }


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
    return media.file ? media.file.name + media.file.size : media.preview;
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  removeMedia(media: any) {
    if (!media.file) {
      this.mediasToRemove.push(media.preview);
    }
    this.medias = this.medias.filter(m => m !== media);
  }

  async createPost() {
    this.loading = true;
    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('content', this.content);

    this.medias.forEach((media, index) => {
      if (media.file) {
        formData.append('files', media.file, media.file.name);
        formData.append('types', media.type);
      }
    });

    if (this.isEditMode && this.postId) {

      if (this.mediasToRemove.length > 0) {
        formData.append('mediasToRemove', JSON.stringify(this.mediasToRemove));
      }
      this.postService.editPost(formData, this.postId).subscribe({
        next: (res) => {
          this.loading = false;
          this.router.navigate(['/home'])
        },
        error: (err) => console.error('Erreur ❌', err)
      })

    } else {

      this.postService.addPost(formData)
        .subscribe({
          next: (res) => {
            this.loading = false;
            this.router.navigate(['/home'])
          },
          error: (err) => console.error('Erreur ❌', err)
        });
        
    }
  }
}