import {Component, ComponentFactoryResolver, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {Popup} from '../../../interfaces/popup.interface';
import {SimpleHelperService} from '../../../services/simple-helper.service';
import {environment} from '../../../../environments/environment';
import {ModalImageCreatorService} from '../../../services/modal/modal-image-creator.service';
import {LinkTarget} from '../../../interfaces/types/link-target';
import {skipUntil, switchMap} from 'rxjs/operators';
import {PopupService} from '../../../services/popup/popup.service';
import {PopupsRefreshService} from '../../../services/popups-refresh.service';

@Component({
  selector: 'app-popup-edit-add',
  templateUrl: './popup-edit-add.component.html',
  styleUrls: ['./popup-edit-add.component.scss']
})
export class PopupEditAddComponent implements OnInit, OnDestroy {
  @Input() popup: Popup;
  @Input() isNew?: boolean = false;
  @Output() emitClose: EventEmitter<any> = new EventEmitter();
  subSubmit: Subscription;

  form: FormGroup;
  submit$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isSaving$: Observable<boolean> = of(false);
  croppedImage: string = null;
  webUrl: string = environment.WEB_URL;
  targets: LinkTarget[] = ['_self', '_blank'];

  constructor(
      private fb: FormBuilder,
      private cf: ComponentFactoryResolver,
      private simpleHelperService: SimpleHelperService,
      private modalImageCreatorService: ModalImageCreatorService,
      private popupService: PopupService,
      private popupsRefreshService: PopupsRefreshService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.onSubmit();
  }

  createForm(): void {
    this.form = this.fb.group({
      name: [this.popup.name, Validators.required],
      popupData: this.fb.group({
        hasLink: [this.popup.popupData.hasLink],
        link: [this.popup.popupData.link],
        target: [this.popup.popupData.target]
      }),
      status: [this.popup.status],
      showEveryWhere: [this.popup.showEveryWhere]
    });
  }


  addImage(): void {
    this.modalImageCreatorService.createModal({
      width: 1,
      height: 1,
      resizeToWidth: 800,
      format: 'jpg',
      maintainAspectRatio: false
    }).subscribe(data => {
      if (data) {
        this.croppedImage = data.source;
      }
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
                if (this.isNew && !this.croppedImage) {
                  return of(false);
                }
                return this.save();
              } else {
                return of(false);
              }
            })
        )
        .subscribe((v: Popup| false) => {
          if (v) {
            this.popup = v;
            this.isNew = false;
            this.popupsRefreshService.refresh();
          }
          this.isSaving$ = of(false);
        });
  }

  save(): Observable<Popup> {
    const popup: Popup = {...this.popup, ...this.form.value};
    if (this.isNew) {
      return this.popupService.create(popup, this.croppedImage);
    } else {
      return this.popupService.update(popup, this.croppedImage);
    }
  }

  closeEdit(): void {
    this.emitClose.emit();
  }

  ngOnDestroy(): void {
    if (this.subSubmit) {
      this.subSubmit.unsubscribe();
    }
  }

}
