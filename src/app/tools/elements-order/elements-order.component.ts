import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {environment} from '../../../environments/environment';
import {DOCUMENT} from '@angular/common';
import { Sortable } from 'sortablejs';

export type OrderColsViewType = '1' | '2' | '3' | '4';

@Component({
  selector: 'app-elements-order',
  templateUrl: './elements-order.component.html',
  styleUrls: ['./elements-order.component.scss']
})
export class ElementsOrderComponent implements OnInit {
  private readonly classes: Map<OrderColsViewType, string> = new Map<OrderColsViewType, string>([
    ['1', 'col-md-12'],
    ['2', 'col-md-6'],
    ['3', 'col-md-4'],
    ['4', 'col-md-3']
  ]);
  @Input() elements: Array<any>;
  @Input() header: string;
  @Input() nameKey: string;
  @Input() customKey?: string;
  @Input() hasImage?: boolean = false;
  @Input() imagePathKey?: string;
  @Input() columns?: OrderColsViewType = '1';
  @Input() bundleData?: any;
  @Output() onChange: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();
  webUrl: string = environment.WEB_URL;
  sortable: Sortable;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.createSortable();
  }

  createSortable(): void {
    this.sortable = new Sortable(this.document.getElementById('sort'), {
      onEnd: (evt) => {
        const element = this.elements[evt.oldIndex];
        this.elements.splice(evt.oldIndex, 1);
        this.elements.splice(evt.newIndex, 0, element);
        this.onChange.emit(this.elements);
      }
    });
  }

  get columnsClasses(): string {
    return this.classes.get(this.columns);
  }

}
