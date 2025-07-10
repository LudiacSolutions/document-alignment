import { Injectable } from '@angular/core';
import { AddMyValue, MyValues } from '../../feature/user-layout/my-values/my-value.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyValueService {

  // constructor(private http: HttpClient) { }

  // getAllMyValues(): Observable<MyValues> {
  //   return this.http.get<MyValues>(`api/MyValue/getAllMyValues`)
  // }

  // addMyValue(myValue: AddMyValue): Observable<MyValues> {
  //   return this.http.post<MyValues>(`api/MyValue/getAllMyValues`, myValue)
  // }

  // updateMyValue(myValue: AddMyValue): Observable<MyValues> {
  //   return this.http.post<MyValues>(`api/MyValue/UpdateMyValues`, myValue)
  // }

  // deleteMyValue(id: number): Observable<MyValues> {
  //   return this.http.delete<MyValues>(`api/MyValue/DeleteMyValues?id=${id}`)
  // }

}
