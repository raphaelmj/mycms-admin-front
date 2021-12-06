import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressGalleryComponent } from './progress-gallery.component';

describe('ProgressGalleryComponent', () => {
  let component: ProgressGalleryComponent;
  let fixture: ComponentFixture<ProgressGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
