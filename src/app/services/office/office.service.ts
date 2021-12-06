import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Office} from '../../interfaces/office.interface';
import {MapFiles} from '../../interfaces/map-files.interface';
import {ContactElement} from '../../interfaces/contact-element.interface';
import {Department} from '../../interfaces/department.interface';
import {Investition} from '../../interfaces/investition.interface';
import {Page} from '../../interfaces/page.interface';
import {Variant} from '../../interfaces/variant.interface';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {
  constructor(private httpClient: HttpClient) { }

  all(): Observable<Office[]> {
    return this.httpClient.get<Office[]>(environment.API_URL + '/office/all');
  }

  setMain(id: number): Observable<Office> {
    return this.httpClient.put<Office>(environment.API_URL + '/office/set/main/' + id, {});
  }

  updateField(data: {id: number, field: string, value: any}): Observable<Office> {
    return this.httpClient.post<Office>(environment.API_URL + '/office/update/field', data);
  }

  update(office: Office): Observable<Office> {
    return this.httpClient.post<Office>(environment.API_URL + '/office/update', office);
  }

  create(office: Office): Observable<Office> {
    return this.httpClient.post<Office>(environment.API_URL + '/office/create', office);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(environment.API_URL + '/office/delete/' + id);
  }

  empty(): Office {
    return {
      title: '',
      subTitle: '',
      phones: [],
      emails: [],
      address: '',
      hours: [],
      description: '',
      mapLat: null,
      mapLng: null,
      mapFiles: {
        lessFile: null,
        moreFile: {
          src: null,
          sizeString: null
        }
      },
      mainMapFiles: {
        lessFile: null,
        moreFile: {
          src: null,
          sizeString: null
        }
      },
      main: false,
      contactsSections: [],
      ordering: null,
      departments: [],
      investitions: [],
      pages: [],
      variant: null
    };
  }

}
