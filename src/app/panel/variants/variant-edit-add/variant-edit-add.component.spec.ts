import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantEditAddComponent } from './variant-edit-add.component';

describe('VariantEditAddComponent', () => {
  let component: VariantEditAddComponent;
  let fixture: ComponentFixture<VariantEditAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariantEditAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantEditAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
