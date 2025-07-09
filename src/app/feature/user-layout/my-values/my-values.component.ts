import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
interface Value {
  id: number;
  name: string;
  description: string;
  tolerance: number;
}
@Component({
  selector: 'app-my-values',
  imports: [NgFor],
  templateUrl: './my-values.component.html',
  styleUrl: './my-values.component.css'
})
export class MyValuesComponent {
  values: Value[] = [
    {
      id: 1,
      name: "Innovation & Excellence",
      description: "We strive to push boundaries and deliver exceptional solutions that exceed expectations. Our commitment to innovation drives us to constantly improve and adapt to changing market needs.",
      tolerance: 7
    },
    {
      id: 2,
      name: "Customer First",
      description: "Our customers are at the heart of everything we do. We listen actively, respond promptly, and continuously seek ways to enhance their experience with our products and services.",
      tolerance: 8
    },
    {
      id: 3,
      name: "Sustainability",
      description: "We are committed to environmental responsibility and sustainable business practices. Every decision considers its impact on future generations and our planet's wellbeing.",
      tolerance: 6
    }
  ];

  quickValueTemplates = {
    innovation: {
      name: "Innovation & Creativity",
      description: "We foster a culture of innovation where creative thinking is encouraged and breakthrough solutions are celebrated. Our team is empowered to challenge conventions, experiment with new ideas, and transform bold visions into reality that drives our industry forward."
    },
    customer: {
      name: "Customer First",
      description: "Customer satisfaction is our north star, guiding every decision and action we take. We actively listen to feedback, anticipate needs, and go above and beyond to deliver exceptional experiences that build lasting relationships and trust with those we serve."
    },
    sustainability: {
      name: "Sustainability & Environment",
      description: "Environmental stewardship is integral to our operations and long-term strategy. We implement sustainable practices, minimize our ecological footprint, and invest in green technologies to ensure our business growth contributes positively to the planet's future and wellbeing."
    },
    diversity: {
      name: "Diversity & Inclusion",
      description: "We celebrate diversity in all its forms and create an inclusive environment where every voice is heard and valued. By embracing different perspectives, backgrounds, and experiences, we build stronger teams, make better decisions, and foster innovation that reflects our global community."
    }
  };

  constructor(private modalService: NgbModal) { }

  showAddValueModal() {
    if (this.values.length >= 10) {
      // this.modalService.showToast('You have reached the maximum of 10 values', 'warning');
      return;
    }
    // this.modalService.openValueModal(null);
  }

  editValue(id: number) {
    const value = this.values.find(v => v.id === id);
    if (value) {
      // this.modalService.openValueModal(value);
    }
  }

  deleteValue(id: number) {
    if (confirm('Are you sure you want to delete this value?')) {
      this.values = this.values.filter(v => v.id !== id);
      // this.modalService.showToast('Value deleted', 'success');
    }
  }

  showUpgradeModal() {
    // this.modalService.openUpgradeModal();
  }

  // This would be called when the modal saves a new or updated value
  handleValueSaved(value: Value) {
    if (value.id) {
      // Update existing value
      const index = this.values.findIndex(v => v.id === value.id);
      if (index !== -1) {
        this.values[index] = value;
        // this.modalService.showToast('Value updated successfully', 'success');
      }
    } else {
      // Create new value
      const newValue = {
        ...value,
        id: Date.now()
      };
      this.values.push(newValue);
      // this.modalService.showToast('Value added successfully', 'success');
    }
  }
}
