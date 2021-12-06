import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UploadSimpleType} from '../../drop-files-simple/drop-files-simple.component';

export interface UploadFilesConfig {
  folder?: string;
  uploadType: UploadSimpleType;
  bundleData?: any;
}

export interface UploadFilesData {
  data: string[] | string;
  uploadType: UploadSimpleType;
  bundleData?: any;
}

@Component({
  selector: 'app-upload-files-modal',
  templateUrl: './upload-files-modal.component.html',
  styleUrls: ['./upload-files-modal.component.scss']
})
export class UploadFilesModalComponent implements OnInit {
  @Input() config: UploadFilesConfig = {
    folder: 'custom',
    uploadType: 'one'
  };
  @Output() onChange: EventEmitter<UploadFilesData> = new EventEmitter<UploadFilesData>();
  @Output() emitClose: EventEmitter<void> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  onUpload(data: string| string[]): void {
    this.onChange.emit({
      data,
      uploadType: this.config.uploadType,
      bundleData: this.config.bundleData
    });
  }

  closeEdit(): void {
    this.emitClose.emit();
  }
}
