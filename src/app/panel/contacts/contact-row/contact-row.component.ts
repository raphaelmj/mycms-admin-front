import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Contact} from '../../../interfaces/contact.interface';

@Component({
  selector: 'app-contact-row',
  templateUrl: './contact-row.component.html',
  styleUrls: ['./contact-row.component.css']
})
export class ContactRowComponent implements OnInit {
  @Input() contact: Contact;
  @Output() onEditStart: EventEmitter<Contact> = new EventEmitter<Contact>();
  @Output() onDelete: EventEmitter<Contact> = new EventEmitter<Contact>();

  constructor() { }

  ngOnInit(): void {
  }

  openEdit(): void {
    this.onEditStart.emit(this.contact);
  }

  delete(): void {
    this.onDelete.emit(this.contact);
  }

}
