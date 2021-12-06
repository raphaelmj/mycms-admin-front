import { logout } from './../../login/auth.actions';
import { selectUserAuth } from './../../login/auth.selectors';
import { Store, select } from '@ngrx/store';
import { AuthState } from './../../login/reducers/index';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthUser } from '../../interfaces/user.interface';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent implements OnInit {
  login$: Observable<AuthUser>;
  webUrl: string = environment.WEB_URL;
  constructor(private store: Store<AuthState>) {}

  ngOnInit(): void {
    this.login$ = this.store.pipe(select(selectUserAuth));
  }

  logOut(): void {
    this.store.dispatch(logout());
  }
}
