import { DatePipe, DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
interface Transaction {
  id: number;
  date: Date;
  user: string;
  type: string;
  amount: number;
  status: string;
}
@Component({
  selector: 'app-billing',
  imports: [DatePipe, DecimalPipe],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.css'
})
export class BillingComponent {
  metrics = {
    mrr: 4361,
    arr: 52332,
    arpu: 17.65,
    churnRate: 3.2,
    topupRevenue: 380,
    topupCount: 38,
    topupAvg: 10,
    freeUsers: 158,
    proUsers: 89,
    monthlySubs: 71,
    annualSubs: 18,
    proRevenue: 4361
  };

  transactions: Transaction[] = [];

  ngOnInit(): void {
    this.initializeTransactions();
  }

  private initializeTransactions(): void {
    const users = [
      'sarah.chen@company.com',
      'john.doe@email.com',
      'mike.w@corp.net',
      'alex.j@email.com',
      'emma.davis@example.org'
    ];
    const types = ['PRO Monthly', 'Token Top-up', 'PRO Annual'];

    for (let i = 0; i < 50; i++) {
      this.transactions.push({
        id: i + 1,
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        user: users[Math.floor(Math.random() * users.length)],
        type: types[Math.floor(Math.random() * types.length)],
        amount: Math.floor(Math.random() * 3) === 0 ? 10 : 
               (Math.floor(Math.random() * 5) === 0 ? 504 : 49),
        status: 'paid'
      });
    }

    // Sort by date (newest first)
    this.transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  get recentTransactions(): Transaction[] {
    return this.transactions.slice(0, 10);
  }

  exportFinancials(): void {
    console.log('Exporting financial report...');
    // In a real app, this would generate and download a report
  }

  viewAllTransactions(): void {
    console.log('Viewing all transactions...');
    // In a real app, this would navigate to a detailed transactions view
  }

  downloadInvoice(transactionId: number): void {
    console.log(`Downloading invoice for transaction ${transactionId}...`);
    // In a real app, this would download the invoice
  }
}
