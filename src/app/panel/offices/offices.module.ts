import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficesRoutingModule } from './offices-routing.module';
import { OfficesComponent } from './offices.component';
import { OfficeRowComponent } from './office-row/office-row.component';
import { OfficeAddEditComponent } from './office-add-edit/office-add-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../shared/material.module';
import {ToolsModule} from '../../tools/tools.module';
import {CKEditorModule} from 'ckeditor4-angular';


@NgModule({
  declarations: [
    OfficesComponent,
    OfficeRowComponent,
    OfficeAddEditComponent
  ],
  imports: [
    CommonModule,
    OfficesRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    ToolsModule,
    CKEditorModule,
  ]
})
export class OfficesModule { }
