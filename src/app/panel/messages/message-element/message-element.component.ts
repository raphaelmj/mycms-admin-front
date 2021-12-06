import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Message} from '../../../interfaces/message.interface';

@Component({
  selector: 'app-message-element',
  templateUrl: './message-element.component.html',
  styleUrls: ['./message-element.component.css']
})
export class MessageElementComponent implements OnInit {
  @Input() message: Message;
  @Output() onEditStart: EventEmitter<Message> = new EventEmitter<Message>();
  @Output() onDelete: EventEmitter<Message> = new EventEmitter<Message>();

  constructor() { }

  ngOnInit(): void {
  }

  openEdit(): void {
    this.onEditStart.emit(this.message);
  }

  delete(): void {
    this.onDelete.emit(this.message);
  }

}
