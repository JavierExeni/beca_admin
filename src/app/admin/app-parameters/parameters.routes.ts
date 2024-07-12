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
    path: 'temas',
    loadComponent: () =>
      import('./topic/list/list.component').then((c) => c.ListComponent),
  },
  {
    path: 'lecciones',
    loadComponent: () =>
      import('./lesson/list/list.component').then((c) => c.ListComponent),
  },
  {
    path: 'evaluaciones',
    loadComponent: () =>
      import('./test/list/list.component').then((c) => c.ListComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'paises',
  },
];
