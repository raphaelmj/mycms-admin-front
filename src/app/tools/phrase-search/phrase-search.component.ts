import { Subscription, pipe } from 'rxjs';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-phrase-search',
  templateUrl: './phrase-search.component.html',
  styleUrls: ['./phrase-search.component.scss'],
})
export class PhraseSearchComponent implements OnInit, OnChanges, OnDestroy {
  @Input() pharse: string;
  @Output() emitPhrase: EventEmitter<string> = new EventEmitter<string>();
  formP: FormGroup;
  subChange: Subscription;

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.phrase) {
      if (!changes.phrase.firstChange) {
        this.formP.setValue(
          { pharse: changes.phrase.currentValue },
          { emitEvent: false }
        );
      }
    }
  }

  ngOnInit(): void {
    this.formP = this.fb.group({
      phrase: [this.pharse],
    });
    this.changePhrase();
  }

  changePhrase() {
    this.subChange = this.formP
      .get('phrase')
      .valueChanges.pipe(distinctUntilChanged(), debounceTime(500))
      .subscribe((phr) => {
        this.emitPhrase.emit(phr);
      });
  }

  ngOnDestroy(): void {
    if (this.subChange) this.subChange.unsubscribe();
  }
}
