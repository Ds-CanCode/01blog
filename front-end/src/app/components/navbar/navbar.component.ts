import { Component, HostListener} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { PopupService } from '../../services/popup.service';
import { FormsModule } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, MatDialogModule, FormsModule],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {
  searchText = '';
  navbarHidden = false;
  lastScrollTop = 0;

  constructor(private popupService: PopupService) { }

  openLogin() {
    this.popupService.openLoginPopup();
  }

  openRegister() {
    this.popupService.openRegisterPopup();
  }



  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDiff = scrollTop - this.lastScrollTop;
    if (scrollDiff > 5) {
      this.navbarHidden = true;
    } else if (scrollDiff < -10) {
      this.navbarHidden = false;
    }
    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }
}
