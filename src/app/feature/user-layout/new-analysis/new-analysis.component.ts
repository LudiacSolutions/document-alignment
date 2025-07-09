import { Component } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface Value {
  id: number;
  name: string;
  description: string;
  tolerance: number;
}

interface AnalysisResult {
  value: Value;
  alignment: number;
  tolerance: number;
  issues: string[];
}

@Component({
  selector: 'app-new-analysis',
  imports: [NgFor, NgIf],
  templateUrl: './new-analysis.component.html',
  styleUrl: './new-analysis.component.css'
})
export class NewAnalysisComponent {
  values: Value[] = [
    {
      id: 1,
      name: "Innovation & Excellence",
      description: "We strive to push boundaries and deliver exceptional solutions.",
      tolerance: 7
    },
    {
      id: 2,
      name: "Customer First",
      description: "Our customers are at the heart of everything we do.",
      tolerance: 8
    },
    {
      id: 3,
      name: "Sustainability",
      description: "We are committed to environmental responsibility.",
      tolerance: 6
    }
  ];

  selectedValues: { [key: number]: boolean } = {};
  selectedCount = 0;
  uploadedFile: File | null = null;
  directText = '';
  isDragging = false;
  analysisChangePending = false;
  currentAnalysis: AnalysisResult[] = [];

  constructor(private modalService: NgbModal) { }

  get isReadyForAnalysis(): boolean {
    return this.selectedCount > 0 && (!!this.uploadedFile || !!this.directText);
  }

  updateSelectedValues() {
    this.selectedCount = Object.values(this.selectedValues).filter(v => v).length;
    if (this.currentAnalysis.length > 0) {
      this.analysisChangePending = true;
    }
  }

  handleFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.uploadedFile = input.files[0];
      this.directText = '';
      this.checkAnalysisReady();
    }
  }

  handleTextInput() {
    if (this.directText.trim()) {
      this.uploadedFile = null;
    }
    this.checkAnalysisReady();
  }

  checkAnalysisReady() {
    // Method exists for potential future logic
  }

  rerunAnalysis() {
    this.analysisChangePending = false;
    this.startAnalysis();
  }

  startAnalysis() {
    // const modalRef = this.modalService.open(AnalysisModalComponent, {
    //   size: 'xl',
    //   centered: true,
    //   backdrop: 'static'
    // });

    // Get selected values
    const selected = this.values.filter(v => this.selectedValues[v.id]);

    // Prepare analysis data
    const analysisData = selected.map(value => ({
      value,
      alignment: Math.floor(Math.random() * 30) + 60,
      tolerance: value.tolerance,
      issues: [
        'Consider using more action-oriented language',
        'Add specific examples to illustrate this value',
        'Strengthen commitment statements'
      ]
    }));

    // modalRef.componentInstance.analysisData = analysisData;
    // modalRef.componentInstance.documentName = this.uploadedFile?.name || 'Text Input';

    // modalRef.result.then((result) => {
    //   if (result === 'saved') {
    //     this.currentAnalysis = analysisData;
    //     this.analysisChangePending = false;
    //   }
    // }).catch(() => {
    //   // Modal dismissed
    // });
  }

  showUpgradeModal() {
  //   this.modalService.open(UpgradeModalComponent, {
  //     size: 'xl',
  //     centered: true
  //   });
  // }
}
}
