import { AuthUser, User } from './../interfaces/user.interface';
import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Login Page] User login',
  props<{ authUser: AuthUser; user: User }>()
);

export const logout = createAction('[Top Menu] Logout');
