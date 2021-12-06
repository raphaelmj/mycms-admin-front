import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Investition} from '../../../interfaces/investition.interface';
import {environment} from '../../../../environments/environment';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ModalCreatorService} from '../../../services/modal/modal-creator.service';
import {ConfirmDataOut} from '../../../tools/modal/confirm-modal/confirm-modal.component';
import {InvestitionService} from '../../../services/investition/investition.service';
import {InvestionsRefreshService} from '../../../services/investition/investions-refresh.service';

@Component({
  selector: 'app-investition-element',
  templateUrl: './investition-element.component.html',
  styleUrls: ['./investition-element.component.scss']
})
export class InvestitionElementComponent implements OnInit, OnDestroy {
  @Input() investition: Investition;
  @Output() onChangeStatus: EventEmitter<{id: number, status: boolean}> = new EventEmitter<{id: number, status: boolean}>();
  @Output() onEdit: EventEmitter<Investition> = new EventEmitter<Investition>();
  webUrl: string = environment.WEB_URL;
  form: FormGroup;
  changeSubscrition: Subscription;
  deleteSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private modalCreatorService: ModalCreatorService,
    private investitionService: InvestitionService,
    private investionsRefreshService: InvestionsRefreshService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      status: [this.investition.status]
    });
    this.changeSubscrition = this.form.get('status').valueChanges.subscribe(status => {
      this.investition.status = status;
      this.onChangeStatus.emit({id: this.investition.id, status});
    });
  }

  edit(): void {
    this.onEdit.emit(this.investition);
  }

  remove(): void {
    this.deleteSubscription = this.modalCreatorService.createModal({message: 'Czy usunąć inwestycję?'}).subscribe((data:ConfirmDataOut) => {
      if(data.isConfirm){
        this.investitionService.delete(this.investition.id).toPromise().then(() => {
          this.investionsRefreshService.refresh();
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.changeSubscrition) {
      this.changeSubscrition.unsubscribe();
    }
    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
  }

}
