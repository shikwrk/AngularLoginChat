import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const loggedInAuthGuard: CanActivateFn = (route, state) => {
  if (!sessionStorage.getItem('jwtToken')) {
    return true;
  } else {
    const router = inject(Router);
    return router.navigate(['joinchat']);
  }
};

export const NotloggedInAuthGuard: CanActivateFn = (route, state) => {
  if (sessionStorage.getItem('jwtToken')) {
    return true;
  } else {
    const router = inject(Router);
    return router.navigate(['login']);
  }
};
