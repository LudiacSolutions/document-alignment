export interface AddGeneralSetting {
  systemName: string;
  supportEmail: string;
  defaultTimezone: string;
}
export interface GeneralSetting extends AddGeneralSetting {
  settingId: number;
  lastUpdatedAt: string;
}

export interface SubscriptionSetting {
  subscriptionSettingId: number;
  proPlanPriceAud: number;
  tokenTopupPriceAud: number;
  tokenTopupAmount: string;
  lastUpdatedAt: string;
}

export interface FeatureLimitSetting {
  limitId: number;
  planType: string;
  featureName: string;
  limitValue: number;
  lastUpdatedAt: string;
}

export interface EmailNotification {
  notificationId: number;
  newUserRegistrations: boolean;
  failedPayments: boolean;
  highApiUsageAlerts: boolean;
  tokenTopupPurchases: boolean;
  dailySummaryReports: boolean;
  lastUpdatedAt: string;
}

export interface SecuritySetting {
    maxLoginAttempts: number,
    sessionTimeout: number
    lastUpdatedAt : string
}