import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ValidationErrorsComponent } from '../../shared/components/validation-errors/validation-errors.component';
import { SignUpData } from '../interface/auth.interface';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule,ValidationErrorsComponent,RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  rememberMe: boolean = false;
  signUpForm = new FormGroup({
    firstName: new FormControl('', [Validators.required,Validators.minLength(1)]),
    lastName: new FormControl('', [Validators.required,Validators.minLength(1)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{8,}$')]),
  })

  constructor(private authService : AuthService, private router : Router){}

  onSubmit() {
    this.signUpForm.markAllAsTouched();
    if(this.signUpForm.invalid) return;
    const userData = this.signUpForm.getRawValue() as SignUpData;
    this.authService.signUpUser(userData).subscribe({
      next: res => {
        if(res) this.router.navigate(['./signin']);
      },
      error: err => {
        console.log(err);
        
      }
    })
  }
 
  signInWithGoogle() {
    console.log('Sign in with Google');
  }
 
  signInWithFacebook() {
    console.log('Sign in with Facebook');
  }
 
  forgotPassword() {
    console.log('Forgot password');
  }

}
