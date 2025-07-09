import { DatePipe, DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
interface ApiKey {
  id: number;
  service: string;
  key: string;
  usage: number;
  limit: number | null;
  status: 'active' | 'revoked' | 'expired';
  created: Date;
  lastUsed: Date;
  description?: string;
}

interface ModelCost {
  model: string;
  cost: number;
  users: string;
}
@Component({
  selector: 'app-api-keys',
  imports: [FormsModule,DecimalPipe,DatePipe],
  templateUrl: './api-keys.component.html',
  styleUrl: './api-keys.component.css'
})
export class ApiKeysComponent {
  apiKeys: ApiKey[] = [];
  newKey = {
    service: 'openai',
    key: '',
    limit: null as number | null,
    description: ''
  };
  showAddModal = false;
  modelCosts: ModelCost[] = [
    { model: 'GPT-4.5 Turbo', cost: 523, users: 'PRO users only' },
    { model: 'GPT-4o', cost: 412, users: 'Both plans' },
    { model: 'GPT-4.1', cost: 198, users: 'Both plans' },
    { model: 'GPT-3.5 Turbo', cost: 114, users: 'Both plans' }
  ];

  constructor(private modalService : NgbModal){}

  ngOnInit(): void {
    this.loadApiKeys();
  }

  private loadApiKeys(): void {
    this.apiKeys = [
      {
        id: 1,
        service: 'OpenAI',
        key: 'sk-...abcd1234',
        usage: 1247,
        limit: 2000,
        status: 'active',
        created: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
        lastUsed: new Date(Date.now() - 2 * 60 * 60 * 1000),
        description: 'Primary production key'
      },
      {
        id: 2,
        service: 'Stripe',
        key: 'pk_live_...xyz789',
        usage: 247,
        limit: null,
        status: 'active',
        created: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        lastUsed: new Date(Date.now() - 24 * 60 * 60 * 1000)
      },
      {
        id: 3,
        service: 'SendGrid',
        key: 'SG.abc...123',
        usage: 32,
        limit: 500,
        status: 'active',
        created: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        lastUsed: new Date(Date.now() - 12 * 60 * 60 * 1000),
        description: 'Email service API'
      }
    ];
  }

  openAddKeyModal(content : any): void {
    this.modalService.open(content)
  }

  closeAddKeyModal(): void {
    this.showAddModal = false;
  }

  resetNewKeyForm(): void {
    this.newKey = {
      service: 'openai',
      key: '',
      limit: null,
      description: ''
    };
  }

  addApiKey(): void {
    if (!this.newKey.key) {
      alert('Please enter an API key');
      return;
    }

    const newKey: ApiKey = {
      id: this.apiKeys.length + 1,
      service: this.newKey.service.charAt(0).toUpperCase() + this.newKey.service.slice(1),
      key: this.newKey.key.substring(0, 6) + '...' + this.newKey.key.slice(-4),
      usage: 0,
      limit: this.newKey.limit,
      status: 'active',
      created: new Date(),
      lastUsed: new Date(),
      description: this.newKey.description
    };

    this.apiKeys.unshift(newKey);
    this.closeAddKeyModal();
  }

  rotateKey(keyId: number): void {
    if (confirm('Rotate this API key? The old key will be invalidated.')) {
      const key = this.apiKeys.find(k => k.id === keyId);
      if (key) {
        key.key = key.key.substring(0, 6) + '...' + Math.random().toString(36).substring(2, 6);
        key.created = new Date();
      }
    }
  }

  revokeKey(keyId: number): void {
    if (confirm('Revoke this API key? This action cannot be undone.')) {
      const key = this.apiKeys.find(k => k.id === keyId);
      if (key) {
        key.status = 'revoked';
      }
    }
  }

  getUsagePercentage(key: ApiKey): number {
    if (!key.limit) return 0;
    return (key.usage / key.limit) * 100;
  }

  getUsageStatus(key: ApiKey): string {
    if (!key.limit) return 'none';
    const percent = this.getUsagePercentage(key);
    if (percent > 90) return 'danger';
    if (percent > 70) return 'warning';
    return 'success';
  }
}
