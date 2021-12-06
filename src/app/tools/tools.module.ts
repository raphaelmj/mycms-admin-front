import {ConfirmWindowComponent} from './confirm-window/confirm-window.component';
import {DropFilesComponent} from './drop-files/drop-files.component';
import {DropImageComponent} from './drop-image/drop-image.component';
import {HammerModule} from '@angular/platform-browser';
import {DndDirective} from './../directives/dnd.directive';
import {RouterModule} from '@angular/router';
import {NavMenuComponent} from './nav-menu/nav-menu.component';
import {MaterialModule} from './../shared/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PaginationAsyncComponent} from './pagination-async/pagination-async.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImageCropperModule} from 'ngx-image-cropper';
import {ImageUploadElementComponent} from './image-upload-element/image-upload-element.component';
import {LoadingProgressComponent} from './loading-progress/loading-progress.component';
import {PhraseSearchComponent} from './phrase-search/phrase-search.component';
import {NgxFileDropModule} from 'ngx-file-drop';
import {SelectEntitiesComponent} from './select-entities/select-entities.component';
import {PipesModule} from '../pipes/pipes.module';
import {SlidesCreatorComponent} from './slides-creator/slides-creator.component';
import {ImageCropperModalComponent} from './modal/image-cropper/image-cropper-modal.component';
import {ElementsOrderComponent} from './elements-order/elements-order.component';
import {YoutubeAddComponent} from './youtube-add/youtube-add.component';
import {ModalEntitiesSelectComponent} from './modal-entities-select/modal-entities-select.component';
import {ModalOrderChangeComponent} from './modal/modal-order-change/modal-order-change.component';
import {ConfirmModalComponentModule} from './modal/confirm-modal/confirm-modal.component';
import {ContactGroupsComponent} from './contact-groups/contact-groups.component';
import {ContactPersonComponent} from './contact-groups/contact-person/contact-person.component';
import {StringsFormArrayComponent} from './strings-form-array/strings-form-array.component';
import {MapFilesUploaderComponent} from './map-files-uploader/map-files-uploader.component';
import {LinkedInfoCreatorComponent} from './linked-info-creator/linked-info-creator.component';
import {ngfModule} from 'angular-file';
import {DropFilesSimpleComponent} from './drop-files-simple/drop-files-simple.component';
import {UploadFilesModalComponent} from './modal/upload-files-modal/upload-files-modal.component';

@NgModule({
  declarations: [
    PaginationAsyncComponent,
    NavMenuComponent,
    ImageUploadElementComponent,
    DndDirective,
    LoadingProgressComponent,
    PhraseSearchComponent,
    DropImageComponent,
    DropFilesComponent,
    ConfirmWindowComponent,
    SelectEntitiesComponent,
    SlidesCreatorComponent,
    ImageCropperModalComponent,
    ElementsOrderComponent,
    YoutubeAddComponent,
    ModalEntitiesSelectComponent,
    ModalOrderChangeComponent,
    ContactGroupsComponent,
    ContactPersonComponent,
    StringsFormArrayComponent,
    MapFilesUploaderComponent,
    LinkedInfoCreatorComponent,
    DropFilesSimpleComponent,
    UploadFilesModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    ImageCropperModule,
    HammerModule,
    NgxFileDropModule,
    PipesModule,
    ConfirmModalComponentModule,
    ngfModule
  ],
  exports: [
    PaginationAsyncComponent,
    NavMenuComponent,
    ImageUploadElementComponent,
    LoadingProgressComponent,
    PhraseSearchComponent,
    DropImageComponent,
    DropFilesComponent,
    ConfirmWindowComponent,
    SelectEntitiesComponent,
    SlidesCreatorComponent,
    ImageCropperModalComponent,
    ElementsOrderComponent,
    YoutubeAddComponent,
    ModalEntitiesSelectComponent,
    ModalOrderChangeComponent,
    ContactGroupsComponent,
    ContactPersonComponent,
    StringsFormArrayComponent,
    MapFilesUploaderComponent,
    LinkedInfoCreatorComponent,
    DropFilesSimpleComponent,
    UploadFilesModalComponent
  ],
  providers: [],
})
export class ToolsModule {
}
