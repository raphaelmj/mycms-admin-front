import { Injectable } from '@angular/core';
import {Investition} from '../../interfaces/investition.interface';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {InvestitionService} from './investition.service';

@Injectable({
  providedIn: 'root'
})
export class InvestitionsResolveService implements Resolve<Investition[]>{

  constructor(private investitionService: InvestitionService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Investition[]> {
    const variant = (route.queryParams.variant) ? route.queryParams.variant : null;
    return this.investitionService.queryFind(variant);
  }
}
