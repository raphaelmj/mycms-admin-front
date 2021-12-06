import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteAssocElementComponent } from './route-assoc-element.component';

describe('RouteAssocElementComponent', () => {
  let component: RouteAssocElementComponent;
  let fixture: ComponentFixture<RouteAssocElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteAssocElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteAssocElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
