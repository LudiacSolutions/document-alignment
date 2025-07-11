import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ValidationErrorsComponent } from '../../shared/components/validation-errors/validation-errors.component';
import { CookieUtil } from '../../shared/utils/cookie.util';
import { SignInData } from '../interface/auth.interface';

@Component({
  selector: 'app-signin',
  imports: [RouterModule, ReactiveFormsModule, ValidationErrorsComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  email: string = '';
  password: string = '';
  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{8,}$'),
    ]),
  });
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
    this.handleRoutes();
  }
  onSubmit() {
    this.signInForm.markAllAsTouched();
    if (this.signInForm.invalid) return;
    this.authService
      .signInUser(this.signInForm.getRawValue() as SignInData)
      .subscribe({
        next: (res) => {
          this.handleRoutes();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  signInWithGoogle() {
    console.log('Sign in with Google');
  }

  signInWithFacebook() {
    console.log('Sign in with Facebook');
  }

  forgotPassword() {
    const role = this.authService.decodeToken();
    console.log(role);
  }

  handleRoutes() {
    const token = CookieUtil.getCookie('accessToken');
    if (token) {
      const role = this.authService.decodeToken()?.Role;
      console.log(role,token);
      
      if (role === 'Admin') this.router.navigate(['/admin/overview']);
      else if (role === 'User') this.router.navigate(['/user/dashboard']);
    }
  }
}
