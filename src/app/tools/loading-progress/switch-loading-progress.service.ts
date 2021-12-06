import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SwitchLoadingProgressService {
  action$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  show() {
    this.action$.next(true);
  }

  hide() {
    this.action$.next(false);
  }
}
