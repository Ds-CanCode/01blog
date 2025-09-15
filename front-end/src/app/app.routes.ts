import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';
//import { EmptyComponent } from '../app/components/empty/empty.component'
export const routes: Routes = [
    { path: '', loadComponent: () => import('./components/landing/landing.component').then(m => m.LandingComponent)},
    { path: 'home', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent), canActivate: [AuthGuard] },
     { path: 'papier', loadComponent: () => import('./components/papier/papier.component').then(m => m.PapierComponent), canActivate: [AuthGuard]},
    { path: 'article/:id', loadComponent: () => import('./components/article/article.component').then(m => m.ArticleComponent), canActivate: [AuthGuard] },
    { path: 'profil', loadComponent: () => import('./components/profil/profil.component').then(m => m.ProfilComponent), canActivate: [AuthGuard] },
    { path: 'admin', loadComponent: () => import('./components/admin/admin.component').then(m => m.AdminComponent), canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'home' }
];
