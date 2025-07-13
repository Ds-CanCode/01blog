import { Component , Optional} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterModule} from '@angular/router';
// import { RegisterComponent } from '../register/register.component';
import { PopupService } from '../../services/popup.service';

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

  constructor(
    private  popupService: PopupService,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {}

  openRegisterFromLogin() {
    this.popupService.openRegisterPopup();
  }
  
  login() {}
  signInWithGoogle(){}
}
