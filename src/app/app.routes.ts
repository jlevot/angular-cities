import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'cities',
    loadComponent: () => import('@features/cities/pages/cities.page').then((m) => m.CitiesPage)
  },
  {
    path: '**',
    redirectTo: 'cities',
  },
];
