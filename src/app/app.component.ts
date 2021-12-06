import {isLogIn} from './login/auth.selectors';
import {Observable} from 'rxjs';
import {login} from './login/auth.actions';
import {AuthState} from './login/reducers/index';
import {Store, select} from '@ngrx/store';
import {Component, OnInit, OnDestroy, ComponentFactoryResolver, ViewChild, ViewContainerRef} from '@angular/core';
import {AppAbstractComponent} from './core/abstract/app.abstract.component';
import {ModalCreatorService} from './services/modal/modal-creator.service';
import {ModalImageCreatorService} from './services/modal/modal-image-creator.service';
import {ModalEntitiesSelectCreatorService} from './services/modal/modal-entities-select-creator.service';
import {ModalOrderCreatorService} from './services/modal/modal-order-creator.service';
import {ModalUploadFilesCreatorService} from './services/modal/modal-upload-files-creator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends AppAbstractComponent implements OnInit, OnDestroy {
  @ViewChild('modalTemplate', {read: ViewContainerRef}) modalTemplate: ViewContainerRef;
  isLogin$: Observable<boolean>;

  constructor(
    private authStore: Store<AuthState>,
    public modalCreatorService: ModalCreatorService,
    public modalImageCreatorService: ModalImageCreatorService,
    public modalEntitiesSelectCreatorService: ModalEntitiesSelectCreatorService,
    public modalOrderCreatorService: ModalOrderCreatorService,
    protected modalUploadFilesCreator: ModalUploadFilesCreatorService,
    public componentFactoryResolver: ComponentFactoryResolver) {
    super(
      modalCreatorService,
      modalImageCreatorService,
      modalEntitiesSelectCreatorService,
      modalOrderCreatorService,
      modalUploadFilesCreator,
      componentFactoryResolver
    );
  }

  ngOnInit(): void {
    this.parentNgOnInit();
    const authUser = localStorage.getItem('authUser');
    const userJson = localStorage.getItem('user');
    if (authUser && userJson) {
      this.authStore.dispatch(
        login({
          authUser: JSON.parse(authUser),
          user: JSON.parse(userJson),
        })
      );
    }
    this.isLogin$ = this.authStore.pipe(select(isLogIn));
  }

  ngOnDestroy(): void {
  }
}
