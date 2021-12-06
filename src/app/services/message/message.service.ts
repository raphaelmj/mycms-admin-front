import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Message} from '../../interfaces/message.interface';
import {LinkedInfoElement} from '../../interfaces/linked-info-element.interface';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private httpClient: HttpClient) {
  }

  all(): Observable<Message[]> {
    return this.httpClient.get<Message[]>(environment.API_URL + '/message/all');
  }

  updateField(data: { id: number, field: string, value: any }): Observable<Message> {
    return this.httpClient.post<Message>(environment.API_URL + '/message/update/field', data);
  }

  update(message: Message): Observable<Message> {
    return this.httpClient.post<Message>(environment.API_URL + '/message/update', message);
  }

  create(message: Message): Observable<Message> {
    return this.httpClient.post<Message>(environment.API_URL + '/message/create', message);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(environment.API_URL + '/message/delete/' + id);
  }

  empty(): Message {
    return {
      name: '',
      krs: '',
      nip: '',
      regon: '',
      court: '',
      place: '',
      capital: '',
      description: '',
      linkedInfo: [],
      createdAt: moment().toISOString()
    }
  }

}
