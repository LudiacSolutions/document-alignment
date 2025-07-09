import { CommonModule, DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
interface TokenLimits {
  input: number;
  output: number;
}
@Component({
  selector: 'app-settings',
  imports: [CommonModule, FormsModule,DecimalPipe],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
 selectedModel = 'gpt4o';
  tokenLimits: TokenLimits = { input: 1000000, output: 250000 };
  estimatedPages = { input: 1333, output: 333 };

  modelLimits = {
    gpt4o: { input: 1000000, output: 250000 },
    gpt41: { input: 1250000, output: 300000 },
    gpt35: { input: 5000000, output: 1650000 }
  };

  constructor(private modalService: NgbModal) {}

  updateSelectedModel() {
    this.tokenLimits = this.modelLimits[this.selectedModel as keyof typeof this.modelLimits];
    this.estimatedPages = {
      input: Math.floor(this.tokenLimits.input / 750),
      output: Math.floor(this.tokenLimits.output / 750)
    };
  }

  confirmDeleteAccount() {
    if (confirm('Are you sure you want to delete all your data? This action cannot be undone.')) {
      // Implement delete logic
      console.log('Account data deletion initiated');
    }
  }
}
