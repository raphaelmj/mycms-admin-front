import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Variant, VariantParams} from '../../interfaces/variant.interface';
import {environment} from '../../../environments/environment';
import {Color} from '../../interfaces/color.interface';
import {Office} from '../../interfaces/office.interface';
import {Contact} from '../../interfaces/contact.interface';
import {Investition} from '../../interfaces/investition.interface';
import {Page} from '../../interfaces/page.interface';
import {COLORS} from '../../core/constans/colors';
import {VariantPresentationType} from '../../interfaces/types/variant-presentation-type';

@Injectable({
  providedIn: 'root'
})
export class VariantService {

  constructor(private httpClient: HttpClient) { }

  all(): Observable<Variant[]>{
    return this.httpClient.get<Variant[]>(environment.API_URL + '/variant/all');
  }

  update(variant: Variant, croppedImage: string): Observable<Variant> {
    return this.httpClient.post<Variant>(environment.API_URL + '/variant/update', { variant, croppedImage });
  }

  create(variant: Variant, croppedImage: string): Observable<Variant> {
    return this.httpClient.post<Variant>(environment.API_URL + '/variant/create', { variant, croppedImage });
  }

  getPageVariants(pageId: number): Observable<Variant[]> {
    return this.httpClient.get<Variant[]>(environment.API_URL + '/variant/page/' + pageId + '/list');
  }

  updatePageVariantsOrder(elements: number[]): Observable<Variant[]> {
    return this.httpClient.post<Variant[]>(environment.API_URL + '/variant/order', elements);
  }

  updateField(data: {id: number, field: string, value: any}): Observable<Variant> {
    return this.httpClient.post<Variant>(environment.API_URL + '/variant/update/field', data);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(environment.API_URL + '/variant/delete/' + id);
  }

  empty(): Variant {
    return {
      name: '',
      linkName: '',
      color: COLORS[0],
      leftDescription: '',
      rightDescription: '',
      banner: '',
      params: {
        showDescriptions: false,
        showBanner: false,
        showLink: false,
        presentation: 'default'
      },
      ordering: null,
      contactsSections: [],
      link: null,
      investitionsMap: [],
      offices: [],
      contacts: [],
      variant: null,
      investitions: [],
      page: null,
      metaTitle: '',
      metaKeywords: '',
      metaDescription: ''
    };
  }

}
