import {Injectable} from '@angular/core';
import {
  HttpClient, HttpRequest
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {UploadSimpleType} from './drop-files-simple.component';

@Injectable({
  providedIn: 'root'
})

export class UploadSimpleService {

  constructor(private httpClient: HttpClient) {
  }


  uploadFiles(formData: FormData, type: UploadSimpleType, folder: string): Observable<any> {

    const config = new HttpRequest('POST', environment.API_URL + '/upload-files/' + type + '/' + folder, formData, {
      reportProgress: true
    });

    return this.httpClient.request(config);
  }

}
