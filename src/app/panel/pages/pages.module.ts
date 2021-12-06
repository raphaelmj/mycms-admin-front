import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { PageRowComponent } from './page-row/page-row.component';
import {PipesModule} from '../../pipes/pipes.module';
import {MaterialModule} from '../../shared/material.module';
import { PageAddEditComponent } from './page-add-edit/page-add-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import { PageConfigComponent } from './page-add-edit/page-config/page-config.component';
import {ToolsModule} from '../../tools/tools.module';
import { PageSlidesComponent } from './page-slides/page-slides.component';
import { BeamsPagesComponent } from './beams-pages/beams-pages.component';


@NgModule({
  declarations: [
    PagesComponent,
    PageRowComponent,
    PageAddEditComponent,
    PageConfigComponent,
    PageSlidesComponent,
    BeamsPagesComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    PipesModule,
    MaterialModule,
    ReactiveFormsModule,
    ToolsModule
  ]
})
export class PagesModule { }
