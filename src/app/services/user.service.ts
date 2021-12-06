import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  all(pharse?: string): Observable<User[]> {
    let params = new HttpParams();
    if (pharse) {
      params = params.set('pharse', pharse);
    }
    return this.httpClient.get<User[]>(environment.API_URL + '/user/all', {
      params,
    });
  }

  getAuthUser(): Observable<User> {
    return this.httpClient.get<User>(environment.API_URL + '/user/auth/get');
  }

  checkIsUserNickExcept(id: number, nick: string): Observable<boolean> {
    return this.httpClient.post<boolean>(
      environment.API_URL + '/user/is/nick/free/except',
      { id, nick }
    );
  }

  checkIsUserEmailExcept(id: number, email: string): Observable<boolean> {
    return this.httpClient.post<boolean>(
      environment.API_URL + '/user/is/email/free/except',
      { id, email }
    );
  }

  updateUser(user: User, croppedImage: string): Observable<User> {
    return this.httpClient.post<User>(environment.API_URL + '/user/update', {
      user,
      croppedImage,
    });
  }
}
