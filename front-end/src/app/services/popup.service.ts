import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { PapierComponent } from '../components/papier/papier.component';
@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private loginDialogRef: MatDialogRef<LoginComponent> | null = null;
  private registerDialogRef: MatDialogRef<RegisterComponent> | null = null;
  private papierDialogRef: MatDialogRef<PapierComponent> | null = null;

  constructor(private dialog: MatDialog) { }

  openLoginPopup(): void {
    if (this.loginDialogRef) {
      return;
    }
    this.loginDialogRef = this.dialog.open(LoginComponent, {
      disableClose: false
    });
    this.loginDialogRef.afterClosed().subscribe(() => {
      this.loginDialogRef = null;
    });
  }

  openRegisterPopup(): void {
    if (this.registerDialogRef) return;

    this.registerDialogRef = this.dialog.open(RegisterComponent, {
      disableClose: false
    });

    this.registerDialogRef.afterClosed().subscribe(() => {
      this.registerDialogRef = null;
    });
  }

  openPapierPopup(): void {
    if (this.papierDialogRef) return;

    this.papierDialogRef = this.dialog.open(PapierComponent, {
      disableClose: false
    });

    this.papierDialogRef.afterClosed().subscribe(() => {
      this.papierDialogRef = null;
    });
  }
}
