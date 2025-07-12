import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterModule} from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [FormsModule, MatDialogModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private dialogRef: MatDialogRef<RegisterComponent>) {}

  register() {
    console.log('Register:', {
      username: this.username,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    });
    this.dialogRef.close();
  }
}
