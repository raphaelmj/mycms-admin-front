import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAssetsComponent } from './info-assets.component';

describe('InfoAssetsComponent', () => {
  let component: InfoAssetsComponent;
  let fixture: ComponentFixture<InfoAssetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoAssetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
