import { AuthService } from './../services/auth.service';
import { User, AuthUser } from './../interfaces/user.interface';
import { login } from './auth.actions';
import { AuthState } from './reducers/index';
import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { skipUntil, tap, skipWhile } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  email: string = '';
  password: string = '';
  spinnerShow: boolean = false;
  isAuthAlert: boolean = false;
  userEmailPattern = '^[0-9a-z_.-]+@[0-9a-z.-]+.[a-z]{2,3}$';
  subLogin: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AuthState>
  ) {}
  ngOnDestroy(): void {
    if (this.subLogin) this.subLogin.unsubscribe();
  }

  sumbmitLogin(): void {
    this.spinnerShow = true;
    this.subLogin = this.authService
      .login(this.email, this.password)
      .pipe(
        skipWhile((data) => {
          if (!data.success) {
            this.spinnerShow = false;
            this.isAuthAlert = true;
          } else {
            this.isAuthAlert = false;
          }
          return !data.success;
        }),
        tap((res: { success: boolean; authUser: AuthUser; user: User }) => {
          if (res.success) {
            const loginAction = login({
              authUser: res.authUser,
              user: res.user,
            });
            this.store.dispatch(loginAction);
          }
        })
      )
      .subscribe((res) => {
        this.spinnerShow = false;
        if (res.success) {
          this.router.navigate(['/panel']);
        }
      });
  }
}
