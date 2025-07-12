import { Component , Optional} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterModule} from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule, MatDialogModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';
  rememberMe = false;

  constructor(@Optional() private dialogRef: MatDialogRef<LoginComponent>) {}

 
  login() {
    console.log('Login:', {
      email: this.email,
      password: this.password,
      rememberMe: this.rememberMe,
    });
    this.dialogRef.close();
  }
}
