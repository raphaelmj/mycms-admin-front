import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Office} from '../../../interfaces/office.interface';
import {FormBuilder, FormGroup} from '@angular/forms';
import {concatMap, skipWhile} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {OfficeService} from '../../../services/office/office.service';
import {OfficesRefreshService} from '../../../services/offices-refresh.service';

@Component({
  selector: 'app-office-row',
  templateUrl: './office-row.component.html',
  styleUrls: ['./office-row.component.css']
})
export class OfficeRowComponent implements OnInit {
  @Input() office: Office;
  @Output() onEditStart: EventEmitter<Office> = new EventEmitter<Office>();
  @Output() onDelete: EventEmitter<Office> = new EventEmitter<Office>();
  form: FormGroup;
  mainChangeSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private officeService: OfficeService,
    private officesRefreshService: OfficesRefreshService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.onMainChange();
  }

  createForm(): void {
    this.form = this.fb.group({
      main: [this.office.main]
    });
  }

  get mainColor(): string {
    return this.form.get('main').value ? 'primary' : 'basic';
  }

  setMainForm(): void {
    this.form.get('main').setValue(true);
  }

  onMainChange(): void {
    this.mainChangeSubscription = this.form.get('main').valueChanges
      .pipe(
        skipWhile(bool => !bool),
        concatMap(() => this.officeService.setMain(this.office.id))
      )
      .subscribe(() => {
        this.officesRefreshService.refresh();
      });
  }

  delete(): void {
    this.onDelete.emit(this.office);
  }


  openEdit(): void {
    this.onEditStart.emit(this.office);
  }

}
