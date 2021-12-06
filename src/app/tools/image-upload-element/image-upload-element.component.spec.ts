import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUploadElementComponent } from './image-upload-element.component';

describe('ImageUploadElementComponent', () => {
  let component: ImageUploadElementComponent;
  let fixture: ComponentFixture<ImageUploadElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageUploadElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageUploadElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
