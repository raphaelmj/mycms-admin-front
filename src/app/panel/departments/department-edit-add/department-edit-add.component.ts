import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Department} from '../../../interfaces/department.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {DepartmentsRefreshService} from '../../../services/departments-refresh.service';
import {DepartmentType} from '../../../interfaces/enums/department-type.enum';
import {ContactGroupsComponent} from '../../../tools/contact-groups/contact-groups.component';
import {ContactElement} from '../../../interfaces/contact-element.interface';
import {SimpleHelperService} from '../../../services/simple-helper.service';
import {skipUntil, switchMap} from 'rxjs/operators';
import {DepartmentService} from '../../../services/department/department.service';

@Component({
  selector: 'app-department-edit-add',
  templateUrl: './department-edit-add.component.html',
  styleUrls: ['./department-edit-add.component.scss']
})
export class DepartmentEditAddComponent implements OnInit, OnDestroy {
  @ViewChild('tempEdit', { read: ViewContainerRef })
  tempEdit: ViewContainerRef;
  @Input() department: Department;
  @Input() isNew?: boolean = false;
  @Output() emitClose: EventEmitter<any> = new EventEmitter();
  contactGroupsC: ComponentRef<ContactGroupsComponent>;

  form: FormGroup;
  submit$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isSaving$: Observable<boolean> = of(false);
  viewTypes: DepartmentType[] = [
    DepartmentType.main,
    DepartmentType.investManagment,
    DepartmentType.commercial,
    DepartmentType.buyArea,
    DepartmentType.sellOfficeList,
    DepartmentType.contactsSections,
    DepartmentType.pressOffice
  ];

  contactGroupsCloseSubscrition: Subscription;
  contactGroupsChangeSubscrition: Subscription;
  subSubmit: Subscription;

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private departmentsRefreshService: DepartmentsRefreshService,
    private cf: ComponentFactoryResolver,
    private simpleHelperService: SimpleHelperService
  ) {
    this.isSaving$ = of(false);
  }

  ngOnInit(): void {
    this.createForm();
    this.onSubmit();
  }

  createForm(): void {
    this.form = this.fb.group({
      name: [this.department.name, Validators.required],
      viewType: [this.department.viewType],
      showOnPage: [this.department.showOnPage],
      metaTitle: [this.department.metaTitle],
      metaKeywords: [this.department.metaKeywords],
      metaDescription: [this.department.metaDescription],
    });
  }

  setOffices(ids: number[]): void {
    this.department.officesMap = ids;
  }

  contactsEdit(): void {
    this.tempEdit.clear();
    const cg = this.cf.resolveComponentFactory(ContactGroupsComponent as Type<ContactGroupsComponent>);
    this.contactGroupsC = this.tempEdit.createComponent(cg);
    this.contactGroupsC.instance.contactElements = this.simpleHelperService.objectNewInstance<ContactElement[]>(this.department.contactsSections);
    this.contactGroupsCloseSubscrition = this.contactGroupsC.instance.emitClose.subscribe(() => {
      this.contactGroupsC.destroy();
    });
    this.contactGroupsChangeSubscrition = this.contactGroupsC.instance.onChange.subscribe(data => {
      this.department.contactsSections = data;
      this.contactGroupsC.destroy();
    });
  }

  saveData(): void {
    this.submit$.next(true);
  }

  onSubmit(): void {
    this.subSubmit = this.submit$
      .pipe(
        skipUntil(this.isSaving$),
        switchMap((bool: boolean) => {
          if (bool && this.form.valid) {
            this.isSaving$ = of(true);
            return this.save();
          } else {
            return of(false);
          }
        })
      )
      .subscribe((v: Department | false) => {
        if (v) {
          this.department = v;
          this.isNew = false;
          this.departmentsRefreshService.refresh();
        }
        this.isSaving$ = of(false);
      });
  }

  save(): Observable<Department> {
    const department: Department = {...this.department, ...this.form.value};
    const {offices, popups, ...rest} = department;
    if (this.isNew) {
      return this.departmentService.create(rest as Department);
    }else {
      return this.departmentService.update(rest as Department);
    }
  }

  closeEdit(): void {
    this.emitClose.emit();
  }

  ngOnDestroy(): void {
    if (this.contactGroupsCloseSubscrition) {
      this.contactGroupsCloseSubscrition.unsubscribe();
    }
    if (this.contactGroupsChangeSubscrition) {
      this.contactGroupsChangeSubscrition.unsubscribe();
    }
    if (this.subSubmit) {
      this.subSubmit.unsubscribe();
    }
  }
}
