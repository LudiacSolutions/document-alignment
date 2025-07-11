import { Component, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ValidationErrorsComponent } from '../../shared/components/validation-errors/validation-errors.component';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ResetPasswordData } from '../interface/auth.interface';

@Component({
  selector: 'app-forget-password',
  imports: [ValidationErrorsComponent, ReactiveFormsModule, RouterModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent {
  openResetPasswordForm = signal(false);
  forgetEmail = new FormControl('', [Validators.required, Validators.email]);
  resetPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    token: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{8,}$'),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      this.confirmPasswordValidator,
    ]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  submitEmailForgotPassword() {
    this.forgetEmail.markAsTouched();
    if (this.forgetEmail.invalid) return;
    this.authService
      .forgotPassword(this.forgetEmail.value as string)
      .subscribe({
        next: (res) => {
          if (res.token) {
            this.openResetPasswordForm.set(true);
            this.resetPasswordForm.patchValue({
              token: res.token,
              email: this.forgetEmail.value,
            });
          }
        },
      });
  }

  submitResetPasswordForm() {
    this.resetPasswordForm.markAllAsTouched();
    if (this.resetPasswordForm.invalid) return;
    this.authService
      .resetPassword(this.resetPasswordForm.getRawValue() as ResetPasswordData)
      .subscribe({
        next: (res) => {
          if (res) this.router.navigate(['/signin']);
        },
      });
  }

  confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.parent) return null; // Form not yet initialized

    const password = control.parent.get('password')?.value;
    const confirmPassword = control.value;

    if (password !== confirmPassword) {
      return { mismatch: true };
    }

    return null;
  }
}
