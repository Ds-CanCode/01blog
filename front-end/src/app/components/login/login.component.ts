import { Component , Optional} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterModule} from '@angular/router';
// import { RegisterComponent } from '../register/register.component';
import { PopupService } from '../../services/popup.service';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule, MatDialogModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  usernameOrEmail: string = '';
  passwordHash = '';
  rememberMe = false;

  constructor(
    private  popupService: PopupService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private authService: AuthService
  ) {}

  openRegisterFromLogin() {
    this.popupService.openRegisterPopup();
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
  signInWithGoogle(){}
}
