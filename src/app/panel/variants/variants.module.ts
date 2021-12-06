import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VariantsRoutingModule } from './variants-routing.module';
import { VariantsComponent } from './variants.component';
import { VariantEditAddComponent } from './variant-edit-add/variant-edit-add.component';
import {MaterialModule} from '../../shared/material.module';
import {ToolsModule} from '../../tools/tools.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CKEditorModule} from 'ckeditor4-angular';


@NgModule({
  declarations: [
    VariantsComponent,
    VariantEditAddComponent
  ],
  imports: [
    CommonModule,
    VariantsRoutingModule,
    MaterialModule,
    ToolsModule,
    ReactiveFormsModule,
    CKEditorModule,
  ]
})
export class VariantsModule { }
