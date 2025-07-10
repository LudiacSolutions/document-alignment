import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieUtil } from '../../shared/utils/cookie.util';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isAuthenticated = !!CookieUtil.getCookie('accessToken');
  if (!isAuthenticated) {
    router.navigate(['/signin']);
    return false;
  }
  return true;
};
