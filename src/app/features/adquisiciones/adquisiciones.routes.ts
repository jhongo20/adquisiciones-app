// src/app/features/adquisiciones/adquisiciones.routes.ts
import { Routes } from '@angular/router';
import { AdquisicionListComponent } from './components/adquisicion-list/adquisicion-list.component';
import { AdquisicionFormComponent } from './components/adquisicion-form/adquisicion-form.component';
import { AdquisicionDetailComponent } from './components/adquisicion-detail/adquisicion-detail.component';

export const ADQUISICIONES_ROUTES: Routes = [
  {
    path: '',
    component: AdquisicionListComponent
  },
  {
    path: 'nuevo',
    component: AdquisicionFormComponent
  },
  {
    path: 'editar/:id',
    component: AdquisicionFormComponent
  },
  {
    path: 'detalle/:id',
    component: AdquisicionDetailComponent
  }
];