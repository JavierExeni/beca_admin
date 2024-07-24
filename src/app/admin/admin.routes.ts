import { Route } from '@angular/router';

export const ADMIN_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./layout.component').then((c) => c.LayoutComponent),
    children: [
      {
        path: 'admin',
        children: [
          {
            path: 'usuarios',
            loadChildren: () =>
              import('./app-users/users.routes').then((m) => m.USER_ROUTES),
          },
          {
            path: 'parametros',
            loadChildren: () =>
              import('./app-parameters/parameters.routes').then((m) => m.PARAMETER_ROUTES),
          },
          {
            path: 'beca',
            loadChildren: () =>
              import('./app-beca/beca.routes').then((m) => m.BECA_ROUTES),
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'usuarios',
          },
        ]
      },
      {
        path: '',
        children: [
          {
            path: 'dashboard',
            loadComponent: () =>
              import('./client/pages/dashboard/dashboard.component').then((c) => c.DashboardComponent),
          },
        ]
      }
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '',
  },
];
