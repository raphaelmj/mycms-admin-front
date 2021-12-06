import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MessagesComponent} from './messages.component';
import {MessagesResolveService} from '../../services/message/messages-resolve.service';

const routes: Routes = [
  {path: '', component: MessagesComponent, resolve: {messages: MessagesResolveService}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagesRoutingModule {
}
