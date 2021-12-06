import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EntityType} from '../../interfaces/types/entity-type';
import {ChangeStrategy, EntitiesOutputFormat} from '../select-entities/select-entities.component';

export interface EntitiesSelectConfig {
  outputFormat: EntitiesOutputFormat;
  model: EntityType;
  nameKey: string;
  customKey?: string;
  withImage?: boolean;
  entityIds: number[];
  changeStrategy: ChangeStrategy;
}

export interface EntitiesSelectData {
  outputFormat: EntitiesOutputFormat;
  data: number[] | number;
}

@Component({
  selector: 'app-modal-entities-select',
  templateUrl: './modal-entities-select.component.html',
  styleUrls: ['./modal-entities-select.component.scss']
})
export class ModalEntitiesSelectComponent implements OnInit {
  @Input() config: EntitiesSelectConfig;
  @Output() onChange: EventEmitter<EntitiesSelectData> = new EventEmitter<EntitiesSelectData>();
  @Output() emitClose: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onChangeData(data: number[] | number): void {
    if (this.config.changeStrategy === 'auto') {
      this.onChange.emit({
        outputFormat: this.config.outputFormat,
        data
      });
    }
  }

  onManualClick(data: number[] | number): void {
    if (this.config.changeStrategy === 'manual') {
      this.onChange.emit({
        outputFormat: this.config.outputFormat,
        data
      });
    }
  }

  closeEdit(): void {
    this.emitClose.emit();
  }

}
