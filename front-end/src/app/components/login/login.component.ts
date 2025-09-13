import { Component, Optional } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
// import { RegisterComponent } from '../register/register.component';
import { PopupService } from '../../services/popup.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule, MatDialogModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  usernameOrEmail: string = '';
  password = '';
  message = '';
  rememberMe = false;
  showPassword = false;
  isOverlayVisible = true;

  constructor(
    private popupService: PopupService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private authService: AuthService,
    private router: Router
  ) { }

  openRegisterFromLogin() {
    this.popupService.openRegisterPopup();
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  login() {
    const user = {
      usernameOrEmail: this.usernameOrEmail,
      password: this.password
    };

    this.authService.loginUser(user).subscribe({
      next: (response) => {
        console.log('✅ Token reçu :', response.token);
        this.router.navigate(['/home']);
        this.closePopup();
      },
      error: (err: any) => {
         console.log('Err :', err.error.message);
        this.message = err.error.message ;
      }

    });
  }
  signInWithGoogle() { }
  closePopup() {
    if (this.dialogRef) {
      this.isOverlayVisible = false;
      this.dialogRef.close();
    }
  }
  
}