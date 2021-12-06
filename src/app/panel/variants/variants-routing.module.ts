import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VariantsComponent} from './variants.component';
import {VariantsResolveService} from '../../services/variant/variants-resolve.service';

const routes: Routes = [
  {path: '', component: VariantsComponent, resolve: {variants: VariantsResolveService}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VariantsRoutingModule { }
