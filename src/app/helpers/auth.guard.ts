import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthenticationService } from '../services/auth/authentication.service';


@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    public auth: AuthenticationService,
    public router: Router
  ) {}
  canActivate(): boolean {
    if (!this.auth.getToken()) {
      this.router.navigateByUrl('/sign-in');
      return false;
    }
    return true;
  }
}
