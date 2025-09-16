import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../../services/profil.service';


export interface UserInfo {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  profileImage: string | null;
  coverImage: string | null;
  followersCount: number;
  followingCount: number;
  bio?: string;
  fullName?: string;
  isFollowing?: boolean;
}


interface Post {
  id: number;
  title: string;
  description: string;
  content?: string;
  publishDate: string;
  author: {
    id: number;
    name: string;
    avatar: string;
  };
  medias: {
    type: 'IMAGE' | 'VIDEO';
    url: string;
  }[];
  selectedMediaIndex: number;
  subject?: string;
  likesCount?: number;
  commentsCount?: number;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})


export class ProfilComponent implements OnInit {
  user: UserInfo | null = null;
  userPosts: Post[] = [];
  isOwnProfile = false;
  isLoading = true;
  selectedSubjectFilter = 'all';
  availableSubjects: string[] = [];

  // États pour les actions
  isFollowLoading = false;
  editingPostId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  private loadUserProfile(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.loadUser(parseInt(userId));
      this.loadUserPosts(parseInt(userId));
    }
  }

  private loadUser(userId: number): void {
    // OPTION 1: Données immédiates pour test (plus de loading)
    // this.user = {
    //   id: userId,
    //   username: 'johnsmith',
    //   email: 'john.smith@email.com',
    //   createdAt: '2023-01-15T10:30:00',
    //   profileImage: 'https://via.placeholder.com/150/007B7F/ffffff?text=JS',
    //   coverImage: 'https://via.placeholder.com/1200x400/007B7F/ffffff?text=Cover',
    //   followersCount: 1250,
    //   followingCount: 184,
    //   fullName: 'John Smith',
    //   bio: 'Passionate writer sharing insights about technology, science, and life. Always learning, always growing.',
    //   isFollowing: false
    // };
    // this.checkIfOwnProfile();
    // this.isLoading = false;

    this.profileService.getUserInfo(userId).subscribe({
      next: (info) => {
        this.user = info;
        // this.checkIfOwnProfile();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading user:', error);
        this.user = null;
        this.isLoading = false;
      }
    });

  }

  private loadUserPosts(userId: number): void {
    // OPTION 1: Données immédiates pour test
    this.userPosts = [
      {
        id: 1,
        title: 'The Future of Artificial Intelligence',
        description: 'Exploring the latest developments in AI and machine learning technologies.',
        publishDate: '2024-03-15T14:30:00',
        author: {
          id: userId,
          name: this.user?.fullName || 'John Smith',
          avatar: this.user?.profileImage || 'https://via.placeholder.com/50'
        },
        medias: [
          { type: 'IMAGE', url: 'https://via.placeholder.com/400x250/007B7F/ffffff?text=AI' }
        ],
        selectedMediaIndex: 0,
        subject: 'Technology',
        likesCount: 45,
        commentsCount: 12
      },
      {
        id: 2,
        title: 'Understanding Climate Change',
        description: 'A comprehensive look at climate science and environmental impacts.',
        publishDate: '2024-03-10T09:15:00',
        author: {
          id: userId,
          name: this.user?.fullName || 'John Smith',
          avatar: this.user?.profileImage || 'https://via.placeholder.com/50'
        },
        medias: [
          { type: 'VIDEO', url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4' }
        ],
        selectedMediaIndex: 0,
        subject: 'Science',
        likesCount: 78,
        commentsCount: 23
      },
      {
        id: 3,
        title: 'Modern Web Development Trends',
        description: 'Exploring the latest trends in web development and frontend technologies.',
        publishDate: '2024-03-08T16:45:00',
        author: {
          id: userId,
          name: this.user?.fullName || 'John Smith',
          avatar: this.user?.profileImage || 'https://via.placeholder.com/50'
        },
        medias: [
          { type: 'IMAGE', url: 'https://via.placeholder.com/400x250/007B7F/ffffff?text=Web' }
        ],
        selectedMediaIndex: 0,
        subject: 'Technology',
        likesCount: 32,
        commentsCount: 8
      }
    ];

  this.extractAvailableSubjects();

  /* OPTION 2: Remplacer par votre vrai service
  this.postService.getUserPosts(userId).subscribe({
    next: (posts) => {
      this.userPosts = posts;
      this.extractAvailableSubjects();
    },
    error: (error) => {
      console.error('Error loading posts:', error);
      this.userPosts = [];
    }
  });
  */
  }

  private extractAvailableSubjects(): void {
    const subjects = this.userPosts
      .map(post => post.subject)
      .filter((subject, index, arr) => subject && arr.indexOf(subject) === index) as string[];
    this.availableSubjects = subjects;
  }

  private checkIfOwnProfile(): void {
    // Simulation - Vérifier si c'est le profil de l'utilisateur connecté
    const currentUserId = 1; // Remplacer par votre service d'authentification
    this.isOwnProfile = this.user?.id === currentUserId;
  }


  toggleFollow(): void {
    if (!this.user || this.isFollowLoading) return;

    this.isFollowLoading = true;

    setTimeout(() => {
      if (this.user) {
        this.user.isFollowing = !this.user.isFollowing;
        this.user.followersCount += this.user.isFollowing ? 1 : -1;
      }
      this.isFollowLoading = false;
    }, 800);
  }

  editProfile(): void {
    console.log('Edit profile clicked');
    // Naviguer vers la page d'édition du profil
    // this.router.navigate(['/profile/edit']);
  }

  // Actions des posts
  get filteredPosts(): Post[] {
    if (this.selectedSubjectFilter === 'all') {
      return this.userPosts;
    }
    return this.userPosts.filter(post => post.subject === this.selectedSubjectFilter);
  }

  onSubjectFilterChange(subject: string): void {
    this.selectedSubjectFilter = subject;
  }

  onCardClick(postId: number): void {
    if (this.editingPostId === postId) return;
    console.log('Navigate to post:', postId);
    // this.router.navigate(['/post', postId]);
  }

  editPost(post: Post, event: Event): void {
    event.stopPropagation();
    console.log('Edit post:', post.id);
    this.editingPostId = post.id;
    // Ouvrir modal d'édition ou naviguer vers page d'édition
  }

  deletePost(post: Post, event: Event): void {
    event.stopPropagation();

    if (confirm(`Are you sure you want to delete "${post.title}"?`)) {
      console.log('Delete post:', post.id);
      // Simuler la suppression
      this.userPosts = this.userPosts.filter(p => p.id !== post.id);
      this.extractAvailableSubjects();
    }
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

  onImageError(event: any): void {
    event.target.src = 'profil.jpg';
  }

  // Utilitaires
  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  formatMemberSince(dateString: string): string {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      month: 'long',
      year: 'numeric'
    });
  }

  getProfileImageUrl(): string {
    if (this.user?.profileImage) {
      // Si c'est un byte array du backend, convertir en base64
      if (typeof this.user.profileImage === 'string' && this.user.profileImage.startsWith('data:')) {
        return this.user.profileImage;
      }
      // Sinon, traiter comme URL directe
      return this.user.profileImage;
    }
    return `https://via.placeholder.com/150/007B7F/ffffff?text=${this.user?.username?.charAt(0).toUpperCase() || 'U'}`;
  }

  getCoverImageUrl(): string {
    if (this.user?.coverImage) {
      return this.user.coverImage;
    }
    return 'https://via.placeholder.com/1200x400/007B7F/ffffff?text=Cover+Image';
  }
}