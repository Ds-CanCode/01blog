import { Routes } from '@angular/router';
//import { EmptyComponent } from '../app/components/empty/empty.component'
export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)},
    { path: 'article', loadComponent: () => import('./components/article/article.component').then(m => m.ArticleComponent)},
    { path: 'profil', loadComponent: () => import('./components/profil/profil.component').then(m => m.ProfilComponent)},
    { path: '**', redirectTo: 'home' }
];
