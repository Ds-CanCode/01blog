import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PostService } from '../../services/post.service';
import { BlogPost } from '../home/home.component';
import { ReportService } from '../../services/report.service';
import { AdminService } from '../../services/admin..service';

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


  constructor(private router: Router, private postService: PostService, private reportService: ReportService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadAllPost();
    this.loadAllReport();
    this.loadAllUsers();
  }

  loadAllPost(): void {
    this.postService.getAllPosts().subscribe({
      next: (res) => {
        this.posts = res.map(post => ({ ...post, selectedMediaIndex: 0 }));
        console.log(this.posts);

      },
      error: (err) => {
        console.error('Erreur chargement Posts:', err);
      }

    })
  }

  loadAllReport(): void {
    this.reportService.getReport().subscribe({
      next: (res) => {
        this.reports = res;
        console.log(this.reports);

      },
      error: (err) => {
        console.error('Erreur chargement Report:', err);
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
        console.error('Erreur chargement Users:', err);
      }
    })
  }

  switchTab(tab: 'users' | 'posts' | 'reports' | 'dashboard'): void {
    this.activeTab = tab;
    this.searchTerm = '';
  }

  toggleBan(user: AdminDTO) {
    // const newStatus = !user.isBanned; // true => banned, false => active
    // this.userService.updateUserStatus(user.id, newStatus).subscribe({
    //   next: () => {
    //     user.isBanned = newStatus; // update local state
    //     console.log(`User ${user.username} is now ${newStatus ? 'banned' : 'active'}`);
    //   },
    //   error: (err) => {
    //     console.error('Erreur mise à jour statut:', err);
    //   }
    // });
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
        console.error('Error Ban User:', err);
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
          console.error('Error deleting post:', err);
        }
      })
    }
  }

  // Report management
  // resolveReport(reportId: number, action: 'resolve' | 'dismiss'): void {
  //   const report = this.reports.find(r => r.id === reportId);
  //   if (report) {
  //     report.status = action === 'resolve' ? 'resolved' : 'dismissed';

  //     if (action === 'resolve' && report.type === 'post') {
  //       // Auto-remove reported post
  //       this.updatePostStatus(report.targetId, 'removed');
  //     } else if (action === 'resolve' && report.type === 'user') {
  //       // Auto-suspend reported user
  //       this.updateUserStatus(report.targetId, 'suspended');
  //     }

  //     console.log(`Report ${reportId} ${action}d`);
  //   }
  // }



  onImageError(event: any): void {
    event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xNSAxNUgyNVYyNUgxNVYxNVoiIGZpbGw9IiNEREREREQiLz4KPC9zdmc+Cg==';
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

  goBack(): void {
    this.router.navigate(['/home']);
  }
}