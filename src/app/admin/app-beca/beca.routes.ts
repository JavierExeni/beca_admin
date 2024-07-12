import { Route } from '@angular/router';

export const BECA_ROUTES: Route[] = [
  {
    path: 'universidades',
    loadComponent: () =>
      import('./university/list/list.component').then((c) => c.ListComponent),
  },
  {
    path: 'becas',
    loadComponent: () =>
      import('./beca/list/list.component').then((c) => c.ListComponent),
  },
  {
    path: 'webinars',
    loadComponent: () =>
      import('./webinar/list/list.component').then((c) => c.ListComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'universidades',
  },
];
