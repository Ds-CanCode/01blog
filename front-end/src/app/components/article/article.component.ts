import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
// import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [FormsModule, RouterModule, NavbarComponent],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})

export class ArticleComponent {
  // likeCount = 0;
  // comments = [
  //   { author: 'Ali', text: 'Super article !' },
  //   { author: 'Sara', text: 'Très bien expliqué, merci !' }
  // ];
  // newComment = '';

  // toggleLike() {
  //   this.likeCount++;
  // }

  // addComment() {
  //   if (this.newComment.trim()) {
  //     this.comments.push({ author: 'Moi', text: this.newComment });
  //     this.newComment = '';
  //   }
  // }
}
