import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestitionElementComponent } from './investition-element.component';

describe('InvestitionElementComponent', () => {
  let component: InvestitionElementComponent;
  let fixture: ComponentFixture<InvestitionElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestitionElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestitionElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
