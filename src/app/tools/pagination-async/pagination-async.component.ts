import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
} from '@angular/core';

export interface PagPage {
  nr: number;
  active: boolean;
}

@Component({
  selector: 'app-pagination-async',
  templateUrl: './pagination-async.component.html',
  styleUrls: ['./pagination-async.component.scss'],
})
export class PaginationAsyncComponent implements OnInit, OnChanges {
  @Input() data: { current: string | number; total: number };
  @Input() theme: 'dark' | 'light' = 'light';
  @Output() emitChange: EventEmitter<PagPage> = new EventEmitter<PagPage>();
  pages: number = 0;
  pagination: PagPage[];

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data) {
      this.countPages();
      this.createPaginationViewData();
    }
  }

  countPages() {
    if (this.data.total != 0) {
      this.pages = Math.ceil(this.data.total / environment.LIMIT);
    } else {
      this.pages = 1;
    }
  }

  createPaginationViewData() {
    var pgs = [];

    for (var i = 0; i < this.pages; i++) {
      var act = false;
      if (i + 1 == this.data.current) {
        act = true;
      }

      pgs.push({
        nr: i + 1,
        active: act,
      });
    }

    this.pagination = pgs;
  }

  changePag(event, p: PagPage) {
    event.preventDefault();
    this.emitChange.emit(p);
  }
}
