import { Component, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { filter } from 'rxjs/operators';
import { HomeComponent } from "./components/home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [HomeComponent],
})
export class AppComponent {
  router = inject(Router);
  dialog = inject(MatDialog);

  constructor() {
    this.router.events
    .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
    .subscribe((event) => {
      if (event.url === '/login') {
        const dialogRef = this.dialog.open(LoginComponent, {
          disableClose: false, 
        });
        dialogRef.afterClosed().subscribe(() => {
          this.router.navigate(['/home']);
        });
      }
      if (event.url === '/register') {
        const dialogRef = this.dialog.open(RegisterComponent, {
          disableClose: false,
        });
          dialogRef.afterClosed().subscribe(() => {
          this.router.navigate(['/home']);
        });
      }
    });
  }
}
