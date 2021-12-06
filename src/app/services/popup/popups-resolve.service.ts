import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Popup} from '../../interfaces/popup.interface';
import {Observable} from 'rxjs';
import {PopupService} from './popup.service';

@Injectable({
  providedIn: 'root'
})
export class PopupsResolveService implements Resolve<Popup[]>{

  constructor(
    private popupService: PopupService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Popup[]>{
    return this.popupService.all();
  }
}
