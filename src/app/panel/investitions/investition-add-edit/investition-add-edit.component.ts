import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {
  CustomTableElement,
  GalleryElement,
  Investition,
  ProgressGalleryElement
} from '../../../interfaces/investition.interface';
import {skipUntil, switchMap} from 'rxjs/operators';
import {ThemePalette} from '@angular/material/core';
import {Color} from '@angular-material-components/color-picker';
import {ColorHelperService} from '../../../services/color-helper.service';
import {environment} from '../../../../environments/environment';
import {ModalImageCreatorService} from '../../../services/modal/modal-image-creator.service';
import {InvestitionService} from '../../../services/investition/investition.service';
import {GalleryType} from '../../../interfaces/enums/gallery-type.enum';
import {StandardGalleryComponent} from '../standard-gallery/standard-gallery.component';
import {ProgressGalleryComponent} from '../progress-gallery/progress-gallery.component';
import {ContactGroupsComponent} from '../../../tools/contact-groups/contact-groups.component';
import {CustomTableComponent} from './custom-table/custom-table.component';
import {SimpleHelperService} from '../../../services/simple-helper.service';
import {InvestionsRefreshService} from '../../../services/investition/investions-refresh.service';
import {ContactElement} from '../../../interfaces/contact-element.interface';

@Component({
  selector: 'app-investition-add-edit',
  templateUrl: './investition-add-edit.component.html',
  styleUrls: ['./investition-add-edit.component.scss']
})
export class InvestitionAddEditComponent implements OnInit, OnDestroy {
  @ViewChild('tempEdit', { read: ViewContainerRef })
  tempEdit: ViewContainerRef;
  @Input() investition: Investition;
  @Input() isNew: boolean = true;
  @Output() emitClose: EventEmitter<any> = new EventEmitter();
  @Output() afterCreate: EventEmitter<Investition> = new EventEmitter<Investition>();

  standardGalleryC: ComponentRef<StandardGalleryComponent>;
  progressGalleryC: ComponentRef<ProgressGalleryComponent>;
  contactGroupsC: ComponentRef<ContactGroupsComponent>;
  customTableC: ComponentRef<CustomTableComponent>;

  isSaving$: Observable<boolean>;
  formI: FormGroup;
  submit$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  subSubmit: Subscription;
  variantIds$: Observable<number[]>;
  officeIds$: Observable<number[]>;
  variantIds: number[];
  officeIds: number[];
  disabled: boolean = false;
  color: ThemePalette = 'primary';
  touchUi = false;
  webUrl: string = environment.WEB_URL;
  ckConfig: string = environment.CK_EDITOR_CONFIG;

  galleryTypes: Array<GalleryType> = [
    GalleryType.none,
    GalleryType.standard,
    GalleryType.progress,
  ];

  galleryTypeEnum = GalleryType;

  croppedImageList: string = null;
  croppedImageLogo: string = null;
  croppedImageFull: string = null;
  croppedLessMap: string = null;
  croppedMoreMap: string = null;

  listImageSubscription: Subscription;
  standardGalleryCloseSubscription: Subscription;
  standardGalleryChangeSubscription: Subscription;
  progressGalleryCloseSubscription: Subscription;
  progressGalleryChangeSubscription: Subscription;
  contactGroupsCloseSubscrition: Subscription;
  contactGroupsChangeSubscrition: Subscription;
  customTableCloseSubscrition: Subscription;
  customTableChangeSubscrition: Subscription;
  variantsSubscription: Subscription;
  officesSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private modalImageCreatorService: ModalImageCreatorService,
    private investitionService: InvestitionService,
    private cf: ComponentFactoryResolver,
    private simpleHelperService: SimpleHelperService,
    private investionsRefreshService: InvestionsRefreshService
    ) {
    this.isSaving$ = of(false);
  }

  ngOnInit(): void {
    this.createForm();
    this.onSubmit();
    this.variantIds$ = of(this.investition.variants.map(v => v.id));
    this.officeIds$ = of(this.investition.offices.map(v => v.id));
    this.variantsSubscription = this.variantIds$.subscribe(data => {
      this.variantIds = data;
    });
    this.officesSubscription = this.officeIds$.subscribe(data => {
      this.officeIds = data;
    });
  }

  createForm(): void {
    let color: Color = null;
    if (this.investition.labelColor) {
      color = ColorHelperService.hexToColor(this.investition.labelColor);
    }

    this.formI = this.fb.group({
      name: [this.investition.name, Validators.required],
      location: [this.investition.location],
      city: [this.investition.city, Validators.required],
      labelColor: new FormControl({value: color, disabled: false}),
      address: [this.investition.address],
      rentAreaSpace: [this.investition.rentAreaSpace],
      areaSize: [this.investition.areaSize],
      parking: [this.investition.parking],
      rentiers: [this.investition.rentiers],
      textLeft: [this.investition.textLeft],
      textRight: [this.investition.textRight],
      openDate: [this.investition.openDate],
      remodeling: [this.investition.remodeling],
      buyDate: [this.investition.buyDate],
      district: [this.investition.district],
      buildingsCount: [this.investition.buildingsCount],
      floorCount: [this.investition.floorCount],
      flatCount: [this.investition.flatCount],
      flatsAreas: [this.investition.flatsAreas],
      garageCount: [this.investition.garageCount],
      serviceLocalsCount: [this.investition.serviceLocalsCount],
      endDate: [this.investition.endDate],
      workState: [this.investition.workState],
      contactLink: [this.investition.contactLink],
      status: [this.investition.status],
      showDistrictLabel: [this.investition.showDistrictLabel],
      showWebsite: [this.investition.showWebsite],
      metaTitle: [this.investition.metaTitle],
      metaKeywords: [this.investition.metaKeywords],
      metaDescription: [this.investition.metaDescription],
      link: this.fb.group({
        link: [this.investition?.link?.link],
        name: [this.investition?.link?.name]
      }),
      galleryType: [this.investition.galleryType]
    });
  }



  addListImage(): void {
    this.listImageSubscription = this.modalImageCreatorService.createModal({
      width: 1,
      height: 1,
      resizeToWidth: 700,
      format: 'jpg',
      maintainAspectRatio: true
    }).subscribe(data => {
      if (data) {
        this.croppedImageList = data.source;
      }
    });
  }

  addLogoImage(): void {
    this.listImageSubscription = this.modalImageCreatorService.createModal({
      resizeToWidth: 400,
      format: 'png',
    }).subscribe(data => {
      if (data) {
        this.croppedImageLogo = data.source;
      }
    });
  }

  addFullImage(): void {
    this.listImageSubscription = this.modalImageCreatorService.createModal({
      width: 1,
      height: 1,
      resizeToWidth: 1000,
      format: 'jpg',
      maintainAspectRatio: true
    }).subscribe(data => {
      if (data) {
        this.croppedImageFull = data.source;
      }
    });
  }

  addLessMap(): void {
    this.listImageSubscription = this.modalImageCreatorService.createModal({
      width: 1,
      height: 0.325,
      resizeToWidth: 1600,
      format: 'jpg',
      maintainAspectRatio: true
    }).subscribe(data => {
      if (data) {
        this.croppedLessMap = data.source;
      }
    });
  }

  addMoreMap(): void {
    this.listImageSubscription = this.modalImageCreatorService.createModal({
      width: 1,
      height: 0.5625,
      resizeToWidth: 2560,
      format: 'jpg',
      maintainAspectRatio: true
    }).subscribe(data => {
      if (data) {
        this.croppedMoreMap = data.source;
      }
    });
  }

  showStandardGallery(): void {
    this.tempEdit.clear();
    const st = this.cf.resolveComponentFactory(StandardGalleryComponent as Type<StandardGalleryComponent>);
    this.standardGalleryC = this.tempEdit.createComponent(st);
    this.standardGalleryC.instance.galleryElements = this.simpleHelperService.objectNewInstance<GalleryElement[]>(this.investition.gallery);
    this.standardGalleryChangeSubscription = this.standardGalleryC.instance.onAdd.subscribe(gallery => {
      this.investition.gallery = gallery;
      this.standardGalleryC.destroy();
    });
    this.standardGalleryCloseSubscription = this.standardGalleryC.instance.emitClose.subscribe(() => {
      this.standardGalleryC.destroy();
    });
  }

  showProgressGallery(): void {
    this.tempEdit.clear();
    const pr = this.cf.resolveComponentFactory(ProgressGalleryComponent as Type<ProgressGalleryComponent>);
    this.progressGalleryC = this.tempEdit.createComponent(pr);
    this.progressGalleryC.instance.progressGalleries
      = this.simpleHelperService.objectNewInstance<ProgressGalleryElement[]>(this.investition.progressGallery);
    this.progressGalleryChangeSubscription = this.progressGalleryC.instance.onChange.subscribe(data => {
      this.investition.progressGallery = data;
      this.progressGalleryC.destroy();
    });
    this.progressGalleryCloseSubscription = this.progressGalleryC.instance.emitClose.subscribe(() => {
      this.progressGalleryC.destroy();
    });
  }

  contactsEdit(): void {
    this.tempEdit.clear();
    const cg = this.cf.resolveComponentFactory(ContactGroupsComponent as Type<ContactGroupsComponent>);
    this.contactGroupsC = this.tempEdit.createComponent(cg);
    this.contactGroupsC.instance.contactElements = this.simpleHelperService.objectNewInstance<ContactElement[]>(this.investition.contacts);
    this.contactGroupsCloseSubscrition = this.contactGroupsC.instance.emitClose.subscribe(() => {
      this.contactGroupsC.destroy();
    });
    this.contactGroupsChangeSubscrition = this.contactGroupsC.instance.onChange.subscribe(data => {
      this.investition.contacts = data;
      this.contactGroupsC.destroy();
    });
  }

  customTableOpen(): void {
    this.tempEdit.clear();
    const ct = this.cf.resolveComponentFactory(CustomTableComponent as Type<CustomTableComponent>);
    this.customTableC = this.tempEdit.createComponent(ct);
    this.customTableC.instance.customTable
      = this.simpleHelperService.objectNewInstance<CustomTableElement[]>
    ((this.investition.customTable) ? this.investition.customTable : []);
    this.customTableCloseSubscrition = this.customTableC.instance.emitClose.subscribe(() => {
      this.customTableC.destroy();
    });
    this.customTableChangeSubscrition = this.customTableC.instance.onChange.subscribe(data => {
      this.investition.customTable = data;
    });
  }

  onOfficesChange(ids: number[]): void {
    this.officeIds$ = of(ids);
  }

  onVariantsChange(ids: number[]): void {
    this.variantIds$ = of(ids);
  }

  closeEdit(): void {
    this.emitClose.emit();
  }

  saveData(): void {
    this.submit$.next(true);
  }

  onSubmit(): void {
    this.subSubmit = this.submit$
      .pipe(
        skipUntil(this.isSaving$),
        switchMap((bool: boolean) => {
          if (bool && this.formI.valid) {
            this.isSaving$ = of(true);
            return this.save();
          } else {
            return of(false);
          }
        })
      )
      .subscribe((v: Investition | false) => {
        this.isSaving$ = of(false);
        this.investionsRefreshService.refresh();
        if (v) {
          if (this.isNew) {
            this.afterCreate.emit(v);
          } else {
            this.investition = v;
          }
        }
      });
  }

  save(): Observable<Investition>{

    let investition: Investition = {...this.investition, ...this.formI.value};
    // @ts-ignore
    const {...variants, ...offices, ...popups, ...rest}: Investition = investition;
    investition = rest;
    if (this.formI.get('labelColor').value) {
      investition.labelColor = (this.formI.get('labelColor').value as Color).hex;
    }
    if (this.isNew) {
      return this.investitionService.create(
        investition,
        this.croppedImageList,
        this.croppedImageLogo,
        this.croppedImageFull,
        this.croppedLessMap,
        this.croppedLessMap,
        this.variantIds,
        this.officeIds);
    } else {
      return this.investitionService.update(
        investition,
        this.croppedImageList,
        this.croppedImageLogo,
        this.croppedImageFull,
        this.croppedLessMap,
        this.croppedLessMap,
        this.variantIds,
        this.officeIds);
    }


    return of(this.investition);
  }

  ngOnDestroy(): void {
    if (this.subSubmit) {
      this.subSubmit.unsubscribe();
    }
    if (this.listImageSubscription) {
      this.listImageSubscription.unsubscribe();
    }
    if (this.standardGalleryCloseSubscription) {
      this.standardGalleryCloseSubscription.unsubscribe();
    }
    if (this.standardGalleryChangeSubscription) {
      this.standardGalleryChangeSubscription.unsubscribe();
    }
    if (this.progressGalleryCloseSubscription) {
      this.progressGalleryCloseSubscription.unsubscribe();
    }
    if (this.progressGalleryChangeSubscription) {
      this.progressGalleryChangeSubscription.unsubscribe();
    }
    if (this.contactGroupsCloseSubscrition) {
      this.contactGroupsCloseSubscrition.unsubscribe();
    }
    if (this.contactGroupsChangeSubscrition) {
      this.contactGroupsChangeSubscrition.unsubscribe();
    }
    if (this.customTableCloseSubscrition) {
      this.customTableCloseSubscrition.unsubscribe();
    }
    if (this.customTableChangeSubscrition) {
      this.customTableChangeSubscrition.unsubscribe();
    }
    if (this.variantsSubscription) {
      this.variantsSubscription.unsubscribe();
    }
    if (this.officesSubscription) {
      this.officesSubscription.unsubscribe();
    }
  }
}
