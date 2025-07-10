import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { CookieUtil } from '../../shared/utils/cookie.util';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = CookieUtil.getCookie('accessToken');
  const router = inject(Router);
  const authService = inject(AuthService);

  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        // Perform logout actions
        authService.logout();
        router.navigate(['/signin']);
      }

      return throwError(() => error);
    })
  );
};
