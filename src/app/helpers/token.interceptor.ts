import { Injectable, Injector } from '@angular/core';
import { throwError } from 'rxjs';

import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,
  HttpResponse, HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/auth/authentication.service';
import { catchError } from 'rxjs/operators';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private authService: AuthenticationService;

  constructor(private injector: Injector) {
  }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(request.url.trim() == "http://localhost:8080/authenticate" ||
        request.url.trim() == "http://localhost:8080/register" ||
        request.url.trim() == "http://localhost:8080/password-reset" ||
        request.url.trim() == "http://localhost:8080/password-reset/verify-token" ||
        request.url.trim() == "http://localhost:8080/password-reset/verify-token/save-password") {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json'
        }
      });
    }
    else {
      this.authService = this.injector.get(AuthenticationService);
      const token: string = this.authService.getToken();
      request = request.clone({
        setHeaders: {
          'Authorization': "Bearer "+ token,
          'Content-Type': 'application/json'
        }
      });
    }     
    return next.handle(request);
  }
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  //Redirect to login->flushed user auth state
  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(catchError(err => {
          if (err.status === 403) {
              this.router.navigateByUrl('/sign-in');
          }

          const error = err.error.message || err.statusText;
          return throwError(error);
      }))
  }
  //Redirect to login->flushed user auth state
}
