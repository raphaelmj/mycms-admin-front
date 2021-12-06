import { Injectable } from '@angular/core';
import {AsyncSubject, BehaviorSubject, Observable, Subject} from 'rxjs';
import {ImageCropperConfig, ImageCropperData} from '../../tools/modal/image-cropper/image-cropper-modal.component';
import {first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ModalImageCreatorService {
  actionModal$: BehaviorSubject<ImageCropperConfig> = new BehaviorSubject<ImageCropperConfig>(null);
  actionOutModal$: Subject<ImageCropperData>;

  createModal(data?: ImageCropperConfig): Observable<ImageCropperData> {
    this.actionOutModal$ = new Subject<ImageCropperData>();
    this.actionModal$.next(data);

    return this.actionOutModal$.pipe(first());
  }

  finish(dataOut: ImageCropperData): void {
    this.actionOutModal$.next(dataOut);
  }

  stream(): Observable<ImageCropperConfig> {
    return this.actionModal$.asObservable();
  }
}
