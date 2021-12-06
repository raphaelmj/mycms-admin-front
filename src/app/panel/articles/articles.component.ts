import {
  ConfirmWindowComponent,
  ConfirmBundleResponse,
} from './../../tools/confirm-window/confirm-window.component';
import { ArticlesRefreshService } from './../../services/articles-refresh.service';
import { ArticleAddEditComponent } from './article-add-edit/article-add-edit.component';
import { environment } from './../../../environments/environment';
import { element } from 'protractor';
import { PagPage } from './../../tools/pagination-async/pagination-async.component';
import { PaginationListResponse } from './../../interfaces/pagination-list-response.interface';
import {
  tap,
  map,
  skip,
  concatMap,
  switchMap,
  skipWhile,
  skipUntil,
} from 'rxjs/operators';
import { Article } from './../../interfaces/article.interface';
import { Observable, of, Subscription } from 'rxjs';
import { ArticleService } from './../../services/article/article.service';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  ComponentFactoryResolver,
  Type,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesQuery } from 'src/app/interfaces/articles-query.inteface';
import {Category} from '../../interfaces/category.interface';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit, OnDestroy {
  @ViewChild('temp', { read: ViewContainerRef }) temp: ViewContainerRef;
  addEditC: ComponentRef<ArticleAddEditComponent>;
  confirmC: ComponentRef<ConfirmWindowComponent>;
  articles$: Observable<Article[]>;
  categories: Category[];
  aqp$: Observable<ArticlesQuery>;
  total$: Observable<number>;
  phrase$: Observable<string>;
  webUrl: string = environment.WEB_URL;

  subRoute: Subscription;
  subQp1: Subscription;
  subQp2: Subscription;
  subCloseAddEdit: Subscription;
  subRefresh: Subscription;
  subConfirm: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private cf: ComponentFactoryResolver,
    private articlesRefreshService: ArticlesRefreshService
  ) {}

  ngOnInit(): void {
    this.categories = this.activatedRoute.snapshot.data.categories;
    const r: PaginationListResponse<Article, ArticlesQuery> = this.activatedRoute
      .snapshot.data.articles;
    this.aqp$ = of(r).pipe(
      tap((data) => {
        this.articles$ = of(data.elements);
        this.total$ = of(data.total);
      }),
      map((data) => data.qp)
    );
    this.routeChangeSubscribe();
    this.subRefresh = this.articlesRefreshService.action$
      .pipe(
        skipWhile((bool) => !bool),
        switchMap((bool) => this.aqp$),
        concatMap((aqp) => this.articleService.findMany(aqp)),
        tap((data) => {
          this.aqp$ = of(data.qp);
          this.total$ = of(data.total);
          this.articles$ = of(data.elements);
        })
      )
      .subscribe((data) => {});
  }

  routeChangeSubscribe(): void {
    this.subRoute = this.activatedRoute.queryParams
      .pipe(
        skip(1),
        concatMap((qp) => {
          const aqp: ArticlesQuery = {};
          aqp.page = qp.page ? qp.page : '1';
          aqp.phrase = qp.phrase ? qp.phrase : '';
          return this.articleService.findMany(aqp);
        }),
        tap((data) => {
          this.aqp$ = of(data.qp);
          this.total$ = of(data.total);
          this.articles$ = of(data.elements);
        })
      )
      .subscribe();
  }

  changePag(event: PagPage): void {
    this.subQp1 = this.aqp$.subscribe((aqp) => {
      const qp: ArticlesQuery = { ...aqp, ...{ page: String(event.nr) } };
      this.router.navigate(['/panel/articles'], { queryParams: qp });
    });
  }

  changePhrase(event: string): void {
    this.subQp2 = this.aqp$.subscribe((aqp) => {
      const qp: ArticlesQuery = { ...aqp, ...{ phrase: event, page: '1' } };
      this.router.navigate(['/panel/articles'], { queryParams: qp });
    });
  }

  addEdit(isNew: boolean = true, article?: Article): void {
    this.temp.clear();
    const v = this.cf.resolveComponentFactory(
      ArticleAddEditComponent as Type<ArticleAddEditComponent>
    );
    this.addEditC = this.temp.createComponent(v);
    this.addEditC.instance.article = isNew
      ? this.articleService.empty()
      : article;
    this.addEditC.instance.categories = this.categories;
    this.addEditC.instance.isNew = isNew;
    this.subCloseAddEdit = this.addEditC.instance.emitClose.subscribe((r) => {
      this.addEditC.destroy();
    });
  }

  editOpen(article: Article): void {
    this.addEdit(false, article);
  }

  deleteStart(article: Article): void {
    this.temp.clear();
    const v = this.cf.resolveComponentFactory(
      ConfirmWindowComponent as Type<ConfirmWindowComponent>
    );
    this.confirmC = this.temp.createComponent(v);
    this.confirmC.instance.bundleData = article;
    this.confirmC.instance.message = 'Czy chcesz usunąć artykuł?';
    this.subConfirm = this.confirmC.instance.emitActionConfirm.subscribe(
      (r: ConfirmBundleResponse) => {
        if (r.do) {
          this.delete(r.bundleData.id);
        }
        this.confirmC.destroy();
      }
    );
  }

  delete(id: number): void {
    this.articleService
      .delete(id)
      .toPromise()
      .then((r) => {
        this.articlesRefreshService.refresh();
      });
  }

  ngOnDestroy(): void {
    if (this.subRoute) { this.subRoute.unsubscribe(); }
    if (this.subQp1) { this.subQp1.unsubscribe(); }
    if (this.subQp2) { this.subQp2.unsubscribe(); }
    if (this.subRefresh) { this.subRefresh.unsubscribe(); }
    if (this.subCloseAddEdit) { this.subCloseAddEdit.unsubscribe(); }
    if (this.subConfirm) { this.subConfirm.unsubscribe(); }
  }
}
