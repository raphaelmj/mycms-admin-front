import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Contact} from '../../interfaces/contact.interface';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient) { }

  all(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(environment.API_URL + '/contact/all');
  }

  getById(id: number): Observable<Contact> {
    return this.httpClient.get<Contact>(environment.API_URL + '/contact/one/' + id);
  }

  update(contact: Contact): Observable<Contact> {
    return this.httpClient.post<Contact>(environment.API_URL + '/contact/update', contact);
  }

  create(contact: Contact): Observable<Contact> {
    return this.httpClient.post<Contact>(environment.API_URL + '/contact/create', contact);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(environment.API_URL + '/contact/delete/' + id);
  }

  empty(): Contact {
    return {
      name: '',
      position: '',
      email: '',
      phones: [],
      description: '',
      showForm: false,
      status: false,
      variants: [],
      pages: []
    };
  }

}
