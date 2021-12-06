import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupElementComponent } from './popup-element.component';

describe('PopupElementComponent', () => {
  let component: PopupElementComponent;
  let fixture: ComponentFixture<PopupElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
