import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { PersistanceService } from '../shared/services/persistance.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const persistanceService = inject(PersistanceService);
  const token = persistanceService.get('accessToken');
  const isLoginRequest = request.url.endsWith('/token');
  request = isLoginRequest
    ? request
    : request.clone({
        setHeaders: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
  return next(request);
};