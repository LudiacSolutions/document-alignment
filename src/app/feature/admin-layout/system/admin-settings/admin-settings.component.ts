import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-settings',
  imports: [FormsModule],
  templateUrl: './admin-settings.component.html',
  styleUrl: './admin-settings.component.css'
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
      dailySummary: false
    }
  };

  timezones = [
    'Australia/Sydney',
    'UTC',
    'America/New_York',
    'Europe/London',
    'Asia/Tokyo'
  ];

  ngOnInit(): void {
    // In a real app, you would load settings from a service
    this.loadSettings();
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
          dailySummary: false
        }
      };
      alert('Settings have been reset to default values.');
    }
  }
}
