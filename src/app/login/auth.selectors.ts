import {AuthState} from './reducers/index';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UserRole} from '../interfaces/enums/user-role.enum';

const selectAuthState = createFeatureSelector<AuthState>('auth');

export const isLogIn = createSelector(
  selectAuthState,
  (auth) => !!auth.authUser
);

export const isLogOut = createSelector(isLogIn, (logIn) => !logIn);

export const selectUserAuth = createSelector(
  selectAuthState,
  (auth) => auth.authUser
);

export const isRedactor = createSelector(
    selectAuthState,
    (auth) => (auth.user?.role === UserRole.redactor)
);

export const isAdmin = createSelector(
    selectAuthState,
    (auth) => (auth.user?.role === UserRole.admin)
);

export const selectUser = createSelector(selectAuthState, (auth) => auth.user);
