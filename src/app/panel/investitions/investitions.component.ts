import {Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, Subscription} from 'rxjs';
import {concatMap, skip, skipWhile} from 'rxjs/operators';
import {InvestitionService} from '../../services/investition/investition.service';
import {Investition} from '../../interfaces/investition.interface';
import {Variant} from '../../interfaces/variant.interface';
import {InvestitionAddEditComponent} from './investition-add-edit/investition-add-edit.component';
import {InvestionsRefreshService} from '../../services/investition/investions-refresh.service';
import {SimpleHelperService} from '../../services/simple-helper.service';

@Component({
  selector: 'app-investitions',
  templateUrl: './investitions.component.html',
  styleUrls: ['./investitions.component.css']
})
export class InvestitionsComponent implements OnInit, OnDestroy {

  @ViewChild('temp', {read: ViewContainerRef}) temp: ViewContainerRef;
  editAddC: ComponentRef<InvestitionAddEditComponent>;
  investitions$: BehaviorSubject<Investition[]> = new BehaviorSubject<Investition[]>([]);
  variantId$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  variants: Variant[];
  closeSubscrition: Subscription;
  afterCreateSubscription: Subscription;
  routeChangeSubscription: Subscription;
  refreshSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private investitionService: InvestitionService,
    private router: Router,
    private cf: ComponentFactoryResolver,
    private investionsRefreshService: InvestionsRefreshService,
    private simpleHelperService: SimpleHelperService,
    ) { }

  ngOnInit(): void {
    this.variants = this.activatedRoute.snapshot.data.variants;
    this.investitions$.next(this.activatedRoute.snapshot.data.investitions);
    if (this.activatedRoute.snapshot.queryParams.variant) {
      this.variantId$.next(this.activatedRoute.snapshot.queryParams.variant);
    }else {
      this.variantId$.next('0');
    }
    this.onQueryParamsChange();
    this.onRefresh();
  }

  onQueryParamsChange(): void {
    this.routeChangeSubscription = this.activatedRoute.queryParams
      .pipe(
        skip(1),
        concatMap(params => {
          const variant = (params.variant) ? params.variant : null;
          this.variantId$.next(variant);
          return this.investitionService.queryFind(variant);
        }))
      .subscribe(investiotions => {
        this.investitions$.next(investiotions);
      });
  }

  onRefresh(): void {
    this.refreshSubscription = this.investionsRefreshService.action$.pipe(
      skipWhile(bool => !bool),
      concatMap(qp => this.investitionService.queryFind(this.activatedRoute.snapshot.queryParams.variant))
    ).subscribe(investitions => {
        this.investitions$.next(investitions);
    });
  }

  changeQuery(variant: string): void {
    let qp = {};
    if (variant){
      qp = {variant};
    }
    this.router.navigate(['/panel/investitions'], {queryParams: qp});
  }

  edit(investition: Investition): void {
    this.editAdd(investition, false);
  }

  addNew(): void {
    const investition: Investition = this.investitionService.createEmpty();
    this.editAdd(investition, true);
  }

  editAdd(investition: Investition, isNew: boolean): void {
    this.temp.clear();
    const c = this.cf.resolveComponentFactory(InvestitionAddEditComponent as Type<InvestitionAddEditComponent>);
    this.editAddC = this.temp.createComponent(c);
    this.editAddC.instance.investition = this.simpleHelperService.objectNewInstance(investition);
    this.editAddC.instance.isNew = isNew;
    this.afterCreateSubscription = this.editAddC.instance.afterCreate.subscribe((inv: Investition) => {
      this.editAddC.destroy();
      this.edit(inv);
    });
    this.closeSubscrition = this.editAddC.instance.emitClose.subscribe(() => {
      this.editAddC.destroy();
    });
  }

  changeStatus(data: {id: number, status: boolean}): void {
    const newData = {
      id: data.id,
      field: 'status',
      value: data.status
    };
    this.investitionService.updateField(newData).toPromise();
  }

  ngOnDestroy(): void {
    if (this.closeSubscrition) {
      this.closeSubscrition.unsubscribe();
    }
    if (this.afterCreateSubscription) {
      this.afterCreateSubscription.unsubscribe();
    }
    if (this.routeChangeSubscription) {
      this.routeChangeSubscription.unsubscribe();
    }
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }
}
