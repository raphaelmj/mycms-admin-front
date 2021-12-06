import {Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {environment} from '../../../environments/environment';
import { Sortable } from 'sortablejs';
import {DOCUMENT} from '@angular/common';
import {BehaviorSubject, of, Subscription} from 'rxjs';
import {concatMap, map, skipWhile} from 'rxjs/operators';
import {PageSlide} from '../../interfaces/page.interface';
import {ModalImageCreatorService} from '../../services/modal/modal-image-creator.service';
import {ImageCropperData} from '../modal/image-cropper/image-cropper-modal.component';
import {PageService} from '../../services/page/page.service';

@Component({
  selector: 'app-slides-creator',
  templateUrl: './slides-creator.component.html',
  styleUrls: ['./slides-creator.component.css']
})
export class SlidesCreatorComponent implements OnInit, OnDestroy {
  @Input() slides: PageSlide[];
  @Input() id: number;
  @Output() onChange: EventEmitter<PageSlide[]> = new EventEmitter<PageSlide[]>();
  webUrl: string = environment.WEB_URL;
  sortable: Sortable;
  addLogoSubscription: Subscription;
  subEditSlide: Subscription;

  constructor(
      @Inject(DOCUMENT) private document: Document,
      private modalImageCreatorService: ModalImageCreatorService,
      private pageService: PageService
  ) { }

  ngOnInit(): void {
    this.createSortable();
  }

  remove(index: number): void {
    this.slides.splice(index, 1);
    this.onChange.emit(this.slides);
  }

  addLogo(index: number): void {
    this.addLogoSubscription = this.modalImageCreatorService.createModal({
      maintainAspectRatio: false,
      format: 'png',
      resizeToWidth: 600
    }).pipe(
        concatMap((data: ImageCropperData) => {
          return this.pageService.changeOneSlideLogo(data.source, 'png', this.id, index);
        })
    ).subscribe(data => {
      this.slides = data.slides.slideList;
    });
  }

  editSlide(index: number): void {
    this.subEditSlide = this.modalImageCreatorService.createModal({
      maintainAspectRatio: true,
      format: 'jpg',
      resizeToWidth: 1600,
      width: 1,
      height: 0.5626
    }).pipe(
        concatMap((data: ImageCropperData) => {
          return this.pageService.changeOneSlideImage(data.source, 'jpg', this.id, index);
        })
    ).subscribe(data => {
      this.slides = data.slides.slideList;
    });
  }

  removeLogo(index: number): void {
    this.slides[index].logo = null;
    this.onChange.emit(this.slides);
  }

  createSortable(): void {
    this.sortable = new Sortable(this.document.getElementById('sortC'), {
      onEnd: (evt) => {
        const element = this.slides[evt.oldIndex];
        this.slides.splice(evt.oldIndex, 1);
        this.slides.splice(evt.newIndex, 0, element);
        this.onChange.emit(this.slides);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.addLogoSubscription) {
      this.addLogoSubscription.unsubscribe();
    }
    if (this.subEditSlide) {
      this.subEditSlide.unsubscribe();
    }
  }
}
