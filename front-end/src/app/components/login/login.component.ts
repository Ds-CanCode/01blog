import { Component, Optional } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
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
  passwordHash = '';
  rememberMe = false;
  showPassword = false;
  isOverlayVisible = true;

  constructor(
    private popupService: PopupService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private authService: AuthService
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
      passwordHash: this.passwordHash
    };

    this.authService.login(user).subscribe({
      next: (response) => {
        console.log('✅ Token reçu :', response.token);
      },
      error: (err) => {
        console.error('❌ Erreur de login:', err);
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

// import { Component, Optional } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
// import { RouterModule } from '@angular/router';
// import { PopupService } from '../../services/popup.service';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   standalone: true,
//   selector: 'app-login',
//   imports: [FormsModule, MatDialogModule, RouterModule],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent {
//   usernameOrEmail: string = '';
//   passwordHash = '';
//   rememberMe = false;
//   showPassword = false;

//   constructor(
//     private popupService: PopupService,
//     @Optional() private dialogRef: MatDialogRef<LoginComponent>,
//     private authService: AuthService
//   ) {}

//   openRegisterFromLogin() {
//     this.popupService.openRegisterPopup();
//     if (this.dialogRef) {
//       this.dialogRef.close();
//     }
//   }

//   togglePasswordVisibility() {
//     this.showPassword = !this.showPassword;
//   }

//   login() {
//     const user = {
//       usernameOrEmail: this.usernameOrEmail,
//       passwordHash: this.passwordHash
//     };

//     this.authService.login(user).subscribe({
//       next: (response) => {
//         console.log('✅ Token reçu :', response.token);
//         if (this.dialogRef) {
//           this.dialogRef.close(response);
//         }
//       },
//       error: (err) => {
//         console.error('❌ Erreur de login:', err);
//       }
//     });
//   }

//   signInWithGoogle() {
//     // Implémentation Google Sign-In
//     console.log('Google Sign-In clicked');
//   }

//   closeDialog() {
//     if (this.dialogRef) {
//       this.dialogRef.close();
//     }
//   }
// }