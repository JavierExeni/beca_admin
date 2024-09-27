import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../../authentication/auth.service';
import { USER_TYPE } from '../enum';
import { Location } from '@angular/common';

export const adminGuard: CanActivateChildFn = (route, state) => {
  const authService = inject(AuthService);
  const location = inject(Location);

  if (authService.role() == USER_TYPE.ADMIN) {
    return true;
  }
  location.back();
  return false;
};

export const teacherGuard: CanActivateChildFn = (route, state) => {
  const authService = inject(AuthService);
  const location = inject(Location);
  if (
    authService.role() == USER_TYPE.TEACHER ||
    authService.role() == USER_TYPE.ADMIN
  ) {
    return true;
  }
  location.back();
  return false;
};

export const clientGuard: CanActivateChildFn = (route, state) => {
  const authService = inject(AuthService);

  if (authService.role() == USER_TYPE.CLIENT) {
    return true;
  }
  return false;
};
