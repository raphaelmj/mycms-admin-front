import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Popup} from '../../../interfaces/popup.interface';
import {environment} from '../../../../environments/environment';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PopupsRefreshService} from '../../../services/popups-refresh.service';
import {PopupService} from '../../../services/popup/popup.service';

@Component({
  selector: 'app-popup-element',
  templateUrl: './popup-element.component.html',
  styleUrls: ['./popup-element.component.css']
})
export class PopupElementComponent implements OnInit, OnDestroy {
  @Input() popup: Popup;
  @Output() onEdit: EventEmitter<Popup> = new EventEmitter<Popup>();
  @Output() onDelete: EventEmitter<Popup> = new EventEmitter<Popup>();

  statusChangeSubscription: Subscription;
  everyChangeSubscription: Subscription;

  form: FormGroup;
  webUrl: string = environment.WEB_URL;

  constructor(
      private fb: FormBuilder,
      private popupsRefreshService: PopupsRefreshService,
      private popupService: PopupService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.onChangeStatus();
    this.onChangeEveryWhere();
  }

  createForm(): void {
    this.form = this.fb.group({
      status: [this.popup.status],
      showEveryWhere: [this.popup.showEveryWhere]
    });
  }

  onChangeStatus(): void {
    this.statusChangeSubscription = this.form.get('status').valueChanges.subscribe(value => {
      this.popupService.updateField(this.popup.id, 'status', value).toPromise().then(popup => {
        this.popupsRefreshService.refresh();
      });
    });
  }

  onChangeEveryWhere(): void {
    this.everyChangeSubscription = this.form.get('showEveryWhere').valueChanges.subscribe(value => {
      this.popupService.updateField(this.popup.id, 'showEveryWhere', value).toPromise().then(popup => {
        this.popupsRefreshService.refresh();
      });
    });
  }

  edit(): void {
    this.onEdit.emit(this.popup);
  }

  delete(): void {
    this.onDelete.emit(this.popup)
  }

  ngOnDestroy(): void {
    if (this.statusChangeSubscription) {
      this.statusChangeSubscription.unsubscribe();
    }
    if (this.everyChangeSubscription) {
      this.everyChangeSubscription.unsubscribe();
    }
  }


}
