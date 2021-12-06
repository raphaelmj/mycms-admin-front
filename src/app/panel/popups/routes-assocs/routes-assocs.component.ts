import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Page} from '../../../interfaces/page.interface';
import {Department} from '../../../interfaces/department.interface';
import {Variant} from '../../../interfaces/variant.interface';
import {Observable, of} from 'rxjs';
import {Popup} from '../../../interfaces/popup.interface';

export type PopupEntityType = 'page' | 'variant' | 'department' | 'investition';

@Component({
  selector: 'app-routes-assocs',
  templateUrl: './routes-assocs.component.html',
  styleUrls: ['./routes-assocs.component.css']
})
export class RoutesAssocsComponent implements OnInit, OnChanges {
  @Input() elements: Page[] | Department[] | Variant[];
  @Input() model: PopupEntityType;
  @Input() nameKey: string;
  @Input() customKey?: string;
  @Input() everyWherePopups?: Popup[] = [];
  elements$: Observable<Page[] | Department[] | Variant[]>;
  everyWherePopups$: Observable<Popup[]>;

  constructor() { }

  ngOnInit(): void {
    this.elements$ = of(this.elements);
    this.everyWherePopups$ = of(this.everyWherePopups);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.elements) {
      this.elements$ = of(changes.elements.currentValue);
    }
    if (changes.everyWherePopups) {
      this.everyWherePopups$ = of(changes.everyWherePopups.currentValue);
    }
  }

}
