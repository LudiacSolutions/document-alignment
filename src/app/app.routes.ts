import { Routes } from '@angular/router';
import { authGuard } from './core/gaurd/auth.guard';
import { roleGuard } from './core/gaurd/role.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full',
  },
  {
    path: 'signin',
    title: 'Sign In',
    loadComponent: () =>
      import('./auth/signin/signin.component').then((m) => m.SigninComponent),
  },
  {
    path: 'signup',
    title: 'Sign Up',
    loadComponent: () =>
      import('./auth/signup/signup.component').then((m) => m.SignupComponent),
  },
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: 'Admin' },
    loadComponent: () =>
    import('./feature/admin-layout/admin-layout.component').then(
      (m) => m.AdminLayoutComponent
    ),
    children: [
      {
        path: 'overview',
        title: 'Overview',
        loadComponent: () =>
          import('./feature/admin-layout/main/overview/overview.component').then(
            (m) => m.OverviewComponent
          ),
      },
      {
        path: 'users',
        title: 'Users',
        loadComponent: () =>
          import('./feature/admin-layout/main/user/user.component').then(
            (m) => m.UserComponent
          ),
      },
      {
        path: 'billing',
        title: 'Billing',
        loadComponent: () =>
          import('./feature/admin-layout/main/billing/billing.component').then(
            (m) => m.BillingComponent
          ),
      },
      {
        path: 'usage',
        title: 'Usage Stats',
        loadComponent: () =>
          import('./feature/admin-layout/analytics/usage-stats/usage-stats.component').then(
            (m) => m.UsageStatsComponent
          ),
      },
      {
        path: 'performance',
        title: 'Performance',
        loadComponent: () =>
          import('./feature/admin-layout/analytics/performance/performance.component').then(
            (m) => m.PerformanceComponent
          ),
      },
      {
        path: 'api-keys',
        title: 'API Keys',
        loadComponent: () =>
          import('./feature/admin-layout/system/api-keys/api-keys.component').then(
            (m) => m.ApiKeysComponent
          ),
      },
      {
        path: 'settings',
        title: 'Settings',
        loadComponent: () =>
          import('./feature/admin-layout/system/admin-settings/admin-settings.component').then(
            (m) => m.AdminSettingsComponent
          ),
      },
      {
        path: 'logs',
        title: 'Logs',
        loadComponent: () =>
          import('./feature/admin-layout/system/logs/logs.component').then(
            (m) => m.LogsComponent
          ),
      },
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
    ],
  },

  {
    path: 'user',
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: 'User' },
    loadComponent: () =>
    import('./feature/user-layout/user-layout.component').then(
      (m) => m.UserLayoutComponent
    ),
    children: [
      {
        path: 'dashboard',
        title: 'Dashboard',
        loadComponent: () =>
          import('./feature/user-layout/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'core-documents',
        title: 'Core Documents',
        loadComponent: () =>
          import('./feature/user-layout/core-documents/core-documents.component').then(
            (m) => m.CoreDocumentsComponent
          ),
      },
      {
        path: 'my-values',
        title: 'My Values',
        loadComponent: () =>
          import('./feature/user-layout/my-values/my-values.component').then(
            (m) => m.MyValuesComponent
          ),
      },
      {
        path: 'references',
        title: 'References',
        loadComponent: () =>
          import('./feature/user-layout/references/references.component').then(
            (m) => m.ReferencesComponent
          ),
      },
      {
        path: 'new-analysis',
        title: 'New Analysis',
        loadComponent: () =>
          import('./feature/user-layout/new-analysis/new-analysis.component').then(
            (m) => m.NewAnalysisComponent
          ),
      },
      {
        path: 'history',
        title: 'History',
        loadComponent: () =>
          import('./feature/user-layout/history/history.component').then(
            (m) => m.HistoryComponent
          ),
      },
      {
        path: 'settings',
        title: 'Settings',
        loadComponent: () =>
          import('./feature/user-layout/settings/settings.component').then(
            (m) => m.SettingsComponent
          ),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  {
    path: '**',
    title: 'Page Not Found',
    loadComponent: () =>
      import('./shared/components/page-not-found/page-not-found.component').then(
        (m) => m.PageNotFoundComponent
      ),
  },
];
