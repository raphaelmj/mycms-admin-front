import {Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PopupService} from '../../services/popup/popup.service';
import {ModalCreatorService} from '../../services/modal/modal-creator.service';
import {SimpleHelperService} from '../../services/simple-helper.service';
import {BehaviorSubject, Observable, of, Subject, Subscription} from 'rxjs';
import {Popup} from '../../interfaces/popup.interface';
import {Department} from '../../interfaces/department.interface';
import {Variant} from '../../interfaces/variant.interface';
import {Page} from '../../interfaces/page.interface';
import {map, mergeMap, skipWhile} from 'rxjs/operators';
import {PageService} from '../../services/page/page.service';
import {VariantService} from '../../services/variant/variant.service';
import {DepartmentService} from '../../services/department/department.service';
import {PopupsRefreshService} from '../../services/popups-refresh.service';
import {PopupEditAddComponent} from './popup-edit-add/popup-edit-add.component';
import {Investition} from '../../interfaces/investition.interface';
import {InvestitionService} from '../../services/investition/investition.service';

@Component({
  selector: 'app-popups',
  templateUrl: './popups.component.html',
  styleUrls: ['./popups.component.css']
})
export class PopupsComponent implements OnInit, OnDestroy {
  @ViewChild('tempModal', {read: ViewContainerRef}) temp: ViewContainerRef;
  editAddC: ComponentRef<PopupEditAddComponent>;
  popups$: Observable<Popup[]>;
  everyWherePopups$: Observable<Popup[]>;
  pages$: Observable<Page[]>;
  variants$: Observable<Variant[]>;
  departments$: Observable<Department[]>;
  investitions$: Observable<Investition[]>;
  update$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  refreshPopupsSubscription: Subscription;
  refreshPagesSubscription: Subscription;
  refreshVariantsSubscription: Subscription;
  refreshDepartmentsSubscription: Subscription;
  refreshInvestitionsSubscription: Subscription;
  closeEditSubscription: Subscription;
  confirmDeleteSubscription: Subscription;
  officesRefreshService: Subscription;

  constructor(
      private activatedRoute: ActivatedRoute,
      private popupService: PopupService,
      private pageService: PageService,
      private variantService: VariantService,
      private departmentService: DepartmentService,
      private investitionService: InvestitionService,
      private cf: ComponentFactoryResolver,
      private simpleHelperService: SimpleHelperService,
      private modalCreatorService: ModalCreatorService,
      private popupsRefreshService: PopupsRefreshService
  ) { }

  ngOnInit(): void {
    this.popups$ = of(this.activatedRoute.snapshot.data.popups);
    this.pages$ = of(this.activatedRoute.snapshot.data.pages);
    this.variants$ = of(this.activatedRoute.snapshot.data.variants);
    this.departments$ = of(this.activatedRoute.snapshot.data.departments);
    this.investitions$ = of(this.activatedRoute.snapshot.data.investitions);
    this.onRefresh();
    this.onPopupsRefresh();
    this.onPagesRefresh();
    this.onVariantsRefresh();
    this.onDepartmentsRefresh();
    this.onInvestitionsRefresh();
    this.onPopupEveryWhere();
  }

  onRefresh(): void {
    this.popupsRefreshService.action$.subscribe(bool => {
      this.update$.next(bool);
    });
  }

  onPopupsRefresh(): void{
    this.refreshPopupsSubscription = this.update$.pipe(
        skipWhile(bool => !bool),
        mergeMap(() => this.popupService.all()),
    ).subscribe((popups) => {
      this.popups$ = of(popups);
      this.onPopupEveryWhere();
    });
  }

  onPagesRefresh(): void{
    this.refreshPagesSubscription = this.update$.pipe(
        skipWhile(bool => !bool),
        mergeMap(() => this.pageService.getPages()),
    ).subscribe((pages) => {
      this.pages$ = of(pages);
    });
  }

  onVariantsRefresh(): void{
    this.update$.pipe(
        skipWhile(bool => !bool),
        mergeMap(() => this.variantService.all()),
    ).subscribe((variants) => {
      this.variants$ = of(variants);
    });
  }

  onDepartmentsRefresh(): void{
    this.refreshDepartmentsSubscription = this.update$.pipe(
        skipWhile(bool => !bool),
        mergeMap(() => this.departmentService.all()),
    ).subscribe((departments) => {
      this.departments$ = of(departments);
    });
  }

  onInvestitionsRefresh(): void{
    this.refreshInvestitionsSubscription = this.update$.pipe(
        skipWhile(bool => !bool),
        mergeMap(() => this.investitionService.queryFind()),
    ).subscribe((investitions: Investition[]) => {
      this.investitions$ = of(investitions);
    });
  }

  onPopupEveryWhere(): void {
    this.everyWherePopups$ = this.popups$.pipe(map(pps => {
      return pps.filter(popup => {
        return popup.showEveryWhere && popup.status;
      });
    }));
  }

  onEditStart(popup: Popup): void {
    this.openEdit(popup, false);
  }

  addPopup(): void {
    const popup: Popup = this.popupService.empty();
    this.openEdit(popup, true);
  }

  openEdit(popup: Popup, isNew: boolean = false): void {
    this.temp.clear();
    const edit = this.cf.resolveComponentFactory(PopupEditAddComponent as Type<PopupEditAddComponent>);
    this.editAddC = this.temp.createComponent(edit);
    this.editAddC.instance.popup = this.simpleHelperService.objectNewInstance(popup);
    this.editAddC.instance.isNew = isNew;
    this.closeEditSubscription = this.editAddC.instance.emitClose.subscribe(() => {
      this.editAddC.destroy();
    });
  }

  onDelete(popup: Popup): void {
    this.confirmDeleteSubscription = this.modalCreatorService.createModal(
        {
          message: 'Czy checesz usunąć popup?',
          data: popup
        }
    ).subscribe(data => {
      if (data.isConfirm) {
        this.delete((data.data as Popup).id);
      }
    });
  }

  delete(id: number): void {
    this.popupService.delete(id).toPromise().then(() => {
      this.popupsRefreshService.refresh();
    });
  }

  ngOnDestroy(): void {
    if (this.refreshPopupsSubscription) {
      this.refreshPopupsSubscription.unsubscribe();
    }
    if (this.refreshPagesSubscription) {
      this.refreshPagesSubscription.unsubscribe();
    }
    if (this.refreshVariantsSubscription) {
      this.refreshVariantsSubscription.unsubscribe();
    }
    if (this.refreshDepartmentsSubscription) {
      this.refreshDepartmentsSubscription.unsubscribe();
    }
    if (this.closeEditSubscription) {
      this.closeEditSubscription.unsubscribe();
    }
  }

}
