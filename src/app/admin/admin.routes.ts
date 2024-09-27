import { Route } from '@angular/router';
import { adminGuard, teacherGuard } from '../shared/guards/admin.guard';

export const ADMIN_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./layout.component').then((c) => c.LayoutComponent),
    children: [
      {
        path: '',
        children: [
          {
            path: 'usuarios',
            canActivateChild: [adminGuard],
            loadChildren: () =>
              import('./app-users/users.routes').then((m) => m.USER_ROUTES),
          },
          {
            path: 'parametros',
            canActivateChild: [teacherGuard],
            loadChildren: () =>
              import('./app-parameters/parameters.routes').then(
                (m) => m.PARAMETER_ROUTES
              ),
          },
          {
            path: 'beca',
            canActivateChild: [teacherGuard],
            loadChildren: () =>
              import('./app-beca/beca.routes').then((m) => m.BECA_ROUTES),
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'beca',
          },
        ],
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '',
  },
];
