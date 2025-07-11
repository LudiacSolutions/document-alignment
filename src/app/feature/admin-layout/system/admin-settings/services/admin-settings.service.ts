import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../../../environments/environment";
import { Observable } from "rxjs";

export interface ServerResponse<T> {
    isError: boolean,
    message: string,
    code: number,
    data: [T],
    count: number
}

@Injectable({
  providedIn: 'root',
})
export class AdminSettingService {
    constructor(private http: HttpClient){}

    getGeneralSettings(): Observable<ServerResponse<any>>{
        return this.http.get<ServerResponse<any>>(`${environment.baseUrl}Settings/GetGeneralSettings`);
    }

    getSubscriptions(): Observable<ServerResponse<any>>{
        return this.http.get<ServerResponse<any>>(`${environment.baseUrl}Settings/GetSubscriptions`);
    }

    getFeatureLimit(): Observable<ServerResponse<any>>{
        return this.http.get<ServerResponse<any>>(`${environment.baseUrl}Settings/GetFeatureLimit`);
    }

    getEmailNotifications(): Observable<ServerResponse<any>>{
        return this.http.get<ServerResponse<any>>(`${environment.baseUrl}Settings/GetEmailNotifications`);
    }

    
}