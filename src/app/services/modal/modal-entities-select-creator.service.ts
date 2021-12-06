import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {first} from 'rxjs/operators';
import {EntitiesSelectConfig, EntitiesSelectData} from '../../tools/modal-entities-select/modal-entities-select.component';

@Injectable({
  providedIn: 'root'
})
export class ModalEntitiesSelectCreatorService {
  actionModal$: BehaviorSubject<EntitiesSelectConfig> = new BehaviorSubject<EntitiesSelectConfig>(null);
  actionOutModal$: Subject<EntitiesSelectData>;

  createModal(data?: EntitiesSelectConfig): Observable<EntitiesSelectData> {
    this.actionOutModal$ = new Subject<EntitiesSelectData>();
    this.actionModal$.next(data);

    return this.actionOutModal$.pipe(first());
  }

  finish(dataOut: EntitiesSelectData): void {
    this.actionOutModal$.next(dataOut);
  }

  stream(): Observable<EntitiesSelectConfig> {
    return this.actionModal$.asObservable();
  }
}
