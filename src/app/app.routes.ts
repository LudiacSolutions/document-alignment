import { Routes } from '@angular/router';
import { OverviewComponent } from './feature/admin-layout/main/overview/overview.component';
import { UserComponent } from './feature/admin-layout/main/user/user.component';
import { BillingComponent } from './feature/admin-layout/main/billing/billing.component';
import { UsageStatsComponent } from './feature/admin-layout/analytics/usage-stats/usage-stats.component';
import { PerformanceComponent } from './feature/admin-layout/analytics/performance/performance.component';
import { ApiKeysComponent } from './feature/admin-layout/system/api-keys/api-keys.component';
import { SettingsComponent } from './feature/user-layout/settings/settings.component';
import { LogsComponent } from './feature/admin-layout/system/logs/logs.component';
import { DashboardComponent } from './feature/user-layout/dashboard/dashboard.component';
import { CoreDocumentsComponent } from './feature/user-layout/core-documents/core-documents.component';
import { ReferencesComponent } from './feature/user-layout/references/references.component';
import { NewAnalysisComponent } from './feature/user-layout/new-analysis/new-analysis.component';
import { HistoryComponent } from './feature/user-layout/history/history.component';
import { AdminSettingsComponent } from './feature/admin-layout/system/admin-settings/admin-settings.component';
import { AdminLayoutComponent } from './feature/admin-layout/admin-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [],
    children: [
      { path: 'overview', component: OverviewComponent},
      { path: 'users', component: UserComponent},
      { path: 'billing', component: BillingComponent},
      { path: 'usage', component: UsageStatsComponent},
      { path: 'performance', component: PerformanceComponent},
      { path: 'api-keys', component: ApiKeysComponent},
      { path: 'settings', component: AdminSettingsComponent},
      { path: 'logs', component: LogsComponent},
      { path: '', redirectTo: 'overview', pathMatch: 'full' }
    ]
  },
  {
    path: '',
    canActivate: [],
    children: [
      { path: 'dashboard', component: DashboardComponent},
      { path: 'core-documents', component: CoreDocumentsComponent},
      { path: 'references', component: ReferencesComponent},
      { path: 'new-analysis', component: NewAnalysisComponent},
      { path: 'history', component: HistoryComponent},
      { path: 'settings', component: SettingsComponent},
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
];
