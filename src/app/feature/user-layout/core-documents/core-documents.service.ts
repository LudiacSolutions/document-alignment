import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoreDocumentsService {
  constructor(private http: HttpClient) {}
  getCoreDocuments() {
    return this.http.get('https://api.example.com/core-documents').pipe(
      map((response: any) => {
        let data = response;
        if (data && data.success) {
          return data.data;
        } else {
          throw new Error(data.message || 'Failed to fetch core documents');
        }
      })
    );
  }
  
}
