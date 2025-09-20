import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from '../users/users.component';
import { Router, RouterModule } from '@angular/router';
import { PostService } from '../../services/post.service';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';


export interface MediaDTO {
  url: string;
  type: 'IMAGE' | 'VIDEO';
}

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  medias: MediaDTO[];
  author: {
    id: number;
    name: string;
    avatar: string;
  };
  publishDate: string;
  selectedMediaIndex: number;
}


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, UsersComponent, MatDialogModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit  {
  AllPosts: BlogPost[] = [];
  showUserList = false;

  constructor(private postService: PostService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.postService.getAllPosts()
      .subscribe({
        next: (res) => {
          this.AllPosts = res.map(post => ({ ...post, selectedMediaIndex: 0 }));;
          console.log(this.AllPosts);
        },
        error: (err) => {
          console.error('Erreur ', err)
          if (err.status === 401) {
            this.authService.logout()
          }
        }
      });

  }

  onCardClick(id: number) {
    this.router.navigate(['/article', id]);
  }

  onUserClick(userId: number, event: Event) {
    event.stopPropagation(); 
    this.router.navigate(['/profil', userId]);
  }

  prevMedia(post: any, event: Event) {
    event.stopPropagation();
    if (post.selectedMediaIndex > 0) {
      post.selectedMediaIndex--;
    } else {
      post.selectedMediaIndex = post.medias.length - 1;
    }
  }

  nextMedia(post: any, event: Event) {
    event.stopPropagation();
    if (post.selectedMediaIndex < post.medias.length - 1) {
      post.selectedMediaIndex++;
    } else {
      post.selectedMediaIndex = 0;
    }
  }

  toggleUserList() {
    this.showUserList = !this.showUserList;
  }

}
