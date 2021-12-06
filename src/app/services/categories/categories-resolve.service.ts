import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Category} from '../../interfaces/category.interface';
import {Observable} from 'rxjs';
import {CategoryService} from './category.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesResolveService implements Resolve<Category[]>{

  constructor(
      private categoryService: CategoryService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category[]> {
    return this.categoryService.all();
  }
}
