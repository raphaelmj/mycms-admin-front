import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Page} from '../../interfaces/page.interface';
import {PageService} from './page.service';

@Injectable({
  providedIn: 'root'
})
export class PagesResolveService implements Resolve<Page[]>{

  constructor(private pageService: PageService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Page[]>{
    return this.pageService.getPages();
  }
}
