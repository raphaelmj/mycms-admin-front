import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts.component';
import { ContactsResolveService } from '../../services/contact/contacts-resolve.service';

const routes: Routes = [
  {path: '', component: ContactsComponent, resolve: {contacts: ContactsResolveService}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
