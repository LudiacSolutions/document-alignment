import { DatePipe, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
interface LogEntry {
  id: number;
  timestamp: Date;
  level: 'INFO' | 'ERROR' | 'WARNING';
  category: string;
  message: string;
  user: string;
}
@Component({
  selector: 'app-logs',
  imports: [DatePipe,FormsModule,NgClass],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.css'
})
export class LogsComponent {
 logs: LogEntry[] = [];
  filteredLogs: LogEntry[] = [];
  paginatedLogs: LogEntry[] = [];
  logFilter: string = 'all';
  itemsPerPage = 20;
  currentPage = 1;
  totalPages = 1;

  ngOnInit() {
    this.generateDummyLogs();
    this.applyFilter();
  }

  generateDummyLogs() {
    // Replace with real data in production
    const levels = ['INFO', 'ERROR', 'WARNING'] as const;
    const categories = ['API', 'USER', 'BILLING', 'SYSTEM', 'VALUE_CREATED', 'DOCUMENT_UPLOADED', 'ANALYSIS_VALUES'];
    for (let i = 1; i <= 100; i++) {
      this.logs.push({
        id: i,
        timestamp: new Date(Date.now() - i * 60000),
        level: levels[Math.floor(Math.random() * levels.length)],
        category: categories[Math.floor(Math.random() * categories.length)],
        message: `Sample log message #${i}`,
        user: i % 3 === 0 ? 'system' : `user${i}@example.com`
      });
    }
  }

  applyFilter() {
    if (this.logFilter === 'all') {
      this.filteredLogs = [...this.logs];
    } else if (this.logFilter === 'error') {
      this.filteredLogs = this.logs.filter(l => l.level === 'ERROR');
    } else if (this.logFilter === 'api') {
      this.filteredLogs = this.logs.filter(l => l.category === 'API');
    } else if (this.logFilter === 'user') {
      this.filteredLogs = this.logs.filter(l => l.category === 'USER');
    } else if (this.logFilter === 'billing') {
      this.filteredLogs = this.logs.filter(l => l.category === 'BILLING');
    } else if (this.logFilter === 'value') {
      this.filteredLogs = this.logs.filter(l => l.category === 'VALUE_CREATED');
    } else if (this.logFilter === 'document') {
      this.filteredLogs = this.logs.filter(l => l.category === 'DOCUMENT_UPLOADED');
    } else if (this.logFilter === 'analysis') {
      this.filteredLogs = this.logs.filter(l => l.category === 'ANALYSIS_VALUES');
    } else {
      this.filteredLogs = [...this.logs];
    }
    this.currentPage = 1;
    this.updatePagination();
  }

  onFilterChange() {
    this.applyFilter();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredLogs.length / this.itemsPerPage) || 1;
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedLogs = this.filteredLogs.slice(start, start + this.itemsPerPage);
  }

  get totalPagesArr() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  exportLogs() {
    // Simple CSV export
    let csv = 'Timestamp,Level,Category,Message,User\n';
    this.filteredLogs.forEach(log => {
      csv += `"${log.timestamp.toISOString()}","${log.level}","${log.category}","${log.message}","${log.user}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'logs.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  viewLogDetails(log: LogEntry) {
    alert(
      `Log Details:\n\nID: ${log.id}\nTimestamp: ${log.timestamp}\nLevel: ${log.level}\nCategory: ${log.category}\nMessage: ${log.message}\nUser: ${log.user}`
    );
  }
}
