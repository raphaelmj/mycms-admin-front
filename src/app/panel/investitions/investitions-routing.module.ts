import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InvestitionsComponent} from './investitions.component';
import {InvestitionsResolveService} from '../../services/investition/investitions-resolve.service';
import {VariantsResolveService} from '../../services/variant/variants-resolve.service';

const routes: Routes = [
  {path: '', component: InvestitionsComponent, resolve: {investitions: InvestitionsResolveService, variants: VariantsResolveService}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestitionsRoutingModule { }
