import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoreDocument } from './core-document.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-core-documents',
  imports: [CommonModule, FormsModule],
  templateUrl: './core-documents.component.html',
  styleUrls: ['./core-documents.component.css'],
})
export class CoreDocumentsComponent {
  coreDocuments: CoreDocument[] = [
    {
      id: 1,
      title: 'Company Vision 2025',
      type: 'file',
      description:
        'Strategic vision document outlining our 5-year goals and transformation roadmap.',
      uploadDate: 'Jan 15, 2025',
    },
    {
      id: 2,
      title: 'Brand Voice Guidelines',
      type: 'text',
      description:
        'Comprehensive guide to our brand personality, tone, and communication principles.',
      uploadDate: 'Jan 12, 2025',
    },
    {
      id: 3,
      title: 'ESG Commitment 2025',
      type: 'file',
      description:
        'Environmental, Social, and Governance commitments and implementation framework.',
      uploadDate: 'Jan 10, 2025',
    },
    {
      id: 4,
      title: 'Data Privacy Policy',
      type: 'text',
      description:
        'Internal guidelines for data handling, privacy compliance, and security protocols.',
      uploadDate: 'Jan 8, 2025',
    },
  ];

  isEditing = false;
  currentDoc: CoreDocument = this.createEmptyDoc();
  selectedInputMethod: 'text' | 'file' | null = null;
  selectedFileName = '';
  constructor(private modalService: NgbModal) {}
  ngOnInit(): void {}

  openAddEditModal(content: any) {
    this.modalService.open(content, {
      backdrop: 'static',
      size: 'lg',
      keyboard: true,
      centered: true,
    });
  }
  createEmptyDoc(): CoreDocument {
    return {
      id: 0,
      title: '',
      type: 'text',
      description: '',
      uploadDate: '',
      content: '',
    };
  }

  openAddDocModal(): void {
    if (this.coreDocuments.length >= 10) {
      this.showToast(
        'You have reached the maximum of 10 core documents',
        'warning'
      );
      return;
    }
    this.currentDoc = this.createEmptyDoc();
    this.isEditing = false;
    this.selectedInputMethod = null;
    this.selectedFileName = '';
  }

  openEditModal(doc: CoreDocument): void {
    this.currentDoc = { ...doc };
    this.isEditing = true;
    this.selectedInputMethod = doc.type;
    this.selectedFileName = doc.type === 'file' ? doc.title : '';
  }

  selectInputMethod(method: 'text' | 'file'): void {
    this.selectedInputMethod = method;
    if (this.currentDoc) {
      this.currentDoc.type = method;
    }
  }

  handleDocFileUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFileName = file.name;
      this.currentDoc.file = file;
      this.currentDoc.title = file.name.split('.')[0]; // Set title from filename
      this.showToast('File selected: ' + file.name, 'success');
    }
  }

  saveDocument(): void {
    const title = this.currentDoc.title.trim();
    this.modalService.dismissAll();
    if (!title) {
      this.showToast('Please enter a document title', 'error');
      return;
    }

    if (!this.selectedInputMethod) {
      this.showToast('Please select text input or file upload', 'error');
      return;
    }

    if (this.selectedInputMethod === 'text') {
      const content = this.currentDoc.content?.trim();
      if (!content) {
        this.showToast('Please enter document content', 'error');
        return;
      }
    } else {
      if (!this.currentDoc.file) {
        this.showToast('Please select a file to upload', 'error');
        return;
      }
    }

    if (this.isEditing) {
      // Update existing document
      const index = this.coreDocuments.findIndex(
        (d) => d.id === this.currentDoc.id
      );
      if (index !== -1) {
        this.coreDocuments[index] = {
          ...this.currentDoc,
          uploadDate: new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }),
        };
        this.showToast(
          `Core document "${title}" updated successfully`,
          'success'
        );
      }
    } else {
      // Add new document
      const newDoc: CoreDocument = {
        ...this.currentDoc,
        id: Date.now(),
        description: 'Custom core document for alignment checking',
        uploadDate: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
      };
      this.coreDocuments.push(newDoc);
      this.showToast(`Core document "${title}" saved successfully`, 'success');
    }
  }

  deleteDoc(id: number): void {
    if (confirm('Are you sure you want to delete this core document?')) {
      this.coreDocuments = this.coreDocuments.filter((doc) => doc.id !== id);
      this.showToast('Core document deleted', 'success');
    }
  }
  checkModalWorkingOrNot() {
    console.log(' I m working another ptoblem');
  }
  editDoc(doc: CoreDocument): void {
    this.openEditModal(doc);
  }

  getFileTypeClass(type: string): string {
    const iconMap: Record<string, string> = {
      pdf: 'pdf',
      doc: 'doc',
      txt: 'txt',
      file: 'doc',
      text: 'txt',
    };
    console.log(iconMap[type]);
    return iconMap[type] || 'doc';
  }

  getFileTypeIcon(type: string): string {
    const iconMap: Record<string, string> = {
      pdf: '📄',
      doc: '📄',
      txt: '📝',
      file: '📄',
      text: '📝',
    };
    console.log(iconMap[type]);
    return iconMap[type] || '📄';
  }

  private showToast(
    message: string,
    type: 'success' | 'error' | 'warning' | 'info' = 'info'
  ): void {
    // In a real implementation, you would use a toast service
    console.log(`${type.toUpperCase()}: ${message}`);
    alert(`${type.toUpperCase()}: ${message}`);
  }
}
