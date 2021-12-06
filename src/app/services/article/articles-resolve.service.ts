import { ArticlesQuery } from 'src/app/interfaces/articles-query.inteface';
import { PaginationListResponse } from './../../interfaces/pagination-list-response.interface';
import { ArticleService } from './article.service';
import { Article } from './../../interfaces/article.interface';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticlesResolveService
  implements Resolve<PaginationListResponse<Article, ArticlesQuery>> {
  constructor(private articleService: ArticleService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<PaginationListResponse<Article, ArticlesQuery>> {
    let phrase = route.queryParams['phrase'] ? route.queryParams['phrase'] : '';
    let page = route.queryParams['page'] ? route.queryParams['page'] : '1';
    return this.articleService.findMany({ phrase, page });
  }
}
