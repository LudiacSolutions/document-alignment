import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { ServerResponse } from '../../../../shared/interfaces/server-response.interface';
import { AddMyValue, MyValues } from '../my-value.interface';

@Injectable({
  providedIn: 'root'
})
export class MyValueService {

  constructor(private http: HttpClient) { }

  getAllMyValues(): Observable<ServerResponse<MyValues>> {
    return this.http.get<ServerResponse<MyValues>>(`${environment.baseUrl}CoreValues/GetAllCoreValues`)
  }

  addMyValue(myValue: AddMyValue): Observable<ServerResponse<MyValues>> {
    return this.http.post<ServerResponse<MyValues>>(`${environment.baseUrl}CoreValues/AddCoreValue`, myValue)
  }

  updateMyValue(myValue: AddMyValue): Observable<ServerResponse<MyValues>> {
    return this.http.put<ServerResponse<MyValues>>(`${environment.baseUrl}CoreValues/UpdateCoreValue`, myValue)
  }

  deleteMyValue(id: string): Observable<ServerResponse<MyValues>> {
    return this.http.delete<ServerResponse<MyValues>>(`${environment.baseUrl}CoreValues/DeleteCoreValue/${id}`)
  }

}
