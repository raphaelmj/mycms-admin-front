import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef, Type, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Page} from '../../interfaces/page.interface';
import {Observable, of, Subscription} from 'rxjs';
import {PageService} from '../../services/page/page.service';
import {PageAddEditComponent} from './page-add-edit/page-add-edit.component';
import {PageSlidesComponent} from './page-slides/page-slides.component';
import {PagesRefreshService} from '../../services/pages-refresh.service';
import {concatMap, map, skipWhile} from 'rxjs/operators';
import {ElementsOrderComponent} from '../../tools/elements-order/elements-order.component';
import {EntityType} from '../../interfaces/types/entity-type';
import {VariantService} from '../../services/variant/variant.service';
import {PositionService} from '../../services/positions/position.service';
import {Position} from '../../interfaces/position.interface';
import {BeamsPagesComponent} from './beams-pages/beams-pages.component';
import {SimpleHelperService} from '../../services/simple-helper.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit, OnDestroy {

  @ViewChild('tempModal', {read: ViewContainerRef}) temp: ViewContainerRef;
  @ViewChild('tempRight', {read: ViewContainerRef}) tempRight: ViewContainerRef;
  editaddC: ComponentRef<PageAddEditComponent>;
  pageSlidesC: ComponentRef<PageSlidesComponent>;
  elementsOrderC: ComponentRef<ElementsOrderComponent>;
  beamsPagesC: ComponentRef<BeamsPagesComponent>;
  pages$: Observable<Page[]>;
  subClose: Subscription;
  subCloseSlides: Subscription;
  subChanges: Subscription;
  subVariants: Subscription;
  subOrderElements: Subscription;
  subCloseOrderElements: Subscription;
  beamsEditCloseSubscrition: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pageService: PageService,
    private pageRefreshService: PagesRefreshService,
    private variantService: VariantService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private positionService: PositionService,
    private simpleHelperService: SimpleHelperService,
  ) {
    this.pages$ = of(activatedRoute.snapshot.data.pages);
  }

  ngOnInit(): void {
    this.subChanges = this.pageRefreshService.action$
      .pipe(
        skipWhile(bool => !bool),
        concatMap(() => this.pageService.getPages())
      ).subscribe(pages => {
        this.pages$ = of(pages);
      });
  }

  showEdit(page: Page): void {
    this.temp.clear();
    const edit = this.componentFactoryResolver.resolveComponentFactory(PageAddEditComponent as Type<PageAddEditComponent>);
    this.editaddC = this.temp.createComponent(edit);
    this.editaddC.instance.page = page;
    this.editaddC.instance.isNew = false;
    this.subClose = this.editaddC.instance.emitClose.subscribe(() => {
      this.editaddC.destroy();
    });
  }

  showSlidesEdit(page: Page): void {
    this.temp.clear();
    const ps = this.componentFactoryResolver.resolveComponentFactory(PageSlidesComponent as Type<PageSlidesComponent>);
    this.pageSlidesC = this.temp.createComponent(ps);
    this.pageSlidesC.instance.pageSlides = page.slides;
    this.pageSlidesC.instance.page = page;
    this.subCloseSlides = this.pageSlidesC.instance.emitClose.subscribe(() => {
      this.pageSlidesC.destroy();
    });
  }

  variantOrder(page: Page): void {
    this.subVariants = this.variantService.getPageVariants(page.id).subscribe(variants => {
      this.showEditOrder(
        variants,
        'variant',
        'name',
        `Kategorie inwestycji (${page.title})`,
        'path'
      );
    });
  }

  showEditOrder(elements: Array<any>, model: EntityType, nameKey: string, header: string, customKey?: string): void {
    this.tempRight.clear();
    const ord = this.componentFactoryResolver.resolveComponentFactory(ElementsOrderComponent as Type<ElementsOrderComponent>);
    this.elementsOrderC = this.tempRight.createComponent(ord);
    this.elementsOrderC.instance.elements = elements;
    this.elementsOrderC.instance.nameKey = nameKey;
    this.elementsOrderC.instance.customKey = customKey;
    this.elementsOrderC.instance.header = header;
    this.subOrderElements = this.elementsOrderC.instance.onChange.pipe(
      map((elements: Array<any>) => {
        return elements.map(el => el.id);
      }),
      concatMap((elements: number[]) => {
        switch (model) {
          case 'variant':
            return this.variantService.updatePageVariantsOrder(elements);
            break;
        }
      })
    ).subscribe();
  }

  editStaticMenu(): void {
    this.positionService.all().toPromise().then(positions => {
      this.openEditStaticMenu(positions);
    });
  }

  openEditStaticMenu(positions: Position[]): void {
    this.temp.clear();
    const bp = this.componentFactoryResolver.resolveComponentFactory(BeamsPagesComponent as Type<BeamsPagesComponent>);
    this.beamsPagesC = this.tempRight.createComponent(bp);
    this.beamsPagesC.instance.positions = this.simpleHelperService.objectNewInstance(positions);
    this.beamsEditCloseSubscrition = this.beamsPagesC.instance.emitClose.subscribe(() => {
      this.beamsPagesC.destroy();
    });
  }

  editSlides(page: Page): void {
    this.temp.clear();
  }

  ngOnDestroy(): void {
    if (this.subClose) {
      this.subClose.unsubscribe();
    }
    if (this.subCloseSlides) {
      this.subCloseSlides.unsubscribe();
    }
    if (this.subChanges) {
      this.subChanges.unsubscribe();
    }
    if (this.subVariants) {
      this.subVariants.unsubscribe();
    }
    if (this.subOrderElements) {
      this.subOrderElements.unsubscribe();
    }
  }

}
