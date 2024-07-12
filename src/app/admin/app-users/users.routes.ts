import { Route } from '@angular/router';

export const USER_ROUTES: Route[] = [
  {
    path: 'clientes',
    loadComponent: () =>
      import('./client/list/list.component').then((c) => c.ListComponent),
  },
  {
    path: 'profesores',
    loadComponent: () =>
      import('./teacher/list/list.component').then((c) => c.ListComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'clientes',
  },
];
