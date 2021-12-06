import { WidgetService } from './widget.service';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Widget } from 'src/app/interfaces/widget.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WidgetsResolveService implements Resolve<Widget<any>[]> {
  constructor(private widgetService: WidgetService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Widget<any>[]> {
    return this.widgetService.all();
  }
}
