import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  // isActive = signal<boolean>(true);
  // count = signal<number>(0);
  // name = signal<string>('');

  constructor() {
    // console.log('Dashboard component constructor');
  }
  ngOnInit() {
    // console.log('Dashboard component onInit');
  }
  // changeValueOfSignal() {
  //   console.log('Signal', this.isActive());

  //   this.isActive.update(((value: boolean) => !value));
  //   console.log('Signal after', this.isActive());

  // }
}
