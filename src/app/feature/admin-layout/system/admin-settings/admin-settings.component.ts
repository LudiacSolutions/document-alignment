import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

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

  ngOnInit(): void {
    // In a real app, you would load settings from a service
    this.loadSettings();
    this.loadFeatureLimits();
  }

  private loadFeatureLimits(): void {
    const backendData = [
      {
        limitId: 2,
        planType: 'Free',
        featureName: 'Max Values',
        limitValue: '10',
      },
      {
        limitId: 3,
        planType: 'Free',
        featureName: 'Value Word Count',
        limitValue: '35-100',
      },
      {
        limitId: 4,
        planType: 'Pro',
        featureName: 'Max Core Documents',
        limitValue: '10',
      },
      {
        limitId: 1,
        planType: 'PRO',
        featureName: 'Max Reference URLs',
        limitValue: '5',
      },
    ];

    backendData.forEach((item) => {
      const group = new FormGroup({
        limitId: new FormControl(item.limitId),
        featureName: new FormControl(item.featureName),
        planType: new FormControl(item.planType),
        limitValue: new FormControl(item.limitValue),
      });
      (this.featureLimitForm.get('features') as FormArray).push(group);
    });
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
    // Simulate loading settings from an API
    setTimeout(() => {
      // This would be replaced with actual API call
      console.log('Settings loaded');
    }, 500);
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
}
