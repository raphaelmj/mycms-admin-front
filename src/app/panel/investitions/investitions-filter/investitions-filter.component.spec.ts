import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestitionsFilterComponent } from './investitions-filter.component';

describe('InvestitionsFilterComponent', () => {
  let component: InvestitionsFilterComponent;
  let fixture: ComponentFixture<InvestitionsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestitionsFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestitionsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
