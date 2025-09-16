import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../../services/profil.service';

// Interfaces basées exactement sur votre backend
export interface UserProfile {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  profileImage: string; // Base64 depuis votre backend
  coverImage: string;   // Base64 depuis votre backend
  followersCount: number;
  followingCount: number;
  // Champs UI additionnels
  name?: string;
  bio?: string;
  location?: string;
  website?: string;
  postsCount?: number;
  isFollowed?: boolean;
  isOwnProfile?: boolean;
  isVerified?: boolean;
}

export interface MediaDTO {
  url: string;
  type: 'IMAGE' | 'VIDEO';
}

export interface UserPost {
  id: number;
  title: string;
  description: string;
  medias: MediaDTO[];
  author: {
    name: string;
    avatar: string;
  };
  publishDate: string;
  selectedMediaIndex: number;
  subject?: string;
  likes?: number;
  comments?: number;
  isLiked?: boolean;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfileComponent implements OnInit {
  
  user: UserProfile | null = null;
  userPosts: UserPost[] = [];
  isLoading = true;
  
  // Filtrage par matière
  subjects = ['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Literature'];
  selectedSubject = 'All';
  
  // États d'édition
  editingPost: UserPost | null = null;
  showDeleteConfirm: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService 
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  /**
   * Utilise exactement votre logique backend
   */
  private loadUserProfile(): void {
    const userId = this.route.snapshot.paramMap.get('id') || null;
    console.log(userId);
    if (userId) {
      this.loadUser(parseInt(userId));
      this.loadUserPosts(parseInt(userId));
    } else {
      this.loadUser(null);
      this.loadUserPosts(null);
    }
  
  }

  private loadUser(userId: number | null): void {
    this.profileService.getUserInfo(userId).subscribe({
      next: (info: UserProfile) => {
        this.user = {
          ...info,
          // Ajout des champs UI manquants si nécessaire
          name: info.username, // Utiliser username comme nom par défaut
          bio: 'Passionate learner and content creator', // Valeur par défaut
          postsCount: 0, // Sera mis à jour avec les posts
          isFollowed: false, // À récupérer depuis votre service
          // isOwnProfile: this.isCurrentUser(userId), // Logique à implémenter
        };
        console.log(this.user);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading user:', error);
        this.user = null;
        this.isLoading = false;
      }
    });
  }

  private loadUserPosts(userId: number | null): void {
    this.profileService.getUserPostInfo(userId).subscribe({
      next: (posts: UserPost[]) => {
        this.userPosts = posts.map(post => ({
          ...post,
          selectedMediaIndex: 0, // Initialiser l'index des médias
          likes: post.likes || 0,
          comments: post.comments || 0,
          isLiked: false
        }));
        
        // Mettre à jour le nombre de posts
        if (this.user) {
          this.user.postsCount = this.userPosts.length;
        }
        
        console.log(this.userPosts);
      },
      error: (error) => {
        console.error('Error loading user posts:', error);
        this.userPosts = [];
      }
    });
  }

  // Gestion du suivi
  toggleFollow(): void {
    if (this.user && !this.user.isOwnProfile) {
      this.user.isFollowed = !this.user.isFollowed;
      if (this.user.isFollowed) {
        this.user.followersCount++;
      } else {
        this.user.followersCount--;
      }
      
      // Appel à votre service de suivi
      // this.profileService.toggleFollow(this.user.id).subscribe(...)
      console.log('Follow status changed:', this.user.isFollowed);
    }
  }

  // Navigation médias (même logique que home)
  prevMedia(post: UserPost, event?: Event): void {
    if (event) event.stopPropagation();
    
    if (post.medias && post.medias.length > 1) {
      post.selectedMediaIndex = post.selectedMediaIndex > 0 
        ? post.selectedMediaIndex - 1 
        : post.medias.length - 1;
    }
  }

  nextMedia(post: UserPost, event?: Event): void {
    if (event) event.stopPropagation();
    
    if (post.medias && post.medias.length > 1) {
      post.selectedMediaIndex = post.selectedMediaIndex < post.medias.length - 1 
        ? post.selectedMediaIndex + 1 
        : 0;
    }
  }

  // Gestion des posts (pour le profil personnel)
  startEditingPost(post: UserPost): void {
    this.editingPost = { ...post };
  }

  savePost(): void {
    if (this.editingPost) {
      const index = this.userPosts.findIndex(p => p.id === this.editingPost!.id);
      if (index !== -1) {
        // Appel à votre service pour sauvegarder
        // this.profileService.updatePost(this.editingPost).subscribe(...)
        
        this.userPosts[index] = { ...this.editingPost };
        this.editingPost = null;
        console.log('Post updated');
      }
    }
  }

  cancelEditPost(): void {
    this.editingPost = null;
  }

  confirmDeletePost(postId: number): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.deletePost(postId);
    }
  }

  deletePost(postId: number): void {
    // Appel à votre service pour supprimer
    // this.profileService.deletePost(postId).subscribe(...)
    
    this.userPosts = this.userPosts.filter(p => p.id !== postId);
    if (this.user?.postsCount) {
      this.user.postsCount--;
    }
    console.log('Post deleted:', postId);
  }

  // Interactions posts
  toggleLike(post: UserPost): void {
    post.isLiked = !post.isLiked;
    if (post.isLiked) {
      post.likes = (post.likes || 0) + 1;
    } else {
      post.likes = Math.max((post.likes || 0) - 1, 0);
    }
    
    // Appel à votre service like
    // this.likeService.toggleLike(post.id).subscribe(...)
    console.log('Like toggled for post:', post.id);
  }

  onCardClick(postId: number): void {
    this.router.navigate(['/article', postId]);
  }

  // Filtrage par matière
  filterBySubject(subject: string): void {
    this.selectedSubject = subject;
    console.log('Filtering by subject:', subject);
  }

  getFilteredPosts(): UserPost[] {
    if (this.selectedSubject === 'All') {
      return this.userPosts;
    }
    return this.userPosts.filter(post => post.subject === this.selectedSubject);
  }

  // Utilitaires
  getJoinDate(): string {
    if (this.user?.createdAt) {
      return new Date(this.user.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
      });
    }
    return '';
  }

  onImageError(event: any): void {
    event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xNzUgNzVIMjI1VjEyNUgxNzVWNzVaIiBmaWxsPSIjRERERERkIi8+Cjwvc3ZnPgo=';
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  // Vérifier si c'est le profil de l'utilisateur connecté
  private isCurrentUser(userId: number): boolean {
    // Implémentez votre logique pour vérifier l'utilisateur connecté
    // Par exemple, récupérer l'ID depuis un service d'authentification
    // return this.authService.getCurrentUserId() === userId;
    return true; // Temporaire pour les tests
  }

  // Navigation vers le profil
  viewProfile(): void {
    if (this.user) {
      this.router.navigate(['/profile', this.user.id]);
    }
  }
}