import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  constructor(private dialog: MatDialog) {}

  openLoginPopup(): void {
    this.dialog.open(LoginComponent, {
      disableClose: false
    });
  }

  openRegisterPopup(): void {
    this.dialog.open(RegisterComponent, {
      disableClose: false
    });
  }
}
