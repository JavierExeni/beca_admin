import { Route } from '@angular/router';

export const LANDING_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./layout.component').then((c) => c.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/principal/principal.component').then(
            (c) => c.PrincipalComponent
          ),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '',
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '',
  },
];
