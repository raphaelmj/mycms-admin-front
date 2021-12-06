import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArticlesRefreshService {
  action$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  refresh(): void {
    this.action$.next(true);
  }
}
