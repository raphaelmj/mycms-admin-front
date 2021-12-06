import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEntitiesSelectComponent } from './modal-entities-select.component';

describe('ModalEntitiesSelectComponent', () => {
  let component: ModalEntitiesSelectComponent;
  let fixture: ComponentFixture<ModalEntitiesSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEntitiesSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEntitiesSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
