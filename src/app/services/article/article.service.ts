import {PaginationListResponse} from './../../interfaces/pagination-list-response.interface';
import {ArticlesQuery} from './../../interfaces/articles-query.inteface';
import {environment} from './../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Article} from './../../interfaces/article.interface';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private httpClient: HttpClient) {
  }

  findMany(
    aqp: ArticlesQuery
  ): Observable<PaginationListResponse<Article, ArticlesQuery>> {
    let params: HttpParams = new HttpParams();
    if (aqp.phrase) {
      params = params.append('phrase', aqp.phrase);
    }
    if (aqp.page) {
      params = params.append('page', aqp.page);
    }
    return this.httpClient.get<PaginationListResponse<Article, ArticlesQuery>>(
      environment.API_URL + '/article/many',
      {params}
    );
  }

  create(
    article: Article,
    croppedImage: string,
    noImage: boolean,
    categoryId: number
  ): Observable<Article> {
    if (noImage) {
      article.image = null;
    }
    return this.httpClient.post<Article>(
      environment.API_URL + '/article/create',
      {
        article,
        croppedImage,
        categoryId,
        noImage
      }
    );
  }

  update(
    article: Article,
    croppedImage: string,
    noImage: boolean,
    categoryId: number
  ): Observable<Article> {
    if (noImage) {
      article.image = null;
    }
    return this.httpClient.post<Article>(
      environment.API_URL + '/article/update',
      {
        article,
        croppedImage,
        categoryId,
        noImage
      }
    );
  }

  updateField(id: number, value: any, field: string): Observable<Article> {
    return this.httpClient.post<Article>(
      environment.API_URL + '/article/update/field',
      {
        id,
        value,
        field,
      }
    );
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(
      environment.API_URL + '/article/delete/' + id
    );
  }

  empty(): Article {
    return {
      title: '',
      short: '',
      content: '',
      leftContent: '',
      rightContent: '',
      publishedAt: moment().toISOString(),
      status: false,
      metaTitle: '',
      metaKeywords: '',
      metaDescription: ''
    };
  }
}
