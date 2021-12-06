import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressGalleryElementComponent } from './progress-gallery-element.component';

describe('ProgressGalleryElementComponent', () => {
  let component: ProgressGalleryElementComponent;
  let fixture: ComponentFixture<ProgressGalleryElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressGalleryElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressGalleryElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
