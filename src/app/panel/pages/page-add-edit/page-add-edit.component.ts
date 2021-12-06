import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {Page, PageAssociations, PageRightLink} from '../../../interfaces/page.interface';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {retry, skipUntil, switchMap} from 'rxjs/operators';
import {PagesRefreshService} from '../../../services/pages-refresh.service';
import {PageService} from '../../../services/page/page.service';
import {PageViewType} from '../../../interfaces/enums/page-view-type.enum';
import {Color} from '../../../interfaces/color.interface';
import {COLORS} from '../../../core/constans/colors';
import {environment} from '../../../../environments/environment';
import {ICONS} from '../../../core/constans/icons';
import {LinkTarget} from '../../../interfaces/types/link-target';
import {LINK_TARGETS} from '../../../core/constans/link-targets';


@Component({
  selector: 'app-page-add-edit',
  templateUrl: './page-add-edit.component.html',
  styleUrls: ['./page-add-edit.component.scss']
})
export class PageAddEditComponent implements OnInit {
  @Input() page: Page;
  @Input() isNew = false;
  @Output() emitClose: EventEmitter<any> = new EventEmitter();

  form: FormGroup;
  subSubmit: Subscription;
  pageTypes: Array<PageViewType> = [
    PageViewType.main,
    PageViewType.notices,
    PageViewType.contact,
    PageViewType.article,
    PageViewType.articles,
    PageViewType.invests,
    PageViewType.department,
    PageViewType.doubleArticle,
    PageViewType.rodoArticle,
    PageViewType.aboutArticleMapsView
  ];
  submit$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isSaving$: Observable<boolean> = of(false);

  colors: Color[] = COLORS;
  color: Color;
  webUrl: string = environment.WEB_URL;
  icons: string[] = ICONS;
  targets: LinkTarget[] = LINK_TARGETS;
  pageAssociations: PageAssociations;
  articlesIds$: Observable<number[]>;
  contactIds$: Observable<number[]>;
  categoryIds$: Observable<number[]>;
  officeIds$: Observable<number[]>;
  variantIds$: Observable<number[]>;
  departmentIds$: Observable<number[]>;

  constructor(private fb: FormBuilder, private pageRefreshService: PagesRefreshService, private pageService: PageService) { }

  ngOnInit(): void {
    this.createForm();
    this.onSubmit();
    this.color = this.page.pageColor;
    this.createPageAssociationsFromPage();
  }


  createForm(): void {
    this.form = this.fb.group({
      title: [this.page.title, Validators.required],
      linkTitle: [this.page.linkTitle],
      viewType: [this.page.viewType],
      metaTitle: [this.page.metaTitle],
      metaKeywords: [this.page.metaKeywords],
      metaDescription: [this.page.metaDescription],
      config: this.fb.group({
        main: this.fb.group({}),
        invests: this.fb.group({}),
        article: this.fb.group({
          presentation: [this.page.config.article.presentation]
        }),
        articles: this.fb.group({
          columns: [this.page.config.articles.columns]
        }),
        personOffices: this.fb.group({}),
        officePersons: this.fb.group({}),
        contact: this.fb.group({
          presentation: [this.page.config.contact.presentation]
        }),
        department: this.fb.group({
          presentation: [this.page.config.department.presentation]
        }),
        notices: this.fb.group({
          presentation: [this.page.config.notices.presentation]
        }),
      }),
      rightLinks: this.makeArray(this.page.rightLinks)
    });
  }

  createPageAssociationsFromPage(): void {
    const articleId: number = (this.page.article) ? this.page.article.id : null;
    const contactId: number = (this.page.contact) ? this.page.contact.id : null;
    const categoryId: number = (this.page.category) ? this.page.category.id : null;
    const officeId: number = (this.page.office) ? this.page.office.id : null;
    const variantIds: number[] = this.page.variants.map(v => v.id);
    const departmentIds: number[] = [];
    this.pageAssociations = {articleId, contactId, categoryId, officeId, variantIds, departmentIds};
    this.articlesIds$ = of((this.pageAssociations.articleId) ? [this.pageAssociations.articleId] : []);
    this.categoryIds$ = of((this.pageAssociations.categoryId) ? [this.pageAssociations.categoryId] : []);
    this.contactIds$ = of((this.pageAssociations.contactId) ? [this.pageAssociations.contactId] : []);
    this.officeIds$ = of((this.pageAssociations.officeId) ? [this.pageAssociations.officeId] : []);
    this.variantIds$ = of((this.pageAssociations.variantIds) ? this.pageAssociations.variantIds : []);
    this.departmentIds$ = of((this.pageAssociations.departmentIds) ? this.pageAssociations.departmentIds : []);
  }

  setOffice(id: number): void {
    this.pageAssociations.officeId = id;
  }

  setArticle(id: number): void {
    this.pageAssociations.articleId = id;
  }

  setCategory(id: number): void {
    this.pageAssociations.categoryId = id;
  }

  setDepartments(ids: number[]): void {
    this.pageAssociations.departmentIds = ids;
  }

  setVariants(ids: number[]): void {
    this.pageAssociations.variantIds = ids;
  }

  setContact(id: number): void {
    this.pageAssociations.contactId = id;
  }

  setPages(ids: number[]): void {
    this.page.leftPages = ids;
  }

  setPagesTop(ids: number[]): void {
    this.page.contextMenuTop = ids;
  }

  setPagesBottom(ids: number[]): void {
    this.page.contextMenuBottom = ids;
  }

  makeArray(rightLinks: PageRightLink[]): FormArray{
    const array: FormArray = this.fb.array([]);
    rightLinks.forEach(rl => {
      array.push(this.fb.group({
        name: rl.name,
        link: rl.link,
        target: rl.target,
        icon: rl.icon
      }));
    });
    return array;
  }

  addRightLink(): void{
    (this.form.get('rightLinks') as FormArray).push(this.fb.group({
      name: 'Nazwa',
      link: '/',
      target: '_self',
      icon: this.icons[0]
    }));
  }

  removeRightLink(i: number): void {
    (this.form.get('rightLinks') as FormArray).controls.splice(i, 1);
    (this.form.get('rightLinks') as FormArray).value.splice(i, 1);
  }

  changeIcon(icon: string, i: number): void{
    (this.form.get('rightLinks') as FormArray).controls[i].get('icon').setValue(icon, {emitEvent: false});
  }

  saveData(): void {
    this.submit$.next(true);
  }

  onSubmit(): void {
    this.subSubmit = this.submit$
      .pipe(
        skipUntil(this.isSaving$),
        switchMap((bool) => {
          if (bool && this.form.valid) {
            this.isSaving$ = of(true);
            return this.save();
          } else {
            return of(false);
          }
        })
      )
      .subscribe((v: Page | false) => {
        if (this.isNew && v) {
          this.page = v;
          this.isNew = false;
        }
        if (v) { this.pageRefreshService.refresh(); }
        this.isSaving$ = of(false);
      });
  }

  save(): Observable<Page> {
    if (this.form.valid) {
      const page = {...this.page, ...this.form.value};
      const {contact, category, article, office, departments, variants, popups, ...rest} = page;
      return this.pageService.updatePage(rest, this.pageAssociations);
    }
  }

  closeEdit(): void {
    this.emitClose.emit();
  }
}
