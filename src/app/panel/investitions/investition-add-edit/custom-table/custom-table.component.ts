import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CustomTableElement, CustomTableElementStateName} from '../../../../interfaces/investition.interface';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {ModalOrderCreatorService} from '../../../../services/modal/modal-order-creator.service';
import {OrderColsViewType} from '../../../../tools/elements-order/elements-order.component';
import {Subscription} from 'rxjs';
import {SimpleHelperService} from '../../../../services/simple-helper.service';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss']
})
export class CustomTableComponent implements OnInit, OnDestroy {
  @Input() customTable: CustomTableElement[] = [];
  @Output() emitClose: EventEmitter<void> = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onChange: EventEmitter<CustomTableElement[]> = new EventEmitter<CustomTableElement[]>();
  form: FormGroup;
  states: CustomTableElementStateName[] = [
    CustomTableElementStateName.rent,
    CustomTableElementStateName.free
  ];

  orderSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private modalOrderCreatorService: ModalOrderCreatorService,
    private simpleHelperService: SimpleHelperService
    ) { }

  ngOnInit(): void {
    this.makeForm();
  }

  makeForm(): void {
    this.form = this.fb.group({
      customTable: this.createArray()
    });
  }

  createArray(): FormArray {
    const array = this.fb.array([]);
    this.customTable.forEach(ct => {
      array.push(this.fb.group(
        {
          building: [ct.building],
          localName: [ct.localName],
          state: this.fb.group({
            stateName: [ct.state.stateName],
            firm: [ct.state.firm]
          }),
          area: [ct.area]
        }
      ));
    });
    return array;
  }

  addElement(): void {
    this.updateObjectFromForm();
    this.customTable.push({
      building: null,
      localName: '',
      area: '',
      state: {
        stateName: CustomTableElementStateName.free,
        firm: ''
      },
      infoAssets: {
        situaPlan: null,
        buildingLocation: null,
        plan: null
      }
    });
    this.makeForm();
  }

  addElementUnshift(): void {
    this.updateObjectFromForm();
    this.customTable.unshift({
      building: null,
      localName: '',
      area: '',
      state: {
        stateName: CustomTableElementStateName.free,
        firm: ''
      },
      infoAssets: {
        situaPlan: null,
        buildingLocation: null,
        plan: null
      }
    });
    this.makeForm();
  }

  remove(index: number): void {
    this.customTable.splice(index, 1);
    this.makeForm();
  }

  changeOrder(): void {
   this.orderSubscription = this.modalOrderCreatorService.createModal({
      nameKey: 'localName',
      customKey: 'building',
      columns: '1',
      data: this.simpleHelperService.objectNewInstance(this.customTable)
    }).subscribe(data => {
      this.customTable = data.data;
      this.makeForm();
      this.onChange.emit(this.customTable);
    });
  }

  save(): void {
    this.updateObjectFromForm();
    this.onChange.emit(this.customTable);
  }

  updateObjectFromForm(): void {
    this.customTable = this.customTable.map((el, i) => {
      return {...this.customTable[i], ...this.form.get('customTable').value[i]};
    });
  }

  closeEdit(): void {
    this.emitClose.emit();
  }

  ngOnDestroy(): void {
    if (this.orderSubscription) {
      this.orderSubscription.unsubscribe();
    }
  }

}
