import { logout } from './../login/auth.actions';
import {
  first,
  concatMap,
  map,
  catchError,
  tap,
  skipWhile,
} from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, pipe } from 'rxjs';
import {AppState} from '../reducers';

@Injectable({
  providedIn: 'root',
})
export class AppTokenInterceptor implements HttpInterceptor {
  exceptUrls: string[] = ['/auth/login', '/logout'];

  constructor(private store: Store<AppState>) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log(request.method, request.url);
    if (!this.checkExceptUrl(request.url)) {
      return this.store.pipe(
        first(),
        map((state) => {
          return state?.auth.authUser ? state?.auth.authUser.token : null;
        }),
        concatMap((accessToken) => {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ` + accessToken,
            },
          });
          return next.handle(request).pipe(
            tap((evt) => {}),
            catchError((err) => {
              if (err.status == 401) {
                this.store.dispatch(logout());
              }
              return of(err);
            })
          );
        })
      );
    } else {
      return next.handle(request);
    }
  }

  checkExceptUrl(url: string): boolean {
    var httpRoute = url.replace(environment.API_URL, '');
    return this.exceptUrls.includes(httpRoute);
  }
}
