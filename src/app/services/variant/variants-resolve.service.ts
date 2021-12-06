import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Variant} from '../../interfaces/variant.interface';
import {VariantService} from './variant.service';

@Injectable({
  providedIn: 'root'
})
export class VariantsResolveService implements Resolve<Variant[]>{

  constructor(private variantService: VariantService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Variant[]> {
    return this.variantService.all();
  }
}
