import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { CookieUtil } from '../../shared/utils/cookie.util';
import { AuthServerResponse } from '../../shared/interfaces/server-response.interface';
import {
  ResetPasswordData,
  SignInData,
  SignUpData,
} from '../interface/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUpUser(signUpData: SignUpData): Observable<AuthServerResponse> {
    return this.http
      .post<AuthServerResponse>(
        `${environment.baseUrl}Accounts/register`,
        signUpData
      )
      .pipe(
        tap((response) => {
          this.setToken(response.token);
        })
      );
  }

  signInUser(signInData: SignInData): Observable<AuthServerResponse> {
    return this.http
      .post<AuthServerResponse>(
        `${environment.baseUrl}Accounts/login`,
        signInData
      )
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

  forgotPassword(email: string): Observable<AuthServerResponse> {
    return this.http.post<AuthServerResponse>(
      `${environment.baseUrl}Accounts/ForgetPassword`,
      JSON.stringify(email),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  resetPassword(resetPasswordData: ResetPasswordData) {
    return this.http.post(
      `${environment.baseUrl}Accounts/ResetPassword`,
      resetPasswordData
    );
  }

  decodeJwtPayload(token: string) {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload);
      return JSON.parse(decoded);
    } catch (e) {
      console.error('Invalid token', e);
      return null;
    }
  }
}
