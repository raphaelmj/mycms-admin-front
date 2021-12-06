import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageConfigComponent } from './page-config.component';

describe('PageConfigComponent', () => {
  let component: PageConfigComponent;
  let fixture: ComponentFixture<PageConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
