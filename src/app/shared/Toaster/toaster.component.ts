import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { ToasterService } from './toaster.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-toaster',
  imports: [CommonModule, FormsModule],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.css',
})
export class ToasterComponent {
  constructor(public toastService: ToasterService) {
    effect(() => {
      console.log('Toasts updated:', this.toastService.toastList());
    });
  }
  
}
