import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardGalleryComponent } from './standard-gallery.component';

describe('StandardGalleryComponent', () => {
  let component: StandardGalleryComponent;
  let fixture: ComponentFixture<StandardGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandardGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
