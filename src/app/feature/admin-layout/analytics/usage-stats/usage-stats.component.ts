import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  email: string;
  plan: 'free' | 'pro';
  model: string;
  tokensUsed: number;
  usagePercent: number;
  features: string;
}

@Component({
  selector: 'app-usage-stats',
  imports: [FormsModule,DecimalPipe],
  templateUrl: './usage-stats.component.html',
  styleUrl: './usage-stats.component.css'
})
export class UsageStatsComponent {
  timeRange = '30'; // Default to last 30 days
  apiCallsCount = 284392;
  docsAnalyzed = 3847;
  valuesAnalyses = 1543;
  docAnalyses = 2304;

  modelUsage: ModelUsage[] = [
    {
      model: 'GPT-3.5 Turbo',
      freeUsage: 45,
      proUsage: 12,
      multiplier: '4x'
    },
    {
      model: 'GPT-4o',
      freeUsage: 35,
      proUsage: 28,
      multiplier: '4x'
    },
    {
      model: 'GPT-4.1',
      freeUsage: 20,
      proUsage: 18,
      multiplier: '4x'
    },
    {
      model: 'GPT-4.5 Turbo',
      freeUsage: 0,
      proUsage: 42,
      multiplier: 'PRO Exclusive'
    }
  ];

  tokenLimits: TokenLimit[] = [
    {
      model: 'GPT-4.5 Turbo',
      freeInput: 0,
      freeOutput: 0,
      proInput: 133333,
      proOutput: 66666
    },
    {
      model: 'GPT-4o',
      freeInput: 1000000,
      freeOutput: 250000,
      proInput: 4000000,
      proOutput: 1000000
    },
    {
      model: 'GPT-4.1',
      freeInput: 1250000,
      freeOutput: 300000,
      proInput: 5000000,
      proOutput: 1250000
    },
    {
      model: 'GPT-3.5 Turbo',
      freeInput: 5000000,
      freeOutput: 1650000,
      proInput: 20000000,
      proOutput: 6600000
    }
  ];

  topUsers: TopUser[] = [
    {
      email: 'sarah.chen@company.com',
      plan: 'pro',
      model: 'GPT-4.5 Turbo',
      tokensUsed: 125000,
      usagePercent: 94,
      features: '📁 8 🔗 3'
    },
    {
      email: 'john.doe@email.com',
      plan: 'pro',
      model: 'GPT-4o',
      tokensUsed: 3800000,
      usagePercent: 95,
      features: '📁 6 🔗 2'
    },
    {
      email: 'mike.w@corp.net',
      plan: 'free',
      model: 'GPT-4o',
      tokensUsed: 950000,
      usagePercent: 95,
      features: '🎯 9'
    },
    {
      email: 'alex.j@email.com',
      plan: 'pro',
      model: 'GPT-4.1',
      tokensUsed: 4800000,
      usagePercent: 96,
      features: '📁 7 🔗 4'
    },
    {
      email: 'emma.davis@example.org',
      plan: 'free',
      model: 'GPT-3.5 Turbo',
      tokensUsed: 4950000,
      usagePercent: 99,
      features: '🎯 10'
    }
  ];

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
}
