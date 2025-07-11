import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { ServerResponse } from '../../../../../shared/interfaces/server-response.interface';
import { EmailNotification, FeatureLimitSetting, GeneralSetting, SubscriptionSetting } from '../interfaces/setting.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminSettingService {
  constructor(private http: HttpClient) {}

  getGeneralSettings(): Observable<ServerResponse<GeneralSetting>> {
    return this.http.get<ServerResponse<GeneralSetting>>(
      `${environment.baseUrl}Settings/GetGeneralSettings`
    );
  }

  getSubscriptions(): Observable<ServerResponse<SubscriptionSetting>> {
    return this.http.get<ServerResponse<SubscriptionSetting>>(
      `${environment.baseUrl}Settings/GetSubscriptions`
    );
  }

  getFeatureLimit(): Observable<ServerResponse<FeatureLimitSetting>> {
    return this.http.get<ServerResponse<FeatureLimitSetting>>(
      `${environment.baseUrl}Settings/GetFeatureLimit`
    );
  }

  getEmailNotifications(): Observable<ServerResponse<EmailNotification>> {
    return this.http.get<ServerResponse<EmailNotification>>(
      `${environment.baseUrl}Settings/GetEmailNotifications`
    );
  }
}
