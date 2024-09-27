import { Route } from '@angular/router';

export const PARAMETER_ROUTES: Route[] = [
  {
    path: 'paises',
    loadComponent: () =>
      import('./country/list/list.component').then((c) => c.ListComponent),
  },
  {
    path: 'ciudades',
    loadComponent: () =>
      import('./city/list/list.component').then((c) => c.ListComponent),
  },
  {
    path: 'lenguajes',
    loadComponent: () =>
      import('./language/list/list.component').then((c) => c.ListComponent),
  },
  {
    path: 'niveles',
    loadComponent: () =>
      import('./level/list/list.component').then((c) => c.ListComponent),
  },
  {
    path: 'cursos',
    loadComponent: () =>
      import('./course/list/list.component').then((c) => c.ListComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'paises',
  },
];
