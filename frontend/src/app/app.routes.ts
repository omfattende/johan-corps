import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'talleres',
    loadComponent: () => import('./pages/workshops/workshop-list/workshop-list.component').then(m => m.WorkshopListComponent)
  },
  {
    path: 'talleres/:id',
    loadComponent: () => import('./pages/workshops/workshop-detail/workshop-detail.component').then(m => m.WorkshopDetailComponent)
  },
  {
    path: 'refacciones',
    loadComponent: () => import('./pages/parts/parts-finder/parts-finder.component').then(m => m.PartsFinderComponent)
  },
  {
    path: 'refacciones/:id',
    loadComponent: () => import('./pages/parts/part-detail/part-detail.component').then(m => m.PartDetailComponent)
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'auth/registro',
    loadComponent: () => import('./pages/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
