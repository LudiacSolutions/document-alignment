import { UpperCasePipe } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AdminSettingService } from './services/admin-settings.service';
import {
  AddGeneralSetting,
  EmailNotification,
  FeatureLimitSetting,
  SubscriptionSetting,
  SecuritySetting,
} from './interfaces/setting.interface';
import { ToasterService } from '../../../../shared/Toaster/toaster.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-admin-settings',
  imports: [FormsModule, ReactiveFormsModule, UpperCasePipe],
  templateUrl: './admin-settings.component.html',
  styleUrl: './admin-settings.component.css',
})
export class AdminSettingsComponent {
  timezones: WritableSignal<string[]> = signal([
    'Australia/Sydney',
    'UTC',
    'America/New_York',
    'Europe/London',
    'Asia/Tokyo',
  ]);

  subscriptionSettings: WritableSignal<SubscriptionSetting> = signal({
    subscriptionSettingId: 1,
    proPlanPriceAud: 49,
    tokenTopupPriceAud: 10,
    tokenTopupAmount: '50% of monthly limit',
    lastUpdatedAt: this.getTimestamp(),
  });

  generalSettingsForm = new FormGroup({
    systemName: new FormControl<string | null>(null),
    supportEmail: new FormControl<string | null>(null),
    defaultTimezone: new FormControl<string | null>(null),
  });

  subscriptionForm = new FormGroup({
    proPlanPriceAud: new FormControl<number | null>(null),
    tokenTopupPriceAud: new FormControl<number | null>(null),
    tokenTopupAmount: new FormControl<string | null>(null),
  });

  featureLimitForm = new FormGroup({
    features: new FormArray<FormGroup>([]),
  });

  emailNotificationForm = new FormGroup({
    newUserRegistrations: new FormControl<boolean | null>(null),
    failedPayments: new FormControl<boolean | null>(null),
    highApiUsageAlerts: new FormControl<boolean | null>(null),
    tokenTopupPurchases: new FormControl<boolean | null>(null),
    dailySummaryReports: new FormControl<boolean | null>(null),
  });

  securitySettingsForm = new FormGroup({
    sessionTimeout: new FormControl<number | null>(null),
    maxLoginAttempts: new FormControl<number | null>(null),
  });

  get features(): FormArray<FormGroup> {
    return this.featureLimitForm.get('features') as FormArray<FormGroup>;
  }

  private getTimestamp(): string {
    return new Date().toISOString();
  }

  constructor(
    private settingService: AdminSettingService,
    private cdr: ChangeDetectorRef,
    private toasterService: ToasterService
  ) {}

  ngOnInit(): void {
    this.loadSettings();
  }

  saveFeatureLimits(): void {
    const featureUpdates = (this.featureLimitForm.value.features ?? []).map(
      (f: FeatureLimitSetting) => ({
        limitId: f.limitId,
        featureName: f.featureName,
        planType: f.planType,
        limitValue: f.limitValue,
        lastUpdatedAt: this.getTimestamp(),
      })
    );

    this.settingService
      .addFeatureLimit(featureUpdates)
      .pipe(
        finalize(() => this.cdr.detectChanges())
      )
      .subscribe({
        next: () => {
          this.toasterService.showToast(
            'Feature limits updated successfully',
            'success'
          );
          this.getFeatureLimit();
          this.featureLimitForm.markAsPristine();
        },
        error: (err) => {
          this.toasterService.showToast(
            err.title || 'Failed to update feature limits',
            'error'
          );
        },
      });
  }

  saveGeneralSettings(): void {
    this.settingService
      .addGeneralSettings(
        this.generalSettingsForm.getRawValue() as AddGeneralSetting
      )
      .pipe(finalize(() => this.cdr.detectChanges()))
      .subscribe({
        next: () => {
          this.toasterService.showToast(
            'General settings updated successfully',
            'success'
          );
          this.getGeneralSettings();
          this.generalSettingsForm.markAsPristine();
        },
        error: (err) => {
          this.toasterService.showToast(
            err.title || 'Failed to update general settings',
            'error'
          );
        },
      });
  }

  saveSubscriptionSettings(): void {
    const addSubscriptionSetting: SubscriptionSetting = {
      ...(this.subscriptionForm.getRawValue() as SubscriptionSetting),
      subscriptionSettingId: this.subscriptionSettings().subscriptionSettingId,
      lastUpdatedAt: this.getTimestamp(),
    };

    this.settingService
      .addSubscriptions(addSubscriptionSetting)
      .pipe(finalize(() => this.cdr.detectChanges()))
      .subscribe({
        next: () => {
          this.toasterService.showToast(
            'Subscription settings updated successfully',
            'success'
          );
          this.getSubscriptions(); 
          this.subscriptionForm.markAsPristine();
        },
        error: (err) => {
          this.toasterService.showToast(
            err.title || 'Failed to update subscription settings',
            'error'
          );
        },
      });
  }

  saveEmailNotification(): void {
    const addEmailData: EmailNotification = {
      ...(this.emailNotificationForm.getRawValue() as EmailNotification),
      lastUpdatedAt: this.getTimestamp(),
    };

    this.settingService
      .addEmailNotifications(addEmailData)
      .pipe(finalize(() => this.cdr.detectChanges()))
      .subscribe({
        next: () => {
          this.toasterService.showToast(
            'Email notification settings updated successfully',
            'success'
          );
          this.getEmailNotifications(); 
          this.emailNotificationForm.markAsPristine();
        },
        error: (err) => {
          this.toasterService.showToast(
            err.title || 'Failed to update email notifications',
            'error'
          );
        },
      });
  }

  saveSecuritySettings(): void {
    const addSecurityData: SecuritySetting = {
      ...(this.securitySettingsForm.getRawValue() as SecuritySetting),
      lastUpdatedAt: this.getTimestamp(),
    };
    this.toasterService.showToast(
      'Security settings updated successfully',
      'success'
    );
    this.getSecuritySettings(); 
    this.securitySettingsForm.markAsPristine();
    this.cdr.detectChanges();
  }

  private loadSettings(): void {
    this.getGeneralSettings();
    this.getSubscriptions();
    this.getFeatureLimit();
    this.getEmailNotifications();
    this.getSecuritySettings();
  }

  saveSettings(): void {
    let settingsSaved = false;

    if (this.generalSettingsForm.dirty) {
      this.saveGeneralSettings();
      settingsSaved = true;
    }
    if (this.subscriptionForm.dirty) {
      this.saveSubscriptionSettings();
      settingsSaved = true;
    }
    if (this.featureLimitForm.dirty) {
      this.saveFeatureLimits();
      settingsSaved = true;
    }
    if (this.emailNotificationForm.dirty) {
      this.saveEmailNotification();
      settingsSaved = true;
    }
    if (this.securitySettingsForm.dirty) {
      this.saveSecuritySettings();
      settingsSaved = true;
    }

    if (!settingsSaved) {
      this.toasterService.showToast('No settings changed to save.', 'info');
    }
  }

  forceLogoutAll(): void {
    this.toasterService.showToast('Force logout all users initiated.', 'info');
  }

  resetToDefaults(): void {
    this.toasterService.showToast('Resetting settings to defaults.', 'info');
  }

  getGeneralSettings(): void {
    this.settingService
      .getGeneralSettings()
      .pipe(finalize(() => this.cdr.detectChanges()))
      .subscribe({
        next: (res) => {
          if (res.data && res.data.length > 0) {
            this.generalSettingsForm.patchValue({
              systemName: res.data[0].systemName,
              supportEmail: res.data[0].supportEmail,
              defaultTimezone: res.data[0].defaultTimezone,
            });
            this.generalSettingsForm.markAsPristine();
          }
        },
        error: (err) => {
          this.toasterService.showToast(
            err.title || 'Failed to load general settings',
            'error'
          );
        },
      });
  }

  getSubscriptions(): void {
    this.settingService
      .getSubscriptions()
      .pipe(finalize(() => this.cdr.detectChanges()))
      .subscribe({
        next: (res) => {
          if (res.data && res.data.length > 0) {
            this.subscriptionSettings.set(res.data[0]);
            this.subscriptionForm.patchValue({
              proPlanPriceAud: this.subscriptionSettings().proPlanPriceAud,
              tokenTopupPriceAud:
                this.subscriptionSettings().tokenTopupPriceAud,
              tokenTopupAmount: this.subscriptionSettings().tokenTopupAmount,
            });
            this.subscriptionForm.markAsPristine();
          }
        },
        error: (err) => {
          this.toasterService.showToast(
            err.title || 'Failed to load subscription settings',
            'error'
          );
        },
      });
  }

  getFeatureLimit(): void {
    this.settingService
      .getFeatureLimit()
      .pipe(finalize(() => this.cdr.detectChanges()))
      .subscribe({
        next: (res) => {
          const backendData = res.data;
          this.features.clear();
          backendData.forEach((item) => {
            const group = new FormGroup({
              limitId: new FormControl(item.limitId),
              featureName: new FormControl(item.featureName),
              planType: new FormControl(item.planType),
              limitValue: new FormControl(item.limitValue),
            });
            this.features.push(group);
          });
          this.featureLimitForm.markAsPristine();
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.toasterService.showToast(
            err.title || 'Failed to load feature limits',
            'error'
          );
        },
      });
  }

  getEmailNotifications(): void {
    this.settingService
      .getEmailNotifications()
      .pipe(finalize(() => this.cdr.detectChanges()))
      .subscribe({
        next: (res) => {
          if (res.data && res.data.length > 0) {
            this.emailNotificationForm.patchValue({
              newUserRegistrations: res.data[0].newUserRegistrations,
              failedPayments: res.data[0].failedPayments,
              highApiUsageAlerts: res.data[0].highApiUsageAlerts,
              tokenTopupPurchases: res.data[0].tokenTopupPurchases,
              dailySummaryReports: res.data[0].dailySummaryReports,
            });
            this.emailNotificationForm.markAsPristine();
          }
        },
        error: (err) => {
          this.toasterService.showToast(
            err.title || 'Failed to load email notifications',
            'error'
          );
        },
      });
  }

  getSecuritySettings(): void {
    const simulatedSecurityData = {
      sessionTimeout: 60,
      maxLoginAttempts: 5,
    };
    this.securitySettingsForm.patchValue(simulatedSecurityData);
    this.securitySettingsForm.markAsPristine();
    this.cdr.detectChanges();
  }
}
