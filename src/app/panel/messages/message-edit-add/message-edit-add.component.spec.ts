import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageEditAddComponent } from './message-edit-add.component';

describe('MessageEditAddComponent', () => {
  let component: MessageEditAddComponent;
  let fixture: ComponentFixture<MessageEditAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageEditAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageEditAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
