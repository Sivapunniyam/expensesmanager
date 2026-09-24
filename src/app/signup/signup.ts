import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { passwordMatchValidator } from '../validators/password-match.validator';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Signup {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  signupForm: FormGroup;
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor() {
    this.signupForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]]
      },
      { validators: passwordMatchValidator }
    );
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const { username, email, password } = this.signupForm.value;

      this.authService.register(username, email, password).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.successMessage = 'Account created successfully! Redirecting to dashboard...';
          console.log('✅ Signup successful:', response);
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 2000);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Signup failed. Please try again.';
          console.error('❌ Signup error:', error);
        }
      });
    } else {
      this.errorMessage = 'Please fill in all fields correctly';
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
