import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BlogPost } from '../home/home.component';
import { PostService } from '../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LikeService } from '../../services/like.service';
import { CommentDTO, CommentService } from '../../services/comment.service';
import { AuthService } from '../../services/auth.service';


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
  comments: CommentDTO[] = [];

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private likeService: LikeService,
    private router: Router,
    private commentService: CommentService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (!isNaN(id)) {
        this.postId = id;
        this.loadArticle();
        this.loadLikeInfo(this.postId);
        this.loadComments(this.postId);
      }
    });
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
        if (err.status === 401) {
          this.authService.logout()
        }
      }
    });
  }

  loadLikeInfo(postId: number) {
    this.likeService.getLikeInfo(postId).subscribe({
      next: (info) => {
        this.likeCount = info.likesCount;
        this.isLiked = info.userLiked;
      },
      error: (err) => {
        console.error('Error loading Likes:', err);
        if (err.status === 401) {
          this.authService.logout()
        }
      }
    });
  }

  loadComments(postId: number) {
    this.commentService.getComments(postId).subscribe({
      next: (comment) => {
        console.log(comment);
        this.comments = comment;
      },
      error: (err) => {
        console.error('Error loading comment:', err);
        if (err.status === 401) {
          this.authService.logout()
        }
      }
    })
  }

  toggleLike(): void {
    this.likeService.addLike(this.postId).subscribe({
      next: (res) => {
        if (this.isLiked) {
          this.likeCount--;
        } else {
          this.likeCount++;
        }
        this.isLiked = !this.isLiked;

      },
      error: (err) => {
        console.error('Erreur like:', err);
        if (err.status === 401 ) {
          this.authService.logout()
        }
      }
    });

  }

  addComment(): void {
    const content = this.newComment.trim();
    if (!content) return;

    this.commentService.addComment(this.postId, content).subscribe({
      next: (comment) => {
        this.comments.unshift(comment);
        console.log("Comment is added", comment);
        this.newComment = '';
      },
      error: (err) => {
        console.error('Erreur commentaire:', err);
        if (err.status === 401) {
          this.authService.logout()
        }
      }
    });
  }


  prevMedia(post: any) {
    if (post.selectedMediaIndex > 0) {
      post.selectedMediaIndex--;
    } else {
      post.selectedMediaIndex = post.medias.length - 1;
    }
  }

  nextMedia(post: any) {
    if (post.selectedMediaIndex < post.medias.length - 1) {
      post.selectedMediaIndex++;
    } else {
      post.selectedMediaIndex = 0;
    }
  }


  onUserClick(userId: number) {
    this.router.navigate(['/profil', userId]);
  }

  onImageError(event: any): void {
    event.target.src = 'profil.jpg';
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }


  trackByCommentId(index: number, comment: CommentDTO): number {
    return comment.id;
  }
}