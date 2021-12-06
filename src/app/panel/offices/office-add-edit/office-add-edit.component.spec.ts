import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeAddEditComponent } from './office-add-edit.component';

describe('OfficeAddEditComponent', () => {
  let component: OfficeAddEditComponent;
  let fixture: ComponentFixture<OfficeAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
