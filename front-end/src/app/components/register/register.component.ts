import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [FormsModule, MatDialogModule, RouterModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  message = '';
  // previewUrl: string | ArrayBuffer | null = "profil.jpg";

  constructor(
    private dialogRef: MatDialogRef<RegisterComponent>,
    private authService: AuthService
  ) {}


  // onPhotoSelected(event: any): void {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.previewUrl = reader.result;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  register() {
    const user = { username: this.username, email: this.email, password: this.password };
    this.authService.register(user).subscribe({
      next: () => this.message = 'Inscription réussie !',
      error: (err: { error: { message: string; }; }) => this.message = 'Erreur: ' + err.error.message
    });
  }

  // register() {
  //   if (this.password !== this.confirmPassword) {
  //     alert("Les mots de passe ne correspondent pas !");
  //     return;
  //   }

  //   const user = {
  //     username: this.username,
  //     email: this.email,
  //     password: this.password
  //   };

  //   this.authService.register(user).subscribe({
  //     next: (response) => {
  //       console.log('Inscription réussie', response);
  //       alert('Inscription réussie !');
  //       // this.dialogRef.close(); // ferme le dialogue
  //     },
  //     error: (err) => {
  //       console.error('Erreur lors de l\'inscription', err);
  //       alert('Erreur lors de l\'inscription');
  //     }
  //   });
    // console.log('Register:', {
    //   username: this.username,
    //   email: this.email,
    //   password: this.password,
    //   confirmPassword: this.confirmPassword,
    // });
    close() {
      this.dialogRef.close();
    }
  }

