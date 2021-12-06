import { pluck, switchMap, tap } from 'rxjs/operators';
import { fromEvent, Observable, of } from 'rxjs';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

export interface ImageInfoData {
  source: string;
  bundleData?: any;
}

@Component({
  selector: 'app-image-upload-element',
  templateUrl: './image-upload-element.component.html',
  styleUrls: ['./image-upload-element.component.scss'],
})
export class ImageUploadElementComponent implements OnInit {
  @Input() maintainAspectRatio?: boolean = false;
  @Input() width?: number = 4;
  @Input() height?: number = 3;
  @Input() format?: string = 'png';
  @Input() resizeToWidth?: number = 1000;
  @Input() bundleData: any;
  @Output()
  imageEmit: EventEmitter<ImageInfoData> = new EventEmitter<ImageInfoData>();
  @Output() closeEmit: EventEmitter<any> = new EventEmitter<any>();
  blob$: Observable<Blob>;
  base64$: Observable<string>;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor() {}

  ngOnInit(): void {}

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
      bundleData: this.bundleData,
    });
  }
  close(): void {
    this.closeEmit.emit();
  }
}
