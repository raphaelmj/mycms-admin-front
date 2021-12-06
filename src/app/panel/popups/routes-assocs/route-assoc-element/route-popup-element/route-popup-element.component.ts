import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Popup} from '../../../../../interfaces/popup.interface';
import {environment} from '../../../../../../environments/environment';
import {PopupInfo} from '../route-assoc-element.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PopupsRefreshService} from '../../../../../services/popups-refresh.service';
import {Subscription} from 'rxjs';
import {PopupService} from '../../../../../services/popup/popup.service';

@Component({
  selector: 'app-route-popup-element',
  templateUrl: './route-popup-element.component.html',
  styleUrls: ['./route-popup-element.component.css']
})
export class RoutePopupElementComponent implements OnInit, OnDestroy {
  @Input() popup: PopupInfo;
  @Input() everyWherePopups?: Popup[] = [];
  @Input() asEvery?: boolean = false;
  @Output() onUnpin: EventEmitter<Popup> = new EventEmitter<Popup>();
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
      status:[this.popup.status],
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

  get activeClasses(): string {
    if ((this.popup.active && this.popup.status && this.everyWherePopups.length === 0) || (this.asEvery && this.popup.status)) {
      return '';
    }else {
      return 'opacity-5 grayscale-10';
    }
  }

  unPin(): void {
    this.onUnpin.emit(this.popup);
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
