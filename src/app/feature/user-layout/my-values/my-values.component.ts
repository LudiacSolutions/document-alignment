import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MyValueService } from './services/my-value.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AddMyValue, MyValues } from './my-value.interface';
import { ValidationErrorsComponent } from '../../../shared/components/validation-errors/validation-errors.component';
import { ToasterService } from '../../../shared/Toaster/toaster.service';

@Component({
  selector: 'app-my-values',
  imports: [FormsModule, ReactiveFormsModule, NgIf, ValidationErrorsComponent],
  templateUrl: './my-values.component.html',
  styleUrl: './my-values.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyValuesComponent {
  values = signal<MyValues[]>([]);
  selectedValueCard!: MyValues;
  isEditing = signal<boolean>(false);
  wordCount = signal(0)
  // wordCountValid = signal<boolean>(false);
  editingValueId = signal<number | null>(null);
  myValueForm!: FormGroup
  destroyRef = inject(DestroyRef);

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
    private myValueService: MyValueService,
    private toasterService: ToasterService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.getAllMyValues()

    this.myValueForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: [''],
      complianceTolerance: [5]
    });

  }

  onAdd(content: TemplateRef<any>): void {
    if (this.values().length >= 10) {
      this.toasterService.showToast('You have reached the maximum of 10 values', 'error');
      return;
    }
    this.isEditing.set(false);
    this.editingValueId.set(null);
    this.myValueForm.setValue({
      name: '',
      description: '',
      complianceTolerance: 5
    });
    this.wordCount.set(0);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
  }


  onEdit(content: TemplateRef<any>, myValue: any): void {
    this.selectedValueCard = myValue
    this.isEditing.set(true);
    this.myValueForm.patchValue({
      ...myValue,
    });
    this.updateWordCount();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
  }

  onDelete(deleteContent: TemplateRef<any>, myValue: any) {
    this.selectedValueCard = myValue;
    this.modalService.open(deleteContent, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
  }

  onUpGradePlan(deleteContent: TemplateRef<any>, myValue: any) {
    this.selectedValueCard = myValue;
    this.modalService.open(deleteContent, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
  }

  useQuickValue(templateKey: keyof typeof this.quickValueTemplates): void {
    const template = this.quickValueTemplates[templateKey];
    this.myValueForm.patchValue({
      name: template.name,
      description: template.description
    });
    this.updateWordCount();
  }

  updateWordCount(): void {
    const text = this.myValueForm.get('description')?.value || '';
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    this.wordCount.set(words);
  }

  updateToleranceDisplay(): void {
    const value = this.myValueForm.get('complianceTolerance')?.value;
    console.log('Tolerance now set to:', value);
  }

  getAllMyValues() {
    this.myValueService.getAllMyValues()
      .pipe(takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: res => {
          console.log(res, "abc");
          this.values.set(res.data)

        },
        error: err => {
        }
      });
  }

  onSave(): void {
    console.log('chrfbgyer')
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
    console.log('Submitting:', this.myValueForm.value);
    this.myValueService.addMyValue({ ...this.myValueForm.value } as AddMyValue)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: res => {
          this.toasterService.showToast('Value Added Successfully.', 'success');
          this.modalService.dismissAll();
          this.getAllMyValues();
        },
        error: err => {
          this.toasterService.showToast('Failed to add Value.', 'error');
          this.modalService.dismissAll();
        }
      });
  }

  updateMyValue() {
    this.myValueService.updateMyValue({ ...this.myValueForm.value, id: this.selectedValueCard.id } as AddMyValue)
      .pipe(takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: res => {
          this.toasterService.showToast('Value Updated Successfully.', 'success');
          this.modalService.dismissAll();
          this.getAllMyValues();
        },
        error: err => {
          this.toasterService.showToast('Failed to update Value.', 'error');
          this.modalService.dismissAll();
        }
      })
  }

  deleteMyValue(): void {
    this.myValueService.deleteMyValue(this.selectedValueCard.id)
      .pipe(takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: res => {
          this.toasterService.showToast('Value Deleted Successfully.', 'success');
          this.modalService.dismissAll();
          this.getAllMyValues();
        },
        error: err => {
          this.toasterService.showToast('Failed to delete value.', 'error');
          this.modalService.dismissAll();
        }
      });
  }

  upGradePlan() {

  }

}

