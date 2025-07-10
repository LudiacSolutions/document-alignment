// role.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { CookieUtil } from '../../shared/utils/cookie.util';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
  const router = inject(Router);
  const Auth = inject(AuthService);

  const token = CookieUtil.getCookie('accessToken');
  const expectedRole = route.data['expectedRole'] as string;

  if (!token) {
    return router.createUrlTree(['/signin']);
  }

  const userRole = Auth.decodeToken().Role;

  if (userRole === expectedRole) {
    return true;
  }

  // Optionally redirect to role-specific default page
  return router.createUrlTree(['/signin']);
};
