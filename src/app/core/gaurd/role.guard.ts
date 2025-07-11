// role.guard.ts
import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { CookieUtil } from '../../shared/utils/cookie.util';
import { ToasterService } from '../../shared/Toaster/toaster.service';

export const roleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const Auth = inject(AuthService);
  const toast = inject(ToasterService);

  const token = CookieUtil.getCookie('accessToken');
  const expectedRole = route.data['expectedRole'] as string;

  if (!token) {
    return router.createUrlTree(['/signin']);
  }

  const user = Auth.decodeToken();
  const userRole = user.Role;
  const userPlan = user.Plan;

  // If Role or Plan is missing
  if (!userRole || !userPlan) {
    toast.showToast('Invalid user session. Please sign in again.', 'error');
    return router.createUrlTree(['/signin']);
  }

  if (userRole === expectedRole) {
    if (userRole === 'User' && userPlan === 'free') {
      const fullUrl = state.url;
      const blockedRoutes = ['core-documents', 'references'];

      if (blockedRoutes.some((path) => fullUrl.includes(path))) {
        toast.showToast(
          'Upgrade your subscription to access this feature.',
          'info'
        );
        return router.createUrlTree(['/user/dashboard']);
      }
    }
    return true;
  }

  return router.createUrlTree(['/signin']);
};
