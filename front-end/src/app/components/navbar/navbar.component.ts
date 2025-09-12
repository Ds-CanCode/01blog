import { Component, HostListener, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { PopupService } from '../../services/popup.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, MatDialogModule, FormsModule, CommonModule],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() bgColor: string = '';
  searchText = '';
  navbarHidden = false;
  lastScrollTop = 0;
  menuOpen = false;
  
  constructor(
    private popupService: PopupService,
    public authService: AuthService,
    private router: Router
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

  openRegister() {
    if (this.menuOpen) {
      this.closeMenu();
    }
    this.popupService.openRegisterPopup();
  }

  openPapier() {
    this.router.navigate(['/home']);
   
    // if (this.menuOpen) {
    //   this.closeMenu();
    // }
    // this.popupService.openPapierPopup();
  }

  openNotification() {
    if (this.menuOpen) {
      this.closeMenu();
    }
    this.popupService.openNotification();
  }




  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDiff = scrollTop - this.lastScrollTop;
    if (scrollDiff > 5) {
      this.navbarHidden = true;
    } else if (scrollDiff < -5) {
      this.navbarHidden = false;
    }
    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }
}
