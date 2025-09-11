import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
  status: 'active' | 'banned' | 'inactive';
  joinDate: Date;
  postsCount: number;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  authorId: number;
  createdAt: Date;
  status: 'published' | 'hidden' | 'pending';
  likesCount: number;
  commentsCount: number;
}

export interface Report {
  id: number;
  reportedBy: string;
  reportedById: number;
  reportedUser?: string;
  reportedUserId?: number;
  reportedPost?: string;
  reportedPostId?: number;
  type: 'user' | 'post' | 'comment';
  reason: string;
  description: string;
  createdAt: Date;
  status: 'pending' | 'resolved' | 'dismissed';
  severity: 'low' | 'medium' | 'high';
}

@Component({
  selector: 'app-admin',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  activeTab: 'users' | 'posts' | 'reports' = 'users';
  searchTerm: string = '';
  sortBy: string = 'newest';

  users: User[] = [
    {
      id: 1,
      name: 'Abdul Kean',
      email: 'abdul.kean@email.com',
      role: 'Mathématiques',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      status: 'active',
      joinDate: new Date('2023-01-15'),
      postsCount: 24
    },
    {
      id: 2,
      name: 'Angela Moss',
      email: 'angela.moss@email.com',
      role: 'Science',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      status: 'active',
      joinDate: new Date('2023-02-20'),
      postsCount: 18
    },
    {
      id: 3,
      name: 'Afiff Skunder',
      email: 'afiff.skunder@email.com',
      role: 'English',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      status: 'active',
      joinDate: new Date('2023-03-10'),
      postsCount: 31
    },
    {
      id: 4,
      name: 'Anita Queen',
      email: 'anita.queen@email.com',
      role: 'Mathématiques',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      status: 'banned',
      joinDate: new Date('2023-04-05'),
      postsCount: 7
    },
    {
      id: 5,
      name: 'Bella Syuqr',
      email: 'bella.syuqr@email.com',
      role: 'Programmer',
      avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face',
      status: 'active',
      joinDate: new Date('2023-05-12'),
      postsCount: 15
    },
    {
      id: 6,
      name: 'Benny Gacu',
      email: 'benny.gacu@email.com',
      role: 'Graphic Design',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      status: 'active',
      joinDate: new Date('2023-06-18'),
      postsCount: 22
    }
  ];

  posts: Post[] = [
    {
      id: 1,
      title: 'Introduction aux équations différentielles',
      content: 'Dans ce post, nous allons explorer les concepts fondamentaux des équations différentielles...',
      author: 'Abdul Kean',
      authorId: 1,
      createdAt: new Date('2024-01-15'),
      status: 'published',
      likesCount: 45,
      commentsCount: 12
    },
    {
      id: 2,
      title: 'Les réactions chimiques en laboratoire',
      content: 'Découvrez les principales réactions chimiques utilisées dans nos expériences...',
      author: 'Angela Moss',
      authorId: 2,
      createdAt: new Date('2024-01-14'),
      status: 'published',
      likesCount: 38,
      commentsCount: 8
    },
    {
      id: 3,
      title: 'Analyse littéraire de Shakespeare',
      content: 'Une analyse approfondie des œuvres de Shakespeare et leur impact sur la littérature moderne...',
      author: 'Afiff Skunder',
      authorId: 3,
      createdAt: new Date('2024-01-13'),
      status: 'hidden',
      likesCount: 52,
      commentsCount: 19
    }
  ];

  reports: Report[] = [
    {
      id: 1,
      reportedBy: 'Angela Moss',
      reportedById: 2,
      reportedUser: 'Anita Queen',
      reportedUserId: 4,
      type: 'user',
      reason: 'Harcèlement',
      description: 'Cet utilisateur envoie des messages inappropriés et harcelants à d\'autres membres.',
      createdAt: new Date('2024-01-16'),
      status: 'pending',
      severity: 'high'
    },
    {
      id: 2,
      reportedBy: 'Bella Syuqr',
      reportedById: 5,
      reportedPost: 'Analyse littéraire de Shakespeare',
      reportedPostId: 3,
      type: 'post',
      reason: 'Contenu inapproprié',
      description: 'Ce post contient des informations erronées et pourrait induire en erreur les étudiants.',
      createdAt: new Date('2024-01-15'),
      status: 'resolved',
      severity: 'medium'
    },
    {
      id: 3,
      reportedBy: 'Benny Gacu',
      reportedById: 6,
      reportedUser: 'Abdul Kean',
      reportedUserId: 1,
      type: 'user',
      reason: 'Spam',
      description: 'Cet utilisateur poste trop de contenu similaire et encombre le feed.',
      createdAt: new Date('2024-01-14'),
      status: 'dismissed',
      severity: 'low'
    },
    {
      id: 4,
      reportedBy: 'Afiff Skunder',
      reportedById: 3,
      reportedPost: 'Les réactions chimiques en laboratoire',
      reportedPostId: 2,
      type: 'post',
      reason: 'Informations dangereuses',
      description: 'Ce post contient des instructions qui pourraient être dangereuses si mal appliquées.',
      createdAt: new Date('2024-01-13'),
      status: 'pending',
      severity: 'high'
    },
    {
      id: 5,
      reportedBy: 'Abdul Kean',
      reportedById: 1,
      reportedUser: 'Bella Syuqr',
      reportedUserId: 5,
      type: 'comment',
      reason: 'Langage offensant',
      description: 'Commentaire contenant des propos discriminatoires et offensants.',
      createdAt: new Date('2024-01-12'),
      status: 'pending',
      severity: 'medium'
    }
  ];

  filteredUsers: User[] = [];
  filteredPosts: Post[] = [];
  filteredReports: Report[] = [];

  ngOnInit() {
    this.filterUsers();
    this.filterPosts();
    this.filterReports();
  }

  filterUsers() {
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    this.sortUsers();
  }

  filterPosts() {
    this.filteredPosts = this.posts.filter(post =>
      post.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    this.sortPosts();
  }

  filterReports() {
    this.filteredReports = this.reports.filter(report =>
      report.reportedBy.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      report.reason.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (report.reportedUser && report.reportedUser.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
      (report.reportedPost && report.reportedPost.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );

    this.sortReports();
  }

  sortUsers() {
    switch (this.sortBy) {
      case 'newest':
        this.filteredUsers.sort((a, b) => b.joinDate.getTime() - a.joinDate.getTime());
        break;
      case 'oldest':
        this.filteredUsers.sort((a, b) => a.joinDate.getTime() - b.joinDate.getTime());
        break;
      case 'name':
        this.filteredUsers.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'posts':
        this.filteredUsers.sort((a, b) => b.postsCount - a.postsCount);
        break;
    }
  }

  sortPosts() {
    switch (this.sortBy) {
      case 'newest':
        this.filteredPosts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case 'oldest':
        this.filteredPosts.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        break;
      case 'likes':
        this.filteredPosts.sort((a, b) => b.likesCount - a.likesCount);
        break;
      case 'comments':
        this.filteredPosts.sort((a, b) => b.commentsCount - a.commentsCount);
        break;
    }
  }

  sortReports() {
    switch (this.sortBy) {
      case 'newest':
        this.filteredReports.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case 'oldest':
        this.filteredReports.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        break;
      case 'severity':
        const severityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
        this.filteredReports.sort((a, b) => severityOrder[b.severity] - severityOrder[a.severity]);
        break;
      case 'status':
        const statusOrder = { 'pending': 3, 'resolved': 2, 'dismissed': 1 };
        this.filteredReports.sort((a, b) => statusOrder[b.status] - statusOrder[a.status]);
        break;
    }
  }

  onSearch() {
    if (this.activeTab === 'users') {
      this.filterUsers();
    } else if (this.activeTab === 'posts') {
      this.filterPosts();
    } else {
      this.filterReports();
    }
  }

  onSortChange() {
    if (this.activeTab === 'users') {
      this.sortUsers();
    } else if (this.activeTab === 'posts') {
      this.sortPosts();
    } else {
      this.sortReports();
    }
  }

  switchTab(tab: 'users' | 'posts' | 'reports') {
    this.activeTab = tab;
    this.searchTerm = '';
    this.onSearch();
  }

  banUser(userId: number) {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.status = user.status === 'banned' ? 'active' : 'banned';
      this.filterUsers();
    }
  }

  deleteUser(userId: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.users = this.users.filter(u => u.id !== userId);
      this.filterUsers();
    }
  }

  hidePost(postId: number) {
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      post.status = post.status === 'hidden' ? 'published' : 'hidden';
      this.filterPosts();
    }
  }

  deletePost(postId: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce post ?')) {
      this.posts = this.posts.filter(p => p.id !== postId);
      this.filterPosts();
    }
  }

  resolveReport(reportId: number) {
    const report = this.reports.find(r => r.id === reportId);
    if (report) {
      report.status = 'resolved';
      this.filterReports();
    }
  }

  dismissReport(reportId: number) {
    const report = this.reports.find(r => r.id === reportId);
    if (report) {
      report.status = 'dismissed';
      this.filterReports();
    }
  }

  deleteReport(reportId: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce signalement ?')) {
      this.reports = this.reports.filter(r => r.id !== reportId);
      this.filterReports();
    }
  }

  viewReportDetails(reportId: number) {
    console.log('Viewing report details:', reportId);
    // Implémentez la navigation vers les détails du signalement
  }

  viewUserProfile(userId: number) {
    console.log('Viewing profile for user:', userId);
    // Implémentez la navigation vers le profil utilisateur
  }

  addNewUser() {
    console.log('Adding new user');
    // Implémentez l'ajout d'un nouvel utilisateur
  }

  getPendingReportsCount(): number {
    return this.reports.filter(r => r.status === 'pending').length;
  }

  getHighPriorityReportsCount(): number {
    return this.reports.filter(r => r.severity === 'high' && r.status === 'pending').length;
  }
}