import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapFilesUploaderComponent } from './map-files-uploader.component';

describe('MapFilesUploaderComponent', () => {
  let component: MapFilesUploaderComponent;
  let fixture: ComponentFixture<MapFilesUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapFilesUploaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapFilesUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
