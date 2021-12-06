import { environment } from './../environments/environment';
import { ToolsModule } from './tools/tools.module';
import { reducers } from './reducers';
import { metaReducers } from './reducers';
import { LoginModule } from './login/login.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material.module';
import { AppTokenInterceptor } from './interceptors/app-token.interceptor';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import {FactoryProvider, InjectionToken, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ConfirmModalComponentModule} from './tools/modal/confirm-modal/confirm-modal.component';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // NoopAnimationsModule,
    AppRoutingModule,
    LoginModule,
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    HammerModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot(),
    StoreRouterConnectingModule.forRoot(),
    BrowserAnimationsModule,
    ToolsModule,
    LoginModule,
    ConfirmModalComponentModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppTokenInterceptor, multi: true },
    { provide: Window, useValue: window }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
