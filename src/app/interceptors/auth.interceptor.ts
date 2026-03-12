import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();

  let cloneReq = req;

  if (token) {
    cloneReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
  }

  return next(cloneReq).pipe(
    catchError((error) => {
      console.log("Error caught:", error);

      if (error.status === 401) {

        
        localStorage.removeItem('token');

        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};