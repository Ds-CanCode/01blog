import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { UsersComponent } from '../users/users.component';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
// import { ArticleComponent } from '../article/article.component';

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  image: string;
  isVideo: boolean;
  author: {
    name: string;
    avatar: string;
  };
  publishDate: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, UsersComponent, MatDialogModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent {
  AllPosts: BlogPost[] = [];

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.postService.getAllPosts()
      .subscribe({
        next: (res) => {
          this.AllPosts = res;
          console.log(this.AllPosts);
        },
        error: (err) => console.error('Erreur ❌', err)
      });

  }

  onCardClick(id: number) {
    this.router.navigate(['/article', id]);
  }

  
  onImageError(event: any): void {
    event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xNzUgNzVIMjI1VjEyNUgxNzVWNzVaIiBmaWxsPSIjRERERERkIi8+Cjwvc3ZnPgo=';
  }



  showUserList = false;

  toggleUserList() {
    this.showUserList = !this.showUserList;
  }

}
