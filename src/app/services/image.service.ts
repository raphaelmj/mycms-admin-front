import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ImageElement} from '../interfaces/image-element.interface';
import {environment} from '../../environments/environment';
import {ImageFormat} from '../interfaces/types/image-format';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient) { }

  uploadCropped(croppedImage: string, imageFormat: ImageFormat, folder: string = 'cropped'): Observable<ImageElement> {
    return this.httpClient.post<ImageElement>(environment.API_URL + '/media/image/cropped', {croppedImage, imageFormat, folder});
  }

}
