import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AuthState} from '../login/reducers';
import {isAdmin} from '../login/auth.selectors';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminProtectGuard implements CanActivate {
  constructor(private store: Store<AuthState>) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.pipe(
        select(isAdmin),
        map(bool => bool)
    );
  }
}
