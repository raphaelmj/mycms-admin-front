import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupEditAddComponent } from './popup-edit-add.component';

describe('PopupEditAddComponent', () => {
  let component: PopupEditAddComponent;
  let fixture: ComponentFixture<PopupEditAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupEditAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupEditAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
