// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'adquisiciones',
    loadComponent: () => import('./features/adquisiciones/components/adquisicion-list/adquisicion-list.component')
      .then(m => m.AdquisicionListComponent)
  },
  {
    path: 'adquisiciones/dashboard',
    loadComponent: () => import('./features/adquisiciones/components/adquisicion-dashboard/adquisicion-dashboard.component')
      .then(m => m.AdquisicionDashboardComponent)
  },
  {
    path: 'adquisiciones/nuevo',
    loadComponent: () => import('./features/adquisiciones/components/adquisicion-form/adquisicion-form.component')
      .then(m => m.AdquisicionFormComponent)
  },
  {
    path: 'adquisiciones/editar/:id',
    loadComponent: () => import('./features/adquisiciones/components/adquisicion-form/adquisicion-form.component')
      .then(m => m.AdquisicionFormComponent)
  },
  {
    path: 'adquisiciones/detalle/:id',
    loadComponent: () => import('./features/adquisiciones/components/adquisicion-detail/adquisicion-detail.component')
      .then(m => m.AdquisicionDetailComponent)
  },
  {
    path: '',
    redirectTo: 'adquisiciones/dashboard',
    pathMatch: 'full'
  }
];