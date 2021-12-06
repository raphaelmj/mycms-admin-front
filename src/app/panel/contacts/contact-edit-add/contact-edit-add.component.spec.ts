import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactEditAddComponent } from './contact-edit-add.component';

describe('ContactEditAddComponent', () => {
  let component: ContactEditAddComponent;
  let fixture: ComponentFixture<ContactEditAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactEditAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactEditAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
