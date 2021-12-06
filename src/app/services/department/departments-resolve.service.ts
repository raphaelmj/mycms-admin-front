import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Department} from '../../interfaces/department.interface';
import {Observable} from 'rxjs';
import {DepartmentService} from './department.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsResolveService implements Resolve<Department[]>{

  constructor(private departmentService: DepartmentService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Department[]> {
    return this.departmentService.all();
  }
}
