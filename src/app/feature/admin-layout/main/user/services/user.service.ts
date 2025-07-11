import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interface/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { ServerResponse } from '../../../../../shared/interfaces/server-response.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  getAllUsers() : Observable<User[]>{
    return this.http.get<User[]>(`${environment.baseUrl}Users`);
  }

  getUserById(userId : string): Observable<User>{
    return this.http.get<User>(`${environment.baseUrl}Users/${userId}`);
  }

  updateUser(user : User): Observable<any>{
    return this.http.post(`${environment.baseUrl}Users/UpdateUser`, user);
  }
}
