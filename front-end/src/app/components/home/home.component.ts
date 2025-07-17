import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { UsersComponent } from '../users/users.component';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
// import { ArticleComponent } from '../article/article.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, RouterModule, CommonModule, UsersComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  showUserList = false;

  toggleUserList() {
    this.showUserList = !this.showUserList;
  }

}
