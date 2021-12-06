import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private httpClient: HttpClient) {}

  uploadFiles(formData: FormData): Observable<any> {
    const config = new HttpRequest(
      'POST',
      environment.API_URL + '/upload-gallery',
      formData,
      {
        reportProgress: true,
      }
    );

    return this.httpClient.request(config);
  }
}
