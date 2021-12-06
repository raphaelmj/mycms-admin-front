import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOrderChangeComponent } from './modal-order-change.component';

describe('ModalOrderChangeComponent', () => {
  let component: ModalOrderChangeComponent;
  let fixture: ComponentFixture<ModalOrderChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalOrderChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOrderChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
