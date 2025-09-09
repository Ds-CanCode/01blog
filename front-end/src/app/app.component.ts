import { Component, inject } from '@angular/core';
import { Router, NavigationEnd , RouterModule} from '@angular/router';
// import { MatDialog } from '@angular/material/dialog';
// import { LoginComponent } from './components/login/login.component';
// import { RegisterComponent } from './components/register/register.component';
// import { filter } from 'rxjs/operators';
// import { HomeComponent } from "./components/home/home.component";
// import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';

// import { RegisterComponent } from './components/register/register.component';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule, MatDialogModule, HttpClientModule],
})
export class AppComponent {}
