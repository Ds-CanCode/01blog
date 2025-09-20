import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PostService } from '../../services/post.service';
import { BlogPost } from '../home/home.component';
import { ReportService } from '../../services/report.service';
import { AdminService } from '../../services/admin..service';
import { AuthService } from '../../services/auth.service';

export interface AdminDTO {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  isBanned: boolean;
  profileImage?: string;
}


export interface Post {
  id: number;
  title: string;
  description: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  publishDate: string;
}

export interface Report {
  id: number;
  reason: string;
  createdAt: string;
  reporterUsername: string;
  reportedUsername: string;
}


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule,],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  activeTab: 'users' | 'posts' | 'reports' | 'dashboard' = 'dashboard';
  searchTerm = '';
  users: AdminDTO[] = [];
  posts: BlogPost[] = [];
  reports: Report[] = [];
  page: number = 0;
  loading: boolean = false;
  noMorePosts: boolean = false;

  constructor(private router: Router, private postService: PostService, private reportService: ReportService, private adminService: AdminService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadAllPost();
    this.loadAllReport();
    this.loadAllUsers();
  }

  loadAllPost(): void {
    if (this.loading || this.noMorePosts) return;
    this.loading = true;

    this.postService.getAllPosts(this.page).subscribe({
      next: (res) => {
        if (res.length === 0) {
          this.noMorePosts = true;
        } else {
          this.posts.push(...res.map(post => ({ ...post, selectedMediaIndex: 0 })));
          this.page++;
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur ', err);
        this.loading = false;
        if (err.status === 401) this.authService.logout();
      }
    });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      this.loadAllPost();
    }
  }

  loadAllReport(): void {
    this.reportService.getReport().subscribe({
      next: (res) => {
        this.reports = res;
        console.log(this.reports);

      },
      error: (err) => {
        console.error('Erreur ', err)
        if (err.status === 401 ) {
          this.authService.logout()
        }
      }
    })
  }

  loadAllUsers(): void {
    this.adminService.getAllUsers().subscribe({
      next: (res) => {
        this.users = res;
        console.log(this.users);

      },
      error: (err) => {
        console.error('Erreur ', err)
        if (err.status === 401) {
          this.authService.logout()
        }
      }
    })
  }


  banUser(userId: number): void {
    this.adminService.banUser(userId).subscribe({
      next: () => {
        this.users = this.users.map(u => {
          if (u.id === userId) {
            return { ...u, isBanned: !u.isBanned };
          }
          return u;
        });
        console.log('User Ban Or UnBan:', userId);
      },
      error: (err) => {
        console.error('Erreur ', err)
        if (err.status === 401) {
          this.authService.logout()
        }
      }
    })
  }


  deletePost(postId: number): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.adminService.deletePost(postId).subscribe({
        next: () => {
          this.posts = this.posts.filter(p => p.id !== postId);
          console.log('Post deleted:', postId);
        },
        error: (err) => {
          console.error('Erreur ', err)
          if (err.status === 401) {
            this.authService.logout()
          }
        }
      })
    }
  }



  onImageError(event: any): void {
    event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xNSAxNUgyNVYyNUgxNVYxNVoiIGZpbGw9IiNEREREREQiLz4KPC9zdmc+Cg==';
  }

  switchTab(tab: 'users' | 'posts' | 'reports' | 'dashboard'): void {
    this.activeTab = tab;
    this.searchTerm = '';
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

  onCardClick(id: number) {
    this.router.navigate(['/article', id]);
  }

  onUserClick(userId: number, event: Event) {
    event.stopPropagation();
    this.router.navigate(['/profil', userId]);
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}