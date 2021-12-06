import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, AuthUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = environment.API_URL;

  constructor(private httpClient: HttpClient) {}

  login(
    email: string,
    password: string
  ): Observable<{ success: boolean; authUser: AuthUser; user: User }> {
    return this.httpClient.post<{
      success: boolean;
      authUser: AuthUser;
      user: User;
    }>(this.apiUrl + '/auth/login', {
      email,
      password,
    });
  }

  isAuth(): Promise<{ auth: boolean; user?: AuthUser }> {
    return this.httpClient
      .get<{ auth: boolean; user?: AuthUser }>(this.apiUrl + '/auth/check')
      .toPromise();
  }

  clearCookie(): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + '/auth/logout', {});
  }
}
