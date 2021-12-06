import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfficesComponent } from './offices.component';
import {OfficesResolveService} from '../../services/office/offices-resolve.service';

const routes: Routes = [
  {path: '', component: OfficesComponent, resolve: {offices: OfficesResolveService}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficesRoutingModule { }
