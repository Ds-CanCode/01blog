import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

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
  status: 'published' | 'draft' | 'removed';
  views: number;
  likes: number;
  comments: number;
}

export interface Report {
  id: number;
  type: 'user' | 'post';
  targetId: number;
  targetName: string;
  reporterName: string;
  reason: string;
  description: string;
  date: string;
  status: 'pending' | 'resolved' | 'dismissed';
  severity: 'low' | 'medium' | 'high';
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  activeTab: 'users' | 'posts' | 'reports' | 'dashboard' = 'dashboard';
  searchTerm = '';
  selectedFilter = 'all';
  
  // Dashboard stats
  stats = {
    totalUsers: 1247,
    totalPosts: 856,
    pendingReports: 12,
    activeUsers: 892
  };

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

  posts: Post[] = [
    {
      id: 1,
      title: 'Top 17 Job Portal, Hiring & Recruitment Software',
      description: 'Complete guide to the best recruitment platforms and software solutions.',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop',
      author: {
        name: 'Ahmed Benali',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face'
      },
      publishDate: '2025-01-15',
      status: 'published',
      views: 1245,
      likes: 67,
      comments: 23
    },
    {
      id: 2,
      title: 'Understanding Modern Web Development',
      description: 'A comprehensive overview of current web development trends and technologies.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=200&fit=crop',
      author: {
        name: 'Sara Alami',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face'
      },
      publishDate: '2025-01-10',
      status: 'removed',
      views: 892,
      likes: 34,
      comments: 12
    }
  ];

  reports: Report[] = [
    {
      id: 1,
      type: 'post',
      targetId: 2,
      targetName: 'Understanding Modern Web Development',
      reporterName: 'Anonymous User',
      reason: 'Inappropriate Content',
      description: 'This post contains misleading information about web development.',
      date: '2025-01-12',
      status: 'pending',
      severity: 'medium'
    },
    {
      id: 2,
      type: 'user',
      targetId: 4,
      targetName: 'Fatima Zahra',
      reporterName: 'Ahmed Benali',
      reason: 'Spam',
      description: 'User is posting repetitive promotional content.',
      date: '2025-01-11',
      status: 'pending',
      severity: 'high'
    },
    {
      id: 3,
      type: 'post',
      targetId: 1,
      targetName: 'Top 17 Job Portal Software',
      reporterName: 'Omar Tazi',
      reason: 'Copyright Violation',
      description: 'Post contains copyrighted images without permission.',
      date: '2025-01-10',
      status: 'resolved',
      severity: 'low'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Check admin permissions here
    // this.checkAdminAccess();
  }

  switchTab(tab: 'users' | 'posts' | 'reports' | 'dashboard'): void {
    this.activeTab = tab;
    this.searchTerm = '';
    this.selectedFilter = 'all';
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
  updatePostStatus(postId: number, newStatus: 'published' | 'draft' | 'removed'): void {
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      post.status = newStatus;
      console.log(`Post ${post.title} status updated to ${newStatus}`);
    }
  }

  deletePost(postId: number): void {
    if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      this.posts = this.posts.filter(p => p.id !== postId);
      console.log(`Post ${postId} deleted`);
    }
  }

  // Report management
  resolveReport(reportId: number, action: 'resolve' | 'dismiss'): void {
    const report = this.reports.find(r => r.id === reportId);
    if (report) {
      report.status = action === 'resolve' ? 'resolved' : 'dismissed';
      
      if (action === 'resolve' && report.type === 'post') {
        // Auto-remove reported post
        this.updatePostStatus(report.targetId, 'removed');
      } else if (action === 'resolve' && report.type === 'user') {
        // Auto-suspend reported user
        this.updateUserStatus(report.targetId, 'suspended');
      }
      
      console.log(`Report ${reportId} ${action}d`);
    }
  }

  // Filtering methods
  getFilteredUsers(): User[] {
    let filtered = this.users;
    
    if (this.searchTerm) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    
    if (this.selectedFilter !== 'all') {
      filtered = filtered.filter(user => user.status === this.selectedFilter);
    }
    
    return filtered;
  }

  getFilteredPosts(): Post[] {
    let filtered = this.posts;
    
    if (this.searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        post.author.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    
    if (this.selectedFilter !== 'all') {
      filtered = filtered.filter(post => post.status === this.selectedFilter);
    }
    
    return filtered;
  }

  getFilteredReports(): Report[] {
    let filtered = this.reports;
    
    if (this.searchTerm) {
      filtered = filtered.filter(report => 
        report.targetName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        report.reporterName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        report.reason.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    
    if (this.selectedFilter !== 'all') {
      filtered = filtered.filter(report => report.status === this.selectedFilter);
    }
    
    return filtered;
  }

  onImageError(event: any): void {
    event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xNSAxNUgyNVYyNUgxNVYxNVoiIGZpbGw9IiNEREREREQiLz4KPC9zdmc+Cg==';
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}