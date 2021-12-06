import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl} from '@angular/forms';
import {ModalUploadFilesCreatorService} from '../../services/modal/modal-upload-files-creator.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-linked-info-creator',
  templateUrl: './linked-info-creator.component.html',
  styleUrls: ['./linked-info-creator.component.css']
})
export class LinkedInfoCreatorComponent implements OnInit, OnDestroy {
  @Input() formArray: FormArray;
  fileUploadSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private modalUploadFilesCreatorService: ModalUploadFilesCreatorService
  ) {
  }

  ngOnInit(): void {
  }

  add(): void {
    (this.formArray as FormArray).push(
      this.fb.group({
        name: [''],
        link: ['']
      })
    );
  }

  removeElement(index: number): void {
    (this.formArray as FormArray).removeAt(index);
  }

  attachFile(index: string): void {
    this.fileUploadSubscription = this.modalUploadFilesCreatorService.createModal({
      folder: 'messages',
      uploadType: 'one',
      bundleData: index
    }).subscribe((data) => {
      (this.formArray as FormArray).controls[data.bundleData].get('link').setValue(data.data);
    });
  }

  ngOnDestroy(): void {
    if (this.fileUploadSubscription) {
      this.fileUploadSubscription.unsubscribe();
    }
  }

}
