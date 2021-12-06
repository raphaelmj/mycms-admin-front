import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhraseSearchComponent } from './phrase-search.component';

describe('PhraseSearchComponent', () => {
  let component: PhraseSearchComponent;
  let fixture: ComponentFixture<PhraseSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhraseSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhraseSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
