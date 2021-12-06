import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PagesComponent} from './pages.component';
import {PagesResolveService} from '../../services/page/pages-resolve.service';

const routes: Routes = [
  {path: '', component: PagesComponent, resolve: {pages: PagesResolveService}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
