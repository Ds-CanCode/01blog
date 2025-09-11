import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PopupService } from '../../services/popup.service';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterModule, NavbarComponent, CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  text = 'Chaque mot devient voyage...'.split('').map(c => c === ' ' ? '\u00A0' : c);
  menuOpen = false;
  constructor(
    private popupService: PopupService
    // public authService: AuthService
  ) { }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
  openLogin() {
    if (this.menuOpen) {
      this.closeMenu();
    }
    this.popupService.openLoginPopup();
  }
}
