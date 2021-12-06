import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Contact} from '../../interfaces/contact.interface';
import {Observable} from 'rxjs';
import {ContactService} from './contact.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsResolveService implements Resolve<Contact[]>{

  constructor(private contactService: ContactService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Contact[]> {
    return this.contactService.all();
  }
}
