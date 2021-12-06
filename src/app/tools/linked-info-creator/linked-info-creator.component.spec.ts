import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedInfoCreatorComponent } from './linked-info-creator.component';

describe('LinkedInfoCreatorComponent', () => {
  let component: LinkedInfoCreatorComponent;
  let fixture: ComponentFixture<LinkedInfoCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkedInfoCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkedInfoCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
