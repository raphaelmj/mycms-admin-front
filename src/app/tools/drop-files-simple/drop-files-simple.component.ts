import {Component, OnInit, EventEmitter, Output, AfterContentChecked, Input} from '@angular/core';
import {UploadSimpleService} from './upload-simple.service';
import {HttpResponse} from '@angular/common/http';

export type UploadSimpleType = 'one' | 'many';

@Component({
  selector: 'app-drop-files-simple',
  templateUrl: './drop-files-simple.component.html',
  styleUrls: ['./drop-files-simple.component.scss']
})
export class DropFilesSimpleComponent implements OnInit, AfterContentChecked {
  files: File[] = [];
  formData: FormData;
  @Input() folder: string = 'custom';
  @Input() uploadType: UploadSimpleType = 'one';
  @Output() onUpload: EventEmitter<string[] | string> = new EventEmitter<string[] | string>()

  constructor(private uploadSimpleService: UploadSimpleService) {
  }

  ngOnInit(): void {
  }

  uploadFiles(files: File[]): void {
    this.uploadSimpleService.uploadFiles(this.formData, this.uploadType, this.folder).subscribe(event => {
      if (event instanceof HttpResponse) {
        this.onUpload.emit(event.body);
        this.files = [];
      }
    });

  }

  uploadFile(file: File): void {
    this.uploadSimpleService.uploadFiles(this.formData, this.uploadType, this.folder).subscribe(event => {
      if (event instanceof HttpResponse) {
        this.onUpload.emit(event.body);
        this.files = [];
      }
    });
  }

  removeFileFromCollection(index): void {
    this.files.splice(index, 1);
  }

  removeFileFirst(): void {
    this.files.splice(0, 1);
  }

  ngAfterContentChecked(): void {}
}
