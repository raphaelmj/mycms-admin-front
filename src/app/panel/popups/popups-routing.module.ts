import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PopupsComponent} from './popups.component';
import {PopupsResolveService} from '../../services/popup/popups-resolve.service';
import {VariantsResolveService} from '../../services/variant/variants-resolve.service';
import {DepartmentsResolveService} from '../../services/department/departments-resolve.service';
import {PagesResolveService} from '../../services/page/pages-resolve.service';
import {InvestitionsResolveService} from '../../services/investition/investitions-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: PopupsComponent,
    resolve: {
      popups: PopupsResolveService,
      variants: VariantsResolveService,
      departments: DepartmentsResolveService,
      pages: PagesResolveService,
      investitions: InvestitionsResolveService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PopupsRoutingModule { }
