import {
  ComponentFactoryResolver,
  ComponentRef, Directive,
  OnDestroy,
  OnInit,
  Type,
  ViewContainerRef,
} from '@angular/core';
import {Subscription} from 'rxjs';
import {ConfirmConfig, ConfirmDataOut, ConfirmModalComponent} from '../../tools/modal/confirm-modal/confirm-modal.component';
import {ModalCreatorService} from '../../services/modal/modal-creator.service';
import {ModalImageCreatorService} from '../../services/modal/modal-image-creator.service';
import {
  ImageCropperConfig,
  ImageCropperData,
  ImageCropperModalComponent
} from '../../tools/modal/image-cropper/image-cropper-modal.component';
import {ModalEntitiesSelectCreatorService} from '../../services/modal/modal-entities-select-creator.service';
import {
  EntitiesSelectConfig,
  EntitiesSelectData,
  ModalEntitiesSelectComponent
} from '../../tools/modal-entities-select/modal-entities-select.component';
import {ModalOrderCreatorService} from '../../services/modal/modal-order-creator.service';
import {
  ElementsOrderConfig,
  ElementsOrderData,
  ModalOrderChangeComponent
} from '../../tools/modal/modal-order-change/modal-order-change.component';
import {ModalUploadFilesCreatorService} from '../../services/modal/modal-upload-files-creator.service';
import {
  UploadFilesConfig,
  UploadFilesData,
  UploadFilesModalComponent
} from '../../tools/modal/upload-files-modal/upload-files-modal.component';

@Directive()
export abstract class AppAbstractComponent implements OnInit, OnDestroy {
  abstract modalTemplate: ViewContainerRef;
  confirmModal: ComponentRef<ConfirmModalComponent>;
  imageCropperModal: ComponentRef<ImageCropperModalComponent>;
  entitiesSelectModal: ComponentRef<ModalEntitiesSelectComponent>;
  changeOrderModal: ComponentRef<ModalOrderChangeComponent>;
  uploadFilesModal: ComponentRef<UploadFilesModalComponent>;
  modalSubscrition: Subscription;
  closeSubscrition: Subscription;
  modalOutSubscrition: Subscription;
  modalImageSubscrition: Subscription;
  closeImageSubscrition: Subscription;
  modalImageOutSubscrition: Subscription;
  modalEntitiesSubscrition: Subscription;
  closeEntitiesSubscrition: Subscription;
  modalEntitiesOutSubscrition: Subscription;
  modalOrderSubscrition: Subscription;
  closeOrderSubscrition: Subscription;
  modalOrderOutSubscrition: Subscription;
  modalUploadFilesSubscrition: Subscription;
  closeUploadFilesSubscrition: Subscription;
  modalUploadFilesOutSubscrition: Subscription;

  constructor(
    protected modalCreatorService: ModalCreatorService,
    protected modalImageCreatorService: ModalImageCreatorService,
    protected modalEntitiesSelectCreatorService: ModalEntitiesSelectCreatorService,
    protected modalOrderCreatorService: ModalOrderCreatorService,
    protected modalUploadFilesCreatorService: ModalUploadFilesCreatorService,
    protected componentFactoryResolver: ComponentFactoryResolver
  ) {
  }

  ngOnInit(): void {
  }

  parentNgOnInit(): void {
    this.modalSubscrition = this.modalCreatorService.stream().subscribe((data: ConfirmConfig) => {
      if (this.modalTemplate && data) {
        this.modalTemplate.clear();
        const modal = this.componentFactoryResolver.resolveComponentFactory(ConfirmModalComponent as Type<ConfirmModalComponent>);

        this.confirmModal = this.modalTemplate.createComponent(modal);
        this.confirmModal.instance.config = data;
        this.closeSubscrition = this.confirmModal.instance.onClose.subscribe(() => {
          this.confirmModal.destroy();
        });
        this.modalOutSubscrition = this.confirmModal.instance.onChoose.subscribe((dataOut: ConfirmDataOut) => {
          this.modalCreatorService.finish(dataOut);
          this.confirmModal.destroy();
        });
      }
    });

    this.modalImageSubscrition = this.modalImageCreatorService.stream().subscribe((imageCropperConfig: ImageCropperConfig) => {
      if (this.modalTemplate) {

        this.modalTemplate.clear();
        const modal
          = this.componentFactoryResolver.resolveComponentFactory(ImageCropperModalComponent as Type<ImageCropperModalComponent>);
        this.imageCropperModal = this.modalTemplate.createComponent(modal);
        if (imageCropperConfig) {
          this.imageCropperModal.instance.config = imageCropperConfig;
        }
        this.closeImageSubscrition = this.imageCropperModal.instance.closeEmit.subscribe(() => {
          this.imageCropperModal.destroy();
        });
        this.modalImageOutSubscrition = this.imageCropperModal.instance.imageEmit.subscribe((data: ImageCropperData) => {
          this.imageCropperModal.destroy();
          this.modalImageCreatorService.finish(data);
        });
      }
    });

    this.modalEntitiesSubscrition = this.modalEntitiesSelectCreatorService.stream().subscribe((entitiesSelectConfig: EntitiesSelectConfig) => {
      if (this.modalTemplate) {

        this.modalTemplate.clear();
        const modal
          = this.componentFactoryResolver.resolveComponentFactory(ModalEntitiesSelectComponent as Type<ModalEntitiesSelectComponent>);
        this.entitiesSelectModal = this.modalTemplate.createComponent(modal);
        if (entitiesSelectConfig) {
          this.entitiesSelectModal.instance.config = entitiesSelectConfig;
        }
        this.closeEntitiesSubscrition = this.entitiesSelectModal.instance.emitClose.subscribe(() => {
          this.entitiesSelectModal.destroy();
        });
        this.modalEntitiesOutSubscrition = this.entitiesSelectModal.instance.onChange.subscribe((data: EntitiesSelectData) => {
          this.entitiesSelectModal.destroy();
          this.modalEntitiesSelectCreatorService.finish(data);
        });
      }
    });

    this.modalOrderSubscrition = this.modalOrderCreatorService.stream().subscribe((elementsOrderConfig: ElementsOrderConfig) => {
      if (this.modalTemplate) {
        this.modalTemplate.clear();
        const modal
          = this.componentFactoryResolver.resolveComponentFactory(ModalOrderChangeComponent as Type<ModalOrderChangeComponent>);
        this.changeOrderModal = this.modalTemplate.createComponent(modal);
        if (elementsOrderConfig) {
          this.changeOrderModal.instance.config = elementsOrderConfig;
        }
        this.closeOrderSubscrition = this.changeOrderModal.instance.emitClose.subscribe(() => {
          this.changeOrderModal.destroy();
        });
        this.modalOrderOutSubscrition = this.changeOrderModal.instance.onChange.subscribe((data: ElementsOrderData) => {
          this.changeOrderModal.destroy();
          this.modalOrderCreatorService.finish(data);
        });
      }
    });

    this.modalUploadFilesSubscrition = this.modalUploadFilesCreatorService.stream().subscribe((uploadFilesConfig: UploadFilesConfig) => {
      if (this.modalTemplate) {
        this.modalTemplate.clear();
        const modal
          = this.componentFactoryResolver.resolveComponentFactory(UploadFilesModalComponent as Type<UploadFilesModalComponent>);
        this.uploadFilesModal = this.modalTemplate.createComponent(modal);
        if (uploadFilesConfig) {
          this.uploadFilesModal.instance.config = uploadFilesConfig;
        }
        this.closeOrderSubscrition = this.uploadFilesModal.instance.emitClose.subscribe(() => {
          this.uploadFilesModal.destroy();
        });
        this.modalOrderOutSubscrition = this.uploadFilesModal.instance.onChange.subscribe((data: UploadFilesData) => {
          this.uploadFilesModal.destroy();
          this.modalUploadFilesCreatorService.finish(data);
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.modalSubscrition) {
      this.modalSubscrition.unsubscribe();
    }
    if (this.closeSubscrition) {
      this.closeSubscrition.unsubscribe();
    }
    if (this.modalOutSubscrition) {
      this.modalOutSubscrition.unsubscribe();
    }
    if (this.modalImageSubscrition) {
      this.modalImageSubscrition.unsubscribe();
    }
    if (this.closeImageSubscrition) {
      this.closeImageSubscrition.unsubscribe();
    }
    if (this.modalImageOutSubscrition) {
      this.modalImageOutSubscrition.unsubscribe();
    }
    if (this.modalEntitiesSubscrition) {
      this.modalEntitiesSubscrition.unsubscribe();
    }
    if (this.closeEntitiesSubscrition) {
      this.closeEntitiesSubscrition.unsubscribe();
    }
    if (this.modalEntitiesOutSubscrition) {
      this.modalEntitiesOutSubscrition.unsubscribe();
    }
    if (this.modalOrderSubscrition) {
      this.modalOrderSubscrition.unsubscribe();
    }
    if (this.closeOrderSubscrition) {
      this.closeOrderSubscrition.unsubscribe();
    }
    if (this.modalOrderOutSubscrition) {
      this.modalOrderOutSubscrition.unsubscribe();
    }
    if (this.modalUploadFilesSubscrition) {
      this.modalUploadFilesSubscrition.unsubscribe();
    }
    if (this.closeUploadFilesSubscrition) {
      this.closeUploadFilesSubscrition.unsubscribe();
    }
    if (this.modalUploadFilesOutSubscrition) {
      this.modalUploadFilesOutSubscrition.unsubscribe();
    }
  }
}
