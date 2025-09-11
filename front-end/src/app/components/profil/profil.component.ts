// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';   
import { FormsModule } from '@angular/forms';
interface Post {
  id: number;
  content: string;
  timestamp: Date;
  likes: number;
  retweets: number;
  isLiked: boolean;
  isRetweeted: boolean;
}

interface UserProfile {
  id: number;
  name: string;
  username: string;
  bio: string;
  location: string;
  website: string;
  joinDate: Date;
  followers: number;
  following: number;
  postsCount: number;
  avatar: string;
  banner: string;
  isVerified: boolean;
}

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [ RouterModule, CommonModule, FormsModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})

export class ProfilComponent implements OnInit {
  user: UserProfile = {
    id: 1,
    name: 'Mohammed Fadil',
    username: 'Ds-CanCode',
    bio: 'RMWWW9 *_*',
    location: 'Casablanca',
    website: 'ue2006.org',
    joinDate: new Date('2012-04-01'),
    followers: 194,
    following: 0,
    postsCount: 894,
    avatar: 'avatar.jpeg',
    banner: 'couvertur.jpg',
    isVerified: true
  };

  posts: Post[] = [
    {
      id: 1,
      content: 'How can we use design to make #twitter more engaging and less about the metrics? Is making the amount of likes on a tweet or number of followers on a profile harder to get to a good place to start?',
      timestamp: new Date(Date.now() - 32 * 60 * 1000), 
      likes: 0,
      retweets: 0,
      isLiked: false,
      isRetweeted: false
    },
    {
      id: 2,
      content: 'Yeah I can for sure pop by - will call you early next week.',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      likes: 0,
      retweets: 0,
      isLiked: false,
      isRetweeted: false
    },
    {
      id: 3,
      content: 'Why do I drink so much coffee?',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      likes: 0,
      retweets: 0,
      isLiked: false,
      isRetweeted: false
    }
  ];

  activeTab: string = 'tweets';
  isEditingProfile: boolean = false;
  newPostContent: string = '';
  editingPost: Post | null = null;

  // Formulaire d'édition du profil
  editForm = {
    name: '',
    bio: '',
    location: '',
    website: ''
  };

  constructor() { }

  ngOnInit(): void {
    this.initializeEditForm();
  }

  initializeEditForm(): void {
    this.editForm = {
      name: this.user.name,
      bio: this.user.bio,
      location: this.user.location,
      website: this.user.website
    };
  }

  // Gestion des onglets
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  // Gestion du profil
  startEditingProfile(): void {
    this.isEditingProfile = true;
    this.initializeEditForm();
  }

  saveProfile(): void {
    this.user.name = this.editForm.name;
    this.user.bio = this.editForm.bio;
    this.user.location = this.editForm.location;
    this.user.website = this.editForm.website;
    this.isEditingProfile = false;
  }

  cancelEditProfile(): void {
    this.isEditingProfile = false;
    this.initializeEditForm();
  }

  // Gestion des posts
  addPost(): void {
    if (this.newPostContent.trim()) {
      const newPost: Post = {
        id: Date.now(),
        content: this.newPostContent.trim(),
        timestamp: new Date(),
        likes: 0,
        retweets: 0,
        isLiked: false,
        isRetweeted: false
      };
      this.posts.unshift(newPost);
      this.newPostContent = '';
      this.user.postsCount++;
    }
  }

  startEditingPost(post: Post): void {
    this.editingPost = { ...post };
  }

  savePost(): void {
    if (this.editingPost && this.editingPost.content.trim()) {
      const index = this.posts.findIndex(p => p.id === this.editingPost!.id);
      if (index !== -1) {
        this.posts[index] = { ...this.editingPost };
      }
      this.editingPost = null;
    }
  }

  cancelEditPost(): void {
    this.editingPost = null;
  }

  deletePost(postId: number): void {
    const index = this.posts.findIndex(p => p.id === postId);
    if (index !== -1) {
      this.posts.splice(index, 1);
      this.user.postsCount--;
    }
  }

  // Interactions avec les posts
  toggleLike(post: Post): void {
    post.isLiked = !post.isLiked;
    post.likes += post.isLiked ? 1 : -1;
  }

  toggleRetweet(post: Post): void {
    post.isRetweeted = !post.isRetweeted;
    post.retweets += post.isRetweeted ? 1 : -1;
  }

  // Utilitaires
  getTimeAgo(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) {
      return `${minutes}m`;
    } else if (hours < 24) {
      return `${hours}h`;
    } else {
      return `${days}j`;
    }
  }

  getJoinDate(): string {
    return this.user.joinDate.toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long' 
    });
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          this.user.avatar = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }
}