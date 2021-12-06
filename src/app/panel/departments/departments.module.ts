import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentsComponent } from './departments.component';
import { DepartmentElementComponent } from './department-element/department-element.component';
import { DepartmentEditAddComponent } from './department-edit-add/department-edit-add.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ToolsModule} from '../../tools/tools.module';
import {PipesModule} from '../../pipes/pipes.module';
import {MaterialModule} from '../../shared/material.module';


@NgModule({
  declarations: [
    DepartmentsComponent,
    DepartmentElementComponent,
    DepartmentEditAddComponent
  ],
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
    ReactiveFormsModule,
    ToolsModule,
    PipesModule,
    MaterialModule
  ]
})
export class DepartmentsModule { }
