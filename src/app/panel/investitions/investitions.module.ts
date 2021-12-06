import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestitionsRoutingModule } from './investitions-routing.module';
import { InvestitionsComponent } from './investitions.component';
import { InvestitionsFilterComponent } from './investitions-filter/investitions-filter.component';
import {MaterialModule} from '../../shared/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import { InvestitionElementComponent } from './investition-element/investition-element.component';
import { InvestitionAddEditComponent } from './investition-add-edit/investition-add-edit.component';
import {ToolsModule} from '../../tools/tools.module';
import { ContactGroupsComponent } from '../../tools/contact-groups/contact-groups.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import { InvestitionListImageComponent } from './investition-list-image/investition-list-image.component';
import {PipesModule} from '../../pipes/pipes.module';
import { StandardGalleryComponent } from './standard-gallery/standard-gallery.component';
import { ProgressGalleryComponent } from './progress-gallery/progress-gallery.component';
import { ProgressGalleryElementComponent } from './progress-gallery/progress-gallery-element/progress-gallery-element.component';
import { GalleryViewComponent } from './investition-add-edit/gallery-view/gallery-view.component';
import { ProgressGalleryViewComponent } from './investition-add-edit/progress-gallery-view/progress-gallery-view.component';
import { ContactPersonComponent } from '../../tools/contact-groups/contact-person/contact-person.component';
import { CustomTableComponent } from './investition-add-edit/custom-table/custom-table.component';
import { InfoAssetsComponent } from './investition-add-edit/custom-table/info-assets/info-assets.component';


@NgModule({
  declarations: [
    InvestitionsComponent,
    InvestitionsFilterComponent,
    InvestitionElementComponent,
    InvestitionAddEditComponent,
    InvestitionListImageComponent,
    StandardGalleryComponent,
    ProgressGalleryComponent,
    ProgressGalleryElementComponent,
    GalleryViewComponent,
    ProgressGalleryViewComponent,
    CustomTableComponent,
    InfoAssetsComponent
  ],
  imports: [
    CommonModule,
    InvestitionsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    ToolsModule,
    CKEditorModule,
    NgxMatColorPickerModule,
    PipesModule
  ],
  providers: [
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }
  ]
})
export class InvestitionsModule { }
