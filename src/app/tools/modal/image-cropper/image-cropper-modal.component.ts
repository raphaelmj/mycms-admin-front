import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {fromEvent, Observable, of} from 'rxjs';
import {pluck, switchMap} from 'rxjs/operators';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {ImageFormat} from '../../../interfaces/types/image-format';

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
  templateUrl: './image-cropper.-modalcomponent.html',
  styleUrls: ['./image-cropper-modal.component.scss'],
  })
export class ImageCropperModalComponent implements OnInit {

  @Input() config?: ImageCropperConfig = {
    maintainAspectRatio: false,
    width: 4,
    height: 3,
    format: 'png',
    resizeToWidth: 1000
  };
  @Output() imageEmit: EventEmitter<ImageCropperData> = new EventEmitter<ImageCropperData>();
  @Output() closeEmit: EventEmitter<any> = new EventEmitter<any>();
  blob$: Observable<Blob>;
  base64$: Observable<string>;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('paste', ['$event'])
  onPaste(e: ClipboardEvent): void {
    const clipboardData = e.clipboardData || (window as any).clipboardData;
    const items: DataTransferItem[] = Array.from(clipboardData.items);
    const textData = items.find((x) => x.type === 'text/plain');
    const imageData = items.find((x) => /image/i.test(x.type));

    if (imageData) {
      this.blob$ = of(imageData.getAsFile());
      this.base64$ = this.blob$.pipe(
        switchMap((b: File) => {
          const fileReader = new FileReader();
          return this.imageToBase64(fileReader, b);
        })
      );
    }
  }

  imageToBase64(fileReader: FileReader, fileToRead: File): Observable<string> {
    fileReader.readAsDataURL(fileToRead);
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
