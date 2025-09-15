import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { BlogPost, HomeComponent } from '../home/home.component';
import { PostService } from '../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LikeService } from '../../services/like.service';
// import { CommonModule } from '@angular/common';

export interface Comment {
  id: number;
  author: {
    name: string;
    avatar: string;
  };
  text: string;
  date: string;
  likes: number;
}

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})

export class ArticleComponent implements OnInit {
  postId!: number;
  article: BlogPost | null = null;
  isLoading = true;
  newComment = '';
  likeCount: number = 0;
  isLiked: boolean = false;

  comments: Comment[] = [
    {
      id: 1,
      author: {
        name: 'Ali Bennani',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
      },
      text: 'Super article ! Très informatif et bien structuré. Merci pour le partage.',
      date: '2025-01-15T10:30:00Z',
      likes: 5
    },
    {
      id: 2,
      author: {
        name: 'Sara Alami',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
      },
      text: 'Très bien expliqué, ça m\'a beaucoup aidé à comprendre le sujet. Continuez comme ça !',
      date: '2025-01-15T14:15:00Z',
      likes: 3
    },
    {
      id: 3,
      author: {
        name: 'Omar Tazi',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
      },
      text: 'Article très pertinent. J\'aimerais voir plus de contenu de ce type sur votre plateforme.',
      date: '2025-01-14T16:45:00Z',
      likes: 7
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private likeService: LikeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.postId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadArticle();
    this.loadLikeInfo(this.postId);
  }

  loadArticle(): void {
    this.postService.getPost(this.postId).subscribe({
      next: (data) => {
        this.article = data;

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading article:', err);
        this.isLoading = false;
      }
    });
  }

  loadLikeInfo(postId: number) {
    this.likeService.getLikeInfo(postId).subscribe(info => {
      this.likeCount = info.likesCount;
      this.isLiked = info.userLiked;
    });
  }

  toggleLike(): void {
    this.likeService.addLike(this.postId).subscribe({
      next: (res) => {
        if(this.isLiked) {
          this.likeCount--;
        } else {
          this.likeCount++;
        }
        this.isLiked = !this.isLiked;

    },
      error: (err) => {
        console.error('Erreur like:', err);
      }
    });

}

addComment(): void {
  if(this.newComment.trim()) {
  const newCommentObj: Comment = {
    id: this.comments.length + 1,
    author: {
      name: 'You',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face'
    },
    text: this.newComment.trim(),
    date: new Date().toISOString(),
    likes: 0
  };

  this.comments.unshift(newCommentObj);
  this.newComment = '';
}
  }

likeComment(comment: Comment): void {
  comment.likes++;
}

onImageError(event: any): void {
  event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xNzUgNzVIMjI1VjEyNUgxNzVWNzVaIiBmaWxsPSIjRERERERkIi8+Cjwvc3ZnPgo=';
}

goBack(): void {
  this.router.navigate(['/home']);
}


trackByCommentId(index: number, comment: Comment): number {
  return comment.id;
}
}