import { ImageGallery } from './../../interfaces/image-gallery.interface';
import {
  Component,
  AfterContentChecked,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  HttpResponse,
  HttpEvent,
} from '@angular/common/http';
import { UploadService } from './upload.service';
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from 'ngx-file-drop';
import {GalleryElement} from '../../interfaces/investition.interface';

@Component({
  selector: 'app-drop-files',
  templateUrl: './drop-files.component.html',
  styleUrls: ['./drop-files.component.scss'],
})
export class DropFilesComponent implements AfterContentChecked {
  filesEntry: NgxFileDropEntry[] = [];
  files: File[] = [];
  formData: FormData;
  httpEvent: HttpEvent<{}>;
  uploadPercent: number = 0;
  @Output()
  emitImage: EventEmitter<GalleryElement> = new EventEmitter<GalleryElement>();

  constructor(
    private uplaodService: UploadService,
  ) {}


  dropped(files: NgxFileDropEntry[]): void {
    this.filesEntry = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // Here you can access the real file
          // console.log(droppedFile.relativePath, file);
          const formData: FormData = new FormData();
          formData.append('file', file, droppedFile.relativePath);

          this.uplaodService.uploadFiles(formData).subscribe((event) => {
            this.httpEvent = event;
            // console.log(event);
            if (event instanceof HttpResponse) {
              this.files = [];
              // console.log(event.body);
              this.emitImage.emit(event.body);
            }
          });

          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)

          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        // console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  fileOver(event) {}

  fileLeave(event) {}

  ngAfterContentChecked() {
    // from(this.files).pipe(
    //   filter(file => {
    //     var bool: boolean = true;
    //     this.filesUF.map(f => {
    //       if (f.name == file.name && f.type == file.type && f.size == file.size) {
    //         bool = false;
    //       }
    //     })
    //     // console.log(file.type)
    //     if (file.type != 'image/jpeg' && file.type != 'image/png') {
    //       bool = false;
    //     }
    //     return bool
    //   })
    // ).subscribe(fileUnique => {
    //   this.filesUF.push(fileUnique);
    // })
  }
}
