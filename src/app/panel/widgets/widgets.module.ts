import { ReactiveFormsModule } from '@angular/forms';
import { ToolsModule } from './../../tools/tools.module';
import { MaterialModule } from './../../shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetsRoutingModule } from './widgets-routing.module';
import { WidgetsComponent } from './widgets.component';

@NgModule({
  declarations: [
    WidgetsComponent,
  ],
  imports: [
    CommonModule,
    WidgetsRoutingModule,
    ToolsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class WidgetsModule {}
