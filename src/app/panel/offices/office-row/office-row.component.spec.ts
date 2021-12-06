import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeRowComponent } from './office-row.component';

describe('OfficeRowComponent', () => {
  let component: OfficeRowComponent;
  let fixture: ComponentFixture<OfficeRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
