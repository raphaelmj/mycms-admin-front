import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementsOrderComponent } from './elements-order.component';

describe('ElementsOrderComponent', () => {
  let component: ElementsOrderComponent;
  let fixture: ComponentFixture<ElementsOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementsOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementsOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
