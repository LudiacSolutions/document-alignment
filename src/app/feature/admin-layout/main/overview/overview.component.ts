import { Component } from '@angular/core';

interface Metric {
  title: string;
  value: number | string;
  icon: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  cardType: 'primary' | 'success' | 'warning' | 'danger' | 'purple';
}

interface Activity {
  time: string;
  content: string;
}

interface RevenueData {
  month: string;
  value: number;
}

@Component({
  selector: 'app-overview',
  imports: [],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {
  metrics: Metric[] = [];
  featureMetrics: Metric[] = [];
  activities: Activity[] = [];
  revenueData: RevenueData[] = [];
  revenueSummary = {
    freeUsers: 158,
    proUsers: 89,
    churnRate: 3.2
  };

  ngOnInit(): void {
    this.initializeMetrics();
    this.initializeActivities();
    this.initializeRevenueData();
  }

  private initializeMetrics(): void {
    this.metrics = [
      {
        title: 'Total Users',
        value: 247,
        icon: '👥',
        change: '12% from last month',
        changeType: 'positive',
        cardType: 'primary'
      },
      {
        title: 'PRO Subscribers',
        value: 89,
        icon: '✨',
        change: '36% conversion rate',
        changeType: 'positive',
        cardType: 'success'
      },
      {
        title: 'Monthly Revenue',
        value: '$4,361',
        icon: '💰',
        change: '18% growth',
        changeType: 'positive',
        cardType: 'warning'
      },
      {
        title: 'API Costs',
        value: '$1,247',
        icon: '⚡',
        change: '8% increase',
        changeType: 'negative',
        cardType: 'danger'
      }
    ];

    this.featureMetrics = [
      {
        title: 'Values Created',
        value: 437,
        icon: '🎯',
        change: 'FREE users',
        changeType: 'neutral',
        cardType: 'purple'
      },
      {
        title: 'Core Documents',
        value: 312,
        icon: '📁',
        change: 'PRO users',
        changeType: 'neutral',
        cardType: 'purple'
      },
      {
        title: 'Reference URLs',
        value: 156,
        icon: '🔗',
        change: 'PRO users',
        changeType: 'neutral',
        cardType: 'purple'
      },
      {
        title: 'Total Analyses',
        value: '1,283',
        icon: '📝',
        change: 'This month',
        changeType: 'neutral',
        cardType: 'purple'
      }
    ];
  }

  private initializeActivities(): void {
    this.activities = [
      { time: '2 minutes ago', content: 'New PRO subscription: sarah.chen@company.com' },
      { time: '5 minutes ago', content: 'Token top-up purchase: john.doe@email.com ($10)' },
      { time: '15 minutes ago', content: 'Value created: "Customer Excellence" (FREE user)' },
      { time: '22 minutes ago', content: 'Document uploaded: Strategy_2025.pdf (PRO user)' },
      { time: '1 hour ago', content: 'Token limit reached: mike.w@corp.net (GPT-4o, FREE plan)' },
      { time: '2 hours ago', content: 'System backup completed successfully' },
      { time: '3 hours ago', content: 'User suspended: alex.j@email.com - Payment failed' }
    ];
  }

  private initializeRevenueData(): void {
    this.revenueData = [
      { month: 'Aug', value: 2800 },
      { month: 'Sep', value: 3200 },
      { month: 'Oct', value: 3500 },
      { month: 'Nov', value: 3900 },
      { month: 'Dec', value: 4100 },
      { month: 'Jan', value: 4361 }
    ];
  }

  exportReport(): void {
    console.log('Exporting dashboard report...');
    // In a real app, this would generate and download a report
  }

  getBarHeight(value: number): string {
    const maxValue = Math.max(...this.revenueData.map(d => d.value));
    return `${(value / maxValue) * 100}%`;
  }
}
