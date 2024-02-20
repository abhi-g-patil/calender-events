import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem('token')) {
    localStorage.removeItem('token');
    return true;
  }
  
  inject(Router).navigate(['']);
  return false;
};
