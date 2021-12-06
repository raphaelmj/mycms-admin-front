import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {first} from 'rxjs/operators';
import {ElementsOrderConfig, ElementsOrderData} from '../../tools/modal/modal-order-change/modal-order-change.component';

@Injectable({
  providedIn: 'root'
})
export class ModalOrderCreatorService {
  actionModal$: BehaviorSubject<ElementsOrderConfig> = new BehaviorSubject<ElementsOrderConfig>(null);
  actionOutModal$: Subject<ElementsOrderData>;

  createModal(data?: ElementsOrderConfig): Observable<ElementsOrderData> {
    this.actionOutModal$ = new Subject<ElementsOrderData>();
    this.actionModal$.next(data);

    return this.actionOutModal$.pipe(first());
  }

  finish(dataOut: ElementsOrderData): void {
    this.actionOutModal$.next(dataOut);
  }

  stream(): Observable<ElementsOrderConfig> {
    return this.actionModal$.asObservable();
  }
}
