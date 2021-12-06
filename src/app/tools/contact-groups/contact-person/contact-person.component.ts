import {AfterContentInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ContactService} from '../../../services/contact/contact.service';
import {Observable} from 'rxjs';
import {Contact} from '../../../interfaces/contact.interface';
import {ModalEntitiesSelectCreatorService} from '../../../services/modal/modal-entities-select-creator.service';
import {EntitiesSelectData} from '../../modal-entities-select/modal-entities-select.component';
import {PersonElement} from '../../../interfaces/person-element.interface';

@Component({
  selector: 'app-contact-person',
  templateUrl: './contact-person.component.html',
  styleUrls: ['./contact-person.component.css']
})
export class ContactPersonComponent implements OnInit, AfterContentInit {
  @Input() person: PersonElement;
  @Input() sectionIndex: number;
  @Input() personIndex: number;
  contact$: Observable<Contact>;
  @Output() onRemove: EventEmitter<{sectionIndex: number, personIndex: number}> = new EventEmitter<{sectionIndex: number, personIndex: number}>();

  constructor(
    private contactService: ContactService,
    private modalEntitiesSelectCreatorService: ModalEntitiesSelectCreatorService
  ) { }

  ngOnInit(): void {
    if (this.person.id) {
      this.contact$ = this.contactService.getById(this.person.id);
    }
  }

  ngAfterContentInit(): void {
  }

  changePerson(): void {
    this.modalEntitiesSelectCreatorService.createModal({
      outputFormat: 'one',
      model: 'contact',
      nameKey: 'name',
      entityIds: [],
      changeStrategy: 'manual'
    }).subscribe((data: EntitiesSelectData) => {
      this.person.id = (data.data as number);
      this.contact$ = this.contactService.getById(this.person.id);
    });
  }

  remove(): void {
    this.onRemove.emit({
      sectionIndex: this.sectionIndex,
      personIndex: this.personIndex
    });
  }

}
