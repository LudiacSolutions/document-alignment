import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
interface Analysis {
  id: number;
  documentName: string;
  date: Date;
  valuesChecked: number;
  finalAlignment: number;
  purged: boolean;
  selectedValues: any[];
  results: any[];
  iterations: any[];
  uploadedFile?: File;
  directTextInput?: string;
  originalText: string;
}
@Component({
  selector: 'app-history',
  imports: [CommonModule, FormsModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  analyses: Analysis[] = [
    {
      id: 1,
      documentName: 'Company Mission Statement.docx',
      date: new Date(Date.now() - 86400000),
      valuesChecked: 3,
      finalAlignment: 78,
      purged: false,
      selectedValues: [],
      results: [],
      iterations: [],
      originalText: 'Our company mission statement text...'
    },
    {
      id: 2,
      documentName: 'Product Launch Plan.pdf',
      date: new Date(Date.now() - 172800000),
      valuesChecked: 2,
      finalAlignment: 65,
      purged: false,
      selectedValues: [],
      results: [],
      iterations: [],
      originalText: 'Product launch details...'
    },
    {
      id: 3,
      documentName: 'Deleted Confidential Report.pdf',
      date: new Date(Date.now() - 259200000),
      valuesChecked: 4,
      finalAlignment: 82,
      purged: true,
      selectedValues: [],
      results: [],
      iterations: [],
      originalText: '[PURGED]'
    }
  ];

  filteredAnalyses: Analysis[] = [...this.analyses];
  searchQuery = '';

  constructor(private modalService: NgbModal) { }

  filterAnalyses() {
    if (!this.searchQuery) {
      this.filteredAnalyses = [...this.analyses];
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.filteredAnalyses = this.analyses.filter(analysis =>
      analysis.documentName.toLowerCase().includes(query) ||
      analysis.originalText.toLowerCase().includes(query)
    );
  }

  getAlignmentClass(alignment: number): string {
    if (alignment >= 80) return 'excellent';
    if (alignment >= 60) return 'good';
    return 'poor';
  }

  viewAnalysis(analysis: Analysis) {
    // const modalRef = this.modalService.open(AnalysisSummaryModalComponent, {
    //   size: 'lg',
    //   centered: true
    // });

    // modalRef.componentInstance.analysis = analysis;
  }

  downloadAnalysis(analysis: Analysis) {
    let reportContent = `DOCUMENT ALIGNMENT REPORT\n`;
    reportContent += `Generated: ${new Date().toLocaleDateString()}\n\n`;
    reportContent += `Document: ${analysis.documentName}${analysis.purged ? ' [PURGED]' : ''}\n`;
    reportContent += `Analysis Date: ${analysis.date.toLocaleDateString()}\n`;
    reportContent += `Overall Alignment: ${analysis.finalAlignment}%\n\n`;

    reportContent += `VALUES CHECKED:\n`;
    analysis.selectedValues.forEach(value => {
      reportContent += `- ${value.name} (Tolerance: ${value.tolerance}/10)\n`;
    });

    reportContent += `\nALIGNMENT BREAKDOWN:\n`;
    analysis.results.forEach(result => {
      reportContent += `\nValue: ${result.value.name}\n`;
      reportContent += `Alignment: ${result.alignment}%\n`;
      reportContent += `Tolerance: ${result.value.tolerance}/10\n`;
      if (result.alignment < 85) {
        result.issues.forEach((issue: any) => reportContent += `  - ${issue}\n`);
      } else {
        reportContent += `  ✓ Strong alignment\n`;
      }
    });

    this.downloadFile(reportContent, `analysis-report-${analysis.id}.txt`);
  }

  purgeDocument(analysis: Analysis) {
    if (confirm('Are you sure you want to purge this document? This will permanently delete the uploaded document and analysis results. Reports will be retained with a "content purged" flag.')) {
      analysis.purged = true;
      analysis.originalText = '[PURGED]';
      analysis.uploadedFile = undefined;
      analysis.directTextInput = undefined;
    }
  }

  private downloadFile(content: string, filename: string) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}
