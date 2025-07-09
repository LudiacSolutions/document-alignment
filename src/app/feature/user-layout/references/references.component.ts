import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
interface Reference {
  id: number;
  title: string;
  url: string;
}
@Component({
  selector: 'app-references',
  imports: [CommonModule, FormsModule],
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.css'],
})
export class ReferencesComponent {
  references: Reference[] = [
    {
      id: 1,
      title: 'GDPR Compliance Requirements',
      url: 'https://gdpr-info.eu',
    },
    {
      id: 2,
      title: 'ISO 27001 Standards',
      url: 'https://www.iso.org/isoiec-27001-information-security.html',
    },
  ];

  showModal = false;
  newReference: Reference = {
    id: 0,
    title: '',
    url: '',
  };

  showAddReferenceModal() {
    if (this.references.length >= 5) {
      this.showToast(
        'You have reached the maximum of 5 reference URLs',
        'warning'
      );
      return;
    }
    this.newReference = { id: 0, title: '', url: '' };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveReference() {
    const { title, url } = this.newReference;

    if (!title || !url) {
      this.showToast('Please fill in all fields', 'error');
      return;
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      this.showToast('Please enter a valid URL', 'error');
      return;
    }

    const newRef: Reference = {
      id: Date.now(),
      title,
      url,
    };

    this.references.push(newRef);
    this.showModal = false;
    this.showToast(`Reference URL "${title}" saved successfully`, 'success');
  }

  deleteReference(id: number) {
    if (confirm('Are you sure you want to delete this reference URL?')) {
      this.references = this.references.filter((ref) => ref.id !== id);
      this.showToast('Reference URL deleted', 'success');
    }
  }

  editReference(id: number) {
    this.showToast('Edit functionality would open here', 'info');
    // In a real implementation, you would:
    // 1. Find the reference by id
    // 2. Set this.newReference to the found reference
    // 3. Open the modal
    // 4. Handle the save differently for edits vs. new
  }

  showToast(
    message: string,
    type: 'success' | 'error' | 'warning' | 'info' = 'info'
  ) {
    // In a real implementation, you would use a toast service
    console.log(`${type.toUpperCase()}: ${message}`);
    alert(`${type.toUpperCase()}: ${message}`);
  }
}