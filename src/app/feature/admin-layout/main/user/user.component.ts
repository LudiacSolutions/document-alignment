import { DatePipe, DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';

interface User {
  id: number;
  name: string;
  email: string;
  plan: 'free' | 'pro';
  status: 'active' | 'inactive' | 'suspended';
  joined: Date;
  lastActive: Date;
  tokenUsage: number;
  preferredModel: string;
  analysesCompleted: number;
  valuesCreated?: number;
  coreDocsUploaded?: number;
  refsAdded?: number;
  tokenTopups?: number;
}

@Component({
  selector: 'app-user',
  imports: [FormsModule, DatePipe, DecimalPipe,PaginationComponent],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class UserComponent {
  users: User[] = [];
  filteredUsers: User[] = [];
  selectedUsers: number[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  searchTerm = '';
  Math = Math;
  planFilter: 'all' | 'free' | 'pro' = 'all';
  private modalRef?: NgbModalRef;
  currentViewingUser: User = {
      id: 1,
      name: 'Sarah Chen',
      email: 'sarah.chen@example.com',
      plan: 'pro',
      status: 'active',
      joined: new Date('2023-01-15'),
      lastActive: new Date(),
      tokenUsage: 65,
      preferredModel: 'gpt45',
      analysesCompleted: 12,
      valuesCreated: 0,
      coreDocsUploaded: 5,
      refsAdded: 2,
      tokenTopups: 1
  };

  userStats = {
    total: 247,
    activeToday: 142,
    newThisMonth: 31,
    suspended: 3
  };

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.initializeUsers();
    this.filterUsers();
  }

  private initializeUsers(): void {
    const names = ['Sarah Chen', 'John Doe', 'Mike Wilson', 'Emma Davis', 'Alex Kumar', 'Lisa Anderson', 'Tom Brown', 'Anna Smith'];
    const models = ['gpt45', 'gpt4o', 'gpt41', 'gpt35'];
    
    for (let i = 0; i < 247; i++) {
      const plan = i < 89 ? 'pro' : 'free';
      const preferredModel = plan === 'free' ? models.slice(1)[Math.floor(Math.random() * 3)] : models[Math.floor(Math.random() * 4)];
      
      this.users.push({
        id: i + 1,
        name: names[i % names.length] + ' ' + (Math.floor(i / names.length) + 1),
        email: `user${i + 1}@example.com`,
        plan: plan,
        status: ['active', 'active', 'active', 'suspended', 'inactive'][Math.floor(Math.random() * 5)] as 'active' | 'inactive' | 'suspended',
        joined: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
        lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
        tokenUsage: Math.floor(Math.random() * 100),
        preferredModel: preferredModel,
        analysesCompleted: Math.floor(Math.random() * 50),
        valuesCreated: plan === 'free' ? Math.floor(Math.random() * 10) : 0,
        coreDocsUploaded: plan === 'pro' ? Math.floor(Math.random() * 10) : 0,
        refsAdded: plan === 'pro' ? Math.floor(Math.random() * 5) : 0,
        tokenTopups: plan === 'pro' ? Math.floor(Math.random() * 3) : 0
      });
    }
  }

  filterUsers(): void {
    this.filteredUsers = this.users.filter(user => {
      // Filter by plan
      if (this.planFilter !== 'all' && user.plan !== this.planFilter) {
        return false;
      }
      
      // Filter by search term
      if (this.searchTerm) {
        const term = this.searchTerm.toLowerCase();
        return user.name.toLowerCase().includes(term) || 
               user.email.toLowerCase().includes(term);
      }
      
      return true;
    });
    
    this.currentPage = 1;
  }

  get paginatedUsers(): User[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredUsers.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }

  toggleSelectAll(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedUsers = this.paginatedUsers.map(user => user.id);
    } else {
      this.selectedUsers = [];
    }
  }

  toggleUserSelection(userId: number, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      if (!this.selectedUsers.includes(userId)) {
        this.selectedUsers.push(userId);
      }
    } else {
      this.selectedUsers = this.selectedUsers.filter(id => id !== userId);
    }
  }

  isSelected(userId: number): boolean {
    return this.selectedUsers.includes(userId);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  exportUsers(): void {
    console.log('Exporting users data...');
    // In a real app, this would generate and download a CSV
  }

  bulkSuspend(): void {
    if (this.selectedUsers.length && confirm(`Suspend ${this.selectedUsers.length} users?`)) {
      this.users.forEach(user => {
        if (this.selectedUsers.includes(user.id)) {
          user.status = 'suspended';
        }
      });
      this.userStats.suspended += this.selectedUsers.length;
      this.selectedUsers = [];
      this.filterUsers();
    }
  }

  bulkUpgrade(): void {
    if (this.selectedUsers.length && confirm(`Upgrade ${this.selectedUsers.length} users to PRO?`)) {
      let upgraded = 0;
      this.users.forEach(user => {
        if (this.selectedUsers.includes(user.id) && user.plan === 'free') {
          user.plan = 'pro';
          upgraded++;
        }
      });
      this.selectedUsers = [];
      console.log(`${upgraded} users upgraded to PRO`);
    }
  }

  bulkDelete(): void {
    if (this.selectedUsers.length && confirm(`Delete ${this.selectedUsers.length} users? This action cannot be undone.`)) {
      this.users = this.users.filter(user => !this.selectedUsers.includes(user.id));
      this.userStats.total -= this.selectedUsers.length;
      this.selectedUsers = [];
      this.filterUsers();
    }
  }

  getModelDisplay(model: string): string {
    return model === 'gpt45' ? 'GPT-4.5 Turbo' : 
           model === 'gpt4o' ? 'GPT-4o' : 
           model === 'gpt41' ? 'GPT-4.1' : 'GPT-3.5 Turbo';
  }

  getFeatureUsage(user: User): string {
    return user.plan === 'free' 
      ? `🎯 ${user.valuesCreated}/10`
      : `📁 ${user.coreDocsUploaded}/10 🔗 ${user.refsAdded}/5`;
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    
    if (this.totalPages <= maxVisiblePages) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      const start = Math.max(2, this.currentPage - 1);
      const end = Math.min(this.totalPages - 1, this.currentPage + 1);
      
      if (start > 2) {
        pages.push(-1);
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < this.totalPages - 1) {
        pages.push(-1);
      }
      
      pages.push(this.totalPages);
    }
    
    return pages;
  }

  open(content: any, user?: User) {
    if (user) {
      this.currentViewingUser = user;
    }
    this.modalRef = this.modalService.open(content, { size: 'lg' });
  }

  suspendUserFromView() {
    if (this.currentViewingUser) {
      this.currentViewingUser.status = 'suspended';
      this.userStats.suspended++;
      this.modalRef?.close();
    }
  }

  getRecentAnalyses(user: User | null): any[] {
    if (!user) return [];
    
    return user.plan === 'free' 
      ? [
          { type: 'Values', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), items: '3 values', alignment: 87, tokens: 3400 },
          { type: 'Values', date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), items: '2 values', alignment: 92, tokens: 2100 }
        ]
      : [
          { type: 'Documents', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), items: '2 docs, 1 URL', alignment: 85, tokens: 12400 },
          { type: 'Documents', date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), items: '3 docs', alignment: 91, tokens: 8200 }
        ];
  }
}