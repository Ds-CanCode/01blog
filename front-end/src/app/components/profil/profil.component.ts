import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../../services/profil.service';
import { FollowService } from '../../services/follow.service';

// Interfaces basées exactement sur votre backend
export interface UserProfile {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  profileImage: string;
  coverImage: string;
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
  editingPost: UserPost | null = null;
  showDeleteConfirm: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    private followService: FollowService,
  ) { }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  private loadUserProfile(): void {
    const userId = this.route.snapshot.paramMap.get('id') || null;
    const meUserId = localStorage.getItem('userId');

    if (userId && (userId != meUserId)) {
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
          // isFollowed: false, // À récupérer depuis votre service
          isOwnProfile: userId != null ? false : true, // Logique à implémenter
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
          selectedMediaIndex: 0,
          likes: post.likes || 0,
          comments: post.comments || 0,
          isLiked: false
        }));


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


  toggleFollow(): void {
    if (this.user && !this.user.isOwnProfile) {
      this.followService.follow(this.user.id).subscribe({
        next: (res) => {
          console.log("Follow");
          
        },
        error: (err) => {
          console.error(err);
        }
      });
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


  startEditingPost(post: UserPost): void {
    this.router.navigate(['/papier', post.id]);
  }


  confirmDeletePost(postId: number): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.deletePost(postId);
    }
  }

  deletePost(postId: number): void {
    this.profileService.deletePost(postId).subscribe({
      next: () => {
        this.userPosts = this.userPosts.filter(p => p.id !== postId);
        if (this.user?.postsCount !== undefined && this.user.postsCount > 0) {
          this.user.postsCount--;
        }
        console.log('Post deleted:', postId);
      },
      error: (err) => {
        console.error('Error deleting post:', err);
      }
    });
  }




  onCardClick(postId: number): void {
    this.router.navigate(['/article', postId]);
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
    event.target.src = 'profil.jpg';
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

}