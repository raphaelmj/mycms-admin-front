import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNamePipe } from './page-name.pipe';
import { ModelNamePipe } from './model-name.pipe';
import { GalleryTypePipe } from './gallery-type.pipe';
import { DepartmentTypeNamePipe } from './department-type-name.pipe';



@NgModule({
  declarations: [
    PageNamePipe,
    ModelNamePipe,
    GalleryTypePipe,
    DepartmentTypeNamePipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PageNamePipe,
    ModelNamePipe,
    GalleryTypePipe,
    DepartmentTypeNamePipe,
  ]
})
export class PipesModule { }
