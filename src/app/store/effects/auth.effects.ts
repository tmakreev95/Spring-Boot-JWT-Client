import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { Observable, EMPTY, of } from 'rxjs';
import { tap, map, mergeMap, catchError, exhaustMap } from 'rxjs/operators';

import { User } from '../../model/auth/user';

import { AuthenticationService } from '../../services/auth/authentication.service';

import {
  AuthActionTypes,
  LogIn, LogInSuccess, LogInFailure,
  LogOut,
} from '../actions/auth.actions';

import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthenticationService,
    private router: Router,
  ) {}

  LogIn: Observable<any> = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActionTypes.LOGIN),
      mergeMap((action: LogIn) => 
        this.authService.authenticate(action.payload.email, action.payload.password)
          .pipe(
            map((response) => {
              const user = <User>({
                email: action.payload.email,
                token: response.jwt
              });              
                return new LogInSuccess({token: user.token, email: user.email});
            }),
            catchError((error: Error) => {
                return of(new LogInFailure({ error: error }));
            })
        )
      )
    )
  );

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
  ofType(AuthActionTypes.LOGIN_SUCCESS),
      tap((action: LogIn) => {
          localStorage.setItem('token', action.payload.token);
          this.router.navigateByUrl('/user/profile');
      })
  );

  @Effect({ dispatch: false })
      LogInFailure: Observable<any> = this.actions.pipe(
      ofType(AuthActionTypes.LOGIN_FAILURE)
  );


  @Effect({ dispatch: false })
  public LogOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap((user) => {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/sign-in');
    })
  );

//   @Effect({ dispatch: false })
//   GetStatus: Observable<any> = this.actions
//     .ofType(AuthActionTypes.GET_STATUS)
//     .switchMap(payload => {
//       return this.authService.getStatus();
//     });

}
