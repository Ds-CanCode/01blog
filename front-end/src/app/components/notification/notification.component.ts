import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NotifService } from '../../services/notif.service';
import { Router } from '@angular/router';
import { PopupService } from '../../services/popup.service';
import { AuthService } from '../../services/auth.service';


export interface Notif {
  id: number;
  message: string;
  createdAt: string;
  read: boolean;
  postId: number | null;
}

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})

export class NotificationComponent implements OnInit {
  notif: Notif[] = [];
  isLoading = false;

  constructor(private notifService: NotifService, private router: Router, private popupService: PopupService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadNotif();
  }

  private loadNotif(): void {
    this.isLoading = true;
    this.notifService.getNotif().subscribe({
      next: (res) => {
        console.log(res);
        this.notif = res.reverse();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur ', err)
        if (err.status === 401) {
          this.authService.logout()
        }
      }
    });
  }






  markAsRead(notificationId: number): void {
    const notification = this.notif.find(n => n.id === notificationId);
    if (notification && !notification.read) {
      notification.read = true;
      if (notification.postId) {
        this.notifService.markAsRead(notification.postId).subscribe({
          next: () => {
            console.log(`Notification ${notificationId} marquée comme lue`);
          },
          error: (err) => {
            notification.read = false;
            console.error('Erreur lecture notif:', err);
            if (err.status === 401) {
              this.authService.logout()
            }
          }
        });
      }
    }
  }


  markAllAsRead(): void {
    this.notif.forEach(n => n.read = true);
    this.notifService.markAllAsRead().subscribe({
      next: () => console.log('Toutes les notifications sont lues'),
      error: (err) => {
        console.error('Erreur read all:', err);
        if (err.status === 401) {
          this.authService.logout()
        }
      }
    });
  }

  onNotificationClick(notification: Notif): void {
    this.markAsRead(notification.id);

    if (notification.postId) {
      this.popupService.closeAllPopups();
      this.router.navigate(['/article', notification.postId]);
    }
  }



  getTimeAgo(dateString: string): string {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'À l\'instant';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}min`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}j`;
    return date.toLocaleDateString('fr-FR');
  }

  getUnreadCount(): number {
    return this.notif.filter(n => !n.read).length;
  }

}