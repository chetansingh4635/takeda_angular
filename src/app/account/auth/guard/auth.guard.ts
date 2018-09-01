import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AccountService } from '../account.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const isLoggedIn = this.accountService.getUserLoggedIn();
    if (isLoggedIn === true) {
      return true;
    } else {
      this.router.navigateByUrl('/');
      return false;
    }
  }
}