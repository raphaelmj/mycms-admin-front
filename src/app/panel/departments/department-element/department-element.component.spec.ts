import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentElementComponent } from './department-element.component';

describe('DepartmentElementComponent', () => {
  let component: DepartmentElementComponent;
  let fixture: ComponentFixture<DepartmentElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
