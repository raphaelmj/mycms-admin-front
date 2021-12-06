import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSlidesComponent } from './page-slides.component';

describe('PageSlidesComponent', () => {
  let component: PageSlidesComponent;
  let fixture: ComponentFixture<PageSlidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageSlidesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSlidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
