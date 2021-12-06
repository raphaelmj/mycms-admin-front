import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {ConfirmConfig, ConfirmDataOut} from '../../tools/modal/confirm-modal/confirm-modal.component';
import {first} from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ModalCreatorService {
    actionModal$: BehaviorSubject<ConfirmConfig> = new BehaviorSubject<ConfirmConfig>(null);

    actionOutModal$: Subject<ConfirmDataOut>;

    createModal(data: ConfirmConfig): Observable<ConfirmDataOut> {
      this.actionOutModal$ = new Subject<ConfirmDataOut>();
      this.actionModal$.next(data);

      return this.actionOutModal$.asObservable().pipe(first());
    }

    finish(dataOut: ConfirmDataOut): void {
        this.actionOutModal$.next(dataOut);
    }

    stream(): Observable<ConfirmConfig> {
        return this.actionModal$.asObservable();
    }
}
