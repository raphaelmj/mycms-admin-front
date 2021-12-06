import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesAssocsComponent } from './routes-assocs.component';

describe('RoutesAssocsComponent', () => {
  let component: RoutesAssocsComponent;
  let fixture: ComponentFixture<RoutesAssocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutesAssocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutesAssocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
