import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ModalEntitiesSelectCreatorService} from '../../services/modal/modal-entities-select-creator.service';
import {EntitiesSelectData} from '../modal-entities-select/modal-entities-select.component';
import {ContactElement} from '../../interfaces/contact-element.interface';
import {PersonElement} from '../../interfaces/person-element.interface';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-contact-groups',
  templateUrl: './contact-groups.component.html',
  styleUrls: ['./contact-groups.component.scss']
})
export class ContactGroupsComponent implements OnInit, OnDestroy {
  @Input() contactElements: ContactElement[] = [];
  @Output() emitClose: EventEmitter<void> = new EventEmitter();
  @Output() onChange: EventEmitter<ContactElement[]> = new EventEmitter<ContactElement[]>();

  form: FormGroup;
  contactAddSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private modalEntitiesSelectCreatorService: ModalEntitiesSelectCreatorService
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      contacts: this.makeArray()
    });
  }

  makeArray(): FormArray {
    const array = this.fb.array([]);
    this.contactElements.forEach(c => {
      array.push(this.fb.group({
        name: [c.name],
        persons: this.makePersonArray(c.persons)
      }));
    });
    return array;
  }

  addSection(): void {
    (this.form.get('contacts') as FormArray).push(this.fb.group({
      name: [''],
      persons: this.makePersonArray([])
    }));
    this.contactElements.push({
      name: '',
      persons: []
    });
  }

  makePersonArray(ps: PersonElement[]): FormArray {
    const array = this.fb.array([]);
    ps.forEach(p => {
      array.push(this.fb.group({
        customRole: [p.customRole],
        showForm: [p.showForm],
        id: [p.id]
      }));
    });
    return array;
  }

  addPerson(i: number): void {
    this.modalEntitiesSelectCreatorService.createModal({
      outputFormat: 'one',
      model: 'contact',
      nameKey: 'name',
      entityIds: [],
      changeStrategy: 'manual'
    }).subscribe((data: EntitiesSelectData) => {
      (this.form.get('contacts')[`controls`][i].get('persons') as FormArray).push(
        this.fb.group({
          customRole: [],
          showForm:[false],
          id: [data.data]
        })
      );
      this.contactElements[i].persons.push({
        customRole: null,
        showForm: false,
        id: (data.data as number)
      });
    });
  }

  removePerson(indexes: {sectionIndex: number, personIndex: number}): void {
    this.form.get('contacts')[`controls`][indexes.sectionIndex].get('persons')[`controls`].splice(indexes.personIndex, 1);
    this.form.get('contacts')[`controls`][indexes.sectionIndex].get('persons')[`value`].splice(indexes.personIndex, 1);
    this.contactElements[indexes.sectionIndex].persons.splice(indexes.personIndex, 1);
  }

  removeSection(index: number): void {
    this.form.get('contacts')[`controls`].splice(index, 1);
    this.form.get('contacts')[`value`].splice(index, 1);
    this.contactElements.splice(index, 1);
  }

  save(): void {
    this.onChange.emit(this.form.get('contacts').value);
  }

  closeEdit(): void {
    this.emitClose.emit();
  }

  ngOnDestroy(): void {
    if (this.contactAddSubscription) {
      this.contactAddSubscription.unsubscribe();
    }
  }

}
