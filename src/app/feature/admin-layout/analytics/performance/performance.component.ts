import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
interface PerformanceAlert {
  id: number;
  type: 'warning' | 'error' | 'info';
  message: string;
  timestamp: Date;
  resolved: boolean;
}
@Component({
  selector: 'app-performance',
  imports: [DatePipe],
  templateUrl: './performance.component.html',
  styleUrl: './performance.component.css'
})
export class PerformanceComponent {
  metrics = {
    uptime: 99.98,
    cpuUsage: 42,
    memoryUsage: 67,
    diskSpace: 234,
    apiResponseTime: 124,
    dbQueryTime: 56
  };

  alerts: PerformanceAlert[] = [
    {
      id: 1,
      type: 'warning',
      message: 'Memory usage approaching 70% threshold',
      timestamp: new Date(Date.now() - 3600000),
      resolved: false
    },
    {
      id: 2,
      type: 'info',
      message: 'API response time normalized after optimization',
      timestamp: new Date(Date.now() - 86400000),
      resolved: true
    },
    {
      id: 3,
      type: 'error',
      message: 'Database connection pool exhausted',
      timestamp: new Date(Date.now() - 7200000),
      resolved: false
    }
  ];

  private metricsInterval: any;

  ngOnInit(): void {
    this.simulateRealTimeMetrics();
  }

  ngOnDestroy(): void {
    if (this.metricsInterval) {
      clearInterval(this.metricsInterval);
    }
  }

  private simulateRealTimeMetrics(): void {
    // Simulate fluctuating metrics
    this.metricsInterval = setInterval(() => {
      this.metrics = {
        uptime: 99.98,
        cpuUsage: this.getRandomValue(this.metrics.cpuUsage, 35, 75),
        memoryUsage: this.getRandomValue(this.metrics.memoryUsage, 60, 85),
        diskSpace: 234,
        apiResponseTime: this.getRandomValue(this.metrics.apiResponseTime, 80, 200),
        dbQueryTime: this.getRandomValue(this.metrics.dbQueryTime, 40, 120)
      };

      // Generate random alerts
      if (Math.random() > 0.9) {
        this.generateRandomAlert();
      }
    }, 5000);
  }

  private getRandomValue(current: number, min: number, max: number): number {
    const change = (Math.random() * 10) - 5; // Random change between -5 and +5
    let newValue = current + change;
    
    // Keep within bounds
    newValue = Math.max(min, Math.min(max, newValue));
    
    return parseFloat(newValue.toFixed(1));
  }

  private generateRandomAlert(): void {
    const alertTypes = ['warning', 'error', 'info'];
    const messages = [
      'High CPU usage detected',
      'Memory leak suspected',
      'Database response time exceeded threshold',
      'API latency increased',
      'Disk I/O bottleneck detected',
      'Network latency spike'
    ];
    
    const newAlert: PerformanceAlert = {
      id: Date.now(),
      type: alertTypes[Math.floor(Math.random() * alertTypes.length)] as any,
      message: messages[Math.floor(Math.random() * messages.length)],
      timestamp: new Date(),
      resolved: false
    };
    
    this.alerts.unshift(newAlert);
    
    // Auto-resolve after some time
    setTimeout(() => {
      const alert = this.alerts.find(a => a.id === newAlert.id);
      if (alert) {
        alert.resolved = true;
      }
    }, 30000);
  }

  refreshMetrics(): void {
    // Simulate refresh by generating new random values
    this.metrics = {
      uptime: 99.98,
      cpuUsage: Math.floor(Math.random() * 40) + 30,
      memoryUsage: Math.floor(Math.random() * 30) + 50,
      diskSpace: 234,
      apiResponseTime: Math.floor(Math.random() * 150) + 50,
      dbQueryTime: Math.floor(Math.random() * 80) + 20
    };
  }

  resolveAlert(alertId: number): void {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.resolved = true;
    }
  }

  getCpuStatus(): string {
    if (this.metrics.cpuUsage > 70) return 'High';
    if (this.metrics.cpuUsage > 50) return 'Moderate';
    return 'Normal';
  }

  getMemoryStatus(): string {
    if (this.metrics.memoryUsage > 80) return 'Critical';
    if (this.metrics.memoryUsage > 70) return 'High';
    return 'Moderate';
  }

  getStatusClass(value: number, thresholds: {warning: number, danger: number}): string {
    if (value > thresholds.danger) return 'danger';
    if (value > thresholds.warning) return 'warning';
    return 'success';
  }
}
