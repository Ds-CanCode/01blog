import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { PapierComponent } from '../components/papier/papier.component';
import { NotificationComponent } from "../components/notification/notification.component"
import { ReportComponent } from '../components/report/report';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private loginDialogRef: MatDialogRef<LoginComponent> | null = null;
  private registerDialogRef: MatDialogRef<RegisterComponent> | null = null;
  private papierDialogRef: MatDialogRef<PapierComponent> | null = null;
  private notifDialogRef: MatDialogRef<NotificationComponent> | null = null;
  private reportDialogRef: MatDialogRef<ReportComponent> | null = null;

  constructor(
    private dialog: MatDialog
  ) { }

  closeAllPopups() {
    if (this.loginDialogRef) {
      this.loginDialogRef.close();
      this.loginDialogRef = null;
    }
    if (this.registerDialogRef) {
      this.registerDialogRef.close();
      this.registerDialogRef = null;
    }
    if (this.papierDialogRef) {
      this.papierDialogRef.close();
      this.papierDialogRef = null;
    }
    if (this.notifDialogRef) {
      this.notifDialogRef.close();
      this.notifDialogRef = null;
    }
    if (this.reportDialogRef) {
      this.reportDialogRef.close();
      this.reportDialogRef = null;
    }
  }

  openLoginPopup(): void {
    if (this.loginDialogRef) {
      return;
    }
    this.closeAllPopups();

    this.loginDialogRef = this.dialog.open(LoginComponent, {
      disableClose: false,
    });

    this.loginDialogRef.afterClosed().subscribe(() => {
      this.loginDialogRef = null;
    });
  }

  openRegisterPopup(): void {
    if (this.registerDialogRef) {
      return;
    }
    this.closeAllPopups();

    this.registerDialogRef = this.dialog.open(RegisterComponent, {
      disableClose: false,
    });

    this.registerDialogRef.afterClosed().subscribe(() => {
      this.registerDialogRef = null;
    });
  }

  openPapierPopup(): void {
    if (this.papierDialogRef) {
      return;
    }
    this.closeAllPopups();

    this.papierDialogRef = this.dialog.open(PapierComponent, {
      disableClose: false,
    });

    this.papierDialogRef.afterClosed().subscribe(() => {
      this.papierDialogRef = null;
    });
  }

  openNotification(): void {
    if (this.notifDialogRef) {
      return;
    }
    this.closeAllPopups();

    this.notifDialogRef = this.dialog.open(NotificationComponent, {
      disableClose: false,
    });

    this.notifDialogRef.afterClosed().subscribe(() => {
      this.notifDialogRef = null;
    });
  }

  openReport(): void {
    if (this.reportDialogRef) {
      return;
    }

    this.closeAllPopups();

    this.reportDialogRef = this.dialog.open(ReportComponent, {
      disableClose: false,
    });
    
    this.reportDialogRef.afterClosed().subscribe(() => {
      this.reportDialogRef = null;
    });
  }

}
