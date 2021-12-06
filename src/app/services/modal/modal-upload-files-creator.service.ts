import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {first} from 'rxjs/operators';
import {UploadFilesConfig, UploadFilesData} from '../../tools/modal/upload-files-modal/upload-files-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadFilesCreatorService {
  actionModal$: BehaviorSubject<UploadFilesConfig> = new BehaviorSubject<UploadFilesConfig>(null);
  actionOutModal$: Subject<UploadFilesData>;

  createModal(data?: UploadFilesConfig): Observable<UploadFilesData> {
    this.actionOutModal$ = new Subject<UploadFilesData>();
    this.actionModal$.next(data);

    return this.actionOutModal$.pipe(first());
  }

  finish(dataOut: UploadFilesData): void {
    this.actionOutModal$.next(dataOut);
  }

  stream(): Observable<UploadFilesConfig> {
    return this.actionModal$.asObservable();
  }
}
