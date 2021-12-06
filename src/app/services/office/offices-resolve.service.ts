import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Office} from '../../interfaces/office.interface';
import {Observable} from 'rxjs';
import {OfficeService} from './office.service';

@Injectable({
  providedIn: 'root'
})
export class OfficesResolveService implements Resolve<Office[]>{

  constructor(private officeService: OfficeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Office[]> {
    return this.officeService.all();
  }
}
