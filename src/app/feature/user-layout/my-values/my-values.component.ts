import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AddMyValue, MyValues } from './my-value.interface';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MyValueService } from '../../../shared/services/my-value.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-my-values',
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './my-values.component.html',
  styleUrl: './my-values.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyValuesComponent {
  values = signal<MyValues[]>([]);
  selectedValueCard!: MyValues;
  isEditing = signal<boolean>(false);
  myValueForm!: FormGroup;
  wordCount = signal(0)
  wordCountValid = signal<boolean>(false);
  editingValueId = signal<number | null>(null);
  destroyRef = inject(DestroyRef);

  value: MyValues[] = [
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

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private myValueService: MyValueService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.myValueForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      tolerance: [5, Validators.required]
    });
  }

  onAdd(content: TemplateRef<any>): void {
    if (this.value.length >= 10) {
      alert('You have reached the maximum of 10 values');
      return;
    }
    this.isEditing.set(false);
    this.myValueForm.reset();
    this.wordCount.set(0);
    this.editingValueId.set(null);
    this.wordCountValid.set(false);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
  }

  onEdit(content: TemplateRef<any>, myValue: any): void {
    this.selectedValueCard = myValue
    this.isEditing.set(true);
    this.myValueForm.patchValue({
      ...myValue,
    });
    this.updateWordCount();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
  }

  onDelete(deleteContent: TemplateRef<any>, myValue: any) {
    this.selectedValueCard = myValue;
    this.modalService.open(deleteContent, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
  }

  useQuickValue(templateKey: keyof typeof this.quickValueTemplates): void {
    const template = this.quickValueTemplates[templateKey];
    this.myValueForm.patchValue({
      name: template.name,
      description: template.description
    });
    this.updateWordCount();
  }

  showUpgradeModal() {
    throw new Error('Method not implemented.');
  }

  updateWordCount(): void {
    const text = this.myValueForm.get('description')?.value || '';
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    this.wordCount.set(words);
    this.wordCountValid.set(words >= 35 && words <= 100);
  }

  updateToleranceDisplay(): void {

  }


  getAllMyValues() {
    // this.myValueService.getAllMyValues()
    //   .pipe(takeUntilDestroyed(this.destroyRef),
    //   )
    //   .subscribe({
    //     next: res => {
    //     },
    //     error: err => {
    //     }
    //   });
  }

  onSave(): void {
    if (this.myValueForm.invalid) {
      this.myValueForm.markAllAsTouched();
      return;
    }
    if (this.isEditing())
      this.updateMyValue();
    else
      this.addMyValue();
  }

  addMyValue() {
    // this.myValueService.addMyValue({ ...this.myValueForm.value } as AddMyValue)
    //   .pipe(takeUntilDestroyed(this.destroyRef),
    //   )
    //   .subscribe({
    //     next: res => {
    //       this.modalService.dismissAll();
    //       this.getAllMyValues();
    //     },
    //     error: err => {
    //       console.log("Failed to add CIM Environments.");
    //     }
    //   })
  }

  updateMyValue() {
    // this.myValueService.updateMyValue({ ...this.myValueForm.value, id: this.selectedValueCard.id } as AddMyValue)
    //   .pipe(takeUntilDestroyed(this.destroyRef),
    //   )
    //   .subscribe({
    //     next: res => {
    //       this.modalService.dismissAll();
    //       this.getAllMyValues();
    //     },
    //     error: err => {
    //     }
    //   })
  }

  deleteMyValue(): void {
    // this.myValueService.deleteMyValue(this.selectedValueCard.id)
    //   .pipe(takeUntilDestroyed(this.destroyRef)
    //   )
    //   .subscribe({
    //     next: res => {
    //       this.modalService.dismissAll();
    //       this.getAllMyValues();
    //     },
    //     error: err => {
    //     }
    //   });
  }

}

