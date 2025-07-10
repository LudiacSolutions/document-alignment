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
import { UserLayoutComponent } from './feature/user-layout/user-layout.component';
import { MyValuesComponent } from './feature/user-layout/my-values/my-values.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { authGuard } from './core/gaurd/auth.guard';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { roleGuard } from './core/gaurd/role.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full',
  },
  {
    path: 'signin',
    component: SigninComponent,
    title: 'Sign In',
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'Sign Up',
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: 'Admin' },
    children: [
      { path: 'overview', component: OverviewComponent, title: 'Overview' },
      { path: 'users', component: UserComponent, title: 'Users' },
      { path: 'billing', component: BillingComponent, title: 'Billing' },
      { path: 'usage', component: UsageStatsComponent, title: 'Usage stats' },
      {
        path: 'performance',
        component: PerformanceComponent,
        title: 'Performance',
      },
      { path: 'api-keys', component: ApiKeysComponent, title: 'API keys' },
      {
        path: 'settings',
        component: AdminSettingsComponent,
        title: 'Settings',
      },
      { path: 'logs', component: LogsComponent, title: 'Logs' },
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
    ],
  },
  {
    path: 'user',
    component: UserLayoutComponent,
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: 'User' },
    children: [
      { path: 'dashboard', component: DashboardComponent, title: 'Dashboard' },
      {
        path: 'core-documents',
        component: CoreDocumentsComponent,
        title: 'Core Documents',
      },
      { path: 'my-values', component: MyValuesComponent, title: 'My values' },
      {
        path: 'references',
        component: ReferencesComponent,
        title: 'References',
      },
      {
        path: 'new-analysis',
        component: NewAnalysisComponent,
        title: 'New Analysis',
      },
      { path: 'history', component: HistoryComponent, title: 'History' },
      { path: 'settings', component: SettingsComponent, title: 'Settings' },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    title: 'Page Not Found',
  },
];
