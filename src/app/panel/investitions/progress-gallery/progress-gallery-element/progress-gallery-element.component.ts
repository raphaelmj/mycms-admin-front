import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ProgressGalleryElement} from '../../../../interfaces/investition.interface';
import {environment} from '../../../../../environments/environment';
import {ModalImageCreatorService} from '../../../../services/modal/modal-image-creator.service';
import {Subscription} from 'rxjs';
import {concatMap, switchMap} from 'rxjs/operators';
import {ImageService} from '../../../../services/image.service';
import {StandardGalleryComponent} from '../../standard-gallery/standard-gallery.component';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-progress-gallery-element',
  templateUrl: './progress-gallery-element.component.html',
  styleUrls: ['./progress-gallery-element.component.css']
})
export class ProgressGalleryElementComponent implements OnInit {
  @ViewChild('tempEdit', { read: ViewContainerRef })
  tempEdit: ViewContainerRef;
  @Input() progressGalleryElement: ProgressGalleryElement;
  @Input() index: number;
  @Output() onChange: EventEmitter<{element: ProgressGalleryElement, index: number}> = new EventEmitter<{element: ProgressGalleryElement, index: number}>();
  @Output() onRemove: EventEmitter<number> = new EventEmitter<number>();
  webUrl: string = environment.WEB_URL;
  thumbImageSource: string = null;
  thumbImageSubscription: Subscription;
  progressGalleryElementThumb: string;
  changed: boolean = false;
  form: FormGroup;

  standardGalleryC: ComponentRef<StandardGalleryComponent>;

  standardGalleryChangeSubscription: Subscription;
  standardGalleryCloseSubscription: Subscription;

  constructor(
    private modalImageCreatorService: ModalImageCreatorService,
    private imageService: ImageService,
    private cf: ComponentFactoryResolver,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.progressGalleryElementThumb = this.progressGalleryElement.imageThumb;
    this.form = this.fb.group({
      name: [this.progressGalleryElement.name]
    });
    this.form.get('name').valueChanges.subscribe(name => {
      this.progressGalleryElement.name = name;
      this.onChange.emit({element: this.progressGalleryElement, index: this.index});
    });
  }

  reThumb(): void {
    this.progressGalleryElement.imageThumb = this.progressGalleryElementThumb;
    this.changed = false;
  }

  changeThumbImage(): void {
    this.thumbImageSubscription = this.modalImageCreatorService.createModal({
      width: 1,
      height: 0.7,
      resizeToWidth: 500,
      format: 'jpg',
      maintainAspectRatio: true
    })
      .pipe(
        concatMap(data => this.imageService.uploadCropped(data.source, 'jpg', 'progress-thumbs'))
      )
      .subscribe(data => {
        this.progressGalleryElement.imageThumb = data.src;
        this.onChange.emit({element: this.progressGalleryElement, index: this.index});
        this.changed = true;
    });
  }

  showStandardGallery(): void {
    this.tempEdit.clear();
    const st = this.cf.resolveComponentFactory(StandardGalleryComponent as Type<StandardGalleryComponent>);
    this.standardGalleryC = this.tempEdit.createComponent(st);
    this.standardGalleryC.instance.galleryElements = this.progressGalleryElement.images;
    this.standardGalleryChangeSubscription = this.standardGalleryC.instance.onAdd.subscribe(gallery => {
      this.progressGalleryElement.images = gallery;
      this.standardGalleryC.destroy();
    });
    this.standardGalleryCloseSubscription = this.standardGalleryC.instance.emitClose.subscribe(() => {
      this.standardGalleryC.destroy();
    });
  }


  remove(): void {
    this.onRemove.emit(this.index);
  }

}


