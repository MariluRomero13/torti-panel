import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService {
  constructor(private dataSvc: DataService,
              private authSvc: AuthService,
              private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.dataSvc.getToken();
    const refreshToken = this.dataSvc.getRefreshToken();

    if (token) {
      request = this.addToken(request, token);
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {
          if (error.url.includes('/login') && error.status === 401) {
            return throwError(error);
          }
          if (error.status === 400) {
            return throwError(error);
          }
          if (error.error.error.name === 'InvalidJwtToken' ) {
            this.dataSvc.removeAll();
            this.router.navigate(['/login']);
          }
          if (error.status === 401) {
            this.authSvc.requestCount++;
            if (this.authSvc.requestCount > 3) {
              this.authSvc.requestCount = 0;
              return throwError(error);
            }
            return this.unauthorized(request, next, refreshToken);
          }
        }
      })
    );
  }

  private addToken(req: HttpRequest<any>, token: string) {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private unauthorized(
    request: HttpRequest<any>,
    next: HttpHandler,
    refreshToken: string
  ): Observable<HttpEvent<any>> {
    return this.dataSvc.getRefreshToken().pipe(
      switchMap((tokenData: any) => {
        this.dataSvc.setData(tokenData);
        request = this.addToken(request, tokenData.token);
        return next.handle(request);
      }),
      catchError(error => {
        if (error.error.error.name === 'InvalidRefreshToken'
            || error.error.error.name === 'E_INVALID_JWT_REFRESH_TOKEN') {
          this.dataSvc.removeAll();
          this.router.navigate(['/login']);
          return next.handle(request);
        }
      })
    );
  }
}
