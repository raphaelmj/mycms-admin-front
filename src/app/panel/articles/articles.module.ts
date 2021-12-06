import { MaterialModule } from './../../shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ToolsModule } from './../../tools/tools.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesComponent } from './articles.component';
import { ArticleRowComponent } from './article-row/article-row.component';
import { ArticleAddEditComponent } from './article-add-edit/article-add-edit.component';
import { MAT_DATE_LOCALE, NativeDateModule } from '@angular/material/core';
import {
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
  NgxMatNativeDateModule,
} from '@angular-material-components/datetime-picker';
import {CKEditorModule} from 'ckeditor4-angular';

@NgModule({
  declarations: [
    ArticlesComponent,
    ArticleRowComponent,
    ArticleAddEditComponent,
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    ToolsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    CKEditorModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pl-PL', multi: true }],
})
export class ArticlesModule {}
