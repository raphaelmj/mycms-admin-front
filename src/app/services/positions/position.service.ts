import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Position} from '../../interfaces/position.interface';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private httpClient: HttpClient) {
  }

  all(): Observable<Position[]> {
    return this.httpClient.get<Position[]>(environment.API_URL + '/position/all');
  }

  updateField(data: {id: number, field: string, value: any}): Observable<Position> {
    return this.httpClient.post<Position>(environment.API_URL + '/position/update/field', data);
  }

}
