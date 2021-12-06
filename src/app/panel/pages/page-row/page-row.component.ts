import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Page} from '../../../interfaces/page.interface';

@Component({
  selector: 'app-page-row',
  templateUrl: './page-row.component.html',
  styleUrls: ['./page-row.component.scss']
})
export class PageRowComponent implements OnInit {
  @Input() page: Page;
  @Output() edit: EventEmitter<Page> = new EventEmitter<Page>();
  @Output() editSlides: EventEmitter<Page> = new EventEmitter<Page>();
  @Output() editVrOrder: EventEmitter<Page> = new EventEmitter<Page>();

  constructor() { }

  ngOnInit(): void {
  }

  startEdit(): void {
    this.edit.emit(this.page);
  }

  startEditSlides(): void {
    this.editSlides.emit(this.page);
  }

  changeVariantsOrder(): void {
    this.editVrOrder.emit(this.page);
  }

}
