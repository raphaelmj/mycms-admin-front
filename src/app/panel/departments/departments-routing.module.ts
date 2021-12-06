import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentsComponent } from './departments.component';
import {DepartmentsResolveService} from '../../services/department/departments-resolve.service';

const routes: Routes = [
  {path: '', component: DepartmentsComponent, resolve: {departments: DepartmentsResolveService}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentsRoutingModule { }
