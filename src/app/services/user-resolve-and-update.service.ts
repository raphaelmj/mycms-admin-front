import { isLogIn, selectUser } from './../login/auth.selectors';
import { AuthUser, User } from './../interfaces/user.interface';
import { updateLogin } from './../login/auth.actions';
import { tap, map, concatMap, first, finalize } from 'rxjs/operators';
import { AuthState } from './../login/reducers/index';
import { Store, select } from '@ngrx/store';
import { UserService } from './user.service';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserResolveAndUpdateService implements Resolve<User> {
  loading: boolean = false;
  constructor(
    private UserService: UserService,
    private store: Store<AuthState>
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User> {
    return this.UserService.getAuthUser().pipe(
      map((user: User) => {
        let authUser: AuthUser = JSON.parse(localStorage.getItem('authUser'));
        let { createdAt, startLengthValue, updatedAt, roads, ...rest } = user;
        const nAuthUser: AuthUser = {
          ...rest,
          ...{ token: authUser.token, id: authUser.id },
        };
        localStorage.setItem('authUser', JSON.stringify(nAuthUser));
        localStorage.setItem('user', JSON.stringify(user));
        return { user: user, authUser: nAuthUser };
      }),
      tap((userData) => {
        if (!this.loading) {
          this.store.dispatch(updateLogin(userData));
        }
      }),
      concatMap((s) => this.store.pipe(select(selectUser))),
      first(),
      finalize(() => (this.loading = false))
    );
  }
}
