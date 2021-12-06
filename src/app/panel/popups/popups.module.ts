import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopupsRoutingModule } from './popups-routing.module';
import { PopupsComponent } from './popups.component';
import { PopupElementComponent } from './popup-element/popup-element.component';
import {PipesModule} from '../../pipes/pipes.module';
import {MaterialModule} from '../../shared/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ToolsModule} from '../../tools/tools.module';
import { RoutesAssocsComponent } from './routes-assocs/routes-assocs.component';
import { RouteAssocElementComponent } from './routes-assocs/route-assoc-element/route-assoc-element.component';
import { RoutePopupElementComponent } from './routes-assocs/route-assoc-element/route-popup-element/route-popup-element.component';
import { PopupEditAddComponent } from './popup-edit-add/popup-edit-add.component';


@NgModule({
  declarations: [
    PopupsComponent,
    PopupElementComponent,
    RoutesAssocsComponent,
    RouteAssocElementComponent,
    RoutePopupElementComponent,
    PopupEditAddComponent
  ],
  imports: [
    CommonModule,
    PopupsRoutingModule,
    PipesModule,
    MaterialModule,
    ReactiveFormsModule,
    ToolsModule
  ]
})
export class PopupsModule { }
