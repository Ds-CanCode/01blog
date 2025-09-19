import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PostService } from '../../services/post.service';
import { BlogPost } from '../home/home.component';
import { ReportService } from '../../services/report.service';

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  joinDate: string;
  postsCount: number;
  status: 'active' | 'suspended' | 'banned';
  role: 'user' | 'admin';
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



  // Sample data - in real app, this would come from your service
  users: User[] = [
    {
      id: 1,
      name: 'Ahmed Benali',
      email: 'ahmed.benali@email.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      joinDate: '2024-01-15',
      postsCount: 15,
      status: 'active',
      role: 'user'
    },
    {
      id: 2,
      name: 'Sara Alami',
      email: 'sara.alami@email.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      joinDate: '2024-02-20',
      postsCount: 8,
      status: 'suspended',
      role: 'user'
    },
    {
      id: 3,
      name: 'Omar Tazi',
      email: 'omar.tazi@email.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      joinDate: '2023-11-10',
      postsCount: 23,
      status: 'active',
      role: 'admin'
    },
    {
      id: 4,
      name: 'Fatima Zahra',
      email: 'fatima.zahra@email.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      joinDate: '2024-03-05',
      postsCount: 12,
      status: 'banned',
      role: 'user'
    }
  ];

  posts: BlogPost[] = [];

  reports: Report[] = [];


  constructor(private router: Router, private postService: PostService, private reportService: ReportService) { }

  ngOnInit(): void {
    this.loadAllPost();
    this.loadAllReport();
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

  switchTab(tab: 'users' | 'posts' | 'reports' | 'dashboard'): void {
    this.activeTab = tab;
    this.searchTerm = '';
  }

  // User management
  updateUserStatus(userId: number, newStatus: 'active' | 'suspended' | 'banned'): void {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.status = newStatus;
      console.log(`User ${user.name} status updated to ${newStatus}`);
    }
  }

  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      this.users = this.users.filter(u => u.id !== userId);
      console.log(`User ${userId} deleted`);
    }
  }

  // Post management
  // updatePostStatus(postId: number, newStatus: 'published' | 'draft' | 'removed'): void {
  //   const post = this.posts.find(p => p.id === postId);
  //   if (post) {
  //     post.status = newStatus;
  //     console.log(`Post ${post.title} status updated to ${newStatus}`);
  //   }
  // }

  deletePost(postId: number): void {
    if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      this.posts = this.posts.filter(p => p.id !== postId);
      console.log(`Post ${postId} deleted`);
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