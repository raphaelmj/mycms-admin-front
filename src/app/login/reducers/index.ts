import { AuthUser, User } from './../../interfaces/user.interface';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  on,
} from '@ngrx/store';
import * as AuthActions from '../auth.actions';
// import { environment } from '../../../environments/environment';

export const authFeatureKey = 'auth';

export interface AuthState {
  authUser: AuthUser;
  user: User;
}

export const initialAuthState: AuthState = {
  authUser: undefined,
  user: undefined,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => {
    return {
      authUser: action.authUser,
      user: action.user,
    };
  }),
  on(AuthActions.logout, (state, action) => {
    return {
      authUser: undefined,
      user: undefined,
    };
  })
);

// export const currentUserReducer = createReducer(

// )

export const reducers: ActionReducerMap<any> = {};

// export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
