import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestitionListImageComponent } from './investition-list-image.component';

describe('InvestitionListImageComponent', () => {
  let component: InvestitionListImageComponent;
  let fixture: ComponentFixture<InvestitionListImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestitionListImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestitionListImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
