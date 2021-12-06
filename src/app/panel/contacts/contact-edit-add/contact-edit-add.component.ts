import {Component, ComponentFactoryResolver, ComponentRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {Contact} from '../../../interfaces/contact.interface';
import {SimpleHelperService} from '../../../services/simple-helper.service';
import {ContactService} from '../../../services/contact/contact.service';
import {skipUntil, switchMap} from 'rxjs/operators';
import {Variant} from '../../../interfaces/variant.interface';
import {Page} from '../../../interfaces/page.interface';
import {environment} from '../../../../environments/environment';
import {ContactsRefreshService} from '../../../services/contacts-refresh.service';

@Component({
  selector: 'app-contact-edit-add',
  templateUrl: './contact-edit-add.component.html',
  styleUrls: ['./contact-edit-add.component.scss']
})
export class ContactEditAddComponent implements OnInit {
  @Input() contact: Contact;
  @Input() isNew?: boolean = false;
  @Output() emitClose: EventEmitter<any> = new EventEmitter();
  form: FormGroup;
  submit$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isSaving$: Observable<boolean> = of(false);
  ckConfig: string = environment.CK_EDITOR_CONFIG;
  subSubmit: Subscription;

  constructor(
    private fb: FormBuilder,
    private cf: ComponentFactoryResolver,
    private simpleHelperService: SimpleHelperService,
    private contactService: ContactService,
    private contactsRefreshService: ContactsRefreshService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.onSubmit();
  }

  createForm(): void {
    this.form = this.fb.group({
      name: [this.contact.name, Validators.required],
      position: [this.contact.position],
      email: [this.contact.email, Validators.pattern(/^[0-9a-z_.-]+@[0-9a-z.-]+\.[a-z]{2,3}$/i)],
      phones: this.createStringsFormArray(this.contact.phones),
      description: [this.contact.description],
      showForm: [this.contact.showForm],
      status: [this.contact.status]
    });
  }

  createStringsFormArray(elements: string[]): FormArray {
    const array: FormArray = this.fb.array([]);
    elements.forEach(el => {
      array.push(new FormControl(el));
    });
    return array;
  }

  saveData(): void {
    this.submit$.next(true);
  }

  onSubmit(): void {
    this.subSubmit = this.submit$
      .pipe(
        skipUntil(this.isSaving$),
        switchMap((bool: boolean) => {
          if (bool && this.form.valid) {
            this.isSaving$ = of(true);
            return this.save();
          } else {
            return of(false);
          }
        })
      )
      .subscribe((v: Contact | false) => {
        if (v) {
          this.contact = v;
          this.isNew = false;
          this.contactsRefreshService.refresh();
        }
        this.isSaving$ = of(false);
      });
  }

  save(): Observable<Contact> {
    const contact: Contact = {...this.contact, ...this.form.value};
    const {variants, pages, ...rest} = contact;
    if (this.isNew) {
      return this.contactService.create(rest);
    } else {
      return this.contactService.update(rest);
    }
  }

  closeEdit(): void {
    this.emitClose.emit();
  }

}
