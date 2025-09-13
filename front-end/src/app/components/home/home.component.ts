import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { UsersComponent } from '../users/users.component';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
// import { ArticleComponent } from '../article/article.component';

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  image: string;
  isVideo: boolean;
  author: {
    name: string;
    avatar: string;
  };
  publishDate: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ RouterModule, CommonModule, UsersComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent {
  blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Building Scalable Web Applications with Angular",
      description: "Learn best practices for creating maintainable and scalable Angular applications that can grow with your business needs.",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop",
      isVideo: false,
      author: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b2e90220?w=100&h=100&fit=crop&crop=face"
      },
      publishDate: "2 days ago"
    },
    {
      id: 2,
      title: "The Future of Web Development: Trends to Watch",
      description: "Explore emerging technologies and methodologies that are shaping the future of web development in 2025.",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=200&fit=crop",
      isVideo: true,
      author: {
        name: "Alex Rodriguez",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
      },
      publishDate: "5 days ago"
    },
    {
      id: 3,
      title: "Mastering CSS Grid and Flexbox for Modern Layouts",
      description: "A comprehensive guide to creating responsive and flexible layouts using CSS Grid and Flexbox techniques.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop",
      isVideo: false,
      author: {
        name: "Emily Johnson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
      },
      publishDate: "1 week ago"
    },
    {
      id: 4,
      title: "Understanding TypeScript: From Basics to Advanced",
      description: "Deep dive into TypeScript features and how they can improve your development workflow and code quality.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop",
      isVideo: false,
      author: {
        name: "Michael Park",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
      },
      publishDate: "1 week ago"
    },
    {
      id: 5,
      title: "API Design Best Practices for RESTful Services",
      description: "Learn how to design clean, maintainable, and efficient REST APIs that developers will love to use.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop",
      isVideo: true,
      author: {
        name: "Lisa Wong",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b2e90220?w=100&h=100&fit=crop&crop=face"
      },
      publishDate: "2 weeks ago"
    },
    {
      id: 6,
      title: "Performance Optimization Techniques for Web Apps",
      description: "Discover proven strategies to optimize your web application performance and provide better user experience.",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=200&fit=crop",
      isVideo: false,
      author: {
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
      },
      publishDate: "3 weeks ago"
    }
  ];
  
  constructor() { }

  ngOnInit(): void {
    // Component initialization logic
  }

  onCardClick(postId: number): void {
    console.log(`Navigating to blog post ${postId}`);
    // Navigation logic: this.router.navigate(['/blog', postId]);
  }

  onImageError(event: any): void {
    event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xNzUgNzVIMjI1VjEyNUgxNzVWNzVaIiBmaWxsPSIjRERERERkIi8+Cjwvc3ZnPgo=';
  }


  showUserList = false;

  toggleUserList() {
    this.showUserList = !this.showUserList;
  }

}
