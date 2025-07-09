// usage-stats.component.ts
import { DatePipe, DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface ModelUsage {
  model: string;
  freeUsage: number;
  proUsage: number;
  multiplier: string;
}

interface TokenLimit {
  model: string;
  freeInput: number;
  freeOutput: number;
  proInput: number;
  proOutput: number;
}

interface TopUser {
  id: number;
  email: string;
  name: string;
  plan: 'free' | 'pro';
  model: string;
  tokensUsed: number;
  usagePercent: number;
  features: string;
  lastActive: Date;
  analysesCompleted: number;
  tokenLimit: number;
}

@Component({
  selector: 'app-usage-stats',
  imports: [FormsModule, DecimalPipe, DatePipe],
  templateUrl: './usage-stats.component.html',
  styleUrls: ['./usage-stats.component.css'],
})
export class UsageStatsComponent {
  timeRange = '30'; // Default to last 30 days
  apiCallsCount = 284392;
  docsAnalyzed = 3847;
  valuesAnalyses = 1543;
  docAnalyses = 2304;
  currentViewingUser: TopUser = {
    id: 1,
    name: 'Sarah Chen',
    email: 'sarah.chen@company.com',
    plan: 'pro',
    model: 'GPT-4.5 Turbo',
    tokensUsed: 125000,
    usagePercent: 94,
    features: '📁 8 🔗 3',
    lastActive: new Date(),
    analysesCompleted: 15,
    tokenLimit: 133333,
  };
  Math = Math;
  modelUsage: ModelUsage[] = [
    {
      model: 'GPT-3.5 Turbo',
      freeUsage: 45,
      proUsage: 12,
      multiplier: '4x',
    },
    {
      model: 'GPT-4o',
      freeUsage: 35,
      proUsage: 28,
      multiplier: '4x',
    },
    {
      model: 'GPT-4.1',
      freeUsage: 20,
      proUsage: 18,
      multiplier: '4x',
    },
    {
      model: 'GPT-4.5 Turbo',
      freeUsage: 0,
      proUsage: 42,
      multiplier: 'PRO Exclusive',
    },
  ];

  tokenLimits: TokenLimit[] = [
    {
      model: 'GPT-4.5 Turbo',
      freeInput: 0,
      freeOutput: 0,
      proInput: 133333,
      proOutput: 66666,
    },
    {
      model: 'GPT-4o',
      freeInput: 1000000,
      freeOutput: 250000,
      proInput: 4000000,
      proOutput: 1000000,
    },
    {
      model: 'GPT-4.1',
      freeInput: 1250000,
      freeOutput: 300000,
      proInput: 5000000,
      proOutput: 1250000,
    },
    {
      model: 'GPT-3.5 Turbo',
      freeInput: 5000000,
      freeOutput: 1650000,
      proInput: 20000000,
      proOutput: 6600000,
    },
  ];

  topUsers: TopUser[] = [
    {
      id: 1,
      name: 'Sarah Chen',
      email: 'sarah.chen@company.com',
      plan: 'pro',
      model: 'GPT-4.5 Turbo',
      tokensUsed: 125000,
      usagePercent: 94,
      features: '📁 8 🔗 3',
      lastActive: new Date(),
      analysesCompleted: 15,
      tokenLimit: 133333,
    },
    {
      id: 2,
      name: 'John Doe',
      email: 'john.doe@email.com',
      plan: 'pro',
      model: 'GPT-4o',
      tokensUsed: 3800000,
      usagePercent: 95,
      features: '📁 6 🔗 2',
      lastActive: new Date(Date.now() - 86400000),
      analysesCompleted: 12,
      tokenLimit: 4000000,
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike.w@corp.net',
      plan: 'free',
      model: 'GPT-4o',
      tokensUsed: 950000,
      usagePercent: 95,
      features: '🎯 9',
      lastActive: new Date(Date.now() - 172800000),
      analysesCompleted: 8,
      tokenLimit: 1000000,
    },
    {
      id: 4,
      name: 'Alex Johnson',
      email: 'alex.j@email.com',
      plan: 'pro',
      model: 'GPT-4.1',
      tokensUsed: 4800000,
      usagePercent: 96,
      features: '📁 7 🔗 4',
      lastActive: new Date(Date.now() - 259200000),
      analysesCompleted: 10,
      tokenLimit: 5000000,
    },
    {
      id: 5,
      name: 'Emma Davis',
      email: 'emma.davis@example.org',
      plan: 'free',
      model: 'GPT-3.5 Turbo',
      tokensUsed: 4950000,
      usagePercent: 99,
      features: '🎯 10',
      lastActive: new Date(Date.now() - 345600000),
      analysesCompleted: 5,
      tokenLimit: 5000000,
    },
  ];

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    this.updateUsageStats();
  }

  updateUsageStats(): void {
    const days = parseInt(this.timeRange);
    const multiplier = days / 30;

    this.apiCallsCount = Math.floor(284392 * multiplier);
    this.docsAnalyzed = Math.floor(3847 * multiplier);
    this.valuesAnalyses = Math.floor(1543 * multiplier);
    this.docAnalyses = Math.floor(2304 * multiplier);
  }

  getProExclusive(model: string): boolean {
    return model === 'GPT-4.5 Turbo';
  }

  notifyUser(email: string): void {
    console.log(`Notifying user ${email} about high usage`);
    // In a real app, this would send a notification
  }

  openUserDetails(content: any, user: TopUser): void {
    this.currentViewingUser = user;
    this.modalService.open(content, { size: 'lg' });
  }

  getModelLimits(model: string): { input: number; output: number } {
    const limit = this.tokenLimits.find((l) => l.model === model);
    return {
      input: limit
        ? this.currentViewingUser?.plan === 'pro'
          ? limit.proInput
          : limit.freeInput
        : 0,
      output: limit
        ? this.currentViewingUser?.plan === 'pro'
          ? limit.proOutput
          : limit.freeOutput
        : 0,
    };
  }
}
