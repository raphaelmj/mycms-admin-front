import { isLogOut } from './../login/auth.selectors';
import { first, tap, map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthState } from '../login/reducers';

@Injectable({
  providedIn: 'root',
})
export class RedirectIfNotauthGuard implements CanActivate {
  constructor(private router: Router, private store: Store<AuthState>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.pipe(
      select(isLogOut),
      map((isAuth) => {
        if (isAuth) {
          this.router.navigate(['/login']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
