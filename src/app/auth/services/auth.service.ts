import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { CookieUtil } from '../../shared/utils/cookie.util';

export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

interface ServerResponse {
  token: string;
  message: string;
  Role: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  planUse = signal<boolean>(false);
  constructor(private http: HttpClient) {}

  signUpUser(signUpData: SignUpData): Observable<ServerResponse> {
    return this.http
      .post<ServerResponse>(
        `${environment.baseUrl}Accounts/register`,
        signUpData
      )
      .pipe(
        tap((response) => {
          this.setToken(response.token);
        })
      );
  }

  signInUser(signInData: SignInData): Observable<ServerResponse> {
    return this.http
      .post<ServerResponse>(`${environment.baseUrl}Accounts/login`, signInData)
      .pipe(
        tap((response) => {
          this.setToken(response.token);
        })
      );
  }

  setToken(token: string) {
    CookieUtil.setCookie('accessToken', token);
  }

  getToken(): string {
    return CookieUtil.getCookie('accessToken') || '';
  }

  decodeToken() {
    return this.decodeJwtPayload(this.getToken());
  }

  logout() {
    CookieUtil.deleteCookie('accessToken');
  }

  decodeJwtPayload(token: string) {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload);
      const parsed = JSON.parse(decoded);
      console.log(parsed);
      this.planUse.set(parsed?.Plan === 'pro');
      return parsed;
    } catch (e) {
      console.error('Invalid token', e);
      this.planUse.set(false);
      return null;
    }
  }
}
