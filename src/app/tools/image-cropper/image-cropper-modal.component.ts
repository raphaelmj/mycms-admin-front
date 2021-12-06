import {Component, EventEmitter, HostListener, Input, NgModule, OnInit, Output} from '@angular/core';
import {fromEvent, Observable, of} from 'rxjs';
import {pluck, switchMap} from 'rxjs/operators';
import {ImageCropperModule, ImageCroppedEvent} from 'ngx-image-cropper';
import {CustomEditorService} from '../../custom-editor/services/custom-editor.service';


export type ImageFormat = 'jpg' | 'png';

export interface ImageCropperConfig {
  maintainAspectRatio?: boolean;
  width?: number;
  height?: number;
  format?: ImageFormat;
  resizeToWidth?: number;
  bundleData?: any;
}

export interface ImageCropperData {
  source: string;
  bundleData?: any;
}

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper-modal.component.html',
  styleUrls: ['./image-cropper-modal.component.scss'],
  })
export class ImageCropperModalComponent implements OnInit {

  @Input() config: ImageCropperConfig;
  @Output() imageEmit: EventEmitter<ImageCropperData> = new EventEmitter<ImageCropperData>();
  @Output() closeEmit: EventEmitter<any> = new EventEmitter<any>();
  blob$?: Observable<File|null>;
  base64$?: Observable<string|null>;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor() {
    this.config = {
      maintainAspectRatio: false,
      width: 4,
      height: 3,
      format: 'png',
      resizeToWidth: 1000
    };
  }

  ngOnInit(): void {
  }

  @HostListener('paste', ['$event'])
  onPaste(e: ClipboardEvent): void {
    const clipboardData = e.clipboardData || (window as any).clipboardData;
    const items: DataTransferItem[] = Array.from(clipboardData.items);
    // const textData = items.find((x) => x.type === 'text/plain');
    const imageData = items.find((x) => /image/i.test(x.type));

    if (imageData) {
      this.blob$ = of(imageData.getAsFile());
      this.base64$ = this.blob$.pipe(
        switchMap((file: File | null) => {
          if (file) {
            const fileReader = new FileReader();
            return this.imageToBase64(fileReader, file);
          }
          return of(null);
        })
      );
    }
  }

  imageToBase64(fileReader: FileReader, fileToRead: File): Observable<string|null> {
    fileReader.readAsDataURL(fileToRead as Blob);
    return fromEvent(fileReader, 'load').pipe(pluck('currentTarget', 'result'));
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
  }
  imageLoaded(image: HTMLImageElement): void {
    // show cropper
  }
  cropperReady(): void {
    // cropper ready
  }
  loadImageFailed(): void {
    // show message
  }

  onFileDropped(event: FileList): void{
    if (event.length > 0) {
      this.base64$ = of(event[0]).pipe(
        switchMap((b: File) => {
          const fileReader = new FileReader();
          return this.imageToBase64(fileReader, b);
        })
      );
    }
  }

  addImage(): void {
    this.imageEmit.emit({
      source: this.croppedImage,
      bundleData: this.config.bundleData,
    });
  }
  close(): void {
    this.closeEmit.emit();
  }

}

@NgModule({
  declarations: [ImageCropperModalComponent],
  imports: [ImageCropperModule],
  exports: [ImageCropperModalComponent],
  providers: [
    CustomEditorService
  ]
})
export class ImageCropperModalComponentModule {
}
