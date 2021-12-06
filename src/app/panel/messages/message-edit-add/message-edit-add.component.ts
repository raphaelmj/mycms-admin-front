import {Component, ComponentFactoryResolver, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Message} from '../../../interfaces/message.interface';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {SimpleHelperService} from '../../../services/simple-helper.service';
import {skipUntil, switchMap} from 'rxjs/operators';
import {Office} from '../../../interfaces/office.interface';
import {MessagesRefreshService} from '../../../services/messages-refresh.service';
import {MessageService} from '../../../services/message/message.service';

@Component({
  selector: 'app-message-edit-add',
  templateUrl: './message-edit-add.component.html',
  styleUrls: ['./message-edit-add.component.scss']
})
export class MessageEditAddComponent implements OnInit, OnDestroy {
  @Input() message: Message;
  @Input() isNew: boolean;
  @Output() emitClose: EventEmitter<any> = new EventEmitter();
  form: FormGroup;
  submit$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isSaving$: Observable<boolean> = of(false);
  ckConfig: string = environment.CK_EDITOR_CONFIG;
  touchUi = false;
  subSubmit: Subscription;

  constructor(
    private fb: FormBuilder,
    private cf: ComponentFactoryResolver,
    private simpleHelperService: SimpleHelperService,
    private messageService: MessageService,
    private messagesRefreshService: MessagesRefreshService
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.onSubmit();
  }

  createForm(): void {
    this.form = this.fb.group({
      name: [this.message.name, Validators.required],
      krs: [this.message.krs],
      nip: [this.message.nip],
      regon: [this.message.regon],
      court: [this.message.court],
      place: [this.message.place],
      capital: [this.message.capital],
      description: [this.message.description],
      createdAt: [this.message.createdAt],
      linkedInfo: this.makePagesArray()
    });
  }

  makePagesArray(): FormArray {
    const array: FormArray = this.fb.array([]);
    this.message.linkedInfo.forEach(linkinfo => {
      array.push(
        this.fb.group({
          name: [linkinfo.name],
          link: [linkinfo.link]
        })
      );
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
      .subscribe((v: Message | false) => {
        if (v) {
          this.message = v;
          this.isNew = false;
          this.messagesRefreshService.refresh();
        }
        this.isSaving$ = of(false);
      });
  }

  save(): Observable<Message> {
    const message: Message = {...this.message, ...this.form.value};
    if (this.isNew) {
      return this.messageService.create(message);
    } else {
      return this.messageService.update(message);
    }
  }

  closeEdit(): void {
    this.emitClose.emit();
  }

  ngOnDestroy(): void {
    if (this.subSubmit) {
      this.subSubmit.unsubscribe();
    }
  }

}
