import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { QuillModule } from 'ngx-quill';
import { PopupService } from '../../services/popup.service';
import { Router } from '@angular/router';

interface MediaFile {
  file: File;
  url: string;
  type: string;
  name: string;
  size: string;
}

@Component({
  selector: 'app-papier',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    QuillModule
  ],
  templateUrl: './papier.component.html',
  styleUrls: ['./papier.component.css']
})
export class PapierComponent {
  postContent: string = '';
  selectedFiles: MediaFile[] = [];
  isSubmitting: boolean = false;
  maxFileSize: number = 50 * 1024 * 1024; // 50MB
  maxFiles: number = 10;

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private popupService: PopupService,
    private dialogRef: MatDialogRef<PapierComponent>,
    private router: Router
  ) {}

  // Gestion du changement de contenu Quill
  onContentChanged(event: any) {
    this.postContent = event.html || '';
  }

  openFileDialog() {
    if (this.selectedFiles.length >= this.maxFiles) {
      alert(`Vous ne pouvez sélectionner que ${this.maxFiles} fichiers maximum.`);
      return;
    }
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const files = Array.from(event.target.files) as File[];
    
    if (this.selectedFiles.length + files.length > this.maxFiles) {
      alert(`Vous ne pouvez sélectionner que ${this.maxFiles} fichiers maximum.`);
      return;
    }

    files.forEach(file => {
      // Vérifier la taille du fichier
      if (file.size > this.maxFileSize) {
        alert(`Le fichier "${file.name}" est trop volumineux (max: 50MB).`);
        return;
      }

      // Vérifier le type de fichier
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        alert(`Le fichier "${file.name}" n'est pas un format supporté.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedFiles.push({
          file,
          url: e.target.result,
          type: file.type,
          name: file.name,
          size: this.formatFileSize(file.size)
        });
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    event.target.value = '';
  }

  removeFile(index: number) {
    const file = this.selectedFiles[index];
    // Libérer la mémoire de l'URL
    URL.revokeObjectURL(file.url);
    this.selectedFiles.splice(index, 1);
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  canSubmit(): boolean {
    return !this.isSubmitting && 
           (this.postContent.trim().length > 0 || this.selectedFiles.length > 0);
  }

  submitPost() {
    if (!this.canSubmit()) {
      alert('Veuillez ajouter du contenu ou des fichiers avant de publier.');
      return;
    }

    this.isSubmitting = true;
    
    try {
      const formData = new FormData();
      formData.append('content', this.postContent.trim());
      
      // Ajouter chaque fichier
      this.selectedFiles.forEach((mediaFile, index) => {
        formData.append('files', mediaFile.file, mediaFile.file.name);
      });

      // Ajouter des métadonnées
      formData.append('fileCount', this.selectedFiles.length.toString());
      formData.append('timestamp', new Date().toISOString());

      console.log('Post prêt à envoyer !', {
        content: this.postContent,
        filesCount: this.selectedFiles.length,
        files: this.selectedFiles.map(f => ({
          name: f.name,
          type: f.type,
          size: f.size
        }))
      });

      // TODO: Remplacer par l'appel HTTP vers votre backend Spring Boot
      // await this.postService.createPost(formData);

      alert('Post publié avec succès !');
      
      // Fermer la popup après un délai
      setTimeout(() => {
        this.closePopup();
      }, 1000);

    } catch (error) {
      console.error('Erreur lors de la publication:', error);
      alert('Erreur lors de la publication du post.');
    } finally {
      this.isSubmitting = false;
    }
  }

  closePopup() {
    // Demander confirmation si du contenu a été saisi
    if ((this.postContent.trim() || this.selectedFiles.length > 0) && !this.isSubmitting) {
      const confirmClose = confirm('Êtes-vous sûr de vouloir fermer ? Votre contenu sera perdu.');
      if (!confirmClose) return;
    }

    // Nettoyer les URLs des fichiers pour éviter les fuites mémoire
    this.selectedFiles.forEach(file => {
      URL.revokeObjectURL(file.url);
    });

    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  // Méthode pour gérer les raccourcis clavier
  onKeyDown(event: KeyboardEvent) {
    // Ctrl/Cmd + Enter pour soumettre
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      this.submitPost();
    }
    
    // Escape pour fermer
    if (event.key === 'Escape') {
      event.preventDefault();
      this.closePopup();
    }
  }
}