import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Department} from '../../interfaces/department.interface';
import {DepartmentType} from '../../interfaces/enums/department-type.enum';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private httpClient: HttpClient) { }

  all(): Observable<Department[]> {
    return this.httpClient.get<Department[]>(environment.API_URL + '/department/all');
  }

  changeOrder(ids: number[]): Observable<Department[]> {
    return this.httpClient.post<Department[]>(environment.API_URL + '/department/update/order', {ids});
  }

  setMain(id: number): Observable<Department> {
    return this.httpClient.put<Department>(environment.API_URL + '/department/set/main/' + id, {});
  }

  updateField(data: {id: number, field: string, value: any}): Observable<Department> {
    return this.httpClient.post<Department>(environment.API_URL + '/department/update/field', data);
  }

  update(department: Department): Observable<Department> {
    return this.httpClient.post<Department>(environment.API_URL + '/department/update', department);
  }

  create(department: Department): Observable<Department> {
    return this.httpClient.post<Department>(environment.API_URL + '/department/create', department);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(environment.API_URL + '/department/delete/' + id);
  }

  empty(): Department {
    return {
      name: '',
      viewType: DepartmentType.contactsSections,
      params: {},
      main: false,
      offices: [],
      pages: [],
      contactsSections: [],
      officesMap: [],
      ordering: null,
      showOnPage: false,
      metaTitle: '',
      metaKeywords: '',
      metaDescription: ''
    };
  }

}
