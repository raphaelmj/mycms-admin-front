import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrderColsViewType} from '../../elements-order/elements-order.component';
import {SimpleHelperService} from '../../../services/simple-helper.service';

export interface ElementsOrderConfig {
  imagePathKey?: string;
  nameKey?: string;
  customKey?: string;
  hasImage?: boolean;
  columns: OrderColsViewType;
  data: any[];
  bundleData?: any;
}

export interface ElementsOrderData {
  data: any[];
  bundleData?: any;
}

@Component({
  selector: 'app-modal-order-change',
  templateUrl: './modal-order-change.component.html',
  styleUrls: ['./modal-order-change.component.scss']
})
export class ModalOrderChangeComponent implements OnInit {
  @Input() config: ElementsOrderConfig;
  @Output() emitClose: EventEmitter<void> = new EventEmitter();
  @Output() onChange: EventEmitter<ElementsOrderData> = new EventEmitter<ElementsOrderData>();
  elements: any[] = [];
  elementsLocal: any[] = [];

  constructor(private simpleHelperService: SimpleHelperService) { }

  ngOnInit(): void {
    this.config.data = this.simpleHelperService.objectNewInstance(this.config.data);
    this.elements = this.simpleHelperService.objectNewInstance(this.config.data);
    this.elementsLocal = this.simpleHelperService.objectNewInstance(this.config.data);
  }

  changeEmit(elements: any[]): void {
    this.elementsLocal = elements;
  }

  save(): void {
    this.onChange.emit({data: this.elementsLocal, bundleData: this.config.bundleData});
  }

  closeEdit(): void {
    this.emitClose.emit();
  }

}
