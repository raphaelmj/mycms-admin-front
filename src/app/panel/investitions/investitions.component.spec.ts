import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestitionsComponent } from './investitions.component';

describe('InvestitionsComponent', () => {
  let component: InvestitionsComponent;
  let fixture: ComponentFixture<InvestitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestitionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
