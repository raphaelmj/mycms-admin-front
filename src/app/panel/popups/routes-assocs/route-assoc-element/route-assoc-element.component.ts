import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Page} from '../../../../interfaces/page.interface';
import {Department} from '../../../../interfaces/department.interface';
import {Variant} from '../../../../interfaces/variant.interface';
import {PopupEntityType} from '../routes-assocs.component';
import {environment} from '../../../../../environments/environment';
import {Popup} from '../../../../interfaces/popup.interface';
import {Observable, of, Subscription} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {PopupService} from '../../../../services/popup/popup.service';
import {PopupsRefreshService} from '../../../../services/popups-refresh.service';
import {ModalEntitiesSelectCreatorService} from '../../../../services/modal/modal-entities-select-creator.service';

export interface PopupInfo extends Popup {
  active?: boolean;
}

@Component({
  selector: 'app-route-assoc-element',
  templateUrl: './route-assoc-element.component.html',
  styleUrls: ['./route-assoc-element.component.css']
})
export class RouteAssocElementComponent implements OnInit, OnChanges {
  @Input() element: Page | Department | Variant;
  @Input() everyWherePopups?: Popup[] = [];
  @Input() model: PopupEntityType;
  @Input() nameKey: string;
  @Input() customKey?: string;

  popups$: Observable<PopupInfo[]>;
  everyWherePopups$: Observable<Popup[]>;
  webUrl: string = environment.WEB_URL;

  pinSubscription: Subscription;

  constructor(
      private popupService: PopupService,
      private popupsRefreshService: PopupsRefreshService,
      private modalEntitiesSelectCreatorService: ModalEntitiesSelectCreatorService
  ) { }

  ngOnInit(): void {
    this.createPopups();
  }

  createPopups(): void {
    this.popups$ = of(this.element.popups).pipe(
        map(popups => {
            if (popups) {
                return popups;
            }
            return [];
        }),
        map(popups => {
          let nextCanByActive: boolean = true;
          return  popups.map((popup, i) => {
            let npopup: PopupInfo;
            if (popup.status  && nextCanByActive) {
              npopup = {...popup, ...{active: true}};
              nextCanByActive = false;
            }else{
              npopup = {...popup, ...{active: false}};
            }
            return npopup;
          });
        })
    );
    this.everyWherePopups$ = of(this.everyWherePopups);
  }

  onUnpin(popup: Popup): void {
    this.popupService.unPinFrom(popup, this.model, this.element.id).toPromise()
        .then(response => {
          this.popupsRefreshService.refresh();
        });
  }

  startPin(): void {
   this.pinSubscription = this.modalEntitiesSelectCreatorService.createModal({
      outputFormat: 'one',
      model: 'popup',
      nameKey: 'name',
      withImage: true,
      entityIds: [],
      changeStrategy: 'manual'
    })
       .pipe(
           mergeMap(data => {
             return this.popupService.pinTo(data.data as number, this.model, this.element.id);
           })
       )
       .subscribe((data) => {
         this.popupsRefreshService.refresh();
       });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.popups?.firstChange && !changes.everyWherePopups?.firstChange) {
      this.createPopups();
    }
  }

}
