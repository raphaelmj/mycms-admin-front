import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Page, PageSlide, PageSlides} from '../../../interfaces/page.interface';
import {environment} from '../../../../environments/environment';
import {concatMap, skipUntil} from 'rxjs/operators';
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {PageService} from '../../../services/page/page.service';
import {PagesRefreshService} from '../../../services/pages-refresh.service';
import {ModalImageCreatorService} from '../../../services/modal/modal-image-creator.service';
import {ImageFormat} from '../../../interfaces/types/image-format';
import {ImageCropperData} from '../../../tools/modal/image-cropper/image-cropper-modal.component';

@Component({
  selector: 'app-page-slides',
  templateUrl: './page-slides.component.html',
  styleUrls: ['./page-slides.component.scss']
})
export class PageSlidesComponent implements OnInit, OnDestroy {

  @Input() pageSlides: PageSlides;
  @Input() page: Page;
  @Output() emitClose: EventEmitter<any> = new EventEmitter();

  add$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isSaving$: Observable<boolean> = of(false);

  subAdd: Subscription;
  subImageLogo: Subscription;
  webUrl: string = environment.WEB_URL;
  noImage: boolean = false;
  imageFormat: ImageFormat = 'png';
  croppedLogoImage: string = null;
  currentLogo: string;
  subLogo: Subscription;
  subList: Subscription;
  subAddSlide: Subscription;

  constructor(
    private pageService: PageService,
    private pageRefreshService: PagesRefreshService,
    private modalImageCreatorService: ModalImageCreatorService) { }

  ngOnInit(): void {
    this.createIfEmpty();
    this.currentLogo = this.page.slides.imageTitle;
  }

  createIfEmpty(): void {
    if (!this.pageSlides){
      this.pageSlides = {
        imageTitle: '',
        slideList: []
      };
    }
    if (!this.pageSlides.imageTitle){
      this.pageSlides.imageTitle = 'null';
    }
    if (!this.pageSlides.imageTitle){
      this.pageSlides.slideList = [];
    }
  }

  onAdd(): void {
    this.subAdd = this.add$
      .pipe(
        skipUntil(this.isSaving$),
      )
      .subscribe((v: any | false) => {
        if (v) { this.pageRefreshService.refresh(); }
        this.isSaving$ = of(false);
      });
  }

  addImageLogo(): void {
    this.subImageLogo = this.modalImageCreatorService.createModal({
      maintainAspectRatio: false,
      format: this.imageFormat,
      resizeToWidth: 1000
    }).subscribe((data: ImageCropperData) => {
      this.noImage = false;
      this.currentLogo = null;
      this.croppedLogoImage = data.source;
    });
  }

  saveImageLogo(): void {
    this.isSaving$ = of(true);
    this.subLogo = this.pageService.updatePageSlideLogo(this.croppedLogoImage, this.imageFormat, this.page.id, this.noImage, this.currentLogo)
      .subscribe((page: Page) => {
        this.page = page;
        this.pageRefreshService.refresh();
        this.isSaving$ = of(false);
      });
  }

  saveSlides(slides: PageSlide[]): void {
    this.subList = this.pageService.updatePageSlides(slides, this.page.id)
      .subscribe((page: Page) => {
        this.page = page;
        this.pageRefreshService.refresh();
        this.isSaving$ = of(false);
      });
  }

  addSlide(): void {
    this.subAddSlide = this.modalImageCreatorService.createModal({
      maintainAspectRatio: true,
      format: 'jpg',
      resizeToWidth: 1600,
      width: 1,
      height: 0.5626
    }).pipe(
      concatMap(data => {
        this.isSaving$ = of(true);
        return this.pageService.addSlide(data.source, 'jpg',  this.page.id);
      })
    ).subscribe(page => {
      this.pageSlides = page.slides;
      this.currentLogo = page.slides.imageTitle;
      this.page = page;
      this.pageRefreshService.refresh();
      this.isSaving$ = of(false);
    });
  }

  closeEdit(): void {
    this.emitClose.emit();
  }

  ngOnDestroy(): void {
    if (this.subAdd){
      this.subAdd.unsubscribe();
    }
    if (this.subImageLogo){
      this.subImageLogo.unsubscribe();
    }
    if (this.subLogo){
      this.subLogo.unsubscribe();
    }
    if (this.subList){
      this.subList.unsubscribe();
    }
    if (this.subAddSlide) {
      this.subAddSlide.unsubscribe();
    }
  }

}
