import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ImageCropperConfig} from '../modal/image-cropper/image-cropper-modal.component';
import {MapFiles} from '../../interfaces/map-files.interface';
import {ImageService} from '../../services/image.service';
import {environment} from '../../../environments/environment';
import {ModalImageCreatorService} from '../../services/modal/modal-image-creator.service';
import {Subscription} from 'rxjs';
import {skipWhile, switchMap} from 'rxjs/operators';
import {SimpleHelperService} from '../../services/simple-helper.service';

@Component({
  selector: 'app-map-files-uploader',
  templateUrl: './map-files-uploader.component.html',
  styleUrls: ['./map-files-uploader.component.css']
})
export class MapFilesUploaderComponent implements OnInit, OnDestroy {
  @Input() mapLessConfig: ImageCropperConfig;
  @Input() mapMoreConfig: ImageCropperConfig;
  @Input() currentMapFiles: MapFiles = {
    lessFile: null,
    moreFile: {
      src: null,
      sizeString: null
    }
  };
  @Output() onMapFilesChange: EventEmitter<MapFiles> = new EventEmitter<MapFiles>();

  mapFiles: MapFiles = {
    lessFile: null,
    moreFile: {
      src: null,
      sizeString: null
    }
  };
  webUrl: string = environment.WEB_URL;
  lessMapSubscription: Subscription;
  lessMoreSubscription: Subscription;
  clearedMaps: {lessMap: boolean, moreMap: boolean} = {
    lessMap: false,
    moreMap: false
  };

  constructor(
    private imageService: ImageService,
    private modalImageCreatorService: ModalImageCreatorService,
    private simpleHelperService: SimpleHelperService,
  ) { }

  ngOnInit(): void {

  }

  addLessMap(): void {
    this.lessMapSubscription = this.modalImageCreatorService.createModal(this.mapLessConfig)
      .pipe(
        skipWhile(data => !data),
        switchMap(data => this.imageService.uploadCropped(data.source, this.mapLessConfig.format, 'office-maps'))
      )
      .subscribe(data => {
        if (data) {
          this.mapFiles.lessFile = data.src;
          this.onChange();
        }
    });
  }

  addMoreMap(): void {
    this.lessMoreSubscription = this.modalImageCreatorService.createModal(this.mapMoreConfig)
      .pipe(
        skipWhile(data => !data),
        switchMap(data => this.imageService.uploadCropped(data.source, this.mapLessConfig.format, 'office-maps'))
      )
      .subscribe(data => {
        if (data) {
          this.mapFiles.moreFile = data;
          this.onChange();
        }
      });
  }

  clearLessMap(): void {
    const mapFiles: MapFiles = this.simpleHelperService.objectNewInstance(this.currentMapFiles);
    mapFiles.lessFile = null;
    this.clearedMaps.lessMap = true;
    this.onMapFilesChange.emit(mapFiles);
  }

  clearMoreMap(): void {
    const mapFiles: MapFiles = this.simpleHelperService.objectNewInstance(this.currentMapFiles);
    mapFiles.moreFile = null;
    this.clearedMaps.moreMap = true;
    this.onMapFilesChange.emit(mapFiles);
  }

  onChange(): void {
    const mapFiles: MapFiles = this.simpleHelperService.objectNewInstance(this.currentMapFiles);

    if (this.mapFiles.lessFile) {
      mapFiles.lessFile = this.mapFiles.lessFile;
    }

    if (this.mapFiles.moreFile?.src) {
      mapFiles.moreFile = this.mapFiles.moreFile;
    }

    this.onMapFilesChange.emit(mapFiles);

  }

  ngOnDestroy(): void {
    if (this.lessMapSubscription) {
      this.lessMapSubscription.unsubscribe();
    }
    if (this.lessMoreSubscription) {
      this.lessMoreSubscription.unsubscribe();
    }
  }

}
