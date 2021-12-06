import {Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SimpleHelperService} from '../../services/simple-helper.service';
import {ContactService} from '../../services/contact/contact.service';
import {ContactsRefreshService} from '../../services/contacts-refresh.service';
import {Contact} from '../../interfaces/contact.interface';
import {ContactEditAddComponent} from './contact-edit-add/contact-edit-add.component';
import {Subscription} from 'rxjs';
import {ModalCreatorService} from '../../services/modal/modal-creator.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit, OnDestroy {
  @ViewChild('temp', {read: ViewContainerRef}) temp: ViewContainerRef;
  editAddC: ComponentRef<ContactEditAddComponent>;
  contacts: Contact[];
  contactCloseSubscription: Subscription;
  refreshSubscription: Subscription;
  contactSubscription: Subscription;
  confirmDeleteSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private contactService: ContactService,
    private cf: ComponentFactoryResolver,
    private simpleHelperService: SimpleHelperService,
    private contactsRefreshService: ContactsRefreshService,
    private modalCreatorService: ModalCreatorService
  ) {
  }

  ngOnInit(): void {
    this.contacts = this.activatedRoute.snapshot.data.contacts;
    this.refreshSubscription = this.contactsRefreshService.action$.subscribe(bool => {
      if (bool) {
        this.contactSubscription = this.contactService.all().subscribe(ctns => {
          this.contacts = ctns;
        });
      }
    });
  }

  addNew(): void {
    const contact: Contact = this.contactService.empty();
    this.openEdit(contact, true);
  }

  editStart(contact: Contact): void {
    this.openEdit(contact, false);
  }

  openEdit(contact: Contact, isNew: boolean = false): void {
    this.temp.clear();
    const edit = this.cf.resolveComponentFactory(ContactEditAddComponent as Type<ContactEditAddComponent>);
    this.editAddC = this.temp.createComponent(edit);
    this.editAddC.instance.contact = this.simpleHelperService.objectNewInstance(contact);
    this.editAddC.instance.isNew = isNew;
    this.contactCloseSubscription = this.editAddC.instance.emitClose.subscribe(() => {
      this.editAddC.destroy();
    });
  }

  onDelete(contact: Contact): void {
    this.confirmDeleteSubscription = this.modalCreatorService.createModal(
      {
        message: 'Czy checesz usunąć kontakt?',
        data: contact
      }
    ).subscribe(data => {
      if (data.isConfirm){
        this.delete((data.data as Contact).id) ;
      }
    });
  }

  delete(id: number): void {
    this.contactService.delete(id).toPromise().then(() => {
      this.contactsRefreshService.refresh();
    });
  }

  ngOnDestroy(): void {
    if (this.contactCloseSubscription) {
      this.contactCloseSubscription.unsubscribe();
    }
  }

}
