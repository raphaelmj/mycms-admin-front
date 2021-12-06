import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Position} from '../../../interfaces/position.interface';
import {Observable, of} from 'rxjs';
import {PositionService} from '../../../services/positions/position.service';

@Component({
  selector: 'app-beams-pages',
  templateUrl: './beams-pages.component.html',
  styleUrls: ['./beams-pages.component.scss']
})
export class BeamsPagesComponent implements OnInit {
  @Input() positions: Position[];
  @Output() emitClose: EventEmitter<any> = new EventEmitter();
  isSaving$: Observable<boolean> = of(false);

  constructor(private positionService: PositionService) {
  }

  ngOnInit(): void {
  }

  startSave(position: Position): void {
    const index: number = this.positions.findIndex(p => p.id === position.id);
    this.isSaving$ = of(true);
    this.positionService.updateField({id: position.id, field: 'pages', value: this.positions[index].pages}).toPromise().then(() => {
      this.isSaving$ = of(false);
    });
  }

  setPages(ids: number[], position: Position): void {
    const index: number = this.positions.findIndex(p => p.id === position.id);
    this.positions[index].pages = ids;
  }

  closeEdit(): void {
    this.emitClose.emit();
  }

}
