import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Input, OnDestroy,
  OnInit,
  Output, Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Office} from '../../../interfaces/office.interface';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {SimpleHelperService} from '../../../services/simple-helper.service';
import {OfficeService} from '../../../services/office/office.service';
import {OfficesRefreshService} from '../../../services/offices-refresh.service';
import {environment} from '../../../../environments/environment';
import {ModalImageCreatorService} from '../../../services/modal/modal-image-creator.service';
import {MapFiles} from '../../../interfaces/map-files.interface';
import {ImageCropperConfig} from '../../../tools/modal/image-cropper/image-cropper-modal.component';
import {ContactGroupsComponent} from '../../../tools/contact-groups/contact-groups.component';
import {ContactElement} from '../../../interfaces/contact-element.interface';
import {skipUntil, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-office-add-edit',
  templateUrl: './office-add-edit.component.html',
  styleUrls: ['./office-add-edit.component.scss']
})
export class OfficeAddEditComponent implements OnInit, OnDestroy {
  @ViewChild('tempEdit', {read: ViewContainerRef}) tempEdit: ViewContainerRef;
  @Input() office: Office;
  @Input() isNew?: boolean = false;
  @Output() emitClose: EventEmitter<any> = new EventEmitter();
  contactGroupsC: ComponentRef<ContactGroupsComponent>;
  form: FormGroup;
  submit$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isSaving$: Observable<boolean> = of(false);
  webUrl: string = environment.WEB_URL;
  ckConfig: string = environment.CK_EDITOR_CONFIG;
  lessMapConfig: ImageCropperConfig = {
    width: 1,
    height: 1,
    resizeToWidth: 700,
    format: 'jpg',
    maintainAspectRatio: true
  };
  moreMapConfig: ImageCropperConfig = {
    width: 1,
    height: 0.325,
    resizeToWidth: 1600,
    format: 'jpg',
    maintainAspectRatio: true
  };
  mainLessMapConfig: ImageCropperConfig = {
    width: 1,
    height: 0.325,
    resizeToWidth: 1600,
    format: 'jpg',
    maintainAspectRatio: true
  };
  mainMoreMapConfig: ImageCropperConfig = {
    width: 1,
    height: 0.5625,
    resizeToWidth: 2560,
    format: 'jpg',
    maintainAspectRatio: true
  };

  mapFiles: MapFiles;
  mainMapFiles: MapFiles;

  contactGroupsCloseSubscrition: Subscription;
  contactGroupsChangeSubscrition: Subscription;
  subSubmit: Subscription;

  constructor(
    private fb: FormBuilder,
    private cf: ComponentFactoryResolver,
    private simpleHelperService: SimpleHelperService,
    private officeService: OfficeService,
    private officesRefreshService: OfficesRefreshService,
    private modalImageCreatorService: ModalImageCreatorService,
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.onSubmit();
  }

  createForm(): void {
    this.form = this.fb.group({
      title: [this.office.title, Validators.required],
      subTitle: [this.office.subTitle],
      address: [this.office.address],
      description: [this.office.description],
      phones: this.createStringsFormArray(this.office.phones),
      emails: this.createStringsFormArray(this.office.emails),
      hours: this.createStringsFormArray(this.office.hours),
    });
  }

  createStringsFormArray(elements: string[]): FormArray {
    const array: FormArray = this.fb.array([]);
    elements.forEach(el => {
      array.push(new FormControl(el));
    });
    return array;
  }

  onMapFilesChange(mapFiles: MapFiles): void {
    this.mapFiles = mapFiles;
  }

  onMainMapFilesChange(mapFiles: MapFiles): void {
    this.mainMapFiles = mapFiles;
  }

  contactsEdit(): void {
    this.tempEdit.clear();
    const cg = this.cf.resolveComponentFactory(ContactGroupsComponent as Type<ContactGroupsComponent>);
    this.contactGroupsC = this.tempEdit.createComponent(cg);
    this.contactGroupsC.instance.contactElements = this.simpleHelperService.objectNewInstance<ContactElement[]>(this.office.contactsSections);
    this.contactGroupsCloseSubscrition = this.contactGroupsC.instance.emitClose.subscribe(() => {
      this.contactGroupsC.destroy();
    });
    this.contactGroupsChangeSubscrition = this.contactGroupsC.instance.onChange.subscribe(data => {
      this.office.contactsSections = data;
      this.contactGroupsC.destroy();
    });
  }

  saveData(): void {
    this.submit$.next(true);
  }

  onSubmit(): void {
    this.subSubmit = this.submit$
      .pipe(
        skipUntil(this.isSaving$),
        switchMap((bool: boolean) => {
          if (bool && this.form.valid) {
            this.isSaving$ = of(true);
            return this.save();
          } else {
            return of(false);
          }
        })
      )
      .subscribe((v: Office | false) => {
        if (v) {
          this.office = v;
          this.isNew = false;
          this.officesRefreshService.refresh();
        }
        this.isSaving$ = of(false);
      });
  }

  save(): Observable<Office> {
    const office: Office = {...this.office, ...this.form.value};
    if (this.mapFiles){
      office.mapFiles = this.mapFiles;
    }
    if (this.mainMapFiles) {
      office.mainMapFiles = this.mainMapFiles;
    }
    const {departments, pages, investitions, variant, ...rest} = office;
    if (this.isNew) {
      return this.officeService.create(rest as Office);
    } else {
      return this.officeService.update(rest as Office);
    }
  }

  closeEdit(): void {
    this.emitClose.emit();
  }

  ngOnDestroy(): void {
    if (this.contactGroupsCloseSubscrition) {
      this.contactGroupsCloseSubscrition.unsubscribe();
    }
    if (this.contactGroupsChangeSubscrition) {
      this.contactGroupsChangeSubscrition.unsubscribe();
    }
    if (this.subSubmit) {
      this.subSubmit.unsubscribe();
    }
  }

}
