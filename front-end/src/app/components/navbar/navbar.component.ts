import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, MatDialogModule],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private popupService: PopupService) { }

  openLogin() {
    this.popupService.openLoginPopup();
  }

  openRegister() {
    this.popupService.openRegisterPopup();
  }
}
