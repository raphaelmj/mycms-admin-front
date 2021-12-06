import { environment } from './../../../environments/environment';
import {
  Widget,
} from './../../interfaces/widget.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WidgetService {
  constructor(private httpClient: HttpClient) {}

  all(): Observable<Widget<any>[]> {
    return this.httpClient.get<Widget<any>[]>(
      environment.API_URL + '/widget/all'
    );
  }
}
