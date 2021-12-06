import {Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SimpleHelperService} from '../../services/simple-helper.service';
import {OfficeService} from '../../services/office/office.service';
import {Office} from '../../interfaces/office.interface';
import {Subscription} from 'rxjs';
import {OfficesRefreshService} from '../../services/offices-refresh.service';
import {OfficeAddEditComponent} from './office-add-edit/office-add-edit.component';
import {ModalCreatorService} from '../../services/modal/modal-creator.service';

@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.css']
})
export class OfficesComponent implements OnInit, OnDestroy {
  @ViewChild('temp', {read: ViewContainerRef}) temp: ViewContainerRef;
  editAddC: ComponentRef<OfficeAddEditComponent>;
  offices: Office[];
  refreshSubscription: Subscription;
  officesSubscription: Subscription;
  officeCloseSubscription: Subscription;
  confirmDeleteSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private officeService: OfficeService,
    private cf: ComponentFactoryResolver,
    private simpleHelperService: SimpleHelperService,
    private officesRefreshService: OfficesRefreshService,
    private modalCreatorService: ModalCreatorService
  ) {
  }

  ngOnInit(): void {
    this.offices = this.activatedRoute.snapshot.data.offices;
    this.refreshSubscription = this.officesRefreshService.action$.subscribe(bool => {
      if (bool) {
        this.officesSubscription = this.officeService.all().subscribe(ofs => {
          this.offices = ofs;
        });
      }
    });
  }

  addNew(): void {
    const office: Office = this.officeService.empty();
    this.openEdit(office, true);
  }

  onEditStart(office: Office): void {
    this.openEdit(office, false);
  }

  openEdit(office: Office, isNew: boolean = false): void {
    this.temp.clear();
    const edit = this.cf.resolveComponentFactory(OfficeAddEditComponent as Type<OfficeAddEditComponent>);
    this.editAddC = this.temp.createComponent(edit);
    this.editAddC.instance.office = this.simpleHelperService.objectNewInstance(office);
    this.editAddC.instance.isNew = isNew;
    this.officeCloseSubscription = this.editAddC.instance.emitClose.subscribe(() => {
      this.editAddC.destroy();
    });
  }

  onDelete(office: Office): void {
    this.confirmDeleteSubscription = this.modalCreatorService.createModal(
      {
        message: 'Czy checesz usunąć biuro?',
        data: office
      }
    ).subscribe(data => {
      if (data.isConfirm) {
        this.delete((data.data as Office).id);
      }
    });
  }

  delete(id: number): void {
    this.officeService.delete(id).toPromise().then(() => {
      this.officesRefreshService.refresh();
    });
  }

  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
    if (this.officesSubscription) {
      this.officesSubscription.unsubscribe();
    }
    if (this.officeCloseSubscription) {
      this.officeCloseSubscription.unsubscribe();
    }
    if (this.confirmDeleteSubscription) {
      this.confirmDeleteSubscription.unsubscribe();
    }
  }

}
