import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginInActionService {
  action$: BehaviorSubject<{
    user?: AuthUser;
    auth: boolean;
  }> = new BehaviorSubject({ auth: false });

  constructor() {}

  actionPush(auth: boolean, user?: AuthUser) {
    this.action$.next({ user, auth });
  }
}
