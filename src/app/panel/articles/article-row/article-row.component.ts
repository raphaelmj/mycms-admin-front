import { ArticlesRefreshService } from './../../../services/articles-refresh.service';
import { ArticleService } from './../../../services/article/article.service';
import { switchMap } from 'rxjs/operators';
import { Subscription, pipe } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { Article } from './../../../interfaces/article.interface';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-article-row',
  templateUrl: './article-row.component.html',
  styleUrls: ['./article-row.component.scss'],
})
export class ArticleRowComponent implements OnInit, OnDestroy {
  @Input() article: Article;
  @Output() editEmit: EventEmitter<Article> = new EventEmitter<Article>();
  @Output() deleteEmit: EventEmitter<Article> = new EventEmitter<Article>();
  webUrl: string = environment.WEB_URL;
  formA: FormGroup;
  subStatusChange: Subscription;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private articlesRefreshService: ArticlesRefreshService
  ) {}

  ngOnInit(): void {
    this.formA = this.fb.group({
      status: [this.article.status],
    });
    this.changeStatusSubscribe();
  }

  changeStatusSubscribe(): void {
    this.subStatusChange = this.formA
      .get('status')
      .valueChanges.pipe(
        switchMap((v) =>
          this.articleService.updateField(this.article.id, v, 'status')
        )
      )
      .subscribe((a: Article) => {
        this.article = { ...this.article, ...a };
        this.articlesRefreshService.refresh();
      });
  }

  edit(): void {
    this.editEmit.emit(this.article);
  }

  delete(): void {
    this.deleteEmit.emit(this.article);
  }

  ngOnDestroy(): void {
    if (this.subStatusChange) {this.subStatusChange.unsubscribe();}
  }
}
