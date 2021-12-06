import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeamsPagesComponent } from './beams-pages.component';

describe('BeamsPagesComponent', () => {
  let component: BeamsPagesComponent;
  let fixture: ComponentFixture<BeamsPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeamsPagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeamsPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
