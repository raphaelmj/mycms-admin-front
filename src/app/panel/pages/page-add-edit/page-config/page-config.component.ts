import { Component, OnInit } from '@angular/core';
import {ControlContainer, FormGroup} from '@angular/forms';
import {
  ArticlePresentationType,
  ContactPresentationType,
  DepartmentPresentationType,
  NoticesPresentationType
} from '../../../../interfaces/page.interface';
import {Contact} from '../../../../interfaces/contact.interface';
import {Department} from '../../../../interfaces/department.interface';

@Component({
  selector: '[formGroup] app-page-config,[formGroupName] app-page-config',
  templateUrl: './page-config.component.html',
  styleUrls: ['./page-config.component.css']
})
export class PageConfigComponent implements OnInit {
  public config: FormGroup;
  articlePresentTypes: Array<ArticlePresentationType> = [
    'default'
  ];

  contactPresentTypes: Array<ContactPresentationType> = [
    'default'
  ];

  departmentPresentTypes: Array<DepartmentPresentationType> = [
    'default'
  ];

  noticePresentTypes: Array<NoticesPresentationType> = [
    'default'
  ];

  columns: number[] = [1, 2, 3];

  constructor(private controlContainer: ControlContainer) { }

  ngOnInit(): void {
    this.config = (this.controlContainer.control as FormGroup);
  }

}
