import {Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Variant} from '../../interfaces/variant.interface';
import {VariantEditAddComponent} from './variant-edit-add/variant-edit-add.component';
import {Subscription} from 'rxjs';
import {ModalOrderCreatorService} from '../../services/modal/modal-order-creator.service';
import {VariantService} from '../../services/variant/variant.service';
import {InvestitionService} from '../../services/investition/investition.service';
import {concatMap} from 'rxjs/operators';
import {ModalCreatorService} from '../../services/modal/modal-creator.service';
import {VariantsRefreshService} from '../../services/variants-refresh.service';

@Component({
  selector: 'app-variants',
  templateUrl: './variants.component.html',
  styleUrls: ['./variants.component.css']
})
export class VariantsComponent implements OnInit, OnDestroy {
  @ViewChild('temp', {read: ViewContainerRef}) temp: ViewContainerRef;
  addEditC: ComponentRef<VariantEditAddComponent>;
  variants: Variant[] = [];
  variantCloseSubscription: Subscription;
  changeOrderSubscription: Subscription;
  deleteSubscription: Subscription;
  subRefresh: Subscription;
  subVariants: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalCreatorService: ModalCreatorService,
    private cf: ComponentFactoryResolver,
    private modalOrderCreatorService: ModalOrderCreatorService,
    private variantService: VariantService,
    private investitionService: InvestitionService,
    private variantRefreshService: VariantsRefreshService
    ) {}

  ngOnInit(): void {
    this.variants = this.activatedRoute.snapshot.data.variants;
    this.subRefresh = this.variantRefreshService.action$.subscribe((bool) => {
      if (bool) {
        this.subVariants = this.variantService.all().subscribe(vs => {
          this.variants = vs;
        });
      }
    });
  }

  addNew(): void {
    const variant: Variant = this.variantService.empty();
    this.openEdit(variant, true);
  }

  openEdit(variant: Variant, isNew: boolean = false): void {
    this.temp.clear();
    const edit = this.cf.resolveComponentFactory(VariantEditAddComponent as Type<VariantEditAddComponent>);
    this.addEditC = this.temp.createComponent(edit);
    this.addEditC.instance.variant = variant;
    this.addEditC.instance.isNew = isNew;
    this.variantCloseSubscription = this.addEditC.instance.emitClose.subscribe(() => {
      this.addEditC.destroy();
    });
  }

  changeInvestitionsOrder(variant: Variant, index: number): void {
    this.changeOrderSubscription = this.investitionService.getByIds(variant.investitionsMap)
      .pipe(
        concatMap(invs => {
          return  this.modalOrderCreatorService.createModal({
            data: invs,
            nameKey: 'name',
            customKey: 'address',
            hasImage: true,
            imagePathKey: 'listImage',
            columns: '4',
            bundleData: {id: variant.id, index}
          });
        })
      ).subscribe(data => {
        const ids: number[] = data.data.map(v => v.id);
        this.variants[data.bundleData.index].investitionsMap = ids;
        this.variantService.updateField({id: data.bundleData.id, field: 'investitionsMap', value: ids}).toPromise();
      });
  }

  deleteStart(variant: Variant): void {
    this.deleteSubscription = this.modalCreatorService.createModal({
      message: 'Czy napewno usunąć kategorie inwestycji?',
      data: variant.id,
    }).subscribe(data => {
      if (data.isConfirm) {
        this.variantService.delete((data.data as number)).toPromise().then(() => {
          this.variantService.all().toPromise().then(vs => {
            this.variants = vs;
          });
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.variantCloseSubscription) {
      this.variantCloseSubscription.unsubscribe();
    }
    if (this.changeOrderSubscription) {
      this.changeOrderSubscription.unsubscribe();
    }
    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
    if (this.subVariants) {
      this.subVariants.unsubscribe();
    }
    if (this.subRefresh) {
      this.subRefresh.unsubscribe();
    }
  }

}
