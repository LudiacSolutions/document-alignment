import { Component, Input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-validation-errors',
  imports: [],
  templateUrl: './validation-errors.component.html',
  styleUrl: './validation-errors.component.css',
})
export class ValidationErrorsComponent {
  @Input() control!: AbstractControl | null;

  get errors(): ValidationErrors | null {
    return this.control?.errors ?? null;
  }

  get touched(): boolean {
    return !!this.control?.touched;
  }

  get value(): string {
    return this.control?.value ?? '';
  }

  get failedPasswordRules() {
    const value = this.value || '';
    return {
      hasUpperCase: /[A-Z]/.test(value),
      hasLowerCase: /[a-z]/.test(value),
      hasDigit: /[0-9]/.test(value),
      hasSpecialChar: /[\W_]/.test(value),
      hasMinLength: value.length >= 8,
    };
  }

  get isPasswordPatternFailure(): boolean {
    return this.errors?.['pattern'] && this.control?.value;
  }
}
