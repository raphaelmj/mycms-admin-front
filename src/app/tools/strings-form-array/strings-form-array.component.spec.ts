import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StringsFormArrayComponent } from './strings-form-array.component';

describe('StringsFormArrayComponent', () => {
  let component: StringsFormArrayComponent;
  let fixture: ComponentFixture<StringsFormArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StringsFormArrayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StringsFormArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
