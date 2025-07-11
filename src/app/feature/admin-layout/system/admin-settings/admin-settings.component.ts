import { UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AdminSettingService } from './services/admin-settings.service';

@Component({
  selector: 'app-admin-settings',
  imports: [FormsModule, ReactiveFormsModule, UpperCasePipe],
  templateUrl: './admin-settings.component.html',
  styleUrl: './admin-settings.component.css',
})
export class AdminSettingsComponent {
  settings = {
    systemName: 'Document Alignment System',
    supportEmail: 'support@docalignsystem.com',
    timezone: 'Australia/Sydney',
    proPlanPrice: 49,
    tokenTopupPrice: 10,
    tokenTopupAmount: '50% of monthly limit',
    freeMaxValues: 10,
    freeWordCount: '35-100 words',
    proMaxDocs: 10,
    proMaxUrls: 5,
    sessionTimeout: 60,
    maxLoginAttempts: 5,
    notifications: {
      newUsers: true,
      failedPayments: true,
      highUsage: true,
      tokenTopups: true,
      dailySummary: false,
    },
  };

  timezones = [
    'Australia/Sydney',
    'UTC',
    'America/New_York',
    'Europe/London',
    'Asia/Tokyo',
  ];

  generalSettingsForm = new FormGroup({
    systemName: new FormControl('Document Alignment System'),
    supportEmail: new FormControl('support@docalignsystem.com'),
    defaultTimezone: new FormControl('Australia/Sydney'),
  });

  subscriptionForm = new FormGroup({
    proPlanPriceAud: new FormControl(49),
    tokenTopupPriceAud: new FormControl(10),
    tokenTopupAmount: new FormControl('50% of monthly limit'),
  });

  featureLimitForm = new FormGroup({
    features: new FormArray([]),
  });

  emailNotificationForm = new FormGroup({
    newUserRegistrations: new FormControl(true),
    failedPayments: new FormControl(true),
    highApiUsageAlerts: new FormControl(true),
    tokenTopupPurchases: new FormControl(true),
    dailySummaryReports: new FormControl(false),
  });

  get features(): FormArray {
    return this.featureLimitForm.get('features') as FormArray;
  }

  constructor(private settingService: AdminSettingService,private cdr : ChangeDetectorRef) {}

  ngOnInit(): void {
    // In a real app, you would load settings from a service
  }
  ngAfterViewInit(){
    this.loadSettings();

  }

  saveFeatureLimits(): void {
    const featureUpdates = (this.featureLimitForm.value.features ?? []).map(
      (f: any) => ({
        limitId: f.limitId,
        featureName: f.featureName,
        planType: f.planType,
        limitValue: f.limitValue,
      })
    );

    console.log('Submitting feature limit updates:', featureUpdates);
    alert('Feature limits updated!');
    // Example: this.http.post('/api/update-feature-limits', featureUpdates).subscribe(...)
  }

  private loadSettings(): void {
    this.getGeneralSettings();
    this.getSubscriptions();
    this.getFeatureLimit();
    this.getEmailNotifications();
  }

  saveSettings(): void {
    // In a real app, you would save settings to a service
    console.log('Saving settings:', this.settings);
    console.log(this.subscriptionForm.value);
    console.log(this.featureLimitForm.value);
    console.log(this.emailNotificationForm.value);
    console.log(this.generalSettingsForm.value);

    // Show success message
    alert('Settings saved successfully!');
  }

  forceLogoutAll(): void {
    if (confirm('Force logout all users? They will need to sign in again.')) {
      console.log('Force logging out all users');
      // Show success message
      alert('All users have been logged out. They will need to sign in again.');
    }
  }

  resetToDefaults(): void {
    if (confirm('Reset all settings to default values?')) {
      this.settings = {
        systemName: 'Document Alignment System',
        supportEmail: 'support@docalignsystem.com',
        timezone: 'Australia/Sydney',
        proPlanPrice: 49,
        tokenTopupPrice: 10,
        tokenTopupAmount: '50% of monthly limit',
        freeMaxValues: 10,
        freeWordCount: '35-100 words',
        proMaxDocs: 10,
        proMaxUrls: 5,
        sessionTimeout: 60,
        maxLoginAttempts: 5,
        notifications: {
          newUsers: true,
          failedPayments: true,
          highUsage: true,
          tokenTopups: true,
          dailySummary: false,
        },
      };
      alert('Settings have been reset to default values.');
    }
  }

  getGeneralSettings() {
    this.settingService.getGeneralSettings().subscribe({
      next: (res) => {
        this.generalSettingsForm.patchValue({
          systemName: res.data[0].systemName,
          supportEmail: res.data[0].supportEmail,
          defaultTimezone: res.data[0].defaultTimezone,
        });
      },
      error: (err) => {},
    });
  }

  getSubscriptions() {
    this.settingService.getSubscriptions().subscribe({
      next: (res) => {
        this.subscriptionForm.patchValue({
          proPlanPriceAud: res.data[0].proPlanPriceAud,
          tokenTopupPriceAud: res.data[0].tokenTopupPriceAud,
          tokenTopupAmount: res.data[0].tokenTopupAmount,
        });
      },
      error: (err) => {},
    });
  }

  getFeatureLimit() {
    this.settingService.getFeatureLimit().subscribe({
      next: (res) => {
        const backendData = res.data;
        backendData.forEach((item) => {
          const group = new FormGroup({
            limitId: new FormControl(item.limitId),
            featureName: new FormControl(item.featureName),
            planType: new FormControl(item.planType),
            limitValue: new FormControl(item.limitValue),
          });
          (this.featureLimitForm.get('features') as FormArray).push(group);
        });
        // this.cdr.detectChanges(); // Force view update
      },
      error: (err) => {},
    });
  }

  getEmailNotifications() {
    this.settingService.getEmailNotifications().subscribe({
      next: (res) => {
        this.emailNotificationForm.patchValue({
          newUserRegistrations: res.data[0].newUserRegistrations,
          failedPayments: res.data[0].failedPayments,
          highApiUsageAlerts: res.data[0].highApiUsageAlerts,
          tokenTopupPurchases: res.data[0].tokenTopupPurchases,
          dailySummaryReports: res.data[0].dailySummaryReports,
        });
      },
      error: (err) => {},
    });
  }
}
