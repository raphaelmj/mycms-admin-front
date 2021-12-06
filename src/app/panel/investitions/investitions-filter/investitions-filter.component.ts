import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Variant} from '../../../interfaces/variant.interface';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-investitions-filter',
  templateUrl: './investitions-filter.component.html',
  styleUrls: ['./investitions-filter.component.css']
})
export class InvestitionsFilterComponent implements OnInit, OnChanges, OnDestroy {
  @Input() variants: Variant[];
  @Input() variantId: string;
  @Output() onChange: EventEmitter<string> = new EventEmitter();
  form: FormGroup;
  changeSubscrition: Subscription;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    const variantId: number = Number(this.variantId);
    this.form = this.fb.group({
      variant: [variantId]
    });
    this.changeSubscrition = this.form.get('variant').valueChanges.subscribe(value => {
      this.onChange.emit(String(value));
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.form) {
      const value: number = Number(changes.variantId.currentValue);
      this.form.get('variant').setValue(value);
    }
  }

  ngOnDestroy(): void {
    if (this.changeSubscrition) {
      this.changeSubscrition.unsubscribe();
    }
  }

}
