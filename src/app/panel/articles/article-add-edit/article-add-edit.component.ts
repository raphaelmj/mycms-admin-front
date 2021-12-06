import {ArticlesRefreshService} from './../../../services/articles-refresh.service';
import {ArticleService} from './../../../services/article/article.service';
import {ImageUploadElementComponent} from './../../../tools/image-upload-element/image-upload-element.component';
import {environment} from './../../../../environments/environment';
import {Article} from './../../../interfaces/article.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, of, Subscription, BehaviorSubject} from 'rxjs';
import {
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    Type,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import {skip, skipUntil, switchMap} from 'rxjs/operators';
import {Category} from '../../../interfaces/category.interface';

@Component({
    selector: 'app-article-add-edit',
    templateUrl: './article-add-edit.component.html',
    styleUrls: ['./article-add-edit.component.scss'],
})
export class ArticleAddEditComponent implements OnInit, OnDestroy {
    @ViewChild('tempImage', {read: ViewContainerRef})
    tempImage: ViewContainerRef;
    imageC: ComponentRef<ImageUploadElementComponent>;
    @Input() article: Article;
    @Input() categories: Category[] = [];
    @Input() isNew: boolean;
    @Output() emitClose: EventEmitter<any> = new EventEmitter();
    submit$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    webUrl: string = environment.WEB_URL;
    isSaving$: Observable<boolean> = of(false);
    formA: FormGroup;
    croppedImage: string = null;
    public touchUi = false;
    ckEditorConfig = environment.CK_EDITOR_CONFIG;
    noImage = false;
    selectCategories: Array<Category | { id: null, name: string }> = [
        {id: null, name: 'Poza kategorią'}
    ];

    subClose: Subscription;
    subImage: Subscription;
    subSubmit: Subscription;
    ckConfig: string = environment.CK_EDITOR_CONFIG;

    constructor(
        private fb: FormBuilder,
        private cf: ComponentFactoryResolver,
        private articleService: ArticleService,
        private articlesRefreshService: ArticlesRefreshService
    ) {
    }

    ngOnInit(): void {
        this.categories.forEach(category => {
            this.selectCategories.push(category);
        });
        if (!this.article.image) {
            this.noImage = true;
        }
        this.createForm();
        this.onSubmit();
    }

    createForm(): void {
        this.formA = this.fb.group({
            title: [this.article.title, Validators.required],
            short: [this.article.short],
            content: [this.article.content],
            status: [this.article.status],
            leftContent: [this.article.leftContent],
            rightContent: [this.article.rightContent],
            publishedAt: [this.article.publishedAt],
            categoryId: [(this.article.category) ? this.article.category.id : null],
            metaTitle: [this.article.metaTitle],
            metaKeywords: [this.article.metaKeywords],
            metaDescription: [this.article.metaDescription],
        });
    }

    openEditImage(): void {
        this.tempImage.clear();
        const v = this.cf.resolveComponentFactory(
            ImageUploadElementComponent as Type<ImageUploadElementComponent>
        );
        this.imageC = this.tempImage.createComponent(v);
        this.imageC.instance.width = 1;
        this.imageC.instance.height = 0.7;
        this.imageC.instance.maintainAspectRatio = false;
        this.subImage = this.imageC.instance.imageEmit.subscribe((image) => {
            this.croppedImage = image.source;
            this.noImage = false;
            this.imageC.destroy();
        });
        this.subClose = this.imageC.instance.closeEmit.subscribe((r) => {
            this.imageC.destroy();
        });
    }

    saveData(): void {
        this.submit$.next(true);
    }

    onSubmit(): void {
        this.subSubmit = this.submit$
            .pipe(
                skipUntil(this.isSaving$),
                switchMap((bool) => {
                    if (bool && this.formA.valid) {
                        this.isSaving$ = of(true);
                        return this.save();
                    } else {
                        return of(false);
                    }
                })
            )
            .subscribe((v: Article | false) => {
                if (this.isNew && v) {
                    this.article = v;
                    this.isNew = false;
                }
                if (v) {
                    this.articlesRefreshService.refresh();
                }
                this.isSaving$ = of(false);
            });
    }

    save(): Observable<Article> {
        if (this.formA.valid) {
            const {categoryId, ...rest} = this.formA.value;
            const a: Article = {...this.article, ...rest};
            if (this.isNew) {
                return this.articleService.create(a, this.croppedImage, this.noImage, categoryId);
            } else {
                return this.articleService.update(a, this.croppedImage, this.noImage, categoryId);
            }
        }
    }

    closeEdit(): void {
        this.emitClose.emit();
    }

    ngOnDestroy(): void {
        if (this.subClose) {
            this.subClose.unsubscribe();
        }
        if (this.subImage) {
            this.subImage.unsubscribe();
        }
        if (this.subSubmit) {
            this.subSubmit.unsubscribe();
        }
    }
}
