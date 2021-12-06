import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Department} from '../../../interfaces/department.interface';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {concatMap, skipWhile} from 'rxjs/operators';
import {DepartmentService} from '../../../services/department/department.service';
import {DepartmentsRefreshService} from '../../../services/departments-refresh.service';

@Component({
  selector: 'app-department-element',
  templateUrl: './department-element.component.html',
  styleUrls: ['./department-element.component.css']
})
export class DepartmentElementComponent implements OnInit, OnDestroy {
  @Input() department: Department;
  @Output() onEditStart: EventEmitter<Department> = new EventEmitter<Department>();
  @Output() onDelete: EventEmitter<Department> = new EventEmitter<Department>();
  form: FormGroup;
  mainChangeSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private departmentsRefreshService: DepartmentsRefreshService,

  ) { }

  ngOnInit(): void {
    this.createForm();
    this.onMainChange();
  }

  createForm(): void {
    this.form = this.fb.group({
      main: [this.department.main]
    });
  }

  get mainColor(): string {
    return this.form.get('main').value ? 'primary' : 'basic';
  }

  setMainForm(): void {
    this.form.get('main').setValue(true);
  }

  openEdit(): void {
    this.onEditStart.emit(this.department);
  }

  delete(): void {
    this.onDelete.emit(this.department);
  }

  onMainChange(): void {
    this.mainChangeSubscription = this.form.get('main').valueChanges
      .pipe(
        skipWhile(bool => !bool),
        concatMap(() => this.departmentService.setMain(this.department.id))
      )
      .subscribe(() => {
        this.departmentsRefreshService.refresh();
      });
  }

  ngOnDestroy(): void {
    if(this.mainChangeSubscription) {
      this.mainChangeSubscription.unsubscribe();
    }
  }

}
