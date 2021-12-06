import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EntityType} from '../../interfaces/types/entity-type';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  constructor(private httpClient: HttpClient) { }

  all<T>(entityType: EntityType): Observable<T[]>{
    return this.httpClient.get<T[]>(`${environment.API_URL}/${entityType}/all`);
  }
}
