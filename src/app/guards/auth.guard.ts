import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { inject } from '@angular/core';
import { RoutesConstant } from '../app.routes';

export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate([RoutesConstant.LOGIN], {
      queryParams: { loggedOut: true, origUrl: state.url },
    });
    return false;
  }

  return true;
};
