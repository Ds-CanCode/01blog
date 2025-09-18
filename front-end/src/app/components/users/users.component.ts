import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowService } from '../../services/follow.service';
import { Router } from '@angular/router';

export interface Following {
  id: number;
  username: string;
  profileImage?: string; 
}


@Component({
  selector: 'app-users',
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})

export class UsersComponent implements OnInit {
  following: Following[] = [];
  isLoading = false;

  constructor(private followService: FollowService, private router: Router) {}

  ngOnInit(): void {
    this.loadFollowing();
  }

  loadFollowing(): void {
    this.isLoading = true;
    this.followService.getAllFollowing().subscribe({
      next: (res) => {
        this.following = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur chargement following:', err);
        this.isLoading = false;
      }
    });
  }

   onUserClick(userId: number) {
    this.router.navigate(['/profil', userId]);
  }
}