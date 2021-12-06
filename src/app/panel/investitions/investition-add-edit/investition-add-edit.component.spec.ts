import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestitionAddEditComponent } from './investition-add-edit.component';

describe('InvestitionAddEditComponent', () => {
  let component: InvestitionAddEditComponent;
  let fixture: ComponentFixture<InvestitionAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestitionAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestitionAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
