import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { ContactEditAddComponent } from './contact-edit-add/contact-edit-add.component';
import { ContactRowComponent } from './contact-row/contact-row.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../shared/material.module';
import {ToolsModule} from '../../tools/tools.module';
import {CKEditorModule} from 'ckeditor4-angular';


@NgModule({
  declarations: [
    ContactsComponent,
    ContactEditAddComponent,
    ContactRowComponent
  ],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    ToolsModule,
    CKEditorModule,
  ]
})
export class ContactsModule { }
