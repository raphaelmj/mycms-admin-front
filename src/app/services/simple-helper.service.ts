import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SimpleHelperService {

  objectNewInstance<T>(data): T {
    return JSON.parse(JSON.stringify(data)) as T;
  }

}
