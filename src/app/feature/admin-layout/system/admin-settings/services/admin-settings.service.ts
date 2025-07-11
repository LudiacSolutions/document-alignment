import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { ServerResponse } from '../../../../../shared/interfaces/server-response.interface';
import { AddGeneralSetting, EmailNotification, FeatureLimitSetting, GeneralSetting, SubscriptionSetting } from '../interfaces/setting.interface';

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

  addGeneralSettings(generalSetting : AddGeneralSetting): Observable<ServerResponse<GeneralSetting>> {
    return this.http.post<ServerResponse<GeneralSetting>>(
      `${environment.baseUrl}Settings/AddGeneralSettings`, generalSetting
    );
  }

  getSubscriptions(): Observable<ServerResponse<SubscriptionSetting>> {
    return this.http.get<ServerResponse<SubscriptionSetting>>(
      `${environment.baseUrl}Settings/GetSubscriptions`
    );
  }

  addSubscriptions(subscriptionSettings : SubscriptionSetting): Observable<ServerResponse<SubscriptionSetting>> {
    return this.http.post<ServerResponse<SubscriptionSetting>>(
      `${environment.baseUrl}Settings/AddSubscription`, subscriptionSettings
    );
  }

  getFeatureLimit(): Observable<ServerResponse<FeatureLimitSetting>> {
    return this.http.get<ServerResponse<FeatureLimitSetting>>(
      `${environment.baseUrl}Settings/GetFeatureLimit`
    );
  }

  addFeatureLimit(featureLimitSetting : FeatureLimitSetting[]): Observable<ServerResponse<FeatureLimitSetting>> {
    return this.http.post<ServerResponse<FeatureLimitSetting>>(
      `${environment.baseUrl}Settings/UpdateFeatureLimit`, featureLimitSetting
    );
  }

  getEmailNotifications(): Observable<ServerResponse<EmailNotification>> {
    return this.http.get<ServerResponse<EmailNotification>>(
      `${environment.baseUrl}Settings/GetEmailNotifications`
    );
  }

  addEmailNotifications(emailSettings: EmailNotification): Observable<ServerResponse<EmailNotification>> {
    return this.http.post<ServerResponse<EmailNotification>>(
      `${environment.baseUrl}Settings/AddEmailNotification`, emailSettings
    );
  }
  
}
