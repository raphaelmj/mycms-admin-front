import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutePopupElementComponent } from './route-popup-element.component';

describe('RoutePopupElementComponent', () => {
  let component: RoutePopupElementComponent;
  let fixture: ComponentFixture<RoutePopupElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutePopupElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutePopupElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
