import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessages: string[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    this.errorMessages = [];

    if (this.loginForm.invalid) {
      this.errorMessages.push('Please enter valid email and password.');
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.studentLogin({ email, password }).subscribe({
      next: (res) => {
        // Add null check for response and token
        if (res && res.token) {
          // Use auth service method for consistent token storage
          this.authService.storeUserSession({
            token: res.token,
            user: { user_type: res.user_type }
          });
          
          if (res.user_type === 'company') {
            this.router.navigate(['/companyprofile']);
          } else if (res.user_type === 'student') {
            this.router.navigate(['/graduateprofile']);
          }
        } else {
          this.errorMessages.push('Invalid response from server. Please try again.');
        }
      },
      error: (err) => {
        if (err.error?.message) {
          this.errorMessages.push(err.error.message);
        } else {
          this.errorMessages.push('Login failed. Please try again.');
        }
      },
    });
  }
}
