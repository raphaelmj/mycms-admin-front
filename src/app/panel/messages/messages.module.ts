import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MessagesRoutingModule} from './messages-routing.module';
import {MessagesComponent} from './messages.component';
import {MessageElementComponent} from './message-element/message-element.component';
import {MessageEditAddComponent} from './message-edit-add/message-edit-add.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../shared/material.module';
import {ToolsModule} from '../../tools/tools.module';
import {CKEditorModule} from 'ckeditor4-angular';
import {NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule} from '@angular-material-components/datetime-picker';
import {MAT_DATE_LOCALE, NativeDateModule} from '@angular/material/core';

@NgModule({
  declarations: [
    MessagesComponent,
    MessageElementComponent,
    MessageEditAddComponent
  ],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    ToolsModule,
    CKEditorModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    NgxMatDatetimePickerModule
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'pl-PL', multi: true}]
})
export class MessagesModule {
}
