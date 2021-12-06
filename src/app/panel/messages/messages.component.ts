import {Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SimpleHelperService} from '../../services/simple-helper.service';
import {ModalCreatorService} from '../../services/modal/modal-creator.service';
import {MessageService} from '../../services/message/message.service';
import {MessagesRefreshService} from '../../services/messages-refresh.service';
import {Message} from '../../interfaces/message.interface';
import {Department} from '../../interfaces/department.interface';
import {MessageEditAddComponent} from './message-edit-add/message-edit-add.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnDestroy {
  @ViewChild('temp', {read: ViewContainerRef}) temp: ViewContainerRef;
  editAddC: ComponentRef<MessageEditAddComponent>;
  messages: Message[];
  messageCloseSubscription: Subscription;
  refreshSubscription: Subscription;
  messageSubscription: Subscription;
  confirmDeleteSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cf: ComponentFactoryResolver,
    private simpleHelperService: SimpleHelperService,
    private modalCreatorService: ModalCreatorService,
    private messageService: MessageService,
    private messagesRefreshService: MessagesRefreshService
  ) {
  }

  ngOnInit(): void {
    this.messages = this.activatedRoute.snapshot.data.messages;
    this.refreshSubscription = this.messagesRefreshService.action$.subscribe(bool => {
      if (bool) {
        this.messageSubscription = this.messageService.all().subscribe(ms => {
          this.messages = ms;
        });
      }
    });
  }

  addNew(): void {
    const message: Message = this.messageService.empty();
    this.openEdit(message, true);
  }

  onEditStart(message: Message): void {
    this.openEdit(message, false);
  }

  openEdit(message: Message, isNew: boolean = false): void {
    this.temp.clear();
    const edit = this.cf.resolveComponentFactory(MessageEditAddComponent as Type<MessageEditAddComponent>);
    this.editAddC = this.temp.createComponent(edit);
    this.editAddC.instance.message = this.simpleHelperService.objectNewInstance(message);
    this.editAddC.instance.isNew = isNew;
    this.messageCloseSubscription = this.editAddC.instance.emitClose.subscribe(() => {
      this.editAddC.destroy();
    });
  }

  onDelete(message: Message): void {
    this.confirmDeleteSubscription = this.modalCreatorService.createModal(
      {
        message: 'Czy checesz usunąć dział?',
        data: message
      }
    ).subscribe(data => {
      if (data.isConfirm) {
        this.delete((data.data as Message).id);
      }
    });
  }

  delete(id: number): void {
    this.messageService.delete(id).toPromise().then(data => {
      this.messagesRefreshService.refresh();
    });
  }

  ngOnDestroy(): void {
    if (this.messageCloseSubscription) {
      this.messageCloseSubscription.unsubscribe();
    }
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
    if(this.confirmDeleteSubscription) {
      this.confirmDeleteSubscription.unsubscribe();
    }
  }


}
