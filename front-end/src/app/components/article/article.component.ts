import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BlogPost } from '../home/home.component';
import { PostService } from '../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LikeService } from '../../services/like.service';
import { CommentService } from '../../services/comment.service';
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
  comments: Comment[] = [];

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private likeService: LikeService,
    private router: Router,
    private commentService: CommentService
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
        if (this.isLiked) {
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
    const content = this.newComment.trim();
    if (!content) return;

    this.commentService.addComment(this.postId, content).subscribe({
      next: (comment) => {
        this.comments.unshift({
          id: comment.id,
          author: {
            name: comment.username,
            avatar: comment.avatar
          },
          text: comment.content,
          date: comment.createDate,
          likes: 0
        });
        console.log("Comment is added", comment);
        this.newComment = '';
      },
      error: (err) => console.error('Erreur commentaire:', err)
    });
  }

  

  onImageError(event: any): void {
    event.target.src = 'profil.jpg';
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }


  trackByCommentId(index: number, comment: Comment): number {
    return comment.id;
  }
}