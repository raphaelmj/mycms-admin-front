import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output, Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Variant} from '../../../interfaces/variant.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Color} from '../../../interfaces/color.interface';
import {COLORS} from '../../../core/constans/colors';
import {environment} from '../../../../environments/environment';
import {VariantPresentationType} from '../../../interfaces/types/variant-presentation-type';
import {ModalImageCreatorService} from '../../../services/modal/modal-image-creator.service';
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {skipUntil, switchMap} from 'rxjs/operators';
import {Page} from '../../../interfaces/page.interface';
import {VariantService} from '../../../services/variant/variant.service';
import {VariantsRefreshService} from '../../../services/variants-refresh.service';
import {ContactGroupsComponent} from '../../../tools/contact-groups/contact-groups.component';
import {ContactElement} from '../../../interfaces/contact-element.interface';
import {SimpleHelperService} from '../../../services/simple-helper.service';

@Component({
  selector: 'app-variant-edit-add',
  templateUrl: './variant-edit-add.component.html',
  styleUrls: ['./variant-edit-add.component.scss']
})
export class VariantEditAddComponent implements OnInit, OnDestroy {
  @ViewChild('tempEdit', {read: ViewContainerRef}) tempEdit: ViewContainerRef;
  @Input() variant: Variant;
  @Input() isNew?: boolean = false;
  @Output() emitClose: EventEmitter<any> = new EventEmitter();
  contactGroupsC: ComponentRef<ContactGroupsComponent>;
  form: FormGroup;
  colors: Color[] = COLORS;
  color: Color;
  ckConfig: string = environment.CK_EDITOR_CONFIG;
  webUrl: string = environment.WEB_URL;
  presentationTypes: VariantPresentationType[] = [
    'default',
    'customTable'
  ];
  croppedImage: string = null;
  imageSubscription: Subscription;
  subSubmit: Subscription;
  contactGroupsCloseSubscrition: Subscription;
  contactGroupsChangeSubscrition: Subscription;

  submit$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isSaving$: Observable<boolean> = of(false);

  constructor(
    private fb: FormBuilder,
    private cf: ComponentFactoryResolver,
    private simpleHelperService: SimpleHelperService,
    private modalImageCreatorService: ModalImageCreatorService,
    private variantService: VariantService,
    private variantRefreshService: VariantsRefreshService
    ) { }

  ngOnInit(): void {
    this.color = this.variant.color;
    this.createForm();
    this.onSubmit();
  }

  createForm(): void {
    this.form = this.fb.group({
      name: [this.variant.name, Validators.required],
      linkName: [this.variant.linkName, Validators.required],
      leftDescription: [this.variant.leftDescription],
      rightDescription: [this.variant.rightDescription],
      metaTitle: [this.variant.metaTitle],
      metaKeywords: [this.variant.metaKeywords],
      metaDescription: [this.variant.metaDescription],
      params: this.fb.group({
        showDescriptions: [this.variant.params.showDescriptions],
        showBanner: [this.variant.params.showBanner],
        showLink: [this.variant.params.showLink],
        presentation: [this.variant.params.presentation]
      }),
      link: this.fb.group({
        link: [this.variant?.link?.link],
        name: [this.variant?.link?.name]
      }),
    });
  }

  addBanner(): void {
    this.imageSubscription = this.modalImageCreatorService.createModal({
      width: 1,
      height: 1,
      resizeToWidth: 1200,
      format: 'jpg',
      maintainAspectRatio: false
    }).subscribe(data => {
      this.croppedImage = data.source;
    });
  }

  contactsEdit(): void {
    this.tempEdit.clear();
    const cg = this.cf.resolveComponentFactory(ContactGroupsComponent as Type<ContactGroupsComponent>);
    this.contactGroupsC = this.tempEdit.createComponent(cg);
    this.contactGroupsC.instance.contactElements = this.simpleHelperService.objectNewInstance<ContactElement[]>(this.variant.contactsSections);
    this.contactGroupsCloseSubscrition = this.contactGroupsC.instance.emitClose.subscribe(() => {
      this.contactGroupsC.destroy();
    });
    this.contactGroupsChangeSubscrition = this.contactGroupsC.instance.onChange.subscribe(data => {
      this.variant.contactsSections = data;
      this.contactGroupsC.destroy();
    });
  }

  setInvest(ids: number[]): void {
    this.variant.investitionsMap = ids;
  }

  closeEdit(): void {
    this.emitClose.emit();
  }

  save(): void {
    this.submit$.next(true);
  }

  onSubmit(): void {
    this.subSubmit = this.submit$
      .pipe(
        skipUntil(this.isSaving$),
        switchMap((bool: boolean) => {
          if (bool && this.form.valid) {
            this.isSaving$ = of(true);
            return this.saveData();
          } else {
            return of(false);
          }
        })
      )
      .subscribe((v: Variant | false) => {
        if (this.isNew && v) {
          this.variant = v;
          this.isNew = false;
        }
        if (v) { this.variantRefreshService.refresh(); }
        this.isSaving$ = of(false);
      });
  }

  saveData(): Observable<Variant> {
    const v: Variant = {...this.variant, ...this.form.value};
    const {popups, investitions, ...rest} = v;
    if (this.isNew){
      return this.variantService.create(rest, this.croppedImage);
    } else {
      return this.variantService.update(rest, this.croppedImage);
    }
  }

  ngOnDestroy(): void {
    if (this.imageSubscription) {
      this.imageSubscription.unsubscribe();
    }
    if (this.subSubmit) {
      this.subSubmit.unsubscribe();
    }
    if (this.contactGroupsCloseSubscrition) {
      this.contactGroupsCloseSubscrition.unsubscribe();
    }
    if (this.contactGroupsChangeSubscrition) {
      this.contactGroupsChangeSubscrition.unsubscribe();
    }
  }

}
