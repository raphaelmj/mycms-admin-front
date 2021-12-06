import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressGalleryViewComponent } from './progress-gallery-view.component';

describe('ProgressGalleryViewComponent', () => {
  let component: ProgressGalleryViewComponent;
  let fixture: ComponentFixture<ProgressGalleryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressGalleryViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressGalleryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
