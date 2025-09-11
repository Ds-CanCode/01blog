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
  profileImageFile: File | null = null;
  coverImageFile: File | null = null;

  


  constructor(
    private dialogRef: MatDialogRef<RegisterComponent>,
     private popupService: PopupService,
    private authService: AuthService
  ) {}

    togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onProfileImageSelected(event: any) {
    this.profileImageFile = event.target.files[0];
  }

  onCoverImageSelected(event: any) {
    this.coverImageFile = event.target.files[0];
  }

  register() {
    const user = { username: this.username, email: this.email, password: this.password };
    this.authService.register(user).subscribe({
      next: () => this.message = 'Inscription réussie !',
      error: (err: { error: { message: string; }; }) => this.message = 'Erreur: ' + err.error.message
    });
  }
  openLoginFromRegister(){
    this.popupService.openLoginPopup();
  }

  closePopup() {
    if (this.dialogRef) {
      this.isOverlayVisible = false;
      this.dialogRef.close();
    }
  }
}

