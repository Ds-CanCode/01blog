import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
// import { HttpClientModule } from '@angular/common/http';
import { PopupService } from '../../services/popup.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [FormsModule, MatDialogModule, RouterModule, CommonModule, MatIconModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  message = '';
  isOverlayVisible = true;
  showPassword = false;
  profileImageFile: string | ArrayBuffer | null = null;
  coverImageFile: string | ArrayBuffer | null = null;

  profileImageData: File | null = null;
  coverImageData: File | null = null;



  constructor(
    private dialogRef: MatDialogRef<RegisterComponent>,
    private popupService: PopupService,
    private authService: AuthService
  ) { }


  isFormValid(): boolean {
    return this.username.trim() !== '' &&
      this.email.trim() !== '' &&
      this.password.trim() !== '' &&
      this.confirmPassword.trim() !== '' &&
      this.password === this.confirmPassword;
  }


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onCoverImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.coverImageData = file;
      const reader = new FileReader();
      reader.onload = () => this.coverImageFile = reader.result;
      reader.readAsDataURL(file);
    }
  }

  onProfileImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.profileImageData = file;
      const reader = new FileReader();
      reader.onload = () => this.profileImageFile = reader.result;
      reader.readAsDataURL(file);
    }
  }

  register() {
    if (this.password !== this.confirmPassword) {
      this.message = "Les mots de passe ne correspondent pas !";
      return;
    }

    const formData = new FormData();
    formData.append('username', this.username);
    formData.append('email', this.email);
    formData.append('password', this.password);

    if (this.profileImageData) formData.append('profileImage', this.profileImageData);
    if (this.coverImageData) formData.append('coverImage', this.coverImageData);

      this.authService.registerUser(formData).subscribe({
        next: () => this.message = 'Inscription réussie !',
        error: (err: { error: { message: string; }; }) => this.message = 'Erreur: ' + err.error.message
      });
  }
  openLoginFromRegister() {
    this.popupService.openLoginPopup();
  }

  closePopup() {
    if (this.dialogRef) {
      this.isOverlayVisible = false;
      this.dialogRef.close();
    }
  }
}

