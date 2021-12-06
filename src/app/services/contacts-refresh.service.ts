import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsRefreshService {
  action$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  refresh(): void {
    this.action$.next(true);
  }
}
