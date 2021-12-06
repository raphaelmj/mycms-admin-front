import {Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Department} from '../../interfaces/department.interface';
import {DepartmentsRefreshService} from '../../services/departments-refresh.service';
import {Subscription} from 'rxjs';
import {DepartmentService} from '../../services/department/department.service';
import {DepartmentEditAddComponent} from './department-edit-add/department-edit-add.component';
import {SimpleHelperService} from '../../services/simple-helper.service';
import {ModalCreatorService} from '../../services/modal/modal-creator.service';
import {ModalOrderCreatorService} from '../../services/modal/modal-order-creator.service';
import {ElementsOrderData} from '../../tools/modal/modal-order-change/modal-order-change.component';
import {mergeMap} from 'rxjs/operators';
import {dataUrl} from 'angular-file/file-upload/fileTools';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit, OnDestroy {
  @ViewChild('temp', {read: ViewContainerRef}) temp: ViewContainerRef;
  editAddC: ComponentRef<DepartmentEditAddComponent>;
  departments: Department[];
  refreshSubscription: Subscription;
  departmentsSubscription: Subscription;
  departmentCloseSubscription: Subscription;
  confirmDeleteSubscription: Subscription;
  orderSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private departmentService: DepartmentService,
    private departmentsRefreshService: DepartmentsRefreshService,
    private cf: ComponentFactoryResolver,
    private simpleHelperService: SimpleHelperService,
    private modalCreatorService: ModalCreatorService,
    private modalOrderCreatorService: ModalOrderCreatorService
  ) {
  }

  ngOnInit(): void {
    this.departments = this.activatedRoute.snapshot.data.departments;
    this.refreshSubscription = this.departmentsRefreshService.action$.subscribe(bool => {
      if (bool) {
        this.departmentsSubscription = this.departmentService.all().subscribe(dps => {
          this.departments = dps;
        });
      }
    });
  }

  addNew(): void {
    const department: Department = this.departmentService.empty();
    this.openEdit(department, true);
  }

  onEditStart(deparment: Department): void {
    this.openEdit(deparment, false);
  }

  openEdit(department: Department, isNew: boolean = false): void {
    this.temp.clear();
    const edit = this.cf.resolveComponentFactory(DepartmentEditAddComponent as Type<DepartmentEditAddComponent>);
    this.editAddC = this.temp.createComponent(edit);
    this.editAddC.instance.department = this.simpleHelperService.objectNewInstance(department);
    this.editAddC.instance.isNew = isNew;
    this.departmentCloseSubscription = this.editAddC.instance.emitClose.subscribe(() => {
      this.editAddC.destroy();
    });
  }

  onDelete(department: Department): void {
    this.confirmDeleteSubscription = this.modalCreatorService.createModal(
      {
        message: 'Czy checesz usunąć dział?',
        data: department
      }
    ).subscribe(data => {
      if (data.isConfirm) {
        this.delete((data.data as Department).id);
      }
    });
  }

  delete(id: number): void {
    this.departmentService.delete(id).toPromise().then(() => {
      this.departmentsRefreshService.refresh();
    });
  }

  openSort(): void {
    this.orderSubscription = this.modalOrderCreatorService.createModal({
      nameKey: 'name',
      columns: '1',
      data: this.departments
    }).pipe(
        mergeMap(data => {
          const ids: number[] = data.data.map(d => d.id);
          return this.departmentService.changeOrder(ids);
        })
    ).subscribe((data: Department[]) => {
      this.departmentsRefreshService.refresh();
    });
  }

  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
    if (this.departmentsSubscription) {
      this.departmentsSubscription.unsubscribe();
    }
    if (this.departmentCloseSubscription) {
      this.departmentCloseSubscription.unsubscribe();
    }
    if (this.confirmDeleteSubscription) {
      this.confirmDeleteSubscription.unsubscribe();
    }
    if (this.orderSubscription) {
      this.orderSubscription.unsubscribe();
    }
  }

}
