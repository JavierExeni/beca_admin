import { Routes } from '@angular/router';
import { adminGuard } from './shared/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    canActivateChild: [adminGuard],
    loadChildren: () =>
      import('./admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./authentication/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];
